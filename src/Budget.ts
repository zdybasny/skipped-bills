import AccountBill from "./types/AccountBill"
import BudgetBill from "./types/BudgetBill"
import txt from "./locale"
import { applyRulesToAccountBills } from "./rulesHandler"
import AccountBillRule from "./types/AccountBillRule"

export class Budget {
  constructor(
    private accountBills: AccountBill[],
    private budgetBills: BudgetBill[]
  ) {}

  filterAccountBillsNotInBudgetBills = () => {
    const accountBills = this.accountBills
    const accountBillsFiltered = accountBills.filter((accountBill) => {
      const isInBudgetBills = this.budgetBills.some((budgetBill) => {
        const check =
          budgetBill.date.toISOString() === accountBill.date.toISOString() &&
          Math.round(budgetBill.total) === Math.round(accountBill.amount)
        return check
      })
      return !isInBudgetBills
    })
    this.accountBills = accountBillsFiltered
  }

  applyRulesToAccountBills = (accountBillRules: AccountBillRule[]) => {
    this.accountBills = applyRulesToAccountBills(
      this.accountBills,
      accountBillRules
    )
  }

  mapAccountBillsToBudgetBills = (): BudgetBill[] => {
    return this.accountBills.map((accountRecord: AccountBill) => {
      const bill = {
        date: accountRecord.date,
        no: this.findBudgetBillsLastNoForDate(accountRecord.date) + 1,
        // pointType: accountRecord[`point type`],
        shop: accountRecord.shop,
        product: txt().budget.cellValues.product.undocumentedBill,
        amount: accountRecord.amount,
        comment: accountRecord.title,
      } as BudgetBill
      this.budgetBills.push(bill)
      return bill
    })
  }

  private findBudgetBillsLastNoForDate = (date: Date): number => {
    let records = this.budgetBills.filter(
      (record: BudgetBill) => record.date.toISOString() === date.toISOString()
    )

    if (records.length === 0) {
      return 0
    }

    records.sort((a: BudgetBill, b: BudgetBill) => {
      return a.no - b.no
    })
    return records[records.length - 1].no
  }
}
