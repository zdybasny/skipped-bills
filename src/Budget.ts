import AccountBill from "./types/AccountBill"
import BudgetBill from "./types/BudgetBill"
import txt from "./locale"

export class Budget {
  constructor(
    private accountBills: AccountBill[],
    private budgetBills: BudgetBill[]
  ) {}

  filterAccountBillsForStatus = (status: string) => {
    this.accountBills = this.accountBills.filter((item: any) => {
      return item.status === status
    })
  }

  mapAccountBillsToBudgetBills = (): BudgetBill[] => {
    return this.accountBills.map((accountRecord: AccountBill) => {
      const bill = {
        date: accountRecord.date,
        no: this.findBudgetBillsLastNoForDate(accountRecord.date) + 1,
        // pointType: accountRecord[`point type`],
        shop: accountRecord.shop,
        product: txt().budget.cellValues.product.undocumentedBill,
        prise: accountRecord.prise,
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
