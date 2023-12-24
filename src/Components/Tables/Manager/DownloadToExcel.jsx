import { Button } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const DownloadToExcel = (props) => {

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
    
        // Add header row
        worksheet.addRow(props.selectedColumns);
    
        // Add data rows
        props.table.forEach((row) => {
          const rowData = props.selectedColumns.map((column) => {
            if (column === 'userEnglishDateOfBirth' || column === 'staffEmploymentStartDate') {
              // Format the date column
              return row[column] ? new Date(row[column]).toISOString().split('T')[0] : null;
            }
            return row[column];
          });
          worksheet.addRow(rowData);
        });
    
        // Generate blob
        const blob = await workbook.xlsx.writeBuffer();
    
        // Save the blob
        saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${props.type}`);
      };

    return <Button variant="contained" onClick={handleExport}>
        הורדה לקובץ אקסל
    </Button>
}

export default DownloadToExcel;