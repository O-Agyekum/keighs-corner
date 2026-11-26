// @ts-nocheck
// Pages légales de Keigh’s Corner. Les informations viennent de LEGAL dans shopConfig.ts.
// ⚠ Projet rédigé avec l’aide d’un assistant : à faire valider par un professionnel
// (expert-comptable, avocat ou CCI) avant d’accepter des commandes.
import * as React from "react";
import { LEGAL, SHIPPING_OPTIONS } from "./shopConfig";

const { useState } = React;
const L = LEGAL;
const TODO = ({ what }) => <mark className="kc-todo">[à compléter : {what}]</mark>;
const v = (value, what) => (value ? value : <TODO what={what} />);
const LEGIFRANCE_GARANTIE = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045981314';
const LEGIFRANCE_FORMULAIRE = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032887061';
const sellerLine = () => <>{v(L.fullName, 'prénom et nom')}, entrepreneur individuel (EI), exerçant sous le nom commercial {L.tradeName}</>;
const mediatorBlock = () => L.mediator?.name
  ? <>{L.mediator.name}{L.mediator.address ? <>, {L.mediator.address}</> : null}{L.mediator.website ? <> — <a href={L.mediator.website} target="_blank" rel="noopener noreferrer">{L.mediator.website}</a></> : null}</>
  : <TODO what="nom, adresse et site du médiateur de la consommation" />;

export function MentionsLegales() {
  return <>
    <p className="kc-muted">Dernière mise à jour : {L.lastUpdate}</p>
    <h3>Éditeur du site</h3>
    <p>{sellerLine()}.<br />
      Adresse : {L.address}<br />
      Téléphone : {v(L.phone, 'numéro de téléphone')}<br />
      E-mail : <a href={'mailto:' + L.email}>{L.email}</a><br />
      Numéro d’immatriculation (SIREN, Registre national des entreprises) : {v(L.siren, 'numéro SIREN')}<br />
      {L.vat}</p>
    <h3>Directeur de la publication</h3>
    <p>{v(L.fullName, 'prénom et nom')}</p>
    <h3>Hébergeur</h3>
    <p>{L.host.name}<br />{L.host.address}<br />Téléphone : {v(L.host.phone, 'téléphone de l’hébergeur, à vérifier sur le site officiel de GitHub')}</p>
    <p>Les photographies des produits sont chargées depuis le serveur d’images de Shopify (cdn.shopify.com).</p>
    <h3>Propriété intellectuelle</h3>
    <p>Les textes, photographies, logos et éléments graphiques de ce site appartiennent à {L.tradeName} ou sont utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite.</p>
    <h3>Conditions de vente et données personnelles</h3>
    <p>Voir les <a href="#/cgv">conditions générales de vente</a> et la <a href="#/privacy">politique de confidentialité</a>.</p>
  </>;
}

