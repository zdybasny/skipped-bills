import * as xlsx from "./xlsxHandler"
import BudgetBill, {
  mapJsonToBudgetBills,
  mapBudgetBillsToJson,
} from "./types/BudgetBill"
import AccountBill, { mapJsonToAccountBills } from "./types/AccountBill"
import * as globals from "./globals"

import { paths } from "./globals"
import txt from "./locale"
import { Budget } from "./Budget"
import fs from "fs"

const main = async () => {
  const accountBillsJson = await xlsx.readWorksheetFromXlsxFile(
    paths.accountBills,
    txt().account.sheetName
  )
  const accountBills: AccountBill[] = mapJsonToAccountBills(accountBillsJson)
  console.log(`\nCount of account bills: ${accountBills.length}`)
  writeToJson(paths.accountBills, accountBills)

  let budgetBillsJson = await xlsx.readWorksheetFromXlsxFile(
    paths.budgetBills,
    txt().budget.sheetName
  )
  let budgetBills: BudgetBill[] = mapJsonToBudgetBills(budgetBillsJson)
  console.log(`\nCount of account bills: ${budgetBills.length}`)
  writeToJson(paths.budgetBills, budgetBills)

  const budget = new Budget(accountBills, budgetBills)
  budget.filterAccountBillsForStatus(
    txt().account.cellValues.accountStatus.skipped
  )
  console.log(`\nCount of missed bills: ${budget[`accountBills`].length}`)
  writeToJson(`${paths.accountBills}.filtered`, budget[`accountBills`])

  const budgetSkippedBills: BudgetBill[] = budget.mapAccountBillsToBudgetBills()
  console.log(`\nCount of missed bills: ${budgetSkippedBills.length}`)
  writeToJson(paths.budgetSkippedBills, budgetSkippedBills)

  const budgetSkippedBillsJson: any[] = mapBudgetBillsToJson(budgetSkippedBills)
  await xlsx.writeBudgetSkippedBillsToXlsx(
    paths.budgetSkippedBills,
    budgetSkippedBillsJson
  )
}
export default main

const writeToJson = (path: string, bills: any) => {
  if (globals.options.hasWriteToJson) {
    fs.writeFileSync(`${path}.json`, JSON.stringify(bills))
  }
}
