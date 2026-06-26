const NASA_API_KEY = 'bVMUmOxUkHwlzhtQBOL7nfP41XyOThI9k10nRNkz';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
const LAUNCHES_URL = 'https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10&mode=list';

const imgBase = 'https://raw.githubusercontent.com/Mohammed-Al-Masry/cosmos-space-dashboard/main/assets/images/';
const planets = [
  {name:'Mercury',au:'0.39',diameter:'4,879',mass:'0.055',period:'88 days',moons:'0',type:'Terrestrial',img:imgBase+'mercury.png',radius:'2,440 km',gravity:'3.7 m/s²',density:'5.43 g/cm³',rotation:'58.6 days',axis:'0.03°',temp:'167°C',escape:'4.3 km/s',discovered:'Known since antiquity',date:'Ancient',desc:'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its surface is heavily cratered and experiences extreme temperature swings.',facts:['Closest planet to the Sun','No natural satellites','Very thin exosphere','Smallest planet in our solar system'],peri:'46.0M km',aph:'69.8M km',ecc:'0.2056',inc:'7.00°'},
  {name:'Venus',au:'0.72',diameter:'12,104',mass:'0.815',period:'225 days',moons:'0',type:'Terrestrial',img:imgBase+'venus.png',radius:'6,052 km',gravity:'8.87 m/s²',density:'5.24 g/cm³',rotation:'243 days',axis:'177.36°',temp:'464°C',escape:'10.4 km/s',discovered:'Known since antiquity',date:'Ancient',desc:'Venus is the second planet from the Sun. It has a dense carbon dioxide atmosphere and is the hottest planet in the Solar System.',facts:['Hottest planet','Rotates backwards','Thick cloud layer','Similar size to Earth'],peri:'107.5M km',aph:'108.9M km',ecc:'0.0067',inc:'3.39°'},
  {name:'Earth',au:'1.00',diameter:'12,742',mass:'1.000',period:'365.2 days',moons:'1',type:'Terrestrial',img:imgBase+'earth.png',radius:'6,371 km',gravity:'9.8 m/s²',density:'5.51 g/cm³',rotation:'24 hours',axis:'23.44°',temp:'15°C',escape:'11.2 km/s',discovered:'Known since antiquity',date:'Ancient',desc:"Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land and 71% is covered with water.",facts:['Only known planet with liquid water','Atmosphere contains 78% nitrogen','Magnetic field protects from solar wind','Formed 4.54 billion years ago'],peri:'147.1M km',aph:'152.1M km',ecc:'0.0167',inc:'0.00°'},
  {name:'Mars',au:'1.52',diameter:'6,779',mass:'0.107',period:'687 days',moons:'2',type:'Terrestrial',img:imgBase+'mars.png',radius:'3,390 km',gravity:'3.71 m/s²',density:'3.93 g/cm³',rotation:'24.6 hours',axis:'25.19°',temp:'-65°C',escape:'5.0 km/s',discovered:'Known since antiquity',date:'Ancient',desc:'Mars is the fourth planet from the Sun, known as the Red Planet because of iron oxide on its surface.',facts:['Home to Olympus Mons','Has polar ice caps','Two small moons','Robotic missions explore it'],peri:'206.7M km',aph:'249.2M km',ecc:'0.0934',inc:'1.85°'},
  {name:'Jupiter',au:'5.20',diameter:'139,820',mass:'317.8',period:'11.9 years',moons:'79',type:'Gas Giant',img:imgBase+'jupiter.png',radius:'69,911 km',gravity:'24.79 m/s²',density:'1.33 g/cm³',rotation:'9.9 hours',axis:'3.13°',temp:'-110°C',escape:'59.5 km/s',discovered:'Known since antiquity',date:'Ancient',desc:'Jupiter is the largest planet in the Solar System, a gas giant famous for its Great Red Spot and many moons.',facts:['Largest planet','Great Red Spot storm','Strong magnetic field','Many moons'],peri:'740.6M km',aph:'816.4M km',ecc:'0.0489',inc:'1.30°'},
  {name:'Saturn',au:'9.58',diameter:'116,460',mass:'95.2',period:'29.5 years',moons:'82',type:'Gas Giant',img:imgBase+'saturn.png',radius:'58,232 km',gravity:'10.44 m/s²',density:'0.69 g/cm³',rotation:'10.7 hours',axis:'26.73°',temp:'-140°C',escape:'35.5 km/s',discovered:'Known since antiquity',date:'Ancient',desc:'Saturn is the sixth planet from the Sun and is best known for its spectacular ring system.',facts:['Bright ring system','Least dense planet','Moon Titan has atmosphere','Gas giant'],peri:'1.35B km',aph:'1.51B km',ecc:'0.0565',inc:'2.49°'},
  {name:'Uranus',au:'19.22',diameter:'50,724',mass:'14.5',period:'84.0 years',moons:'27',type:'Ice Giant',img:imgBase+'uranus.png',radius:'25,362 km',gravity:'8.69 m/s²',density:'1.27 g/cm³',rotation:'17.2 hours',axis:'97.77°',temp:'-195°C',escape:'21.3 km/s',discovered:'William Herschel',date:'1781',desc:'Uranus is an ice giant with a blue-green color caused by methane. It rotates on its side.',facts:['Rotates on its side','Methane gives blue-green color','Has faint rings','First planet found by telescope'],peri:'2.73B km',aph:'3.01B km',ecc:'0.0457',inc:'0.77°'},
  {name:'Neptune',au:'30.05',diameter:'49,244',mass:'17.1',period:'164.8 years',moons:'14',type:'Ice Giant',img:imgBase+'neptune.png',radius:'24,622 km',gravity:'11.15 m/s²',density:'1.64 g/cm³',rotation:'16.1 hours',axis:'28.32°',temp:'-200°C',escape:'23.5 km/s',discovered:'Urbain Le Verrier & Johann Galle',date:'1846',desc:'Neptune is the farthest known major planet from the Sun and has powerful winds and storms.',facts:['Fastest planetary winds','Deep blue appearance','Moon Triton orbits backwards','Discovered mathematically'],peri:'4.46B km',aph:'4.54B km',ecc:'0.0113',inc:'1.77°'}
];


