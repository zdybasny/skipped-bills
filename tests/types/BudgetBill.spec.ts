import {
  mapJsonToBudgetBills,
  mapBudgetBillsToJson,
} from "../../src/types/BudgetBill"

import { afterEach, describe } from "mocha"
import { expect } from "chai"
import addContext from "mochawesome/addContext"
import * as mocks from "../resources/mocks/mocks"

let input: any
let result: any

describe(`BudgetBill.ts`, () => {
  beforeEach(() => {
    input = undefined
    result = undefined
  })
  afterEach(function () {
    addContext(this, `input:\n${JSON.stringify(input)}`)
    addContext(this, `result:\n${JSON.stringify(result)}`)
  })

  describe(`mapJsonToBudgetBills()`, () => {
    it(`should return an array of BudgetBill from a json`, async function () {
      // given
      input = mocks.budgetBillsJson()

      // when
      result = mapJsonToBudgetBills(input)

      // then
      expect(result.length).to.equal(7)
      expect(result[0].no).to.equal(input[0].no)
      expect(result[0].total).to.equal(input[0].total)
    })

    it(`should return BudgetBill[] with date of elements converted from Excel 5digit format into Date()`, async function () {
      // given
      input = mocks.budgetBillsJson()
      const expectedDate = new Date(Date.UTC(2022, 0, 2, 0, 0, 0, 0))

      // when
      result = mapJsonToBudgetBills(input)

      // then
      expect(result[0].date.toUTCString()).to.equal(expectedDate.toUTCString())
    })

    it(`should return an BudgetBill with allowed empty fields`, function () {
      // given
      const json = [
        {
          date: 44563,
          no: 1,
          total: 29.950000000000003,
        },
      ]

      // when
      result = mapJsonToBudgetBills(json)

      // then
      expect(result[0].shopType).to.undefined
      expect(result[0].shop).to.undefined
      expect(result[0].productType).to.undefined
      expect(result[0].product).to.undefined
      expect(result[0].prise).to.undefined
      expect(result[0].comment).to.undefined
    })

    it(`should skip a record if it does not contain "date" and "no" values`, () => {
      // given
      input = [{ prise: 25, comment: `invalid` }]

      // when
      result = mapJsonToBudgetBills(input)

      // then
      expect(result).to.empty
    })

    it(`should map json to BudgetBill[] with headers translated by Locale`, () => {
      // given
      input = mocks.budgetBillsJson()

      // when
      result = mapJsonToBudgetBills(input)

      // then
      expect(result[0].productType).to.equal(input[0][`product type`])
    })
  })

  describe(`mapBudgetBillsToJson()`, () => {
    it(`should return a json from a BudgetBills[]`, async function () {
      // given
      input = mocks.budgetBills()

      // when
      result = mapBudgetBillsToJson(input)

      // then
      expect(result.length).to.equal(7)
      expect(result[0].no).to.equal(input[0].no)
      expect(result[0].total).to.equal(input[0].total)
    })

    it(`should map BudgetBill[] to json with headers translated by Locale`, () => {
      // given
      input = mocks.budgetBillsJson()

      // when
      result = mapBudgetBillsToJson(input)

      // then
      expect(result[0][`product type`]).to.equal(input[0].productType)
    })
  })
})
