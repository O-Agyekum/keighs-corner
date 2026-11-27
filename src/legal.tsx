// @ts-nocheck
// Pages légales de Keigh’s Corner. Les informations viennent de LEGAL dans shopConfig.ts.
// Le texte français (clés de traduction) est la version qui fait foi ; les traductions
// sont fournies pour la commodité du lecteur (voir src/legalTexts.ts).
// ⚠ Projet rédigé avec l’aide d’un assistant : à faire valider par un professionnel
// (expert-comptable, avocat ou CCI) avant d’accepter des commandes.
import * as React from "react";
import { LEGAL, SHIPPING_OPTIONS, ANALYTICS_TOKEN } from "./shopConfig";
import { tr } from "./i18n";

const { useState } = React;
const L = LEGAL;
const TODO = ({ what }) => <mark className="kc-todo">{tr('[à compléter : {what}]', { what })}</mark>;
const v = (value, what) => (value ? value : <TODO what={what} />);
const LEGIFRANCE_GARANTIE = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045981314';
const LEGIFRANCE_FORMULAIRE = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032887061';
const Mail = () => <a href={'mailto:' + L.email}>{L.email}</a>;
const Updated = () => <p className="kc-muted">{tr('Dernière mise à jour : {date}', { date: L.lastUpdate })}</p>;
// Phrase « Nom, entrepreneur individuel… » avec un marqueur si le nom manque.
const sellerLine = () => {
  const [before, after] = tr('{name}, entrepreneur individuel (EI), exerçant sous le nom commercial {trade}', { trade: L.tradeName }).split('{name}');
  return <>{before}{v(L.fullName, 'prénom et nom')}{after}</>;
};
const mediatorBlock = () => L.mediator?.name
  ? <>{L.mediator.name}{L.mediator.address ? <>, {L.mediator.address}</> : null}{L.mediator.website ? <> — <a href={L.mediator.website} target="_blank" rel="noopener noreferrer">{L.mediator.website}</a></> : null}</>
  : <TODO what="nom, adresse et site du médiateur de la consommation" />;

export function MentionsLegales() {
  return <>
    <Updated />
    <h3>{tr('Éditeur du site')}</h3>
    <p>{sellerLine()}.<br />
      {tr('Adresse :')} {L.address}<br />
      {tr('Téléphone :')} {v(L.phone, 'numéro de téléphone')}<br />
      {tr('E-mail :')} <Mail /><br />
      {tr('Numéro d’immatriculation (SIREN, Registre national des entreprises) :')} {v(L.siren, 'numéro SIREN')}<br />
      {tr(L.vat)}</p>
    <h3>{tr('Directeur de la publication')}</h3>
    <p>{v(L.fullName, 'prénom et nom')}</p>
    <h3>{tr('Hébergeur')}</h3>
    <p>{L.host.name}<br />{tr(L.host.address)}<br />{tr('Téléphone :')} {v(L.host.phone, 'téléphone de l’hébergeur, à vérifier sur le site officiel de GitHub')}</p>
    <p>{tr('Les photographies des produits sont chargées depuis le serveur d’images de Shopify (cdn.shopify.com).')}</p>
    <h3>{tr('Propriété intellectuelle')}</h3>
    <p>{tr('Les textes, photographies, logos et éléments graphiques de ce site appartiennent à {trade} ou sont utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite.', { trade: L.tradeName })}</p>
    <h3>{tr('Conditions de vente et données personnelles')}</h3>
    <p>{tr('Voir les')} <a href="#/cgv">{tr('conditions générales de vente')}</a> {tr('et la')} <a href="#/privacy">{tr('politique de confidentialité')}</a>.</p>
  </>;
}