function $(id){ return document.getElementById(id); }
function setHTML(id, value){ const el=$(id); if(el) el.innerHTML=value; }
function setText(id, value){ const el=$(id); if(el) el.textContent=value; }
function escapeHTML(value=''){return String(value).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));}

function initActiveNav(){
  const page=document.body.dataset.page;
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active', a.dataset.page===page));
}

async function loadAPOD(){
  if(!$('apodMedia')) return;
  try{
    const res = await fetch(APOD_URL);
    if(!res.ok) throw new Error('NASA APOD request failed');
    const data = await res.json();
    setText('apodSub', 'Astronomy Picture of the Day - ' + (data.date || 'Today'));
    setHTML('apodTitle', `<i class="fa-solid fa-star"></i> ${escapeHTML(data.title || 'NASA APOD')}`);
    setText('apodDate', data.date || 'Today');
    setText('detailDate', data.date || 'Today');
    setText('detailType', data.media_type || 'Image');
    setHTML('apodDesc', `<i class="fa-solid fa-circle-info"></i> ${escapeHTML(data.explanation || '')}`);
    setHTML('apodCopy', `<i class="fa-regular fa-copyright"></i> ${escapeHTML(data.copyright || 'NASA / Public Domain')}`);
    if($('fullRes')) $('fullRes').href = data.hdurl || data.url || '#';
    $('apodMedia').className = '';
    if(data.media_type === 'video') $('apodMedia').innerHTML = `<iframe src="${data.url}" allowfullscreen></iframe>`;
    else $('apodMedia').innerHTML = `<img src="${data.url}" alt="${escapeHTML(data.title || 'Astronomy Picture of the Day')}">`;
  }catch(e){
    setHTML('apodMedia','<span>Could not load NASA APOD. Check API key or internet connection.</span>');
    setHTML('apodTitle','<i class="fa-solid fa-triangle-exclamation"></i> Loading Error');
    setText('apodDesc', e.message);
  }
}

function statusClass(status=''){
  const s=status.toLowerCase();
  if(s.includes('go')) return 'go';
  if(s.includes('hold') || s.includes('tbd')) return 'hold';
  if(s.includes('success')) return 'success';
  return 'upcoming';
}

