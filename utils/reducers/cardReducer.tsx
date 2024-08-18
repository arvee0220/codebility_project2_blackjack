import { combinations } from "@/utils/deckUtils/deckUtils";

import {
	DEAL_CARD_TO_PLAYER,
	RESET_GAME,
	PLAYER_STAND,
	GAME_OVER,
	SET_DECK,
	SET_PLAYER_HAND,
	SET_DEALER_HAND,
	SET_GAME_OVER,
	SET_RESULT,
	SET_NEW_GAME,
} from "../constants/actionTypes";
import { GameAction, GameState } from "@/types/types";

const initialState: GameState = {
	gameDeck: combinations,
	playerHand: [],
	dealerHand: [],
	gameOver: false,
	result: { type: "", message: "" },
	newGame: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
	const { type } = action;

	switch (type) {
		case DEAL_CARD_TO_PLAYER:
			return state;
		case PLAYER_STAND:
			return state;
		case GAME_OVER:
			return {
				...state,
				gameOver: true,
				result: action.payload,
				newGame: true,
			};
		case RESET_GAME:
			return {
				...state,
				playerHand: [],
				dealerHand: [],
				gameOver: false,
				result: { type: "", message: "" },
				newGame: false,
				gameDeck: state.gameDeck,
			};
		case SET_DECK:
			return { ...state, gameDeck: action.payload };
		case SET_PLAYER_HAND:
			return { ...state, playerHand: action.payload };
		case SET_DEALER_HAND:
			return { ...state, dealerHand: action.payload };
		case SET_GAME_OVER:
			return { ...state, gameOver: action.payload };
		case SET_RESULT:
			return { ...state, result: action.payload };
		case SET_NEW_GAME:
			return { ...state, newGame: action.payload };
		default:
			return state;
	}
};

export { initialState, gameReducer };
