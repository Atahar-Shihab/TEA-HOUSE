/**
 * 5D Audio Ambience Engine - The Tea House (Luxury Edition)
 * Procedural binaural tea sanctuary audio synthesized via Web Audio API:
 * - 3 Selectable Ambient Soundscapes:
 *   1. "Kyoto Dawn Mist" (High-altitude wind & 432Hz singing bowl resonance)
 *   2. "Alishan Ridge Rain" (Soft rain mist on wild camellia tea leaves)
 *   3. "Charcoal Hearth Warmth" (Warm embers & slow-roasting tea wok atmosphere)
 * - Interactive Sound FX:
 *   - Porcelain gaiwan ping / singing bowl chimes for UI interactions
 *   - Hydrodynamic water pour & infusion splashes for brewing simulation
 * Zero external audio file dependencies - 100% procedurally synthesized in real-time.
 */

class TeaAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.ambienceGain = null;
        this.volume = 0.40;
        this.currentTrackIndex = 0;
        this.tracks = [
            {
                id: 'kyoto-mist',
                name: 'Kyoto Dawn Mist',
                subtitle: '432Hz Singing Bowl & Mountain Wind',
                icon: 'fa-wind'
            },
            {
                id: 'alishan-rain',
                name: 'Alishan Ridge Rain',
                subtitle: 'Soft Raindrops on Bamboo Leaves',
                icon: 'fa-cloud-rain'
            },
            {
                id: 'charcoal-hearth',
                name: 'Charcoal Hearth Warmth',
                subtitle: 'Ancient Wok Roasting Resonance',
                icon: 'fa-fire'
            }
        ];

        // Active node references for current track
        this.activeSources = [];
        this.activeGains = [];
        this.listeners = [];
        this.trackListeners = [];
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.warn('Web Audio API not supported in this browser environment.');
            return;
        }
        this.ctx = new AudioContext();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Ambience Sub-Gain with smooth exponential crossfade
        this.ambienceGain = this.ctx.createGain();
        this.ambienceGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.ambienceGain.connect(this.masterGain);

        this.startCurrentTrack();
    }

    // Stop currently running procedural sound generators
    stopCurrentTrackNodes() {
        if (!this.ctx) return;
        this.activeSources.forEach(src => {
            try {
                if (src.stop) src.stop();
                if (src.disconnect) src.disconnect();
            } catch (e) {}
        });
        this.activeGains.forEach(gain => {
            try {
                if (gain.disconnect) gain.disconnect();
            } catch (e) {}
        });
        this.activeSources = [];
        this.activeGains = [];
    }

    startCurrentTrack() {
        if (!this.ctx) return;
        this.stopCurrentTrackNodes();

        switch (this.currentTrackIndex) {
            case 0:
                this.buildKyotoMistSoundscape();
                break;
            case 1:
                this.buildAlishanRainSoundscape();
                break;
            case 2:
                this.buildCharcoalHearthSoundscape();
                break;
            default:
                this.buildKyotoMistSoundscape();
        }
    }

    // Soundscape 1: Kyoto Dawn Mist (Wind + 432Hz bowl resonance)
    buildKyotoMistSoundscape() {
        const bufferSize = this.ctx.sampleRate * 4;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555;
            b1 = 0.99332 * b1 + white * 0.0750;
            b2 = 0.96900 * b2 + white * 0.1538;
            b3 = 0.86650 * b3 + white * 0.3104;
            b4 = 0.55000 * b4 + white * 0.5329;
            b5 = -0.7616 * b5 - white * 0.0168;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
            b6 = white * 0.1159;
        }

        const noiseSource = this.ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        // Bandpass filter for whispering wind through bamboo groves
        const windFilter = this.ctx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(380, this.ctx.currentTime);
        windFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

        // LFO for slow breath-like gust modulation (5.5s cycle)
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(240, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(windFilter.frequency);

        const windGain = this.ctx.createGain();
        windGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

        noiseSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.ambienceGain);

        // Harmonic Drone at 216Hz & 432Hz (Sacred meditation frequency)
        const drone = this.ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(216, this.ctx.currentTime);

        const droneFilter = this.ctx.createBiquadFilter();
        droneFilter.type = 'lowpass';
        droneFilter.frequency.setValueAtTime(280, this.ctx.currentTime);

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.07, this.ctx.currentTime);

        drone.connect(droneFilter);
        droneFilter.connect(droneGain);
        droneGain.connect(this.ambienceGain);

        // Secondary 432Hz harmonic
        const harmonic = this.ctx.createOscillator();
        harmonic.type = 'sine';
        harmonic.frequency.setValueAtTime(432, this.ctx.currentTime);
        const harmGain = this.ctx.createGain();
        harmGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
        harmonic.connect(harmGain);
        harmGain.connect(this.ambienceGain);

        noiseSource.start();
        lfo.start();
        drone.start();
        harmonic.start();

        this.activeSources.push(noiseSource, lfo, drone, harmonic);
        this.activeGains.push(lfoGain, windGain, droneGain, harmGain);
    }

    // Soundscape 2: Alishan Ridge Rain (Gentle rainfall on broad tea foliage)
    buildAlishanRainSoundscape() {
        const bufferSize = this.ctx.sampleRate * 4;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // White noise with high-frequency flutter
            output[i] = (Math.random() * 2 - 1) * 0.12;
        }

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        // Lowpass filter to simulate rain drops hitting broad soft tea leaves
        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

        // Modulate slightly to simulate passing rain showers
        const rainLFO = this.ctx.createOscillator();
        rainLFO.type = 'sine';
        rainLFO.frequency.setValueAtTime(0.08, this.ctx.currentTime);
        const rainLFOGain = this.ctx.createGain();
        rainLFOGain.gain.setValueAtTime(300, this.ctx.currentTime);
        rainLFO.connect(rainLFOGain);
        rainLFOGain.connect(rainFilter.frequency);

        const rainGain = this.ctx.createGain();
        rainGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

        rainSource.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(this.ambienceGain);

        // Soft sub-bass distant thunder resonance
        const subDrone = this.ctx.createOscillator();
        subDrone.type = 'sine';
        subDrone.frequency.setValueAtTime(108, this.ctx.currentTime);
        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        subDrone.connect(subGain);
        subGain.connect(this.ambienceGain);

        rainSource.start();
        rainLFO.start();
        subDrone.start();

        this.activeSources.push(rainSource, rainLFO, subDrone);
        this.activeGains.push(rainLFOGain, rainGain, subGain);
    }

    // Soundscape 3: Charcoal Hearth Warmth (Warm embers & roasted aroma atmosphere)
    buildCharcoalHearthSoundscape() {
        const bufferSize = this.ctx.sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Brown noise simulation for low hearth rumble
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 0.8;
        }

        const hearthSource = this.ctx.createBufferSource();
        hearthSource.buffer = noiseBuffer;
        hearthSource.loop = true;

        const hearthFilter = this.ctx.createBiquadFilter();
        hearthFilter.type = 'bandpass';
        hearthFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
        hearthFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

        const hearthGain = this.ctx.createGain();
        hearthGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

        hearthSource.connect(hearthFilter);
        hearthFilter.connect(hearthGain);
        hearthGain.connect(this.ambienceGain);

        // Warm 144Hz grounding drone (5th of 216Hz)
        const warmDrone = this.ctx.createOscillator();
        warmDrone.type = 'triangle';
        warmDrone.frequency.setValueAtTime(144, this.ctx.currentTime);

        const warmFilter = this.ctx.createBiquadFilter();
        warmFilter.type = 'lowpass';
        warmFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

        const warmGain = this.ctx.createGain();
        warmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        warmDrone.connect(warmFilter);
        warmFilter.connect(warmGain);
        warmGain.connect(this.ambienceGain);

        hearthSource.start();
        warmDrone.start();

        this.activeSources.push(hearthSource, warmDrone);
        this.activeGains.push(hearthGain, warmGain);
    }

    setTrack(index) {
        this.currentTrackIndex = (index + this.tracks.length) % this.tracks.length;
        if (this.isPlaying && this.ctx) {
            // Smooth crossfade: ramp down, swap, ramp up
            this.ambienceGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            setTimeout(() => {
                this.startCurrentTrack();
                if (this.isPlaying && this.ctx) {
                    this.ambienceGain.gain.linearRampToValueAtTime(0.65, this.ctx.currentTime + 0.5);
                }
            }, 320);
        } else {
            this.startCurrentTrack();
        }
        this.notifyTrackChange();
    }

    nextTrack() {
        this.setTrack(this.currentTrackIndex + 1);
    }

    prevTrack() {
        this.setTrack(this.currentTrackIndex - 1);
    }

    getCurrentTrack() {
        return this.tracks[this.currentTrackIndex];
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
        this.ambienceGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.ambienceGain.gain.linearRampToValueAtTime(0.65, this.ctx.currentTime + 1.2);
        this.isPlaying = true;
        this.notify();
    }

    pause() {
        if (!this.ctx) return;
        this.ambienceGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.ambienceGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        this.isPlaying = false;
        this.notify();
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
        }
    }

    // Ceramic Teacup Ping / Singing Bowl Chime for micro-interactions
    playChime(pitch = 587.33) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

        // Overtone for authentic porcelain timbre
        const overtone = this.ctx.createOscillator();
        const overGain = this.ctx.createGain();
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(pitch * 2.756, this.ctx.currentTime);

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

    // Tea pour / water infusion stream sound effect
    playPourSound(duration = 1.8) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.22;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + duration);
        filter.Q.setValueAtTime(2.8, this.ctx.currentTime);

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

    onTrackChange(fn) {
        this.trackListeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.isPlaying));
    }

    notifyTrackChange() {
        const cur = this.getCurrentTrack();
        this.trackListeners.forEach(fn => fn(cur, this.currentTrackIndex));
    }
}

// Global instance attached to window
window.teaAudio = new TeaAudioEngine();
