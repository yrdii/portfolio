let menu = document.querySelector('#menu-bars');
let menuIcon = menu.querySelector('i');
let header = document.querySelector('header');

menu.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    header.classList.toggle('active');
}

window.onscroll = () => {
    menuIcon.classList.remove('fa-times');
    header.classList.remove('active');
}

menu.addEventListener('mouseenter', ()=>{
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-bars-staggered');
});

menu.addEventListener('mouseleave',()=>{
    menuIcon.classList.remove('fa-bars-staggered');
    menuIcon.classList.add('fa-bars');
});

/* let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) => {
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
}

document.querySelectorAll('a').forEach(links => {

    links.onmouseenter = () => {
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () => {
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }
}); */

//share projects
function copyLink(url){
    navigator.clipboard.writeText(url).then(()=>{
        alert('Link copied to clipboard!');
    }).catch(err=>{
        alert('Failed to copy the link.');
    });
}

/* emailjs */
window.addEventListener('DOMContentLoaded', () => {
    const SERVICE_ID = 'service_lyzzldq';
    const TEMPLATE_ID = 'template_8zy9qbf';
    const PUBLIC_KEY = 'DUzq2aDAERZroDxqv';

    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
          .then(() => {
            alert('Message sent successfully!');
            form.reset();
            })
          .catch(err => {
            console.error('Failed to send message:', err);
            alert('Failed to send message. Please try again later.');
            });
    });
});

/* open link in new tab */
function openInNewTab(event, url){
    event.preventDefault();
    window.open(url, '_blank');
}

/* bgm */
window.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  if (!bgm) return;

  bgm.volume = 0.2;
  let bgmStarted = false;

  const startBgmOnClick = () => {
    if (!bgmStarted) {
      bgm.play().then(() => {
        bgmStarted = true;
        document.removeEventListener('click', startBgmOnClick);
      }).catch(err => {
        console.log("Autoplay failed:", err);
      });
    }
  };

  document.addEventListener('click', startBgmOnClick);
});


const toggleBtn = document.getElementById('bgm-toggle');
const icon = document.getElementById('bgm-icon');

toggleBtn.addEventListener('click',()=>{
    if(bgm.paused){
        bgm.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    else{
        bgm.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
});

function updateIcon() {
  if (bgm.paused) {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  } else {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  }
}

bgm.addEventListener('play', updateIcon);
bgm.addEventListener('pause', updateIcon);
updateIcon();

/* slide-in animation */
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.slide-in').forEach(el=>observer.observe(el));

/* progress bar animation */
function animateProgressBars() {
    const bars = document.querySelectorAll('.bar span');

    bars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && bar.style.width === '') {
            bar.style.width = bar.getAttribute('data-progress');
        }
    });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

/* pixel character jump with bgm */
const characters = document.querySelectorAll('.character');

function setJumping(state){
    characters.forEach(char=>{
        if(state) {
            char.classList.add('jumping');
        }
        else{
            char.classList.remove('jumping');
        }
    });
}

bgm.addEventListener('play',()=>setJumping(true));
bgm.addEventListener('pause',()=>setJumping(false));