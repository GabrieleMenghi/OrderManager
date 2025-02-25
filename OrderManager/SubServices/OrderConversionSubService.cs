﻿using OrderManager.DB;
using OrderManager.Models;
using OrderManager.SubServices.Int;

namespace OrderManager.SubServices;

public class OrderConversionSubService : IOrderConversionSubService
{
    public OrdineBL ConvertToOrdineBLWithRigheOrdineBL(Ordine ordine)
    {
        var righeOrdine = new List<RigaOrdineBL>();

        righeOrdine.AddRange(ordine.RigheOrdine
            .Select(x => RigaOrdineBL.RigaOrdineBLFactory(x.RigaOrdineId, x.ProdottoId, x.UnitaDiMisura, x.Quantita))
            .ToList());

        var ordineBl = OrdineBL.OrdineBLFactory(ordine.OrdineId, ordine.DataCreazione.ToString(), ordine.ClienteId, ordine.FareFattura, righeOrdine, ordine.Note);

        return ordineBl;
    }

    public Ordine ConvertToOrdine(OrdineBL ordine)
    {
        List<RigaOrdine> sqlRighe = ordine.RigheOrdine
            .Select(x => RigaOrdine.RigaOrdineFactoryCreate(x.ProdottoId, x.UnitaDiMisura, x.Quantita))
            .ToList();

        Ordine sqlOrdine = Ordine.OrdineFactoryCreate(DateTime.Parse(ordine.DataCreazione), ordine.ClienteId, ordine.FareFattura, ordine.Note);

        sqlOrdine.RigheOrdine = sqlRighe;

        return sqlOrdine;
    }
}
