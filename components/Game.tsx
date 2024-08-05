"use client";
import { useReducer } from "react";

import Hand from "./Hand";

import { gameReducer, initialState } from "@/utils/reducers/cardReducer";
import {
	DEAL_CARD,
	HIT,
	STAND,
	START_GAME,
	dealerHand,
	none,
	playerHand,
} from "@/utils/constants/actionTypes";
import { calculateHandValue } from "@/utils/handUtils/handUtils";

const Game: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	const dealCard = (hand: typeof playerHand | typeof dealerHand) => {
		dispatch({ type: DEAL_CARD, hand });
	};

	// startGame function limits the card number into two by using dealCard() twice per participant(dealer & player)
	const startGame = () => {
		dispatch({ type: START_GAME });

		dealCard(playerHand);
		dealCard(playerHand);

		dealCard(dealerHand);
		dealCard(dealerHand);
	};

	const hit = () => {
		dispatch({ type: HIT, hand: playerHand });
		dispatch({ type: HIT, hand: dealerHand });
	};

	const stand = () => {
		dispatch({ type: STAND });
	};

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">Blackjack</h1>
			<button
				onClick={startGame}
				className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
			>
				Start Game
			</button>
			<button
				onClick={hit}
				disabled={state.isGameOver || calculateHandValue(state.playerHand) >= 21}
			>
				Hit
			</button>
			<button onClick={stand} disabled={state.isGameOver}>
				Stand
			</button>
			<h2 className="text-xl font-semibold mt-4">Dealer&apos;s Hand</h2>
			<Hand cards={state.dealerHand} />
			<h2 className="text-xl font-semibold mt-4">Player&apos;s Hand</h2>
			<Hand cards={state.playerHand} />
			{state.isGameOver && (
				<h2>{state.winner === none ? "It's a tie!" : `${state.winner} wins!`}</h2>
			)}
		</div>
	);
};

export default Game;
