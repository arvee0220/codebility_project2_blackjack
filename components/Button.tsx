import { ButtonProps } from "@/types/types";

const Button: React.FC<ButtonProps> = ({ children, onClick, bg_color }) => {
	return (
		<button
			onClick={onClick}
			className={`bg-${bg_color}-800 text-white font-medium px-4 py-2 rounded-lg shadow-md mr-2`}
		>
			{children}
		</button>
	);
};

export default Button;
