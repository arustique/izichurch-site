# Site vitrine IziChurch (izichurch.com)

Site 100 % statique (pas de code serveur, pas de base de données) : présentation, tarifs, FAQ, avec des boutons qui renvoient vers ta boutique Maketou pour le paiement. Hébergement gratuit via GitHub Pages.

Ce dossier est volontairement séparé du logiciel desktop (`izichurch/`) : ce sont deux projets différents, avec deux dépôts GitHub différents.

## 1. Mettre le site en ligne (une seule fois)

1. Crée un nouveau dépôt sur GitHub (par exemple `izichurch-site`), et envoie-y le contenu de ce dossier (`index.html`, `css/`, `js/`). Claude peut s'en charger si tu préfères.
2. Dans ce dépôt GitHub, va dans **Settings** (Paramètres) → **Pages** (dans le menu de gauche).
3. Sous "Source", choisis la branche `main` et le dossier `/ (root)`, puis clique sur **Save**.
4. GitHub te donne une adresse temporaire du type `https://tonpseudo.github.io/izichurch-site/` — le site est déjà en ligne à cette adresse. L'étape suivante consiste à le faire apparaître sous izichurch.com à la place.

## 2. Connecter izichurch.com

1. Toujours dans **Settings → Pages**, dans le champ "Custom domain", tape `izichurch.com` (ou `www.izichurch.com` si tu préfères que ce soit l'adresse principale) et valide.
2. GitHub affiche alors les enregistrements DNS à créer. En résumé, pour un domaine racine (`izichurch.com` sans www), il faut créer 4 enregistrements de type `A` chez ton bureau d'enregistrement de domaine, pointant vers ces adresses GitHub Pages :
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   Si tu préfères utiliser `www.izichurch.com`, un enregistrement `CNAME` pointant vers `tonpseudo.github.io` suffit à la place.
3. Connecte-toi au tableau de bord du bureau d'enregistrement où izichurch.com a été acheté, ouvre la gestion des DNS, et ajoute ces enregistrements.
4. Patiente (souvent moins d'une heure, parfois jusqu'à 24h) — GitHub Pages détecte automatiquement la connexion et active un certificat de sécurité (https) gratuit pour toi.

## 3. Connecter la boutique Maketou (paiement)

Seules deux offres passent par un vrai paiement Maketou : **Mensuel** et **Annuel**. Les deux autres ne sont pas des ventes Maketou :
- **Essai** (0 FCFA) : aucun paiement n'a lieu, le bouton envoie directement un message WhatsApp pré-rempli au +229 01 66 50 31 31.
- **Fédération** : tarif négocié au cas par cas, le bouton envoie aussi directement un message WhatsApp pré-rempli au même numéro.

Ces deux boutons WhatsApp sont déjà configurés dans `index.html`, rien à faire de plus pour eux (change juste le numéro dans le code si jamais il change).

1. Crée ton compte sur [maketou.com](https://www.maketou.com/) et configure deux produits : "Abonnement mensuel" (5 000 FCFA) et "Abonnement annuel" (45 000 FCFA).
2. **Attache le fichier `IziChurch Setup.exe` à chacun des deux produits** (Maketou permet d'attacher un fichier numérique livré automatiquement après paiement — exactement ce qu'il faut ici). Résultat : dès qu'une église paie, elle reçoit immédiatement le lien de téléchargement du logiciel, sans aucune action de ta part.
3. Pour chaque produit, récupère son lien de vente (bouton "Partager" sur la page du produit dans le dashboard Maketou).
4. Ouvre le fichier `js/script.js` de ce dossier, et complète les deux liens dans l'objet `MAKETOU_LINKS` en haut du fichier :
   ```js
   const MAKETOU_LINKS = {
     mensuel: 'https://...', // lien du produit "Mensuel"
     annuel: 'https://...',  // lien du produit "Annuel"
   };
   ```
5. Renvoie ce fichier modifié sur GitHub (ou demande à Claude de le faire) — les boutons Mensuel et Annuel fonctionnent immédiatement après.

**Important — ce qui reste manuel malgré tout :** Maketou peut livrer le logiciel automatiquement, mais jamais la clé de licence. Une clé n'existe qu'une fois le logiciel installé et l'identifiant machine de l'église connu (conséquence du verrouillage par machine, voir `GUIDE_TECHNIQUE_ADMIN.md`). Le parcours reste donc : paiement + téléchargement automatiques → l'église t'envoie son identifiant machine (bouton déjà prévu dans le logiciel) → tu génères et transmets la clé.

**Renouvellement :** ne réutilise pas les liens Mensuel/Annuel ci-dessus pour un renouvellement — ils ont le .exe attaché, et une église qui renouvelle le retéléchargerait inutilement (confusion possible : "j'ai perdu mon installation ?"). Crée plutôt 2 produits Maketou séparés, "Renouvellement mensuel" et "Renouvellement annuel", au même prix mais sans le .exe (un simple message de confirmation à la place). Ces liens de renouvellement ne vont pas sur le site public : ils sont documentés et utilisés directement dans `GUIDE_TECHNIQUE_ADMIN.md`, section 4, quand une église te contacte via le bouton « Contacter l'administrateur » déjà intégré au logiciel (qui t'envoie automatiquement son nom, son identifiant de licence, sa date d'expiration et son identifiant machine).

**Astuce pour que le paiement reste visuellement sous ton nom de domaine :** dans les réglages de ta boutique Maketou (rubrique "Domaine personnalisé"), tu peux connecter un sous-domaine dédié, par exemple `abonnement.izichurch.com`, plutôt que d'utiliser l'adresse Maketou par défaut. Utilise alors ce sous-domaine dans les liens ci-dessus. Le principe est le même qu'à l'étape 2 de la section précédente : Maketou t'indiquera l'enregistrement DNS exact à créer chez ton bureau d'enregistrement, une fois ton compte créé.

## 4. Mettre à jour le logo et les couleurs

Toutes les couleurs du site sont regroupées en un seul endroit : le bloc `:root { ... }` tout en haut du fichier `css/style.css`. Dès que tu as ton vrai logo et tes vraies couleurs de marque, transmets-les à Claude (ou modifie directement les valeurs `--primary`, `--accent`, etc.) — aucune autre partie du code n'a besoin d'être touchée pour ça.

Le logo est pour l'instant un texte stylisé ("IziChurch") dans l'en-tête et le pied de page (`.logo` dans le HTML). Pour utiliser une vraie image de logo, remplace ces blocs par une balise `<img src="assets/logo.png" alt="IziChurch">` et dépose ton fichier logo dans un dossier `assets/`.

## 5. Mettre à jour le contenu du site plus tard

Tout le texte est directement dans `index.html`, organisé par section (Hero, Pourquoi IziChurch, Fonctionnalités, Tarifs, FAQ). Pas besoin d'outil spécial pour le modifier : reviens simplement dans cette conversation et demande à Claude d'ajuster tel ou tel passage.

## Structure

```
izichurch-site/
  index.html       toutes les sections et tous les textes du site
  css/style.css     design (couleurs modifiables en un seul endroit, voir point 4)
  js/script.js      menu mobile, FAQ, et les liens vers la boutique Maketou (voir point 3)
```
