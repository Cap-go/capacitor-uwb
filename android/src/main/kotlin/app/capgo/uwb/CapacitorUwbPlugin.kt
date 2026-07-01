package app.capgo.uwb

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "CapacitorUwb")
class CapacitorUwbPlugin : Plugin() {

    private lateinit var implementation: CapacitorUwb

    override fun load() {
        super.load()
        implementation = CapacitorUwb(context) { event, data ->
            notifyListeners(event, data)
        }
    }

    override fun handleOnDestroy() {
        implementation.destroy()
        super.handleOnDestroy()
    }

    @PluginMethod
    fun isAvailable(call: PluginCall) {
        implementation.isAvailable { result ->
            call.resolve(result)
        }
    }

    @PluginMethod
    fun getDiscoveryToken(call: PluginCall) {
        call.reject("Discovery tokens are only available on iOS Nearby Interaction.")
    }

    @PluginMethod
    fun startPeerSession(call: PluginCall) {
        call.reject("Peer sessions are only available on iOS Nearby Interaction.")
    }

    @PluginMethod
    fun startControllerSession(call: PluginCall) {
        val options = call.data ?: JSObject()
        implementation.startControllerSession(
            options,
            onSuccess = { result ->
                call.resolve(result)
            },
            onError = { message ->
                call.reject(message)
            },
        )
    }

    @PluginMethod
    fun startControleeSession(call: PluginCall) {
        val options = call.data ?: JSObject()
        implementation.startControleeSession(
            options,
            onSuccess = {
                call.resolve()
            },
            onError = { message ->
                call.reject(message)
            },
        )
    }

    @PluginMethod
    fun stopSession(call: PluginCall) {
        implementation.stopSession()
        call.resolve()
    }

    @PluginMethod
    fun getPluginVersion(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("version", implementation.getPluginVersion())
            },
        )
    }
}
