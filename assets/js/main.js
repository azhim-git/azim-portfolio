// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Use animate for a smoother, slightly lagging follower effect
    cursorDot.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 100, fill: "forwards" });
});

// Interactive elements hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .bento-box, .gallery-item, .menu-toggle');

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-hover');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
