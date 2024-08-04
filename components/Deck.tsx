import { DeckSuits, DeckValue, Card } from "@/types/types";

const suits: DeckSuits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values: DeckValue = [
	"Ace",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"Jack",
	"Queen",
	"King",
];

const generateDeck = (): Card[] => {
	let deck: Card[] = [];

	for (let suit of suits) {
		for (let value of values) {
			deck.push({ suit, value });
		}
	}

	return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
	for (let i = deck.length - 1; i > 0; i--) {
		const j: number = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	return deck;
};

export { generateDeck, shuffleDeck };
