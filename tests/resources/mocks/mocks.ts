import AccountBill from "../../../src/types/AccountBill"
import BudgetBill from "../../../src/types/BudgetBill"
import AccountBillRule, { operator } from "../../../src/types/AccountBillRule"

export const paths = {
  accountBills: `./tests/resources/xlsx/accountBills.xlsx`,
  budgetBills: `./tests/resources/xlsx/budgetBills.xlsx`,
  budgetMissedBills: `./tests/resources/xlsx/budgetMissedBills.xlsx`,
  rules: `./tests/resources/rules/rules.json`,
} as const

export const accountBillsJson = (): any[] => {
  return [
    {
      Shop: "abc",
      Account: "account A",
      "Transfer date": "2022-01-02",
      "Transaction type": "Card payment",
      Amount: -20.48,
      Currency: "PLN",
      Title: "Title: 0090729 in ABC",
    },
    {
      Shop: "abc",
      Account: "account A",
      "Transfer date": "2022-01-02",
      "Transaction type": "Card payment",
      Amount: -29.95,
      Currency: "PLN",
      Title: "Title: 0090744 in ABC",
    },
    {
      Shop: "little shop",
      Account: "account B",
      "Transfer date": 44566,
      "Transaction type": "Card payment",
      Amount: -71.58,
      Currency: "PLN",
      Title: "Title: 00091840 in Little Shop",
    },
  ]
}

export const accountBills = (): AccountBill[] => {
  return [
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      amount: 20.48,
      title: "Title: 0090729",
      shop: "abc",
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      amount: 29.95,
      title: "Title: 0090744",
      shop: "abc",
    },
    {
      date: new Date(`2022-01-05`),
      amount: 71.58,
      title: "Title: 00091840",
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
      "shop type": "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "food",
      amount: 7.98,
    },
    {
      date: 44563,
      no: 1,
      "shop type": "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "food",
      amount: 9.98,
    },
    {
      date: 44563,
      no: 1,
      "shop type": "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      "product type": "-",
      product: "hausewares",
      amount: 11.99,
    },
    {
      date: 44564,
      no: 1,
      "shop type": "bank",
      shop: "the bank",
      total: 300,
      "product type": "CC",
      product: "student loan",
      amount: 300,
    },
    {
      date: 44564,
      no: 2,
      "shop type": "bank",
      shop: "the bank",
      total: 9.03,
      "product type": "CC",
      product: "student loan interest",
      amount: 9.03,
    },
    {
      date: 44564,
      no: 3,
      "shop type": "mechanic",
      shop: "new old car",
      total: 250,
      "product type": "NR",
      product: "car service",
      amount: 250,
    },
    {
      date: 44565,
      no: 1,
      "shop type": "loan",
      shop: "adam",
      total: -378.12,
      "product type": "NR",
      product: "personal loan",
      amount: -378.12,
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
      shopType: "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "food",
      amount: 7.98,
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      no: 1,
      shopType: "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "food",
      amount: 9.98,
    },
    {
      date: new Date("2022-01-02T00:00:00.000Z"),
      no: 1,
      shopType: "supermarket",
      shop: "abc",
      total: 29.950000000000003,
      productType: "-",
      product: "hausewares",
      amount: 11.99,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 1,
      shopType: "bank",
      shop: "the bank",
      total: 300,
      productType: "CC",
      product: "student loan",
      amount: 300,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 2,
      shopType: "bank",
      shop: "the bank",
      total: 9.03,
      productType: "CC",
      product: "student loan interest",
      amount: 9.03,
    },
    {
      date: new Date("2022-01-03T00:00:00.000Z"),
      no: 3,
      shop: "new old car",
      total: 250,
      productType: "NR",
      product: "car service",
      amount: 250,
    },
    {
      date: new Date("2022-01-04T00:00:00.000Z"),
      no: 1,
      shopType: "loan",
      shop: "adam",
      total: -378.12,
      productType: "NR",
      product: "personal loan",
      amount: -378.12,
    },
  ]
}

export const rules = {
  "match supermarket": [
    {
      columns: ["Title"],
      collectionOperator: operator.collection.Any[0],
      elementOperator: operator.element.Contains[0],
      conditions: [
        {
          withValue: "abc",
          outputCells: {
            Shop: "abc",
            "Shop Type": "supermarket",
          },
        },
        {
          withValue: "the bank",
          outputCells: {
            Shop: "the bank",
            "Shop Type": "bank",
          },
        },
        {
          withValue: "new old car",
          outputCells: {
            Shop: "new old car",
            "Shop Type": "mechanic",
          },
        },
      ],
    },
  ] as AccountBillRule[],
} as const
