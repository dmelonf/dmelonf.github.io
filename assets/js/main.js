
// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const opts = {root:null, rootMargin:"0px 0px -60% 0px", threshold:0.1};
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.getAttribute('id');
    const link = document.querySelector('.nav a[href="#'+id+'"]');
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      if(link) link.classList.add('active');
    }
  });
}, opts);
sections.forEach(s=>observer.observe(s));

// Replace banner background if user uploads assets/img/banner.(jpg|png|webp)
(function(){
  const banner = document.querySelector('.hero .banner');
  const tryPaths = ['assets/img/banner.jpg','assets/img/banner.png','assets/img/banner.webp'];
  const test = (src)=> new Promise(res=>{ const i = new Image(); i.onload=()=>res(src); i.onerror=()=>res(null); i.src = src; });
  Promise.all(tryPaths.map(test)).then(results=>{
    const valid = results.find(Boolean);
    if(valid) banner.style.background = `url('${valid}') center/cover no-repeat`;
  });
})();

// Smooth scroll for in-page links in Safari/old browsers
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
      history.replaceState(null, "", '#'+id);
    }
  });
});
