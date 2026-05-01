// ── Filter ──
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.filter;
        document.querySelectorAll('.project').forEach(proj => {
          if (cat === 'all' || proj.dataset.category.includes(cat)) {
            proj.style.display = '';
          } else {
            proj.style.display = 'none';
          }
        });
      });
    });

    // ── Scroll reveal ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.project').forEach(p => observer.observe(p));