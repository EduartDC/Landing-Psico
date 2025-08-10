import { useEffect, useRef } from "react";
import { Heart, Monitor, Facebook, Instagram, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecureContactInfo from "./SecureContactInfo";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
	const footerRef = useRef<HTMLElement>(null);
	const flowerRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const footerSections =
				footerRef.current?.querySelectorAll(".footer-section");

			if (footerSections) {
				gsap.fromTo(
					footerSections,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: footerRef.current,
							start: "top 90%",
							end: "bottom 10%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}

			// Social icons hover animation
			const socialIcons = footerRef.current?.querySelectorAll(".social-icon");
			socialIcons?.forEach((icon) => {
				const iconElement = icon as HTMLElement;

				iconElement.addEventListener("mouseenter", () => {
					gsap.to(iconElement, {
						scale: 1.2,
						rotation: 10,
						duration: 0.3,
						ease: "power2.out",
					});
				});

				iconElement.addEventListener("mouseleave", () => {
					gsap.to(iconElement, {
						scale: 1,
						rotation: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				});
			});
			// One-shot flower line draw
			if (flowerRef.current) {
				const p = flowerRef.current;
				const len = p.getTotalLength();
				gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
				gsap.to(p, {
					strokeDashoffset: 0,
					duration: 3.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 90%",
						once: true,
					},
				});
			}
		}, footerRef);

		return () => ctx.revert();
	}, []);

	return (
		<footer
			ref={footerRef}
			className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 text-white pt-20 pb-10 overflow-hidden"
		>
			{/* Decorative Elements */}
			<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-dust-400 via-sage-400 to-dusty-blue-400"></div>
			<div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-full opacity-10 blur-2xl"></div>
			<div className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full opacity-10 blur-3xl"></div>
			{/* One-shot flower line */}
			<svg
				className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-32 text-rose-dust-300/70"
				viewBox="0 0 120 100"
				fill="none"
				aria-hidden="true"
			>
				<path
					ref={flowerRef}
					d="M60 95 C60 70 40 55 42 38 C44 25 56 18 60 25 C64 18 76 25 78 38 C80 55 60 70 60 95 M60 40 C50 30 48 18 55 15 M60 40 C70 30 72 18 65 15"
					stroke="currentColor"
					strokeWidth={1.1}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			<div className="container mx-auto px-4 md:px-6 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
					<div className="footer-section">
						<div className="flex items-center gap-3 mb-8">
							<div className="p-2 bg-gradient-to-br from-rose-dust-400 to-rose-dust-500 rounded-2xl">
								<Heart className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-serif font-light">
								Psicóloga Montserrat Herbert
							</span>
						</div>
						<p className="text-gray-300 mb-8 leading-relaxed">
							<span className="font-medium text-rose-dust-300">Psicóloga clínica</span>{" "}
							con más de 6 años de experiencia acompañando a mujeres que han vivido
							violencia de género.{" "}
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="social-icon p-3 bg-gray-700 hover:bg-gradient-to-br hover:from-rose-dust-500 hover:to-rose-dust-600 rounded-2xl transition-all duration-300 hover:shadow-lg"
							>
								<Facebook size={20} />
							</a>
							<a
								href="#"
								className="social-icon p-3 bg-gray-700 hover:bg-gradient-to-br hover:from-sage-500 hover:to-sage-600 rounded-2xl transition-all duration-300 hover:shadow-lg"
							>
								<Instagram size={20} />
							</a>
							<a
								href="#"
								className="social-icon p-3 bg-gray-700 hover:bg-gradient-to-br hover:from-dusty-blue-500 hover:to-dusty-blue-600 rounded-2xl transition-all duration-300 hover:shadow-lg"
							>
								<Linkedin size={20} />
							</a>
						</div>
					</div>

					<div className="footer-section">
						<h3 className="text-xl font-serif font-light mb-8 text-rose-dust-300">
							Enlaces Rápidos
						</h3>
						<ul className="space-y-4">
							{[
								"Inicio",
								"Sobre Mí",
								"Enfoque",
								"Servicios",
								"Proceso",
								"Testimonios",
								"Contacto",
							].map((item) => (
								<li key={item}>
									<a
										href={`#${item.toLowerCase().replace(" ", "-")}`}
										className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
									>
										<span className="absolute inset-0 w-0 bg-gradient-to-r from-rose-dust-400 to-sage-400 rounded transition-all duration-300 group-hover:w-full opacity-10"></span>
										<span className="relative">{item}</span>
									</a>
								</li>
							))}
						</ul>
						<div className="mt-8 pt-6 border-t border-gray-700">
							<h4 className="text-lg font-serif font-light mb-4 text-sage-300">
								Más Información
							</h4>
							<ul className="space-y-3">
								<li>
									<a
										href="/preguntas-frecuentes"
										className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
									>
										Preguntas Frecuentes
									</a>
								</li>
								<li>
									<a
										href="/politicas-privacidad"
										className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
									>
										Políticas de Privacidad
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="footer-section">
						<h3 className="text-xl font-serif font-light mb-8 text-sage-300">
							Servicios de Psicología Online
						</h3>
						<ul className="space-y-4">
							{[
								"Terapia Individual por Videollamada",
								"Terapia de Pareja Online",
								"Tratamiento de Ansiedad Online",
								"Primera Consulta Psicológica Gratuita",
							].map((item) => (
								<li key={item}>
									<a
										href="#servicios"
										className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
										aria-label={`Más información sobre ${item}`}
									>
										<span className="absolute inset-0 w-0 bg-gradient-to-r from-sage-400 to-dusty-blue-400 rounded transition-all duration-300 group-hover:w-full opacity-10"></span>
										<span className="relative">{item}</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className="footer-section">
						<h3 className="text-xl font-serif font-light mb-8 text-dusty-blue-300">
							Contacto
						</h3>
						<div className="space-y-6">
							<div className="flex items-start gap-4 p-4 bg-gray-800 rounded-2xl border border-gray-700">
								<div className="p-2 bg-gradient-to-br from-dusty-blue-400 to-dusty-blue-500 rounded-xl">
									<Monitor className="w-5 h-5 text-white flex-shrink-0" />
								</div>
								<span className="text-gray-300">Consulta 100% Online</span>
							</div>
							<SecureContactInfo
								showEmail={true}
								showPhone={true}
								showWhatsApp={false}
								className="[&_.contact-item]:flex [&_.contact-item]:items-start [&_.contact-item]:gap-4 [&_.contact-item]:mb-4 [&_.contact-item]:p-4 [&_.contact-item]:bg-gray-800 [&_.contact-item]:rounded-2xl [&_.contact-item]:border [&_.contact-item]:border-gray-700 [&_h4]:hidden [&_p]:text-gray-300 [&_button]:text-rose-dust-300 [&_button:hover]:text-rose-dust-200 [&_.bg-teal-100]:bg-gradient-to-br [&_.bg-teal-100]:from-rose-dust-400 [&_.bg-teal-100]:to-rose-dust-500 [&_.text-teal-700]:text-white [&_.p-3]:p-2 [&_.rounded-full]:rounded-xl"
							/>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 pt-8">
					<div className="flex justify-center items-center">
						<p className="text-gray-400 text-center">
							&copy; {new Date().getFullYear()} EDC Solutions. Todos los derechos
							reservados.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
