using Commons.Helpers;
using OrderManager.DB;
using OrderManager.Services.Int;
using System.Data;

namespace OrderManager.Services;

public class ProdottiParserService : IProdottiParserService
{
    public bool CheckFileExists(string filePath)
    {
        try
        {
            FileInfo fileInfo = new FileInfo(filePath);
            if (fileInfo.Exists)
            {
                return true;
            }
            return false;
        }
        catch
        {
            return false;
        }
    }

    public List<Prodotto> GetProdottiFromExcelFile(string filePath)
    {
        List<Prodotto> prodotti = new();
        try
        {
            DataTable dt = ExcelHelper.ReadExcel(filePath);
            int indiceColonna = 0;
            foreach (DataRow row in dt.Rows)
            {
                indiceColonna = 0;//A
                string codice = (string)row[indiceColonna];

                indiceColonna = 1;//B
                string descrizione = (string)row[indiceColonna];

                indiceColonna = 2;//C
                decimal prezzo = decimal.Parse(row[indiceColonna].ToString());

                var prodotto = Prodotto.ProdottoFactoryCreate(codice, descrizione, prezzo);
                prodotti.Add(prodotto);
            }
            return prodotti;
        }
        catch(Exception)
        {
            return prodotti;
        }
    }
}
