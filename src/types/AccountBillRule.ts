export default interface AccountBillRule {
  collectionOperator: operator.Collection
  columns: string[]
  elementOperator: operator.Element
  conditions: Condition[]
}

export interface Condition {
  withValue: string
  outputCells: { [key: string]: string }
}

export namespace operator {
  export type Element =
    | typeof element.Equal[number]
    | typeof element.NotEqual[number]
    | typeof element.Contains[number]

  export namespace element {
    export const Equal = [`equal`, `eq`] as const
    export const NotEqual = [`notequal`, `neq`] as const
    export const Contains = [`contains`] as const
    export const NotContains = [`notcontains`] as const
    // export const greaterThan = [`greaterthan` | `gt`]
    // export const greaterThanOrEqual = [`greaterthanorequal` | `gte`]
    // export const lessThan = [`lessthan` | `lt`]
    // export const lessThanOrEqual = [`lessthanorequal` | `lte`]
  }

  export type Collection =
    | typeof collection.Any[number]
    | typeof collection.All[number]
    | typeof collection.None[number]

  export namespace collection {
    export const Any = [`any`] as const
    export const All = [`all`] as const
    export const None = [`none`] as const
  }
}

export const mapJsonToAccountBillRules = (json: any[]): AccountBillRule[] => {
  return json.map((rule) => {
    return {
      columns: rule.columns,
      collectionOperator: (
        rule.collectionWay as string
      ).toLowerCase() as operator.Collection,
      elementOperator: (
        rule.elementWay as string
      ).toLowerCase() as operator.Element,
      conditions: rule.conditions,
    }
  })
}