document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form data
            if (!data.name || !data.email || !data.message) {
                showMessage('Vennligst fyll ut alle felt', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showMessage('Vennligst skriv inn en gyldig e-postadresse', 'error');
                return;
            }
            
            try {
                // Here you would typically send the data to your server
                console.log('Form data:', data);
                
                // Show success message
                showMessage('Takk for din henvendelse! Vi tar kontakt snart.', 'success');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage('Beklager, det oppstod en feil. Vennligst prøv igjen senere.', 'error');
            }
        });
    }

    // Helper functions
    function showMessage(message, type = 'success') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        // Trigger reflow
        messageElement.offsetHeight;
        
        // Add show class for animation
        messageElement.classList.add('show');
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add message styles
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            transform: translateY(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .message.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .message.success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .message.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat, .contact-form').forEach(element => {
        observer.observe(element);
    });

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card, .stat, .contact-form {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }

        .service-card.animate, .stat.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .service-card:nth-child(2) {
            transition-delay: 0.2s;
        }

        .service-card:nth-child(3) {
            transition-delay: 0.4s;
        }

        .stat:nth-child(2) {
            transition-delay: 0.2s;
        }

        .stat:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(animationStyle);

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const xOffset = (x - 0.5) * speed * 100;
            const yOffset = (y - 0.5) * speed * 100;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });

        card.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
        });
    }

    // Initialize testimonial slider
    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}); 