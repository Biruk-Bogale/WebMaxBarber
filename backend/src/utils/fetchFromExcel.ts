/* eslint-disable @typescript-eslint/no-explicit-any */
import xlsx from 'xlsx';
import fs from 'fs';
import logger from '../config/logger.js';

// Define a standard return type
interface ExcelFetchResult {
  success: boolean;
  data?: any[];
  message?: string;
}

export async function fetchFromExcel({
  filePath,
  columns,
}: {
  filePath: string;
  columns: string[];
}): Promise<ExcelFetchResult> {
  try {
    if (!filePath) {
      throw new Error('Invalid file path provided.');
    }

    // 1. Read the file
    const workbook = xlsx.readFile(filePath);
    if (!workbook?.SheetNames.length) {
      throw new Error('Invalid Excel file: No sheets found.');
    }

    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new Error('Failed to upload file.');
    }

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error('Failed to upload file.');
    }

    // 2. Extract Headers to validate columns
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = (jsonData[0] as string[]) || [];
    const missingHeaders = columns.filter((h) => !headers.includes(h));

    if (missingHeaders.length > 0) {
      return {
        success: false,
        message: `Missing required headers: ${missingHeaders.join(', ')}`,
      };
    }

    // 3. Extract Data
    const sheetData = xlsx.utils.sheet_to_json(worksheet);

    if (sheetData.length === 0) {
      return {
        success: false,
        message: 'No data found in the Excel sheet.',
      };
    }

    // 4. Map data to ensure only requested columns are returned
    const values = sheetData.map((row) => {
      const obj: Record<string, any> = {};
      columns.forEach((col) => {
        obj[col] = (row as any)[col] || null;
      });
      return obj;
    });

    return {
      success: true,
      data: values,
    };
  } catch (error: any) {
    logger.error(`Excel Import Error: ${error.message}`);
    return {
      success: false,
      message: error.message || 'Failed to process Excel file.',
    };
  } finally {
    // 5. Cleanup File
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (cleanupError: any) {
      logger.error(`Failed to delete temp file: ${cleanupError.message}`);
    }
    // Note: Removed dbTransaction logic here.
    // This function should purely handle File I/O, not DB connections.
  }
}
