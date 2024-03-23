using Microsoft.AspNetCore.Mvc;
using OrderManager.Services.Int;

namespace OrderManager.Controllers;

[ApiController]
[Route("prodotti")]
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
}
