using OrderManager.DB;
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
}