function safeGetImage(l){
  return l.image?.image_url || l.image || 'https://raw.githubusercontent.com/Mohammed-Al-Masry/cosmos-space-dashboard/main/assets/images/launch-placeholder.png';
}
function launchDateParts(net){
  if(!net) return {day:'TBD', dateLong:'TBD', dateShort:'TBD', time:'TBD'};
  const d = new Date(net);
  return {
    day: new Intl.DateTimeFormat('en-US',{weekday:'long'}).format(d),
    dateLong: new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric'}).format(d),
    dateShort: new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric'}).format(d),
    time: new Intl.DateTimeFormat('en-US',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:'UTC',timeZoneName:'short'}).format(d)
  };
}
function renderFeaturedLaunch(l){
  const date = launchDateParts(l.net);
  const status = l.status?.abbrev || l.status?.name || 'Go';
  const provider = l.launch_service_provider?.name || 'Unknown Provider';
  const rocket = l.rocket?.configuration?.name || l.rocket?.configuration?.full_name || 'Rocket TBD';
  const location = l.pad?.location?.name || 'Launch site TBD';
  const country = l.pad?.location?.country?.name || l.pad?.location?.country || 'TBD';
  const desc = l.mission?.description || l.mission?.name || 'Mission details will be announced soon.';
  const image = safeGetImage(l);
  return `<div class="featured-launch-card">
    <div class="featured-launch-inner">
      <div class="featured-copy">
        <div>
          <div class="featured-badges"><span class="featured-pill"><i class="fas fa-star"></i> Featured Launch</span><span class="status-pill">${escapeHTML(status)}</span></div>
          <h3 class="featured-title">${escapeHTML(l.name || 'Upcoming Launch')}</h3>
          <div class="featured-provider"><span><i class="fas fa-building"></i>${escapeHTML(provider)}</span><span><i class="fas fa-rocket"></i>${escapeHTML(rocket)}</span></div>
          <div class="featured-info-grid">
            <div class="featured-info-box"><p><i class="fas fa-calendar"></i>Launch Date</p><b>${escapeHTML(date.day)}, ${escapeHTML(date.dateLong)}</b></div>
            <div class="featured-info-box"><p><i class="fas fa-clock"></i>Launch Time</p><b>${escapeHTML(date.time)}</b></div>
            <div class="featured-info-box"><p><i class="fas fa-map-marker-alt"></i>Location</p><b>${escapeHTML(location)}</b></div>
            <div class="featured-info-box"><p><i class="fas fa-globe"></i>Country</p><b>${escapeHTML(country)}</b></div>
          </div>
          <p class="featured-desc">${escapeHTML(desc)}</p>
        </div>
        <div class="featured-actions"><button class="details-btn"><i class="fas fa-info-circle"></i> View Full Details</button><div class="icon-actions"><button><i class="far fa-heart"></i></button><button><i class="fas fa-bell"></i></button></div></div>
      </div>
      <div class="featured-image"><img src="${image}" alt="${escapeHTML(l.name || 'rocket image')} rocket image"></div>
    </div>
  </div>`;
}
function renderLaunchCard(l){
  const date = launchDateParts(l.net);
  const provider = l.launch_service_provider?.name || 'Unknown Provider';
  const rocket = l.rocket?.configuration?.name || l.rocket?.configuration?.full_name || 'Rocket TBD';
  const location = l.pad?.location?.name || 'Launch site TBD';
  const image = safeGetImage(l);
  return `<div class="original-launch-card">
    <div class="original-launch-img"><img src="${image}" alt="${escapeHTML(l.name || 'rocket image')} rocket image" loading="lazy"><span class="go-tag">Go</span></div>
    <div class="original-launch-content">
      <h4>${escapeHTML(l.name || 'Upcoming Launch')}</h4>
      <p class="original-provider"><i class="fas fa-building"></i>${escapeHTML(provider)}</p>
      <div class="launch-lines">
        <div><i class="fas fa-calendar"></i><span>${escapeHTML(date.dateShort)}</span></div>
        <div><i class="fas fa-clock"></i><span>${escapeHTML(date.time)}</span></div>
        <div><i class="fas fa-rocket"></i><span>${escapeHTML(rocket)}</span></div>
        <div><i class="fas fa-map-marker-alt"></i><span>${escapeHTML(location)}</span></div>
      </div>
      <div class="card-footer"><button class="details-small">Details</button><button class="small-action"><i class="far fa-heart"></i></button></div>
    </div>
  </div>`;
}
async function loadLaunches(){
  const legacyList = $('launchList');
  const featured = $('featuredLaunch');
  const grid = $('launchesGrid');
  if(!legacyList && !featured && !grid) return;
  try{
    const res = await fetch(LAUNCHES_URL);
    if(!res.ok) throw new Error('Launch Library request failed');
    const data = await res.json();
    const launches = data.results || [];
    setText('launchCount', launches.length || 10);
    if(featured || grid){
      if(featured) featured.innerHTML = launches[0] ? renderFeaturedLaunch(launches[0]) : '<div class="launch-error">No launch data available</div>';
      if(grid) grid.innerHTML = launches.slice(1).map(renderLaunchCard).join('');
    }else if(legacyList){
      legacyList.innerHTML = launches.map((l,idx)=>`<article class="launch"><span class="badge">#${idx+1}</span><h4>${escapeHTML(l.name)}</h4><p>${escapeHTML(l.launch_service_provider?.name || 'Unknown Provider')}</p></article>`).join('');
    }
  }catch(e){
    const msg = `<div class="launch-error"><h4>Launch data unavailable</h4><p>${escapeHTML(e.message)}</p></div>`;
    if(featured) featured.innerHTML = msg;
    if(grid) grid.innerHTML = '';
    if(legacyList) legacyList.innerHTML = msg;
  }
}

