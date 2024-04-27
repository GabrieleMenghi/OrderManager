namespace OrderManager.Models.Requests.Api;

public class AddOrderApiRequest
{
    public OrdineBL Ordine { get; set; }

    public AddOrderApiRequest()
    {

    }

    public AddOrderApiRequest(OrdineBL ordine)
    {
        Ordine = ordine;
    }

    public static AddOrderApiRequest AddOrderApiRequestFactory(OrdineBL ordine)
    {
        return new AddOrderApiRequest(ordine);
    }
}
