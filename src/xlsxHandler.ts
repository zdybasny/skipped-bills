import * as XLSX from "xlsx"

export const readWorksheetFromXlsxFile = async (
  filePath: string,
  sheetName: string
): Promise<any[]> => {
  const workbook = XLSX.readFile(filePath)
  const worksheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(worksheet, {
    blankrows: false,
    rawNumbers: true,
  })
  return data
}

export const writeBudgetSkippedBillsToXlsx = async (
  path: string,
  records: any[]
) => {
  // console.log(`records: ${JSON.stringify(records)}`)
  const yyyy_mm_dd = new Date().toISOString().split(`T`)[0]
  const workSheetName = `skippedBills_${yyyy_mm_dd}_`
  console.log(`workSheetName: ${workSheetName}`)

  const workSheet = XLSX.utils.json_to_sheet(records)
  const workBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName, true)
  XLSX.writeFile(workBook, path, { WTF: true })
}
