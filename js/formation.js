const btn = document.getElementById('burgerBtn');
const menu = document.getElementById('mobMenu');
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
