import { afterEach, describe } from "mocha"
import { expect } from "chai"
import { stub } from "sinon"
import addContext from "mochawesome/addContext"

import * as globals from "../src/globals"
import * as xlsx from "../src/xlsxHandler"
import txt from "../src/locale"
import { AccountBill, BudgetBill } from "../src/types"

const mocks = {
  paths: {
    accountBills: `./tests/resources/accountBills.xlsx`,
    budgetMissedBills: `./tests/resources/budgetMissedBills.xlsx`,
  },
} as const

describe(`xlsxHandler.ts`, () => {
  describe(`readWorksheetFromXlsxFile()`, () => {
    it(`should return an array of given type from a xlsx file`, async function () {
      // given
      stub(globals.paths, `accountBills`).value(mocks.paths.accountBills)

      // when
      const result: any = await xlsx.readWorksheetFromXlsxFile<AccountBill>(
        globals.paths.accountBills,
        txt().account.sheetName
      )
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result.length).to.equal(2)
      expect(result[0].title).to.equal(`some tittle`)
    })
  })

  describe(`mapJsonToAccountBills()`, () => {
    it(`should return an array of AccountBill from a json`, function () {
      // given
      const json = jsonMocks.accountBills()

      // when
      const result: AccountBill[] = xlsx.mapJsonToAccountBills(json)
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result.length).to.equal(2)
      expect(result[0].title).to.equal(json[0].title)
    })
    it(`should return an AccountBill with allowed empty fields`, function () {
      // given
      const json = [
        {
          status: `ok`,
          date: `2022-03-24`,
          title: `some tittle`,
          prise: 25,
        },
      ]

      // when
      const result: AccountBill[] = xlsx.mapJsonToAccountBills(json)
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result[0].shop).to.undefined
    })
    it(`should throw an error for a json not valid to AccountBill`, () => {
      // given
      const json = [{}] as any

      // when
      const call = () => xlsx.mapJsonToAccountBills(json)

      // then
      expect(call).to.throw()
    })
  })

  describe(`mapJsonToAccountBills()`, () => {
    it(`should return an array of BudgetBill from a json`, function () {
      // given
      const json = jsonMocks.budgetBills()

      // when
      const result: BudgetBill[] = xlsx.mapJsonToBudgetBills(json)
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result.length).to.equal(3)
      expect(result[0].total).to.equal(json[0].total)
    })
    it(`should return an BudgetBill with allowed empty fields`, function () {
      // given
      const json = [
        {
          date: `2022-03-24`,
          no: 1,
        },
      ]

      // when
      const result: BudgetBill[] = xlsx.mapJsonToBudgetBills(json)
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result[0].shop_type).to.undefined
      expect(result[0].shop).to.undefined
      expect(result[0].total).to.undefined
      expect(result[0].productType).to.undefined
      expect(result[0].product).to.undefined
      expect(result[0].prise).to.undefined
    })
    it(`should throw an error for a json not valid to BudgetBill`, () => {
      // given
      const json = [{}] as any

      // when
      const call = () => xlsx.mapJsonToBudgetBills(json)

      // then
      expect(call).to.throw()
    })
  })
})

const jsonMocks = {
  accountBills: () => [
    {
      shop: `shop 1`,
      status: `ok`,
      date: `2022-03-24`,
      title: `some tittle`,
      prise: 25,
    },
    {
      shop: `shop 2`,
      status: `SKIPPED`,
      date: `2022-03-28`,
      title: `some other tittle`,
      prise: 12.5,
    },
  ],
  budgetBills: () => [
    {
      date: `2022-03-24`,
      no: 1,
      shop_type: `shop type 1`,
      shop: `shop 1`,
      total: 25,
      productType: `product type 1`,
      product: `product 1`,
      prise: 25,
    },
    {
      date: `2022-03-28`,
      no: 2,
      shop_type: `shop type 2`,
      shop: `shop 2`,
      total: 75.5,
      productType: `product type 2`,
      product: `product 2`,
      prise: 50,
    },
    {
      date: `2022-03-28`,
      no: 2,
      shop_type: `shop type 2`,
      shop: `shop 2`,
      total: 75.5,
      productType: `product type 2`,
      product: `product 3`,
      prise: 12.5,
    },
  ],
}
