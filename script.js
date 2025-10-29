// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip empty hash links
    if (anchor.getAttribute('href') === '#') return;
    
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .app-card, .tech-card, .problem-card, .study-card, .value');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Dynamic stat counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(counter);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'K+';
    }
    if (num >= 100) {
        return num.toString();
    }
    // For percentages >= 90, show with > prefix
    if (num >= 90) {
        return '>' + Math.floor(num).toString() + '%';
    }
    return num.toString() + '%';
}

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat) => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const num = parseFloat(text) * (text.includes('K') ? 1000 : 1);
                    animateCounter(stat, num);
                } else if (text.includes('%')) {
                    // Handle ">" prefix in percentage (e.g., ">90%")
                    const cleanText = text.replace('>', '');
                    const num = parseFloat(cleanText);
                    if (!isNaN(num)) {
                        animateCounter(stat, num);
                    }
                } else if (text.includes('M')) {
                    stat.style.opacity = '0';
                    setTimeout(() => {
                        stat.style.transition = 'opacity 0.5s ease-in';
                        stat.style.opacity = '1';
                    }, 200);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Animate large stats in clinical section
const clinicalStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statLarges = entry.target.querySelectorAll('.stat-large');
            statLarges.forEach((stat, index) => {
                setTimeout(() => {
                    const text = stat.textContent;
                    if (text.includes('+') || text.includes('%')) {
                        // Handle ">" prefix (e.g., ">90%")
                        const cleanText = text.replace('>', '');
                        const num = parseFloat(cleanText);
                        if (!isNaN(num)) {
                            animateCounter(stat, num, 2000);
                        }
                    }
                }, index * 200);
            });
            clinicalStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const clinicalStats = document.querySelector('.clinical-stats');
if (clinicalStats) {
    clinicalStatsObserver.observe(clinicalStats);
}

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            mobileMenu.style.display = 'none';
            mobileMenuBtn.classList.remove('active');
        }
    }, 250);
});

// Scroll reveal for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    revealSections();
});

window.addEventListener('scroll', revealSections);

// Professional Brain Signal Analyzer with Pain Detection
class BrainSignalAnalyzer {
    constructor() {
        this.painGaugeCanvas = document.getElementById('painGaugeCanvas');
        this.signalCanvas = document.getElementById('signalCanvas');
        
        if (!this.painGaugeCanvas || !this.signalCanvas) return;
        
        this.painGaugeCtx = this.painGaugeCanvas.getContext('2d');
        this.signalCtx = this.signalCanvas.getContext('2d');
        
        // Set canvas sizes
        this.painGaugeCanvas.width = 200;
        this.painGaugeCanvas.height = 200;
        this.signalCanvas.width = 1200;
        this.signalCanvas.height = 180;
        
        // Signal parameters
        this.samplingRate = 250; // Hz
        this.duration = 15; // 15 seconds
        this.numSamples = this.samplingRate * this.duration;
        this.timeOffset = 0;
        
        // Create pain profile over 15 seconds with different zones
        this.painProfile = this.createPainProfile();
        this.currentPain = 5.2;
        this.currentReliability = 'Good';
        
        this.init();
    }
    
    createPainProfile() {
        const profile = [];
        const sections = [
            { duration: 3, level: 2.0, reliability: 'High' },   // 0-3s: Low (Green)
            { duration: 3, level: 4.5, reliability: 'Good' },   // 3-6s: Moderate (Yellow)
            { duration: 3, level: 7.0, reliability: 'Fair' },   // 6-9s: High (Red)
            { duration: 3, level: 5.5, reliability: 'Good' },   // 9-12s: Moderate (Yellow)
            { duration: 3, level: 8.0, reliability: 'Fair' }    // 12-15s: Severe (Red)
        ];
        
        let totalSampleIndex = 0;
        
        for (let sectionIdx = 0; sectionIdx < sections.length; sectionIdx++) {
            const section = sections[sectionIdx];
            const samples = Math.floor(section.duration * this.samplingRate);
            const nextSection = sections[sectionIdx + 1];
            
            for (let i = 0; i < samples; i++) {
                // Smooth transition to next section
                let painValue = section.level;
                if (nextSection && i > samples * 0.7) {
                    // Gradual transition in last 30% of section
                    const transitionProgress = (i - samples * 0.7) / (samples * 0.3);
                    painValue = section.level + (nextSection.level - section.level) * transitionProgress;
                }
                
                // Add slow-varying smooth variation using low-frequency sine waves
                const t = totalSampleIndex / this.samplingRate;
                // Multiple slow sine waves at different frequencies for natural variation
                const slowVariation1 = 0.15 * Math.sin(2 * Math.PI * 0.3 * t); // 0.3 Hz
                const slowVariation2 = 0.1 * Math.sin(2 * Math.PI * 0.5 * t + 1.5); // 0.5 Hz
                const slowVariation3 = 0.08 * Math.sin(2 * Math.PI * 0.15 * t + 3); // 0.15 Hz
                const totalVariation = slowVariation1 + slowVariation2 + slowVariation3;
                
                profile.push({
                    pain: Math.max(0, Math.min(10, painValue + totalVariation)),
                    reliability: section.reliability
                });
                
                totalSampleIndex++;
            }
        }
        
        return profile;
    }
    
