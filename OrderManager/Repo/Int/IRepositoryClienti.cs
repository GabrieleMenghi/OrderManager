using OrderManager.DB;

namespace OrderManager.Repo.Int;

public interface IRepositoryClienti
{
    Task<List<Cliente>> GetClienti();
    Task<List<Cliente>> GetClientiByName(string name);
    Task<Cliente> GetCliente(long clienteId);
}
