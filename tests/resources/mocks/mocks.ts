import { AccountBill, BudgetBill } from "../../../src/types"

export const accountBills = (): AccountBill[] => {
  return [
    {
      shop: `no:1`,
      status: `ok`,
      date: `2022-03-22`,
      title: `should be omitted by a filter`,
      prise: 25,
    },
    {
      shop: `no:2`,
      status: `SKIPPED`,
      date: `2022-03-28`,
      title: `should be added to budget bills with no:2`,
      prise: 12.5,
    },
  ]
}

export const budgetBills = (): BudgetBill[] => {
  return [
    {
      date: "2022-03-24",
      no: 1,
      shop_type: "shop type 1",
      shop: "shop 1",
      total: 25,
      productType: "product type 1",
      product: "product 1",
      prise: 25,
    },
    {
      date: "2022-03-28",
      no: 1,
      shop_type: "shop type 2",
      shop: "shop 2",
      total: 75.5,
      productType: "product type 2",
      product: "product 2",
      prise: 50,
    },
    {
      date: "2022-03-28",
      no: 1,
      shop_type: "shop type 2",
      shop: "shop 2",
      total: 75.5,
      productType: "product type 2",
      product: "product 3",
      prise: 12.5,
    },
  ]
}
