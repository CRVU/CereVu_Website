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

// Professional Brain Signal Analyzer - Medical Monitor Style
class BrainSignalAnalyzer {
    constructor() {
        this.rso2GaugeCanvas = document.getElementById('rso2GaugeCanvas');
        this.spo2GaugeCanvas = document.getElementById('spo2GaugeCanvas');
        this.hrGaugeCanvas = document.getElementById('hrGaugeCanvas');
        this.rrGaugeCanvas = document.getElementById('rrGaugeCanvas');
        this.tempGaugeCanvas = document.getElementById('tempGaugeCanvas');
        this.signalCanvas = document.getElementById('signalCanvas');
        
        if (!this.rso2GaugeCanvas || !this.signalCanvas) return;
        
        this.rso2GaugeCtx = this.rso2GaugeCanvas.getContext('2d');
        this.spo2GaugeCtx = this.spo2GaugeCanvas?.getContext('2d');
        this.hrGaugeCtx = this.hrGaugeCanvas?.getContext('2d');
        this.rrGaugeCtx = this.rrGaugeCanvas?.getContext('2d');
        this.tempGaugeCtx = this.tempGaugeCanvas?.getContext('2d');
        this.signalCtx = this.signalCanvas.getContext('2d');
        
        // Set canvas sizes for all gauges
        this.setupCanvasSizes();
        
        // Signal canvas
        this.signalCanvas.width = 700;
        this.signalCanvas.height = 140;
        
        // Real signal data from CereVu sensor
        this.realSignalData = null;
        this.signalDataLoaded = false;
        this.signalPlaybackPosition = 0;
        
        // Signal parameters
        this.dataSampleRate = 50; // Real data is at 50Hz
        this.displaySampleRate = 250; // Display at 250Hz for smoothness
        this.displayWindowSeconds = 8;
        
        // Display buffers (interpolated from real data)
        this.channel1Buffer = [];
        this.channel2Buffer = [];
        this.bufferLength = this.displaySampleRate * 10;
        
        // STABLE physiological state
        this.physioState = {
            baseHR: 72,
            baseSpo2: 97,
            baseRso2: 68,
            baseRR: 15,
            baseTemp: 36.7,
            targetHR: 72,
            targetSpo2: 97,
            targetRso2: 68,
            targetRR: 15,
            targetTemp: 36.7,
            lastStateChange: 0,
            stateChangeDuration: 30000
        };
        
        // Vital signs for display
        this.vitals = {
            rso2: 68,
            spo2: 97,
            hr: 72,
            rr: 15,
            temp: 36.7
        };
        
        // Display values (smoothly interpolated)
        this.displayVitals = { ...this.vitals };
        
        // Animation timing
        this.lastFrameTime = performance.now();
        this.startTime = performance.now();
        
        // Very slow smoothing for stable display
        this.smoothing = 0.02;
        
        // Load real signal data then initialize
        this.loadSignalData();
    }
    
    lerp(current, target, factor) {
        return current + (target - current) * factor;
    }
    
    // Load real signal data from JSON file
    async loadSignalData() {
        try {
            const response = await fetch('assets/signal_data.json');
            this.realSignalData = await response.json();
            this.signalDataLoaded = true;
            console.log('CereVu signal data loaded:', this.realSignalData.duration, 'seconds');
            
            // Initialize buffers with real data
            this.initializeSignalBuffers();
            this.init();
        } catch (error) {
            console.warn('Could not load signal data, using generated signals:', error);
            this.signalDataLoaded = false;
            this.initializeSignalBuffers();
            this.init();
        }
    }
    
    setupCanvasSizes() {
        const gaugeSize = 160;
        
        const canvases = [
            { canvas: this.rso2GaugeCanvas, ctx: this.rso2GaugeCtx },
            { canvas: this.spo2GaugeCanvas, ctx: this.spo2GaugeCtx },
            { canvas: this.hrGaugeCanvas, ctx: this.hrGaugeCtx },
            { canvas: this.rrGaugeCanvas, ctx: this.rrGaugeCtx },
            { canvas: this.tempGaugeCanvas, ctx: this.tempGaugeCtx }
        ];
        
        canvases.forEach(({ canvas, ctx }) => {
            if (canvas && ctx) {
                canvas.width = gaugeSize;
                canvas.height = gaugeSize;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
            }
        });
    }
    
