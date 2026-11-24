/* Menu mobile accessible : bouton aria-expanded, Échap pour fermer, gestion du focus. */
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu-principal');
  if (!btn || !nav) return;
  var label = btn.querySelector('.menu-toggle__label');
  var mq = window.matchMedia('(min-width: 960px)');

  function setOpen(open, returnFocus) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    if (label) label.textContent = open ? 'Fermer' : 'Menu';
    nav.classList.toggle('is-open', open);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      btn.focus();
    }
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true', false);
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && btn.getAttribute('aria-expanded') === 'true' && !mq.matches) {
      setOpen(false, true);
    }
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && !mq.matches) setOpen(false, false);
  });
  /* Ferme le menu si le focus quitte l'en-tête (Tab après le dernier lien). */
  btn.closest('header').addEventListener('focusout', function (e) {
    if (!mq.matches && btn.getAttribute('aria-expanded') === 'true' && e.relatedTarget && !this.contains(e.relatedTarget)) {
      setOpen(false, false);
    }
  });
  var onChange = function () { if (mq.matches) setOpen(false, false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
})();
