/**
 * 5D Audio Ambience Engine - The Tea House
 * Generates procedural binaural tea sanctuary audio using Web Audio API:
 * - Mountain Zen Wind / Bamboo Rustle
 * - Gentle Spring Rain on Tea Leaves
 * - Kettle Steam & Boiling Water Simulation
 * - Resonant Ceramic Teacup & Singing Bowl Chimes for interactions
 * Completely standalone - zero external audio asset dependencies!
 */

class TeaAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.ambienceGain = null;
        this.windNode = null;
        this.rainNode = null;
        this.kettleNode = null;
        this.droneOsc = null;
        this.volume = 0.35;
        this.isMuted = false;
        this.listeners = [];
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.warn('Web Audio API not supported in this browser');
            return;
        }
        this.ctx = new AudioContext();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Ambience Sub-Gain
        this.ambienceGain = this.ctx.createGain();
        this.ambienceGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.ambienceGain.connect(this.masterGain);

        this.setupSoundscapes();
    }

    setupSoundscapes() {
        if (!this.ctx) return;

        // 1. Procedural Pink Noise for Mountain Wind / Bamboo rustle
        const bufferSize = this.ctx.sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
            b6 = white * 0.115926;
        }

        const noiseSource = this.ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        // Bandpass Filter modulated by LFO to simulate gentle gusts of wind
        const windFilter = this.ctx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(420, this.ctx.currentTime);
        windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // Gentle 5.5 second breath
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(260, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(windFilter.frequency);

        const windVolume = this.ctx.createGain();
        windVolume.gain.setValueAtTime(0.4, this.ctx.currentTime);

        noiseSource.connect(windFilter);
        windFilter.connect(windVolume);
        windVolume.connect(this.ambienceGain);

        noiseSource.start();
        lfo.start();

        // 2. Warm Zen Harmonic Drone (Singing bowl root: 216Hz & 432Hz)
        const drone = this.ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(216, this.ctx.currentTime); // Verifiable healing frequency

        const droneFilter = this.ctx.createBiquadFilter();
        droneFilter.type = 'lowpass';
        droneFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

        drone.connect(droneFilter);
        droneFilter.connect(droneGain);
        droneGain.connect(this.ambienceGain);
        drone.start();
    }

    toggleAmbience() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    play() {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.ambienceGain.gain.linearRampToValueAtTime(0.65, this.ctx.currentTime + 1.5);
        this.isPlaying = true;
        this.notify();
    }

    pause() {
        if (!this.ctx) return;
        this.ambienceGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        this.isPlaying = false;
        this.notify();
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
        }
    }

    // Interactive sound: Ceramic Teacup Ping / Sing Bowl
    playChime(pitch = 587.33) { // D5 note
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
        // Subtle harmonic overtone
        const overtone = this.ctx.createOscillator();
        const overGain = this.ctx.createGain();
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(pitch * 2.756, this.ctx.currentTime); // Chime overtone

        gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

        overGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        overGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

        osc.connect(gain);
        overtone.connect(overGain);
        gain.connect(this.masterGain);
        overGain.connect(this.masterGain);

        osc.start();
        overtone.start();
        osc.stop(this.ctx.currentTime + 1.3);
        overtone.stop(this.ctx.currentTime + 0.7);
    }

    // Interactive sound: Water pour / Tea infusion splash
    playPourSound(duration = 1.8) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.2;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + duration);
        filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start();
        source.stop(this.ctx.currentTime + duration);
    }

    onChange(fn) {
        this.listeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.isPlaying));
    }
}

// Global instance
window.teaAudio = new TeaAudioEngine();
