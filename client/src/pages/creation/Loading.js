import React, { useState, useEffect, useCallback } from "react";

const Loading = ({ loading }) => {
	const [hideGif, setHideGif] = useState(false);
	const [currentBgIndex, setCurrentBgIndex] = useState(0);
	const [currentGifIndex, setCurrentGifIndex] = useState(0);
	const [showLoader, setShowLoader] = useState(false);

	const loadingBgColors = [
		"bg-[#e3ffe2]",
		"bg-[#d4f9f7]",
		"bg-[#cccbee]"
	];

	const loadingGifs = [
		"assets/loading/green.gif",
		"assets/loading/blue.gif",
		"assets/loading/purple.gif"
	];

	const updateGifIndex = useCallback(() => {
		setCurrentGifIndex((prev) => (prev === loadingGifs.length - 1 ? 0 : prev + 1));
	}, [loadingGifs.length]);

	const updateBgIndex = useCallback(() => {
		setCurrentBgIndex((prev) => (prev === loadingBgColors.length - 1 ? 0 : prev + 1));
	}, [loadingBgColors.length]);

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setShowLoader(true);
			}, 200);
		} else {
			setShowLoader(false);
		}
	}, [loading]);

	useEffect(() => {
		if (!loading) return;

		const cycleAnimation = () => {
			setHideGif(true);
			
			setTimeout(() => {
				updateBgIndex();
				updateGifIndex();
				
				setTimeout(() => {
					setHideGif(false);
				}, 500);
			}, 500);
		};

		const interval = setInterval(cycleAnimation, 7000);
		return () => clearInterval(interval);
	}, [loading, updateGifIndex, updateBgIndex]);

	if (!loading) return null;

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showLoader ? 'opacity-100' : 'opacity-0'}`}>
			<div className={`absolute inset-0 transition-colors duration-500 ${loadingBgColors[currentBgIndex]}`} />
			<div className="relative w-64 h-64 z-10">
				{loadingGifs.map((gif, index) => (
					<img
						key={index}
						src={gif}
						alt="Loading..."
						className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
							index === currentGifIndex && !hideGif ? "opacity-100" : "opacity-0"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Loading;