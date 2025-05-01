/**
 * Main JavaScript file for FreedomFit website
 * Updated version for modern CSS implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with improved animation
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Improve accessibility
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = expanded ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when link is clicked
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate navbar height for proper scrolling position
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL but without scrolling (modern browsers only)
                history.pushState(null, null, targetId);
            }
        });
    });

    // Improved navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        const scrollThreshold = 50;
        
        // Check initial scroll position
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        }
        
        // Add throttling to improve performance
        let lastScrollTop = 0;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            lastScrollTop = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (lastScrollTop > scrollThreshold) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // Enhanced Testimonial Slider with better transitions
    const testimonialSlider = {
        slides: document.querySelectorAll('.testimonial-slide'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        currentSlide: 0,
        slideInterval: null,
        
        init: function() {
            if (this.slides.length === 0) return;
            
            // Set up initial slide
            this.showSlide(0);
            
            // Set up event listeners
            if (this.prevBtn && this.nextBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetTimer();
                });
                
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetTimer();
                });
                
                // Start the slideshow
                this.startTimer();
                
                // Pause on hover
                const slidesContainer = document.querySelector('.testimonials-container');
                if (slidesContainer) {
                    slidesContainer.addEventListener('mouseenter', () => this.stopTimer());
                    slidesContainer.addEventListener('mouseleave', () => this.startTimer());
                }
                
                // Add swipe support for mobile
                this.setupSwipeSupport();
            }
        },
        
        showSlide: function(n) {
            this.slides.forEach(slide => {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            });
            
            this.currentSlide = (n + this.slides.length) % this.slides.length;
            this.slides[this.currentSlide].classList.add('active');
            this.slides[this.currentSlide].setAttribute('aria-hidden', 'false');
        },
        
        nextSlide: function() {
            this.showSlide(this.currentSlide + 1);
        },
        
        prevSlide: function() {
            this.showSlide(this.currentSlide - 1);
        },
        
        startTimer: function() {
            this.slideInterval = setInterval(() => this.nextSlide(), 6000);
        },
        
        stopTimer: function() {
            clearInterval(this.slideInterval);
        },
        
        resetTimer: function() {
            this.stopTimer();
            this.startTimer();
        },
        
        setupSwipeSupport: function() {
            const container = document.querySelector('.testimonial-slider');
            if (!container) return;
            
            let touchStartX = 0;
            let touchEndX = 0;
            
            container.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            container.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
            
            this.handleSwipe = function() {
                const threshold = 50;
                if (touchEndX < touchStartX - threshold) {
                    this.nextSlide();
                    this.resetTimer();
                }
                if (touchEndX > touchStartX + threshold) {
                    this.prevSlide();
                    this.resetTimer();
                }
            };
        }
    };
    
    testimonialSlider.init();

    // Improved Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        const scrollThreshold = 300;
        
        // Add throttling for performance
        let lastScrollTop = 0;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            lastScrollTop = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (lastScrollTop > scrollThreshold) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                    ticking = false;
                });
                
                ticking = true;
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Form submission handling with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('.form-control');
        
        // Simple form validation
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Remove error styling as user types
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
        
        function validateField(field) {
            // Remove any existing error message
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            let valid = true;
            
            // Check if required field is empty
            if (field.hasAttribute('required') && !field.value.trim()) {
                showError(field, 'This field is required');
                valid = false;
            } 
            // Check email format if it's an email field
            else if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    valid = false;
                }
            }
            
            return valid;
        }
        
        function showError(field, message) {
            field.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#e53e3e';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.5rem';
            
            field.parentElement.appendChild(errorDiv);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValid = true;
            
            // Validate all fields
            formFields.forEach(field => {
                if (!validateField(field)) {
                    formValid = false;
                }
            });
            
            if (formValid) {
                // Form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Show success message
                const formContainer = contactForm.parentElement;
                contactForm.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="text-align: center; padding: 2rem 1rem;">
                        <div style="font-size: 4rem; color: var(--secondary-color); margin-bottom: 1rem;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Message Sent!</h3>
                        <p style="margin-bottom: 2rem;">Thanks for reaching out, ${name}! I'll get back to you at ${email} soon.</p>
                        <button class="btn" id="sendAnotherBtn">Send Another Message</button>
                    </div>
                `;
                
                formContainer.appendChild(successMessage);
                
                // Add button to return to form
                document.getElementById('sendAnotherBtn').addEventListener('click', function() {
                    successMessage.remove();
                    contactForm.style.display = 'block';
                    contactForm.reset();
                });
                
                // Here you would normally send the form data to a server
                console.log('Form submitted:', { name, email, message });
            }
        });
    }

    // Enhanced Video player functionality
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.video-overlay');
        
        if (video && overlay) {
            // Play video when clicking on the overlay
            overlay.addEventListener('click', function() {
                // Try to play video
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        overlay.style.opacity = '0';
                    })
                    .catch(error => {
                        // Show error or auto-play prevented message
                        console.log('Auto-play prevented:', error);
                    });
                }
            });
            
            // Show overlay when video is paused
            video.addEventListener('pause', function() {
                overlay.style.opacity = '1';
            });
            
            // Hide overlay when video is playing
            video.addEventListener('play', function() {
                overlay.style.opacity = '0';
            });
            
            // Reset overlay when video ends
            video.addEventListener('ended', function() {
                overlay.style.opacity = '1';
                
                // Reset video position
                video.currentTime = 0;
            });
        }
    });

    // Enhanced Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }

    // Modern Animation on scroll with Intersection Observer
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Optionally stop observing after animation
                    if (entry.target.classList.contains('animate-once')) {
                        animationObserver.unobserve(entry.target);
                    }
                } else if (!entry.target.classList.contains('animate-once')) {
                    // Remove class when element is out of view (only for repeating animations)
                    entry.target.classList.remove('animated');
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Adjust based on when animations should trigger
        });
        
        animateElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // Initialize active menu links based on scroll position
    updateActiveMenuLinks();
    
    // Update active menu link on scroll
    window.addEventListener('scroll', function() {
        updateActiveMenuLinks();
    });
    
    function updateActiveMenuLinks() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});
