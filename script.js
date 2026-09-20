/* ---------------- ELI5 ---------------- */
const btn = document.getElementById('eli5btn');
btn.addEventListener('click', () => {
  const on = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!on));
  document.body.classList.toggle('simple', !on);
});

/* ---------------- hero fate cycle ---------------- */
(function(){
  const fates = [...document.querySelectorAll('.fate')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    fates.forEach(f=>f.classList.add('lit')); return;
  }
  let i = 0;
  setInterval(()=>{
    fates.forEach(f=>f.classList.remove('lit'));
    fates[i % fates.length].classList.add('lit');
    i++;
  }, 1100);
})();

/* ---------------- journey map ---------------- */
const STAGES = [
  {n:'Request', who:'Customer', here:false,
   d:'The customer opens the app, picks an order, gives a reason and chooses a pickup slot. This is the only stage where the customer has full control, and the only place where expectations get set.',
   pain:'Pain: the reason dropdown is where retailers quietly lose their most useful data. "Other" is the most-selected option in most systems.'},
  {n:'Pickup', who:'Logistics partner', here:false,
   d:'A courier collects the parcel, or the customer drops it at a point. Scheduling, failed attempts and address problems all live here.',
   pain:'Pain: failed pickups are invisible to the customer, who assumes the retailer is stalling on their refund.'},
  {n:'Receive', who:'Return hub', here:false,
   d:'The parcel arrives at a hub, is scanned and enters a queue. Volume here is unforecastable and spikes hard after sale events.',
   pain:'Pain: queue depth after a festive sale is the single biggest driver of refund delay.'},
  {n:'Inspect &amp; decide', who:'Warehouse inspector', here:true,
   d:'Someone opens the box, looks at the item and makes two judgements at once: is this return legitimate, and what is this item now worth? This is a manual, skilled, inconsistent, expensive step — and it is the stage this case study designs.',
   pain:'Pain: two different inspectors can route the same garment differently. That inconsistency is invisible until a customer complains.'},
  {n:'Disposition', who:'Operations', here:false,
   d:'The item is routed to restock, refurbishment, recycling or scrap. Every step down that ladder destroys recoverable value permanently.',
   pain:'Pain: when in doubt, inspectors route down. Caution is rational for an individual and ruinous in aggregate.'},
  {n:'Refund', who:'Finance', here:false,
   d:'Money or credit returns to the customer, and the case closes. The customer measures the entire experience by how long this took.',
   pain:'Pain: the customer has been waiting since stage one, and has seen nothing since the courier left.'}
];
const jw = document.getElementById('journey'), jd = document.getElementById('jdetail');
STAGES.forEach((s,i)=>{
  const b = document.createElement('button');
  b.className = 'jstep' + (s.here ? ' here' : '');
  b.setAttribute('role','tab');
  b.setAttribute('aria-selected', String(i===3));
  b.innerHTML = '<span class="num">Stage '+(i+1)+'</span><span class="nm">'+s.n+'</span>';
  b.onclick = ()=>{ [...jw.children].forEach(c=>c.setAttribute('aria-selected','false'));
    b.setAttribute('aria-selected','true'); drawStage(i); };
  jw.appendChild(b);
});
function drawStage(i){
  const s = STAGES[i];
  jd.innerHTML = '<div class="who">'+s.who+(s.here?' — this case study lives here':'')+'</div>'+
    '<h3>Stage '+(i+1)+': '+s.n+'</h3><p>'+s.d+'</p><p class="pain">'+s.pain+'</p>';
}
drawStage(3);

