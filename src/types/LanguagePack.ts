export interface LanguagePack {
  account: {
    sheetName: string
    headers: {
      shop: string
      account: string
      date: string
      title: string
      amount: string
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
      amount: string
      comment: string
    }
    cellValues: {
      product: {
        undocumentedBill: string
      }
    }
  }
}
