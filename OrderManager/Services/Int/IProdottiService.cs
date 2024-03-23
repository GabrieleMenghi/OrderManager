using OrderManager.DB;

namespace OrderManager.Services.Int;

public interface IProdottiService
{
    Task<List<Prodotto>> GetProdottiAsync();
}