export function CGV() {
  const returnByClient = L.returnShippingPaidBy !== 'vendeur';
  const T = { trade: L.tradeName };
  return <>
    <Updated />

    <h3>{tr('1. Objet et champ d’application')}</h3>
    <p>{tr('Les présentes conditions générales de vente (CGV) s’appliquent aux ventes de sacs, foulards, écharpes et accessoires conclues à distance entre {trade} et tout consommateur, pour une livraison en {area}. Elles sont accessibles à tout moment sur le site et prévalent sur tout autre document. Le client déclare les avoir lues et acceptées avant de passer commande.', { ...T, area: tr(L.deliveryArea) })}</p>

    <h3>{tr('2. Le vendeur')}</h3>
    <p>{sellerLine()}.<br />{tr('Adresse :')} {L.address} — {tr('Téléphone :')} {v(L.phone, 'numéro de téléphone')} — {tr('E-mail :')} <Mail /><br />{tr('SIREN :')} {v(L.siren, 'numéro SIREN')} — {tr(L.vat)}</p>

    <h3>{tr('3. Produits')}</h3>
    <p>{tr('Les produits sont décrits et photographiés avec le plus grand soin. Les couleurs peuvent légèrement varier selon l’écran utilisé. Les offres sont valables dans la limite des stocks disponibles ; la disponibilité est confirmée au client avant tout paiement.')}</p>

    <h3>{tr('4. Prix')}</h3>
    <p>{tr('Les prix sont indiqués en euros, toutes taxes comprises ({vat}). Les frais de livraison sont indiqués avant la commande à titre d’estimation et le montant exact (produits + livraison) figure dans la confirmation et dans le lien de paiement envoyés au client, avant tout paiement. Aucun frais supplémentaire ne peut être réclamé après le paiement.', { vat: tr(L.vat) })}</p>

    <h3>{tr('5. Commande et conclusion du contrat')}</h3>
    <p>{tr('1) Le client sélectionne ses produits, renseigne ses coordonnées, choisit un mode de livraison et un mode de paiement (SumUp ou PayPal), puis envoie sa demande de commande par e-mail depuis le site.')}<br />
      {tr('2) {trade} vérifie la disponibilité et répond par e-mail avec le récapitulatif de la commande (produits, prix, frais de livraison, total, délai de livraison) et un lien de paiement sécurisé.', T)}<br />
      {tr('3) Le contrat est conclu lorsque le client effectue le paiement via ce lien. {trade} confirme alors la commande par e-mail ; cette confirmation reprend les informations essentielles de la vente et les présentes CGV.', T)}</p>
    <p>{tr('Si un produit n’est plus disponible, le client en est informé et aucun paiement ne lui est demandé pour ce produit.')}</p>

    <h3>{tr('6. Paiement')}</h3>
    <p>{tr('Le paiement s’effectue uniquement sur la page sécurisée de SumUp (carte bancaire) ou de PayPal, au moyen du lien envoyé par e-mail. Aucune donnée bancaire n’est saisie ni conservée sur ce site. La commande est préparée après réception du paiement.')}</p>

    <h3>{tr('7. Livraison')}</h3>
    <p>{tr('Les produits sont livrés en France métropolitaine, à domicile ({home}) ou en point relais ({pickup}), selon le choix du client, ainsi que dans les autres pays de l’Union européenne ({eu}, tarif unique de {eufee}). Le délai de livraison est indiqué dans le récapitulatif envoyé avant le paiement. À défaut d’indication, la livraison intervient au plus tard trente jours après la conclusion du contrat (article L. 216-1 du Code de la consommation). En cas de retard, le client peut exercer les droits prévus aux articles L. 216-6 et suivants du Code de la consommation.', { home: SHIPPING_OPTIONS.home.carrier, pickup: SHIPPING_OPTIONS.pickup.carrier, eu: SHIPPING_OPTIONS.eu.carrier, eufee: SHIPPING_OPTIONS.eu.price.toFixed(2).replace('.', ',') + ' €' })}</p>
    <p>{tr('Le risque de perte ou d’endommagement des produits est transféré au client au moment où il en prend physiquement possession (article L. 216-4 du Code de la consommation). En cas de colis abîmé, il est conseillé de le signaler au transporteur et à {trade} dès réception.', T)}</p>

    <h3>{tr('8. Droit de rétractation')}</h3>
    <p>{tr('Le client dispose d’un délai de quatorze jours pour se rétracter, sans avoir à motiver sa décision (articles L. 221-18 et suivants du Code de la consommation). Ce délai court à compter de la réception du produit par le client ou par un tiers qu’il a désigné.')}</p>
    <p>{tr('Pour l’exercer, le client informe {trade} de sa décision avant l’expiration du délai :', T)}<br />
      {tr('– en utilisant la fonction')} <a href="#/retractation"><b>« {tr('Se rétracter du contrat ici')} »</b></a> {tr('disponible sur le site ;')}<br />
      {tr('– ou en envoyant le formulaire de rétractation figurant en annexe des présentes CGV ;')}<br />
      {tr('– ou par toute autre déclaration dénuée d’ambiguïté, par e-mail à')} <Mail /> {tr('ou par courrier à l’adresse indiquée à l’article 2.')}<br />
      {tr('Un accusé de réception de la rétractation est envoyé au client par e-mail sans délai.')}</p>
    <p>{tr('Le client renvoie les produits au plus tard quatorze jours après avoir communiqué sa décision, à l’adresse indiquée à l’article 2.')} {returnByClient
      ? <b>{tr('Les frais directs de renvoi sont à la charge du client.')}</b>
      : tr('Les frais de renvoi sont pris en charge par {trade}.', T)} {tr('Les produits doivent être retournés complets et en bon état ; la responsabilité du client peut être engagée en cas de dépréciation résultant de manipulations autres que celles nécessaires pour établir leur nature, leurs caractéristiques et leur bon fonctionnement.')}</p>
    <p>{tr('{trade} rembourse la totalité des sommes versées, y compris les frais de livraison initiaux (dans la limite du mode de livraison standard le moins cher proposé), au plus tard quatorze jours après avoir été informé de la décision de rétractation. Le remboursement peut être différé jusqu’à la récupération des produits ou jusqu’à ce que le client ait fourni une preuve de leur expédition. Il est effectué par le même moyen de paiement que celui utilisé pour la commande (SumUp ou PayPal), sauf accord du client pour un autre moyen, sans frais pour lui.', T)}</p>

    <h3>{tr('9. Garanties légales')}</h3>
    <p>{tr('Les produits bénéficient de la garantie légale de conformité (articles L. 217-3 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 à 1649 du Code civil).')}</p>
    <div className="kc-safety"><b>{tr('Encadré obligatoire sur la garantie légale de conformité')}</b> {tr('(article D. 211-2 du Code de la consommation).')}<br />
      <TODO what="recopier ici, mot pour mot, le modèle d’encadré pour les ventes de biens publié sur Légifrance" /><br />
      {tr('Texte officiel :')} <a href={LEGIFRANCE_GARANTIE} target="_blank" rel="noopener noreferrer">{tr('Annexe à l’article D. 211-2 du Code de la consommation (Légifrance)')}</a></div>
    <p>{tr('Pour toute demande au titre des garanties, le client contacte {trade} à', T)} <Mail />.</p>

    <h3>{tr('10. Réclamations et médiation')}</h3>
    <p>{tr('Toute réclamation peut être adressée à {trade} par e-mail ou par courrier (article 2). En cas de litige non résolu, le client peut recourir gratuitement au médiateur de la consommation suivant (article L. 612-1 du Code de la consommation) :', T)}<br />{mediatorBlock()}</p>

    <h3>{tr('11. Données personnelles')}</h3>
    <p>{tr('Les données du client sont traitées conformément à la')} <a href="#/privacy">{tr('politique de confidentialité')}</a>.</p>

    <h3>{tr('12. Droit applicable')}</h3>
    <p>{tr('Les présentes CGV sont soumises au droit français. Elles ne privent pas le consommateur des dispositions protectrices de la loi de son pays de résidence lorsqu’elles s’appliquent.')}</p>

    <h3 id="formulaire">{tr('Annexe — Formulaire de rétractation')}</h3>
    <p className="kc-muted">{tr('(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)')}</p>
    <div className="kc-legal-form">
      <p>{tr('À l’attention de')} {v(L.fullName, 'prénom et nom')} — {L.tradeName}, {L.address}, <Mail /> :</p>
      <p>{tr('Je/nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*)/pour la prestation de services (*) ci-dessous :')}</p>
      <p>{tr('Commandé le (*)/reçu le (*) :')}</p>
      <p>{tr('Nom du (des) consommateur(s) :')}</p>
      <p>{tr('Adresse du (des) consommateur(s) :')}</p>
      <p>{tr('Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) :')}</p>
      <p>{tr('Date :')}</p>
      <p>{tr('(*) Rayez la mention inutile.')}</p>
    </div>
    <p className="kc-muted">{tr('Modèle officiel :')} <a href={LEGIFRANCE_FORMULAIRE} target="_blank" rel="noopener noreferrer">{tr('Annexe à l’article R. 221-1 du Code de la consommation (Légifrance)')}</a>.</p>
  </>;
}

