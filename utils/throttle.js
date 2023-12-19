export function debounce(fn, t) {
	let timeId;
	let delay = t || 500;
	return function (...args) {
		if (timeId) {
			clearTimeout(timeId);
		}
		timeId = setTimeout(() => {
			timeId = null;
			fn.apply(this, args);
		}, delay);
	};
}
