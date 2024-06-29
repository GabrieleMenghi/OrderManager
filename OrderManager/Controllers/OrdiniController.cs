using Microsoft.AspNetCore.Mvc;
using OrderManager.DB;
using OrderManager.Models;
using OrderManager.Models.Requests.Api;
using OrderManager.Services.Int;
using SelectPdf;

namespace OrderManager.Controllers;

[Route("api/ordini")]
[ApiController]
public class OrdiniController : ControllerBase
{
    private readonly IOrdiniService _ordiniService;

    public OrdiniController(IOrdiniService ordiniService)
    {
        _ordiniService = ordiniService;
    }

    [HttpGet]
    public async Task<List<OrdineBL>> GetOrdiniAsync()
    {
        return await _ordiniService.GetOrdersAsync();
    }

    [HttpPost("AddOrder")]
    public async Task<IActionResult> AddOrderAsync([FromBody] AddOrderApiRequest request)
    {
        // Salvataggio su db
        await _ordiniService.AddOrderAsync(request.Ordine);

        // Creazione pdf
        try
        {
            var pdfFile = await _ordiniService.GeneratePdfFromHtmlString(request.Ordine);
            return File(pdfFile, "application/pdf", "Prova.pdf");
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpGet("GetOrdineConRighe")]
    public async Task<OrdineBL> GetOrdineConRighe(long ordineId)
    {
        try
        {
            return await _ordiniService.GetOrdineBlConRigheAsync(ordineId);
        }
        catch(Exception)
        {
            throw;
        }
    }
}
