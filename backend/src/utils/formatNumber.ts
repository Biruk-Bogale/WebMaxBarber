import numeral from 'numeral';

export const formatNumber = (number: number | string | null | undefined): string => {
  if (number === null || number === undefined) return '0'; // or empty string
  return numeral(Number(number)).format('0.[0]a'); // e.g., 1.2k, 3.4M
};
