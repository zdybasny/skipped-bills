import * as XLSX from "xlsx"
import { AccountBill, BudgetBill } from "./types"
import txt from "./locale"

export const readWorksheetFromXlsxFile = async <T>(
  filePath: string,
  sheetName: string
): Promise<any> => {
  const workbook = XLSX.readFile(filePath)
  const worksheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(worksheet)
  return data
}

export const mapJsonToAccountBills = (json: any): AccountBill[] => {
  const headers = txt().account.headers
  return json.map((bill: any) => {
    validateAccountBill(bill)
    return {
      date: bill[headers.date],
      prise: bill[headers.prise],
      title: bill[headers.title],
      status: bill[headers.status],
      shop: bill[headers.shop],
    } as AccountBill
  })
}

const validateAccountBill = (bill: AccountBill): bill is AccountBill => {
  if (
    bill.date !== undefined &&
    bill.prise !== undefined &&
    bill.title !== undefined &&
    bill.status !== undefined
  ) {
    return true
  }
  throw new Error(`Invalid AccountBill: ${JSON.stringify(bill)}`)
}

export const mapJsonToBudgetBills = (json: any): BudgetBill[] => {
  const headers = txt().budget.headers
  return json.map((bill: any) => {
    validateBudgetBill(bill)
    return {
      date: bill[headers.date],
      no: bill[headers.no],
      shop_type: bill[headers.shop_type],
      shop: bill[headers.shop],
      total: bill[headers.total],
      productType: bill[headers.productType],
      product: bill[headers.product],
      prise: bill[headers.prise],
    } as BudgetBill
  })
}

const validateBudgetBill = (bill: BudgetBill): bill is BudgetBill => {
  if (bill.date !== undefined && bill.no !== undefined) {
    return true
  }
  throw new Error(`Invalid BudgetBill: ${JSON.stringify(bill)}`)
}
