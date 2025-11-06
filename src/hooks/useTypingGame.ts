import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

import { generateRandomText, splitTextIntoLines, calculateStats } from '../utils';

import type { TargetedEvent } from 'preact/compat';
import type { TypingStats, GameState, GameMode } from '../types';

export function useTypingGame(mode: GameMode = 'classic') {
  // Main states
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [isTextFocused, setIsTextFocused] = useState(false);

  // Refs
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLDivElement>(null);
  const typeSoundRef = useRef<HTMLAudioElement | null>(null);

  // Función para enfocar el área de texto
  const focusTextArea = useCallback(() => {
    if (gameState !== 'finished') {
      setIsTextFocused(true);
      hiddenInputRef.current?.focus();
    }
  }, [gameState]);

  // Función para desenfocar el área de texto
  const blurTextArea = () => {
    setIsTextFocused(false);
  };

  // Reiniciar el juego
  const resetGame = useCallback(() => {
    const newText = generateRandomText();

    setTargetText(newText);
    setUserInput('');
    setCurrentIndex(0);
    setGameState('waiting');
    setElapsedTime(0);
    setStats(null);
    setIsTextFocused(false);

    setTimeout(() => {
      if (textContainerRef.current) {
        const containerWidth = textContainerRef.current.offsetWidth;
        const lines = splitTextIntoLines(newText, containerWidth);
        setTextLines(lines);
      }
    }, 100);
  }, []);

  // Manejar teclas presionadas
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Home' ||
      e.key === 'End'
    ) {
      e.preventDefault();
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'a' || e.key === 'z' || e.key === 'y' || e.key === 'x' || e.key === 'v') {
        e.preventDefault();
        return;
      }
    }
  };

  // Reproducir sonido al tipear
  const playTypeSound = () => {
    if (!typeSoundRef.current) return;
    typeSoundRef.current.currentTime = 0;
    typeSoundRef.current.play();
  };

  // Manejar cambios en el input
  const handleInputChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
    const inputElement = e.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.length < userInput.length) {
      return;
    }

    if (gameState === 'waiting' && value.length === 1) {
      setGameState('typing');
    }

    if (value.length > targetText.length) {
      return;
    }

    playTypeSound();

    setUserInput(value);
    setCurrentIndex(value.length);

    if (value.length === targetText.length) {
      setGameState('finished');
      setIsTextFocused(false);

      if (elapsedTime > 0) {
        const timeElapsed = elapsedTime * 1000;
        const finalStats = calculateStats(value, targetText, timeElapsed);
        setStats(finalStats);
      }
    }
  };

  // Effects

  // Inicializar con texto aleatorio al cargar
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Configurar sonido
  useEffect(() => {
    typeSoundRef.current = new Audio('/sounds/typeSound.mp3');
    typeSoundRef.current.volume = 0.3;
  }, []);

  // Contador de tiempo
  useEffect(() => {
    if (gameState !== 'typing') return;

    const interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  // modo timer config
  const TIME_LIMIT = 60;
  const remainingTime = Math.max(0, TIME_LIMIT - elapsedTime);

  if (mode === 'timer' && elapsedTime >= TIME_LIMIT) {
    setGameState('finished');
  }

  // modo timer -> finalizar a los 60seg
  useEffect(() => {
    if (mode === 'timer' && gameState === 'typing' && elapsedTime >= 60) {
      setGameState('finished');
    }
  }, [elapsedTime, gameState, mode]);

  // Manejar redimensionamiento de ventana
  useEffect(() => {
    const handleResize = () => {
      if (textContainerRef.current && targetText) {
        const containerWidth = textContainerRef.current.offsetWidth;
        const lines = splitTextIntoLines(targetText, containerWidth);
        setTextLines(lines);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [targetText]);

  return {
    targetText,
    userInput,
    currentIndex,
    gameState,
    stats,
    textLines,
    isTextFocused,
    hiddenInputRef,
    textContainerRef,
    textAreaRef,
    elapsedTime,
    remainingTime,
    mode,
    handleInputChange,
    handleKeyDown,
    focusTextArea,
    blurTextArea,
    resetGame,
    setIsTextFocused,
  };
}
