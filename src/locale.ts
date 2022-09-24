import { defaultLanguage } from "./globals"

interface LanguagePack {
  account: {
    sheetName: string
    headers: {
      shop: string
      account: string
      status: string
      date: string
      title: string
      prise: string
    }
    cellValues: {
      accountStatus: {
        ok: string
        skipped: string
      }
    }
  }
  budget: {
    sheetName: string
    headers: {
      date: string
      no: string
      shop_type: string
      shop: string
      total: string
      productType: string
      product: string
      prise: string
    }
    cellValues: {
      product: {
        undocumentedBill: string
      }
    }
  }
}

let txt: LanguagePack | undefined

export default () => {
  if (!txt) {
    setLocale(defaultLanguage)
  }
  return txt
}

export const setLocale = (language: string) => {
  let newTxt
  try {
    newTxt = require(`./resources/locales/${language}.json`)
  } catch (err) {
    console.error(
      `Error: Cannot find language pack "${language}". Please provide a valid language pack in file ./resources/locales/${language}.json`
    )
    process.exit(1)
  }
  txt = newTxt
}

// TODO - Validate if loaded language implements LanguagePack interface
