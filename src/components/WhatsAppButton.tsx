import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { gsap } from "gsap";

const WhatsAppButton = () => {
	const buttonRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animación inicial del botón
			gsap.fromTo(
				buttonRef.current,
				{ scale: 0, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: "back.out(1.7)",
					delay: 2, // Aparece después de 2 segundos
				}
			);

			// Animación de pulso suave
			gsap.to(buttonRef.current, {
				scale: 1.1,
				duration: 1.5,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		}, buttonRef);

		return () => ctx.revert();
	}, []);

	const handleWhatsAppClick = () => {
		// Número de WhatsApp (reemplaza con el número real)
		const phoneNumber = "573001234567"; // Formato: código país + número sin espacios ni signos
		const message = encodeURIComponent(
			"Hola, me interesa agendar una consulta psicológica. ¿Podrías brindarme más información?"
		);
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

		window.open(whatsappUrl, "_blank");
	};

	return (
		<a
			ref={buttonRef}
			onClick={handleWhatsAppClick}
			className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
			aria-label="Contactar por WhatsApp"
		>
			<MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />

			{/* Tooltip */}
			<div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
				Chatea con nosotros
				<div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
			</div>
		</a>
	);
};

export default WhatsAppButton;
