"use client";

import React, { useState, useEffect } from "react";

type GameMode = "Beginner" | "Intermediate" | "Advanced" | "Master";

const gameModeOptions: { [key in GameMode]: number } = {
  Beginner: 4,
  Intermediate: 6,
  Advanced: 8,
  Master: 10,
};

const generateRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

const generateOptions = (correctColor: string, numOptions: number) => {
  const options = [correctColor];
  while (options.length < numOptions) {
    const newColor = generateRandomColor();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

const ColorGuessingGame = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    const color = generateRandomColor();
    setCurrentColor(color);
    setOptions(generateOptions(color, gameModeOptions[mode]));
    setGameOver(false);
  };

  const handleGuess = (guess: string) => {
    setIsCorrect(guess === currentColor);
    setShowResult(true);
    setGameOver(true);
  };

  const resetGame = () => {
    setGameMode(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (!gameMode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Color Guessing Game</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.keys(gameModeOptions).map((mode) => (
            <Button
              key={mode}
              onClick={() => startGame(mode as GameMode)}
              className="w-48"
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">
          {isCorrect ? "Correct!" : "Incorrect!"}
        </h1>
        <p className="text-2xl mb-4">The correct color was: {currentColor}</p>
        <div
          className="w-64 h-64 mb-8"
          style={{ backgroundColor: currentColor }}
        ></div>
        <Button onClick={resetGame} className="w-48">
          Play Again
        </Button>
        <div className="h-28" />
        Reference
        <div className="grid grid-cols-2 gap-4 mb-8">
          {options.map((color, index) => (
            <Button
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              className="w-32 h-12 text-black"
              disabled={gameOver}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Color Guessing Game</h1>
      <h2 className="text-2xl mb-4">Mode: {gameMode}</h2>
      <div
        className="w-64 h-64 mb-8"
        style={{ backgroundColor: currentColor }}
      ></div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map((color, index) => (
          <Button
            key={index}
            onClick={() => handleGuess(color)}
            className="w-32 h-12 text-black bg-black"
            disabled={gameOver}
          >
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ColorGuessingGame;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}) => {
  const baseStyle =
    "font-bold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200";

  const variantStyles = {
    primary: "bg-black hover:bg-red-600 text-white focus:ring-blue-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300",
    outline:
      "bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 focus:ring-gray-300",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
};
