import React, { useEffect, useRef } from "react";
import LayoutContainer from "../components/LayoutContainer";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"; // HelpCircle used inside link
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [openItems, setOpenItems] = React.useState<number[]>([]);
	const helpIconRef = useRef<SVGSVGElement>(null);

	// Inline data constant (kept inside component so fast refresh keeps component-only export)
	const faqs = [
		{
			question: "¿Cómo funciona la terapia online?",
			answer:
				"La terapia online se realiza a través de videollamadas seguras desde la comodidad de tu hogar. Utilizamos plataformas encriptadas que garantizan la confidencialidad. Solo necesitas una conexión a internet estable, un dispositivo con cámara y micrófono, y un espacio privado donde te sientas cómoda.",
		},
		{
			question: "¿Es tan efectiva como la terapia presencial?",
			answer:
				"Sí, múltiples estudios han demostrado que la terapia online es tan efectiva como la presencial para la mayoría de las condiciones psicológicas. La clave está en crear un vínculo terapéutico sólido, lo cual es perfectamente posible a través de la pantalla cuando hay compromiso mutuo.",
		},
		{
			question: "¿Cuánto dura una sesión?",
			answer:
				"Cada sesión tiene una duración de 50-60 minutos. Este tiempo nos permite profundizar en los temas importantes sin que se vuelva agotador. La frecuencia inicial suele ser semanal, aunque puede ajustarse según tus necesidades y progreso.",
		},
		{
			question: "¿Cuánto tiempo dura el proceso terapéutico?",
			answer:
				"No hay una respuesta única, ya que cada proceso es diferente. Algunas personas notan cambios significativos en pocas sesiones, mientras que otras necesitan un acompañamiento más prolongado. Lo importante es que avancemos a tu ritmo, sin presiones ni expectativas rígidas.",
		},
		{
			question: "¿Qué pasa si no me siento cómoda con la terapia online?",
			answer:
				"Es completamente normal tener dudas al principio. Durante las primeras sesiones evaluaremos juntas si esta modalidad funciona para ti. Si sientes que necesitas algo diferente, podemos explorar otras opciones o hacer ajustes para que te sientas más cómoda.",
		},
		{
			question: "¿Cómo se garantiza la confidencialidad?",
			answer:
				"Utilizo plataformas seguras con encriptación de extremo a extremo. Toda la información compartida está protegida por el secreto profesional. No se graban las sesiones y todos tus datos personales se manejan con estricta confidencialidad según las normativas de protección de datos.",
		},
		{
			question: "¿Qué necesito para las sesiones online?",
			answer:
				"Solo necesitas: un dispositivo con cámara y micrófono (computadora, tablet o teléfono), conexión a internet estable, un espacio privado donde no seas interrumpida, y auriculares para mejor calidad de audio y privacidad.",
		},
		{
			question: "¿Trabajas con seguros médicos?",
			answer:
				"Actualmente trabajo de forma privada, por lo que el pago es directo. Sin embargo, puedo proporcionarte la documentación necesaria para que puedas solicitar reembolso a tu seguro médico si tu póliza cubre servicios de salud mental.",
		},
		{
			question: "¿Qué pasa si tengo una crisis entre sesiones?",
			answer:
				"Si experimentas una crisis emocional intensa, puedes contactarme por WhatsApp o email. Evaluaremos la situación y, si es necesario, programaremos una sesión de emergencia. También te proporcionaré recursos y estrategias de contención para estos momentos.",
		},
		{
			question: "¿Puedo cancelar o reprogramar una sesión?",
			answer:
				"Sí, entiendo que pueden surgir imprevistos. Te pido que me avises con al menos 24 horas de anticipación para poder reprogramar sin costo. Las cancelaciones con menos tiempo pueden tener un costo, salvo en casos de emergencia.",
		},
		{
			question: "¿Cómo sé si necesito terapia?",
			answer:
				"Si sientes que algo te duele, te pesa o te confunde, ya es motivo suficiente para buscar ayuda. No necesitas estar en crisis para ir a terapia. Es un espacio para crecer, entenderte mejor y desarrollar herramientas para una vida más plena.",
		},
		{
			question: "¿Trabajas solo con mujeres?",
			answer:
				"Sí, mi práctica está especializada en el acompañamiento terapéutico a mujeres adultas. Esta especialización me permite ofrecer un enfoque más específico y sensible a las experiencias particulares que vivimos las mujeres en nuestra sociedad.",
		},
	];

	useEffect(() => {
		// Scroll to top when page loads
		window.scrollTo({ top: 0, behavior: "auto" });

		const ctx = gsap.context(() => {
			// Page entrance animation
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
			);

			// FAQ items animation
			const faqItems = pageRef.current?.querySelectorAll(".faq-item");
			if (faqItems) {
				gsap.fromTo(
					faqItems,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: "power3.out",
						delay: 0.5,
					}
				);
			}
			// Draw animation for help icon once
			if (helpIconRef.current) {
				const strokes = helpIconRef.current.querySelectorAll("path, circle, line");
				if (strokes.length) {
					strokes.forEach((el) => {
						const length = (el as SVGGeometryElement).getTotalLength?.() || 60;
						gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
					});
					gsap.to(strokes, {
						strokeDashoffset: 0,
						duration: 2.4,
						stagger: 0.1,
						ease: "power2.out",
						delay: 0.2,
						once: true,
					});
				}
			}
		}, pageRef);

		return () => ctx.revert();
	}, []);

	const toggleItem = (index: number) => {
		setOpenItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div
			ref={pageRef}
			className="pt-20 md:pt-28 pb-16 md:pb-24 min-h-screen bg-white overflow-hidden"
		>
			<LayoutContainer>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<div className="flex items-center justify-center gap-3 mb-6">
							<svg
								ref={helpIconRef}
								className="w-8 h-8 text-teal-600"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<path d="M9.09 9a3 3 0 1 1 5.83 1c-.33 1-.98 1.5-1.66 2.05C12.58 12.98 12 13.5 12 15" />
								<line x1="12" y1="17" x2="12" y2="17" />
							</svg>
							<h1
								ref={titleRef}
								className="text-3xl md:text-4xl font-serif font-bold text-gray-800"
							>
								Preguntas Frecuentes
							</h1>
						</div>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Aquí encontrarás respuestas a las dudas más comunes sobre la{" "}
							<strong>terapia psicológica online</strong>. Si tienes alguna pregunta
							específica que no aparece aquí, no dudes en contactarme.
						</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="faq-item bg-slate-50 rounded-xl shadow-sm overflow-hidden"
							>
								<button
									onClick={() => toggleItem(index)}
									className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors duration-200"
								>
									<h3 className="text-lg font-medium text-gray-800 pr-4">
										{faq.question}
									</h3>
									{openItems.includes(index) ? (
										<ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
									) : (
										<ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
									)}
								</button>

								{openItems.includes(index) && (
									<div className="px-6 pb-4">
										<div className="border-t border-gray-200 pt-4">
											<p className="text-gray-700 leading-relaxed">{faq.answer}</p>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					<div className="mt-12 text-center">
						<div className="bg-teal-50 rounded-xl p-6 md:p-8">
							<h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
								¿Tienes más preguntas?
							</h3>
							<p className="text-gray-700 mb-6">
								Si no encontraste la respuesta que buscabas, estaré encantada de
								resolver tus dudas personalmente.
							</p>
							<a
								href="/#contacto"
								className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
							>
								Contactar ahora
								<HelpCircle size={18} />
							</a>
						</div>
					</div>
				</div>
			</LayoutContainer>
		</div>
	);
};

// eslint-disable-next-line
export default FAQ;
