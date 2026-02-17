/**
 * CTA-Popup für transportschaden-geld.de
 * Zeigt beim Seitenaufruf ein Popup an: "Transportschaden oder Ware verloren? Wir zahlen sofort."
 * Nur 1x pro Session anzeigen (sessionStorage).
 */
(function() {
    // Nicht auf der Hauptseite anzeigen (dort ist das Formular direkt)
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') return;

    // Nur 1x pro Session
    if (sessionStorage.getItem('popup-cta-shown')) return;

    // Kurzer Delay, damit die Seite erst lädt
    setTimeout(function() {
        // Overlay erstellen
        var overlay = document.createElement('div');
        overlay.id = 'cta-popup-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);display:flex;justify-content:center;align-items:center;animation:ctaFadeIn 0.3s ease-out;';

        // Popup-Inhalt
        overlay.innerHTML = '' +
            '<div style="background:#151A18;border:2px solid #2ECC71;border-radius:16px;padding:2.5rem 2rem;max-width:480px;width:90%;text-align:center;position:relative;box-shadow:0 0 80px rgba(46,204,113,0.25);animation:ctaSlideUp 0.4s ease-out;">' +
                '<button id="cta-popup-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#8A9B8E;font-size:1.5rem;cursor:pointer;line-height:1;padding:0.2rem;" aria-label="Schließen">&times;</button>' +
                '<div style="width:60px;height:60px;background:linear-gradient(135deg,#2ECC71,#1a9c54);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;font-size:1.8rem;">🛡️</div>' +
                '<h2 style="font-family:\'Instrument Serif\',serif;font-size:1.5rem;font-weight:400;color:#FFFFFF;margin-bottom:0.6rem;line-height:1.3;">Transportschaden oder<br>Ware verloren?</h2>' +
                '<p style="color:#2ECC71;font-size:1.3rem;font-weight:700;margin-bottom:0.5rem;font-family:\'DM Sans\',sans-serif;">Wir zahlen sofort.</p>' +
                '<p style="color:#B4C4B8;font-size:0.9rem;line-height:1.6;margin-bottom:1.5rem;">Wir kaufen Ihre Forderung. Sie bekommen Geld, wir übernehmen den Rest. Kein Anwalt, kein Prozess, kein Risiko.</p>' +
                '<a href="/#formular" style="display:inline-flex;align-items:center;gap:0.5rem;background:#2ECC71;color:#0C0F0E;text-decoration:none;padding:0.9rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;font-family:\'DM Sans\',sans-serif;transition:all 0.25s;">Jetzt Forderung melden &rarr;</a>' +
                '<p style="color:#8A9B8E;font-size:0.78rem;margin-top:1rem;">Kostenlos &middot; Unverbindlich &middot; In 48h Angebot</p>' +
            '</div>';

        document.body.appendChild(overlay);

        // CSS-Animationen injizieren
        var style = document.createElement('style');
        style.textContent = '@keyframes ctaFadeIn{from{opacity:0}to{opacity:1}}@keyframes ctaSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(style);

        // Session-Flag setzen
        sessionStorage.setItem('popup-cta-shown', '1');

        // Close-Button
        document.getElementById('cta-popup-close').addEventListener('click', function() {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.2s';
            setTimeout(function() { overlay.remove(); }, 200);
        });

        // Klick auf Overlay (Hintergrund) schließt auch
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.2s';
                setTimeout(function() { overlay.remove(); }, 200);
            }
        });

        // ESC-Taste schließt
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('cta-popup-overlay')) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.2s';
                setTimeout(function() { overlay.remove(); }, 200);
            }
        });
    }, 800);
})();
