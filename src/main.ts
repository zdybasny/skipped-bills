import * as xlsx from "./xlsxHandler"
import BudgetBill, {
  mapJsonToBudgetBills,
  mapBudgetBillsToJson,
} from "./types/BudgetBill"
import AccountBill, { mapJsonToAccountBills } from "./types/AccountBill"
import * as globals from "./globals"
import * as rulesHandler from "./rulesHandler"
import AccountBillRule, {
  mapJsonToAccountBillRules,
} from "./types/AccountBillRule"

import { paths } from "./globals"
import txt from "./locale"
import { Budget } from "./Budget"
import fs from "fs"

export default async () => {
  const accountBills = await readAndLogAccountBills()
  const budgetBills = await readAndLogBudgetBills()
  const accountBillRules = await readAndLogAccountBillRules()

  // Budget
  const budget = new Budget(accountBills, budgetBills)

  budget.filterAccountBillsNotInBudgetBills()
  console.log(`\nCount of missed bills: ${budget[`accountBills`].length}`)
  writeToJson(`${paths.accountBills}.filtered`, budget[`accountBills`])

  budget.applyRulesToAccountBills(accountBillRules)
  console.log(`\nRules applied to the account bills`)
  writeToJson(`${paths.accountBills}.rules-applied`, budget[`accountBills`])

  const budgetSkippedBills: BudgetBill[] = budget.mapAccountBillsToBudgetBills()
  console.log(`\nCount of missed bills: ${budgetSkippedBills.length}`)
  writeToJson(paths.budgetSkippedBills, budgetSkippedBills)

  const budgetSkippedBillsJson: any[] = mapBudgetBillsToJson(budgetSkippedBills)
  await xlsx.writeBudgetSkippedBillsToXlsx(
    paths.budgetSkippedBills,
    budgetSkippedBillsJson
  )
}

const readAndLogAccountBills = async (): Promise<AccountBill[]> => {
  const accountBillsJson = await xlsx.readWorksheetFromXlsxFile(
    paths.accountBills,
    txt().account.sheetName
  )
  const accountBills: AccountBill[] = mapJsonToAccountBills(accountBillsJson)
  console.log(`\nCount of account bills the file: ${accountBills.length}`)
  writeToJson(paths.accountBills, accountBills)
  return accountBills
}

const readAndLogBudgetBills = async (): Promise<BudgetBill[]> => {
  let budgetBillsJson = await xlsx.readWorksheetFromXlsxFile(
    paths.budgetBills,
    txt().budget.sheetName
  )
  let budgetBills: BudgetBill[] = mapJsonToBudgetBills(budgetBillsJson)
  console.log(`\nCount of budget bills in the file: ${budgetBills.length}`)
  writeToJson(paths.budgetBills, budgetBills)
  return budgetBills
}

const readAndLogAccountBillRules = async (): Promise<AccountBillRule[]> => {
  const rulesJson = JSON.parse(fs.readFileSync(paths.rules, "utf8"))
  const rules: AccountBillRule[] = mapJsonToAccountBillRules(rulesJson)
  return rules
}

const writeToJson = (path: string, bills: any) => {
  if (globals.options.hasWriteToJson) {
    fs.writeFileSync(`${path}.json`, JSON.stringify(bills))
  }
}