export function CGV() {
  const returnByClient = L.returnShippingPaidBy !== 'vendeur';
  return <>
    <p className="kc-muted">Dernière mise à jour : {L.lastUpdate}</p>

    <h3>1. Objet et champ d’application</h3>
    <p>Les présentes conditions générales de vente (CGV) s’appliquent aux ventes de sacs, foulards, écharpes et accessoires conclues à distance entre {L.tradeName} et tout consommateur, pour une livraison en {L.deliveryArea}. Elles sont accessibles à tout moment sur le site et prévalent sur tout autre document. Le client déclare les avoir lues et acceptées avant de passer commande.</p>

    <h3>2. Le vendeur</h3>
    <p>{sellerLine()}.<br />Adresse : {L.address} — Téléphone : {v(L.phone, 'numéro de téléphone')} — E-mail : <a href={'mailto:' + L.email}>{L.email}</a><br />SIREN : {v(L.siren, 'numéro SIREN')} — {L.vat}</p>

    <h3>3. Produits</h3>
    <p>Les produits sont décrits et photographiés avec le plus grand soin. Les couleurs peuvent légèrement varier selon l’écran utilisé. Les offres sont valables dans la limite des stocks disponibles ; la disponibilité est confirmée au client avant tout paiement.</p>

    <h3>4. Prix</h3>
    <p>Les prix sont indiqués en euros, toutes taxes comprises ({L.vat}). Les frais de livraison sont indiqués avant la commande à titre d’estimation et le montant exact (produits + livraison) figure dans la confirmation et dans le lien de paiement envoyés au client, avant tout paiement. Aucun frais supplémentaire ne peut être réclamé après le paiement.</p>

    <h3>5. Commande et conclusion du contrat</h3>
    <p>1) Le client sélectionne ses produits, renseigne ses coordonnées, choisit un mode de livraison et un mode de paiement (SumUp ou PayPal), puis envoie sa demande de commande par e-mail depuis le site.<br />
      2) {L.tradeName} vérifie la disponibilité et répond par e-mail avec le récapitulatif de la commande (produits, prix, frais de livraison, total, délai de livraison) et un lien de paiement sécurisé.<br />
      3) Le contrat est conclu lorsque le client effectue le paiement via ce lien. {L.tradeName} confirme alors la commande par e-mail ; cette confirmation reprend les informations essentielles de la vente et les présentes CGV.</p>
    <p>Si un produit n’est plus disponible, le client en est informé et aucun paiement ne lui est demandé pour ce produit.</p>

    <h3>6. Paiement</h3>
    <p>Le paiement s’effectue uniquement sur la page sécurisée de SumUp (carte bancaire) ou de PayPal, au moyen du lien envoyé par e-mail. Aucune donnée bancaire n’est saisie ni conservée sur ce site. La commande est préparée après réception du paiement.</p>

    <h3>7. Livraison</h3>
    <p>Les produits sont livrés en {L.deliveryArea}, à domicile ({SHIPPING_OPTIONS.home.carrier}) ou en point relais ({SHIPPING_OPTIONS.pickup.carrier}), selon le choix du client. Le délai de livraison est indiqué dans le récapitulatif envoyé avant le paiement. À défaut d’indication, la livraison intervient au plus tard trente jours après la conclusion du contrat (article L. 216-1 du Code de la consommation). En cas de retard, le client peut exercer les droits prévus aux articles L. 216-6 et suivants du Code de la consommation.</p>
    <p>Le risque de perte ou d’endommagement des produits est transféré au client au moment où il en prend physiquement possession (article L. 216-4 du Code de la consommation). En cas de colis abîmé, il est conseillé de le signaler au transporteur et à {L.tradeName} dès réception.</p>

    <h3>8. Droit de rétractation</h3>
    <p>Le client dispose d’un délai de quatorze jours pour se rétracter, sans avoir à motiver sa décision (articles L. 221-18 et suivants du Code de la consommation). Ce délai court à compter de la réception du produit par le client ou par un tiers qu’il a désigné.</p>
    <p>Pour l’exercer, le client informe {L.tradeName} de sa décision avant l’expiration du délai :<br />
      – en utilisant la fonction <a href="#/retractation"><b>« Se rétracter du contrat ici »</b></a> disponible sur le site ;<br />
      – ou en envoyant le formulaire de rétractation figurant en annexe des présentes CGV ;<br />
      – ou par toute autre déclaration dénuée d’ambiguïté, par e-mail à <a href={'mailto:' + L.email}>{L.email}</a> ou par courrier à l’adresse indiquée à l’article 2.<br />
      Un accusé de réception de la rétractation est envoyé au client par e-mail sans délai.</p>
    <p>Le client renvoie les produits au plus tard quatorze jours après avoir communiqué sa décision, à l’adresse indiquée à l’article 2. {returnByClient
      ? <><b>Les frais directs de renvoi sont à la charge du client.</b></>
      : <>Les frais de renvoi sont pris en charge par {L.tradeName}.</>} Les produits doivent être retournés complets et en bon état ; la responsabilité du client peut être engagée en cas de dépréciation résultant de manipulations autres que celles nécessaires pour établir leur nature, leurs caractéristiques et leur bon fonctionnement.</p>
    <p>{L.tradeName} rembourse la totalité des sommes versées, y compris les frais de livraison initiaux (dans la limite du mode de livraison standard le moins cher proposé), au plus tard quatorze jours après avoir été informé de la décision de rétractation. Le remboursement peut être différé jusqu’à la récupération des produits ou jusqu’à ce que le client ait fourni une preuve de leur expédition. Il est effectué par le même moyen de paiement que celui utilisé pour la commande (SumUp ou PayPal), sauf accord du client pour un autre moyen, sans frais pour lui.</p>

    <h3>9. Garanties légales</h3>
    <p>Les produits bénéficient de la garantie légale de conformité (articles L. 217-3 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 à 1649 du Code civil).</p>
    <div className="kc-safety"><b>Encadré obligatoire sur la garantie légale de conformité</b> (article D. 211-2 du Code de la consommation).<br />
      <TODO what="recopier ici, mot pour mot, le modèle d’encadré pour les ventes de biens publié sur Légifrance" /><br />
      Texte officiel : <a href={LEGIFRANCE_GARANTIE} target="_blank" rel="noopener noreferrer">Annexe à l’article D. 211-2 du Code de la consommation (Légifrance)</a></div>
    <p>Pour toute demande au titre des garanties, le client contacte {L.tradeName} à <a href={'mailto:' + L.email}>{L.email}</a>.</p>

    <h3>10. Réclamations et médiation</h3>
    <p>Toute réclamation peut être adressée à {L.tradeName} par e-mail ou par courrier (article 2). En cas de litige non résolu, le client peut recourir gratuitement au médiateur de la consommation suivant (article L. 612-1 du Code de la consommation) :<br />{mediatorBlock()}</p>

    <h3>11. Données personnelles</h3>
    <p>Les données du client sont traitées conformément à la <a href="#/privacy">politique de confidentialité</a>.</p>

    <h3>12. Droit applicable</h3>
    <p>Les présentes CGV sont soumises au droit français. Elles ne privent pas le consommateur des dispositions protectrices de la loi de son pays de résidence lorsqu’elles s’appliquent.</p>

    <h3 id="formulaire">Annexe — Formulaire de rétractation</h3>
    <p className="kc-muted">(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)</p>
    <div className="kc-legal-form">
      <p>À l’attention de {v(L.fullName, 'prénom et nom')} — {L.tradeName}, {L.address}, <a href={'mailto:' + L.email}>{L.email}</a> :</p>
      <p>Je/nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*)/pour la prestation de services (*) ci-dessous :</p>
      <p>Commandé le (*)/reçu le (*) :</p>
      <p>Nom du (des) consommateur(s) :</p>
      <p>Adresse du (des) consommateur(s) :</p>
      <p>Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) :</p>
      <p>Date :</p>
      <p>(*) Rayez la mention inutile.</p>
    </div>
    <p className="kc-muted">Modèle officiel : <a href={LEGIFRANCE_FORMULAIRE} target="_blank" rel="noopener noreferrer">Annexe à l’article R. 221-1 du Code de la consommation (Légifrance)</a>.</p>
  </>;
}

