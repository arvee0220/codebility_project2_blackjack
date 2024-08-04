import { Card } from "@/types/types";

const getCardValue = (card: Card): number => {
	if (["Jack", "Queen", "King"].includes(card.value)) return 10;
	if (card.value === "Ace") return 11;
	return parseInt(card.value, 10);
};

const calculateHandValue = (hand: Card[]): number => {
	let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
	let aceCount = hand.filter((card) => card.value === "Ace").length;

	while (value > 21 && aceCount > 0) {
		value -= 10;
		aceCount -= 1;
	}

	return value;
};

export { getCardValue, calculateHandValue };
