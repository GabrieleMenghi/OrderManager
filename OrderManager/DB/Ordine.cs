namespace OrderManager.DB;

public class Ordine
{
    public long OrdineId { get; set; }
    public DateTime DataCreazione { get; set; }
    public long ClienteId { get; set; }
    public bool FareFattura { get; set; }
    public string Note { get; set; }

    public virtual Cliente Cliente { get; set; }
    public virtual List<RigaOrdine> RigheOrdine { get; set; }

    public Ordine(long ordineId, DateTime dataCreazione, long clienteId, bool fareFattura, string note)
    {
        OrdineId = ordineId;
        DataCreazione = dataCreazione;
        ClienteId = clienteId;
        FareFattura = fareFattura;
        Note = note;
        RigheOrdine = new List<RigaOrdine>();
    }

    public static Ordine OrdineFactory(long ordineId, DateTime dataCreazione, long clienteId, bool fareFattura, string note)
    {
        return new Ordine(ordineId, dataCreazione, clienteId, fareFattura, note);
    }

    public static Ordine OrdineFactoryCreate(DateTime dataCreazione, long clienteId, bool fareFattura, string note)
    {
        return new Ordine(0, dataCreazione, clienteId, fareFattura, note);
    }
}
