import { useState, useEffect, useCallback } from 'react';
import { palettes, type Palette } from '../data/mockData';

const STORAGE_KEY = 'ellie-piper-palette';

export function usePalette() {
  const [currentPalette, setCurrentPalette] = useState<Palette>(() => {
    // Default to muted-rose
    return palettes.find((p) => p.id === 'muted-rose') || palettes[0];
  });

  // Load saved palette on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = palettes.find((p) => p.id === saved);
      if (found) {
        setCurrentPalette(found);
        applyPalette(found);
      }
    }
  }, []);

  // Apply palette to CSS custom properties
  const applyPalette = useCallback((palette: Palette) => {
    const root = document.documentElement;
    root.style.setProperty('--gold-accent', palette.colors.gold);
    root.style.setProperty('--gold-text', palette.colors.goldText);
    root.style.setProperty('--soft-blush', palette.colors.blush);
    root.style.setProperty('--warm-mauve', palette.colors.mauve);
    root.style.setProperty('--text-dark', palette.colors.text);
    root.style.setProperty('--white', palette.colors.white);
  }, []);

  const setPalette = useCallback(
    (paletteId: string) => {
      const palette = palettes.find((p) => p.id === paletteId);
      if (palette) {
        setCurrentPalette(palette);
        applyPalette(palette);
        localStorage.setItem(STORAGE_KEY, paletteId);
      }
    },
    [applyPalette]
  );

  return {
    currentPalette,
    palettes,
    setPalette,
  };
}
