import React, { useState, useEffect, useCallback } from "react";

const Loading = ({ loading }) => {
	const [hideGif, setHideGif] = useState(false);
	const [hideMessage, setHideMessage] = useState(false);
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

	const loadingMessages = [
		"Preheating the oven...",
		"Looking for the good knives...",
		"Turning up the heat... or maybe down?",
		"Stirring the pot...",
		"Mixing ingredients...",
		"Adding a pinch of salt...",
		"Negotiating with the oven...",
		"Waiting for the water to boil...",
		"Washing dishes...",
		"Setting the table..."
	];

	const [currentMessageIndex, setCurrentMessageIndex] = useState(
		Math.floor(Math.random() * loadingMessages.length)
	);

	const updateGifIndex = useCallback(() => {
		setCurrentGifIndex((prev) => (prev === loadingGifs.length - 1 ? 0 : prev + 1));
	}, [loadingGifs.length]);

	const updateBgIndex = useCallback(() => {
		setCurrentBgIndex((prev) => (prev === loadingBgColors.length - 1 ? 0 : prev + 1));
	}, [loadingBgColors.length]);

	const updateMessageIndex = useCallback(() => {
		setCurrentMessageIndex((prev) => (prev === loadingMessages.length - 1 ? 0 : prev + 1));
	}, [loadingMessages.length]);

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

		const cycleMessage = () => {
			setHideMessage(true);

			setTimeout(() => {
				updateMessageIndex();
				setTimeout(() => {
					setHideMessage(false);
				}, 500);
			}, 500);
		};

		const animationInterval = setInterval(cycleAnimation, 7000);
		const messageInterval = setInterval(cycleMessage, 3500);
		return () => {
			clearInterval(animationInterval);
			clearInterval(messageInterval);
		};
	}, [loading, updateGifIndex, updateBgIndex, updateMessageIndex]);

	if (!loading) return null;

	return (
		<div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ${showLoader ? 'opacity-100' : 'opacity-0'}`}>
			<div className={`absolute inset-0 transition-colors duration-500 ${loadingBgColors[currentBgIndex]}`} />
			<div className={`relative mb-2 text-3xl font-medium transition-all duration-300 transform ${
				!hideMessage ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
			}`}>
				{loadingMessages[currentMessageIndex]}
			</div>
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