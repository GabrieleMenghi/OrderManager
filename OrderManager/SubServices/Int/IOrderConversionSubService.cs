using OrderManager.DB;
using OrderManager.Models;

namespace OrderManager.SubServices.Int;

public interface IOrderConversionSubService
{
    OrdineBL ConvertToOrdineBLWithRigheOrdineBL(Ordine ordine);
    Ordine ConvertToOrdine(OrdineBL ordine);
}