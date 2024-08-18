import { HandProps } from "@/types/types";
import Card from "./Card";

const Hand: React.FC<HandProps> = ({ cards, title, handValue }) => {
	return (
		<div className="p-4">
			<h2 className="text-2xl mb-2">
				{title}: {handValue}
			</h2>
			<div className="flex flex-col sm:flex-row gap-1">
				{cards.map((card, idx) => (
					<Card key={idx} card={card}></Card>
				))}
			</div>
		</div>
	);
};

export default Hand;
