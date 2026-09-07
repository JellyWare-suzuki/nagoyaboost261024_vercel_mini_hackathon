import { writable } from 'svelte/store';

export const gameStatus = writable("playing");
export const revealedCells = writable(0);