export function Confidentialite() {
  return <>
    <p className="kc-muted">Dernière mise à jour : {L.lastUpdate}</p>
    <h3>Responsable du traitement</h3>
    <p>{sellerLine()} — {L.address} — <a href={'mailto:' + L.email}>{L.email}</a></p>

    <h3>Données collectées</h3>
    <p>Lorsque vous passez commande ou nous écrivez : nom, prénom, e-mail, téléphone, adresse de livraison, point relais, contenu de la commande et vos messages. Ces données nous parviennent dans l’e-mail que vous envoyez.</p>
    <p>Vos données bancaires ne sont jamais collectées par ce site : le paiement se fait sur la page de SumUp ou de PayPal.</p>

    <h3>Finalités et bases légales</h3>
    <p>– Traiter votre commande, le paiement, la livraison, les retours et le service client : exécution du contrat (article 6.1.b du RGPD).<br />
      – Tenir notre comptabilité et répondre à nos obligations légales : obligation légale (article 6.1.c du RGPD).<br />
      Nous n’utilisons pas vos données pour de la publicité et ne les vendons pas.</p>

    <h3>Destinataires</h3>
    <p>Vos données sont accessibles uniquement à {L.tradeName} et, pour ce qui les concerne, à :<br />
      – SumUp ou PayPal, pour le paiement (selon leur propre politique de confidentialité) ;<br />
      – La Poste ou Mondial Relay, pour la livraison ;<br />
      – Microsoft (service de messagerie Outlook), qui héberge notre boîte e-mail.<br />
      Certains de ces prestataires peuvent traiter des données hors de l’Union européenne, avec les garanties prévues par le RGPD.</p>

    <h3>Durée de conservation</h3>
    <p>Les données de commande sont conservées le temps de la relation commerciale et des garanties légales, puis archivées pendant la durée imposée par la loi pour les documents comptables (dix ans, article L. 123-22 du Code de commerce). Les messages sans commande sont supprimés au plus tard un an après le dernier échange.</p>

    <h3>Vos droits</h3>
    <p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour les exercer : <a href={'mailto:' + L.email}>{L.email}</a> ou par courrier à l’adresse ci-dessus. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).</p>

    <h3>Stockage dans votre navigateur</h3>
    <p>Votre panier et vos favoris sont enregistrés uniquement dans votre navigateur (stockage local), pour faire fonctionner le panier. Ils ne nous sont pas transmis. Ce site n’utilise ni cookie publicitaire ni outil de mesure d’audience.</p>

    <h3>Hébergement et images</h3>
    <p>Le site est hébergé par {L.host.name} ({L.host.address}). Les photos des produits sont chargées depuis le serveur d’images de Shopify. Comme pour toute page web, ces prestataires reçoivent techniquement votre adresse IP lorsque vous consultez le site.</p>
  </>;
}