    // Generate realistic raw EEG signal with pain correlation
    generateRawEEG(sampleIndex, painLevel) {
        const t = sampleIndex / this.samplingRate;
        let signal = 0;
        const noise = (Math.random() - 0.5) * 2.0;
        
        // Pain-correlated patterns
        const painFactor = painLevel / 10;
        
        // Alpha waves (8-13 Hz) decrease with pain
        signal += (20 * (1 - painFactor * 0.5)) * Math.sin(2 * Math.PI * 10 * t);
        
        // Theta waves (4-8 Hz)
        signal += (10 + painFactor * 3) * Math.sin(2 * Math.PI * 6 * t + Math.PI/4);
        
        // Beta waves (13-30 Hz) increase with pain
        signal += (8 + painFactor * 15) * Math.sin(2 * Math.PI * 18 * t + Math.PI/3);
        
        // Delta baseline (1-4 Hz)
        signal += 6 * Math.sin(2 * Math.PI * 2.5 * t);
        
        // Amplitude increases with pain
        signal *= (1 + painFactor * 0.3);
        
        return signal + noise;
    }
    
    // Draw signal with color-coded pain zones
    drawSignal() {
        const ctx = this.signalCtx;
        const width = this.signalCanvas.width;
        const height = this.signalCanvas.height;
        const centerY = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw background grid
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = (i / 4) * height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Vertical grid lines (every 3 seconds)
        for (let i = 0; i <= 5; i++) {
            const x = (i / 5) * width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw time labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 15; i += 3) {
            const x = (i / 15) * width;
            ctx.fillText(`${i}s`, x, height - 5);
        }
        
        // Get current pain at indicator position FIRST (for proper synchronization)
        const currentSampleIdx = Math.floor(this.timeOffset) % this.painProfile.length;
        const currentData = this.painProfile[currentSampleIdx];
        const currentPain = currentData.pain;
        
        // Helper function to get pain color
        const getPainColor = (pain) => {
            if (pain < 3) {
                const intensity = 0.15 + (pain / 3) * 0.15;
                return `rgba(16, 185, 129, ${intensity})`;
            } else if (pain < 6) {
                const intensity = 0.2 + ((pain - 3) / 3) * 0.2;
                return `rgba(234, 179, 8, ${intensity})`;
            } else {
                const intensity = 0.3 + ((pain - 6) / 4) * 0.25;
                return `rgba(239, 68, 68, ${intensity})`;
            }
        };
        
        // Draw pain zone backgrounds across the entire signal (showing all pain levels in time)
        const samplesPerPixel = this.numSamples / width;
        for (let x = 0; x < width; x++) {
            const sampleIdx = Math.floor(x * samplesPerPixel) % this.painProfile.length;
            const painData = this.painProfile[sampleIdx];
            const pain = painData.pain;
            
            ctx.fillStyle = getPainColor(pain);
            ctx.fillRect(x, 0, 1, height);
        }
        
        // Draw EEG signal
        ctx.beginPath();
        ctx.strokeStyle = '#0EA5E9';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#0EA5E9';
        
        for (let x = 0; x < width; x++) {
            const sampleIdx = Math.floor(x * samplesPerPixel);
            const painData = this.painProfile[sampleIdx % this.painProfile.length];
            const actualSampleIdx = sampleIdx + Math.floor(this.timeOffset);
            const signal = this.generateRawEEG(actualSampleIdx, painData.pain);
            
            const y = centerY - (signal * 1.2);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Update current pain values
        this.currentPain = currentPain;
        this.currentReliability = currentData.reliability;
        
        // Calculate indicator position to match where we read the pain from
        const indicatorSamplePosition = currentSampleIdx % this.numSamples;
        const currentPosition = (indicatorSamplePosition / this.numSamples) * width;
        
        // Indicator color based on current pain level (solid, bright colors)
        let indicatorColor;
        if (currentPain < 3) {
            indicatorColor = '#10B981'; // Green
        } else if (currentPain < 6) {
            indicatorColor = '#EAB308'; // Yellow
        } else {
            indicatorColor = '#EF4444'; // Red
        }
        
        // Draw indicator line with strong glow
        ctx.beginPath();
        ctx.strokeStyle = indicatorColor;
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.shadowBlur = 12;
        ctx.shadowColor = indicatorColor;
        ctx.moveTo(currentPosition, 0);
        ctx.lineTo(currentPosition, height - 20);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw indicator label with matching color
        ctx.fillStyle = indicatorColor;
        ctx.shadowBlur = 6;
        ctx.shadowColor = indicatorColor;
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        const currentTime = ((currentSampleIdx / this.samplingRate)).toFixed(1);
        ctx.fillText(`▼ ${currentTime}s`, currentPosition, 15);
        ctx.shadowBlur = 0;
    }
    
    // Draw pain gauge (circular gauge)
    drawPainGauge() {
        const ctx = this.painGaugeCtx;
        const centerX = this.painGaugeCanvas.width / 2;
        const centerY = this.painGaugeCanvas.height / 2;
        const radius = 78;
        
        ctx.clearRect(0, 0, this.painGaugeCanvas.width, this.painGaugeCanvas.height);
        
        // Background arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Pain level arc (colored by severity)
        const painAngle = 0.75 * Math.PI + (this.currentPain / 10) * 1.5 * Math.PI;
        
        // Gradient based on pain level
        const gradient = ctx.createLinearGradient(0, centerY - radius, 0, centerY + radius);
        if (this.currentPain < 4) {
            gradient.addColorStop(0, '#10B981');
            gradient.addColorStop(1, '#34D399');
        } else if (this.currentPain < 7) {
            gradient.addColorStop(0, '#EAB308');
            gradient.addColorStop(1, '#F59E0B');
        } else {
            gradient.addColorStop(0, '#F59E0B');
            gradient.addColorStop(1, '#EF4444');
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, painAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.currentPain > 7 ? '#EF4444' : this.currentPain > 4 ? '#F59E0B' : '#10B981';
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
    
    
    // Update metrics
    updateMetrics() {
        // Update pain value display
        const painValueEl = document.getElementById('currentPainValue');
        if (painValueEl) {
            painValueEl.textContent = this.currentPain.toFixed(1);
            
            // Update color based on severity
            if (this.currentPain < 4) {
                painValueEl.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
            } else if (this.currentPain < 7) {
                painValueEl.style.background = 'linear-gradient(135deg, #EAB308, #F59E0B)';
            } else {
                painValueEl.style.background = 'linear-gradient(135deg, #F59E0B, #EF4444)';
            }
            painValueEl.style.webkitBackgroundClip = 'text';
            painValueEl.style.webkitTextFillColor = 'transparent';
            painValueEl.style.backgroundClip = 'text';
        }
        
        // Update other metrics based on reliability
        let confidence, quality;
        if (this.currentReliability === 'High') {
            confidence = 95 + Math.random() * 4;
            quality = 27 + Math.random() * 3;
        } else if (this.currentReliability === 'Good') {
            confidence = 88 + Math.random() * 6;
            quality = 24 + Math.random() * 3;
        } else {
            confidence = 78 + Math.random() * 8;
            quality = 20 + Math.random() * 3;
        }
        
        const confidenceEl = document.getElementById('confidenceValue');
        const snrEl = document.getElementById('snrValue');
        const reliabilityEl = document.getElementById('reliabilityValue');
        
        if (confidenceEl) confidenceEl.textContent = confidence.toFixed(1);
        if (snrEl) snrEl.textContent = quality.toFixed(1);
        if (reliabilityEl) {
            reliabilityEl.textContent = this.currentReliability;
        }
    }
    
    // Animation loop
    animate() {
        // Scroll through the signal very slowly
        this.timeOffset += 0.4; // Even slower scroll speed for 15 seconds
        if (this.timeOffset >= this.numSamples) {
            this.timeOffset = 0;
        }
        
        // Update visualizations
        this.drawSignal();
        this.drawPainGauge();
        this.updateMetrics();
        
        requestAnimationFrame(() => this.animate());
    }
    
    init() {
        this.animate();
    }
}

// Initialize analyzer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        new BrainSignalAnalyzer();
    }, 500);
});

