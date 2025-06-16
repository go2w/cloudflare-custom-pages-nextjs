export const countryCodeToFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  return String.fromCodePoint(...[...countryCode.toUpperCase()].map((char) => 127397 + char.charCodeAt(0)));
};
