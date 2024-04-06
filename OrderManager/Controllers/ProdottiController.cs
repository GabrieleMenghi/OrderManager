using Commons.Helpers;
using Microsoft.AspNetCore.Mvc;
using OrderManager.Models.Requests.Api;
using OrderManager.Services.Int;
using System.Data;
using System.Web.Http.Cors;

namespace OrderManager.Controllers;

[Route("api/prodotti")]
[ApiController]
public class ProdottiController : ControllerBase
{
    private readonly IProdottiService _prodottiService;
    private readonly IProdottiParserService _prodottiParserService;

    public ProdottiController(IProdottiService prodottiService, IProdottiParserService prodottiParserService)
    {
        _prodottiService = prodottiService;
        _prodottiParserService = prodottiParserService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProdottiAsync()
    {
        return Ok(await _prodottiService.GetProdottiAsync());
    }

    [HttpGet("ImportProdottiFromExcel")]
    public async Task<IActionResult> ImportProdottiFromExcelAsync(ImportProdottiFromExcelApiRequest request)
    {
        //string filename = @"C:\Users\Gabriele\Desktop\Prova.xlsx";
        var fileExists = _prodottiParserService.CheckFileExists(request.FileName);
        if(fileExists)
        {
            var prodotti = _prodottiParserService.GetProdottiFromExcelFile(request.FileName);
            var prodottiUpserted = await _prodottiService.UpsertProdottoListAsync(prodotti);
            return Ok(prodottiUpserted);
        }
        else
        {
            return NotFound("File non esistente");
        }
    }
}