export function Retractation() {
  const empty = { name: '', email: '', orderRef: '', orderedOn: '', receivedOn: '', items: '', address: '' };
  const [f, setF] = useState(empty), [step, setStep] = useState('form');
  const up = (k, val) => setF(p => ({ ...p, [k]: val }));
  const text = () => [
    `À l’attention de ${L.fullName || L.tradeName} — ${L.tradeName}, ${L.address}, ${L.email}`, ``,
    `Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous :`,
    `Produit(s) : ${f.items}`,
    `Référence de commande : ${f.orderRef}`,
    `Commandé le : ${f.orderedOn}${f.receivedOn ? ` — reçu le : ${f.receivedOn}` : ''}`,
    `Nom du consommateur : ${f.name}`,
    `Adresse du consommateur : ${f.address}`,
    `E-mail : ${f.email}`,
    `Date : ${new Date().toLocaleDateString('fr-FR')}`,
  ].join('\n');
  const mailto = () => 'mailto:' + L.email + '?subject=' + encodeURIComponent('Rétractation — commande ' + f.orderRef) + '&body=' + encodeURIComponent(text());
  if (step === 'sent') return <div className="kc-legal-form">
    <h3>Dernière étape : envoyez l’e-mail</h3>
    <p>Votre application e-mail s’est ouverte avec votre déclaration de rétractation. <b>Cliquez sur « Envoyer »</b>. Nous vous enverrons un accusé de réception par e-mail sans délai.</p>
    <p>L’e-mail ne s’est pas ouvert ? Écrivez à <a href={'mailto:' + L.email}><b>{L.email}</b></a> en recopiant ce texte :</p>
    <pre className="kc-pre">{text()}</pre>
    <a className="button outline" href={mailto()}>Ouvrir à nouveau l’e-mail</a>
  </div>;
  return <form className="checkout-form" onSubmit={e => { e.preventDefault(); if (step === 'form') { setStep('confirm'); return; } setStep('sent'); window.location.href = mailto(); }}>
    <p>Vous disposez de quatorze jours à compter de la réception de votre commande pour vous rétracter, sans motif. Remplissez ce formulaire, puis confirmez. Voir l’article 8 des <a href="#/cgv">CGV</a>.</p>
    <div className="kc-two"><label>Nom et prénom *<input required autoComplete="name" value={f.name} onChange={e => up('name', e.target.value)} disabled={step === 'confirm'} /></label><label>E-mail *<input required type="email" autoComplete="email" value={f.email} onChange={e => up('email', e.target.value)} disabled={step === 'confirm'} /></label></div>
    <div className="kc-two"><label>Référence de commande *<input required value={f.orderRef} onChange={e => up('orderRef', e.target.value)} placeholder="KC-2026-…" disabled={step === 'confirm'} /></label><label>Produit(s) concerné(s) *<input required value={f.items} onChange={e => up('items', e.target.value)} disabled={step === 'confirm'} /></label></div>
    <div className="kc-two"><label>Commandé le *<input required type="date" value={f.orderedOn} onChange={e => up('orderedOn', e.target.value)} disabled={step === 'confirm'} /></label><label>Reçu le<input type="date" value={f.receivedOn} onChange={e => up('receivedOn', e.target.value)} disabled={step === 'confirm'} /></label></div>
    <label>Votre adresse *<input required autoComplete="street-address" value={f.address} onChange={e => up('address', e.target.value)} disabled={step === 'confirm'} /></label>
    {step === 'form'
      ? <button type="submit" className="button dark full">Continuer</button>
      : <><div className="kc-safety">Vérifiez vos informations. En cliquant sur « Confirmer la rétractation », votre application e-mail s’ouvre avec votre déclaration ; envoyez-la pour qu’elle nous parvienne.</div>
        <div className="kc-payment-actions"><button type="submit" className="button dark full">Confirmer la rétractation</button><button type="button" className="button outline full" onClick={() => setStep('form')}>Modifier</button></div></>}
  </form>;
}
