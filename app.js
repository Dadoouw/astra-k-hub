const view=document.querySelector("#view");
const tabs=[...document.querySelectorAll("[data-tab]")];
const pages={
home:()=>`<section class="hero"><div class="kicker">VOTRE VÉHICULE</div><h1>Opel Astra K</h1><div class="sub">2019 · 1.4 Turbo · 125 ch · Elite</div><div class="status">● OBD2 non connecté — données en attente</div></section>
<div class="section">ACCÈS RAPIDES</div><div class="grid">
<button class="tile" data-go="car"><span class="ico">▰</span><strong>Mon Astra</strong><small>Fiche véhicule</small></button>
<button class="tile" data-go="media"><span class="ico">♫</span><strong>Multimédia</strong><small>Musique et audio</small></button>
<button class="tile" data-go="nav"><span class="ico">➤</span><strong>Navigation</strong><small>Waze, Plans…</small></button>
<button class="tile" data-go="settings"><span class="ico">⚙</span><strong>Réglages</strong><small>Personnaliser HUB</small></button></div>
<div class="note">Version 0.1 : interface compagnon prête à personnaliser. La connexion OBD2 sera ajoutée lorsque tu auras choisi ton adaptateur.</div>`,
car:()=>`<h2>Mon Astra</h2><p class="intro">Informations du véhicule</p>${card("▰","Modèle","Opel Astra K Elite")}${card("▦","Année","2019")}${card("⚙","Motorisation","1.4 Turbo · 125 ch")}${card("⌁","Connexion OBD2","Non configurée")}<div class="note">Les valeurs moteur, températures et défauts seront disponibles après ajout d'un adaptateur OBD2 compatible.</div>`,
media:()=>`<h2>Multimédia</h2><p class="intro">Raccourcis vers tes applications audio</p>${card("♫","Spotify","Musique et playlists","https://open.spotify.com")}${card("♪","Apple Music","Bibliothèque musicale","https://music.apple.com")}${card("▶","YouTube Music","Musique en streaming","https://music.youtube.com")}`,
nav:()=>`<h2>Navigation</h2><p class="intro">Choisis ton application de navigation</p>${card("➤","Waze","Trafic et itinéraires","https://waze.com/ul")}${card("⌖","Apple Plans","Navigation Apple","https://maps.apple.com")}${card("▧","Google Maps","Cartes et navigation","https://maps.google.com")}`,
settings:()=>`<h2>Réglages</h2><p class="intro">Personnalisation ASTRA K HUB</p><div class="card" style="display:block"><strong>Nom du véhicule</strong><input id="carname" value="${escapeHtml(localStorage.getItem("carname")||"Mon Astra")}" maxlength="30"><small>Enregistré sur cet iPhone</small></div><div class="card"><strong>Thème graphite / rouge Opel</strong><span class="arrow">Activé</span></div><div class="note">ASTRA K HUB est un projet indépendant, non affilié à Opel ou Apple. Cette version web ne remplace pas l'interface CarPlay.</div>`
};
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function card(icon,title,desc,url){let body=`<span class="icon">${icon}</span><div><strong>${title}</strong><small>${desc}</small></div><span class="arrow">↗</span>`;return url?`<a class="card" href="${url}" target="_blank" rel="noopener">${body}</a>`:`<div class="card">${body}</div>`}
function show(tab){view.innerHTML=pages[tab]();tabs.forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.go)));let input=document.querySelector("#carname");if(input)input.addEventListener("input",()=>localStorage.setItem("carname",input.value));}
tabs.forEach(b=>b.addEventListener("click",()=>show(b.dataset.tab)));show("home");
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
