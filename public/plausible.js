(() => {
  const { protocol, hostname } = window.location;
  if (protocol !== 'https:' || hostname !== 'andreweiner.github.io') return;

  const tracker = document.createElement('script');
  tracker.src = 'https://psm-plausible.mw.tu-dresden.de/js/script.js';
  tracker.dataset.domain = hostname;
  tracker.dataset.api = 'https://psm-plausible.mw.tu-dresden.de/api/event';
  document.head.append(tracker);
})();
