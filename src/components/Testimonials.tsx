import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import LayoutContainer from "./LayoutContainer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
	text: string;
	author: string;
	role: string;
	initial: string;
	color: string;
}

const Testimonials = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const floatingQuotesRef = useRef<HTMLDivElement>(null);
	const sparkleRef = useRef<HTMLDivElement>(null);

	const testimonials: Testimonial[] = [
		{
			text:
				"Antes de acudir a la Dra. Sánchez, la ansiedad controlaba mi vida. Después de varios meses de terapia, he aprendido a manejar mis pensamientos y emociones de forma mucho más saludable. Ahora tengo herramientas que me ayudan día a día.",
			author: "Laura G.",
			role: "Paciente de terapia individual online",
			initial: "L",
			color:
				"bg-gradient-to-br from-rose-dust-100 to-rose-dust-200 text-rose-dust-800",
		},
		{
			text:
				"Mi esposa y yo estábamos al borde del divorcio cuando decidimos probar la terapia de pareja. La Dra. Sánchez nos ayudó a mejorar nuestra comunicación y a entender las necesidades del otro. Ha sido un proceso transformador para nuestra relación.",
			author: "Miguel y Ana S.",
			role: "Pacientes de terapia de pareja online",
			initial: "M",
			color: "bg-gradient-to-br from-cream-100 to-cream-200 text-cream-800",
		},
		{
			text:
				"Después de años luchando con ataques de pánico, finalmente encontré ayuda real. Las técnicas que aprendí me han permitido recuperar mi vida social y profesional. La empatía y profesionalidad de la Dra. Sánchez marcaron la diferencia.",
			author: "Carlos M.",
			role: "Paciente de manejo de ansiedad online",
			initial: "C",
			color:
				"bg-gradient-to-br from-dusty-blue-100 to-dusty-blue-200 text-dusty-blue-800",
		},
		{
			text:
				"Como expatriada, la terapia online ha sido un salvavidas. A pesar de la distancia, las sesiones son cercanas y efectivas. He notado un gran cambio en cómo manejo el estrés y las situaciones difíciles en mi día a día.",
			author: "Elena R.",
			role: "Paciente de terapia online",
			initial: "E",
			color: "bg-gradient-to-br from-sage-100 to-sage-200 text-sage-800",
		},
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

			// Carousel animation
			gsap.fromTo(
				carouselRef.current,
				{ opacity: 0, scale: 0.95 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: carouselRef.current,
						start: "top 85%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				}
			);
			// Floating quotes subtle drift
			if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				if (floatingQuotesRef.current) {
					const children = floatingQuotesRef.current.children;
					gsap.to(children, {
						y: (i) => (i % 2 === 0 ? 6 : -6),
						duration: 5,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
						stagger: 0.6,
					});
				}
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Auto-advance carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [testimonials.length]);

	const nextTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
		);
		// Sparkle effect
		if (sparkleRef.current) {
			gsap.fromTo(
				sparkleRef.current,
				{ scale: 0.4, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
			);
			gsap.to(sparkleRef.current, {
				opacity: 0,
				duration: 0.6,
				delay: 0.6,
				ease: "power2.out",
			});
		}
	};

	const prevTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
		);
		if (sparkleRef.current) {
			gsap.fromTo(
				sparkleRef.current,
				{ scale: 0.4, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
			);
			gsap.to(sparkleRef.current, {
				opacity: 0,
				duration: 0.6,
				delay: 0.6,
				ease: "power2.out",
			});
		}
	};

	const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
		<div className="card-modern group relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full min-h-[320px] flex flex-col">
			<div className="absolute inset-0 bg-white/90 group-hover:bg-white/95 transition-all duration-500"></div>

			<Quote className="absolute top-6 right-6 w-10 h-10 text-rose-dust-200 opacity-30 transform rotate-12" />

			<div className="relative z-10 flex-grow flex flex-col">
				<p className="text-gray-700 leading-relaxed mb-4 text-lg italic flex-grow">
					"{testimonial.text}"
				</p>
				<div className="flex items-center gap-4">
					<div
						className={`w-14 h-14 rounded-full flex items-center justify-center ${testimonial.color} shadow-lg flex-shrink-0`}
					>
						<span className="text-xl font-medium">{testimonial.initial}</span>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 text-lg">
							{testimonial.author}
						</h4>
						<p className="text-gray-600">{testimonial.role}</p>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<section
			ref={sectionRef}
			id="testimonios"
			className="relative min-h-screen flex items-center py-20 md:py-32 bg-gradient-to-bl from-sage-50 via-cream-50 to-rose-dust-50 overflow-hidden"
		>
			{/* Decorative Elements */}
			<div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-rose-dust-200 to-rose-dust-300 rounded-full opacity-20 blur-3xl"></div>
			<div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-30 blur-3xl"></div>
			<div className="absolute top-1/2 right-1/3 w-2 h-2 bg-rose-dust-400 rounded-full opacity-40"></div>
			<div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-sage-400 rounded-full opacity-50"></div>
			{/* Floating quotes cluster */}
			<div
				ref={floatingQuotesRef}
				className="absolute inset-0 pointer-events-none"
			>
				<Quote className="absolute top-10 left-8 w-8 h-8 text-rose-dust-300/40" />
				<Quote className="absolute bottom-16 right-10 w-10 h-10 text-sage-300/40 rotate-12" />
				<Quote className="absolute top-1/3 right-1/4 w-6 h-6 text-dusty-blue-300/40 -rotate-12" />
			</div>
			<div
				ref={sparkleRef}
				className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-16 h-16"
			>
				<div className="w-full h-full rounded-full bg-gradient-to-br from-rose-dust-300 to-sage-300 blur-md opacity-70" />
			</div>

			<LayoutContainer className="relative z-10">
				{/* Header */}
				<div className="text-center mb-16 md:mb-20">
					<h2
						ref={titleRef}
						className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-6 leading-tight"
					>
						Testimonios de Pacientes
					</h2>
					<div className="w-20 h-0.5 bg-gradient-to-r from-rose-dust-400 to-sage-400 mx-auto mb-8"></div>
					<p
						ref={subtitleRef}
						className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
					>
						Estas son algunas experiencias de personas que han confiado en mí para su
						proceso de{" "}
						<span className="font-medium text-rose-dust-700">
							terapia psicológica online
						</span>
						. Por confidencialidad, se han modificado los nombres.
					</p>
				</div>

				<div
					ref={carouselRef}
					className="relative w-full max-w-none mx-auto px-4 md:px-8"
				>
					<div className="overflow-x-hidden overflow-y-visible px-4 py-8">
						<div
							className="flex gap-6 md:gap-8 transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentIndex * 50}%)` }}
						>
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className="w-full md:w-1/2 flex-shrink-0 px-4 md:px-6 py-4"
								>
									<TestimonialCard testimonial={testimonial} />
								</div>
							))}
						</div>
					</div>

					<button
						onClick={prevTestimonial}
						className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white text-rose-dust-700 p-3 rounded-full shadow-xl hover:bg-rose-dust-50 transition-all duration-300 transform hover:scale-110 border border-rose-dust-100 z-10"
						aria-label="Previous testimonial"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={nextTestimonial}
						className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white text-rose-dust-700 p-3 rounded-full shadow-xl hover:bg-rose-dust-50 transition-all duration-300 transform hover:scale-110 border border-rose-dust-100 z-10"
						aria-label="Next testimonial"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>

				<div className="flex justify-center gap-3 mt-10 md:mt-12">
					{Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
						(_, index) => (
							<div
								key={index}
								className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
									index === currentIndex / 2
										? "bg-gradient-to-r from-rose-dust-400 to-sage-400 w-12"
										: "bg-gray-300 w-2 hover:bg-gray-400"
								}`}
								onClick={() => setCurrentIndex(index * 2)}
							/>
						)
					)}
				</div>
			</LayoutContainer>
		</section>
	);
};

export default Testimonials;
