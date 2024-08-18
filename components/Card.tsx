import { CardProps } from "@/types/types";

const Card: React.FC<CardProps> = ({ card: { suit, value } }) => {
	const suitColor = (suit: string): string => {
		switch (suit) {
			case "♠":
			case "♣":
				return "text-black";
			case "♦":
			case "♥":
				return "text-red-500";
			default:
				return "text-black";
		}
	};

	return (
		<div className="w-24 h-32 bg-white border text-slate-800 rounded-lg shadow-md flex flex-col items-center justify-items-start text-xl animate-[pulse_1s_ease-in-out]">
			<p className="flex justify-end">{value}</p>
			<h2 className={`text-6xl ${suitColor(suit)}`}>{suit}</h2>
		</div>
	);
};

export default Card;