/* ---------------- 4C ---------------- */
const CS = [
  {l:'C', w:'Cost', t:'What does this return actually cost us?',
   rows:[
     ['The question','Reverse freight, handling, inspection labour, repackaging, markdown and the reversed sale. Roughly $30 goes out for every $100 that comes back.'],
     ['Ideas','Consolidate returns before shipping them, place return hubs closer to demand, and stop paying to transport items that will never be resold.'],
     ['In this product','<em>Disposition routing.</em> Deciding an item\u2019s fate at the hub rather than after a second journey is where most of the recoverable cost sits.']
   ]},
  {l:'C', w:'Customer', t:'Does this feel fair from the other side?',
   rows:[
     ['The question','82% of shoppers weigh free returns when choosing where to buy, and 71% will avoid a retailer after one bad returns experience. The returns flow is an acquisition surface, not a cost centre.'],
     ['Ideas','State the policy in plain language before purchase, offer flexible pickup, and make the reverse journey trackable the way the forward one is.'],
     ['In this product','<em>Reason, tracker, appeal.</em> Three elements on one screen. The customer never sees a score, only the clause that governed their outcome.']
   ]},
  {l:'C', w:'Control', t:'Can we stop abuse without punishing honest people?',
   rows:[
     ['The question','Around 9% of returns are fraudulent, and 45% of consumers think bending the truth is acceptable. But a wrongly flagged honest customer costs more than a successful small fraud.'],
     ['Ideas','Use behavioural signals over time rather than single-transaction suspicion, and require stronger evidence as value and frequency rise.'],
     ['In this product','<em>The 31\u201365 band.</em> Uncertainty routes to a person rather than to a refusal. Refusing is the one action the system is never allowed to take alone.']
   ]},
  {l:'C', w:'Climate', t:'What did this return cost the planet?',
   rows:[
     ['The question','An estimated 9.5 billion pounds of returned goods reach US landfills annually. A cautious inspector routing a sellable item to scrap creates both a write-off and waste from a single decision.'],
     ['Ideas','Offer exchange before refund, design reusable return packaging, and measure recovery rate as seriously as return rate.'],
     ['In this product','<em>Recovery rate as a pilot metric.</em> Climate stops being a slide and becomes a number the pilot is accountable for.']
   ]}
];
const cg = document.getElementById('cgrid'), cd = document.getElementById('cdetail');
CS.forEach((c,i)=>{
  const b = document.createElement('button');
  b.className='cbtn'; b.setAttribute('role','tab'); b.setAttribute('aria-selected',String(i===0));
  b.innerHTML = '<span class="letter">C</span><span class="word">'+c.w+'</span>';
  b.onclick = ()=>{ [...cg.children].forEach(x=>x.setAttribute('aria-selected','false'));
    b.setAttribute('aria-selected','true'); drawC(i); };
  cg.appendChild(b);
});
function drawC(i){
  const c = CS[i];
  cd.innerHTML = '<h3>'+c.w+' — '+c.t+'</h3>' +
    c.rows.map(r=>'<div class="crow"><b>'+r[0]+'</b><div class="ans">'+r[1]+'</div></div>').join('');
}
drawC(0);

/* ---------------- simulator ---------------- */
/* ---------------- transparent scoring engine ---------------- */
const WEIGHTS = {
  window:  {early:4, mid:14, late:22},
  payment: {prepaid:0, cod:14},
  freq:    {low:0, mid:8, high:14},
  photo:   {clear:0, wear:20, insufficient:55},
  value:   {low:0, mid:5, high:10}
};
const WLABEL = {
  window: {early:'return window: early (day 1–15)', mid:'return window: mid (day 16–24)', late:'return window: late (day 25–30)'},
  payment:{prepaid:'payment: prepaid', cod:'payment: cash on delivery'},
  freq:   {low:'return frequency: 0–1 in 90 days', mid:'return frequency: 2–3 in 90 days', high:'return frequency: 4+ in 90 days'},
  photo:  {clear:'photo: clear & assessable', wear:'photo: visible wear/damage', insufficient:'photo: item not visible'},
  value:  {low:'order value: under ₹3,000', mid:'order value: ₹3,000–7,000', high:'order value: over ₹7,000'}
};
function computeScore(f){
  const parts = [
    ['window', WEIGHTS.window[f.window], WLABEL.window[f.window]],
    ['payment', WEIGHTS.payment[f.payment], WLABEL.payment[f.payment]],
    ['freq', WEIGHTS.freq[f.freq], WLABEL.freq[f.freq]],
    ['photo', WEIGHTS.photo[f.photo], WLABEL.photo[f.photo]],
    ['value', WEIGHTS.value[f.value], WLABEL.value[f.value]]
  ];
  const total = Math.min(100, parts.reduce((s,p)=>s+p[1],0));
  return {total, parts};
}

