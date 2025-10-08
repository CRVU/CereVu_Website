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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
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
                    const num = parseFloat(text);
                    animateCounter(stat, num);
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
                        const num = parseFloat(text);
                        animateCounter(stat, num, 2000);
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
        this.duration = 10; // 10 seconds
        this.numSamples = this.samplingRate * this.duration;
        this.timeOffset = 0;
        
        // Create pain profile over 10 seconds with different zones
        this.painProfile = this.createPainProfile();
        this.currentPain = 5.2;
        this.currentReliability = 'Good';
        
        this.init();
    }
    
    createPainProfile() {
        const profile = [];
        const sections = [
            { duration: 2, level: 2, reliability: 'High' },    // 0-2s: Mild
            { duration: 2, level: 5.5, reliability: 'Good' },  // 2-4s: Moderate
            { duration: 2, level: 8.2, reliability: 'Fair' },  // 4-6s: Severe
            { duration: 2, level: 3.5, reliability: 'High' },  // 6-8s: Mild
            { duration: 2, level: 6.8, reliability: 'Good' }   // 8-10s: Moderate-Severe
        ];
        
        for (const section of sections) {
            const samples = Math.floor(section.duration * this.samplingRate);
            for (let i = 0; i < samples; i++) {
                // Add slight variation
                const variation = (Math.random() - 0.5) * 0.5;
                profile.push({
                    pain: Math.max(0, Math.min(10, section.level + variation)),
                    reliability: section.reliability
                });
            }
        }
        
        return profile;
    }
    
    // Generate realistic raw EEG signal with pain correlation
    generateRawEEG(sampleIndex, painLevel) {
        const t = sampleIndex / this.samplingRate;
        let signal = 0;
        const noise = (Math.random() - 0.5) * 3;
        
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
        
        // Vertical grid lines (every 2 seconds)
        for (let i = 0; i <= 5; i++) {
            const x = (i / 5) * width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw time labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * width;
            ctx.fillText(`${i}s`, x, height - 5);
        }
        
        // Draw pain zone backgrounds (more visible)
        const samplesPerPixel = this.numSamples / width;
        for (let x = 0; x < width; x++) {
            const sampleIdx = Math.floor(x * samplesPerPixel + this.timeOffset) % this.painProfile.length;
            const painData = this.painProfile[sampleIdx];
            const pain = painData.pain;
            
            let color;
            if (pain < 3) {
                color = `rgba(16, 185, 129, ${0.15 + pain * 0.05})`;
            } else if (pain < 6) {
                color = `rgba(234, 179, 8, ${0.15 + (pain - 3) * 0.08})`;
            } else {
                color = `rgba(239, 68, 68, ${0.2 + (pain - 6) * 0.1})`;
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x, 0, 1, height);
        }
        
        // Draw EEG signal
        ctx.beginPath();
        ctx.strokeStyle = '#0EA5E9';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#0EA5E9';
        
        for (let x = 0; x < width; x++) {
            const sampleIdx = Math.floor(x * samplesPerPixel + this.timeOffset);
            const painData = this.painProfile[sampleIdx % this.painProfile.length];
            const signal = this.generateRawEEG(sampleIdx, painData.pain);
            
            const y = centerY - (signal * 1.2);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw current time indicator (vertical line)
        const currentPosition = (this.timeOffset / this.numSamples) * width;
        ctx.beginPath();
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.moveTo(currentPosition, 0);
        ctx.lineTo(currentPosition, height - 20);
        ctx.stroke();
        
        // Draw indicator label
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        const currentTime = ((this.timeOffset / this.numSamples) * this.duration).toFixed(1);
        ctx.fillText(`▼ ${currentTime}s`, currentPosition, 15);
        
        // Update current pain from current position
        const currentSampleIdx = Math.floor(this.timeOffset) % this.painProfile.length;
        const currentData = this.painProfile[currentSampleIdx];
        this.currentPain = currentData.pain;
        this.currentReliability = currentData.reliability;
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
        // Scroll through the signal slowly
        this.timeOffset += 0.5; // Much slower scroll speed
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

// Easter egg: Console message
console.log('%cCereVu Medical', 'color: #0EA5E9; font-size: 48px; font-weight: bold; letter-spacing: 4px;');
console.log('%cObjectively measuring pain in real-time', 'color: rgba(255, 255, 255, 0.7); font-size: 16px;');
console.log('%cInterested in joining our team? Email us at jgasson@cerevu.com', 'color: #0EA5E9; font-size: 14px;');

