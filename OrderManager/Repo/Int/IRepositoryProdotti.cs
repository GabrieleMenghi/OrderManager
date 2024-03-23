using OrderManager.DB;

namespace OrderManager.Repo.Int;

public interface IRepositoryProdotti
{
    Task<List<Prodotto>> GetProdotti();
    Task<List<Prodotto>> GetProdottiByDescrizione(string descrizione);
    Task<List<Prodotto>> GetProdottiByCodice(string codice);
    Task<Prodotto> AddProdotto(Prodotto prodotto);
}
