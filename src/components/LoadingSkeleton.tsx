import React from "react";

interface LoadingSkeletonProps {
	type?: "section" | "testimonials" | "contact" | "process";
	className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
	type = "section",
	className = "",
}) => {
	const baseClasses =
		"min-h-[400px] flex items-center justify-center animate-pulse";

	const skeletonContent = {
		section: (
			<div className="space-y-4 w-full max-w-4xl mx-auto px-4">
				<div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
				<div className="space-y-3">
					<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
					<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
				</div>
			</div>
		),

		process: (
			<div className="space-y-4 w-full max-w-4xl mx-auto px-4">
				<div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
							style={{ animationDelay: `${i * 0.2}s` }}
						></div>
					))}
				</div>
			</div>
		),

		testimonials: (
			<div className="space-y-4 w-full max-w-4xl mx-auto px-4">
				<div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[...Array(2)].map((_, i) => (
						<div key={i} className="p-6 bg-gray-100 rounded-xl space-y-3">
							<div
								className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
								style={{ animationDelay: `${i * 0.3}s` }}
							></div>
							<div
								className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
								style={{ animationDelay: `${i * 0.3 + 0.1}s` }}
							></div>
							<div
								className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
								style={{ animationDelay: `${i * 0.3 + 0.2}s` }}
							></div>
						</div>
					))}
				</div>
			</div>
		),

		contact: (
			<div className="space-y-6 w-full max-w-6xl mx-auto px-4">
				<div className="h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl mx-auto w-1/2 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
						<div className="space-y-3">
							<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
							<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
						<div className="space-y-3">
							<div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
							<div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
							<div className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
							<div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
						</div>
					</div>
				</div>
			</div>
		),
	};

	return (
		<div className={`${baseClasses} ${className}`}>{skeletonContent[type]}</div>
	);
};

export default LoadingSkeleton;
