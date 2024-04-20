namespace OrderManager.DB;

public class RigaOrdine
{
    public long RigaOrdineId { get; set; }
    public long ProdottoId { get; set; }
    public string UnitaDiMisura { get; set; }
    public int Quantita { get; set; }

    public virtual Prodotto Prodotto { get; set; }

    public RigaOrdine()
    {

    }

    public RigaOrdine(long rigaOrdineId, long prodottoId, string unitaDiMisura, int quantita)
    {
        RigaOrdineId = rigaOrdineId;
        ProdottoId = prodottoId;
        UnitaDiMisura = unitaDiMisura;
        Quantita = quantita;
    }

    public static RigaOrdine RigaOrdineFactory(long rigaOrdineId, long prodottoId, string unitaDiMisura, int quantita)
    {
        return new RigaOrdine(rigaOrdineId, prodottoId, unitaDiMisura, quantita);
    }

    public static RigaOrdine RigaOrdineFactoryCreate(long prodottoId, string unitaDiMisura, int quantita)
    {
        return new RigaOrdine(0, prodottoId, unitaDiMisura, quantita);
    }
}
