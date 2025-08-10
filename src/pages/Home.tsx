import { useEffect } from "react";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Services from "../components/Services";
import Approach from "../components/Approach";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	useEffect(() => {
		// Si llegamos con hash (#enfoque, etc.) hacer scroll después de montar secciones
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			// pequeño delay para asegurar render
			setTimeout(() => {
				const el = document.getElementById(hash);
				if (el) {
					const navbar = document.querySelector("header");
					const navH = (navbar as HTMLElement)?.offsetHeight || 80;
					const rect = el.getBoundingClientRect();
					const targetPos = Math.max(0, rect.top + window.scrollY - navH - 20);

					// Use native smooth scroll
					window.scrollTo({
						top: targetPos,
						behavior: "smooth",
					});

					setTimeout(() => {
						ScrollTrigger.refresh();
						// Reiniciar animaciones del hash destino
						const triggers = ScrollTrigger.getAll();
						triggers.forEach((t) => {
							if (t.trigger && (t.trigger as HTMLElement).closest) {
								const section = (t.trigger as HTMLElement).closest("section");
								if (section && section.id === hash && t.animation) {
									t.animation.invalidate().restart();
								}
							}
						});
					}, 1000);
				}
			}, 150);
		} else {
			// Si no hay hash, scroll al top (para navegación desde otras páginas)
			window.scrollTo({ top: 0, behavior: "auto" });
		}
	}, []);

	return (
		<>
			<Hero />
			<AboutMe />
			<Services />
			<Approach />
			<Process />
			<Testimonials />
			<Contact />
		</>
	);
};

export default Home;
