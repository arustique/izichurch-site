# Site vitrine IziChurch (izichurch.com)

Site 100 % statique (pas de code serveur, pas de base de données) : présentation, tarifs, FAQ, avec des boutons qui renvoient vers la boutique Maketou pour le paiement. Hébergement gratuit via GitHub Pages.

Ce dossier est volontairement séparé du logiciel desktop (`izichurch/`) : ce sont deux projets différents, avec deux dépôts GitHub différents.

## État (mis à jour le 13 août 2026) — tout est en ligne

- ✅ Le site est poussé sur le dépôt GitHub public `arustique/izichurch-site` et servi par GitHub Pages.
- ✅ izichurch.com est connecté (DNS chez Hostinger : 4 enregistrements `A` sur `@` vers GitHub Pages, `CNAME` `www` → `arustique.github.io`). Le certificat HTTPS est en cours de délivrance automatique par GitHub (rien à faire, ça se termine tout seul).
- ✅ Les boutons "Mensuel" et "Annuel" pointent vers les vrais liens Maketou (déjà remplis dans `js/script.js`, voir plus bas).
- ✅ La boutique Maketou répond aussi sous `abonnement.izichurch.com` (sous-domaine personnalisé connecté et vérifié côté Maketou, CNAME chez Hostinger).

Rien à refaire ici sauf si tu veux changer le contenu, le logo/les couleurs, ou remplacer un lien Maketou — voir les sections ci-dessous, qui restent utiles en référence.

## Boutique Maketou (paiement)

Seules deux offres passent par un vrai paiement Maketou : **Mensuel** et **Annuel**. Les deux autres ne sont pas des ventes Maketou :
- **Essai** (0 FCFA) : aucun paiement n'a lieu, le bouton envoie directement un message WhatsApp pré-rempli au +229 01 66 50 31 31.
- **Fédération** : tarif négocié au cas par cas, le bouton envoie aussi directement un message WhatsApp pré-rempli au même numéro.

Les liens réels des produits Mensuel et Annuel sont déjà dans `js/script.js`, objet `MAKETOU_LINKS` :
```js
const MAKETOU_LINKS = {
  mensuel: 'https://izichurch.mymaketou.shop/fr/products/izichurch-mensuel-abonnement',
  annuel: 'https://izichurch.mymaketou.shop/fr/products/izichurch-annuel-abonnement',
};
```
Le fichier `IziChurch Setup.exe` est attaché à ces deux produits côté Maketou (livraison automatique après paiement).

Si un lien change un jour : modifie cet objet, renvoie le fichier sur GitHub (ou demande à Claude de le faire), les boutons se mettent à jour immédiatement.

**Important — ce qui reste manuel malgré tout :** Maketou livre le logiciel automatiquement, mais jamais la clé de licence. Une clé n'existe qu'une fois le logiciel installé et l'identifiant machine de l'église connu (conséquence du verrouillage par machine, voir `GUIDE_TECHNIQUE_ADMIN.md`). Le parcours reste donc : paiement + téléchargement automatiques → l'église t'envoie son identifiant machine (bouton déjà prévu dans le logiciel) → tu génères et transmets la clé (voir `GUIDE_TECHNIQUE_ADMIN.md`, section 3).

**Renouvellement :** ne réutilise jamais les liens Mensuel/Annuel ci-dessus pour un renouvellement — ils ont le .exe attaché, et une église qui renouvelle le retéléchargerait inutilement. Les 2 produits séparés "Renouvellement mensuel" et "Renouvellement annuel" (sans .exe) sont déjà créés côté Maketou ; leurs liens sont documentés dans `GUIDE_TECHNIQUE_ADMIN.md`, section 4, et ne vont jamais sur le site public.

**Sous-domaine personnalisé de la boutique :** `abonnement.izichurch.com` est déjà connecté et vérifié dans les réglages Maketou (rubrique "Nom de domaine"). L'enregistrement DNS correspondant, côté Hostinger, est : `CNAME` `abonnement` → `302b285e75869723.vercel-dns-016.com`. Si tu recrées un jour ce sous-domaine ou en ajoutes un autre, Maketou t'indiquera la valeur exacte à utiliser au moment de la connexion (elle peut différer de celle-ci).

## Mettre à jour le logo et les couleurs

Toutes les couleurs du site sont regroupées en un seul endroit : le bloc `:root { ... }` tout en haut du fichier `css/style.css` (`--primary`, `--accent`, `--primary-dark`, etc.).

Le vrai logo IziChurch est déjà en place, en image (pas du texte stylisé) : `assets/logo-full.png` dans l'en-tête et le pied de page (`<img class="logo-img">` dans `index.html`), plus les favicons (`assets/favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`). Pour changer le logo, remplace simplement les fichiers dans `assets/` en gardant les mêmes noms.

## Mettre à jour le contenu du site plus tard

Tout le texte est directement dans `index.html`, organisé par section (Hero, Pourquoi IziChurch, Fonctionnalités, Tarifs, FAQ). Pas besoin d'outil spécial pour le modifier : reviens simplement dans cette conversation et demande à Claude d'ajuster tel ou tel passage, puis de renvoyer le fichier sur GitHub.

## Structure

```
izichurch-site/
  index.html       toutes les sections et tous les textes du site
  css/style.css     design (couleurs modifiables en un seul endroit, voir plus haut)
  js/script.js      menu mobile, FAQ, et les liens vers la boutique Maketou
  assets/           logo, favicons
```
