import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

import { generateRandomText, splitTextIntoLines, calculateStats } from '../utils';

import type { TargetedEvent } from 'preact/compat';
import type { TypingStats, GameState } from '../types';

export function useTypingGame() {
  // Main states
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [startTime, setStartTime] = useState<number | null>(null);
  // const [endTime, setEndTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [isTextFocused, setIsTextFocused] = useState(false);

  // Refs
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLDivElement>(null);

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
    setStartTime(null);
    // setEndTime(null);
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

  // Manejar cambios en el input
  const handleInputChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
    const inputElement = e.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.length < userInput.length) {
      return;
    }

    if (gameState === 'waiting' && value.length === 1) {
      setGameState('typing');
      setStartTime(Date.now());
    }

    if (value.length > targetText.length) {
      return;
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    if (value.length === targetText.length) {
      const endTime = Date.now();
      // setEndTime(endTime);
      setGameState('finished');
      setIsTextFocused(false);

      if (startTime) {
        const timeElapsed = endTime - startTime;
        const finalStats = calculateStats(value, targetText, timeElapsed);
        setStats(finalStats);
      }
    }
  };

  // Effects

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

  // Inicializar con texto aleatorio al cargar
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Enfocar automáticamente al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      focusTextArea();
    }, 500);

    return () => clearTimeout(timer);
  }, [focusTextArea]);

  return {
    targetText,
    userInput,
    currentIndex,
    gameState,
    startTime,
    stats,
    textLines,
    isTextFocused,
    hiddenInputRef,
    textContainerRef,
    textAreaRef,
    handleInputChange,
    handleKeyDown,
    focusTextArea,
    blurTextArea,
    resetGame,
    setIsTextFocused,
  };
}
