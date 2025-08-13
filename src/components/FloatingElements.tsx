import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FloatingElementsProps {
	variant?: "flowers" | "leaves" | "butterflies" | "sparkles";
	count?: number;
	section?:
		| "hero"
		| "about"
		| "services"
		| "testimonials"
		| "contact"
		| "default";
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
	variant = "flowers",
	count = 5,
	section = "default",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const elements = containerRef.current.children;

		// Animación inicial de aparición
		gsap.fromTo(
			elements,
			{
				opacity: 0,
				scale: 0,
				rotation: -180,
				y: 100,
			},
			{
				opacity: 0.4, // Más sutil para no distraer
				scale: 1,
				rotation: 0,
				y: 0,
				duration: 2,
				stagger: 0.3,
				ease: "elastic.out(1, 0.5)",
				delay: 0.5,
			}
		);

		// Animación flotante continua
		Array.from(elements).forEach((element, index) => {
			gsap.to(element, {
				y: "random(-20, 20)",
				x: "random(-15, 15)",
				rotation: "random(-15, 15)",
				duration: "random(3, 6)",
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: index * 0.5,
			});

			// Animación de rotación sutil
			gsap.to(element, {
				rotation: "+=360",
				duration: "random(20, 40)",
				repeat: -1,
				ease: "none",
			});
		});

		// Animación de pulso ocasional
		const pulseTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
		pulseTimeline
			.to(elements, {
				scale: 1.1,
				duration: 0.5,
				stagger: 0.1,
				ease: "sine.inOut",
			})
			.to(elements, {
				scale: 1,
				duration: 0.5,
				stagger: 0.1,
				ease: "sine.inOut",
			});
	}, [count]);

	const getElementContent = () => {
		switch (variant) {
			case "flowers":
				return (
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
						<g opacity="0.5">
							{" "}
							{/* Flores más sutiles */}
							{/* Pétalos */}
							<path d="M12 4c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" fill="#f472b6" />
							<path d="M16 8c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" fill="#ec4899" />
							<path d="M16 16c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z" fill="#f472b6" />
							<path d="M8 16c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z" fill="#ec4899" />
							<path d="M8 8c0-1-1-2-2-2s-2 1-2 2 1 2 2 2 2-1 2-2z" fill="#f472b6" />
							<path d="M18 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" fill="#ec4899" />
							<path d="M6 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z" fill="#f472b6" />
							{/* Centro más sutil */}
							<circle cx="12" cy="12" r="2.5" fill="#fbbf24" opacity="0.7" />
							<circle cx="12" cy="12" r="1" fill="#f59e0b" opacity="0.8" />
						</g>
					</svg>
				);

			case "leaves":
				return (
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<g opacity="0.7">
							<path
								d="M10 2c-3 0-6 2-6 6 0 2 1 4 3 5l3-3c1-1 2-2 2-4 0-2-1-4-2-4z"
								fill="#10b981"
							/>
							<path
								d="M10 2c3 0 6 2 6 6 0 2-1 4-3 5l-3-3c-1-1-2-2-2-4 0-2 1-4 2-4z"
								fill="#059669"
							/>
							<path d="M10 8v10" stroke="#065f46" strokeWidth="1" />
						</g>
					</svg>
				);

			case "butterflies":
				return (
					<svg width="28" height="24" viewBox="0 0 28 24" fill="none">
						<g opacity="0.7">
							{/* Alas superiores */}
							<ellipse
								cx="8"
								cy="8"
								rx="6"
								ry="4"
								fill="#a855f7"
								transform="rotate(-20 8 8)"
							/>
							<ellipse
								cx="20"
								cy="8"
								rx="6"
								ry="4"
								fill="#8b5cf6"
								transform="rotate(20 20 8)"
							/>
							{/* Alas inferiores */}
							<ellipse
								cx="10"
								cy="14"
								rx="4"
								ry="3"
								fill="#c084fc"
								transform="rotate(-10 10 14)"
							/>
							<ellipse
								cx="18"
								cy="14"
								rx="4"
								ry="3"
								fill="#a78bfa"
								transform="rotate(10 18 14)"
							/>
							{/* Cuerpo */}
							<ellipse cx="14" cy="12" rx="1" ry="8" fill="#4c1d95" />
							{/* Antenas */}
							<circle cx="13" cy="6" r="1" fill="#4c1d95" />
							<circle cx="15" cy="6" r="1" fill="#4c1d95" />
						</g>
					</svg>
				);

			case "sparkles":
				return (
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
						<g opacity="0.6">
							{" "}
							{/* Destellos más sutiles */}
							<path
								d="M8 1l1.5 4.5L14 6.5l-4.5 1.5L8 13l-1.5-4.5L2 6.5l4.5-1.5L8 1z"
								fill="#fbbf24"
								opacity="0.7"
							/>
							<circle cx="8" cy="6.5" r="0.8" fill="#f59e0b" opacity="0.8" />
						</g>
					</svg>
				);

			default:
				return null;
		}
	};

	const getPositionClass = (index: number) => {
		// Posicionamiento inteligente basado en la sección
		const sectionPositions = {
			hero: [
				// Hero: Solo en esquinas exteriores, lejos del título central
				"top-8 left-8",
				"top-16 right-12",
				"bottom-24 left-12",
				"bottom-32 right-16",
				"top-1/4 left-4",
				"bottom-1/4 right-8",
			],
			about: [
				// About: En márgenes, evitando imagen izquierda y texto derecho
				"top-12 right-6",
				"bottom-16 left-8",
				"top-2/3 right-4",
				"bottom-1/3 right-12",
				"top-1/4 right-2",
			],
			services: [
				// Services: En espacios entre contenido, no sobre cards
				"top-8 left-8",
				"top-12 right-6",
				"bottom-20 left-10",
				"bottom-24 right-8",
				"top-1/3 left-6",
				"bottom-1/3 right-10",
			],
			testimonials: [
				// Testimonials: Alrededor del carrusel central
				"top-16 left-12",
				"top-20 right-10",
				"bottom-20 left-8",
				"bottom-24 right-14",
				"top-1/4 left-6",
				"bottom-1/4 right-6",
			],
			contact: [
				// Contact: Evitando formulario central y info de contacto
				"top-16 left-10",
				"top-12 right-12",
				"bottom-1/3 left-12",
				"bottom-1/4 right-8",
				"top-1/3 left-6",
				"top-1/3 right-4",
			],
			default: [
				"top-8 left-8",
				"top-12 right-12",
				"bottom-16 left-12",
				"bottom-20 right-16",
			],
		};

		const positions = sectionPositions[section] || sectionPositions.default;
		return positions[index % positions.length];
	};

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 pointer-events-none overflow-hidden"
			style={{ zIndex: 0 }} // Detrás del contenido principal
		>
			{Array.from({ length: count }, (_, index) => (
				<div
					key={`${variant}-${section}-${index}`}
					className={`absolute ${getPositionClass(index)}`}
					style={{
						opacity: 0.6, // Opacidad fija más sutil
						filter: "blur(0.5px)", // Ligero blur para suavizar
					}}
				>
					{getElementContent()}
				</div>
			))}
		</div>
	);
};

export default FloatingElements;
