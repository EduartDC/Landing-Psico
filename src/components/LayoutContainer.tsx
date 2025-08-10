import React from "react";

interface LayoutContainerProps {
	children: React.ReactNode;
	className?: string;
}

// Contenedor estándar para landing pages: gutters responsivos y ancho máximo consistente
const LayoutContainer: React.FC<LayoutContainerProps> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 ${className}`.trim()}
		>
			{children}
		</div>
	);
};

export default LayoutContainer;
