using OrderManager.DB;
using OrderManager.Repo.Int;
using OrderManager.Services.Int;

namespace OrderManager.Services;

public class ProdottiService : IProdottiService
{
    private readonly IRepositoryProdotti _prodottiRepo;

    public ProdottiService(IRepositoryProdotti prodottiRepo)
    {
        _prodottiRepo = prodottiRepo;
    }

    public async Task<List<Prodotto>> GetProdottiAsync()
    {
        return await _prodottiRepo.GetProdotti();
    }
}
