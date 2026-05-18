// Custom Cursor Follower
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
const interactiveElements = document.querySelectorAll('a, button, .reel-card, .youtube-wrapper, .modal-close-btn');

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
        }
    });
};

const revealOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// =========================================
// Cinematic Lightbox Video Modal
// =========================================
const videoModal = document.getElementById('videoModal');
const modalClose = document.getElementById('modalClose');
const modalVideoContainer = document.getElementById('modalVideoContainer');
const modalInstaLink = document.getElementById('modalInstaLink');
const modalFooter = document.getElementById('modalFooter');
const modalContent = videoModal.querySelector('.modal-content');

// Select modal trigger elements
const reelCards = document.querySelectorAll('.reel-card');
const youtubeSpotlight = document.querySelector('.youtube-wrapper');

// Function to activate full-screen video lightbox
function openModal(videoId, type) {
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    
    setTimeout(() => {
        videoModal.classList.add('active');
    }, 10);
    
    let embedHtml = '';
    if (type === 'instagram') {
        modalContent.classList.remove('wide');
        modalFooter.style.display = 'flex';
        modalInstaLink.href = `https://www.instagram.com/reel/${videoId}/`;
        // Inject clean Instagram embed iframe inside modal
        embedHtml = `<iframe src="https://www.instagram.com/reel/${videoId}/embed/" frameborder="0" scrolling="no" allowtransparency="true" style="width: 100%; height: 100%;"></iframe>`;
    } else if (type === 'youtube') {
        modalContent.classList.add('wide');
        modalFooter.style.display = 'none'; // Hide Instagram link for YouTube spotlights
        // Inject high-definition YouTube autoplay iframe inside modal
        embedHtml = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" title="YouTube Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width: 100%; height: 100%;"></iframe>`;
    }
    
    modalVideoContainer.innerHTML = embedHtml;
    cursorDot.classList.remove('cursor-hover');
}

// Function to close video lightbox
function closeModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock background scrolling
    
    setTimeout(() => {
        videoModal.style.display = 'none';
        modalVideoContainer.innerHTML = ''; // Safely destroy iframe player to completely kill video audio
    }, 450);
}

// Attach event listeners to Instagram cards
reelCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        openModal(videoId, 'instagram');
    });
});

// Attach event listener to YouTube spotlight
if (youtubeSpotlight) {
    youtubeSpotlight.addEventListener('click', () => {
        openModal('dN_OirF-4PE', 'youtube');
    });
}

// Close Modal Bindings
modalClose.addEventListener('click', closeModal);
videoModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

// Escape key binding to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
