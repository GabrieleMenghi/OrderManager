﻿using Microsoft.EntityFrameworkCore;

namespace OrderManager.DB;

public class OrderManagerDBContext : DbContext
{
    public OrderManagerDBContext(DbContextOptions<OrderManagerDBContext> options) : base(options)
    { }

    public DbSet<Prodotto> Prodotti { get; set; }
    public DbSet<Cliente> Clienti { get; set; }
    public DbSet<RigaOrdine> RigheOrdini { get; set; }
    public DbSet<Ordine> Ordini { get; set; }
}
