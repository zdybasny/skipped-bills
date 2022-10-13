import AccountBillRule, {
  mapJsonToAccountBillRules,
  operator,
} from "../../src/types/AccountBillRule"

import { afterEach, describe } from "mocha"
import { expect } from "chai"
import addContext from "mochawesome/addContext"
import * as mocks from "../resources/mocks/mocks"

import fs from "fs"

const ruleJsonInput = JSON.parse(
  fs.readFileSync(`./tests/resources/rules/rules.json`, `utf8`)
)
let expected: AccountBillRule[]
let result: AccountBillRule[]

describe(`AccountBillRule.ts`, () => {
  afterEach(function () {
    addContext(this, `result:\n${JSON.stringify(result)}`)
    addContext(this, `expected:\n${JSON.stringify(expected)}`)
  })
  describe(`mapJsonToAccountBillRules()`, () => {
    it(`should return an array of BudgetBill from a json`, async function () {
      // given

      // when
      result = mapJsonToAccountBillRules(ruleJsonInput)

      // then
      expected = mocks.rules[`match supermarket`]
      expect(result.length).to.equal(2)
      expect(result[0]).to.deep.equal(expected[0])
    })
  })
})
