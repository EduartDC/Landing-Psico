import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy loading de páginas
const Home = lazy(() => import("./pages/Home"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));

// Componente de loading para las rutas
const RouteLoading = () => (
	<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-rose-dust-50">
		<div className="text-center space-y-4">
			<div className="w-16 h-16 border-4 border-rose-dust-200 border-t-rose-dust-500 rounded-full animate-spin mx-auto"></div>
			<p className="text-gray-600 font-medium">Cargando...</p>
		</div>
	</div>
);

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-rose-dust-50">
				<Navbar />
				<main>
					<Suspense fallback={<RouteLoading />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/preguntas-frecuentes" element={<FAQ />} />
							<Route path="/politicas-privacidad" element={<Privacy />} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
