using OrderManager.DB;

namespace OrderManager.Services.Int;

public interface IProdottiParserService
{
    bool CheckFileExists(string filePath);
    List<Prodotto> GetProdottiFromExcelFile(string filePath);
}
