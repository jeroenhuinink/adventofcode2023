async function A() {
  function process(input: string): number {
    const lines = input.split("\n").filter(Boolean);
    const parsed = lines
      .map((line) => line.split(": "))
      .map((split) => [split[0], split[1].split(" | ")] as const)
      .map(
        (split) =>
          [
            split[0],
            [
              split[1][0].split(" ").filter(Boolean),
              split[1][1].split(" ").filter(Boolean),
            ] as const,
          ] as const
      )
      .map((split) =>
        split[1][1].filter((value) => split[1][0].includes(value))
      )
      .map((split) => (split.length > 0 ? 2 ** (split.length - 1) : 0))
      .reduce((total, value) => total + value, 0);
    return parsed;
  }

  const sampleInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

  const actual = process(sampleInput);

  if (actual !== 13) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

A();
