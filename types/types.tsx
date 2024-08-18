import {
	DEAL_CARD_TO_PLAYER,
	GAME_OVER,
	PLAYER_STAND,
	RESET_GAME,
	SET_DEALER_HAND,
	SET_DECK,
	SET_GAME_OVER,
	SET_NEW_GAME,
	SET_PLAYER_HAND,
	SET_RESULT,
} from "@/utils/constants/actionTypes";
import { ReactNode } from "react";

export type CardType = {
	suit: string;
	value: string;
};

export interface HandProps {
	cards: CardType[];
	title: string;
	handValue: number;
}

export interface CardProps {
	card: CardType;
}

export interface ButtonProps {
	children: ReactNode;
	onClick: () => void;
	bg_color: string;
}

export type Result = {
	type: "player" | "dealer" | "";
	message: string;
};
export interface GameState {
	gameDeck: CardType[];
	playerHand: CardType[];
	dealerHand: CardType[];
	gameOver: boolean;
	result: Result;
	newGame: boolean;
}

export type GameAction =
	| { type: typeof DEAL_CARD_TO_PLAYER }
	| { type: typeof PLAYER_STAND }
	| { type: typeof GAME_OVER; payload: Result }
	| { type: typeof RESET_GAME }
	| { type: typeof SET_DECK; payload: CardType[] }
	| { type: typeof SET_PLAYER_HAND; payload: CardType[] }
	| { type: typeof SET_DEALER_HAND; payload: CardType[] }
	| { type: typeof SET_GAME_OVER; payload: boolean }
	| { type: typeof SET_RESULT; payload: Result }
	| { type: typeof SET_NEW_GAME; payload: boolean };
