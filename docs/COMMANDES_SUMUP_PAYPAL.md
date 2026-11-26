# Commandes : SumUp + PayPal (option B)

## Comment ça marche

1. Le client remplit son panier, ses coordonnées et choisit **SumUp (carte)** ou **PayPal**.
2. Son application e-mail s’ouvre avec la commande déjà rédigée ; il clique sur « Envoyer ».
3. Vous recevez l’e-mail. Vous vérifiez le stock et le prix exact de la livraison.
4. Vous créez un lien de paiement **du montant exact** (articles + livraison) et vous l’envoyez au client :
   - **SumUp** : app ou tableau de bord SumUp → Liens de paiement → nouveau lien (paiement unique).
   - **PayPal** : compte PayPal *Business* → Liens et boutons de paiement → nouveau lien.
5. Vous n’expédiez **qu’après** avoir vu le paiement reçu dans SumUp ou PayPal.

Aucun paiement ni aucune donnée bancaire ne passe par le site.

## Ouvrir les commandes

Tant que l’adresse e-mail n’est pas renseignée, le bouton de commande est désactivé.

Sur GitHub, ouvrez `src/shopConfig.ts`, cliquez sur le crayon (modifier), puis :

- remplacez `export const ORDER_EMAIL = '';` par votre adresse, par exemple
  `export const ORDER_EMAIL = 'commandes@votredomaine.fr';`
- mettez vos **vrais tarifs de livraison** dans `SHIPPING_OPTIONS`.

Cliquez sur **Commit changes**. Le site se met à jour automatiquement.
N’écrivez jamais de mot de passe ni de clé secrète dans ce fichier : il est public.

## À faire avant d’accepter de vraies commandes

- Entreprise déclarée (SIRET) et comptes SumUp / PayPal Business vérifiés.
- Pages **Mentions légales**, **CGV** (dont droit de rétractation de 14 jours) et **Confidentialité** complétées et validées par un professionnel. Elles sont encore marquées « à compléter » dans le site.
- Vérifier les prix et la disponibilité réelle des 36 produits.
- L’« espace vendeur » (`#/admin`) reste une démonstration : ses données ne sont enregistrées que dans votre propre navigateur. Il n’est plus affiché aux clients.
