/**
 * Ambient Surreal Soundscape generator using Web Audio API
 * Works completely offline without external audio files.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private stopTimeoutId: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private clearOscillators() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore already stopped oscillators
      }
    });
    this.oscillators = [];
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        // Ignore
      }
      this.gainNode = null;
    }
  }

  public start() {
    try {
      if (this.stopTimeoutId !== null) {
        window.clearTimeout(this.stopTimeoutId);
        this.stopTimeoutId = null;
      }
      this.clearOscillators();

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.04, now + 2.5);
      this.gainNode.connect(this.ctx.destination);

      const freqs = [108, 162, 216, 324];
      this.oscillators = [];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        if (panner) {
          panner.pan.setValueAtTime((idx - 1.5) * 0.4, now);
          osc.connect(filter);
          filter.connect(panner);
          panner.connect(this.gainNode);
        } else {
          osc.connect(filter);
          filter.connect(this.gainNode);
        }

        osc.start();
        this.oscillators.push(osc);
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (!this.ctx || !this.gainNode) {
      this.clearOscillators();
      return;
    }
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      if (this.stopTimeoutId !== null) {
        window.clearTimeout(this.stopTimeoutId);
      }
      this.stopTimeoutId = window.setTimeout(() => {
        this.stopTimeoutId = null;
        if (!this.isPlaying) {
          this.clearOscillators();
        }
      }, 1300);
    } catch {
      this.clearOscillators();
    }
  }
}

export const ambientSoundscape = new AmbientSoundscape();
