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
export const ORDER_EMAIL = ''; // À remettre après immatriculation : 'kofei-agyekum@outlook.fr'

// Frais de livraison ESTIMÉS affichés au client (en euros).
// Le montant exact est celui du lien de paiement SumUp ou PayPal
// que vous envoyez après avoir vérifié la commande.
// ⚠ Remplacez par vos vrais tarifs avant d’ouvrir la boutique.
export const SHIPPING_OPTIONS = {
  home: { label: 'À domicile', carrier: 'La Poste', price: 6.9 },
  pickup: { label: 'Point relais', carrier: 'Mondial Relay', price: 4.9 },
};

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
  email: 'kofei-agyekum@outlook.fr',  // E-mail de contact (affiché publiquement)
  siren: '',                          // Numéro SIREN reçu après immatriculation
  // Franchise en base de TVA (cas habituel en micro-entreprise) : laissez ce texte.
  // Si vous facturez la TVA, remplacez-le par : 'N° de TVA intracommunautaire : FR…'
  vat: 'TVA non applicable, article 293 B du Code général des impôts',
  mediator: { name: '', address: '', website: '' }, // Médiateur de la consommation (obligatoire)
  returnShippingPaidBy: 'client',     // 'client' ou 'vendeur' : qui paie les frais de retour
  deliveryArea: 'France métropolitaine',
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
