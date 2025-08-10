import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-rose-dust-50">
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/preguntas-frecuentes" element={<FAQ />} />
						<Route path="/politicas-privacidad" element={<Privacy />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
