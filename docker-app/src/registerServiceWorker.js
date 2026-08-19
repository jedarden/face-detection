/**
 * Service Worker Registration
 * Progressive enhancement: app works without SW, but better with it
 */

export function registerServiceWorker() {
  // Only register service worker if browser supports it
  if ('serviceWorker' in navigator && typeof window !== 'undefined') {
    const swUrl = `${window.location.origin}/sw.js`;

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('[SW] Service worker registered successfully:', registration);

        // Check for updates on page load
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available; please refresh
                console.log('[SW] New content is available; please refresh');
                // Optional: notify user of update
                notifyUpdateAvailable();
              } else {
                // Content is cached for offline use
                console.log('[SW] Content is cached for offline use');
              }
            }
          };
        };

        // Periodic update check (every hour)
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error('[SW] Service worker registration failed:', error);
        // App continues to work without service worker
      });

    // Handle waiting service worker (user can choose to activate it)
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        notifyUpdateAvailable();
      }
    });
  }
}

function notifyUpdateAvailable() {
  // Simple notification - could be enhanced with UI
  console.log('[SW] A new version of the app is available. Refresh to update.');

  // Optional: Add a visual notification in the app
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    cursor: pointer;
  `;
  notification.textContent = '🔄 New version available - click to refresh';
  notification.onclick = () => {
    window.location.reload();
  };
  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 10000);
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
