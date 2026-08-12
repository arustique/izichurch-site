// IziChurch — site vitrine : petites interactions (menu mobile, FAQ, année, liens Maketou)

document.addEventListener('DOMContentLoaded', () => {
  // Année dans le pied de page
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Ferme le menu mobile quand on clique un lien
    document.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', () => header.classList.remove('nav-open'));
    });
  }

  // Accordéon FAQ
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const alreadyOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !alreadyOpen);
    });
  });

  // --------------------------------------------------------------------
  // Liens vers la boutique Maketou.
  // Seules les offres MENSUEL et ANNUEL passent par Maketou (paiement en
  // ligne réel). Essai et Fédération ne sont pas des ventes Maketou : ils
  // pointent directement vers WhatsApp dans le HTML (aucun lien à
  // configurer ici pour ces deux-là).
  //
  // À REMPLIR : une fois votre boutique Maketou créée et vos produits
  // "Abonnement mensuel" et "Abonnement annuel" configurés, copiez le
  // lien de chaque produit ci-dessous. Tant que ce n'est pas fait, les
  // boutons correspondants restent inactifs et affichent un message au
  // lieu de planter.
  // --------------------------------------------------------------------
  const MAKETOU_LINKS = {
    mensuel: 'https://izichurch.mymaketou.shop/fr/products/izichurch-mensuel-abonnement',
    annuel: 'https://izichurch.mymaketou.shop/fr/products/izichurch-annuel-abonnement',
  };

  document.querySelectorAll('.maketou-link').forEach((link) => {
    const plan = link.getAttribute('data-plan');
    const url = MAKETOU_LINKS[plan];
    if (url) {
      link.setAttribute('href', url);
    } else {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Le lien de paiement pour cette formule n'est pas encore configuré. Ouvre js/script.js et complète MAKETOU_LINKS avec les liens de ta boutique Maketou.");
      });
    }
  });
});
