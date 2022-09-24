import * as xlsx from "./xlsxHandler"
import { AccountBill, BudgetBill } from "./types"
import { paths } from "./globals"
import txt from "./locale"
import { Budget } from "./Budget"

const main = async () => {
  const accountBillsJson = await xlsx.readWorksheetFromXlsxFile<AccountBill>(
    paths.accountBills,
    txt().account.sheetName
  )
  const accountBills: AccountBill[] =
    xlsx.mapJsonToAccountBills(accountBillsJson)
  console.log(`\nRead account bills:\n${JSON.stringify(accountBills)}`)

  let budgetBillsJson = await xlsx.readWorksheetFromXlsxFile<BudgetBill>(
    paths.budgetBills,
    txt().budget.sheetName
  )
  let budgetBills: BudgetBill[] = xlsx.mapJsonToBudgetBills(budgetBillsJson)
  console.debug(`\nRead budget bills:\n${JSON.stringify(budgetBills)}`)

  const budget = new Budget(accountBills, budgetBills)
  budget.filterAccountBillsForStatus(
    txt().account.cellValues.accountStatus.skipped
  )
  console.log(
    `\nFiltered account bills:\n${JSON.stringify(budget[`accountBills`])}`
  )

  budget.mapAndPushAccountBillsToBudgetBills()
  console.log(
    `\nMapped account bills to budget bills:\n${JSON.stringify(
      budget[`budgetBills`]
    )}`
  )
}
export default main
