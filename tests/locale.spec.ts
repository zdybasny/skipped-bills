import txt, { setLocale } from "../src/locale"

import { expect } from "chai"
import { assert } from "console"
import { restore } from "sinon"

describe(`locale.ts`, () => {
  beforeEach(() => {
    restore()
  })

  describe(`txt()`, () => {
    it(`should be defined in default language (en)`, () => {
      // given

      // when
      const result = txt()

      // then
      expect(result.account.headers.account).is.equal(`Account`)
    })
  })

  describe(`setLocale()`, () => {
    afterEach(() => {
      setLocale(`en`)
    })

    it(`should reload locale for given language`, function () {
      this.timeout(40000)
      // given
      assert(txt().budget.headers.no === `no`)

      // when
      setLocale(`pl`)
      // const result = txt()

      // then
      const result = txt()
      expect(txt().budget.headers.no).is.equal(`l.p.`)
    })

    it(`should throw error when given language is not supported`, () => {
      // given

      // when
      const call = () => setLocale(`invalid`)

      // then
      expect(call).to.throw()
    })
  })
})
