import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		// Optimización del bundle
		rollupOptions: {
			input: {
				main: "./index.html",
			},
			output: {
				// Manual code splitting para mejor cache
				manualChunks: {
					// Vendor chunk para librerías principales
					vendor: ['react', 'react-dom', 'react-router-dom'],
					// GSAP en chunk separado por su tamaño
					gsap: ['gsap'],
					// Lucide icons en chunk separado
					icons: ['lucide-react'],
					// Supabase en chunk separado
					supabase: ['@supabase/supabase-js'],
				},
			},
		},
		// Optimización para production
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // Remover console.logs en production
				drop_debugger: true,
			},
		},
		// Chunks más pequeños
		chunkSizeWarningLimit: 500,
	},
	// Optimización de dependencias
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom'],
		exclude: ['lucide-react', 'gsap'], // Se cargan lazy
	},
});
