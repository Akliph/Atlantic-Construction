/*
    Slideshow
*/
const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".carousel-button.next");
const prevBtn = document.querySelector(".carousel-button.prev");
const TRANSITION_MS = 600;
const AUTOPLAY_MS = 5000;
let slides = Array.from(track.children);
let currentSlideIndex = 1;
let isTransitioning = false;


// Clone first and last slides for seamless transition
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add('clone');
lastClone.classList.add('clone');

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);
slides = Array.from(track.children);

// Slide setup
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`
})
track.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
moveToSlide(currentSlideIndex, { animate: false });  // ensures you start on the correct slide without animation



// Translate the entire track by the length of one slide
function moveToSlide(index) {
    track.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
    track.style.transform = `translateX(-${index * 100}%)`;
    currentSlideIndex = index;
}

function snapToSlide(index) {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * 100}%)`;
    track.offsetHeight;
    track.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`; 
    currentSlideIndex = index;
}

// On click translate to the left
nextBtn.addEventListener("click", () => {
    let nextIndex = currentSlideIndex + 1;

    moveToSlide(nextIndex);

    if (nextIndex === slides.length - 1) {
        track.addEventListener("transitionend", function handler() {
            snapToSlide(1);
            track.removeEventListener("transitionend", handler);
        });
    }
});


prevBtn.addEventListener("click", () => {
    let prevIndex = currentSlideIndex - 1;

    moveToSlide(prevIndex);
    if (prevIndex === 0) {
        track.addEventListener("transitionend", function handler() {
            snapToSlide(slides.length - 2);
            track.removeEventListener("transitionend", handler);
        });
    }
});

/*
    Scroll Indicator
*/

const scrollIndicator = document.getElementById("scroll-indicator");

window.addEventListener("scroll", () => {
    const fadeStart = 0;
    const fadeEnd = 300; 
    let opacity = 1 - window.scrollY / fadeEnd;
    if (opacity < 0) opacity = 0;
    scrollIndicator.style.opacity = opacity;
});

/*
    Button Routing
*/
let btn;
btn = document.getElementById("our-team");
btn.onclick = () => {
    location.href = "team.html"
};

btn = document.getElementById("about");
btn.onclick = () => {
    location.href = "about.html"
};

btn = document.getElementById("contact-us");
btn.onclick = () => {
    location.href = "contact.html"
};
btn = document.getElementById("project-portfolio");
btn.onclick = () => {
    location.href = "projects.html"
};
