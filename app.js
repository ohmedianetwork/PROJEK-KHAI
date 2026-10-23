// Oh! Media Tools: shared app script, loaded by every page.
// Registers the service worker (offline + installable) and drives the Install button on the home screen.
(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch((err) => console.warn('Service worker not registered:', err));
    });
  }

  const btn = document.getElementById('install');
  const hint = document.getElementById('install-hint');
  if (!btn) return;

  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (standalone) return; // Already running as the app.

  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    btn.hidden = false;
  });

  btn.addEventListener('click', async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      deferred = null;
      btn.hidden = true;
    } else if (hint) {
      hint.hidden = !hint.hidden;
    }
  });

  window.addEventListener('appinstalled', () => { btn.hidden = true; if (hint) hint.hidden = true; });

  // iPhone/iPad Safari has no install prompt: show the button so it can reveal the "Add to Home Screen" steps.
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) btn.hidden = false;
})();