export function Confidentialite() {
  const T = { trade: L.tradeName };
  return <>
    <Updated />
    <h3>{tr('Responsable du traitement')}</h3>
    <p>{sellerLine()} — {L.address} — <Mail /></p>

    <h3>{tr('Données collectées')}</h3>
    <p>{tr('Lorsque vous passez commande ou nous écrivez : nom, prénom, e-mail, téléphone, adresse de livraison, point relais, contenu de la commande et vos messages. Ces données nous parviennent dans l’e-mail que vous envoyez.')}</p>
    <p>{tr('Si vous demandez à être prévenu(e) du retour d’un article (« Me prévenir »), nous utilisons uniquement votre adresse e-mail pour vous envoyer cette information, puis nous supprimons la demande.')}</p>
    <p>{tr('Vos données bancaires ne sont jamais collectées par ce site : le paiement se fait sur la page de SumUp ou de PayPal.')}</p>

    <h3>{tr('Finalités et bases légales')}</h3>
    <p>{tr('– Traiter votre commande, le paiement, la livraison, les retours et le service client : exécution du contrat (article 6.1.b du RGPD).')}<br />
      {tr('– Tenir notre comptabilité et répondre à nos obligations légales : obligation légale (article 6.1.c du RGPD).')}<br />
      {tr('Nous n’utilisons pas vos données pour de la publicité et ne les vendons pas.')}</p>

    <h3>{tr('Destinataires')}</h3>
    <p>{tr('Vos données sont accessibles uniquement à {trade} et, pour ce qui les concerne, à :', T)}<br />
      {tr('– SumUp ou PayPal, pour le paiement (selon leur propre politique de confidentialité) ;')}<br />
      {tr('– La Poste ou Mondial Relay, pour la livraison ;')}<br />
      {tr('– Google (service de messagerie Gmail), qui héberge notre boîte e-mail.')}<br />
      {tr('Certains de ces prestataires peuvent traiter des données hors de l’Union européenne, avec les garanties prévues par le RGPD.')}</p>

    <h3>{tr('Durée de conservation')}</h3>
    <p>{tr('Les données de commande sont conservées le temps de la relation commerciale et des garanties légales, puis archivées pendant la durée imposée par la loi pour les documents comptables (dix ans, article L. 123-22 du Code de commerce). Les messages sans commande sont supprimés au plus tard un an après le dernier échange.')}</p>

    <h3>{tr('Vos droits')}</h3>
    <p>{tr('Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour les exercer :')} <Mail /> {tr('ou par courrier à l’adresse ci-dessus. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (')}<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).</p>

    <h3>{tr('Stockage dans votre navigateur')}</h3>
    <p>{tr('Votre panier et vos favoris sont enregistrés uniquement dans votre navigateur (stockage local), pour faire fonctionner le panier. Ils ne nous sont pas transmis.')} {ANALYTICS_TOKEN?tr('Ce site n’utilise aucun cookie publicitaire. Pour connaître le nombre de visites, nous utilisons Cloudflare Web Analytics, un outil de mesure d’audience conçu sans cookie ni identifiant personnel : les données sont agrégées et ne nous permettent pas de vous identifier.'):tr('Ce site n’utilise ni cookie publicitaire ni outil de mesure d’audience.')}</p>

    <h3>{tr('Hébergement et images')}</h3>
    <p>{tr('Le site est hébergé par {host} ({hostaddr}). Les photos des produits sont chargées depuis le serveur d’images de Shopify. Comme pour toute page web, ces prestataires reçoivent techniquement votre adresse IP lorsque vous consultez le site.', { host: L.host.name, hostaddr: tr(L.host.address) })}</p>
  </>;
}

