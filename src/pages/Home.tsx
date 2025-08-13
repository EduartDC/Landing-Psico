import { useEffect, lazy, Suspense } from "react";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Services from "../components/Services";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloadComponent } from "../hooks/usePreloadComponent";

// Lazy loading de componentes pesados que aparecen más abajo en la página
const Approach = lazy(() => import("../components/Approach"));
const Process = lazy(() => import("../components/Process"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Contact = lazy(() => import("../components/Contact"));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	// Preload inteligente - cargar componentes antes de que sean visibles
	const { elementRef: approachRef } = usePreloadComponent(
		() => import("../components/Approach"),
		{ rootMargin: "300px" }
	);

	const { elementRef: processRef } = usePreloadComponent(
		() => import("../components/Process"),
		{ rootMargin: "300px" }
	);

	const { elementRef: testimonialsRef } = usePreloadComponent(
		() => import("../components/Testimonials"),
		{ rootMargin: "300px" }
	);

	const { elementRef: contactRef } = usePreloadComponent(
		() => import("../components/Contact"),
		{ rootMargin: "300px" }
	);

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
			<Suspense fallback={<LoadingSkeleton type="section" />}>
				<div ref={approachRef}>
					<Approach />
				</div>
			</Suspense>
			<Suspense fallback={<LoadingSkeleton type="process" />}>
				<div ref={processRef}>
					<Process />
				</div>
			</Suspense>
			<Suspense fallback={<LoadingSkeleton type="testimonials" />}>
				<div ref={testimonialsRef}>
					<Testimonials />
				</div>
			</Suspense>
			<Suspense
				fallback={<LoadingSkeleton type="contact" className="min-h-[600px]" />}
			>
				<div ref={contactRef}>
					<Contact />
				</div>
			</Suspense>
		</>
	);
};

export default Home;
