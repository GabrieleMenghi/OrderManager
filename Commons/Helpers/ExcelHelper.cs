using IronXL;
using System.Data;

namespace Commons.Helpers;

public static class ExcelHelper
{
    public static DataTable ReadExcel(string fileName)
    {
        WorkBook workbook = WorkBook.Load(fileName);
        //// Work with a single WorkSheet.
        ////you can pass static sheet name like Sheet1 to get that sheet
        ////WorkSheet sheet = workbook.GetWorkSheet("Sheet1");
        //You can also use workbook.DefaultWorkSheet to get default in case you want to get first sheet only
        WorkSheet sheet = workbook.DefaultWorkSheet;
        //Convert the worksheet to System.Data.DataTable
        //Boolean parameter sets the first row as column names of your table.
        return sheet.ToDataTable(true);
    }

    public static DataRowCollection ReadExcelToDataRows(string fileName)
    {
        var dt = ReadExcel(fileName);
        var rows = dt.Rows;
        return rows;
    }

    public static DataTable ReadExcelFromStream(Stream stream)
    {
        WorkBook workbook = WorkBook.Load(stream);
        //// Work with a single WorkSheet.
        ////you can pass static sheet name like Sheet1 to get that sheet
        ////WorkSheet sheet = workbook.GetWorkSheet("Sheet1");
        //You can also use workbook.DefaultWorkSheet to get default in case you want to get first sheet only
        WorkSheet sheet = workbook.DefaultWorkSheet;
        //Convert the worksheet to System.Data.DataTable
        //Boolean parameter sets the first row as column names of your table.
        return sheet.ToDataTable(true);
    }

    public static DataRowCollection ReadExcelToDataRowsFromStream(Stream stream)
    {
        var dt = ReadExcelFromStream(stream);
        var rows = dt.Rows;
        return rows;
    }
}
