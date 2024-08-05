import { generateDeck, shuffleDeck } from "@/utils/deckUtils/deckUtils";
import {
	START_GAME,
	DEAL_CARD,
	playerHand,
	dealerHand,
	HIT,
	STAND,
	DETERMINE_OUTCOME,
	player,
	dealer,
	none,
	draw,
} from "@/utils/constants/actionTypes";

type DeckSuits = string[];

type DeckValue = string[];

type Card = {
	suit: string;
	value: string;
};

type CardProps = {
	card: Card;
};

type HandProps = {
	cards: Card[];
};

type GameState = {
	deck: Card[];
	playerHand: Card[];
	dealerHand: Card[];
	isGameOver: boolean;
	winner: typeof player | typeof dealer | typeof draw | typeof none;
};

type Action =
	| { type: typeof START_GAME }
	| { type: typeof DEAL_CARD; hand: typeof playerHand | typeof dealerHand }
	| { type: typeof HIT; hand: typeof playerHand | typeof dealerHand }
	| { type: typeof STAND }
	| { type: typeof DETERMINE_OUTCOME };

export type { DeckSuits, DeckValue, Card, CardProps, HandProps, GameState, Action };
