
export const getRandomInt = (min : number, max: number) => {
    const minCeiled  = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function ucFirst(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }