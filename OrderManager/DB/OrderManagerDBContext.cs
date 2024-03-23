using Microsoft.EntityFrameworkCore;

namespace OrderManager.DB;

public class OrderManagerDBContext : DbContext
{
    public OrderManagerDBContext(DbContextOptions<OrderManagerDBContext> options) : base(options)
    { }

    public DbSet<Prodotto> Prodotti { get; set; }
}
