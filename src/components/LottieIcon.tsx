import { memo, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface LottieIconProps {
	animation: object;
	className?: string;
	loop?: boolean;
	autoplay?: boolean;
	speed?: number; // playback speed multiplier
	ariaLabel?: string;
}

const LottieIcon = ({
	animation,
	className = "",
	loop = true,
	autoplay = true,
	speed = 1,
	ariaLabel,
}: LottieIconProps) => {
	const lottieRef = useRef<LottieRefCurrentProps>(null);

	useEffect(() => {
		if (lottieRef.current) {
			try {
				lottieRef.current.setSpeed(speed);
			} catch {
				/* ignore */
			}
		}
	}, [speed]);

	return (
		<Lottie
			lottieRef={lottieRef}
			animationData={animation}
			loop={loop}
			autoplay={autoplay}
			className={className}
			aria-label={ariaLabel}
			role={ariaLabel ? "img" : undefined}
		/>
	);
};

export default memo(LottieIcon);
