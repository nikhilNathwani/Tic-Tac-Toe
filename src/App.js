/* 
Questions:
1) How come <> shorthand fragment syntax didn't work?
2) How come index.js is able to import "App" from App.js when the only component defined in here is called Square/Board and not "App"?
3) I'm running 'npm start' from the root of the TicTacToe folder, so how is it knowing to look inside the 'public' folder to access index.html? Is it just a convention to put index.html inside a folder called 'public'?
4) How come the 'value' argument (prop) into Square needed braces around it, i.e. "function Square({ value })" instead of "function Square(value)"? Is it a JSX syntax thing?
5) How come the useState output [value, setValue] could be created with 'const' keyword? Isn't the value going to change with each click?

*/

import React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

export default function Board() {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? "X" : "O"}`;
	}
	return (
		<React.Fragment>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square
					value={squares[0]}
					onSquareClick={() => handleClick(0)}
				/>
				<Square
					value={squares[1]}
					onSquareClick={() => handleClick(1)}
				/>
				<Square
					value={squares[2]}
					onSquareClick={() => handleClick(2)}
				/>
			</div>
			<div className="board-row">
				<Square
					value={squares[3]}
					onSquareClick={() => handleClick(3)}
				/>
				<Square
					value={squares[4]}
					onSquareClick={() => handleClick(4)}
				/>
				<Square
					value={squares[5]}
					onSquareClick={() => handleClick(5)}
				/>
			</div>
			<div className="board-row">
				<Square
					value={squares[6]}
					onSquareClick={() => handleClick(6)}
				/>
				<Square
					value={squares[7]}
					onSquareClick={() => handleClick(7)}
				/>
				<Square
					value={squares[8]}
					onSquareClick={() => handleClick(8)}
				/>
			</div>
		</React.Fragment>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}
