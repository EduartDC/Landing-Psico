import React from "react";

// Lazy loading para GSAP y sus plugins
export const loadGSAP = async () => {
	const [gsapModule, scrollTriggerModule] = await Promise.all([
		import("gsap"),
		import("gsap/ScrollTrigger"),
	]);

	const { gsap } = gsapModule;
	const { ScrollTrigger } = scrollTriggerModule;

	gsap.registerPlugin(ScrollTrigger);

	return { gsap, ScrollTrigger };
};

// Helper para componentes que usan GSAP
export const withGSAP = <T extends object>(
	Component: React.ComponentType<T>
) => {
	return (props: T) => {
		return React.createElement(Component, props);
	};
};
