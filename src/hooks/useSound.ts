"use client";

import { useCallback, useRef } from 'react';

// Singleton AudioContext so we don't create multiple contexts
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // If the context is suspended (browser policy), try to resume it
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export function useSound() {
  const isEnabled = useRef(true); // Can be hooked up to user preferences later

  const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, vol = 0.1) => {
    if (!isEnabled.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Simple envelope to avoid pops
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playClick = useCallback(() => {
    // Short, soft 'tick'
    playTone(600, 'sine', 0.05, 0.05);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    // Ascending major arpeggio (C5 -> E5 -> G5)
    if (!isEnabled.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNote = (freq: number, delay: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.2);
    };

    playNote(523.25, 0);       // C5
    playNote(659.25, 0.08);    // E5
    playNote(783.99, 0.16);    // G5
    playNote(1046.50, 0.24);   // C6
  }, []);

  const playError = useCallback(() => {
    // Dissonant descending tone
    if (!isEnabled.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNote = (freq: number, delay: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.3);
    };

    playNote(300, 0); 
    playNote(280, 0.15);
  }, []);

  const playSwipe = useCallback(() => {
    // Soft noise burst for navigation
    if (!isEnabled.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.1; // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Lowpass filter to make it a soft "whoosh" instead of harsh static
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(ctx.currentTime);
  }, []);

  const playTada = useCallback(() => {
    // Triumphant chord for completing a topic
    if (!isEnabled.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNote = (freq: number, delay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Strum a C Major chord
    playNote(261.63, 0, 1.0);    // C4
    playNote(329.63, 0.05, 1.0); // E4
    playNote(392.00, 0.1, 1.0);  // G4
    playNote(523.25, 0.15, 1.5); // C5
  }, []);

  return {
    playClick,
    playSuccess,
    playError,
    playSwipe,
    playTada
  };
}
