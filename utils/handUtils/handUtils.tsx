import { CardType } from "@/types/types";

const calculateHandValue = (hand: CardType[]): number => {
	let value = 0;
	let aceCount = 0;

	hand.forEach((card) => {
		if (card.value === "J" || card.value === "Q" || card.value === "K") {
			value += 10;
		} else if (card.value === "A") {
			aceCount += 1;
			value += 11;
		} else {
			value += parseInt(card.value, 10);
		}
	});

	while (value > 21 && aceCount > 0) {
		value -= 10;
		aceCount -= 1;
	}

	return value;
};

export { calculateHandValue };