const CASES = [
  {
    item:'Floral midi dress',
    ctx:'₹2,499 · returned day 6 · prepaid',
    order:['Within 30-day window (day 6)','Prepaid order','First return in 12 months','SKU eligible, in season','Reason given: size too large'],
    photo:'Clear, well-lit photo. Garment flat on a plain surface. Original tags visible and attached. No visible marks or wear.',
    factors:{window:'early', payment:'prepaid', freq:'low', photo:'clear', value:'low'},
    custV:'Approved — self-service',
    custW:'Refund confirmed at pickup scan. The customer sees the clause that governed it and an appeal link they will not need.',
    custChips:['No wait for inspection','Reason shown','Appeal available'],
    itemV:'Restock as new',
    itemW:'Tags intact, no visible wear, in-season SKU. Returns to sellable inventory at full price with a standard quality check.',
    itemChips:['Full value recovered','Zero waste','Standard QC'],
    color:'restock',
    human:'None required, but every self-service approval is sampled for audit. If audit disagreement rises above the agreed threshold, the 0–30 band tightens automatically.'
  },
  {
    item:'Running sneakers',
    ctx:'₹6,200 · returned day 24 · prepaid',
    order:['Day 24 of 30 — near window edge','Prepaid order','4th return in 90 days','High-value SKU','Reason given: uncomfortable'],
    photo:'Adequate photo. Visible scuffing on the outsole and creasing across the upper. Consistent with outdoor wear rather than a single try-on.',
    factors:{window:'mid', payment:'prepaid', freq:'high', photo:'wear', value:'mid'},
    custV:'Held for review — 24 hours',
    custW:'The customer is told a person is checking, and by when. Nothing is refused, and no accusation is implied or recorded on the account.',
    custChips:['Named timeframe','No accusation','Human decides'],
    itemV:'Likely refurbish, pending inspection',
    itemW:'Visible wear rules out full-price restock. Clean and resell as open-box if condition allows; the reviewer sets the final disposition.',
    itemChips:['Partial value','Reviewer decides','Logged override'],
    color:'refurb',
    human:'A trained reviewer sees the photo, the policy clause, the return history and the recommendation — in that order. Their override is logged with a reason and becomes a calibration signal.'
  },
  {
    item:'Wireless headphones',
    ctx:'₹8,900 · returned day 11 · COD',
    order:['Within window (day 11)','Cash on delivery','High-value electronics','Two prior COD returns','Reason given: not working'],
    photo:'Insufficient. Photo shows the sealed outer box only. The item itself is not visible, so no condition assessment is possible.',
    factors:{window:'early', payment:'cod', freq:'mid', photo:'insufficient', value:'high'},
    custV:'One more photo needed',
    custW:'The request is specific and actionable: a photo of the item itself. The customer is told exactly what is missing and why, not simply that their return is "under review".',
    custChips:['Specific ask','Clock paused','Not a refusal'],
    itemV:'No disposition — evidence insufficient',
    itemW:'The system deliberately refuses to guess. High value, COD and an absent item photo together mean any recommendation would be manufactured rather than observed.',
    itemChips:['Refuses to guess','Awaiting evidence','Verification path'],
    color:'scrap',
    human:'Full manual verification. This is the case that matters most for trust: a system that invents a confident answer from a photo of a cardboard box is worse than no system at all.'
  },
  {
    item:'Custom printed tee (POD)',
    ctx:'₹999 · returned day 5 · prepaid',
    order:['Within window (day 5)','Prepaid order','Personalised print — made to order','Supplier defect flag raised','Reason given: print misaligned'],
    photo:'Clear photo. Print is visibly offset from centre by roughly 3cm. Garment itself is unworn with tags attached.',
    factors:{window:'early', payment:'prepaid', freq:'low', photo:'clear', value:'low'},
    defectOverride:true,
    custV:'Approved — defect path',
    custW:'A defect is the retailer\u2019s error, so this skips the standard route entirely: immediate refund or a free reprint, customer\u2019s choice, with no return window applied.',
    custChips:['Retailer at fault','Reprint offered','No window check'],
    itemV:'Recycle — not resellable to anyone',
    itemW:'A personalised item has no second buyer. The disposition fork collapses from four outcomes to two, and the real fix is upstream: a print-alignment check before dispatch.',
    itemChips:['Zero resale value','Material recovery','Supplier chargeback'],
    color:'recycle',
    human:'No review needed for the customer outcome, but the defect is routed to supplier quality. This case is a policy problem wearing a triage costume — the win is preventing it, not sorting it.'
  }
];
const cw = document.getElementById('cases');
let cur = 0;
CASES.forEach((c,i)=>{
  const b=document.createElement('button');
  b.className='case'; b.setAttribute('role','tab'); b.setAttribute('aria-selected',String(i===0));
  b.innerHTML='<span class="item">'+c.item+'</span><span class="ctx">'+c.ctx+'</span>';
  b.onclick=()=>{ [...cw.children].forEach(x=>x.setAttribute('aria-selected','false'));
    b.setAttribute('aria-selected','true'); cur=i; loadCase(i);
    document.getElementById('result').classList.remove('on'); };
  cw.appendChild(b);
});
function loadCase(i){
  const c=CASES[i];
  document.getElementById('evOrder').innerHTML = c.order.map(o=>'<li>'+o+'</li>').join('');
  document.getElementById('evPhoto').textContent = c.photo;
}
loadCase(0);