function renderPlanets(active='Earth'){
  if(!$('planetTabs') && !$('planetTable')) return;
  setText('planetCount', planets.length);
  if($('planetTabs')){
    $('planetTabs').innerHTML = planets.map(p=>`<button class="planet-tab ${p.name===active?'active':''}" data-name="${p.name}"><img src="${p.img}" alt="${p.name}"><b>${p.name}</b><span>${p.au} AU</span></button>`).join('');
    document.querySelectorAll('.planet-tab').forEach(btn=>btn.addEventListener('click',()=>renderPlanets(btn.dataset.name)));
    const p = planets.find(x=>x.name===active) || planets[2];
    $('planetDetails').innerHTML = `<div class="planet-hero"><img src="${p.img}" alt="${p.name} planet detailed realistic render"><h3>${p.name}</h3></div><div class="planet-content"><h3><i class="fa-solid fa-globe"></i> ${p.name}</h3><p>${p.desc}</p><div class="metrics"><div class="metric"><span>Semimajor Axis</span><b>${Number(p.au*149.6).toFixed(1)}M km</b></div><div class="metric"><span>Mean Radius</span><b>${p.radius}</b></div><div class="metric"><span>Mass</span><b>${p.mass} Earth</b></div><div class="metric"><span>Density</span><b>${p.density}</b></div><div class="metric"><span>Orbital Period</span><b>${p.period}</b></div><div class="metric"><span>Rotation Period</span><b>${p.rotation}</b></div><div class="metric"><span>Moons</span><b>${p.moons}</b></div><div class="metric"><span>Gravity</span><b>${p.gravity}</b></div></div><div class="info-grid"><div class="info-box"><h4><i class="fa-solid fa-magnifying-glass"></i> Discovery Info</h4><div class="orbital"><div><span>Discovered By</span><b>${p.discovered}</b></div><div><span>Discovery Date</span><b>${p.date}</b></div><div><span>Body Type</span><b>Planet</b></div><div><span>Volume</span><b>N/A</b></div></div></div><div class="info-box"><h4><i class="fa-solid fa-lightbulb"></i> Quick Facts</h4><ul>${p.facts.map(f=>`<li>${f}</li>`).join('')}</ul></div><div class="info-box"><h4><i class="fa-solid fa-route"></i> Orbital Characteristics</h4><div class="orbital"><div><span>Perihelion</span><b>${p.peri}</b></div><div><span>Aphelion</span><b>${p.aph}</b></div><div><span>Eccentricity</span><b>${p.ecc}</b></div><div><span>Inclination</span><b>${p.inc}</b></div></div></div><div class="info-box"><h4><i class="fa-solid fa-temperature-half"></i> Planet Conditions</h4><div class="orbital"><div><span>Axial Tilt</span><b>${p.axis}</b></div><div><span>Avg Temperature</span><b>${p.temp}</b></div><div><span>Escape Velocity</span><b>${p.escape}</b></div></div><a class="learn" target="_blank" href="https://en.wikipedia.org/wiki/${p.name}">Learn More</a></div></div></div>`;
  }
  if($('planetTable')) $('planetTable').innerHTML = planets.map(row=>`<tr><td>${row.name}</td><td>${row.au}</td><td>${row.diameter}</td><td>${row.mass}</td><td>${row.period}</td><td>${row.moons}</td><td>${row.type}</td></tr>`).join('');
}

initActiveNav();
const loadTodayBtn=$('loadToday'); if(loadTodayBtn) loadTodayBtn.addEventListener('click', loadAPOD);
const refreshLaunches=$('refreshLaunches'); if(refreshLaunches) refreshLaunches.addEventListener('click', loadLaunches);
renderPlanets();
loadAPOD();
loadLaunches();
