import { generateDeck, shuffleDeck } from "@/components/Deck";
import { Action, GameState } from "@/types/types";
import {
	DEAL_CARD,
	DETERMINE_OUTCOME,
	HIT,
	STAND,
	START_GAME,
	player,
	dealer,
	none,
	draw,
} from "../constants/actionTypes";
import { calculateHandValue } from "../handUtils/handUtils";

const initialState: GameState = {
	deck: shuffleDeck(generateDeck()),
	playerHand: [],
	dealerHand: [],
	isGameOver: false,
	winner: none,
};

const gameReducer = (state: GameState, action: Action): GameState => {
	const { type } = action;

	switch (type) {
		case START_GAME:
			return {
				...initialState,
				deck: shuffleDeck(generateDeck()),
			};
		case DEAL_CARD: {
			const deck = [...state.deck];
			const card = deck.pop();
			if (!card) return state;

			return { ...state, deck, [action.hand]: [...state[action.hand], card] };
		}
		case HIT:
			if (state.isGameOver) return state;
			return gameReducer(state, { type: DEAL_CARD, hand: action.hand });
		case STAND:
			return gameReducer(state, { type: DETERMINE_OUTCOME });
		case DETERMINE_OUTCOME:
			const playerValue = calculateHandValue(state.playerHand);
			const dealerValue = calculateHandValue(state.dealerHand);

			let winner: typeof player | typeof dealer | typeof draw | typeof none = none;

			if (playerValue > 21 || playerValue < dealerValue) {
				winner = dealer;
			} else if (dealerValue > 21 || playerValue > dealerValue) {
				winner = player;
			} else if (playerValue === dealerValue) {
				winner = draw;
			}

			return {
				...state,
				isGameOver: true,
				winner,
			};

		default:
			return state;
	}
};

export { initialState, gameReducer };
