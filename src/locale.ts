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
  }
}

type Language = `en` | `pl`

export class Locale {
  static language: Language = `pl`
  static txt: LanguagePack = {} as LanguagePack

  static setLocale = (language: Language) => {
    Locale.language = language
    Locale.txt = require(`./resources/locales/${Locale.language}.json`)
  }

  static getLocale = () => Locale.language
}
