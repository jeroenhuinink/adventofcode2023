async function A() {
  function distance(pressLength: number, duration: number) {
    const raceLength = duration - pressLength;
    return pressLength * raceLength;
  }

  function process(input: string): number {
    const lines = input.split("\n").filter(Boolean);
    const times = lines[0].split(":")[1].split(" ").filter(Boolean).map(Number);
    const distances = lines[1]
      .split(":")[1]
      .split(" ")
      .filter(Boolean)
      .map(Number);
    
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

  if (actual !== 288) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

A();
