// Intersection Observer options
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

// Animation for Hero section
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
        } else {
            entry.target.style.transform = "translateY(50px)";
            entry.target.style.opacity = "0";
        }
    });
}, observerOptions);

// Animation for How It Works section
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = "translateX(0)";
                    item.style.opacity = "1";
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Animation for Courses section
const coursesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.course-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = "translateY(0)";
                    card.style.opacity = "1";
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Animation for Pricing section
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = "scale(1)";
                    card.style.opacity = "1";
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Start observing sections
document.addEventListener('DOMContentLoaded', () => {
    // Hero animation
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.style.transition = "all 0.8s ease-out";
        heroSection.style.transform = "translateY(50px)";
        heroSection.style.opacity = "0";
        heroObserver.observe(heroSection);
    }

    // How It Works animation
    const timelineItems = document.querySelector('#how-it-works');
    if (timelineItems) {
        const items = timelineItems.querySelectorAll('.timeline-item');
        items.forEach(item => {
            item.style.transition = "all 0.6s ease-out";
            item.style.transform = "translateX(-100px)";
            item.style.opacity = "0";
        });
        timelineObserver.observe(timelineItems);
    }

    // Courses animation
    const coursesSection = document.querySelector('#courses');
    if (coursesSection) {
        const cards = coursesSection.querySelectorAll('.course-card');
        cards.forEach(card => {
            card.style.transition = "all 0.6s ease-out";
            card.style.transform = "translateY(50px)";
            card.style.opacity = "0";
        });
        coursesObserver.observe(coursesSection);
    }

    // Pricing animation
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
        const cards = pricingSection.querySelectorAll('.pricing-card');
        cards.forEach(card => {
            card.style.transition = "all 0.6s ease-out";
            card.style.transform = "scale(0.8)";
            card.style.opacity = "0";
        });
        pricingObserver.observe(pricingSection);
    }
}); 