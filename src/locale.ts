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

type Language = `en` | `pl`
let language: Language = `en`
let txt: LanguagePack | undefined

export default () => {
  if (!txt) {
    setLocale(language)
  }
  return txt
}

export const setLocale = (language: Language) => {
  language = language
  const newTxt = require(`./resources/locales/${language}.json`)
  txt = newTxt
}

// TODO - Validate if loaded language implements LanguagePack interface
