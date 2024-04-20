using Microsoft.AspNetCore.Mvc;
using OrderManager.Models;
using OrderManager.Models.Requests.Api;
using OrderManager.Services.Int;

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

    [HttpPost]
    public async Task GetOrdiniAsync(GetOrdiniApiRequest request)
    {
        await _ordiniService.AddOrderAsync(request.Ordine, request.RigheOrdine);
    }
}
