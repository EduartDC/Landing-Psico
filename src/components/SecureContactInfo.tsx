import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import {
	getContactInfo,
	createMailtoLink,
	createWhatsAppLink,
	createTelLink,
} from "../utils/contactSecurity";

interface ContactInfo {
	email: string;
	phone: string;
	whatsappNumber: string;
	doctorName: string;
	displayEmail: string;
}

interface SecureContactInfoProps {
	showEmail?: boolean;
	showPhone?: boolean;
	showWhatsApp?: boolean;
	className?: string;
}

const SecureContactInfo: React.FC<SecureContactInfoProps> = ({
	showEmail = true,
	showPhone = true,
	showWhatsApp = true,
	className = "",
}) => {
	const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Load contact info with delay to prevent immediate scraping
		const timer = setTimeout(() => {
			getContactInfo().then((info) => {
				setContactInfo(info as ContactInfo);
				setLoading(false);
			});
		}, Math.random() * 200 + 100); // Random delay between 100-300ms

		return () => clearTimeout(timer);
	}, []);

	const handleEmailClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (contactInfo) {
			const mailtoLink = await createMailtoLink(
				"Consulta de Psicología Online - Interés en Servicios",
				"Hola Dra. Montserrat,\n\nMe gustaría obtener más información sobre sus servicios de psicología online.\n\nPodrían proporcionarme detalles sobre:\n- Disponibilidad de citas\n- Modalidades de terapia\n- Precios y formas de pago\n\nQuedo a la espera de su respuesta.\n\nSaludos cordiales."
			);
			window.location.href = mailtoLink;
		}
	};

	const handlePhoneClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (contactInfo) {
			const telLink = await createTelLink();
			window.location.href = telLink;
		}
	};

	const handleWhatsAppClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (contactInfo) {
			const whatsappLink = await createWhatsAppLink(
				"¡Hola! Me interesa conocer más sobre sus servicios de psicología online. ¿Podría proporcionarme información sobre disponibilidad y modalidades de consulta? Gracias."
			);
			window.open(whatsappLink, "_blank");
		}
	};

	if (loading) {
		return (
			<div className={`animate-pulse ${className}`}>
				<div className="space-y-4">
					{showPhone && (
						<div className="flex items-start gap-4">
							<div className="bg-teal-100 p-3 rounded-full">
								<Phone className="w-5 h-5 text-teal-700" />
							</div>
							<div>
								<div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-32"></div>
							</div>
						</div>
					)}
					{showEmail && (
						<div className="flex items-start gap-4">
							<div className="bg-teal-100 p-3 rounded-full">
								<Mail className="w-5 h-5 text-teal-700" />
							</div>
							<div>
								<div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-40"></div>
							</div>
						</div>
					)}
					{showWhatsApp && (
						<div className="flex items-start gap-4">
							<div className="bg-teal-100 p-3 rounded-full">
								<MessageSquare className="w-5 h-5 text-teal-700" />
							</div>
							<div>
								<div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-28"></div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}

	if (!contactInfo) return null;

	return (
		<div className={className}>
			<div className="space-y-6">
				{showPhone && (
					<div className="contact-item flex items-start gap-4">
						<div className="bg-teal-100 p-3 rounded-full">
							<Phone className="w-5 h-5 text-teal-700" />
						</div>
						<div>
							<h4 className="font-medium text-gray-800">Teléfono</h4>
							<button
								onClick={handlePhoneClick}
								className="text-gray-600 hover:text-teal-600 transition-colors"
								onContextMenu={(e) => e.preventDefault()}
							>
								{contactInfo.phone}
							</button>
							<p className="text-sm text-gray-500 mt-1">
								Lunes a Viernes, 9:00 - 20:00
							</p>
						</div>
					</div>
				)}

				{showEmail && (
					<div className="contact-item flex items-start gap-4">
						<div className="bg-teal-100 p-3 rounded-full">
							<Mail className="w-5 h-5 text-teal-700" />
						</div>
						<div>
							<h4 className="font-medium text-gray-800">Email</h4>
							<button
								onClick={handleEmailClick}
								className="text-gray-600 hover:text-teal-600 transition-colors"
								onContextMenu={(e) => e.preventDefault()}
							>
								{contactInfo.displayEmail}
							</button>
							<p className="text-sm text-gray-500 mt-1">Respuesta en 24-48 horas</p>
						</div>
					</div>
				)}

				{showWhatsApp && (
					<div className="contact-item flex items-start gap-4">
						<div className="bg-teal-100 p-3 rounded-full">
							<MessageSquare className="w-5 h-5 text-teal-700" />
						</div>
						<div>
							<h4 className="font-medium text-gray-800">WhatsApp</h4>
							<button
								onClick={handleWhatsAppClick}
								className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
								onContextMenu={(e) => e.preventDefault()}
							>
								Enviar mensaje →
							</button>
							<p className="text-sm text-gray-500 mt-1">Respuesta rápida</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SecureContactInfo;
