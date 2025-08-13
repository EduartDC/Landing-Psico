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
				"La terapia con Montse me ha ayudado mucho a descubrirme, pero lo más importante ha sido aprender a perdonarme. Ya no siento culpa ni miedo de ser quien soy.",
			author: "A.",
			role: "23 años",
			initial: "A",
			color:
				"bg-gradient-to-br from-rose-dust-100 to-rose-dust-200 text-rose-dust-800",
		},
		{
			text:
				"Con la Psico, en mi proceso descubrí que lo que me dolía tenía un origen, y me ha ayudado a entenderlo. Sigo aprendiendo cosas sobre mí e identificando las partes que aún puedo mejorar.",
			author: "J.",
			role: "36 años.",
			initial: "J",
			color: "bg-gradient-to-br from-cream-100 to-cream-200 text-cream-800",
		},
		{
			text:
				"Al principio tenía muchas dudas y resistencia, pero gracias a la Psicóloga Montse encontré un acompañamiento que me permitió encontrarme y vivir con libertad por primera vez.",
			author: "M.A.",
			role: "56 años.",
			initial: "M",
			color:
				"bg-gradient-to-br from-dusty-blue-100 to-dusty-blue-200 text-dusty-blue-800",
		},
		{
			text:
				"Estoy orgullosa de mí misma y muy agradecida porque Montse me acompañó y guió para afrontar el proceso de denuncia hacia mi agresor. Sigo conociéndome y aprendiendo a cuidarme.",
			author: "A.",
			role: "29 años.",
			initial: "A",
			color: "bg-gradient-to-br from-sage-100 to-sage-200 text-sage-800",
		},
		{
			text:
				"Mi proceso con la Psico me ayudó a entender que no soy una mala madre, sino que estoy maternando con mis propios recursos. Me he reconciliado con mi maternidad y con el cuidado de mis hijos.",
			author: "C.",
			role: "33 años.",
			initial: "C",
			color: "bg-gradient-to-br from-sage-100 to-sage-200 text-sage-800",
		},
		{
			text:
				"La encontré en un momento muy difícil. Hoy, cuando escucho una canción que significa mucho para mí, pienso en todo lo que me ha ayudado y me siento muy agradecida.",
			author: "L.",
			role: "42 años.",
			initial: "L",
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
		}, 7000);

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
		<div className="card-modern group relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
			<div className="absolute inset-0 bg-white/90 group-hover:bg-white/95 transition-all duration-500"></div>

			<Quote className="absolute top-5 right-5 w-8 h-8 text-rose-dust-200 opacity-30 transform rotate-12" />

			<div className="relative z-10 flex flex-col p-6 h-full justify-between">
				<p className="text-gray-700 leading-relaxed text-base italic">
					"{testimonial.text}"
				</p>
				<div className="flex items-center gap-3 mt-3">
					<div
						className={`w-12 h-12 rounded-full flex items-center justify-center ${testimonial.color} shadow-lg flex-shrink-0`}
					>
						<span className="text-lg font-medium">{testimonial.initial}</span>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 text-base">
							{testimonial.author}
						</h4>
						<p className="text-gray-600 text-sm">{testimonial.role}</p>
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

				<div ref={carouselRef} className="relative w-full max-w-6xl mx-auto">
					<div className="overflow-hidden px-0 py-8">
						<div
							className="flex transition-transform duration-[1000ms] ease-in-out"
							style={{
								transform: `translateX(-${(currentIndex / 2) * 100}%)`,
							}}
						>
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className="flex-shrink-0 px-2"
									style={{ width: "50%" }}
								>
									<TestimonialCard testimonial={testimonial} />
								</div>
							))}
						</div>
					</div>

					<button
						onClick={prevTestimonial}
						className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white text-rose-dust-700 p-3 rounded-full shadow-xl hover:bg-rose-dust-50 transition-all duration-300 transform hover:scale-110 border border-rose-dust-100 z-10"
						aria-label="Previous testimonial"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={nextTestimonial}
						className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white text-rose-dust-700 p-3 rounded-full shadow-xl hover:bg-rose-dust-50 transition-all duration-300 transform hover:scale-110 border border-rose-dust-100 z-10"
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