export function Retractation() {
  const empty = { name: '', email: '', orderRef: '', orderedOn: '', receivedOn: '', items: '', address: '' };
  const [f, setF] = useState(empty), [step, setStep] = useState('form');
  const up = (k, val) => setF(p => ({ ...p, [k]: val }));
  // L’e-mail de rétractation est rédigé en français : c’est la version qui fait foi et que le vendeur lit.
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
  const dis = step === 'confirm';
  if (step === 'sent') return <div className="kc-legal-form">
    <h3>{tr('Dernière étape : envoyez l’e-mail')}</h3>
    <p>{tr('Votre application e-mail s’est ouverte avec votre déclaration de rétractation.')} <b>{tr('Cliquez sur « Envoyer »')}</b>{tr('. Nous vous enverrons un accusé de réception par e-mail sans délai.')}</p>
    <p>{tr('L’e-mail ne s’est pas ouvert ? Écrivez à')} <a href={'mailto:' + L.email}><b>{L.email}</b></a> {tr('en recopiant ce texte :')}</p>
    <pre className="kc-pre">{text()}</pre>
    <a className="button outline" href={mailto()}>{tr('Ouvrir à nouveau l’e-mail')}</a>
  </div>;
  return <form className="checkout-form" onSubmit={e => { e.preventDefault(); if (step === 'form') { setStep('confirm'); return; } setStep('sent'); window.location.href = mailto(); }}>
    <p>{tr('Vous disposez de quatorze jours à compter de la réception de votre commande pour vous rétracter, sans motif. Remplissez ce formulaire, puis confirmez. Voir l’article 8 des')} <a href="#/cgv">{tr('CGV')}</a>.</p>
    <div className="kc-two"><label>{tr('Nom et prénom *')}<input required autoComplete="name" value={f.name} onChange={e => up('name', e.target.value)} disabled={dis} /></label><label>{tr('E-mail *')}<input required type="email" autoComplete="email" value={f.email} onChange={e => up('email', e.target.value)} disabled={dis} /></label></div>
    <div className="kc-two"><label>{tr('Référence de commande *')}<input required value={f.orderRef} onChange={e => up('orderRef', e.target.value)} placeholder="KC-2026-…" disabled={dis} /></label><label>{tr('Produit(s) concerné(s) *')}<input required value={f.items} onChange={e => up('items', e.target.value)} disabled={dis} /></label></div>
    <div className="kc-two"><label>{tr('Commandé le *')}<input required type="date" value={f.orderedOn} onChange={e => up('orderedOn', e.target.value)} disabled={dis} /></label><label>{tr('Reçu le')}<input type="date" value={f.receivedOn} onChange={e => up('receivedOn', e.target.value)} disabled={dis} /></label></div>
    <label>{tr('Votre adresse *')}<input required autoComplete="street-address" value={f.address} onChange={e => up('address', e.target.value)} disabled={dis} /></label>
    {step === 'form'
      ? <button type="submit" className="button dark full">{tr('Continuer')}</button>
      : <><div className="kc-safety">{tr('Vérifiez vos informations. En cliquant sur « Confirmer la rétractation », votre application e-mail s’ouvre avec votre déclaration ; envoyez-la pour qu’elle nous parvienne.')}</div>
        <div className="kc-payment-actions"><button type="submit" className="button dark full">{tr('Confirmer la rétractation')}</button><button type="button" className="button outline full" onClick={() => setStep('form')}>{tr('Modifier')}</button></div></>}
  </form>;
}
