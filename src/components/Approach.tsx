import { useEffect, useRef } from "react";
import { Heart, Eye, Compass } from "lucide-react";
import LayoutContainer from "./LayoutContainer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicParticles from "./MagicParticles";

gsap.registerPlugin(ScrollTrigger);

const Approach = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);
	const lineArtRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Title animation
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 85%",
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
							start: "top 85%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}

			// Quote animation
			gsap.fromTo(
				quoteRef.current,
				{ opacity: 0, scale: 0.95 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: quoteRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);

			// Line art (leaf / flower) slow draw + breathing
			if (lineArtRef.current) {
				const path = lineArtRef.current;
				const total = path.getTotalLength();
				gsap.set(path, {
					strokeDasharray: total,
					strokeDashoffset: total,
					opacity: 0.9,
				});
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 4,
					ease: "power2.out",
					scrollTrigger: {
						trigger: path,
						start: "top 85%",
						once: true,
					},
					onComplete: () => {
						gsap.to(path, {
							scale: 1.03,
							transformOrigin: "center center",
							repeat: -1,
							yoyo: true,
							duration: 5,
							ease: "sine.inOut",
						});
					},
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="enfoque"
			className="relative pt-12 lg:pt-16 pb-12 lg:pb-16 bg-gradient-to-br from-sage-50 via-white to-cream-50 overflow-visible"
		>
			{/* Magic particles for wisdom and insight */}
			<MagicParticles density="low" color="nature" behavior="gentle" />

			{/* Line art decorative (leaf / flower) */}
			<svg
				className="absolute -top-10 left-2 w-40 h-40 text-rose-dust-300/60"
				viewBox="0 0 100 100"
				fill="none"
				aria-hidden="true"
			>
				<path
					ref={lineArtRef}
					d="M10 90 C20 70 30 55 28 40 C26 25 15 15 22 10 C30 4 44 20 50 34 C56 48 60 64 72 70 C84 76 92 72 90 60"
					stroke="currentColor"
					strokeWidth={1.2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<LayoutContainer>
				<div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14">
					{/* Columna texto */}
					<div className="w-full lg:w-3/5 flex flex-col">
						<h2
							ref={titleRef}
							className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-6 leading-tight"
						>
							Mi Enfoque Terapéutico
						</h2>
						<div ref={contentRef} className="space-y-6 lg:space-y-8 flex-1">
							<div className="flex items-start gap-5">
								<div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center flex-shrink-0">
									<Eye className="w-7 h-7 text-sage-600" />
								</div>
								<div>
									<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-4">
										Mirada Psicodinámica y con Perspectiva de Género
									</h3>
									<p className="text-gray-700 leading-relaxed text-lg">
										Trabajo desde una{" "}
										<strong className="text-gray-800">
											mirada psicodinámica y con perspectiva de género
										</strong>
										, porque el dolor emocional no ocurre en el vacío: está profundamente
										ligado a nuestras historias, vínculos, a lo que hemos vivido y también
										a cómo hemos sido tratadas por el mundo.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-5">
								<div className="w-14 h-14 bg-rose-dust-100 rounded-2xl flex items-center justify-center flex-shrink-0">
									<Heart className="w-7 h-7 text-rose-dust-600" />
								</div>
								<div>
									<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-4">
										Un Espacio para Entender y Transformar
									</h3>
									<p className="text-gray-700 leading-relaxed text-lg">
										La terapia, para mí, es un espacio para{" "}
										<strong className="text-gray-800">
											entender lo que duele, darle lugar y, poco a poco, transformarlo
										</strong>
										. No se trata solo de "estar bien", sino de ser tú misma con mayor
										libertad, conciencia y cuidado.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-5">
								<div className="w-14 h-14 bg-dusty-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
									<Compass className="w-7 h-7 text-dusty-blue-600" />
								</div>
								<div>
									<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-4">
										Proceso de Autoconocimiento
									</h3>
									<p className="text-gray-700 leading-relaxed text-lg">
										Mi trabajo se centra en acompañarte a{" "}
										<strong className="text-gray-800">
											reconocer patrones, entender tus emociones y desarrollar nuevas
											formas de relacionarte
										</strong>
										contigo misma y con los demás, siempre desde el respeto a tu ritmo y
										tus necesidades únicas.
									</p>
								</div>
							</div>
						</div>
						{/* fin contentRef */}
					</div>
					{/* Columna imagen */}
					<div className="w-full lg:w-2/5 mt-10 lg:mt-0">
						<div className="relative h-full w-full rounded-3xl overflow-hidden shadow-soft-lg flex">
							<img
								src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt="Enfoque terapéutico con perspectiva de género"
								className="w-full h-full object-cover"
							/>
							{/* Decorativos opcionales */}
							<div className="pointer-events-none absolute inset-0">
								<div className="absolute -top-6 -left-6 w-32 h-32 bg-rose-dust-100/50 rounded-full blur-sm"></div>
								<div className="absolute -bottom-8 -right-8 w-40 h-40 bg-sage-100/50 rounded-3xl blur-sm rotate-12"></div>
							</div>
						</div>
					</div>
				</div>
			</LayoutContainer>
		</section>
	);
};

export default Approach;
