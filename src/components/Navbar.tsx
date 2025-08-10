import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Flower2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
	console.log("Navbar component rendering");

	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const navRef = useRef<HTMLElement>(null);
	const location = useLocation();
	const navigate = useNavigate();

	// Navigation items configuration
	const navItems = [
		{ name: "Inicio", type: "home" },
		{ name: "Sobre Mí", type: "section", id: "sobre-mí" },
		{ name: "Enfoque", type: "section", id: "enfoque" },
		{ name: "Proceso", type: "section", id: "proceso" },
		{ name: "Testimonios", type: "section", id: "testimonios" },
		{ name: "FAQ", type: "page", route: "/preguntas-frecuentes" },
		{ name: "Privacidad", type: "page", route: "/politicas-privacidad" },
	];

	const contactButton = { name: "Contacto", type: "section", id: "contacto" };

	// Scroll detection
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Navbar entrance animation
	useEffect(() => {
		gsap.fromTo(
			navRef.current,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
		);
	}, []);

	// Mobile menu toggle
	const toggleMenu = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			gsap.fromTo(
				".mobile-menu-item",
				{ opacity: 0, y: -20 },
				{ opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }
			);
		}
	};

	// Smooth scroll to top (for Hero/Inicio)
	const smoothScrollToTop = () => {
		// Close mobile menu
		setIsOpen(false);

		// Simple but effective scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		// Refresh ScrollTrigger after animation
		setTimeout(() => {
			ScrollTrigger.refresh();
		}, 1000);
	};

	// Navigation to different pages
	const navigateToPage = (route: string) => {
		// Immediately scroll to top
		window.scrollTo({ top: 0, behavior: "auto" });

		// Then navigate to the page
		navigate(route);
		setIsOpen(false);
	};

	// Smooth scroll to specific section
	const scrollToSection = useCallback(
		(sectionId: string) => {
			console.log("scrollToSection called with:", sectionId);

			// Close mobile menu
			setIsOpen(false);

			// If not on home page, navigate to home with hash
			if (location.pathname !== "/") {
				console.log("Not on home page, navigating to /#" + sectionId);
				navigate(`/#${sectionId}`);
				return;
			}

			// Find element and scroll to it
			const element = document.getElementById(sectionId);
			console.log("Element found:", element);

			if (!element) {
				console.log(`Element with id "${sectionId}" not found`);
				return;
			}

			const navHeight = navRef.current?.offsetHeight || 80;
			const elementRect = element.getBoundingClientRect();
			const absoluteTop = elementRect.top + window.scrollY;
			const targetPosition = Math.max(0, absoluteTop - navHeight - 20);

			console.log("Scroll details:", {
				navHeight,
				elementRect,
				absoluteTop,
				targetPosition,
				currentScrollY: window.scrollY,
			});

			// Smooth scroll to target position
			window.scrollTo({
				top: targetPosition,
				behavior: "smooth",
			});

			// Refresh ScrollTrigger and restart animations
			setTimeout(() => {
				ScrollTrigger.refresh();
				console.log("ScrollTrigger refreshed");

				// Restart animations for the target section
				const triggers = ScrollTrigger.getAll();
				triggers.forEach((trigger) => {
					if (trigger.trigger && trigger.trigger.closest) {
						const section = trigger.trigger.closest("section");
						if (section && section.id === sectionId && trigger.animation) {
							trigger.animation.invalidate().restart();
							console.log("Restarted animation for section:", sectionId);
						}
					}
				});
			}, 1000);
		},
		[location.pathname, navigate]
	);

	// Main navigation handler
	const handleNavClick = (item: {
		type: string;
		name: string;
		id?: string;
		route?: string;
	}) => {
		console.log("Navigation clicked:", item);

		switch (item.type) {
			case "home":
				console.log("Home navigation, current path:", location.pathname);
				if (location.pathname === "/") {
					// If already on home, smooth scroll to top
					smoothScrollToTop();
				} else {
					// If on another page, navigate to home
					navigateToPage("/");
				}
				break;
			case "section":
				console.log("Section navigation:", item.id);
				if (item.id) scrollToSection(item.id);
				break;
			case "page":
				console.log("Page navigation:", item.route);
				if (item.route) navigateToPage(item.route);
				break;
		}
	};

	// Handle hash navigation on page load
	useEffect(() => {
		if (location.pathname === "/" && location.hash) {
			const sectionId = location.hash.substring(1);
			setTimeout(() => scrollToSection(sectionId), 100);
		}
	}, [location.pathname, location.hash, scrollToSection]);

	return (
		<header
			ref={navRef}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? "bg-white/95 backdrop-blur-md shadow-soft py-3"
					: "bg-white/80 backdrop-blur-md shadow-soft-sm py-5"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<button
						onClick={() => handleNavClick({ type: "home", name: "Inicio" })}
						className="flex items-center font-serif transition-all duration-300 group text-sage-800"
						aria-label="Psicóloga Montserrat Herbert - Inicio"
					>
						<Flower2 className="h-7 w-7 mr-3 transition-transform group-hover:rotate-12" />
						<span className="text-xl font-medium tracking-wide">
							Montserrat Herbert
						</span>
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<button
								key={item.name}
								onClick={() => handleNavClick(item)}
								className="font-medium transition-all duration-300 relative group text-sage-700 hover:text-rose-dust-600"
								aria-label={`Ir a ${item.name}`}
							>
								{item.name}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-dust-500 transition-all duration-300 group-hover:w-full"></span>
							</button>
						))}

						{/* Contact Button */}
						<button
							onClick={() => handleNavClick(contactButton)}
							className="px-17 py-3 bg-rose-dust-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-rose-dust-600 hover:shadow-lg whitespace-nowrap min-w-max"
							style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
							aria-label="Reservar consulta de psicología"
						>
							Reservar Consulta
						</button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden p-2 rounded-xl text-sage-700 hover:bg-sage-50 transition-colors"
						onClick={toggleMenu}
						aria-label="Abrir menú de navegación"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-sage-100 mt-4 rounded-2xl">
						<div className="px-6 py-6 space-y-4">
							{navItems.map((item) => (
								<button
									key={item.name}
									className="mobile-menu-item block w-full text-left py-3 text-sage-700 hover:text-rose-dust-600 transition-all border-b border-sage-100/50 font-medium hover:translate-x-2"
									onClick={() => handleNavClick(item)}
								>
									{item.name}
								</button>
							))}
							<button
								className="mobile-menu-item w-full mt-4 py-3 bg-rose-dust-500 text-white rounded-full font-medium transition-all hover:bg-rose-dust-600 whitespace-nowrap min-w-max"
								style={{ paddingLeft: "4.5rem", paddingRight: "4.5rem" }}
								onClick={() => handleNavClick(contactButton)}
							>
								Reservar Consulta
							</button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
