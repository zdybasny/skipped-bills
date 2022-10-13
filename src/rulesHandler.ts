import AccountBillRule, { operator } from "./types/AccountBillRule"
import AccountBill from "./types/AccountBill"

export const applyRulesToAccountBills = (
  accountBills: any[],
  accountBillRules: AccountBillRule[]
): any[] => {
  accountBillRules.forEach((rule) => {
    // validateRule(rule)
    logComparison(rule)
    accountBills = applyRuleToAccountBills(accountBills, rule)
  })
  return accountBills
}

const applyRuleToAccountBills = (
  accountBills: any[],
  rule: AccountBillRule
): any[] => {
  const elementOperation = getElementOperation(rule)
  const collectionOperation = getCollectionOperation(rule, elementOperation)

  accountBills.forEach((accountBill: any) => {
    const columnValues = rule.columns.map((column) => {
      if (accountBill[column] === undefined) {
        throw new Error(`Column "${column}" not found in account bill.`)
      }
      return accountBill[column]
    })

    rule.conditions.forEach((condition) => {
      const isRuleMatched = collectionOperation(
        columnValues,
        condition.withValue
      )

      if (isRuleMatched) {
        accountBill = updateMatchedAccountBill(
          accountBill,
          condition.outputCells
        )
      }
    })
  })
  return accountBills
}

const logComparison = (compareCollectionArgs: AccountBillRule) => {
  console.log(`\n Compare`)
  console.log(`columns: ${compareCollectionArgs.columns}`)
  console.log(`in collection way: ${compareCollectionArgs.collectionOperator}`)
  console.log(`in element way: ${compareCollectionArgs.elementOperator}`)
}

const getElementOperation = (
  rule: AccountBillRule
): ((element1: string, element2: string) => boolean) => {
  const { elementOperator } = rule

  if (isOperator(elementOperator, operator.element.Equal)) {
    return (element1: any, element2: any) =>
      element1.toLowerCase() === element2.toLowerCase()
  }
  if (isOperator(elementOperator, operator.element.NotEqual)) {
    return (element1: any, element2: any) =>
      element1.toLowerCase() !== element2.toLowerCase()
  }
  if (isOperator(elementOperator, operator.element.Contains)) {
    return (element1: any, element2: any) =>
      element1?.toLowerCase().indexOf(element2.toLowerCase()) > -1
  }
  if (isOperator(elementOperator, operator.element.NotContains)) {
    return (element1: any, element2: any) =>
      element1?.toLowerCase().indexOf(element2.toLowerCase()) === -1
  }
}

const getCollectionOperation = (
  rule: AccountBillRule,
  elementOperation: (element1: any, element2: any) => boolean
) => {
  const { collectionOperator } = rule
  if (isOperator(collectionOperator, operator.collection.Any)) {
    return (collection: any[], value: any) =>
      collection.some((element) => elementOperation(element, value))
  }
  if (isOperator(collectionOperator, operator.collection.All)) {
    return (collection: any[], value: any) =>
      collection.every((element) => elementOperation(element, value))
  }
  if (isOperator(collectionOperator, operator.collection.None)) {
    return (collection: any[], value: any) =>
      collection.every((element) => !elementOperation(element, value))
  }
}

const updateMatchedAccountBill = (
  accountBill: any,
  outputCells: any
): AccountBill => {
  Object.keys(outputCells).forEach((cell) => {
    const outputCellValue = outputCells[cell]
    accountBill[cell] = outputCellValue
  })
  return accountBill
}

const isOperator = (
  operator: operator.Element | operator.Collection,
  type: readonly any[]
): boolean => {
  return type.includes(operator)
}
