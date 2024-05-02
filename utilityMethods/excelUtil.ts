import * as Excel from 'exceljs';

/**
 * A util to read and update excel files.
 * @author Vinay Nanjappa
 */
export class ExcelUtil {

    private fileName: string;
    private sheetName = '';
    private sheetIndex = -1;

    /**
     * Create the ExcelUtil.
     * @param fileName The file name. Ensure the file is in the root project directory (The
     * same directory that the package.json exists.)
     * @param sheetName Here you can either pass the sheet name or the sheet index. If sheet name, 
     * then pass a string value and if it is a sheet number then pass a number value.
     */
    constructor(fileName: string, sheet: string | number) {
        this.fileName = fileName;
        if (typeof sheet === 'string') {
            this.sheetName = sheet;
        } else {
            this.sheetIndex = sheet;
        }
    }
 
    /**
     * Get the number of rows in the Excel provided.
     * @returns The number of rows in the sheet.
     */
    public async getRowCount() {
        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(this.fileName);
        let worksheet: Excel.Worksheet;
        if (this.sheetName !== '') {
            worksheet = content.getWorksheet(this.sheetName);
        } else if (this.sheetIndex !== -1){
            worksheet = content.worksheets[this.sheetIndex]; 
        } else {
            return Error("Invalid sheet name or sheet index");
        }
        return worksheet.actualRowCount;
        } 

    /**
     * Get the number of columns in the Excel provided.
     * @returns The number of columns in the sheet.
     */    
    public async getColumnCount() {
        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(this.fileName);
        let worksheet: Excel.Worksheet;
        if (this.sheetName !== '') {
            worksheet = content.getWorksheet(this.sheetName);
        } else if (this.sheetIndex !== -1){
            worksheet = content.worksheets[this.sheetIndex]; 
        } else {
            return Error("Invalid sheet name or sheet index");
        }
        return worksheet.actualColumnCount;
        } 

  
    /**
     * Get the value of a cell.
     * @param columnKey The column key.
     * @param rowNumber The row number.
     * @returns The cell value.
     */
    public async getCellValue(columnKey: string, rowNumber: number) {
        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(this.fileName);
        let worksheet: Excel.Worksheet;
        if (this.sheetName !== '') {
            worksheet = content.getWorksheet(this.sheetName);
        } else if (this.sheetIndex !== -1){
            worksheet = content.worksheets[this.sheetIndex]; 
        } else {
            return Error("Invalid sheet name or sheet index");
        }
        const row = worksheet.getRow(rowNumber);
        return row.getCell(columnKey).text;
        } 

    /**
     * Update the cell value by passing the column key and the row number.
     * @param columnKey The column key.
     * @param rowNumber The row number.
     * @param value The value that you want to insert into the cell.
     */
    public async updateCellValue(columnKey: string, rowNumber: number, value: string) {
        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(this.fileName);
        let worksheet: Excel.Worksheet;
        if (this.sheetName !== '') {
            worksheet = content.getWorksheet(this.sheetName);
        } else if (this.sheetIndex !== -1){
            worksheet = content.worksheets[this.sheetIndex]; 
        } else {
            return Error("Invalid sheet name or sheet index");
        }
        const row = worksheet.getRow(rowNumber);
        row.getCell(columnKey).value = value;
        row.commit;
        await workbook.xlsx.writeFile(this.fileName);
    }

    
    public async readDataProviderTestDataFromExcel(filePath: string): Promise<any[]> {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);

      // Assuming data is in the first worksheet
        const worksheet = workbook.getWorksheet(1); 
        let data: any[] = [];
      
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            const rowData: any = {};
            row.eachCell((cell, colNumber) => {
              rowData[worksheet.getCell(1, colNumber).text] = cell.value;
            });
            data.push(rowData);
          }
        });
      
        return data;
      }
    
}