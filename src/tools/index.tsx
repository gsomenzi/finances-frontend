import currency from "currency.js";
import currencyList from "./currencyList";
import CurrencyList, { CurrencyData } from "./currencyList";

/**
 * Recebe a string de um preço, com casas decimais ou não, e retorna em um float
 * @param {string | number} price Preço a ser formatado
 * @returns {number} O número como um float
 */
export function normalizePrice(price: string | number): number {
  if (typeof price === "number") {
    return price;
  }
  if (price.indexOf(",") > -1 || price.indexOf(".") > -1) {
    if (price.lastIndexOf(",") > price.lastIndexOf(".")) {
      return (
        parseFloat(
          price
            .substring(0, price.lastIndexOf(",") + 3)
            .replace(/,/g, "")
            .replace(/\./g, "")
        ) / 100
      );
    } else {
      return (
        parseFloat(
          price
            .substring(0, price.lastIndexOf(".") + 3)
            .replace(/,/g, "")
            .replace(/\./g, "")
        ) / 100
      );
    }
  } else {
    return parseFloat(price);
  }
}

/**
 * Formata um número ou string representando um número para o formato de reais brasileiros
 */
export function CurrencyFormatter(
  value: string | number | null | undefined,
  symbol?: string
): string {
  if (value === null || value === undefined) {
    return "0,00";
  }

  if (
    typeof value === "string" &&
    (value.indexOf(",") > -1 || value.indexOf(".") > -1)
  ) {
    let s = value;
    s = s.replace(",", ".");
    let splitNum = s.split(".");
    let integerPart = splitNum.slice(0, -1).join("");
    let decimalPart = splitNum.pop();
    let strNum = integerPart + "." + decimalPart;

    value = parseFloat(strNum);

    // value = parseFloat(value.replace(/,/g, '').replace(/\./g, '')) / 100;
  } else if (typeof value === "string") {
    value = parseFloat(value);
  }
  const c = currency(value, {
    symbol: symbol || "",
    decimal: ",",
    separator: ".",
  });
  return c.format();
}

export function getTranslatedAccountType(type: string): string {
  switch (type) {
    case "checking":
      return "conta corrente";
    case "investiment":
      return "investimento";
    case "other":
      return "outro";
    default:
      return type;
  }
}

export function getCurrencyData(code: string): CurrencyData | null {
  const data = currencyList.find(
    (c) => c.code.toLowerCase() === code.toLowerCase()
  );
  return data || null;
}
