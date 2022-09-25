import { Budget } from "../src/Budget"

import txt from "../src/locale"
import AccountBill from "../src/types/AccountBill"
import BudgetBill from "../src/types/BudgetBill"

import { afterEach, describe } from "mocha"
import { assert, expect } from "chai"
import { stub } from "sinon"
import addContext from "mochawesome/addContext"
import * as mocks from "./resources/mocks/mocks"

let budget: Budget
describe(`Budget.ts`, () => {
  beforeEach(function () {
    budget = new Budget(mocks.accountBills(), mocks.budgetBills())
    addContext(this, `accountBills:\n${JSON.stringify(mocks.accountBills())}`)
    addContext(this, `budgetBills:\n${JSON.stringify(mocks.budgetBills())}`)
  })

  describe(`filterAccountBillsForStatus`, () => {
    it(`should filter budget.accountBills for "${
      txt().account.cellValues.accountStatus.skipped
    }"`, () => {
      // given
      const status = txt().account.cellValues.accountStatus.skipped

      // when
      budget.filterAccountBillsForStatus(status)

      // then
      const accountBills = budget["accountBills"]
      expect(accountBills.length).to.equal(2)
    })
  })

  describe(`mapAccountBillsToBudgetBills()`, () => {
    it(`should map account bills to budget bills`, () => {
      // given
      const accountBills: AccountBill[] = budget["accountBills"]

      // when
      const result: BudgetBill[] = budget.mapAccountBillsToBudgetBills()

      // then
      expect(result.length).to.equal(accountBills.length)
      expect(result[0].date).to.equal(accountBills[0].date)
    })

    it(`should set "no" of new budget bills to the next one in the same date`, function () {
      // given

      // when
      const newBudgetBills = budget.mapAccountBillsToBudgetBills()

      // then
      addContext(this, `newBudgetBills:\n${JSON.stringify(newBudgetBills)}`)

      const assertBillNumbers = (newBillIndex: number, expectNo: number) => {
        const failureMessage = `Expected: "${expectNo}" for: ${JSON.stringify(
          newBudgetBills[newBillIndex]
        )}`
        expect(newBudgetBills[newBillIndex].no, failureMessage).to.equal(
          expectNo
        )
      }
      assertBillNumbers(0, 4)
      assertBillNumbers(1, 5)
      assertBillNumbers(2, 1)
    })
  })
})
