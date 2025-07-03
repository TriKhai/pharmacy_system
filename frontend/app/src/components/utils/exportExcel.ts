import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Xuất danh sách dữ liệu ra file Excel
 * @param data Mảng dữ liệu cần export
 * @param fileName Tên file muốn lưu
 * @param sheetName Tên sheet trong Excel
 */

export function exportToExcel<T> (
    data: T[],
    fileName: string,
    sheetName: string = 'Sheet1'
) : void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, `${fileName}.xlsx`);
}