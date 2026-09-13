/**
 * Ambient Surreal Soundscape generator using Web Audio API
 * Works completely offline without external audio files.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private intervals: number[] = [];

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

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.04, now + 3);
      this.gainNode.connect(this.ctx.destination);

      // Low ethereal drone chords (surreal deep harmonics)
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
      // Audio context might be restricted before user gesture
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.gainNode) return;
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore
          }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1600);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambientSoundscape = new AmbientSoundscape();
