using Microsoft.AspNetCore.Mvc;
using OrderManager.DB;
using OrderManager.Models.Requests.Api;
using OrderManager.Services.Int;

namespace OrderManager.Controllers;

[Route("api/clienti")]
[ApiController]
public class ClientiController : ControllerBase
{
    private readonly IClientiService _clientiService;

    public ClientiController(IClientiService clientiService)
    {
        _clientiService = clientiService;
    }

    [HttpGet]
    public async Task<List<Cliente>> GetClientiAsync()
    {
        return await _clientiService.GetClientiAsync();
    }

    [HttpPost("creaCliente")]
    public async Task<Cliente> CreateClienteAsync(CreateClienteApiRequest request)
    {
        return await _clientiService.CreateClienteAsync(request);
    }
}
