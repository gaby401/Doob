/* ===== Edit these and nothing else ===== */
const DOOB = {
  ca: "4obhRHTfjDQ5t6LGgrY5gSTR9JenM35USbh2gL6Upump",
  x: "",          // e.g. "https://x.com/doobsol"
  telegram: "",   // e.g. "https://t.me/doobsol"
  memes: [
    ["Bro said “one hit.”", "Thirty-seven minutes later he still hasn't passed the $DOOB. This is no longer a sesh. This is a hostage situation."],
    ["My portfolio and I have something in common.", "We're both extremely high and have no idea what happened last night."],
    ["Doctor: you need to cut back on greens.", "Me, holding $DOOB: that's a candle chart, not a salad."],
    ["Puff, puff, pass.", "Not puff, puff, sell. Read the rules, Kevin."],
    ["“Where do you see yourself in 5 years?”", "Same couch. Bigger bag. Still passing the $DOOB."],
    ["Paper hands can't roll.", "Everyone knows you need steady hands for this."]
  ]
};
/* ======================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const links = {
  pumpfun: `https://pump.fun/coin/${DOOB.ca}`,
  solscan: `https://solscan.io/token/${DOOB.ca}`,
  dex: `https://dexscreener.com/solana/${DOOB.ca}`
};
$$('[data-link]').forEach(a => a.href = links[a.dataset.link]);
$$('[data-ca]').forEach(el => el.textContent = DOOB.ca);
$$('[data-ca-short]').forEach(el => el.textContent = `${DOOB.ca.slice(0, 6)}…${DOOB.ca.slice(-7)}`);
$('[data-year]').textContent = new Date().getFullYear();

// Socials: only render links that are filled in
const socials = [["X / Twitter", DOOB.x], ["Telegram", DOOB.telegram]].filter(([, u]) => u);
const socialBox = $('[data-socials]');
socialBox.innerHTML = [
  `<a class="btn btn-gold" href="${links.pumpfun}" target="_blank" rel="noopener">Enter the rotation</a>`,
  ...socials.map(([n, u]) => `<a class="btn btn-ghost" href="${u}" target="_blank" rel="noopener">${n}</a>`)
].join("");

// Copy contract
const toast = $('.toast');
let toastTimer;
async function copyCA() {
  try { await navigator.clipboard.writeText(DOOB.ca); }
  catch {
    const t = document.createElement('textarea');
    t.value = DOOB.ca; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
$$('[data-copy]').forEach(b => b.addEventListener('click', copyCA));

// Mobile menu
const menuBtn = $('.menu-btn'), nav = $('#navlinks');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? '✕' : '☰';
});
$$('#navlinks a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); menuBtn.textContent = '☰';
}));

// Meme lab
let i = 0;
const card = $('.lab-card');
function showMeme(animate) {
  const [setup, punch] = DOOB.memes[i];
  $('[data-setup]').textContent = setup;
  $('[data-punch]').textContent = punch;
  $('[data-count]').textContent = `${i + 1} / ${DOOB.memes.length}`;
  const text = `${setup} ${punch}\n\n$DOOB 🌿 Puff. Pass. Pump.\n${location.origin}${location.pathname}`;
  $('[data-share]').href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  if (animate) { card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap'); }
}
$('[data-next]').addEventListener('click', () => { i = (i + 1) % DOOB.memes.length; showMeme(true); });
showMeme(false);
