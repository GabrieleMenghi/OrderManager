namespace OrderManager.Models.Requests.Api;

public class ImportProdottiFromExcelApiRequest
{
    public string FileName { get; set; }

    public ImportProdottiFromExcelApiRequest(string fileName)
    {
        FileName = fileName;
    }

    public static ImportProdottiFromExcelApiRequest ImportProdottiFromExcelApiRequestFactory(string fileName)
    {
        return new ImportProdottiFromExcelApiRequest(fileName);
    }
}
