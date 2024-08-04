import { CardProps } from "@/types/types";

const Card: React.FC<CardProps> = ({ card }) => (
	<div className="w-16 h-24 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center">
		<div className="text-lg font-bold">{card.value}</div>
		<div className="text-sm">{card.suit}</div>
	</div>
);

export default Card;
