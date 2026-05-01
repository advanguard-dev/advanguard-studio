// FAQ accordion
  function toggleFaq(btn){
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-q.open').forEach(q=>{
      q.classList.remove('open');
      q.nextElementSibling.classList.remove('open');
    });
    if(!isOpen){
      btn.classList.add('open');
      answer.classList.add('open');
    }
  }

  // Phase fade-in on scroll
  const phases = document.querySelectorAll('[data-phase]');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.12});
  phases.forEach(p=>observer.observe(p));