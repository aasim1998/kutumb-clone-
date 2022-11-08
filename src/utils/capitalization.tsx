export default function capitalizeName(str: string) {
  const splitStr = str.trim().toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  const uppercaseText = splitStr.join(' ');
  return uppercaseText;
}

export function capitalizeTitle(str: string) {
  if (str !== undefined) {
    const splitStr = str.charAt(0).toUpperCase() + str.slice(1);
    return splitStr.trim();
  }
}
