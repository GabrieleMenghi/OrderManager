using Microsoft.EntityFrameworkCore;
using OrderManager.DB;
using OrderManager.Repo.Int;

namespace OrderManager.Repo;

public class SqlRepositoryClienti : IRepositoryClienti
{
    private readonly OrderManagerDBContext _dbContext;

    public SqlRepositoryClienti(OrderManagerDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Cliente>> GetClienti()
    {
        return await _dbContext.Clienti.ToListAsync();
    }

    public async Task<List<Cliente>> GetClientiByName(string name)
    {
        return await _dbContext.Clienti
            .Where(x => x.Nome.Contains(name))
            .ToListAsync();
    }

    public async Task<Cliente> GetCliente(long clienteId)
    {
        return await _dbContext.Clienti.SingleOrDefaultAsync(x => x.ClienteId == clienteId);
    }
}
