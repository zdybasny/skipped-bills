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
  })
  afterEach(function () {
    addContext(this, `accountBills:\n${JSON.stringify(budget[`accountBills`])}`)
    addContext(this, `budgetBills:\n${JSON.stringify(budget[`budgetBills`])}`)
  })

  describe(`filterAccountBillsNotInBudgetBills()`, () => {
    it(`should filter only bill not duplicated in account and budget sets`, () => {
      // given

      // when
      budget.filterAccountBillsNotInBudgetBills()

      // then
      const accountBills = budget["accountBills"]
      expect(accountBills.length).to.equal(2)
      expect(accountBills[0].title).not.to.equal(`Title: 0090744`)
      expect(accountBills[1].title).not.to.equal(`Title: 0090744`)
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
      assertBillNumbers(0, 2)
      assertBillNumbers(1, 3)
      assertBillNumbers(2, 1)
    })
  })
})
