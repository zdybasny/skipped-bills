import { AccountBill, BudgetBill } from "./types"
import txt from "./locale"

export class Budget {
  constructor(
    private accountBills: AccountBill[],
    private budgetBills: BudgetBill[]
  ) {}

  getBudgetBills(): BudgetBill[] {
    return this.budgetBills
  }

  filterAccountBillsForStatus = (status: string) => {
    this.accountBills = this.accountBills.filter((item: any) => {
      return item.status === status
    })
  }

  mapAndPushAccountBillsToBudgetBills = () => {
    const newBudgetBills = this.mapAccountBillsToBudgetBills()
    this.budgetBills = this.budgetBills.concat(newBudgetBills)
  }

  private mapAccountBillsToBudgetBills = (): BudgetBill[] => {
    return this.accountBills.map((accountRecord: AccountBill) => {
      return {
        date: accountRecord.date,
        no: this.findBudgetBillsLastNoForDate(accountRecord.date) + 1,
        // pointType: accountRecord[`point type`],
        shop: accountRecord.shop,
        product: txt().budget.cellValues.product.undocumentedBill,
        prise: accountRecord.prise,
      } as BudgetBill
    })
  }

  private findBudgetBillsLastNoForDate = (date: string): number => {
    let records = this.budgetBills.filter(
      (record: BudgetBill) => record.date === date
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
