using OrderManager.DB;

namespace OrderManager.Repo.Int;

public interface IRepositoryOrdini
{
    Task<Ordine> AddOrder(Ordine ordine);
    Task<List<Ordine>> GetOrders();
}