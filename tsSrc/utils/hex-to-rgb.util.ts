export const hexToRGB = (hex = '#A9A9A9', alpha: number) => {
	if (!hex) hex = '#A9A9A9';
	const r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	return `rgba(${r},${g},${b}${alpha ? ',' + alpha : ''})`;
};
