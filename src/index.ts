import * as xlsx from "./xlsxHandler"
import { AccountBill, BudgetBill } from "./types"
import { paths } from "./globals"
import { Locale } from "./locale"

const main = async () => {
  Locale.setLocale(`pl`)

  const accountBillsJson = await xlsx.readWorksheetFromXlsxFile<AccountBill>(
    paths.accountBills,
    Locale.txt.account.sheetName
  )
  const accountBills = xlsx.mapJsonToAccountBills(accountBillsJson)

  let budgetBillsJson = await xlsx.readWorksheetFromXlsxFile<BudgetBill>(
    paths.budgetBills,
    Locale.txt.budget.sheetName
  )
  const budgetBills = xlsx.mapJsonToAccountBills(budgetBillsJson)

}

export default main
