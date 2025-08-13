// Utility functions to protect sensitive contact information from scraping
import React from "react";

interface ContactInfo {
	email: string;
	phone: string;
	whatsappNumber: string;
	doctorName: string;
	displayEmail: string;
}

// Advanced encoding function (Base64 + XOR + Reverse)
const advancedEncode = (str: string): string => {
	const key = "psico2024"; // Simple XOR key
	let encoded = "";

	// XOR encoding
	for (let i = 0; i < str.length; i++) {
		encoded += String.fromCharCode(
			str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
		);
	}

	// Base64 encode and reverse
	return btoa(encoded).split("").reverse().join("");
};

// Advanced decoding function
const advancedDecode = (encoded: string): string => {
	const key = "psico2024";

	// Reverse and decode Base64
	const reversed = encoded.split("").reverse().join("");
	const decoded = atob(reversed);

	// XOR decode
	let result = "";
	for (let i = 0; i < decoded.length; i++) {
		result += String.fromCharCode(
			decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
		);
	}

	return result;
};

// Get contact data from environment variables and encode them
const getEncodedContactData = () => {
	const rawData = {
		email: import.meta.env.VITE_CONTACT_EMAIL || "contacto@ejemplo.com",
		phone: import.meta.env.VITE_CONTACT_PHONE || "+52 1 555 000 0000",
		whatsappNumber: import.meta.env.VITE_CONTACT_WHATSAPP || "5215550000000",
		doctorName: import.meta.env.VITE_DOCTOR_NAME || "Doctora",
		displayEmail: import.meta.env.VITE_DISPLAY_EMAIL || "info@ejemplo.com",
	};

	// Encode all data for security
	return {
		email: advancedEncode(rawData.email),
		phone: advancedEncode(rawData.phone),
		whatsappNumber: advancedEncode(rawData.whatsappNumber),
		doctorName: advancedEncode(rawData.doctorName),
		displayEmail: advancedEncode(rawData.displayEmail),
	};
};

// Function to get decoded contact information
export const getContactInfo = (): Promise<ContactInfo> => {
	// Add random delay to make scraping harder
	const delay = Math.random() * 100;

	return new Promise((resolve) => {
		setTimeout(() => {
			const encodedData = getEncodedContactData();
			resolve({
				email: advancedDecode(encodedData.email),
				phone: advancedDecode(encodedData.phone),
				whatsappNumber: advancedDecode(encodedData.whatsappNumber),
				doctorName: advancedDecode(encodedData.doctorName),
				displayEmail: advancedDecode(encodedData.displayEmail),
			});
		}, delay);
	});
};

// Function to create mailto link securely
export const createMailtoLink = async (
	subject?: string,
	body?: string
): Promise<string> => {
	const contactInfo = await getContactInfo();
	const params = new URLSearchParams();

	if (subject) params.append("subject", subject);
	if (body) params.append("body", body);

	const queryString = params.toString();
	return `mailto:${contactInfo.email}${queryString ? "?" + queryString : ""}`;
};

// Function to create WhatsApp link securely
export const createWhatsAppLink = async (message?: string): Promise<string> => {
	const contactInfo = await getContactInfo();
	const encodedMessage = message ? encodeURIComponent(message) : "";
	return `https://wa.me/${contactInfo.whatsappNumber}${
		encodedMessage ? "?text=" + encodedMessage : ""
	}`;
};

// Function to create tel link securely
export const createTelLink = async (): Promise<string> => {
	const contactInfo = await getContactInfo();
	return `tel:${contactInfo.phone}`;
};

// Component hook for secure contact display
export const useSecureContact = () => {
	const [contactInfo, setContactInfo] = React.useState<ContactInfo | null>(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		getContactInfo().then((info) => {
			setContactInfo(info);
			setLoading(false);
		});
	}, []);

	return { contactInfo, loading };
};

// Anti-scraping measures
export const addAntiScrapingMeasures = () => {
	// Disable right-click context menu on contact elements
	const disableContextMenu = (e: Event) => {
		e.preventDefault();
		return false;
	};

	// Disable text selection on contact elements
	const disableSelection = () => {
		document.onselectstart = () => false;
		document.onmousedown = () => false;
	};

	// Add invisible honeypot elements to confuse scrapers
	const addHoneypots = () => {
		const honeypots = [
			"fake@example.com",
			"+1 555 000 0000",
			"spam@test.com",
			"+99 999 999 999",
		];

		honeypots.forEach((fake) => {
			const element = document.createElement("span");
			element.textContent = fake;
			element.style.cssText =
				"position:absolute;left:-9999px;opacity:0;pointer-events:none;";
			element.className = "honeypot-contact";
			document.body.appendChild(element);
		});
	};

	return {
		disableContextMenu,
		disableSelection,
		addHoneypots,
	};
};
