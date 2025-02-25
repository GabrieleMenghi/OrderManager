using OrderManager.DB;
using OrderManager.Models.Requests.Api;
using OrderManager.Repo.Int;
using OrderManager.Services.Int;

namespace OrderManager.Services;

public class ClientiService : IClientiService
{
    private readonly IRepositoryClienti _clientiRepo;

    public ClientiService(IRepositoryClienti clientiRepo)
    {
        _clientiRepo = clientiRepo;
    }

    public async Task<List<Cliente>> GetClientiAsync()
    {
        return await _clientiRepo.GetClienti();
    }

    public async Task<Cliente> CreateClienteAsync(CreateClienteApiRequest request)
    {
        var clienteToAdd = Cliente.ClienteFactoryCreate(request.CodiceCliente, request.Nome, request.Indirizzo, request.Telefono, request.PartitaIva, request.CodiceFiscale, request.CodiceUnivoco);
        var clienteAdded = await _clientiRepo.CreateClienteAsync(clienteToAdd);
        return clienteAdded;
    }
}
