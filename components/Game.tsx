"use client";
import { useReducer, useEffect } from "react";

import Hand from "./Hand";

import { gameReducer, initialState } from "@/utils/reducers/cardReducer";
import {
	GAME_OVER,
	RESET_GAME,
	SET_DEALER_HAND,
	SET_DECK,
	SET_GAME_OVER,
	SET_NEW_GAME,
	SET_PLAYER_HAND,
	SET_RESULT,
} from "@/utils/constants/actionTypes";

import Button from "./Button";

import { calculateHandValue } from "@/utils/handUtils/handUtils";
import { CardType } from "@/types/types";

const Game: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	const { gameDeck, playerHand, dealerHand, gameOver, result, newGame } = state;

	const getRandomCardFromDeck = (): CardType => {
		const randomIndex = Math.floor(Math.random() * gameDeck.length);
		const card = gameDeck[randomIndex];
		const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
		dispatch({ type: SET_DECK, payload: newDeck });
		return card;
	};

	const dealCardToPlayer = () => {
		const newHand = [...playerHand, getRandomCardFromDeck()];
		dispatch({ type: SET_PLAYER_HAND, payload: newHand });

		const playerValue = calculateHandValue(newHand);

		if (playerValue > 21) {
			dispatch({
				type: GAME_OVER,
				payload: { type: "dealer", message: "Player busts! Dealer Wins" },
			});
		} else if (playerValue === 21) {
			dispatch({ type: GAME_OVER, payload: { type: "player", message: "Player Wins!" } });
		}
	};

	const playerStand = () => {
		dispatch({ type: SET_GAME_OVER, payload: true });
		const newHand = [...dealerHand, getRandomCardFromDeck()];

		const dealerValue = calculateHandValue(newHand);

		if (dealerValue > 21) {
			dispatch({
				type: GAME_OVER,
				payload: { type: "player", message: "Dealer busts! Player wins!" },
			});
		} else if (playerValue < dealerValue) {
			dispatch({ type: GAME_OVER, payload: { type: "dealer", message: "Dealer wins!" } });
		} else {
			dispatch({ type: SET_DEALER_HAND, payload: newHand });
		}
	};

	const resetGame = () => {
		dispatch({ type: RESET_GAME });
	};

	const playerValue = calculateHandValue(playerHand);
	const dealerValue = calculateHandValue(dealerHand);

	useEffect(() => {
		if (playerHand.length === 0 && dealerHand.length === 0) {
			dispatch({
				type: SET_PLAYER_HAND,
				payload: [getRandomCardFromDeck(), getRandomCardFromDeck()],
			});
			dispatch({
				type: SET_DEALER_HAND,
				payload: [getRandomCardFromDeck(), getRandomCardFromDeck()],
			});
		}

		if (gameOver && dealerHand.length <= 5) {
			switch (true) {
				case playerValue === 21:
					dispatch({
						type: SET_RESULT,
						payload: { type: "player", message: "Player wins!" },
					});
					break;
				case playerValue > 21:
					dispatch({
						type: SET_RESULT,
						payload: { type: "dealer", message: "Dealer wins!" },
					});
					break;
				case dealerValue <= playerValue:
					playerStand();
					break;
				case dealerValue === playerValue && dealerHand.length <= 5:
					dispatch({ type: SET_RESULT, payload: { type: "", message: "Draw!" } });
					dispatch({ type: SET_NEW_GAME, payload: true });
					break;
				case dealerValue > playerValue && dealerValue <= 21:
					dispatch({
						type: SET_RESULT,
						payload: { type: "dealer", message: "Dealer wins!" },
					});
					dispatch({ type: SET_NEW_GAME, payload: true });
					break;
				case dealerValue === 21 && playerValue === 21:
					dispatch({
						type: SET_RESULT,
						payload: { type: "", message: "Draw!" },
					});
					dispatch({ type: SET_NEW_GAME, payload: true });
					break;
				default:
					break;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerHand, dealerHand, gameOver]);

	return (
		<div className="bg-gradient-radial from-blue-500 to-slate-900 text-white h-screen w-screen">
			<h1 className="text-4xl text-center mb-4">Blackjack</h1>
			{gameOver && (
				<div
					className={`text-white ${
						result.type === "player" ? "bg-green-600" : "bg-red-700"
					} font-bold rounded-md text-center mt-4 py-4`}
				>
					<h2 className="text-2xl">{result.message}</h2>
				</div>
			)}
			<div className="flex justify-center flex-col gap-2 mt-4">
				{!newGame ? (
					<div className="flex justify-center">
						<Button bg_color={"green"} onClick={dealCardToPlayer}>
							Hit
						</Button>
						<Button bg_color={"red"} onClick={playerStand}>
							Stand
						</Button>
					</div>
				) : (
					<Button bg_color={"blue"} onClick={resetGame}>
						Reset
					</Button>
				)}
				<div className="flex justify-around">
					<Hand cards={playerHand} title={"Player's Hand"} handValue={playerValue} />
					<Hand cards={dealerHand} title={"Dealer's Hand"} handValue={dealerValue} />
				</div>
			</div>
		</div>
	);
};

export default Game;
