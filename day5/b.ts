async function B() {
  function process(input: string): bigint {
    const lines = input.split("\n").filter(Boolean);
    const seeds = lines[0].split(": ")[1].split(" ").map(BigInt);

    const mapping: Record<
      string,
      Record<
        string,
        Array<{
          sourceRangeStart: bigint;
          destRangeStart: bigint;
          rangeLength: bigint;
        }>
      >
    > = {};

    const map = (source: string, destination: string) => (value: bigint) => {
      const rangeMapping = mapping[source][destination].find(
        ({ sourceRangeStart, rangeLength }) =>
          value >= sourceRangeStart && value <= rangeLength + sourceRangeStart
      );
      if (rangeMapping) {
        const { sourceRangeStart, destRangeStart } = rangeMapping;
        return destRangeStart + value - sourceRangeStart;
      }
      return value;
    };

    let source = "";
    let destination = "";
    for (let i = 1; i < lines.length; i++) {
      const headerRegex = /([a-z]+)-to-([a-z]+)/;
      const matches = lines[i].match(headerRegex);
      if (matches) {
        source = matches[1];
        destination = matches[2];
        mapping[source] = { [destination]: [] };
      } else {
        const [destRangeStart, sourceRangeStart, rangeLength] = lines[i]
          .split(" ")
          .map(BigInt);
          
        mapping[source][destination].push({
          destRangeStart,
          sourceRangeStart,
          rangeLength,
        });
      }
    }

    let min = BigInt(Number.MAX_SAFE_INTEGER);
    for (let i = 0; i < seeds.length; i += 2) {
      for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
        const a = map("seed", "soil")(j);
        const b = map("soil", "fertilizer")(a);
        const c = map("fertilizer", "water")(b);
        const d = map("water", "light")(c);
        const e = map("light", "temperature")(d);
        const f = map("temperature", "humidity")(e);
        const g = map("humidity", "location")(f);
        if (g < min) {
          min = g;
          console.log(min);
        }
      }
    }
    return min;
  }

  const sampleInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

  const actual = process(sampleInput);

  if (actual !== BigInt(46)) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

B();
