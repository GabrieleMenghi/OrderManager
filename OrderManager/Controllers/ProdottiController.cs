using Commons.Helpers;
using Microsoft.AspNetCore.Mvc;
using OrderManager.Services.Int;
using System.Data;
using System.Web.Http.Cors;

namespace OrderManager.Controllers;

[Route("api/prodotti")]
[ApiController]
public class ProdottiController : ControllerBase
{
    private readonly IProdottiService _prodottiService;

    public ProdottiController(IProdottiService prodottiService)
    {
        _prodottiService = prodottiService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProdottiAsync()
    {
        return Ok(await _prodottiService.GetProdottiAsync());
    }

    [HttpGet("ProvaExcel")]
    public async Task<IActionResult> ProvaReadExcel()
    {
        try
        {
            //List<object> rowsString = new();
            DataTable dt = ExcelHelper.ReadExcel(@"C:\Users\Gabriele\Desktop\Prova.xlsx");
            foreach (DataRow row in dt.Rows)
            {
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    var rowValue = row[i].ToString();
                    if (i == 3)
                    {
                        Console.WriteLine(decimal.Parse(rowValue));
                        //rowsString.Add(decimal.Parse(row[i].ToString()));
                    }
                    else
                    {
                        Console.WriteLine(rowValue);
                        //rowsString.Add(row[i].ToString());
                    }
                }
            }
            return Ok(/*rowsString*/);
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}
