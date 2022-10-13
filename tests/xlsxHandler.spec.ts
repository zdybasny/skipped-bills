import { afterEach, describe } from "mocha"
import { expect } from "chai"
import { restore, stub } from "sinon"
import addContext from "mochawesome/addContext"
import * as mocks from "./resources/mocks/mocks"

import * as globals from "../src/globals"
import * as xlsx from "../src/xlsxHandler"
import txt from "../src/locale"
import { exec } from "child_process"
import fs from "fs"

describe(`xlsxHandler.ts`, () => {
  beforeEach(function () {
    restore()
  })
  afterEach(() => {
    globals.paths.accountBills = mocks.paths.accountBills
    globals.paths.budgetBills = mocks.paths.budgetBills
    globals.paths.budgetSkippedBills = mocks.paths.budgetMissedBills
  })

  describe(`readWorksheetFromXlsxFile()`, () => {
    it(`should return an array of AccountBill as a json type from a xlsx file`, async function () {
      // given
      stub(globals.paths, `accountBills`).value(mocks.paths.accountBills)

      // when
      const result: any[] = await xlsx.readWorksheetFromXlsxFile(
        globals.paths.accountBills,
        txt().account.sheetName
      )
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result).to.deep.equal(mocks.accountBillsJson())
    })

    it(`should return an array of BudgetBill as a json type from a xlsx file`, async function () {
      // given
      stub(globals.paths, `budgetBills`).value(mocks.paths.budgetBills)

      // when
      const result: any[] = await xlsx.readWorksheetFromXlsxFile(
        globals.paths.budgetBills,
        txt().budget.sheetName
      )
      addContext(this, `result:\n ${JSON.stringify(result)}`)

      // then
      expect(result).to.deep.equal(mocks.budgetBillsJson())
    })
  })

  describe(`writeBudgetSkippedBillsToXlsx()`, () => {
    beforeEach(() => {
      exec(`rm -f ${mocks.paths.budgetMissedBills}`)
    })

    it(`should write an array of BudgetBill to a xlsx`, async function () {
      // given

      const bills = mocks.budgetBillsJson()
      const path = mocks.paths.budgetMissedBills

      // when
      await xlsx.writeBudgetSkippedBillsToXlsx(path, bills)

      // then
      const file = fs.readFileSync(path)
      expect(file).to.not.undefined
    })
  })
})
