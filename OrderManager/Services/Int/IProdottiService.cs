﻿using OrderManager.DB;

namespace OrderManager.Services.Int;

public interface IProdottiService
{
    Task<List<Prodotto>> GetProdottiAsync();
    Task<List<Prodotto>> UpsertProdottoListAsync(List<Prodotto> prodottiToUpsert);
}
