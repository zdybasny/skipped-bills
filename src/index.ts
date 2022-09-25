import { setLocale } from "./locale"
import * as globals from "./globals"
import main from "./main"
import { getSystemErrorMap } from "util"

try {
  process.argv.forEach((val: string) => {
    const option = val.split(`=`)
    if (option[0] === `--help`) {
      console.log(globals.helpDescription)
      process.exit(0)
    }
    if (option[0] === `--write-to-json`) {
      globals.options.hasWriteToJson = true
    }

    if (option[0] === `--accountBills`) {
      globals.paths.accountBills = option[1]
    }
    if (option[0] === `--budgetBills`) {
      globals.paths.budgetBills = option[1]
    }
    if (option[0] === `--budgetSkippedBills`) {
      globals.paths.budgetSkippedBills = option[1]
    }
    if (option[0] === `--locale`) {
      setLocale(option[1])
    }
  })

  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}

export default () => {}
