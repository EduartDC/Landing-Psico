import { useEffect, useRef, useState } from 'react';

interface UsePreloadComponentOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Hook para precargar componentes cuando están cerca del viewport
 * Mejora la UX al reducir el tiempo de carga visible
 */
export const usePreloadComponent = (
  preloadFn: () => Promise<unknown>,
  options: UsePreloadComponentOptions = {}
) => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { rootMargin = '200px', threshold = 0.1 } = options;

    if (!elementRef.current || isPreloaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPreloaded) {
            // Precargar el componente cuando está cerca del viewport
            preloadFn()
              .then(() => {
                setIsPreloaded(true);
                observer.disconnect();
              })
              .catch((error) => {
                console.warn('Error preloading component:', error);
              });
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [preloadFn, isPreloaded, options]);

  return { elementRef, isPreloaded };
};

/**
 * Hook simplificado para lazy loading con Intersection Observer
 */
export const useLazyLoad = (options: UsePreloadComponentOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { rootMargin = '50px', threshold = 0.1 } = options;

    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { elementRef, isVisible };
};
