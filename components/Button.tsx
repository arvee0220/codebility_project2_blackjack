import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({ children, onClick, bg_color }) => {
	return (
		<button
			onClick={onClick}
			className={`${
				bg_color === "green"
					? "bg-green-800"
					: bg_color === "red"
					? "bg-red-800"
					: bg_color === "blue"
					? "bg-blue-800"
					: ""
			} text-white font-medium px-4 py-2 rounded-lg shadow-md mr-2`}
		>
			{children}
		</button>
	);
};

export default Button;
