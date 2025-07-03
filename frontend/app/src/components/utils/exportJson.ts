import { saveAs } from "file-saver";

/**
 * Xuất dữ liệu thành file JSON và tải xuống.
 * @param data - Dữ liệu cần export
 * @param fileName - Tên file muốn lưu (không cần đuôi .json)
 */

export function exportToJson<T>(data: T[], fileName: string) {
  const jsonString = JSON.stringify(data, null, 2); // pretty format
  const blob = new Blob([jsonString], { type: "application/json" });
  saveAs(blob, `${fileName}.json`);
}
