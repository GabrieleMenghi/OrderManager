namespace OrderManager.Models.Requests.Api;

public class GetOrdiniApiRequest
{
    public OrdineBL Ordine { get; set; }
    public List<RigaOrdineBL> RigheOrdine { get; set; }

    public GetOrdiniApiRequest()
    {

    }

    public GetOrdiniApiRequest(OrdineBL ordine, List<RigaOrdineBL> righeOrdine)
    {
        Ordine = ordine;
        RigheOrdine = righeOrdine;
    }

    public static GetOrdiniApiRequest GetOrdiniApiRequestFactory(OrdineBL ordine, List<RigaOrdineBL> righeOrdine)
    {
        return new GetOrdiniApiRequest(ordine, righeOrdine);
    }
}
