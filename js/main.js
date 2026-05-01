// Live clock
    function updateClock() {
      const now = new Date();
      const t = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Brussels' });
      const el = document.getElementById('liveClock');
      if (el) el.textContent = 'Brussels · ' + t;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Next Monday start
    const ns = document.getElementById('nextStart');
    if (ns) {
      const now = new Date();
      const day = now.getDay();
      const daysUntilMon = day === 0 ? 1 : (8 - day) % 7 || 7;
      const next = new Date(now);
      next.setDate(now.getDate() + daysUntilMon);
      ns.textContent = next.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    }

    const btn = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobMenu');

    if (btn && menu) {
      const links = menu.querySelectorAll('a');

      function toggleMenu(open) {
        btn.setAttribute('aria-expanded', open);
        menu.setAttribute('aria-hidden', !open);
        menu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      }

      btn.addEventListener('click', () => {
        toggleMenu(btn.getAttribute('aria-expanded') !== 'true');
      });

      links.forEach(a => a.addEventListener('click', () => toggleMenu(false)));

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') toggleMenu(false);
      });
    }