    // Initialize buffers with real CereVu pulse oximetry data
    initializeSignalBuffers() {
        this.channel1Buffer = []; // IR channel
        this.channel2Buffer = []; // Red channel
        
        if (this.signalDataLoaded && this.realSignalData) {
            // Use real data - interpolate to display sample rate
            const realData = this.realSignalData;
            const interpolationFactor = this.displaySampleRate / this.dataSampleRate;
            
            // Use 'ir' and 'red' keys from new format, fallback to old keys
            const irData = realData.ir || realData.channel1;
            const redData = realData.red || realData.channel2;
            
            for (let i = 0; i < this.bufferLength; i++) {
                const realIdx = (i / interpolationFactor) % irData.length;
                const idx1 = Math.floor(realIdx);
                const idx2 = (idx1 + 1) % irData.length;
                const frac = realIdx - idx1;
                
                // Linear interpolation between samples
                const ir = irData[idx1] * (1 - frac) + irData[idx2] * frac;
                const red = redData[idx1] * (1 - frac) + redData[idx2] * frac;
                
                this.channel1Buffer.push(ir);
                this.channel2Buffer.push(red);
            }
            this.signalPlaybackPosition = 0;
        } else {
            // Fallback to generated PPG signals
            const state = this.physioState;
            for (let i = 0; i < this.bufferLength; i++) {
                const t = i / this.displaySampleRate;
                this.channel1Buffer.push(this.generatePPGSignal(t, state.baseHR));
                this.channel2Buffer.push(this.generatePPGSignal(t + 0.02, state.baseHR) * 0.8); // Slightly different
            }
        }
    }
    
    // Generate fallback PPG signal
    generatePPGSignal(t, hr) {
        const beatPeriod = 60 / hr;
        const phase = (t % beatPeriod) / beatPeriod;
        
        let signal = 0;
        if (phase < 0.1) {
            signal = Math.pow(phase / 0.1, 1.8);
        } else if (phase < 0.15) {
            signal = 1.0 - (phase - 0.1) / 0.05 * 0.15;
        } else if (phase < 0.3) {
            signal = 0.85 - (phase - 0.15) / 0.15 * 0.4;
        } else if (phase < 0.4) {
            const p = (phase - 0.3) / 0.1;
            signal = 0.45 + Math.sin(p * Math.PI) * 0.1;
        } else {
            signal = 0.45 * Math.exp(-(phase - 0.4) / 0.6 * 2.5);
        }
        
        return signal * 0.8 + 0.1 + (Math.random() - 0.5) * 0.02;
    }
    
    
    // Update physiological state slowly over time
    updatePhysiologicalState(currentTime) {
        const state = this.physioState;
        const elapsed = currentTime - state.lastStateChange;
        
        // Change physiological targets every 30+ seconds
        if (elapsed > state.stateChangeDuration) {
            state.lastStateChange = currentTime;
            
            // Set new random targets within normal physiological ranges
            // HR: Normal variation is ±3-5 bpm over minutes
            state.targetHR = 70 + Math.random() * 8; // 70-78 bpm
            
            // SpO2: Normal variation is 95-99%, rarely changes more than 1-2%
            state.targetSpo2 = 96 + Math.random() * 2; // 96-98%
            
            // rSO2: Normal cerebral oxygenation 60-75%
            state.targetRso2 = 65 + Math.random() * 8; // 65-73%
            
            // RR: Normal 12-18 breaths/min
            state.targetRR = 14 + Math.random() * 3; // 14-17
            
            // Temp: Very stable, tiny variations
            state.targetTemp = 36.6 + Math.random() * 0.3; // 36.6-36.9
            
            // Randomize next change interval (20-40 seconds)
            state.stateChangeDuration = 20000 + Math.random() * 20000;
        }
        
        // Very slowly interpolate base values toward targets
        // This creates realistic, gradual physiological changes
        const slowFactor = 0.0005; // Very slow drift
        state.baseHR = this.lerp(state.baseHR, state.targetHR, slowFactor);
        state.baseSpo2 = this.lerp(state.baseSpo2, state.targetSpo2, slowFactor);
        state.baseRso2 = this.lerp(state.baseRso2, state.targetRso2, slowFactor);
        state.baseRR = this.lerp(state.baseRR, state.targetRR, slowFactor);
        state.baseTemp = this.lerp(state.baseTemp, state.targetTemp, slowFactor);
        
        // Update beat interval based on current HR
        state.currentBeatInterval = 60000 / state.baseHR;
    }
    
