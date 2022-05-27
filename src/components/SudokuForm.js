import { useState } from "react";

const SudokuForm = () => {
  let empty_puzzle = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ];

  const [puzzleVals, setVals] = useState(empty_puzzle);

  //returns row and column of the next empty tile on the puzzle
  let next_empty = (puzzle) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === "") {
          return [row, col];
        }
      }
    }
    return [null, null];
  };

  // returns a boolean that tell us if a specific value is valid
  let is_valid = (guess, puzzle, row, col) => {
    if (guess === "") {
      return true;
    }
    // check row
    for (let colCurrent = 0; colCurrent < 9; colCurrent++) {
      if (puzzle[row][colCurrent] === guess && colCurrent !== col) {
        return false;
      }
    }
    //   check column
    for (let rowCurrent = 0; rowCurrent < 9; rowCurrent++) {
      if (puzzle[rowCurrent][col] === guess && rowCurrent !== row) {
        return false;
      }
    }
    //   check section
    let start_col = Math.floor(col / 3) * 3;
    let start_row = Math.floor(row / 3) * 3;
    for (let row_increment = 0; row_increment < 3; row_increment++) {
      for (let col_increment = 0; col_increment < 3; col_increment++) {
        if (
          puzzle[start_row + row_increment][start_col + col_increment] ===
            guess &&
          start_row + row_increment !== row &&
          start_col + col_increment !== col
        ) {
          return false;
        }
      }
    }
    return true;
  };

  // Solves the given puzzle in place
  let solve = (puzzle) => {
    const [row, col] = next_empty(puzzle);
    if (row === null) {
      return true;
    }

    for (let guess = 1; guess < 10; guess++) {
      if (is_valid(guess, puzzle, row, col)) {
        puzzle[row][col] = guess;
        if (solve(puzzle)) {
          return true;
        }
      }
      puzzle[row][col] = "";
    }
    return false;
  };

  // Validate that the puzzle given by the user is valid
  let validate_puzzle = (puzzle) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (is_valid(puzzle[row][col], puzzle, row, col) === false) {
          return false;
        }
      }
    }
    return true;
  };

  // Validate that the input in each tile is an integer number between 1 and 9 or an empty string
  const validate_input = (s) => {
    if (s === "") {
      return true;
    } else if (s.length > 1) {
      return false;
    }
    let num = Number(s);
    if (isNaN(num)) {
      return false;
    }
    if (num < 10 && num > 0) {
      return true;
    }
  };

  // Sets the new value of puzzle values
  const handleChange = (e) => {
    if (validate_input(e.target.value)) {
      let col = e.target.getAttribute("col");
      let row = e.target.getAttribute("row");
      let newVals = [...puzzleVals];

      newVals[row][col] = e.target.value === "" ? "" : Number(e.target.value);
      setVals(newVals);
    }
  };

  //Checks if input is valid and if so, solves the puzzle
  let handleSubmit = (e) => {
    e.preventDefault();
    let solvedPuzzle = [...puzzleVals];
    if (validate_puzzle(solvedPuzzle)) {
      solve(solvedPuzzle);
      setVals(solvedPuzzle);
    } else alert("Not a valid input");
  };

  // sets puzzle values to empty strings
  let clearForm = (e) => {
    e.preventDefault();
    setVals(empty_puzzle);
  };

  return (
    <div className="PuzzleContainer">
      <form onSubmit={handleSubmit}>
        {puzzleVals.map((curr, row) => {
          return (
            <div className="row" key={row}>
              {curr.map((tile, col) => {
                return (
                  <input
                    type="Text"
                    className="Tile"
                    row={row}
                    col={col}
                    key={`${row}${col}`}
                    value={tile}
                    onChange={handleChange}
                  ></input>
                );
              })}
            </div>
          );
        })}
        <button className="btn" onClick={clearForm}>
          Clear
        </button>
        <input className="btn" type="submit" value="Enviar" />
      </form>
    </div>
  );
};
export default SudokuForm;
