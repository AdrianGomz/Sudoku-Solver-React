import { useState } from "react";

const SudokuForm = () => {
  let puzzle = [
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
  const [vals, setVals] = useState(puzzle);
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

  let is_valid = (guess, puzzle, row, col) => {
    // check row
    for (let colCurrent = 0; colCurrent < 9; colCurrent++) {
      if (puzzle[row][colCurrent] === guess) {
        return false;
      }
    }
    //   check column
    for (let rowCurrent = 0; rowCurrent < 9; rowCurrent++) {
      if (puzzle[rowCurrent][col] === guess) {
        return false;
      }
    }
    //   check section
    let start_col = Math.floor(col / 3) * 3;
    let start_row = Math.floor(row / 3) * 3;
    for (let row_increment = 0; row_increment < 3; row_increment++) {
      for (let col_increment = 0; col_increment < 3; col_increment++) {
        if (
          puzzle[start_row + row_increment][start_col + col_increment] === guess
        ) {
          return false;
        }
      }
    }
    return true;
  };

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
  const handleChange = (e) => {
    if (validate_input(e.target.value)) {
      let col = e.target.getAttribute("col");
      let row = e.target.getAttribute("row");
      let newVals = [...vals];

      newVals[row][col] = e.target.value === "" ? "" : Number(e.target.value);
      setVals(newVals);
      console.log(vals);
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let solvedPuzzle = [...vals];
    console.log(vals, solvedPuzzle);
    solve(solvedPuzzle);
    console.log(vals, solvedPuzzle);
    setVals(solvedPuzzle);
  };

  return (
    <div className="PuzzleContainer">
      <form onSubmit={handleSubmit}>
        {vals.map((curr, row) => {
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
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};
export default SudokuForm;
