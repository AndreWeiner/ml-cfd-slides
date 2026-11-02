// A zero frame counter alone is not proof of stalled playback on Safari.
// Keep the old decoder recovery, but never reload a video more than once.
export function createMobileMediaRecovery() {
  const pending = new WeakSet();
  const recovered = new WeakSet();
  return function ensureMobileMediaPlaying({ target: media }) {
    if (typeof media.getVideoPlaybackQuality !== 'function' ||
        pending.has(media) || recovered.has(media)) return;
    pending.add(media);
    const initialTime = media.currentTime;
    setTimeout(() => {
      pending.delete(media);
      if (media.paused || media.ended || !media.isConnected ||
          media.currentTime !== initialTime ||
          media.getVideoPlaybackQuality().totalVideoFrames !== 0) return;
      // Mark before load(): its canplay event must not schedule another reload.
      recovered.add(media);
      media.load();
      const playback = media.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => { media.controls = true; });
      }
    }, 1500);
  };
}
