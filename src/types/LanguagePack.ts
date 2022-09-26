export interface LanguagePack {
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
      comment: string
    }
    cellValues: {
      product: {
        undocumentedBill: string
      }
    }
  }
}
