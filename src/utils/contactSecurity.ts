// Utility functions to protect sensitive contact information from scraping

// Simple encoding function to obfuscate data
const encode = (str: string): string => {
  return btoa(str).split('').reverse().join('');
};

// Decoding function
const decode = (encoded: string): string => {
  return atob(encoded.split('').reverse().join(''));
};

// Encoded contact information (base64 reversed)
const ENCODED_DATA = {
  // contacto@montserratpsicologia.com
  email: 'bW9jLmFpZ29sb2Npc3RhcnJlc3Rub21AdG9hdGNub2M='.split('').reverse().join(''),
  // +52 687 123 456
  phone: 'NjU0IDMyMSA3ODYgMjUr'.split('').reverse().join(''),
  // +52687123456 (for WhatsApp)
  whatsappNumber: 'NjU0MzIxNzg2MjUr'.split('').reverse().join(''),
  // Montserrat Herbert
  doctorName: 'dHJlYmVIIHRhcnJlc3Rub00='.split('').reverse().join(''),
  // contacto@montserratpsicologia.com (for display)
  displayEmail: 'bW9jLmFpZ29sb2Npc3RhcnJlc3Rub21AdG9hdGNub2M='.split('').reverse().join('')
};

// Function to get decoded contact information
export const getContactInfo = () => {
  // Add random delay to make scraping harder
  const delay = Math.random() * 100;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: decode(ENCODED_DATA.email),
        phone: decode(ENCODED_DATA.phone),
        whatsappNumber: decode(ENCODED_DATA.whatsappNumber),
        doctorName: decode(ENCODED_DATA.doctorName),
        displayEmail: decode(ENCODED_DATA.displayEmail)
      });
    }, delay);
  });
};

// Function to create mailto link securely
export const createMailtoLink = async (subject?: string, body?: string) => {
  const contactInfo = await getContactInfo() as any;
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${contactInfo.email}${queryString ? '?' + queryString : ''}`;
};

// Function to create WhatsApp link securely
export const createWhatsAppLink = async (message?: string) => {
  const contactInfo = await getContactInfo() as any;
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${contactInfo.whatsappNumber}${encodedMessage ? '?text=' + encodedMessage : ''}`;
};

// Function to create tel link securely
export const createTelLink = async () => {
  const contactInfo = await getContactInfo() as any;
  return `tel:${contactInfo.phone}`;
};

// Component hook for secure contact display
export const useSecureContact = () => {
  const [contactInfo, setContactInfo] = React.useState<any>(null);
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
      'fake@example.com',
      '+1 555 000 0000',
      'spam@test.com',
      '+99 999 999 999'
    ];

    honeypots.forEach((fake, index) => {
      const element = document.createElement('span');
      element.textContent = fake;
      element.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none;';
      element.className = 'honeypot-contact';
      document.body.appendChild(element);
    });
  };

  return {
    disableContextMenu,
    disableSelection,
    addHoneypots
  };
};