const cards = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
].reverse();

async function A() {
  const countCards = (hand: string[]) => {
    return cards.reduce<Record<string, number>>((counts, card) => {
      const count = hand.filter((h) => h == card).length;
      if (count) {
        return {
          ...counts,
          [card]: count,
        };
      }
      return counts;
    }, {});
  };

  const isFiveOfAKind = (counts: Record<string, number>): number => {
    const found = Object.values(counts).find((count) => count === 5);

    if (found) {
      return 6;
    }
    return 0;
  };

  const isFourOfAKind = (counts: Record<string, number>): number => {
    const found = Object.values(counts).filter((count) => count === 4);

    if (found.length == 1) {
      return 5;
    }
    return 0;
  };

  const isFullHouse = (counts: Record<string, number>): number => {
    const found3 = Object.values(counts).filter((count) => count === 3);
    const found2 = Object.values(counts).filter((count) => count === 2);
    if (found3.length == 1 && found2.length == 1) {
      return 4;
    }
    return 0;
  };

  const isThreeOfAKind = (counts: Record<string, number>): number => {
    const found = Object.values(counts).filter((count) => count === 3);

    if (found.length == 1) {
      return 3;
    }

    return 0;
  };

  const isTwoPair = (counts: Record<string, number>): number => {
    const found = Object.values(counts).filter((count) => count === 2);

    if (found.length == 2) {
      return 2;
    }
    return 0;
  };

  const isOnePair = (counts: Record<string, number>): number => {
    const found = Object.values(counts).filter((count) => count === 2);

    if (found.length == 1) {
      return 1;
    }
    return 0;
  };

  const isHighCard = (_: Record<string, number>): number => 0;
  const rateHand = (hand: string[]) => {
    const counts = countCards(hand);
    return (
      isFiveOfAKind(counts) ||
      isFourOfAKind(counts) ||
      isFullHouse(counts) ||
      isThreeOfAKind(counts) ||
      isTwoPair(counts) ||
      isOnePair(counts) ||
      isHighCard(counts)
    );
  };

  function process(input: string): number {
    const lines = input.split("\n").filter(Boolean);
    const hands = lines.map((line) => {
      const split = line.split(" ");
      const hand = split[0];
      const bid = Number(split[1]);
      return { hand, bid };
    });

    const rank = (a: number, hand: string) =>
      a * 10000000000 +
      (hand[0] ? cards.indexOf(hand[0]) * 100000000 : 0) +
      (hand[1] ? cards.indexOf(hand[1]) * 1000000 : 0) +
      (hand[2] ? cards.indexOf(hand[2]) * 10000 : 0) +
      (hand[3] ? cards.indexOf(hand[3]) * 100 : 0) +
      (hand[4] ? cards.indexOf(hand[4]) * 1 : 0);

    const winnings = hands
      .map((hand) => ({
        hand: hand.hand,
        rate: rateHand(hand.hand.split("")),
        bid: hand.bid,
      }))
      .sort((a, b) => rank(a.rate, a.hand) - rank(b.rate, b.hand))
      .reduce((total, a, index) => total + (index + 1) * a.bid, 0);
    return winnings;
  }

  const sampleInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

  const actual = process(sampleInput);

  if (actual !== 6440) {
    console.log(actual);
    throw "fails";
  }
  const input = await Deno.readTextFile("./input.txt");

  console.log(process(input));
}

A();
