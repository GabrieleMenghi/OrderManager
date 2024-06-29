using Microsoft.AspNetCore.Mvc;
using OrderManager.DB;
using OrderManager.Models;
using OrderManager.Repo.Int;
using OrderManager.Services.Int;
using OrderManager.SubServices.Int;
using SelectPdf;

namespace OrderManager.Services;

public class OrdiniService : IOrdiniService
{
    private readonly IRepositoryOrdini _ordiniRepo;
    private readonly IOrderConversionSubService _conversionSubService;
    private readonly IRepositoryClienti _clientiRepo;
    private readonly IRepositoryProdotti _prodottiRepo;

    public OrdiniService(IRepositoryOrdini ordiniRepo, IOrderConversionSubService conversionSubService, IRepositoryClienti clientiRepo, IRepositoryProdotti prodottiRepo)
    {
        _ordiniRepo = ordiniRepo;
        _conversionSubService = conversionSubService;
        _clientiRepo = clientiRepo;
        _prodottiRepo = prodottiRepo;
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

    public async Task<string> GenerateHtmlStringFromOrder(OrdineBL ordine)
    {
        string filePath = @"Templates/Container.html";

        // Leggi il contenuto del file HTML come stringa 
        string htmlString = File.ReadAllText(filePath);

        var sqlCliente = await _clientiRepo.GetCliente(ordine.ClienteId);

        // Sostituzioni
        htmlString = htmlString.Replace("[[CODICECLIENTE]]", sqlCliente.CodiceCliente);
        htmlString = htmlString.Replace("[[CLIENTE]]", sqlCliente.Nome);
        htmlString = htmlString.Replace("[[IDORDINE]]", ordine.OrdineId.ToString());
        htmlString = htmlString.Replace("[[DATA]]", DateTime.Parse(ordine.DataCreazione).ToString("dd/MM/yyyy"));
        htmlString = htmlString.Replace("[[FAREFATTURA]]", ordine.FareFattura ? "F.F." : string.Empty);

        string prodottiString = string.Empty;
        foreach (var prodotto in ordine.RigheOrdine)
        {
            var sqlProdotto = await _prodottiRepo.GetProdotto(prodotto.ProdottoId);
            string rigaFilePath = @"Templates/RigaTabellaProdotti.html";
            string rigaHtmlString = File.ReadAllText(rigaFilePath);

            rigaHtmlString = rigaHtmlString.Replace("[[NOTE]]", string.Empty);
            rigaHtmlString = rigaHtmlString.Replace("[[UNITAMISURA]]", prodotto.UnitaDiMisura);
            rigaHtmlString = rigaHtmlString.Replace("[[QUANTITA]]", prodotto.Quantita.ToString());
            rigaHtmlString = rigaHtmlString.Replace("[[CODICE]]", sqlProdotto.Codice);
            rigaHtmlString = rigaHtmlString.Replace("[[PRODOTTO]]", sqlProdotto.Descrizione);

            prodottiString += rigaHtmlString;
        }

        htmlString = htmlString.Replace("[[RIGHETABELLAPRODOTTI]]", prodottiString);

        htmlString = htmlString.Replace("[[NOTE]]", ordine.Note);
        // Fine sostituzioni

        return htmlString;
    }

    public async Task<byte[]> GeneratePdfFromHtmlString(OrdineBL ordine)
    {
        try
        {
            var htmlString = await this.GenerateHtmlStringFromOrder(ordine);

            HtmlToPdf htmlToPdf = new();
            PdfDocument pdfDocument = htmlToPdf.ConvertHtmlString(htmlString);

            byte[] pdf = pdfDocument.Save();
            pdfDocument.Close();
            return pdf;
        }
        catch(Exception)
        {
            throw;
        }
    }

    public async Task<OrdineBL> GetOrdineBlConRigheAsync(long ordineId)
    {
        try
        {
            // Ottengo l'ordine da db
            var ordineSql = await _ordiniRepo.GetOrdineConRigheAsync(ordineId);

            // lo converto a bl
            var ordineBl = _conversionSubService.ConvertToOrdineBLWithRigheOrdineBL(ordineSql);

            return ordineBl;
        }
        catch(Exception e)
        {
            throw;
        }
    }
}
