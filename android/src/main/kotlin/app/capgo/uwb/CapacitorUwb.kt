package app.capgo.uwb

import android.content.Context
import android.content.pm.PackageManager
import android.util.Base64
import androidx.core.uwb.RangingParameters
import androidx.core.uwb.RangingResult
import androidx.core.uwb.UwbAddress
import androidx.core.uwb.UwbClientSessionScope
import androidx.core.uwb.UwbComplexChannel
import androidx.core.uwb.UwbControllerSessionScope
import androidx.core.uwb.UwbDevice
import androidx.core.uwb.UwbManager
import com.getcapacitor.JSObject
import java.util.concurrent.atomic.AtomicReference
import kotlin.random.Random
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

typealias UwbEventEmitter = (String, JSObject) -> Unit

class CapacitorUwb(
    private val context: Context,
    private val emitEvent: UwbEventEmitter,
) {
    private val pluginVersion = "8.0.0"
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
    private var uwbManager: UwbManager? = null
    private var rangingJob: Job? = null
    private val activeSession = AtomicReference<UwbClientSessionScope?>(null)

    fun getPluginVersion(): String = pluginVersion

    fun isAvailable(onResult: (JSObject) -> Unit) {
        val supported = context.packageManager.hasSystemFeature(PackageManager.FEATURE_UWB)
        if (!supported) {
            onResult(
                JSObject().apply {
                    put("supported", false)
                    put("available", false)
                    put("platform", "android")
                },
            )
            return
        }

        scope.launch {
            val available = runCatching { getUwbManager().isAvailable() }.getOrDefault(false)
            onResult(
                JSObject().apply {
                    put("supported", true)
                    put("available", available)
                    put("platform", "android")
                },
            )
        }
    }

    fun startControllerSession(options: JSObject, onSuccess: (JSObject) -> Unit, onError: (String) -> Unit) {
        scope.launch {
            runCatching {
                val manager = getUwbManager()
                if (!manager.isAvailable()) {
                    throw IllegalStateException("UWB is not currently available on this device.")
                }

                val controllerScope = manager.controllerSessionScope()
                activeSession.set(controllerScope)

                val sessionId = if (options.has("sessionId")) options.getInt("sessionId") else Random.nextInt(1, Int.MAX_VALUE)
                val sessionKeyInfo = decodeOptionalBase64(options.optString("sessionKeyInfo", null))
                    ?: ByteArray(8).also { Random.nextBytes(it) }
                val subSessionId = if (options.has("subSessionId")) options.getInt("subSessionId") else 0
                val subSessionKeyInfo = decodeOptionalBase64(options.optString("subSessionKeyInfo", null))

                val channelConfig = options.getJSObject("complexChannel")
                val complexChannel = if (channelConfig != null) {
                    UwbComplexChannel(channelConfig.getInt("channel"), channelConfig.getInt("preambleIndex"))
                } else {
                    controllerScope.uwbComplexChannel
                }

                val uwbConfigType = options.optInt("uwbConfigType", RangingParameters.CONFIG_UNICAST_DS_TWR)
                val updateRateType = options.optInt("updateRateType", RangingParameters.RANGING_UPDATE_RATE_AUTOMATIC)
                val slotDurationMillis = if (options.has("slotDurationMillis")) {
                    options.getLong("slotDurationMillis")
                } else {
                    RangingParameters.RANGING_SLOT_DURATION_2_MILLIS
                }

                val localAddress = controllerScope.localAddress
                val localAddressBase64 = Base64.encodeToString(localAddress.address, Base64.NO_WRAP)

                val shareableParameters = JSObject().apply {
                    put("sessionId", sessionId)
                    put("sessionKeyInfo", Base64.encodeToString(sessionKeyInfo, Base64.NO_WRAP))
                    put("subSessionId", subSessionId)
                    subSessionKeyInfo?.let { put("subSessionKeyInfo", Base64.encodeToString(it, Base64.NO_WRAP)) }
                    put(
                        "complexChannel",
                        JSObject().apply {
                            put("channel", complexChannel.channel)
                            put("preambleIndex", complexChannel.preambleIndex)
                        },
                    )
                    put("peerAddress", localAddressBase64)
                    put("uwbConfigType", uwbConfigType)
                    put("updateRateType", updateRateType)
                    put("slotDurationMillis", slotDurationMillis)
                }

                val peerAddress = decodeOptionalBase64(options.optString("peerAddress", null))
                if (peerAddress != null) {
                    val rangingParameters = buildRangingParameters(
                        uwbConfigType = uwbConfigType,
                        sessionId = sessionId,
                        subSessionId = subSessionId,
                        sessionKeyInfo = sessionKeyInfo,
                        subSessionKeyInfo = subSessionKeyInfo,
                        complexChannel = complexChannel,
                        peerAddress = peerAddress,
                        updateRateType = updateRateType,
                        slotDurationMillis = slotDurationMillis,
                    )
                    startRanging(controllerScope.prepareSession(rangingParameters))
                }

                onSuccess(
                    JSObject().apply {
                        put("localAddress", localAddressBase64)
                        put("rangingParameters", shareableParameters)
                    },
                )
            }.onFailure {
                onError(it.message ?: "Failed to start controller session.")
            }
        }
    }

    fun startControleeSession(options: JSObject, onSuccess: () -> Unit, onError: (String) -> Unit) {
        scope.launch {
            runCatching {
                val manager = getUwbManager()
                if (!manager.isAvailable()) {
                    throw IllegalStateException("UWB is not currently available on this device.")
                }

                val parametersObject = options.getJSObject("rangingParameters")
                    ?: throw IllegalArgumentException("rangingParameters is required.")

                val rangingParameters = parseRangingParameters(parametersObject)
                val controleeScope = manager.controleeSessionScope()
                activeSession.set(controleeScope)

                startRanging(controleeScope.prepareSession(rangingParameters))
                onSuccess()
            }.onFailure {
                onError(it.message ?: "Failed to start controlee session.")
            }
        }
    }

    fun stopSession() {
        rangingJob?.cancel()
        rangingJob = null
        activeSession.set(null)
        notifySessionStateChanged("stopped")
    }

    private fun getUwbManager(): UwbManager {
        val existing = uwbManager
        if (existing != null) {
            return existing
        }

        return UwbManager.createInstance(context).also { uwbManager = it }
    }

    private fun startRanging(flowProvider: kotlinx.coroutines.flow.Flow<RangingResult>) {
        rangingJob?.cancel()
        rangingJob = scope.launch {
            notifySessionStateChanged("running")
            flowProvider
                .catch { error ->
                    notifySessionStateChanged("invalidated", error.message)
                }
                .collect { result ->
                    handleRangingResult(result)
                }
        }
    }

    private fun handleRangingResult(result: RangingResult) {
        when (result) {
            is RangingResult.RangingResultPosition -> {
                val payload = JSObject().apply {
                    put("timestamp", System.currentTimeMillis())
                    result.position.distance?.let { put("distanceMeters", it.value.toDouble()) }
                    result.position.azimuth?.let { put("azimuthRadians", it.value.toDouble()) }
                    result.position.elevation?.let { put("elevationRadians", it.value.toDouble()) }
                }
                emitEvent("rangingUpdate", payload)
            }

            is RangingResult.RangingResultPeerDisconnected -> {
                notifySessionStateChanged("peerDisconnected")
            }
        }
    }

    private fun notifySessionStateChanged(state: String, reason: String? = null) {
        val payload = JSObject().apply {
            put("state", state)
            if (reason != null) {
                put("reason", reason)
            }
        }
        emitEvent("sessionStateChanged", payload)
    }

    private fun buildRangingParameters(
        uwbConfigType: Int,
        sessionId: Int,
        subSessionId: Int,
        sessionKeyInfo: ByteArray?,
        subSessionKeyInfo: ByteArray?,
        complexChannel: UwbComplexChannel,
        peerAddress: ByteArray,
        updateRateType: Int,
        slotDurationMillis: Long,
    ): RangingParameters {
        val peerDevice = UwbDevice.createForAddress(peerAddress)

        return RangingParameters(
            uwbConfigType,
            sessionId,
            subSessionId,
            sessionKeyInfo,
            subSessionKeyInfo,
            complexChannel,
            listOf(peerDevice),
            updateRateType,
            null,
            slotDurationMillis,
            false,
        )
    }

    private fun parseRangingParameters(options: JSObject): RangingParameters {
        val sessionId = options.getInt("sessionId")
        val subSessionId = if (options.has("subSessionId")) options.getInt("subSessionId") else 0
        val sessionKeyInfo = decodeOptionalBase64(options.optString("sessionKeyInfo", null))
        val subSessionKeyInfo = decodeOptionalBase64(options.optString("subSessionKeyInfo", null))

        val channelConfig = options.getJSObject("complexChannel")
            ?: throw IllegalArgumentException("complexChannel is required.")
        val complexChannel = UwbComplexChannel(
            channelConfig.getInt("channel"),
            channelConfig.getInt("preambleIndex"),
        )

        val peerAddress = decodeRequiredBase64(options.getString("peerAddress"))
        val uwbConfigType = options.optInt("uwbConfigType", RangingParameters.CONFIG_UNICAST_DS_TWR)
        val updateRateType = options.optInt("updateRateType", RangingParameters.RANGING_UPDATE_RATE_AUTOMATIC)
        val slotDurationMillis = if (options.has("slotDurationMillis")) {
            options.getLong("slotDurationMillis")
        } else {
            RangingParameters.RANGING_SLOT_DURATION_2_MILLIS
        }

        return buildRangingParameters(
            uwbConfigType = uwbConfigType,
            sessionId = sessionId,
            subSessionId = subSessionId,
            sessionKeyInfo = sessionKeyInfo,
            subSessionKeyInfo = subSessionKeyInfo,
            complexChannel = complexChannel,
            peerAddress = peerAddress,
            updateRateType = updateRateType,
            slotDurationMillis = slotDurationMillis,
        )
    }

    private fun decodeOptionalBase64(value: String?): ByteArray? {
        if (value.isNullOrBlank()) {
            return null
        }

        return Base64.decode(value, Base64.DEFAULT)
    }

    private fun decodeRequiredBase64(value: String?): ByteArray {
        if (value.isNullOrBlank()) {
            throw IllegalArgumentException("peerAddress is required.")
        }

        return Base64.decode(value, Base64.DEFAULT)
    }

    fun destroy() {
        stopSession()
        uwbManager = null
        scope.cancel()
    }
}
