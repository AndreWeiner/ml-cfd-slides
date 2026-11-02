import assert from 'node:assert/strict';
import { createMobileMediaRecovery } from '../js/utils/mobile-media-recovery.js';
const timers = [];
const originalTimeout = globalThis.setTimeout;
globalThis.setTimeout = callback => timers.push(callback);
const video = () => ({ currentTime: 0, paused: false, ended: false, isConnected: true,
  loads: 0, getVideoPlaybackQuality: () => ({ totalVideoFrames: 0 }),
  load() { this.loads++; }, play() { return Promise.resolve(); } });
try {
  const recover = createMobileMediaRecovery();
  const stalled = video();
  recover({ target: stalled });
  recover({ target: stalled });
  assert.equal(timers.length, 1, 'coalesce duplicate canplay events');
  timers.shift()();
  for (let i = 0; i < 5; i++) recover({ target: stalled });
  assert.equal(stalled.loads, 1);
  assert.equal(timers.length, 0, 'a recovery canplay must not trigger another reload');
  const advancing = video();
  recover({ target: advancing }); advancing.currentTime = 0.5; timers.shift()();
  assert.equal(advancing.loads, 0, 'advancing playback must survive an empty frame counter');
  for (const state of [{ paused: true }, { ended: true }, { isConnected: false }]) {
    const inactive = video(); recover({ target: inactive }); Object.assign(inactive, state);
    timers.shift()(); assert.equal(inactive.loads, 0);
  }
  const blocked = video(); blocked.play = () => Promise.reject(new Error('blocked'));
  recover({ target: blocked }); timers.shift()(); await Promise.resolve();
  assert.equal(blocked.controls, true, 'allow manual playback if recovery is blocked');
  console.log('Mobile media recovery checks passed');
} finally { globalThis.setTimeout = originalTimeout; }
