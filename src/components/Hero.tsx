import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";
import { gsap } from "gsap";
import LottieIcon from "./LottieIcon";
import sparkle from "../lottie/sparkle.json";
import calmPulse from "../lottie/calm-pulse.json";
import FloatingElements from "./FloatingElements";
import MagicParticles from "./MagicParticles";

const Hero = () => {
	const heroRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);
	const scrollIndicatorRef = useRef<HTMLDivElement>(null);
	const sparkleGroupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const ctx = gsap.context(() => {
			const title = titleRef.current;
			const subtitle = subtitleRef.current;
			const buttons = buttonsRef.current;
			const quote = quoteRef.current;
			const indicator = scrollIndicatorRef.current;

			if (reduce) {
				[title, subtitle, buttons, quote, indicator].forEach(
					(el) => el && gsap.set(el, { opacity: 1, y: 0 })
				);
				if (sparkleGroupRef.current) {
					gsap.set(sparkleGroupRef.current.children, { opacity: 0.8, scale: 1 });
				}
				return; // Skip animations for reduced motion preference
			}

			// More concise, faster appearing sequence
			gsap.set([title, subtitle, buttons, quote, indicator], {
				opacity: 0,
				y: 20,
			});

			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
			tl
				.to(title, { opacity: 1, y: 0, duration: 0.55 })
				.to(subtitle, { opacity: 1, y: 0, duration: 0.45 }, "-=0.30")
				.to(buttons, { opacity: 1, y: 0, duration: 0.45 }, "-=0.28")
				.to(quote, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
				.to(indicator, { opacity: 1, y: 0, duration: 0.4 }, "-=0.22");

			// Lightweight pulse for scroll indicator (replaces animate-bounce CSS)
			if (indicator) {
				const inner = indicator.querySelector(".indicator-dot");
				if (inner) {
					gsap.to(inner, {
						y: 10,
						opacity: 0.3,
						duration: 1.4,
						yoyo: true,
						repeat: -1,
						ease: "sine.inOut",
					});
					gsap.to(indicator, {
						scale: 1.04,
						duration: 3.2,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				}
			}

			// Additional subtle sparkles near title
			if (sparkleGroupRef.current) {
				const s = sparkleGroupRef.current.children;
				gsap.set(s, { opacity: 0, scale: 0.6 });
				gsap.to(s, {
					opacity: 0.9,
					scale: 1,
					stagger: 0.25,
					duration: 0.8,
					ease: "power2.out",
					delay: 0.4,
				});
				gsap.to(s, {
					y: (i) => (i % 2 === 0 ? 6 : -6),
					opacity: 0.5,
					repeat: -1,
					yoyo: true,
					duration: 3,
					ease: "sine.inOut",
					stagger: 0.4,
				});
			}
		}, heroRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			id="inicio"
			className="relative section-modern min-h-screen h-screen flex items-center overflow-hidden"
		>
			{/* Magic particles for ethereal effect - Multiple layers */}
			<MagicParticles density="medium" color="warm" behavior="dreamy" />
			<MagicParticles density="low" color="rainbow" behavior="gentle" />

			{/* Floating decorative elements - Solo 2 elementos sutiles */}
			<FloatingElements variant="flowers" count={2} section="hero" />

			{/* Background Image */}
			<div className="absolute inset-0 w-full h-full">
				<img
					src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2"
					alt="Sesión de terapia online - Ambiente acogedor"
					className="w-full h-full object-cover opacity-50"
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-white/50 via-rose-dust-50/40 to-sage-50/50"></div>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-20 left-10 w-32 h-32 bg-rose-dust-200/30 rounded-full blur-3xl flex items-center justify-center">
				<LottieIcon
					animation={sparkle as unknown as object}
					className="w-24 h-24"
					ariaLabel="Brillo animado"
				/>
			</div>
			<div className="absolute bottom-20 right-10 w-40 h-40 bg-sage-200/30 rounded-full blur-3xl flex items-center justify-center">
				<LottieIcon
					animation={calmPulse as unknown as object}
					className="w-28 h-28"
					ariaLabel="Pulso calmado"
				/>
			</div>
			<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cream-200/40 rounded-full blur-2xl"></div>

			<LayoutContainer className="relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					{/* Local sparkles cluster */}
					<div
						ref={sparkleGroupRef}
						className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none"
					>
						<div className="w-8 h-8 text-rose-dust-300">
							<LottieIcon
								animation={sparkle as unknown as object}
								className="w-full h-full"
							/>
						</div>
						<div className="w-10 h-10 text-sage-300">
							<LottieIcon
								animation={sparkle as unknown as object}
								className="w-full h-full"
							/>
						</div>
						<div className="w-7 h-7 text-dusty-blue-300">
							<LottieIcon
								animation={sparkle as unknown as object}
								className="w-full h-full"
							/>
						</div>
					</div>
					<h1
						ref={titleRef}
						className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6 text-sage-900"
					>
						<br />
						<span className="text-sage-800 block mt-2">
							Tu camino hacia el bienestar
						</span>
					</h1>

					<p
						ref={subtitleRef}
						className="text-lg md:text-xl text-sage-700 mb-8 max-w-2xl mx-auto leading-relaxed"
					>
						<strong className="text-sage-800">
							Terapia psicológica 100% online,
						</strong>{" "}
						aquí encontrarás un espacio seguro para ser escuchada, para sentirte
						acompañada y comenzar a sanar. Trabajo desde la ética, la empatía y el
						compromiso, enfocándome en el bienestar emocional de las mujeres.
					</p>

					<div
						ref={buttonsRef}
						className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
					>
						<a
							href="#contacto"
							className="btn-primary flex items-center justify-center gap-2"
							aria-label="Reservar primera sesión de psicología online"
						>
							Reserva tu consulta gratuita
							<ArrowRight size={18} />
						</a>
						<a
							href="#enfoque"
							className="btn-secondary"
							aria-label="Conocer mi enfoque terapéutico"
						>
							Mi enfoque
						</a>
					</div>

					{/* Quote section */}
					<div
						ref={quoteRef}
						className="card-modern max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border border-white/50"
					>
						<p className="text-sage-800 italic font-serif text-lg mb-3">
							<strong>"Tu voz importa. Tu dolor también."</strong>
						</p>
						<p className="text-rose-dust-600 font-medium">
							— Montserrat Herbert, Psicóloga Clínica
						</p>
					</div>
				</div>
			</LayoutContainer>

			{/* Scroll indicator */}
			<div
				ref={scrollIndicatorRef}
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<div className="w-8 h-14 rounded-full border-2 border-sage-400/70 bg-white/40 backdrop-blur-sm flex justify-center items-start relative overflow-hidden">
					<div className="indicator-dot w-2 h-3 rounded-full bg-gradient-to-b from-sage-500 to-sage-300 mt-2"></div>
					<div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sage-200/30 blur-sm"></div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
