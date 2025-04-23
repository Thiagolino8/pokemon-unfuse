export const genName = (prefix: string, suffix: string) => {
	if (prefix === 'Koff' && suffix === 'vee') return 'Covfefe'
	if (prefix.slice(-2) === suffix.slice(0, 2)) return prefix.slice(0, prefix.length - 2) + suffix
	if (prefix.slice(-1) === suffix.slice(0, 1)) return prefix.slice(0, prefix.length - 1) + suffix
	if (prefix.slice(-1) === '.') return prefix + ' ' + suffix[0].toUpperCase() + suffix.slice(1)
	return prefix + suffix
}