function runTriage(scroll){
  const c = CASES[cur], r = document.getElementById('result');
  const { total, parts } = computeScore(c.factors);
  r.classList.add('on');
  const nd = document.getElementById('needle');
  nd.style.left='0%'; nd.dataset.score='0';
  requestAnimationFrame(()=>{ setTimeout(()=>{ nd.style.left=total+'%'; nd.dataset.score=total; },40); });
  const band = total<=30 ? 'clear-case band — routed without waiting for a person'
             : total<=65 ? 'human-review band — a trained reviewer decides'
             : 'verification band — more evidence required before any decision';
  document.getElementById('meterkey').textContent = 'Score '+total+' · '+band;
  const breakdown = parts.map(p=>p[2]+' <b>+'+p[1]+'</b>').join(' &nbsp;·&nbsp; ');
  document.getElementById('meterbreak').innerHTML = breakdown +
    (c.defectOverride ? ' &nbsp;·&nbsp; <b style="color:var(--scrap)">defect override active — routed on defect grounds regardless of score</b>' : '');
  document.getElementById('custV').textContent = c.custV;
  document.getElementById('custW').textContent = c.custW;
  document.getElementById('itemV').textContent = c.itemV;
  document.getElementById('itemV').style.color = 'var(--'+c.color+')';
  document.getElementById('itemW').textContent = c.itemW;
  document.getElementById('custChips').innerHTML = c.custChips.map(x=>'<span class="chip">'+x+'</span>').join('');
  document.getElementById('itemChips').innerHTML = c.itemChips.map(x=>'<span class="chip">'+x+'</span>').join('');
  document.getElementById('humanP').textContent = c.human;
  if (scroll) r.scrollIntoView({behavior:'smooth', block:'nearest'});
}
document.getElementById('run').onclick = ()=>runTriage(true);

/* Show a result immediately on load — proof the console works even for a skimming reader */
runTriage(false);

/* ---------------- tracker ---------------- */
const TSTEPS = [
  {t:'Pickup scheduled', d:'Tomorrow, 10am – 1pm'},
  {t:'Collected', d:'Courier scanned your parcel'},
  {t:'Arrived at hub', d:'Mumbai return centre'},
  {t:'Checked', d:'Condition confirmed against your photo'},
  {t:'Refund sent', d:'₹2,499 released to your card'}
];
let tAt = 2;
const tr = document.getElementById('tracker');
function drawTracker(){
  tr.innerHTML = TSTEPS.map((s,i)=>{
    const cls = i<tAt ? 'done' : (i===tAt ? 'now' : '');
    return '<div class="pstep '+cls+'"><span class="pdot"></span><div><div class="pt">'+s.t+
      '</div><div class="pd">'+(i<=tAt ? s.d : 'Pending')+'</div></div></div>';
  }).join('');
}
drawTracker();
tr.onclick = ()=>{ tAt = (tAt+1) % TSTEPS.length; drawTracker(); };
tr.style.cursor='pointer';
document.getElementById('appeal').onclick = function(){
  this.textContent = 'Sent — a person will review this within 24 hours';
  this.style.background = 'var(--reverse)';
};

