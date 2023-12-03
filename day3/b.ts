interface PartNumber {
  value: string;
  start: number;
  end: number;
  line: number;
}

interface Gear {
  cell: number;
  line: number;
}
async function B() {
  function process(input: string): number {
    const raw = input.split("\n").filter(Boolean);
    const extra = ".".repeat(raw[0].length);
    const lines = [extra, ...raw, extra];
    const cells = lines.map((line) => ("." + line + ".").split(""));
    const stars: Gear[] = [];
    const numerals = "0123456789";

    const numbers: PartNumber[] = [];

    for (let i = 0; i < cells.length; i++) {
      let inNumber = false;
      let partNumber: PartNumber = { value: "", start: 0, end: 0, line: 0 };
      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        if (cell === "*") {
          stars.push({ line: i, cell: j });
        }
        if (numerals.includes(cell)) {
          if (!inNumber) {
            partNumber = { value: cell, start: j, end: j, line: i };
            inNumber = true;
          } else {
            partNumber = {
              value: partNumber.value + cell,
              start: partNumber.start,
              end: j,
              line: partNumber.line,
            };
          }
        } else {
          if (inNumber) {
            numbers.push(partNumber);
            inNumber = false;
          }
        }
      }
      if (inNumber) {
        numbers.push(partNumber);
      }
    }

    function isSymbol(line: number, cell: number) {
      return cells[line][cell] !== "." && !numerals.includes(cells[line][cell]);
    }

    const partNumbers = numbers.filter((partNumber) => {
      for (
        let line = partNumber.line - 1;
        line <= partNumber.line + 1;
        line++
      ) {
        for (
          let cell = partNumber.start - 1;
          cell <= partNumber.end + 1;
          cell++
        ) {
          if (isSymbol(line, cell)) {
            return true;
          }
        }
      }
    });
    
    const adjacentParts = stars.map(({ line, cell }) => {
      return partNumbers.filter(
        (partNumber) =>
          line >= partNumber.line - 1 &&
          line <= partNumber.line + 1 &&
          cell >= partNumber.start - 1 &&
          cell <= partNumber.end + 1
      );
    });
    const gears = adjacentParts.filter((parts) => parts.length > 1);

    const ratios = gears.map(
      (parts) => Number(parts[0].value) * Number(parts[1].value)
    );

    return ratios.reduce((total, gear) => total + gear, 0);
  }

  const sampleInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

  const actual = process(sampleInput);

  if (actual !== 467835) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

B();
