import React, { useEffect, useRef } from "react";
import LayoutContainer from "./LayoutContainer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicParticles from "./MagicParticles";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Image animation
			gsap.fromTo(
				imageRef.current,
				{ opacity: 0, x: -30 },
				{
					opacity: 1,
					x: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Content animation
			const contentChildren = contentRef.current?.children;
			if (contentChildren) {
				gsap.fromTo(
					contentChildren,
					{ opacity: 0, y: 15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: contentRef.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}

			// Floating animation for decorative elements (reduced movement)
			const firstDecorative = imageRef.current?.querySelector(
				".absolute:first-child"
			);
			const lastDecorative = imageRef.current?.querySelector(
				".absolute:last-child"
			);

			if (firstDecorative) {
				gsap.to(firstDecorative, {
					y: -3,
					rotation: 1,
					duration: 4,
					ease: "power1.inOut",
					yoyo: true,
					repeat: -1,
				});
			}

			if (lastDecorative) {
				gsap.to(lastDecorative, {
					y: 3,
					rotation: -0.5,
					duration: 3,
					ease: "power1.inOut",
					yoyo: true,
					repeat: -1,
					delay: 1,
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="sobre-mí"
			className="section-modern bg-gradient-to-br from-rose-dust-50 via-cream-50 to-sage-50 overflow-hidden relative"
		>
			{/* Magic particles for peaceful atmosphere */}
			<MagicParticles density="low" color="nature" behavior="gentle" />

			<LayoutContainer>
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
					<div className="w-full lg:w-2/5 flex justify-center">
						<div ref={imageRef} className="relative max-w-sm w-full">
							<div className="absolute -top-4 -left-4 w-24 h-24 bg-rose-dust-100 rounded-3xl z-0 transform rotate-12"></div>
							<div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage-100 rounded-full z-0"></div>
							<div className="absolute top-1/2 -right-6 w-16 h-16 bg-cream-200 rounded-2xl z-0 transform -rotate-6"></div>
							<img
								src="https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt="Psicóloga Montserrat Herbert."
								className="rounded-3xl shadow-soft-lg w-full h-auto aspect-[3/4] object-cover relative z-10"
							/>
						</div>
					</div>

					<div className="w-full lg:w-3/5">
						<div ref={contentRef} className="space-y-6">
							<h2 className="text-4xl lg:text-5xl font-serif font-medium text-sage-900 mb-6">
								¿Quién soy?
							</h2>

							<p className="text-sage-700 text-lg leading-relaxed">
								Soy{" "}
								<strong className="text-sage-800">
									Montserrat Herbert, Licenciada en Psicología por la Universidad
									Veracruzana
								</strong>{" "}
								con más de 6 años de experiencia acompañando a mujeres que han vivido
								violencia de género. Mi trabajo se ha centrado en ofrecer un espacio
								seguro, ético y empático para quienes atraviesan procesos complejos como
								abuso sexual, relaciones dependientes, ansiedad, depresión, maternidades
								difíciles o estrés crónico.
							</p>

							<p className="text-sage-700 text-lg leading-relaxed">
								Tengo formación en{" "}
								<strong className="text-sage-800">
									primeros auxilios psicológicos, intervención en crisis y acompañamiento
									terapéutico en casos de abuso sexual infantil
								</strong>
								, así como en procesos legales derivados de situaciones de violencia. Sé
								lo importante que es contar con alguien que sepa acompañarte desde la
								comprensión profunda, sin juicios ni prisas.
							</p>

							<p className="text-sage-700 text-lg leading-relaxed">
								Mi compromiso es caminar contigo en tu proceso de sanación, entendiendo
								que cada historia es única y merece ser tratada con respeto y
								sensibilidad.
							</p>

							<div className="bg-gradient-to-r from-rose-dust-50 to-cream-50 rounded-3xl p-6 border border-rose-dust-100">
								<p className="text-sage-700 text-lg leading-relaxed">
									"Estoy aquí para caminar contigo tu proceso de sanación y crecimiento
									personal.{" "}
									<strong className="text-sage-800">
										Con respeto, calidez y profesionalismo
									</strong>
									, te acompaño a encontrar tu propia voz y tu propia paz."
								</p>
							</div>
						</div>
					</div>
				</div>
			</LayoutContainer>
		</section>
	);
};

export default AboutMe;
