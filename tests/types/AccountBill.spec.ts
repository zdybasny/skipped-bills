import { mapJsonToAccountBills } from "../../src/types/AccountBill"

import { afterEach, describe } from "mocha"
import { expect } from "chai"
import addContext from "mochawesome/addContext"
import * as mocks from "../resources/mocks/mocks"

let input: any
let result: any

describe(`AccountBill.ts`, () => {
  beforeEach(() => {
    input = undefined
    result = undefined
  })
  afterEach(function () {
    addContext(this, `input:\n${JSON.stringify(input)}`)
    addContext(this, `result:\n${JSON.stringify(result)}`)
  })

  describe(`mapJsonToAccountBills()`, () => {
    it(`should return an array of AccountBill from a json (with headers translated by Locale)`, function () {
      // given
      input = mocks.accountBillsJson()

      // when
      result = mapJsonToAccountBills(input)

      // then
      expect(result.length).to.equal(3)
      expect(result[0].title).to.equal(input[0][`Title`])
    })

    it(`should return BudgetBill[] with date of elements converted from some string format into Date()`, async function () {
      // given
      input = mocks.accountBillsJson()
      const expectedDate = new Date(Date.UTC(2022, 0, 2, 0, 0, 0, 0))

      // when
      result = mapJsonToAccountBills(input)

      // then
      expect((result[0].date as Date).toUTCString()).to.equal(
        expectedDate.toUTCString()
      )
    })

    it(`should return AccountBill[] with date of elements converted from Excel 5digit format into Date()`, async function () {
      // given // 2022-01-02T00:00:00.000Z
      input = mocks.accountBillsJson()
      const expectedDate = new Date(Date.UTC(2022, 0, 5, 0, 0, 0, 0))

      // when
      result = mapJsonToAccountBills(input)

      // then
      expect((result[2].date as Date).toUTCString()).to.equal(
        expectedDate.toUTCString()
      )
    })

    it(`should return an AccountBill with allowed empty fields`, function () {
      // given
      input = [
        {
          Status: `ok`,
          Date: `2022-03-24`,
          Title: `some tittle`,
          Amount: 25,
        },
      ]

      // when
      result = mapJsonToAccountBills(input)

      // then
      expect(result[0].shop).to.undefined
    })

    it(`should throw an error for a json not valid to AccountBill`, () => {
      // given
      input = [{}]

      // when
      const call = () => mapJsonToAccountBills(input)

      // then
      expect(call).to.throw()
    })
  })
})
