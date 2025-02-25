namespace OrderManager.Models.Requests.Api;

public class CreateClienteApiRequest
{
    public string CodiceCliente { get; set; }
    public string Nome { get; set; }
    public string Indirizzo { get; set; }
    public string Telefono { get; set; }
    public string PartitaIva { get; set; }
    public string CodiceFiscale { get; set; }
    public string CodiceUnivoco { get; set; }

    public CreateClienteApiRequest() { }

    public CreateClienteApiRequest(string codiceCliente, string nome, string indirizzo, string telefono, string partitaIva, string codiceFiscale, string codiceUnivoco)
    {
        CodiceCliente = codiceCliente;
        Nome = nome;
        Indirizzo = indirizzo;
        Telefono = telefono;
        PartitaIva = partitaIva;
        CodiceFiscale = codiceFiscale;
        CodiceUnivoco = codiceUnivoco;
    }

    public CreateClienteApiRequest CreateClienteApiRequestFactory(string codiceCliente, string nome, string indirizzo, string telefono, string partitaIva, string codiceFiscale, string codiceUnivoco)
    {
        return new CreateClienteApiRequest(codiceCliente, nome, indirizzo, telefono, partitaIva, codiceFiscale, codiceUnivoco);
    }
}
