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

    public async Task<List<Prodotto>> UpsertProdottoListAsync(List<Prodotto> prodottiToUpsert)
    {
        var upsertedProdotti = new List<Prodotto>();
        foreach (var prodotto in prodottiToUpsert)
        {
            var upsertedProdotto = await _prodottiRepo.UpsertProdotto(prodotto);
            upsertedProdotti.Add(upsertedProdotto);
        }
        return upsertedProdotti;
    }

    public async Task<Prodotto> UpdateProdottoAsync(Prodotto prodotto)
    {
        return await _prodottiRepo.UpdateProdottoAsync(prodotto);
    }

    public async Task DeleteProdottoAsync(Prodotto prodotto)
    {
        await _prodottiRepo.DeleteProdottoAsync(prodotto);
    }
}
