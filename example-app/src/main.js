import './style.css';

import { Capacitor } from '@capacitor/core';
import { CapacitorUwb } from '@capgo/capacitor-uwb';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const output = document.getElementById('plugin-output');

const setOutput = (value) => {
  output.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};

if (Capacitor.isNativePlatform()) {
  void CapacitorUpdater.notifyAppReady().catch((error) => {
    console.error('CapacitorUpdater.notifyAppReady failed', error);
  });

  void CapacitorUwb.addListener('rangingUpdate', (event) => {
    setOutput(event);
  });

  void CapacitorUwb.addListener('sessionStateChanged', (event) => {
    setOutput(event);
  });
}

document.getElementById('check-available').addEventListener('click', async () => {
  try {
    setOutput(await CapacitorUwb.isAvailable());
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

document.getElementById('get-token').addEventListener('click', async () => {
  try {
    setOutput(await CapacitorUwb.getDiscoveryToken());
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

document.getElementById('start-controller').addEventListener('click', async () => {
  try {
    setOutput(await CapacitorUwb.startControllerSession());
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

document.getElementById('stop-session').addEventListener('click', async () => {
  try {
    await CapacitorUwb.stopSession();
    setOutput({ stopped: true });
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

document.getElementById('get-version').addEventListener('click', async () => {
  try {
    setOutput(await CapacitorUwb.getPluginVersion());
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});
