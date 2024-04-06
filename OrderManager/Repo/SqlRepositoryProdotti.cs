using Microsoft.EntityFrameworkCore;
using OrderManager.DB;
using OrderManager.Repo.Int;

namespace OrderManager.Repo;

public class SqlRepositoryProdotti : IRepositoryProdotti
{
    private readonly OrderManagerDBContext _dbContext;

    public SqlRepositoryProdotti(OrderManagerDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Prodotto>> GetProdotti()
    {
        return await _dbContext.Prodotti
            .OrderBy(x => x.Descrizione)
            .ToListAsync();
    }

    public async Task<List<Prodotto>> GetProdottiByDescrizione(string descrizione)
    {
        return await _dbContext.Prodotti
            .Where(x => x.Descrizione.Contains(descrizione))
            .OrderBy(x => x.Descrizione)
            .ToListAsync();
    }

    public async Task<List<Prodotto>> GetProdottiByCodice(string codice)
    {
        return await _dbContext.Prodotti
            .Where(x => x.Codice.Contains(codice))
            .OrderBy(x => x.Descrizione)
            .ToListAsync();
    }

    public async Task<Prodotto> AddProdotto(Prodotto prodotto)
    {
        await _dbContext.Prodotti.AddAsync(prodotto);
        await _dbContext.SaveChangesAsync();

        return prodotto;
    }

    public async Task<Prodotto> UpsertProdotto(Prodotto prodotto)
    {
        var oldProdotto = await _dbContext.Prodotti.Where(x => x.Codice == prodotto.Codice).SingleOrDefaultAsync();

        if (oldProdotto == null)
        {
            // Se il prodotto non esiste lo aggiungo
            return await this.AddProdotto(prodotto);
        }
        else
        {
            // Se esiste gia', aggiorno i suoi campi
            oldProdotto.Codice = prodotto.Codice;
            oldProdotto.Descrizione = prodotto.Descrizione;
            oldProdotto.Prezzo = prodotto.Prezzo;

            await _dbContext.SaveChangesAsync();

            return oldProdotto;
        }
    }
}
