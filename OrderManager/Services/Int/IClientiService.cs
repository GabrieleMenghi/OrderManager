using OrderManager.DB;

namespace OrderManager.Services.Int;

public interface IClientiService
{
    Task<List<Cliente>> GetClientiAsync();
}
