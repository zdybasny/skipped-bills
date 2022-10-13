export const paths = {
  accountBills: `./accountBills.xlsx`,
  budgetBills: `./budgetBills.xlsx`,
  budgetSkippedBills: `./budgetSkippedBills.xlsx`,
  rules: `./resources/rules.json`,
}

export const defaultLanguage = `en`

export const helpDescription = `Optional arguments:

  --accountBills=         Path to account bills xlsx file [default: ${paths.accountBills}]
  --budgetBills=          Path to budget bills xlsx file [default: ${paths.budgetBills}]
  --skippedBudgetBills=   Path to budget skipped bills xlsx file [default: ${paths.budgetSkippedBills}]
  --locale=               Language of bills' files (en, pl) [default: ${defaultLanguage}]
  --write-to-json         Print bills to json files as well`

export const options = {
  hasWriteToJson: false,
}
