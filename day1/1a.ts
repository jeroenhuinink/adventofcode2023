async function day1A() {
  function process(input: string): number {
    const lines = input.split("\n");
    return lines.length;
  }

  const sampleInput = `

  `;

  const actual = process(sampleInput);

  if (actual !== 3) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

day1A();
