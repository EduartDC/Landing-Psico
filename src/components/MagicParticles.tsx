import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagicParticlesProps {
	density?: "low" | "medium" | "high";
	color?: "warm" | "cool" | "nature" | "rainbow";
	behavior?: "gentle" | "dynamic" | "dreamy";
}

const MagicParticles: React.FC<MagicParticlesProps> = ({
	density = "medium",
	color = "warm",
	behavior = "gentle",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		const getDensityCount = () => {
			switch (density) {
				case "low":
					return 20;
				case "medium":
					return 35;
				case "high":
					return 50;
				default:
					return 35;
			}
		};

		const getParticleClasses = () => {
			const baseClasses = "absolute rounded-full pointer-events-none";

			switch (color) {
				case "warm":
					return `${baseClasses} bg-gradient-to-br from-pink-300 to-rose-400`;
				case "cool":
					return `${baseClasses} bg-gradient-to-br from-blue-300 to-purple-400`;
				case "nature":
					return `${baseClasses} bg-gradient-to-br from-green-300 to-emerald-400`;
				case "rainbow":
					return `${baseClasses} bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400`;
				default:
					return `${baseClasses} bg-gradient-to-br from-pink-300 to-rose-400`;
			}
		};

		const animateParticle = (particle: HTMLElement, index: number) => {
			const duration = Math.random() * 3 + 2; // 2-5 seconds
			const delay = Math.random() * 2; // 0-2 seconds delay

			gsap.set(particle, {
				opacity: 0,
				scale: 0,
			});

			const tl = gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 3 });

			switch (behavior) {
				case "gentle":
					tl
						.to(particle, {
							opacity: 0.6,
							scale: 1,
							duration: duration * 0.3,
							ease: "power2.out",
							delay: delay,
						})
						.to(
							particle,
							{
								y: -30,
								x: Math.random() * 20 - 10,
								rotation: Math.random() * 360,
								duration: duration * 0.6,
								ease: "sine.inOut",
							},
							"-=0.1"
						)
						.to(particle, {
							opacity: 0,
							scale: 0,
							duration: duration * 0.2,
							ease: "power2.in",
						});
					break;

				case "dynamic":
					tl
						.to(particle, {
							opacity: 0.8,
							scale: Math.random() * 1.5 + 0.5,
							duration: duration * 0.2,
							ease: "back.out(1.7)",
							delay: delay,
						})
						.to(particle, {
							y: Math.random() * 40 - 20,
							x: Math.random() * 40 - 20,
							rotation: Math.random() * 720,
							duration: duration * 0.6,
							ease: "power1.inOut",
						})
						.to(particle, {
							opacity: 0,
							scale: 0,
							duration: duration * 0.2,
							ease: "power2.in",
						});
					break;

				case "dreamy":
					tl
						.to(particle, {
							opacity: 0.4,
							scale: Math.random() * 0.8 + 0.3,
							duration: duration * 0.4,
							ease: "power1.out",
							delay: delay,
						})
						.to(
							particle,
							{
								y: -50,
								x: Math.sin(index) * 30,
								rotation: 180,
								duration: duration * 0.8,
								ease: "sine.inOut",
							},
							"-=0.2"
						)
						.to(
							particle,
							{
								opacity: 0,
								scale: 0,
								y: -80,
								duration: duration * 0.3,
								ease: "power2.in",
							},
							"-=0.3"
						);
					break;
			}
		};

		const particleCount = getDensityCount();

		// Clear any existing particles
		container.innerHTML = "";

		// Create particles
		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement("div");
			particle.className = getParticleClasses();

			// Random positioning
			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const size = Math.random() * 4 + 1;

			particle.style.left = `${x}%`;
			particle.style.top = `${y}%`;
			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;

			container.appendChild(particle);

			// Animate particle
			animateParticle(particle, i);
		}
	}, [density, color, behavior]);

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 pointer-events-none overflow-hidden"
			style={{ zIndex: 1 }}
		/>
	);
};

export default MagicParticles;
