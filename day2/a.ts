class Game {
  constructor(public id: number, public draws: Array<Record<string, number>>) {}
  static fromLine(line: string) {
    const [first, second] = line.split(": ");
    const id = Number(first.slice(5));
    const draws = second
      .split("; ")
      .map((draw) => draw.split(", "))
      .map((stones) =>
        stones
          .map((stone) => stone.split(" "))
          .reduce(
            (accu, [value, color]) => ({ ...accu, [color]: Number(value) }),
            {}
          )
      );
    return new Game(id, draws);
  }
}
async function A() {
  function process(input: string): number {
    const lines = input.split("\n");
    const games = lines.filter(Boolean).map((line) => Game.fromLine(line));
    
    return games
      .filter((game) =>
        !game.draws.some(
          (draw) => draw.red > 12 || draw.green > 13 || draw.blue > 14
        )
      )
      .reduce((total, game) => total + game.id, 0);
  }

  const sampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

  const actual = process(sampleInput);

  if (actual !== 8) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

A();
