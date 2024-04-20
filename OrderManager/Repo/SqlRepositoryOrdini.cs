using Microsoft.EntityFrameworkCore;
using OrderManager.DB;
using OrderManager.Repo.Int;

namespace OrderManager.Repo;

public class SqlRepositoryOrdini : IRepositoryOrdini
{
    private readonly OrderManagerDBContext _dbContext;

    public SqlRepositoryOrdini(OrderManagerDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Ordine>> GetOrders()
    {
        return await _dbContext.Ordini
            .Include(x => x.RigheOrdine)
            .ToListAsync();
    }

    public async Task<Ordine> AddOrder(Ordine ordine)
    {
        await _dbContext.Ordini.AddAsync(ordine);
        await _dbContext.SaveChangesAsync();

        return ordine;
    }
}
