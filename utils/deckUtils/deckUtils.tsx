import { CardType } from "@/types/types";

const suits: string[] = ["♠", "♥", "♦", "♣"];
const values: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const combinations: CardType[] = suits.flatMap((suit) =>
	values.map((value) => ({ suit, value }))
);
