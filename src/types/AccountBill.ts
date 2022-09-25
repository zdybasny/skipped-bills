import txt from "../locale"

export default interface AccountBill {
  date: Date
  prise: number
  shop?: string
  title: string
  status: string
}

export const mapJsonToAccountBills = (json: any): AccountBill[] => {
  const headers = txt().account.headers
  return json.map((bill: any) => {
    validateAccountBillJson(bill)
    const accountBill: AccountBill = {
      date: convertDate(bill[headers.date]),
      prise: (bill[headers.prise] as number) * -1,
      title: bill[headers.title],
      status: bill[headers.status],
      shop: bill[headers.shop],
    }
    return accountBill
  })
}

const validateAccountBillJson = (bill: any) => {
  const headers = txt().account.headers
  const requireFields = [
    headers.date,
    headers.prise,
    headers.title,
    headers.status,
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

const convertDate = (date: number | string): Date => {
  if (typeof date === "number") {
    // https://stackoverflow.com/a/72000349
    const excelEpoc = new Date(1900, 0, -1).getTime()
    const msDay = 86400000
    const yyyy_mm_dd = new Date(excelEpoc + date * msDay)
      .toISOString()
      .split("T")[0]
    return new Date(yyyy_mm_dd)
  }
  return new Date(date)
}
