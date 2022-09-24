import { Budget } from "../src/Budget"

import txt from "../src/locale"
import { AccountBill, BudgetBill } from "../src/types"

import { afterEach, describe } from "mocha"
import { expect } from "chai"
import { stub } from "sinon"
import addContext from "mochawesome/addContext"
import * as mocks from "./resources/mocks/mocks"
import { assert } from "console"

let budget: Budget
describe(`Budget.ts`, () => {
  beforeEach(() => {
    budget = new Budget(mocks.accountBills(), mocks.budgetBills())
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
      expect(accountBills.length).to.equal(1)
    })
  })

  describe(`mapAndPushAccountBillsToBudgetBills()`, () => {
    it(`should map account bills to budget bills`, () => {
      // given
      assert(budget[`accountBills`]?.length === 2)
      assert(budget.getBudgetBills()?.length === 3)

      // when
      budget.mapAndPushAccountBillsToBudgetBills()

      // then
      const newBudgetBills = budget.getBudgetBills()
      expect(newBudgetBills.length).to.equal(5)
    })
    it(`should set "no" of new budget bills to the next one in the same date`, () => {
      // given

      // when
      budget.mapAndPushAccountBillsToBudgetBills()

      // then
      const newBudgetBills = budget.getBudgetBills()
      expect(newBudgetBills.find((bill) => bill.shop === `no:1`).no).to.equal(1)
      expect(newBudgetBills.find((bill) => bill.shop === `no:2`).no).to.equal(2)
    })
  })
})
