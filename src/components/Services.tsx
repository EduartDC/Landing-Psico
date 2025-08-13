import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingElements from "./FloatingElements";
import MagicParticles from "./MagicParticles";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const mainCardRef = useRef<HTMLDivElement>(null);
	const whenToSeekRef = useRef<HTMLDivElement>(null);
	const conditionsRef = useRef<HTMLDivElement>(null);

	const conditions = [
		"Relaciones dependientes o violentas",
		"Ansiedad, angustia o tristeza constante",
		"Procesos de duelo o separación",
		"Maternidades ambivalentes o difíciles",
		"Abuso sexual o violencia de género",
		"Culpa, baja autoestima, sensación de vacío",
		"Burnout, cansancio emocional, estrés crónico",
		"Dificultades en la identidad, el cuerpo o el deseo",
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Title and subtitle animation
			gsap.fromTo(
				[titleRef.current, subtitleRef.current],
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Main card animation
			gsap.fromTo(
				mainCardRef.current,
				{ opacity: 0, scale: 0.95 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: mainCardRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// When to seek animation
			gsap.fromTo(
				whenToSeekRef.current,
				{ opacity: 0, x: -30 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: whenToSeekRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Conditions animation
			gsap.fromTo(
				conditionsRef.current,
				{ opacity: 0, x: 30 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: conditionsRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Individual condition items animation
			const conditionItems =
				conditionsRef.current?.querySelectorAll(".condition-item");
			if (conditionItems) {
				gsap.fromTo(
					conditionItems,
					{ opacity: 0, x: 10 },
					{
						opacity: 1,
						x: 0,
						duration: 0.5,
						stagger: 0.08,
						ease: "power2.out",
						scrollTrigger: {
							trigger: conditionsRef.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="servicios"
			className="section-modern bg-gradient-to-br from-sage-50 via-cream-50 to-rose-dust-50 overflow-hidden relative"
		>
			{/* Magic particles for healing atmosphere */}
			<MagicParticles density="medium" color="cool" behavior="gentle" />

			{/* Floating decorative elements - Solo 1 elemento */}
			<FloatingElements variant="sparkles" count={1} section="services" />

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
				<div className="text-center mb-16">
					<h2
						ref={titleRef}
						className="font-serif text-4xl lg:text-5xl font-medium text-sage-900 mb-6"
					>
						Servicios de Terapia
					</h2>
					<p ref={subtitleRef} className="text-xl text-sage-700 max-w-2xl mx-auto">
						Un espacio seguro para tu bienestar emocional
					</p>
				</div>

				{/* When to Seek Help & Conditions */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					<div
						ref={whenToSeekRef}
						className="card-modern bg-gradient-to-br from-cream-100 to-sage-50 border border-cream-200"
					>
						<h3 className="text-2xl lg:text-3xl font-serif font-medium text-sage-900 mb-6">
							¿Cuándo buscar ayuda?
						</h3>
						<p className="text-sage-700 leading-relaxed mb-6 text-lg">
							Muchas veces no sabemos si "lo que sentimos" es suficiente para ir a
							terapia. Pero{" "}
							<strong className="text-sage-800">
								si te duele, si te pesa, si te confunde, ya es motivo suficiente
							</strong>{" "}
							para buscar acompañamiento.
						</p>
						<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
							<p className="text-sage-800 italic text-lg">
								"No necesitas estar en crisis para merecer apoyo. Tu bienestar emocional
								es importante, y cuidarlo es un acto de amor propio."
							</p>
						</div>
					</div>

					<div
						ref={conditionsRef}
						className="card-modern bg-gradient-to-br from-rose-dust-100 to-dusty-blue-50 border border-rose-dust-200"
					>
						<h3 className="text-2xl lg:text-3xl font-serif font-medium text-sage-900 mb-6">
							Trabajo con mujeres que enfrentan:
						</h3>
						<div className="space-y-4">
							{conditions.map((condition, index) => (
								<div
									key={index}
									className="condition-item flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50"
								>
									<div className="w-3 h-3 bg-rose-dust-500 rounded-full mt-1.5 flex-shrink-0"></div>
									<span className="text-sage-700 font-medium">{condition}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className="text-center mt-16">
					<div className="card-modern max-w-2xl mx-auto bg-gradient-to-r from-rose-dust-50 to-sage-50 border border-rose-dust-200">
						<h3 className="text-2xl font-serif font-medium text-sage-900 mb-4">
							No te quedes con dudas, da el primer paso hacia tu bienestar
						</h3>
						<p className="text-sage-700 mb-6 text-lg">
							Agenda<strong> tu primera consulta gratuita</strong> y descubre cómo la
							terapia puede ayudarte.
						</p>
						<a
							href="#contacto"
							className="btn-primary inline-flex items-center gap-2"
						>
							Reservar consulta gratuita
							<ArrowRight size={18} />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
