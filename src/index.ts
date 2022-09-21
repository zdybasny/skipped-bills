import * as xlsx from "./xlsxHandler"
import { AccountBill, BudgetBill } from "./types"
import { paths } from "./globals"
import txt, { setLocale } from "./locale"

const main = async () => {
  setLocale(`pl`)

  const accountBillsJson = await xlsx.readWorksheetFromXlsxFile<AccountBill>(
    paths.accountBills,
    txt().account.sheetName
  )
  const accountBills: AccountBill[] =
    xlsx.mapJsonToAccountBills(accountBillsJson)

  let budgetBillsJson = await xlsx.readWorksheetFromXlsxFile<BudgetBill>(
    paths.budgetBills,
    txt().budget.sheetName
  )
  let budgetBills: BudgetBill[] = xlsx.mapJsonToBudgetBills(budgetBillsJson)

}

export default main
