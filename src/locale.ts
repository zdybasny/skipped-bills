import { defaultLanguage } from "./globals"
import { LanguagePack } from "./types/LanguagePack"

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
  } catch (e) {
    throw new Error(
      `Cannot find language pack "${language}". Please provide a valid language pack in file ./resources/locales/${language}.json`
    )
  }
  txt = newTxt
  console.log(`Using locale: ${JSON.stringify(txt)}`)
}

// TODO - Validate if loaded language implements LanguagePack interface
