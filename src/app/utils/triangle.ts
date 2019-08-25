export const triangle = {
  perimeter: n => n > 1 ? n * 3 - 3 : 1,
  term: n => n * (n + 1) / 2,
  housesStarOfDavid: n => n % 6 === 1 ? (n + 5) / 6 : null
}
