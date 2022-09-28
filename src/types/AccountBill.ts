import txt from "../locale"

export default interface AccountBill {
  date: Date
  amount: number
  shop?: string
  title: string
}

export const mapJsonToAccountBills = (json: any): AccountBill[] => {
  const headers = txt().account.headers
  return json.map((bill: any) => {
    validateAccountBillJson(bill)
    const accountBill: AccountBill = {
      date: convertDate(bill[headers.date]),
      amount: (bill[headers.amount] as number) * -1,
      title: bill[headers.title],
      shop: bill[headers.shop],
    }
    return accountBill
  })
}

const validateAccountBillJson = (bill: any) => {
  const headers = txt().account.headers
  const requireFields = [
    headers.date,
    headers.amount,
    headers.title,
  ]
  validateBill(bill, requireFields)
}

const validateBill = (bill: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(
    (field: string) => (bill as any)[field] === undefined
  )
  if (missingFields.length !== 0) {
    throw new Error(
      `Error: Account bill is missing the following fields: ${missingFields.join(
        ", "
      )}\nfor bill: ${JSON.stringify(bill)}`
    )
  }
}

const convertDate = (excelDate: number | string): Date => {
  if (typeof excelDate === "number") {
    // https://stackoverflow.com/a/72000349
    const excelEpoc = new Date(Date.UTC(1900, 0, -1)).getTime()
    const msDay = 86400000
    const date = new Date(excelEpoc + excelDate * msDay)
    date.setUTCHours(0, 0, 0, 0)
    return date
  }
  return new Date(excelDate)
}
