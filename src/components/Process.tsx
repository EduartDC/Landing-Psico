import { useEffect, useRef } from "react";
import LayoutContainer from "./LayoutContainer";
import { Monitor, Clock, Users, Shield, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const approachRef = useRef<HTMLDivElement>(null);
	const modalityRef = useRef<HTMLDivElement>(null);

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

			// Approach section animation
			gsap.fromTo(
				approachRef.current,
				{ opacity: 0, x: -30 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: approachRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Modality section animation
			gsap.fromTo(
				modalityRef.current,
				{ opacity: 0, x: 30 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: modalityRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Animate individual elements within sections
			const approachItems =
				approachRef.current?.querySelectorAll(".approach-item");
			const modalityItems =
				modalityRef.current?.querySelectorAll(".modality-item");

			if (approachItems) {
				gsap.fromTo(
					approachItems,
					{ opacity: 0, y: 15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: approachRef.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}

			if (modalityItems) {
				gsap.fromTo(
					modalityItems,
					{ opacity: 0, y: 15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: modalityRef.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}

			// Micro sway / pulse on main card icons every 8-10s (gentle)
			if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				const iconBlocks = sectionRef.current?.querySelectorAll(
					".p-3.bg-gradient-to-br"
				);
				if (iconBlocks) {
					iconBlocks.forEach((el, i) => {
						gsap.to(el, {
							rotation: () => (i % 2 === 0 ? 2.2 : -2.2),
							yoyo: true,
							repeat: -1,
							duration: 5 + (i % 3),
							delay: 2 + i * 0.4,
							ease: "sine.inOut",
						});
					});
				}
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="proceso"
			className="relative min-h-screen flex items-center py-20 md:py-32 bg-gradient-to-br from-cream-50 via-white to-rose-dust-50 overflow-hidden"
		>
			{/* Decoraciones laterales elegantes */}
			<div className="absolute left-0 top-0 h-full w-32 pointer-events-none opacity-60">
				<svg className="w-full h-full" viewBox="0 0 120 800" fill="none">
					<defs>
						<linearGradient id="flowerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
							<stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
							<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
						</linearGradient>
						<linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
							<stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
						</linearGradient>
					</defs>

					{/* Rama principal */}
					<path
						d="M20 50 Q40 150 30 250 Q45 350 25 450 Q50 550 35 650 Q20 750 40 800"
						stroke="url(#leafGrad1)"
						strokeWidth="2"
						fill="none"
						className="flora-sway"
					/>

					{/* Flores decorativas */}
					<g className="flora-sway" style={{ transformOrigin: "40px 120px" }}>
						<circle cx="40" cy="120" r="8" fill="url(#flowerGrad1)" />
						<circle cx="35" cy="115" r="4" fill="url(#flowerGrad1)" opacity="0.8" />
						<circle cx="45" cy="115" r="4" fill="url(#flowerGrad1)" opacity="0.8" />
						<circle cx="35" cy="125" r="4" fill="url(#flowerGrad1)" opacity="0.8" />
						<circle cx="45" cy="125" r="4" fill="url(#flowerGrad1)" opacity="0.8" />
					</g>

					{/* Hojas */}
					<ellipse
						cx="55"
						cy="200"
						rx="12"
						ry="6"
						fill="url(#leafGrad1)"
						transform="rotate(25 55 200)"
						className="flora-sway"
					/>
					<ellipse
						cx="15"
						cy="300"
						rx="10"
						ry="5"
						fill="url(#leafGrad1)"
						transform="rotate(-30 15 300)"
						className="flora-sway"
					/>

					{/* Flores adicionales */}
					<g className="flora-sway" style={{ transformOrigin: "25px 400px" }}>
						<circle cx="25" cy="400" r="6" fill="url(#flowerGrad1)" opacity="0.7" />
						<circle cx="22" cy="397" r="3" fill="url(#flowerGrad1)" opacity="0.6" />
						<circle cx="28" cy="397" r="3" fill="url(#flowerGrad1)" opacity="0.6" />
						<circle cx="22" cy="403" r="3" fill="url(#flowerGrad1)" opacity="0.6" />
						<circle cx="28" cy="403" r="3" fill="url(#flowerGrad1)" opacity="0.6" />
					</g>

					{/* Puntos decorativos */}
					<circle
						cx="60"
						cy="500"
						r="2"
						fill="url(#flowerGrad1)"
						opacity="0.5"
						className="flora-sway"
					/>
					<circle
						cx="10"
						cy="600"
						r="3"
						fill="url(#flowerGrad1)"
						opacity="0.4"
						className="flora-sway"
					/>
					<circle
						cx="70"
						cy="650"
						r="2"
						fill="url(#leafGrad1)"
						opacity="0.6"
						className="flora-sway"
					/>
				</svg>
			</div>

			<div className="absolute right-0 top-0 h-full w-32 pointer-events-none opacity-60">
				<svg className="w-full h-full" viewBox="0 0 120 800" fill="none">
					<defs>
						<linearGradient id="flowerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
							<stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
							<stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
						</linearGradient>
						<linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
							<stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* Decorative Elements */}
			<div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-rose-dust-200 to-rose-dust-300 rounded-full opacity-30 blur-3xl"></div>
			<div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-20 blur-3xl"></div>
			<div className="absolute top-1/3 right-1/4 w-3 h-3 bg-rose-dust-300 rounded-full opacity-40"></div>
			<div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sage-400 rounded-full opacity-50"></div>

			<LayoutContainer className="relative z-10">
				{/* Header */}
				<div className="text-center mb-16 md:mb-20">
					<h2
						ref={titleRef}
						className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-6 leading-tight"
					>
						¿Cómo trabajo?
					</h2>
					<div className="w-16 h-0.5 bg-gradient-to-r from-rose-dust-400 to-sage-400 mx-auto mb-8"></div>
					<p
						ref={subtitleRef}
						className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
					>
						Mi enfoque es{" "}
						<span className="font-medium text-rose-dust-700">
							psicodinámico con perspectiva de género
						</span>{" "}
						porque el dolor emocional no ocurre en el vacío: está profundamente ligado
						a nuestras historias, vínculos, a lo que hemos vivido y también a cómo
						hemos sido tratadas por el mundo. La terapia, para mí, es un espacio para{" "}
						<span className="font-medium text-rose-dust-700">
							entender lo que duele, darle lugar
						</span>{" "}
						y, poco a poco, transformarlo. No se trata solo de “estar bien”, sino de
						ser tú misma con mayor libertad, conciencia y cuidado.
					</p>
				</div>

				<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
					{/* How I Work */}
					<div
						ref={approachRef}
						className="relative card-modern group hover:shadow-xl transition-all duration-500"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-rose-dust-50 to-cream-50 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
						<div className="relative z-10">
							<div className="flex items-center gap-4 mb-8">
								<div className="p-3 bg-gradient-to-br from-rose-dust-200 to-rose-dust-300 rounded-2xl">
									<CheckCircle className="w-8 h-8 text-rose-dust-700" />
								</div>
								<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800">
									Mi Proceso Terapéutico
								</h3>
							</div>

							<p className="text-gray-700 leading-relaxed mb-8 text-lg">
								A lo largo del proceso, iremos{" "}
								<span className="font-medium text-rose-dust-700">
									construyendo juntas un espacio de confianza
								</span>
								, donde la palabra tenga sentido y el silencio también sea escuchado.
							</p>

							<div className="space-y-6">
								<div className="approach-item flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="w-3 h-3 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-full mt-2 flex-shrink-0"></div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2 text-lg">
											Escucha profunda
										</h4>
										<p className="text-gray-600">
											Sin juicios, con total respeto a tu ritmo y experiencia
										</p>
									</div>
								</div>

								<div className="approach-item flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="w-3 h-3 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-full mt-2 flex-shrink-0"></div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2 text-lg">
											Comprensión integral
										</h4>
										<p className="text-gray-600">
											Vemos tu historia completa, no solo los síntomas
										</p>
									</div>
								</div>

								<div className="approach-item flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="w-3 h-3 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-full mt-2 flex-shrink-0"></div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2 text-lg">
											Perspectiva de género
										</h4>
										<p className="text-gray-600">
											Entendiendo cómo el contexto social afecta tu experiencia
										</p>
									</div>
								</div>

								<div className="approach-item flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="w-3 h-3 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-full mt-2 flex-shrink-0"></div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2 text-lg">
											Transformación gradual
										</h4>
										<p className="text-gray-600">
											Cambios profundos y duraderos a tu propio ritmo
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Modality */}
					<div
						ref={modalityRef}
						className="relative card-modern group hover:shadow-xl transition-all duration-500"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-dusty-blue-50 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
						<div className="relative z-10">
							<div className="flex items-center gap-4 mb-8">
								<div className="p-3 bg-gradient-to-br from-sage-200 to-sage-300 rounded-2xl">
									<Monitor className="w-8 h-8 text-sage-700" />
								</div>
								<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800">
									Modalidad
								</h3>
							</div>

							<div className="space-y-6">
								<div className="modality-item p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex-shrink-0">
											<Monitor className="w-6 h-6 text-sage-700" />
										</div>
										<div>
											<h4 className="font-medium text-gray-800 mb-2 text-lg">
												Atención online, vía videollamada
											</h4>
											<p className="text-gray-600">
												Sesiones seguras y confidenciales desde tu hogar
											</p>
										</div>
									</div>
								</div>

								<div className="modality-item p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex-shrink-0">
											<Clock className="w-6 h-6 text-sage-700" />
										</div>
										<div>
											<h4 className="font-medium text-gray-800 mb-2 text-lg">
												Horarios flexibles
											</h4>
											<p className="text-gray-600">Adaptados a tus tiempos y espacios</p>
										</div>
									</div>
								</div>

								<div className="modality-item p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex-shrink-0">
											<Users className="w-6 h-6 text-sage-700" />
										</div>
										<div>
											<h4 className="font-medium text-gray-800 mb-2 text-lg">
												Dirigido a mujeres adultas
											</h4>
											<p className="text-gray-600">
												Especialización en mujeres de 20 a 50 años
											</p>
										</div>
									</div>
								</div>

								<div className="modality-item p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex-shrink-0">
											<Shield className="w-6 h-6 text-sage-700" />
										</div>
										<div>
											<h4 className="font-medium text-gray-800 mb-2 text-lg">
												Confidencialidad garantizada
											</h4>
											<p className="text-gray-600">Ética, respeto y privacidad absoluta</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mensaje inspirador */}
				<div className="text-center mt-8 md:mt-12">
					<div className="max-w-2xl mx-auto">
						<div className="relative p-8 md:p-12">
							<div className="absolute inset-0 bg-gradient-to-br from-cream-50 to-rose-dust-50 rounded-3xl opacity-70"></div>
							<div className="relative z-10">
								<p className="text-xl md:text-2xl font-serif font-light text-gray-800 leading-relaxed">
									No tienes que tener todo claro para empezar.{" "}
									<span className="text-rose-dust-700 font-medium">
										Empezar también es una forma de cuidarte.
									</span>
								</p>
								<div className="w-16 h-0.5 bg-gradient-to-r from-rose-dust-400 to-sage-400 mx-auto mt-6"></div>
							</div>
						</div>
					</div>
				</div>
			</LayoutContainer>
		</section>
	);
};

export default Process;
