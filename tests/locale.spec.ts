import txt, { setLocale } from "../src/locale"

import { expect } from "chai"
import { assert } from "console"
import { stub } from "sinon"

describe(`locale.ts`, () => {
  describe(`txt()`, () => {
    it(`should be defined in default language (en)`, () => {
      // given

      // when
      const result = txt()

      // then
      expect(result.account.headers.account).is.equal(`account`)
    })
  })

  describe(`setLocale()`, () => {
    afterEach(() => {
      setLocale(`en`)
    })

    it(`should reload locale for given language`, () => {
      // given
      assert(txt().account.headers.account === `account`)

      // when
      setLocale(`pl`)
      const result = txt()

      // then
      expect(txt().account.headers.account).is.equal(`konto`)
    })

    it(`should throw error when given language is not supported`, () => {
      // given
      const error = stub(console, `error`)
      const exit = stub(process, `exit`)

      // when
      setLocale(`invalid`)

      // then
      expect(error.called).is.true
      expect(exit.called).is.true
    })
  })
})
