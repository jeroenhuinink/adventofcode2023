
async function day1A() {
  function process(input: string): number {
    const lines = input.split("\n");
    const values = lines
      .map((line) =>
        line
          .split("")
          .filter((character) => "1234567890".includes(character))
          .join("")
      )
      .map((value) => (value.length > 0 ? value.at(0)! + value.at(-1) : 0))
      .map((chars) => Number(chars));
    return values.reduce((accu, value) => accu + value, 0);
  }

  const sampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

  const actual = process(sampleInput);

  if (actual !== 142) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

day1A();
