"use client";

import { useState, useEffect } from 'react';
import DeepScanUI from '@/components/DeepScanUI';

const LOADING_TEXTS = [
  "Cloning repositories... 📦",
  "Judging your commit history... 👀",
  "Assigning RPG Class... 🧙‍♂️",
  "Sniffing for code smells... 💩",
  "Calculating raw developer worth... 💸"
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return <DeepScanUI loadingText={LOADING_TEXTS[index]} />;
}
