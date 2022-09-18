export interface AccountBill {
  date: string
  prise: number
  shop?: string
  title: string
  status: string
}

export type BudgetBill = {
  date: string
  no: number
  shop_type?: string
  shop?: string
  total?: number
  productType?: string
  product?: string
  prise?: number
}
