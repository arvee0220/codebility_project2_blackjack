import { HandProps } from "@/types/types";
import Card from "./Card";

const Hand: React.FC<HandProps> = ({ cards }) => (
	<div className="flex space-x-2">
		{cards.map((card, index) => (
			<Card key={index} card={card} />
		))}
	</div>
);

export default Hand;
