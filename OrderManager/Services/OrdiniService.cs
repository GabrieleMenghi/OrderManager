using OrderManager.DB;
using OrderManager.Models;
using OrderManager.Repo.Int;
using OrderManager.Services.Int;
using OrderManager.SubServices.Int;

namespace OrderManager.Services;

public class OrdiniService : IOrdiniService
{
    private readonly IRepositoryOrdini _ordiniRepo;
    private readonly IOrderConversionSubService _conversionSubService;

    public OrdiniService(IRepositoryOrdini ordiniRepo, IOrderConversionSubService conversionSubService)
    {
        _ordiniRepo = ordiniRepo;
        _conversionSubService = conversionSubService;
    }

    public async Task<List<OrdineBL>> GetOrdersAsync()
    {
        var ordini = await _ordiniRepo.GetOrders();

        // Conversione in BL
        var ordiniBl = new List<OrdineBL>();
        ordiniBl.AddRange(ordini.Select(x => _conversionSubService.ConvertToOrdineBLWithRigheOrdineBL(x)).ToList());

        return ordiniBl;
    }

    public async Task<Ordine> AddOrderAsync(OrdineBL ordineBl)
    {
        Ordine ordine = _conversionSubService.ConvertToOrdine(ordineBl);
        await _ordiniRepo.AddOrder(ordine);

        return ordine;
    }
}
