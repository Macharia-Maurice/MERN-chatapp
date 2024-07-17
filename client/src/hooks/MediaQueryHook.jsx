import * as React from "react";

export function useMediaQuery(query) {
	const [value, setValue] = React.useState(false);

	React.useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const listener = (event) => setValue(event.matches);

		// Add listener
		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener("change", listener);
		} else if (mediaQueryList.addListener) {
			mediaQueryList.addListener(listener);
		}

		// Set initial value
		setValue(mediaQueryList.matches);

		// Cleanup function
		return () => {
			if (mediaQueryList.removeEventListener) {
				mediaQueryList.removeEventListener("change", listener);
			} else if (mediaQueryList.removeListener) {
				mediaQueryList.removeListener(listener);
			}
		};
	}, [query]);

	return value;
}
