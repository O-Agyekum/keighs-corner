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
