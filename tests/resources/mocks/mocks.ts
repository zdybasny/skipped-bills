import AccountBill from "../../../src/types/AccountBill"
import BudgetBill from "../../../src/types/BudgetBill"

export const paths = {
  accountBills: `./tests/resources/xlsx/accountBills.xlsx`,
  budgetBills: `./tests/resources/xlsx/budgetBills.xlsx`,
  budgetMissedBills: `./tests/resources/xlsx/budgetMissedBills.xlsx`,
} as const

export const accountBillsJson = (): any[] => {
  return [
    {
      Shop: "abc",
      Account: "account A",
      Status: "ok",
      Date: "2022-01-02",
      "Transaction type": "Card payment",
      Prise: -20.48,
      Currency: "PLN",
      Title: "Title: 0090729",
    },
    {
      Shop: "abc",
      Account: "account A",
      Status: "SKIPPED",
      Date: "2022-01-02",
      "Transaction type": "Card payment",
      Prise: -3.49,
      Currency: "PLN",
      Title: "Title: 0090744",
    },
    {
      Shop: "little shop",
      Account: "account B",
      Status: "SKIPPED",
      Date: 44566,
      "Transaction type": "Card payment",
      Prise: -71.58,
      Currency: "PLN",
      Title: "Title: 00091840",
    },
  ]
}

export const accountBills = (): AccountBill[] => {
  return [
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      prise: 20.48,
      title: "Title: 0090729",
      status: "ok",
      shop: "abc",
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      prise: 3.49,
      title: "Title: 0090744",
      status: "SKIPPED",
      shop: "abc",
    },
    {
      date: new Date(`2022-01-05`),
      prise: 71.58,
      title: "Title: 00091840",
      status: "SKIPPED",
      shop: "little shop",
    },
  ]
}

// Given by xlsxHandler.readWorksheetFromXlsxFile()
// from ./tests/resources/budgetBills.xlsx
export const budgetBillsJson = (): any[] => {
  return [
    {
      date: 44563,
      no: 1,
      "shop type": "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "food",
      prise: 7.98,
    },
    {
      date: 44563,
      no: 1,
      "shop type": "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "food",
      prise: 9.98,
    },
    {
      date: 44563,
      no: 1,
      "shop type": "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "hausewares",
      prise: 11.99,
    },
    {
      date: 44564,
      no: 1,
      "shop type": "bank",
      shop: "the bank",
      total: 300,
      "product type": "CC",
      product: "student loan",
      prise: 300,
    },
    {
      date: 44564,
      no: 2,
      "shop type": "bank",
      shop: "the bank",
      total: 9.03,
      "product type": "CC",
      product: "student loan interest",
      prise: 9.03,
    },
    {
      date: 44564,
      no: 3,
      "shop type": "mechanic",
      shop: "new old car",
      total: 250,
      "product type": "NR",
      product: "car service",
      prise: 250,
    },
    {
      date: 44565,
      no: 1,
      "shop type": "loan",
      shop: "adam",
      total: -378.12,
      "product type": "NR",
      product: "personal loan",
      prise: -378.12,
    },
  ]
}

// Given by xlsxHandler.readWorksheetFromXlsxFile() and BudgetBill.mapJsonToBudgetBills()
// from ./tests/resources/budgetBills.xlsx
export const budgetBills = (): BudgetBill[] => {
  return [
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      no: 1,
      shopType: "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "food",
      prise: 7.98,
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      no: 1,
      shopType: "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "food",
      prise: 9.98,
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      no: 1,
      shopType: "supermaket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "hausewares",
      prise: 11.99,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 1,
      shopType: "bank",
      shop: "the bank",
      total: 300,
      productType: "CC",
      product: "student loan",
      prise: 300,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 2,
      shopType: "bank",
      shop: "the bank",
      total: 9.03,
      productType: "CC",
      product: "student loan interest",
      prise: 9.03,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 3,
      shop: "new old car",
      total: 250,
      productType: "NR",
      product: "car service",
      prise: 250,
    },
    {
      date: new Date("2022-01-04T00:00:00.000Z"),
      no: 1,
      shopType: "loan",
      shop: "adam",
      total: -378.12,
      productType: "NR",
      product: "personal loan",
      prise: -378.12,
    },
  ]
}
