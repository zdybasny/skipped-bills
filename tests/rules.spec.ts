import * as rulesHandler from "../src/rulesHandler"

import * as globals from "../src/globals"
import fs from "fs"
import AccountBillRule, {
  mapJsonToAccountBillRules,
  operator,
} from "../src/types/AccountBillRule"

import { afterEach, describe } from "mocha"
import { assert, expect } from "chai"
import { restore, stub } from "sinon"
import addContext from "mochawesome/addContext"
import * as mocks from "./resources/mocks/mocks"

let accountBills: any
let result: any

describe("rules.ts", () => {
  beforeEach(() => {
    restore()
    accountBills = undefined
    result = undefined
    globals.paths.rules = mocks.paths.rules
  })
  afterEach(function () {
    addContext(this, `input:\n${JSON.stringify(accountBills)}`)
    addContext(this, `result:\n${JSON.stringify(result)}`)
  })

  describe("applyRulesToAccountBills()", () => {
    it(`should set "Shop" with "abc" and "Shop Type" with "supermarket" if "Title" column CONTAINS "ABC"`, function () {
      // given
      accountBills = mocks.accountBillsJson()

      const rulesJson: any[] = JSON.parse(
        fs.readFileSync(mocks.paths.rules, "utf8")
      )
      const ruleJson = [
        rulesJson.find((rule) => rule.name === `match supermarket`),
      ]
      const rules: AccountBillRule[] = mocks.rules["match supermarket"]
      
      // when
      result = rulesHandler.applyRulesToAccountBills(accountBills, rules)

      // then
      expect(result[0][`Shop`]).to.equal(`abc`)
      expect(result[1][`Shop Type`]).to.equal(`supermarket`)
    })

    it(`should trow an error when there is given a column not existing in the Account Bills`, function () {
      // given
      accountBills = mocks.accountBillsJson()

      const rulesJson: any[] = JSON.parse(
        fs.readFileSync(mocks.paths.rules, "utf8")
      )
      const rules = [
        rulesJson.find((rule) => rule.name === `not existing column`),
      ]

      // when
      const fn = () =>
        rulesHandler.applyRulesToAccountBills(accountBills, rules)

      // then
      expect(fn).to.throw(`Column "Q" not found in account bill.`)
    })
  })
})
