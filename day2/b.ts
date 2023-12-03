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
async function B() {
  function process(input: string): number {
    const lines = input.split("\n");
    const games = lines.filter(Boolean).map((line) => Game.fromLine(line));

    const powers = games
      .map((game) => ({
        id: game.id,
        draws: game.draws.reduce(
          (accu, draw) => {
            return {
              red: draw.red > accu.red ? draw.red : accu.red,
              blue: draw.blue > accu.blue ? draw.blue : accu.blue,
              green: draw.green > accu.green ? draw.green : accu.green,
            };
          },
          { red: 0, blue: 0, green: 0 }
        ),
      }))
      .map(({ id, draws }) => ({
        id,
        power: draws.red * draws.green * draws.blue,
      }));

    return powers.reduce((accu, { power }) => accu + power, 0);
  }

  const sampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

  const actual = process(sampleInput);

  if (actual !== 2286) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

B();
