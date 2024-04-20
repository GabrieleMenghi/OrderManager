using System.Collections.Generic;

namespace OrderManager.Models;

public class OrdineBL
{
    public long OrdineId { get; set; }
    public DateTime DataCreazione { get; set; }
    public long ClienteId { get; set; }
    public bool FareFattura { get; set; }
    public List<RigaOrdineBL> RigheOrdine { get; set; }
    public string Note { get; set; }

    public OrdineBL()
    {

    }

    public OrdineBL(long ordineId, DateTime dataCreazione, long clienteId, bool fareFattura, List<RigaOrdineBL> righeOrdine, string note)
    {
        OrdineId = ordineId;
        DataCreazione = dataCreazione;
        ClienteId = clienteId;
        FareFattura = fareFattura;
        RigheOrdine = righeOrdine;
        Note = note;
    }

    public static OrdineBL OrdineBLFactory(long ordineId, DateTime dataCreazione, long clienteId, bool fareFattura, List<RigaOrdineBL> righeOrdine, string note)
    {
        return new OrdineBL(ordineId, dataCreazione, clienteId, fareFattura, righeOrdine, note);
    }

    public static OrdineBL OrdineBLFactoryCreate(DateTime dataCreazione, long clienteId, bool fareFattura, List<RigaOrdineBL> righeOrdine, string note)
    {
        return new OrdineBL(0, dataCreazione, clienteId, fareFattura, righeOrdine, note);
    }
}


public class RigaOrdineBL
{
    public long RigaOrdineId { get; set; }
    public long ProdottoId { get; set; }
    public string UnitaDiMisura { get; set; }
    public int Quantita { get; set; }

    public RigaOrdineBL()
    {

    }

    public RigaOrdineBL(long rigaOrdineId, long prodottoId, string unitaDiMisura, int quantita)
    {
        RigaOrdineId = rigaOrdineId;
        ProdottoId = prodottoId;
        UnitaDiMisura = unitaDiMisura;
        Quantita = quantita;
    }

    public static RigaOrdineBL RigaOrdineBLFactory(long rigaOrdineId, long prodottoId, string unitaDiMisura, int quantita)
    {
        return new RigaOrdineBL(rigaOrdineId, prodottoId, unitaDiMisura, quantita);
    }

    public static RigaOrdineBL RigaOrdineBLFactoryCreate(long prodottoId, string unitaDiMisura, int quantita)
    {
        return new RigaOrdineBL(0, prodottoId, unitaDiMisura, quantita);
    }
}