// Professional Tabs Functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Add active class to corresponding content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animation for feature cards
                const featureCards = targetContent.querySelectorAll('.feature-card');
                featureCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // Smooth scroll to tab content on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const tabsContainer = document.querySelector('.features-tabs-container');
                    if (tabsContainer) {
                        tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 100);
            }
        });
    });
    
    // Keyboard navigation for tabs
    const tabsNavigation = document.querySelector('.tabs-navigation');
    if (tabsNavigation) {
        tabsNavigation.addEventListener('keydown', (e) => {
            const currentButton = document.activeElement;
            if (!currentButton.classList.contains('tab-button')) return;
            
            const buttons = Array.from(tabButtons);
            const currentIndex = buttons.indexOf(currentButton);
            
            let nextButton;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextButton = buttons[currentIndex + 1] || buttons[0];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                nextButton = buttons[currentIndex - 1] || buttons[buttons.length - 1];
            } else if (e.key === 'Home') {
                e.preventDefault();
                nextButton = buttons[0];
            } else if (e.key === 'End') {
                e.preventDefault();
                nextButton = buttons[buttons.length - 1];
            }
            
            if (nextButton) {
                nextButton.focus();
                nextButton.click();
            }
        });
    }
}

// Initialize tabs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
});

// Easter egg: Console message
console.log('%cCereVu Medical', 'color: #0EA5E9; font-size: 48px; font-weight: bold; letter-spacing: 4px;');
console.log('%cObjectively measuring pain in real-time', 'color: rgba(255, 255, 255, 0.7); font-size: 16px;');
console.log('%cInterested in joining our team? Email us at info@cerevu.com', 'color: #0EA5E9; font-size: 14px;');

