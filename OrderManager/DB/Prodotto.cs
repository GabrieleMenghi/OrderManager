namespace OrderManager.DB;

public class Prodotto
{
    public long ProdottoId { get; set; }
    public string Codice { get; set; }
    public string Descrizione { get; set; }
    public decimal Prezzo { get; set; }

    public Prodotto() { }

    public Prodotto(long prodottoId, string codice, string descrizione, decimal prezzo)
    {
        ProdottoId = prodottoId;
        Codice = codice;
        Descrizione = descrizione;
        Prezzo = prezzo;
    }

    public static Prodotto ProdottoFactory(long prodottoId, string codice, string descrizione, decimal prezzo)
    {
        return new Prodotto(prodottoId, codice, descrizione, prezzo);
    }

    public static Prodotto ProdottoFactoryCreate(string codice, string descrizione, decimal prezzo)
    {
        return new Prodotto(0, codice, descrizione, prezzo);
    }
}
