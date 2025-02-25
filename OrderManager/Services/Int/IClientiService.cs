using OrderManager.DB;
using OrderManager.Models.Requests.Api;

namespace OrderManager.Services.Int;

public interface IClientiService
{
    Task<List<Cliente>> GetClientiAsync();
    Task<Cliente> CreateClienteAsync(CreateClienteApiRequest request);
}
