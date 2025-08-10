import { useEffect, useRef } from "react";
import LayoutContainer from "../components/LayoutContainer";
import { Shield, Lock, Eye, FileText, Phone, Mail } from "lucide-react";
import { gsap } from "gsap";

const Privacy = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const shieldIconRef = useRef<SVGSVGElement>(null);

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

			// Content sections animation
			const sections = pageRef.current?.querySelectorAll(".privacy-section");
			if (sections) {
				gsap.fromTo(
					sections,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.15,
						ease: "power3.out",
						delay: 0.5,
					}
				);
			}
			// Shield breathing
			if (
				shieldIconRef.current &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches
			) {
				gsap.to(shieldIconRef.current, {
					scale: 1.06,
					repeat: -1,
					yoyo: true,
					duration: 4.5,
					ease: "sine.inOut",
				});
			}
		}, pageRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={pageRef}
			className="pt-20 md:pt-28 pb-16 md:pb-24 min-h-screen bg-white overflow-hidden"
		>
			<LayoutContainer>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<div className="flex items-center justify-center gap-3 mb-6">
							<Shield ref={shieldIconRef} className="w-8 h-8 text-teal-600" />
							<h1
								ref={titleRef}
								className="text-3xl md:text-4xl font-serif font-bold text-gray-800"
							>
								Políticas de Privacidad y Confidencialidad
							</h1>
						</div>
						<p className="text-gray-600 max-w-3xl mx-auto text-lg">
							En este espacio terapéutico, la protección de tu privacidad y la
							confidencialidad de la información que compartes son fundamentales.
							Quiero que te sientas segura y tranquila al contarme tu historia,
							sabiendo que todo lo que hablamos queda entre nosotras.
						</p>
					</div>

					<div className="space-y-8">
						<div className="privacy-section bg-slate-50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Lock className="w-6 h-6 text-teal-600" />
								<h2 className="text-2xl font-serif font-bold text-gray-800">
									¿Qué significa esto para ti?
								</h2>
							</div>

							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700 leading-relaxed">
										<strong>Confidencialidad absoluta:</strong> Toda la información que
										compartas durante las sesiones, así como tus datos personales, serán
										tratados con el más estricto respeto y confidencialidad.
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700 leading-relaxed">
										<strong>Sin divulgación a terceros:</strong> No compartiré ninguna
										información con terceros sin tu consentimiento explícito, salvo en
										casos donde exista un riesgo inminente para tu vida o la de otras
										personas, conforme a la legislación vigente.
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700 leading-relaxed">
										<strong>Uso exclusivo para terapia:</strong> Los datos que recojo para
										agendar tus sesiones y mantener contacto se usarán únicamente para
										fines relacionados con la atención terapéutica y no serán divulgados
										ni vendidos.
									</p>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700 leading-relaxed">
										<strong>Seguridad digital:</strong> Cuento con medidas de seguridad
										para proteger la información digital y asegurar que tu privacidad sea
										resguardada.
									</p>
								</div>
							</div>
						</div>

						<div className="privacy-section bg-teal-50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Eye className="w-6 h-6 text-teal-600" />
								<h2 className="text-2xl font-serif font-bold text-gray-800">
									Protección de Datos Personales
								</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-lg font-medium text-gray-800 mb-3">
										Datos que recopilo:
									</h3>
									<ul className="space-y-2">
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Nombre y apellidos</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Email de contacto</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Número de teléfono</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">
												Información terapéutica relevante
											</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-medium text-gray-800 mb-3">
										Cómo los protejo:
									</h3>
									<ul className="space-y-2">
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">
												Encriptación de extremo a extremo
											</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Almacenamiento seguro</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Acceso restringido</span>
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
											<span className="text-gray-700">Respaldo de seguridad</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="privacy-section bg-amber-50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<FileText className="w-6 h-6 text-amber-600" />
								<h2 className="text-2xl font-serif font-bold text-gray-800">
									Excepciones Legales
								</h2>
							</div>

							<p className="text-gray-700 leading-relaxed mb-4">
								La confidencialidad es un principio fundamental, pero existen
								situaciones excepcionales donde la ley me obliga a romper la
								confidencialidad para proteger la vida:
							</p>

							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700">
										Riesgo inminente de suicidio o autolesión grave
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700">Amenaza seria hacia otra persona</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700">Abuso infantil o maltrato a menores</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700">
										Orden judicial que requiera información específica
									</p>
								</div>
							</div>

							<div className="mt-4 p-4 bg-amber-100 rounded-lg">
								<p className="text-amber-800 text-sm">
									<strong>Importante:</strong> En caso de que alguna de estas situaciones
									se presente, te informaré antes de tomar cualquier acción, salvo que
									hacerlo represente un riesgo inmediato.
								</p>
							</div>
						</div>

						<div className="privacy-section bg-indigo-50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Shield className="w-6 h-6 text-indigo-600" />
								<h2 className="text-2xl font-serif font-bold text-gray-800">
									Tus Derechos
								</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-lg font-medium text-gray-800 mb-3">
										Tienes derecho a:
									</h3>
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-gray-700">
												Acceder a tu información personal
											</span>
										</li>
										<li className="flex items-start gap-2">
											<div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-gray-700">Rectificar datos incorrectos</span>
										</li>
										<li className="flex items-start gap-2">
											<div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-gray-700">
												Solicitar la eliminación de tus datos
											</span>
										</li>
										<li className="flex items-start gap-2">
											<div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-gray-700">Limitar el procesamiento</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-medium text-gray-800 mb-3">
										Cómo ejercer tus derechos:
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<Mail className="w-4 h-4 text-indigo-600" />
											<span className="text-gray-700 text-sm">Por email</span>
										</div>
										<div className="flex items-center gap-3">
											<Phone className="w-4 h-4 text-indigo-600" />
											<span className="text-gray-700 text-sm">Por teléfono</span>
										</div>
										<div className="flex items-center gap-3">
											<FileText className="w-4 h-4 text-indigo-600" />
											<span className="text-gray-700 text-sm">Durante las sesiones</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="privacy-section bg-rose-50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Phone className="w-6 h-6 text-rose-600" />
								<h2 className="text-2xl font-serif font-bold text-gray-800">
									¿Dudas sobre estas políticas?
								</h2>
							</div>

							<p className="text-gray-700 leading-relaxed mb-6">
								Si tienes dudas o quieres conocer más detalles sobre estas políticas,
								estoy disponible para aclararlas antes o durante tu proceso terapéutico.
								La transparencia es fundamental para construir una relación de
								confianza.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<a
									href="/#contacto"
									className="inline-flex items-center justify-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition-all duration-300"
								>
									Contactar ahora
									<Mail size={18} />
								</a>
								<a
									href="/"
									className="inline-flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-600 px-6 py-3 rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300"
								>
									Volver al inicio
									<Shield size={18} />
								</a>
							</div>
						</div>
					</div>

					<div className="mt-12 text-center">
						<p className="text-gray-500 text-sm">
							Última actualización:{" "}
							{new Date().toLocaleDateString("es-ES", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
			</LayoutContainer>
		</div>
	);
};

export default Privacy;
