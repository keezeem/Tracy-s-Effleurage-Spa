/**
 * MOTION SYSTEM — one place for timings so the site moves with a consistent rhythm.
 * quick : feedback (press, toggle)   calm : reveals and hovers   slow : hero moments
 */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const duration = { quick: 0.25, calm: 0.8, slow: 1.4 } as const;
