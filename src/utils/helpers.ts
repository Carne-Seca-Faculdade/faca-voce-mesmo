export function formatPriceToReal(price: number): string {
  const priceInReal = price / 100;
  const priceFormatted = priceInReal.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return priceFormatted;
}

export function formatPriceToCents(price: string): number | void {
  const formattedPrice = price.replace(/,/g, ".").replace(/\s+/g, "");
  const priceNumber = Number(formattedPrice);

  if (isNaN(priceNumber)) {
    console.error(`Invalid price format: ${price}`);
    throw new Error("Error while formatting price to cents");
  }

  const priceInCents = Math.round(priceNumber * 100);
  return priceInCents;
}

export function returnRandomDistance() {
  const randomDistance = Math.ceil(Math.random() * 80);
  return `${randomDistance}km`;
}
