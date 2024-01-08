"use client";

import { useEffect, useState } from "react";
import Square from "./components/Square";

const defaultSquares = new Array(9).fill({ value: null });

const liens = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const Page = () => {
  const [squares, setSquares] = useState(defaultSquares);
  const [isWinner, setIsWinner] = useState<string | null>(null);
  const [isTurn, setIsTurn] = useState(0);

  const drawTurn = (index: number, value: string) => {
    let newSquares = squares;

    newSquares[index] = { value: value };

    setSquares([...newSquares]);
  };

  const handleSquareClick = (index: number) => {
    const isPlayerTurn =
      squares.filter((square) => square?.value !== null).length % 2 === 0;
    if (isPlayerTurn) {
      drawTurn(index, "x");
    }
  };

  const reset = () => {
    setIsWinner(null);
    setSquares(defaultSquares);
  };

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square?.value !== null).length % 2 === 1;

    const linesThatAre = (a: string, b: string, c: string) => {
      return liens.filter((squareIndexs) => {
        const squareValues = squareIndexs.map((index) => squares[index]?.value);
        return JSON.stringify([a, b, c]) === JSON.stringify(squareValues);
      });
    };

    const playerWin = linesThatAre("x", "x", "x").length > 0;
    const computerWin = linesThatAre("o", "o", "o").length > 0;

    if (playerWin) {
      setIsWinner("x");
    }
    if (computerWin) {
      setIsWinner("o");
    }

    if (isComputerTurn) {
      const emptyIndexes = squares
        .map((square, index) => (square.value === null ? index : null))
        .filter((val) => val !== null);

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

      if (randomIndex) {
        drawTurn(randomIndex, "o");
      }
    }
  }, [squares]);

  return (
    <div className="w-screen h-screen bg-gray-300">
      <div className="container m-auto">
        <div className="text-center uppercase mb-10">
          <h1>Tick tac toe</h1>
        </div>
        <div className="w-full max-w-xs m-auto">
          <div className="grid grid-cols-3 border-2 border-white">
            {squares.map((square, index) => (
              <Square
                key={index}
                onClick={() => handleSquareClick(index)}
                item={square}
              />
            ))}
          </div>
        </div>

        {isWinner && isWinner === "x" ? (
          <div className="p-4 rounded bg-green-400">
            <div>YOU WIN</div>
            <button>Reset</button>
          </div>
        ) : (
          <div className="p-4 rounded bg-green-400">
            <div>COMPUTER WIN</div>
            <button>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