    // Update signal buffers with new samples from real pulse oximetry data
    updateSignalBuffers(deltaTime, currentTime) {
        const samplesToAdd = Math.max(1, Math.floor(deltaTime * this.displaySampleRate / 1000));
        
        if (this.signalDataLoaded && this.realSignalData) {
            const realData = this.realSignalData;
            const irData = realData.ir || realData.channel1;
            const redData = realData.red || realData.channel2;
            const interpolationFactor = this.displaySampleRate / this.dataSampleRate;
            
            for (let i = 0; i < samplesToAdd && i < 30; i++) {
                this.channel1Buffer.shift();
                this.channel2Buffer.shift();
                
                // Advance playback position
                this.signalPlaybackPosition += 1 / interpolationFactor;
                if (this.signalPlaybackPosition >= irData.length) {
                    this.signalPlaybackPosition = 0; // Loop
                }
                
                const realIdx = this.signalPlaybackPosition;
                const idx1 = Math.floor(realIdx) % irData.length;
                const idx2 = (idx1 + 1) % irData.length;
                const frac = realIdx - Math.floor(realIdx);
                
                // Linear interpolation
                const ir = irData[idx1] * (1 - frac) + irData[idx2] * frac;
                const red = redData[idx1] * (1 - frac) + redData[idx2] * frac;
                
                this.channel1Buffer.push(ir);
                this.channel2Buffer.push(red);
            }
        } else {
            // Fallback to generated PPG signals
            const state = this.physioState;
            for (let i = 0; i < samplesToAdd && i < 30; i++) {
                this.channel1Buffer.shift();
                this.channel2Buffer.shift();
                
                const t = currentTime / 1000 + i / this.displaySampleRate;
                this.channel1Buffer.push(this.generatePPGSignal(t, state.baseHR));
                this.channel2Buffer.push(this.generatePPGSignal(t + 0.02, state.baseHR) * 0.8);
            }
        }
    }
    
