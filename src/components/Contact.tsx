import { useState, useEffect, useRef } from "react";
import LayoutContainer from "./LayoutContainer";
import { Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecureContactInfo from "./SecureContactInfo";
import { getContactInfo, createWhatsAppLink } from "../utils/contactSecurity";
import Swal from "sweetalert2";
import React from "react";
// Edge Function endpoint and anon key from environment
const FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL;
const FUNCTION_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const contactInfoRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const decoRef1 = useRef<HTMLDivElement>(null);
	const decoRef2 = useRef<HTMLDivElement>(null);
	const petalsRef1 = useRef<SVGSVGElement>(null);
	const petalsRef2 = useRef<SVGSVGElement>(null);
	const typingRef = useRef<HTMLDivElement>(null);
	const shieldRef = useRef<HTMLDivElement>(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				[titleRef.current, subtitleRef.current],
				{ opacity: 0, y: 24 },
				{
					opacity: 1,
					y: 0,
					duration: 0.9,
					ease: "power3.out",
					stagger: 0.15,
					scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
				}
			);
			gsap.fromTo(
				contactInfoRef.current,
				{ opacity: 0, x: -40 },
				{
					opacity: 1,
					x: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: { trigger: contactInfoRef.current, start: "top 85%" },
				}
			);
			gsap.fromTo(
				formRef.current,
				{ opacity: 0, x: 40 },
				{
					opacity: 1,
					x: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: { trigger: formRef.current, start: "top 85%" },
				}
			);
			// Subtle floating / parallax animations (similar style inspiration)
			if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				const floatCfg = {
					y: 18,
					duration: 6,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				};
				if (decoRef1.current) gsap.to(decoRef1.current, floatCfg);
				if (decoRef2.current)
					gsap.to(decoRef2.current, {
						...floatCfg,
						y: -22,
						duration: 7.5,
						delay: 0.6,
					});
				if (petalsRef1.current)
					gsap.to(petalsRef1.current, {
						rotate: 15,
						duration: 24,
						ease: "none",
						repeat: -1,
						yoyo: true,
					});
				if (petalsRef2.current)
					gsap.to(petalsRef2.current, {
						rotate: -18,
						duration: 28,
						ease: "none",
						repeat: -1,
						yoyo: true,
					});

				// Scroll parallax (very light)
				[decoRef1, decoRef2, petalsRef1, petalsRef2].forEach((r, i) => {
					if (!r.current) return;
					gsap.to(r.current, {
						yPercent: i % 2 === 0 ? 6 : -5,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.5,
						},
					});
				});

				// Typing dots animation
				if (typingRef.current) {
					const dots = typingRef.current.querySelectorAll(".typing-dot");
					gsap.set(dots, { y: 0, opacity: 0.4 });
					gsap.to(dots, {
						y: -6,
						opacity: 1,
						repeat: -1,
						yoyo: true,
						duration: 0.6,
						stagger: 0.15,
						ease: "sine.inOut",
					});
				}

				// Shield breathing
				if (shieldRef.current) {
					gsap.to(shieldRef.current, {
						scale: 1.05,
						repeat: -1,
						yoyo: true,
						duration: 4.5,
						ease: "sine.inOut",
					});
				}
			}
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const RATE_LIMIT_KEY = "contact_last_sent";
	const RATE_LIMIT_MS = 5 * 60 * 1000;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validación básica antes de procesar
		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.message.trim()
		) {
			await Swal.fire({
				icon: "warning",
				title: "Campos requeridos",
				text: "Por favor completa todos los campos obligatorios.",
				confirmButtonText: "Entendido",
				confirmButtonColor: "#f43f5e",
				background: "#fefefe",
				color: "#374151",
				showClass: {
					popup: "animate__animated animate__fadeInUp animate__faster",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutDown animate__faster",
				},
			});
			return;
		}

		const lastSent = localStorage.getItem(RATE_LIMIT_KEY);
		const now = Date.now();

		// Enforce rate limit: only one submission per 5 minutes
		if (lastSent && now - parseInt(lastSent) < RATE_LIMIT_MS) {
			await Swal.fire({
				icon: "warning",
				title: "Espera un momento",
				text: "Solo puedes enviar un mensaje cada 5 minutos desde este navegador.",
				confirmButtonText: "Entendido",
				confirmButtonColor: "#f43f5e",
				background: "#fefefe",
				color: "#374151",
				showClass: {
					popup: "animate__animated animate__fadeInUp animate__faster",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutDown animate__faster",
				},
			});
			return;
		}

		// Mostrar loading
		setIsSubmitting(true);
		Swal.fire({
			title: "Enviando mensaje...",
			text: "Por favor espera mientras procesamos tu solicitud",
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			background: "#fefefe",
			color: "#374151",
			showClass: {
				popup: "animate__animated animate__fadeInUp animate__faster",
			},
			didOpen: () => {
				Swal.showLoading();
			},
		});

		// Debug log start of submission
		console.log("handleSubmit invoked, data:", formData);

		try {
			// Send data to Edge Function via HTTP POST
			const response = await fetch(FUNCTION_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					apikey: FUNCTION_KEY,
					Authorization: `Bearer ${FUNCTION_KEY}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.message || `Error ${response.status}`);
			}

			const result = await response.json().catch(() => null);
			console.log("Edge Function response:", result);

			// Obtener información de contacto para personalizar mensaje
			const contactInfo = await getContactInfo();

			// Éxito - mostrar mensaje elegante
			await Swal.fire({
				icon: "success",
				title: "¡Mensaje enviado correctamente!",
				html: `
					<div style="text-align: center;">
						<p class="text-gray-600 mb-4">Gracias por contactarme, <strong>${formData.name}</strong>.</p>
						<p class="text-gray-600">Te responderé a la brevedad en <strong>${formData.email}</strong></p>
						<p class="text-sm text-gray-500 mt-4">- ${contactInfo.doctorName}</p>
					</div>
				`,
				confirmButtonText: "Perfecto",
				confirmButtonColor: "#10b981",
				background: "#fefefe",
				color: "#374151",
				showClass: {
					popup: "animate__animated animate__fadeInUp animate__faster",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutDown animate__faster",
				},
				timer: 5000,
				timerProgressBar: true,
			});

			// Limpiar formulario y guardar timestamp
			setFormData({ name: "", email: "", phone: "", message: "" });
			localStorage.setItem(RATE_LIMIT_KEY, now.toString());
		} catch (err) {
			console.error("Error sending contact form:", err);

			// Error - mostrar mensaje de error elegante
			await Swal.fire({
				icon: "error",
				title: "Error al enviar mensaje",
				html: `
					<div style="text-align: center;">
						<p class="text-gray-600 mb-4">Hubo un problema al enviar tu mensaje.</p>
						<p class="text-gray-600">Por favor, intenta nuevamente o contáctame directamente por WhatsApp.</p>
					</div>
				`,
				confirmButtonText: "Intentar de nuevo",
				confirmButtonColor: "#ef4444",
				background: "#fefefe",
				color: "#374151",
				showCancelButton: true,
				cancelButtonText: "Contactar por WhatsApp",
				cancelButtonColor: "#22c55e",
				showClass: {
					popup: "animate__animated animate__fadeInUp animate__faster",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutDown animate__faster",
				},
			}).then(async (result) => {
				if (result.dismiss === Swal.DismissReason.cancel) {
					// Abrir WhatsApp con información dinámica
					const message = `Hola, me interesa obtener más información sobre los servicios de psicología online. Mi nombre es ${
						formData.name || "[Nombre]"
					}.`;
					const whatsappLink = await createWhatsAppLink(message);
					window.open(whatsappLink, "_blank");
				}
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			ref={sectionRef}
			id="contacto"
			className="relative min-h-screen flex items-center py-20 md:py-32 bg-gradient-to-br from-rose-dust-50 via-cream-50 to-sage-50 overflow-hidden"
		>
			{/* Minimal floral accent background (animated) */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
				{/* Soft radial tints */}
				<div
					ref={decoRef1}
					className="absolute -top-32 -left-24 w-96 h-96 bg-rose-dust-200/35 rounded-full blur-3xl will-change-transform"
				/>
				<div
					ref={decoRef2}
					className="absolute bottom-[-140px] right-[-100px] w-96 h-96 bg-sage-300/30 rounded-full blur-3xl will-change-transform"
				/>

				{/* Petal motifs */}
				<svg
					ref={petalsRef1}
					className="hidden md:block absolute -top-24 -left-20 w-[300px] h-[300px] text-rose-dust-400/55 will-change-transform"
					viewBox="0 0 200 200"
					fill="none"
					aria-hidden="true"
				>
					<circle
						cx="100"
						cy="100"
						r="72"
						stroke="currentColor"
						strokeWidth="0.7"
						strokeDasharray="5 10"
					/>
					{[0, 45, 90, 135].map((a) => (
						<path
							key={a}
							d="M100 48c11 15 11 30 0 45c-11-15-11-30 0-45Z"
							stroke="currentColor"
							strokeWidth="0.6"
							fill="currentColor"
							className="opacity-25"
							transform={`rotate(${a} 100 100)`}
						/>
					))}
				</svg>
				<svg
					ref={petalsRef2}
					className="hidden md:block absolute bottom-[-70px] right-[-40px] w-[260px] h-[260px] text-sage-500/50 will-change-transform"
					viewBox="0 0 200 200"
					fill="none"
					aria-hidden="true"
				>
					<circle
						cx="100"
						cy="100"
						r="58"
						stroke="currentColor"
						strokeWidth="0.55"
						strokeDasharray="4 9"
					/>
					{[0, 60, 120].map((a) => (
						<path
							key={a}
							d="M100 60c9 12 9 24 0 36c-9-12-9-24 0-36Z"
							stroke="currentColor"
							strokeWidth="0.5"
							fill="currentColor"
							className="opacity-20"
							transform={`rotate(${a} 100 100)`}
						/>
					))}
				</svg>
			</div>

			<LayoutContainer className="relative z-10 w-full">
				<div className="text-center mb-16 md:mb-20">
					<h2
						ref={titleRef}
						className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-6 leading-tight"
					>
						Contacto
					</h2>
					<div className="w-16 h-0.5 bg-gradient-to-r from-rose-dust-400 to-sage-400 mx-auto mb-8" />
					<p
						ref={subtitleRef}
						className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
					>
						Estoy aquí para ayudarte. Contáctame para programar una{" "}
						<span className="font-medium text-rose-dust-700">
							sesión de psicología online
						</span>{" "}
						o resolver cualquier duda que tengas sobre{" "}
						<em>terapia por videollamada</em>.
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto lg:items-stretch">
					<div className="lg:w-1/3 flex">
						<div
							ref={contactInfoRef}
							className="card-modern group h-full hover:shadow-2xl transition-all duration-500 flex flex-col"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-dusty-blue-50 rounded-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
							<div className="relative z-10 flex flex-col h-full">
								<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-8">
									Información de Contacto
								</h3>
								<div className="space-y-6 md:space-y-8">
									<SecureContactInfo
										showEmail={true}
										showPhone={true}
										showWhatsApp={true}
										className="[&_.contact-item]:flex [&_.contact-item]:items-start [&_.contact-item]:gap-4 [&_.contact-item]:mb-6 [&_.contact-item]:p-5 [&_.contact-item]:bg-gradient-to-br [&_.contact-item]:from-white [&_.contact-item]:to-gray-50 [&_.contact-item]:rounded-2xl [&_.contact-item]:border [&_.contact-item]:border-gray-200 [&_.contact-item]:shadow-sm [&_.contact-item:hover]:shadow-md [&_.contact-item]:transition-all [&_.contact-item]:duration-300 [&_h4]:text-gray-800 [&_h4]:font-medium [&_h4]:text-lg [&_h4]:mb-2 [&_p]:text-gray-600 [&_button]:text-rose-dust-600 [&_button:hover]:text-rose-dust-700 [&_button]:font-medium [&_button]:transition-colors [&_.bg-teal-100]:bg-gradient-to-br [&_.bg-teal-100]:from-rose-dust-100 [&_.bg-teal-100]:to-rose-dust-200 [&_.text-teal-700]:text-rose-dust-700 [&_.p-3]:p-3 [&_.rounded-full]:rounded-2xl"
									/>
									{/* Typing dots decorative */}
								</div>
								<div className="contact-item mt-8 md:mt-10 p-6 rounded-2xl bg-gradient-to-br from-sage-100 to-dusty-blue-100 border border-sage-200 mt-auto relative">
									<h4 className="font-medium text-gray-800 mb-4 text-lg">
										Horario de Atención
									</h4>
									<ul className="space-y-3 text-gray-600">
										<li className="flex justify-between items-center py-1">
											<span>Lunes - Viernes:</span>
											<span className="font-medium">9:00 - 20:00</span>
										</li>
										<li className="flex justify-between items-center py-1">
											<span>Sábados:</span>
											<span className="font-medium">10:00 - 14:00</span>
										</li>
										<li className="flex justify-between items-center py-1">
											<span>Domingos:</span>
											<span className="font-medium text-gray-500">Cerrado</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:w-2/3 flex">
						<div
							ref={formRef}
							className="card-modern group hover:shadow-2xl transition-all duration-500 flex flex-col"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-rose-dust-50 to-cream-50 rounded-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
							<div className="relative z-10 flex flex-col h-full">
								<h3 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-8">
									Solicita tu Consulta de Psicología Online
								</h3>
								<form
									onSubmit={handleSubmit}
									className="space-y-6 md:space-y-8 flex flex-col h-full"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
										<div className="form-field">
											<label
												htmlFor="name"
												className="block text-gray-700 mb-3 font-medium"
											>
												Nombre completo <span className="text-rose-dust-500">*</span>
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-dust-400 focus:border-rose-dust-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg"
												placeholder="Tu nombre"
											/>
										</div>
										<div className="form-field">
											<label
												htmlFor="email"
												className="block text-gray-700 mb-3 font-medium"
											>
												Email <span className="text-rose-dust-500">*</span>
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-dust-400 focus:border-rose-dust-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg"
												placeholder="tu.email@ejemplo.com"
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
										<div className="form-field md:col-span-2">
											<label
												htmlFor="phone"
												className="block text-gray-700 mb-3 font-medium"
											>
												Teléfono
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-dust-400 focus:border-rose-dust-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg"
												placeholder="+52 XXX XXX XXX"
											/>
										</div>
									</div>
									<div className="form-field flex-1 flex flex-col">
										<label
											htmlFor="message"
											className="block text-gray-700 mb-3 font-medium"
										>
											Mensaje <span className="text-rose-dust-500">*</span>
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={5}
											className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-dust-400 focus:border-rose-dust-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-lg resize-none flex-1 min-h-[200px]"
											placeholder="¿En qué puedo ayudarte?"
										/>
									</div>
									<div className="form-field flex items-start gap-3">
										<input
											type="checkbox"
											id="privacy"
											required
											className="w-5 h-5 text-rose-dust-600 border-gray-300 rounded focus:ring-rose-dust-500 mt-1"
										/>
										<label htmlFor="privacy" className="text-gray-600 leading-relaxed">
											Acepto la{" "}
											<a
												href="/politicas-privacidad"
												className="text-rose-dust-600 hover:underline"
											>
												política de privacidad
											</a>{" "}
											y el tratamiento de mis datos.
										</label>
									</div>
									{/* Honeypot field for bot protection */}
									<input
										type="text"
										name="website"
										style={{ position: "absolute", left: "-9999px", opacity: 0 }}
										tabIndex={-1}
										autoComplete="off"
										onChange={() => {}}
									/>
									<button
										type="submit"
										disabled={isSubmitting}
										className={`btn-primary w-full md:w-auto inline-flex items-center justify-center gap-3 text-lg px-8 py-4 transition-all duration-300 ${
											isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
										}`}
									>
										{isSubmitting ? (
											<>
												<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
												Enviando...
											</>
										) : (
											<>
												Solicitar Consulta Online <Send size={20} />
											</>
										)}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</LayoutContainer>
		</section>
	);
};

export default Contact;