/* ---------------- Q&A ---------------- */
const QA = [
  ['Why reverse logistics, instead of a normal growth or sales project?',
   'Because growth projects are crowded and this one is not. Everyone studies how to acquire a customer; far fewer study what happens when the customer sends the product back — which is where cost, trust and sustainability all land at once. I also wanted a topic where I would have to build my own structure rather than apply a framework I had been taught.'],
  ['Why did you narrow a global topic down to one decision?',
   'Because a case study claiming to fix the whole reverse chain proves nothing. I mapped six stages and picked stage four — inspect and decide — because it is manual, inconsistent, expensive, and it is the only stage where a single judgement determines both the customer\u2019s experience and the item\u2019s value. The exclusions are on the page with reasons attached. Narrowing is the skill I most wanted to demonstrate.'],
  ['Which of your four Cs is hardest to optimise?',
   'Control. Cost and Climate are measurable and mostly aligned with each other. Customer is measurable. Control is the one where you are trading a real loss against a probabilistic one, and the two errors are not symmetric — a successful small fraud costs one margin, while a wrongly accused loyal customer costs a lifetime of them plus the people they tell. That asymmetry is why the system in this case study is allowed to approve alone but never to refuse alone.'],
  ['Why route instead of decide? Isn\u2019t that just a weaker product?',
   'It is a narrower product, which is different. Refusing a return is a legal and brand act with an appeal process behind it; approving a clear one is not. Building a system that can do both equally would need a much higher bar of evidence than I can justify from a photograph. Routing captures most of the operational value at a fraction of the risk — and it produces the override data you would need before you could ever responsibly automate the harder half.'],
  ['What happens when the photo is unusable?',
   'It routes to verification and asks the customer for a specific missing thing — not a vague "under review". That is the third scenario in the prototype, and I included it deliberately, because the failure mode I most wanted to design against is a system that produces a confident disposition from a photograph of a sealed box. Refusing to guess is a feature I would defend in a review.'],
  ['You are in India. Why is the MVP single-market?',
   'Precisely because I looked at the Indian data. Fashion returns here run 25–40%, and COD return-to-origin sits between 20% and 40% against under 15% for prepaid — payment mode is a bigger signal here than almost anything in a US dataset. A rules engine tuned on prepaid US apparel would systematically misread an Indian COD festive return. Cross-border adds duties and differing consumer-rights regimes on top. The global research is what told me to start local.'],
  ['How would you know this failed?',
   'I would watch four guardrails more closely than the headline metrics: cost falling only because it was shifted to customers as a fee; appeal rate or support contacts rising; errors clustering in one customer segment; and restock rate rising while complaints about item condition rise with it. Any of those means the system is producing a better number and a worse outcome, and I would stop the rollout on it.'],
  ['You built this alone with no prior project experience. What does that say about you in a team?',
   'It says I can take a topic with no given structure and produce a defensible one — research, framework, scope, prototype and the argument tying them together — without being handed a brief. In a team I would expect to be corrected on the operational reality, which I have only read about rather than lived, and I would want that early. What I would bring is the ability to turn a messy area into something a group can actually argue about, and the habit of labelling what is proven versus what is still my opinion.'],
  ['Your own POD section admits prevention beats triage for size/fit returns. Why build triage instead of fixing that upstream?',
   'Because they solve different problems on different timelines, and a team building only one of them is making a bet, not missing an obvious answer. Preventing a bad-fit purchase — better size guides, fit-prediction, clearer photos — attacks the return before it happens, and for pure sizing mismatches it is probably the bigger lever long-term. But prevention only ever reduces the rate; it never reaches zero, and it does nothing for the returns that still arrive — damaged items, wrong sends, changed minds, fraud. Triage is the system that has to exist regardless of how good prevention gets, and it is buildable and testable in weeks against data the company already has, where a fit-prediction model needs sizing and body-shape data most retailers do not yet collect cleanly. My honest sequencing: triage first, because it is the faster path to a working pilot and it generates the override data — which returns were actually bad fits versus damage versus fraud — that a prevention model would need as training data anyway. Prevention is the next case study, and it inherits evidence this one produces. I would not defend triage as the better long-term investment; I would defend it as the right first move.']
];
const qa = document.getElementById('qa');
QA.forEach((q,i)=>{
  const d = document.createElement('div');
  d.className='qitem';
  d.innerHTML = '<button class="qbtn"><span class="qi">'+String(i+1).padStart(2,'0')+
    '</span><span>'+q[0]+'</span><span class="qx">+</span></button>'+
    '<div class="qans"><p>'+q[1]+'</p></div>';
  d.querySelector('.qbtn').onclick = ()=>{ d.toggleAttribute('open'); };
  qa.appendChild(d);
});