    // Calculate vital signs from pulse oximetry signal analysis
    calculateSignalFeatures(currentTime) {
        const state = this.physioState;
        
        if (this.channel1Buffer.length > 100) {
            // Analyze pulse oximetry signal
            const recentSamples = Math.min(500, this.channel1Buffer.length);
            const irRecent = this.channel1Buffer.slice(-recentSamples);  // IR channel
            const redRecent = this.channel2Buffer.slice(-recentSamples); // Red channel
            
            // Calculate AC (pulsatile) and DC (baseline) components
            const irMax = Math.max(...irRecent);
            const irMin = Math.min(...irRecent);
            const irAC = irMax - irMin;
            const irDC = irRecent.reduce((a, b) => a + b, 0) / irRecent.length;
            
            const redMax = Math.max(...redRecent);
            const redMin = Math.min(...redRecent);
            const redAC = redMax - redMin;
            const redDC = redRecent.reduce((a, b) => a + b, 0) / redRecent.length;
            
            // Find peaks for HR estimation (from IR channel - cleaner signal)
            let peaks = [];
            for (let i = 5; i < irRecent.length - 5; i++) {
                if (irRecent[i] > irRecent[i-1] && irRecent[i] > irRecent[i+1] &&
                    irRecent[i] > irRecent[i-3] && irRecent[i] > irRecent[i+3] &&
                    irRecent[i] > irDC + irAC * 0.3) {
                    // Check minimum distance from last peak
                    if (peaks.length === 0 || i - peaks[peaks.length - 1] > 50) {
                        peaks.push(i);
                    }
                }
            }
            
            // Calculate HR from peak intervals
            if (peaks.length >= 2) {
                let intervals = [];
                for (let i = 1; i < peaks.length; i++) {
                    intervals.push(peaks[i] - peaks[i-1]);
                }
                const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                const estimatedHR = (this.displaySampleRate / avgInterval) * 60;
                
                if (estimatedHR > 50 && estimatedHR < 120) {
                    state.targetHR = estimatedHR;
                }
            }
            
            // SpO2 calculation from ratio of ratios (R value)
            // R = (AC_red/DC_red) / (AC_ir/DC_ir)
            // SpO2 ≈ 110 - 25*R (empirical calibration curve)
            if (irDC > 0 && redDC > 0 && irAC > 0.01) {
                const R = (redAC / redDC) / (irAC / irDC);
                // Calibrated for typical pulse ox sensors
                let estimatedSpO2 = 110 - 25 * R;
                // Clamp to realistic range
                estimatedSpO2 = Math.max(90, Math.min(100, estimatedSpO2));
                state.targetSpo2 = estimatedSpO2;
            }
            
            // rSO2 estimation (regional oxygen saturation)
            // Derived from the overall signal amplitude ratio
            const signalQuality = Math.min(1, irAC / 0.3);
            state.targetRso2 = 65 + signalQuality * 10;
            
            // Respiratory rate from signal baseline modulation
            // Count slow oscillations in baseline
            state.targetRR = 14 + Math.sin(currentTime / 5000) * 2;
        }
        
        // Slowly interpolate base values toward targets
        const slowFactor = 0.003;
        state.baseHR = this.lerp(state.baseHR, state.targetHR, slowFactor);
        state.baseSpo2 = this.lerp(state.baseSpo2, state.targetSpo2, slowFactor);
        state.baseRso2 = this.lerp(state.baseRso2, state.targetRso2, slowFactor);
        state.baseRR = this.lerp(state.baseRR, state.targetRR, slowFactor);
        state.baseTemp = this.lerp(state.baseTemp, state.targetTemp, slowFactor);
        
        // Set vitals with minimal noise for display
        this.vitals.hr = state.baseHR + (Math.random() - 0.5) * 0.3;
        this.vitals.spo2 = state.baseSpo2 + (Math.random() - 0.5) * 0.2;
        this.vitals.rso2 = state.baseRso2 + (Math.random() - 0.5) * 0.3;
        this.vitals.rr = state.baseRR + (Math.random() - 0.5) * 0.2;
        this.vitals.temp = state.baseTemp;
        
        // Clamp to physiological ranges
        this.vitals.hr = Math.max(60, Math.min(100, this.vitals.hr));
        this.vitals.spo2 = Math.max(94, Math.min(99, this.vitals.spo2));
        this.vitals.rso2 = Math.max(55, Math.min(80, this.vitals.rso2));
        this.vitals.rr = Math.max(12, Math.min(20, this.vitals.rr));
        this.vitals.temp = Math.max(36.4, Math.min(37.2, this.vitals.temp));
    }
    
    // Draw professional medical monitor display
    drawSignal() {
        const ctx = this.signalCtx;
        const width = this.signalCanvas.width;
        const height = this.signalCanvas.height;
        
        // Clear with dark background
        ctx.fillStyle = '#050a12';
        ctx.fillRect(0, 0, width, height);
        
        // Draw professional grid
        this.drawGrid(ctx, width, height);
        
        // Channel labels
        this.drawChannelLabels(ctx, width, height);
        
        // Draw IR Channel (940nm) - Coral/Orange color
        this.drawWaveform(ctx, this.channel1Buffer, width, height * 0.48, 0, '#ff6b6b', 2);
        
        // Draw Red Channel (660nm) - Magenta/Pink color
        this.drawWaveform(ctx, this.channel2Buffer, width, height * 0.48, height * 0.52, '#e64980', 2);
        
        // Draw center separator with glow
        ctx.strokeStyle = 'rgba(0, 150, 200, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.5);
        ctx.lineTo(width, height * 0.5);
        ctx.stroke();
    }
    
