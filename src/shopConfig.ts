// ─────────────────────────────────────────────────────────────
// KEIGH’S CORNER — RÉGLAGES DE LA BOUTIQUE
// Ce fichier est le seul à modifier pour ouvrir les commandes.
// Il ne doit contenir AUCUN mot de passe ni clé secrète :
// tout ce qui est écrit ici est visible publiquement sur le site.
// ─────────────────────────────────────────────────────────────

// Adresse e-mail qui reçoit les demandes de commande.
// Tant qu’elle est vide, le bouton « Envoyer ma demande » est désactivé
// et aucune commande ne peut être passée.
// Exemple : export const ORDER_EMAIL = 'commandes@exemple.fr';
export const ORDER_EMAIL = ''; // À remettre après immatriculation : 'keighscorner@gmail.com'

// Frais de livraison ESTIMÉS affichés au client (en euros).
// Le montant exact est celui du lien de paiement SumUp ou PayPal
// que vous envoyez après avoir vérifié la commande.
// ⚠ Remplacez par vos vrais tarifs avant d’ouvrir la boutique.
export const SHIPPING_OPTIONS = {
  home: { label: 'À domicile', carrier: 'La Poste', price: 9.9 },
  pickup: { label: 'Point relais', carrier: 'Mondial Relay', price: 6.5 },
  // Autres pays de l’Union européenne : tarif unique.
  eu: { label: 'Livraison Union européenne', carrier: 'La Poste (international)', price: 19.9 },
};

// Pays de livraison : la France + les 26 autres pays de l’Union européenne (codes ISO).
// Les noms s’affichent automatiquement dans la langue du visiteur.
export const EU_COUNTRIES = ['FR','AT','BE','BG','HR','CY','CZ','DK','EE','FI','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'];

// Délai indicatif pour envoyer le lien de paiement (texte affiché au client).
export const PAYMENT_LINK_DELAY = 'sous 24 à 48 h (jours ouvrés)';

// ─────────────────────────────────────────────────────────────
// INFORMATIONS LÉGALES (mentions légales, CGV, confidentialité)
// Laissez '' pour ce que vous n’avez pas encore : le site affichera
// « [à compléter] » en surbrillance. Ne rouvrez pas les commandes
// tant qu’il reste des champs vides.
// ─────────────────────────────────────────────────────────────
export const LEGAL = {
  fullName: '',                       // Prénom et nom, comme à l’immatriculation
  tradeName: 'Keigh’s Corner',        // Nom commercial
  address: '89 avenue Carnot, 93140 Bondy, France',
  phone: '',                          // Obligatoire
  email: 'keighscorner@gmail.com',  // E-mail de contact (affiché publiquement) — à remplacer par l’adresse du domaine
  siren: '',                          // Numéro SIREN reçu après immatriculation
  // Franchise en base de TVA (cas habituel en micro-entreprise) : laissez ce texte.
  // Si vous facturez la TVA, remplacez-le par : 'N° de TVA intracommunautaire : FR…'
  vat: 'TVA non applicable, article 293 B du Code général des impôts',
  mediator: { name: '', address: '', website: '' }, // Médiateur de la consommation (obligatoire)
  returnShippingPaidBy: 'client',     // 'client' ou 'vendeur' : qui paie les frais de retour
  deliveryArea: 'France métropolitaine et dans les autres pays de l’Union européenne',
  host: {
    name: 'GitHub, Inc.',
    address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
    phone: '',                        // ⚠ À confirmer sur le site officiel de GitHub
  },
  lastUpdate: '26 novembre 2026',
};

// Vidéos courtes pour la bande « L’univers Keigh’s Corner » (facultatif).
// Associez l’identifiant d’un produit à l’adresse d’une vidéo .mp4 VERTICALE dont vous
// avez les droits (vos propres vidéos). Sans vidéo, la photo du produit est affichée.
// Exemple : 'leather-handbag-4': 'https://…/ma-video.mp4',
export const GALLERY_VIDEOS: Record<string, string> = {};
