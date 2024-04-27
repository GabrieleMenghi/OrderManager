using OrderManager.DB;
using OrderManager.Models;

namespace OrderManager.Services.Int;

public interface IOrdiniService
{
    Task<Ordine> AddOrderAsync(OrdineBL ordineBl);
    Task<List<OrdineBL>> GetOrdersAsync();
}