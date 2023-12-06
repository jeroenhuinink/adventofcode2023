async function A() {
  function distance(pressLength: number, duration: number) {
    const raceLength = duration - pressLength;
    // console.log('d', duration, raceLength, pressLength);
    return pressLength * raceLength;
  }

  function process(input: string): number {
    const lines = input.split("\n").filter(Boolean);
    const times = [
      Number(lines[0].split(":")[1].split(" ").filter(Boolean).join("")),
    ];
    const distances = [
      Number(lines[1].split(":")[1].split(" ").filter(Boolean).join("")),
    ];

    const wins: number[] = [];
    for (let i = 0; i < times.length; i++) {
      wins[i] = 0;
      for (let j = 0; j <= times[i]; j++) {
        if (distance(j, times[i]) > distances[i]) {
          wins[i]++;
        }
      }
    }

    return wins.reduce((total, value) => total * value, 1);
  }

  const sampleInput = `
Time:      7  15   30
Distance:  9  40  200
`;

  const actual = process(sampleInput);

  if (actual !== 71503) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

A();
