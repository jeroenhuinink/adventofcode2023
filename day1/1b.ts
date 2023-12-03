const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

async function day1B() {
  function process(input: string): number {
    const lines = input.split("\n");
    const values = lines.map((line) => {
      let res = "";
      let skip = 0;
      for (let i = 0; i < line.length; i++) {
        const replace = Object.entries(numbers).find(([word]) =>
          line.slice(i).startsWith(word)
        );

        if (replace) {
          const [word, value] = replace;
          skip = word.length - 1;
          res += value;
        } else {
          if (skip == 0) {
            res += line[i];
          } else {
            skip--;
          }
        }
      }
      return res;
    });

    const result = values
      .map((line) =>
        line
          .split("")
          .filter((character) => "1234567890".includes(character))
          .join("")
      )
      .map((value) => (value.length > 0 ? value.at(0)! + value.at(-1) : 0))
      .map((chars) => Number(chars));
    return result.reduce((accu, value) => accu + value, 0);
  }

  const sampleInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

  const actual = process(sampleInput);

  if (actual !== 281) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

day1B();
