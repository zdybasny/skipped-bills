import txt from "../locale"

export default interface BudgetBill {
  date: Date
  no: number
  shopType?: string
  shop?: string
  total: number
  productType?: string
  product?: string
  prise?: number
  comment?: string
}

export const mapJsonToBudgetBills = (json: any): BudgetBill[] => {
  json = json.filter((bill: any) => isValidBudgetBill(bill))

  const headers = txt().budget.headers
  return json.map((bill: any) => {
    const budgetBill: BudgetBill = {
      date: convertDate(bill[headers.date]),
      no: bill[headers.no],
      shopType: bill[headers.shop_type],
      shop: bill[headers.shop],
      total: bill[headers.total],
      productType: bill[headers.productType],
      product: bill[headers.product],
      prise: bill[headers.prise],
      comment: bill[headers.comment],
    }
    return budgetBill
  })
}

export const mapBudgetBillsToJson = (bills: BudgetBill[]): any[] => {
  const headers = txt().budget.headers
  return bills.map((bill) => {
    const jsonBill: any = {}
    jsonBill[headers.date] = bill.date
    jsonBill[headers.no] = bill.no
    jsonBill[headers.shop_type] = bill.shopType
    jsonBill[headers.shop] = bill.shop
    jsonBill[headers.total] = bill.total
    jsonBill[headers.productType] = bill.productType
    jsonBill[headers.product] = bill.product
    jsonBill[headers.prise] = bill.prise
    jsonBill[headers.comment] = bill.comment
    return jsonBill
  })
}

const isValidBudgetBill = (bill: any): boolean => {
  const headers = txt().budget.headers
  return bill[headers.date] && bill[headers.no] && bill[headers.total]
}

const convertDate = (excelDate: number): Date => {
  // https://stackoverflow.com/a/72000349
  const excelEpoc = new Date(1900, 0, -1).getTime()
  const msDay = 86400000
  let date = new Date(excelEpoc + excelDate * msDay)
  console.log(`UTC: ${date.toUTCString()}`)
  console.log(`ISO: ${date.toISOString()}`)
  console.log(
    `string: ${date.toDateString()}`
  )

  const yyyy_mm_dd = new Date(excelEpoc + excelDate * msDay)
    .toISOString()
    .split("T")[0]
  return new Date(yyyy_mm_dd)
}
