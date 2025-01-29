export default function debugBeep() {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Debug Beep');
    const ctx = new (window.AudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = "triangle"; // "square", "sawtooth", "sine" also work
    oscillator.frequency.setValueAtTime(140, ctx.currentTime); // 440Hz = A4
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1); // Beep for 0.1 seconds
  }
};