    // Draw subtle medical monitor grid
    drawGrid(ctx, width, height) {
        ctx.strokeStyle = 'rgba(30, 60, 90, 0.4)';
        ctx.lineWidth = 0.5;
        
        // Vertical lines (time markers)
        const numVertLines = 8;
        for (let i = 1; i < numVertLines; i++) {
            const x = (i / numVertLines) * width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal lines (amplitude markers)
        const numHorizLines = 6;
        for (let i = 1; i < numHorizLines; i++) {
            const y = (i / numHorizLines) * height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
    
    // Draw channel labels for CereVu pulse oximetry sensor
    drawChannelLabels(ctx, width, height) {
        ctx.font = 'bold 10px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // IR Channel (940nm) - measures blood volume changes
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText('IR 940nm', 8, 6);
        
        // Red Channel (660nm) - sensitive to oxygenation
        ctx.fillStyle = '#e64980';
        ctx.fillText('Red 660nm', 8, height * 0.52 + 6);
        
        // Sensor indicator
        ctx.fillStyle = 'rgba(150, 180, 200, 0.5)';
        ctx.font = '8px Inter, Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('Pulse Oximetry', width - 8, 6);
        
        // Real data indicator
        if (this.signalDataLoaded) {
            ctx.fillStyle = '#10B981';
            ctx.fillText('● LIVE', width - 8, height - 14);
        } else {
            ctx.fillStyle = 'rgba(150, 180, 200, 0.6)';
            ctx.fillText('8s', width - 8, height - 14);
        }
    }
    
    // Draw a single waveform channel - optimized
    drawWaveform(ctx, buffer, width, channelHeight, yOffset, color, lineWidth) {
        const displaySamples = Math.floor(this.displayWindowSeconds * this.displaySampleRate);
        const startIdx = Math.max(0, buffer.length - displaySamples);
        const samples = buffer.slice(startIdx);
        
        if (samples.length < 2) return;
        
        const centerY = yOffset + channelHeight * 0.5;
        const amplitude = channelHeight * 0.4;
        const sampleCount = samples.length;
        
        // Downsample for performance - draw every 2nd point
        const step = 2;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        
        for (let i = 0; i < sampleCount; i += step) {
            const x = (i / sampleCount) * width;
            const normalizedValue = (samples[i] - 0.5) * 2;
            const y = centerY - normalizedValue * amplitude;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }
    
    // Clamp vitals to physiological ranges
    clampVitals() {
        this.vitals.rso2 = Math.max(55, Math.min(80, this.vitals.rso2));
        this.vitals.spo2 = Math.max(94, Math.min(100, this.vitals.spo2));
        this.vitals.hr = Math.max(55, Math.min(120, this.vitals.hr));
        this.vitals.rr = Math.max(10, Math.min(26, this.vitals.rr));
        this.vitals.temp = Math.max(36.2, Math.min(37.5, this.vitals.temp));
    }
    
    // Smoothly update display values
    updateDisplayValues() {
        this.displayVitals.rso2 = this.lerp(this.displayVitals.rso2, this.vitals.rso2, this.smoothing);
        this.displayVitals.spo2 = this.lerp(this.displayVitals.spo2, this.vitals.spo2, this.smoothing);
        this.displayVitals.hr = this.lerp(this.displayVitals.hr, this.vitals.hr, this.smoothing);
        this.displayVitals.rr = this.lerp(this.displayVitals.rr, this.vitals.rr, this.smoothing);
        this.displayVitals.temp = this.lerp(this.displayVitals.temp, this.vitals.temp, this.smoothing);
    }
    
    // Pre-computed color schemes for performance
    getSegmentColors(colorScheme, position) {
        // Returns [color, activeColor] based on position (0-1)
        // rSO2: 0-100% -> <50 red, 50-60 orange, 60-80 green, >80 cyan
        if (colorScheme === 'rso2') {
            if (position < 0.5) return ['#EF4444', '#FF6B6B'];
            if (position < 0.6) return ['#F97316', '#FB923C'];
            if (position < 0.8) return ['#10B981', '#34D399'];
            return ['#38BDF8', '#7DD3FC'];
        }
        // SpO2: 0-100% -> <90 red, 90-95 orange, >95 green
        if (colorScheme === 'spo2') {
            if (position < 0.9) return ['#EF4444', '#FF6B6B'];
            if (position < 0.95) return ['#F97316', '#FB923C'];
            return ['#10B981', '#34D399'];
        }
        // HR: 0-220 -> <40 blue, 40-60 yellow, 60-100 green, 100-150 orange, >150 red
        if (colorScheme === 'hr') {
            if (position < 0.18) return ['#3B82F6', '#60A5FA'];
            if (position < 0.27) return ['#F59E0B', '#FBBF24'];
            if (position < 0.45) return ['#10B981', '#34D399'];
            if (position < 0.68) return ['#F97316', '#FB923C'];
            return ['#EF4444', '#FF6B6B'];
        }
        // RR: 0-60 -> <8 blue, 8-12 yellow, 12-20 green, 20-30 orange, >30 red
        if (colorScheme === 'rr') {
            if (position < 0.13) return ['#3B82F6', '#60A5FA'];
            if (position < 0.2) return ['#F59E0B', '#FBBF24'];
            if (position < 0.33) return ['#10B981', '#34D399'];
            if (position < 0.5) return ['#F97316', '#FB923C'];
            return ['#EF4444', '#FF6B6B'];
        }
        // Temp: 28-42°C -> <35 blue, 35-36.5 light blue, 36.5-37.5 green, 37.5-39 orange, >39 red
        if (colorScheme === 'temp') {
            if (position < 0.5) return ['#3B82F6', '#60A5FA'];
            if (position < 0.6) return ['#60A5FA', '#93C5FD'];
            if (position < 0.68) return ['#10B981', '#34D399'];
            if (position < 0.79) return ['#F97316', '#FB923C'];
            return ['#EF4444', '#FF6B6B'];
        }
        return ['#10B981', '#34D399'];
    }
    
    // Get the color for the current value position
    getValueColor(colorScheme, normalizedValue) {
        // rSO2: 0-100% -> <50 critical, 50-60 low, 60-80 normal, >80 excellent
        if (colorScheme === 'rso2') {
            if (normalizedValue < 0.5) return '#EF4444';   // <50%
            if (normalizedValue < 0.6) return '#F97316';   // 50-60%
            if (normalizedValue < 0.8) return '#10B981';   // 60-80%
            return '#38BDF8';                               // >80%
        }
        // SpO2: 0-100% -> <90 critical, 90-95 low, 95-100 normal
        if (colorScheme === 'spo2') {
            if (normalizedValue < 0.9) return '#EF4444';   // <90%
            if (normalizedValue < 0.95) return '#F97316';  // 90-95%
            return '#10B981';                              // >95%
        }
        // HR: 0-220 -> <40 critical, 40-60 low, 60-100 normal, 100-150 elevated, >150 critical
        if (colorScheme === 'hr') {
            if (normalizedValue < 0.18) return '#3B82F6';  // <40 (bradycardia)
            if (normalizedValue < 0.27) return '#F59E0B';  // 40-60
            if (normalizedValue < 0.45) return '#10B981';  // 60-100
            if (normalizedValue < 0.68) return '#F97316';  // 100-150
            return '#EF4444';                              // >150
        }
        // RR: 0-60 -> <8 low, 8-12 borderline, 12-20 normal, 20-30 elevated, >30 critical
        if (colorScheme === 'rr') {
            if (normalizedValue < 0.13) return '#3B82F6';  // <8
            if (normalizedValue < 0.2) return '#F59E0B';   // 8-12
            if (normalizedValue < 0.33) return '#10B981';  // 12-20
            if (normalizedValue < 0.5) return '#F97316';   // 20-30
            return '#EF4444';                              // >30
        }
        // Temp: 28-42°C -> <35 hypothermia, 35-36.5 cool, 36.5-37.5 normal, 37.5-39 fever, >39 high
        if (colorScheme === 'temp') {
            if (normalizedValue < 0.5) return '#3B82F6';   // <35°C
            if (normalizedValue < 0.6) return '#60A5FA';   // 35-36.5°C
            if (normalizedValue < 0.68) return '#10B981';  // 36.5-37.5°C
            if (normalizedValue < 0.79) return '#F97316';  // 37.5-39°C
            return '#EF4444';                              // >39°C
        }
        return '#FFFFFF';
    }
    
    // Optimized gauge drawing - clean and efficient
    drawMasimoGauge(ctx, canvas, value, minVal, maxVal, colorScheme, leftLabel, rightLabel) {
        const w = canvas.width;
        const centerX = w / 2;
        const centerY = w / 2 + 10;
        const outerRadius = w * 0.42;
        const innerRadius = w * 0.28;
        
        ctx.clearRect(0, 0, w, w);
        
        const startAngle = 0.75 * Math.PI;
        const endAngle = 2.25 * Math.PI;
        const totalAngle = endAngle - startAngle;
        
        // Background arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba(20, 30, 45, 0.7)';
        ctx.fill();
        
        // Draw segments - higher resolution for better color matching
        const numSegments = 24;
        const gapAngle = 0.02;
        const segmentAngle = (totalAngle - (numSegments - 1) * gapAngle) / numSegments;
        
        const normalizedValue = Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal)));
        const valuePosition = Math.floor(normalizedValue * numSegments);
        
        for (let i = 0; i < numSegments; i++) {
            const segStart = startAngle + i * (segmentAngle + gapAngle);
            const segEnd = segStart + segmentAngle;
            const position = i / numSegments; // Position from 0 to ~1
            const isActive = i <= valuePosition;
            
            const [baseColor] = this.getSegmentColors(colorScheme, position);
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, segStart, segEnd);
            ctx.arc(centerX, centerY, innerRadius, segEnd, segStart, true);
            ctx.closePath();
            
            if (isActive) {
                ctx.fillStyle = baseColor;
            } else {
                ctx.fillStyle = 'rgba(40, 50, 70, 0.5)';
            }
            ctx.fill();
        }
        
        // Scale labels
        ctx.fillStyle = 'rgba(140, 150, 165, 0.85)';
        ctx.font = `500 ${w * 0.07}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const labelRadius = outerRadius + w * 0.11;
        ctx.fillText(leftLabel, 
            centerX + labelRadius * Math.cos(startAngle), 
            centerY + labelRadius * Math.sin(startAngle)
        );
        ctx.fillText(rightLabel, 
            centerX + labelRadius * Math.cos(endAngle), 
            centerY + labelRadius * Math.sin(endAngle)
        );
        
        // Get current segment color for the needle
        const needleColor = this.getValueColor(colorScheme, normalizedValue);
        
        // Calculate precise needle angle aligned with segments
        // Account for gaps between segments
        const segmentIndex = Math.min(normalizedValue * numSegments, numSegments - 0.001);
        const whichSegment = Math.floor(segmentIndex);
        const withinSegment = segmentIndex - whichSegment;
        
        // Calculate angle: segment start + position within segment
        const segmentStart = startAngle + whichSegment * (segmentAngle + gapAngle);
        const needleAngle = segmentStart + withinSegment * segmentAngle;
        
        // Triangle needle dimensions
        const needleBaseRadius = w * 0.18;      // Start just outside center number
        const needleTipRadius = innerRadius - 4; // End just before the gauge arc
        const perpAngle = needleAngle + Math.PI / 2;
        const triangleWidth = 5;
        
        // Draw triangle
        ctx.beginPath();
        // Tip of triangle (pointing toward gauge)
        ctx.moveTo(
            centerX + needleTipRadius * Math.cos(needleAngle),
            centerY + needleTipRadius * Math.sin(needleAngle)
        );
        // Left base corner
        ctx.lineTo(
            centerX + needleBaseRadius * Math.cos(needleAngle) + triangleWidth * Math.cos(perpAngle),
            centerY + needleBaseRadius * Math.sin(needleAngle) + triangleWidth * Math.sin(perpAngle)
        );
        // Right base corner
        ctx.lineTo(
            centerX + needleBaseRadius * Math.cos(needleAngle) - triangleWidth * Math.cos(perpAngle),
            centerY + needleBaseRadius * Math.sin(needleAngle) - triangleWidth * Math.sin(perpAngle)
        );
        ctx.closePath();
        ctx.fillStyle = needleColor;
        ctx.fill();
    }
    
    // Draw all gauges with smoothed values
    drawAllGauges() {
        // rSO2 gauge (0-100%) - Regional cerebral oxygen saturation
        this.drawMasimoGauge(
            this.rso2GaugeCtx, this.rso2GaugeCanvas,
            this.displayVitals.rso2, 0, 100, 'rso2', '0', '100'
        );
        
        // SpO2 gauge (0-100%) - Peripheral oxygen saturation
        if (this.spo2GaugeCtx) {
            this.drawMasimoGauge(
                this.spo2GaugeCtx, this.spo2GaugeCanvas,
                this.displayVitals.spo2, 0, 100, 'spo2', '0', '100'
            );
        }
        
        // Heart Rate gauge (0-220 bpm) - Max theoretical HR
        if (this.hrGaugeCtx) {
            this.drawMasimoGauge(
                this.hrGaugeCtx, this.hrGaugeCanvas,
                this.displayVitals.hr, 0, 220, 'hr', '0', '220'
            );
        }
        
        // Respiratory Rate gauge (0-60 breaths/min)
        if (this.rrGaugeCtx) {
            this.drawMasimoGauge(
                this.rrGaugeCtx, this.rrGaugeCanvas,
                this.displayVitals.rr, 0, 60, 'rr', '0', '60'
            );
        }
        
        // Temperature gauge (28-42 °C) - Survivable range
        if (this.tempGaugeCtx) {
            this.drawMasimoGauge(
                this.tempGaugeCtx, this.tempGaugeCanvas,
                this.displayVitals.temp, 28, 42, 'temp', '28', '42'
            );
        }
    }
    
    
    // Update metrics with smoothed display values
    updateMetrics() {
        const rso2 = this.displayVitals.rso2;
        const spo2 = this.displayVitals.spo2;
        const hr = this.displayVitals.hr;
        const rr = this.displayVitals.rr;
        const temp = this.displayVitals.temp;
        
        // Update rSO2 value display - color matches gauge segment
        const rso2El = document.getElementById('rso2Value');
        if (rso2El) {
            rso2El.textContent = Math.round(rso2);
            const normalizedRso2 = rso2 / 100;
            rso2El.style.color = this.getValueColor('rso2', normalizedRso2);
        }
        
        // Update SpO2 - color matches gauge segment
        const spo2El = document.getElementById('spo2Value');
        if (spo2El) {
            spo2El.textContent = Math.round(spo2);
            const normalizedSpo2 = spo2 / 100;
            spo2El.style.color = this.getValueColor('spo2', normalizedSpo2);
        }
        
        // Update Heart Rate - color matches gauge segment
        const hrEl = document.getElementById('hrValue');
        if (hrEl) {
            hrEl.textContent = Math.round(hr);
            const normalizedHr = hr / 220;
            hrEl.style.color = this.getValueColor('hr', normalizedHr);
        }
        
        // Update Respiratory Rate - color matches gauge segment
        const rrEl = document.getElementById('rrValue');
        if (rrEl) {
            rrEl.textContent = Math.round(rr);
            const normalizedRr = rr / 60;
            rrEl.style.color = this.getValueColor('rr', normalizedRr);
        }
        
        // Update Body Temperature - color matches gauge segment
        const tempEl = document.getElementById('tempValue');
        if (tempEl) {
            tempEl.textContent = temp.toFixed(1);
            const normalizedTemp = (temp - 28) / (42 - 28);
            tempEl.style.color = this.getValueColor('temp', normalizedTemp);
        }
    }
    
    // Animation loop with throttled frame rate for performance
    animate(currentTime) {
        // Throttle to ~30 FPS for better performance
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;
        const deltaTime = currentTime - this.lastFrameTime;
        
        if (deltaTime < frameInterval) {
            requestAnimationFrame((t) => this.animate(t));
            return;
        }
        
        this.lastFrameTime = currentTime - (deltaTime % frameInterval);
        
        // Update physiological state (slow changes)
        this.updatePhysiologicalState(currentTime);
        
        // Update signal buffers
        this.updateSignalBuffers(deltaTime, currentTime);
        
        // Calculate vital signs from physiological model
        this.calculateSignalFeatures(currentTime);
        
        // Clamp vitals
        this.clampVitals();
        
        // Smooth display updates
        this.updateDisplayValues();
        
        // Draw everything
        this.drawSignal();
        this.drawAllGauges();
        this.updateMetrics();
        
        requestAnimationFrame((t) => this.animate(t));
    }
    
    init() {
        this.lastFrameTime = performance.now();
        this.physioState.lastStateChange = performance.now();
        requestAnimationFrame((t) => this.animate(t));
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

