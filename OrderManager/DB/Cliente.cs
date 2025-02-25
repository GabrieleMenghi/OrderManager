using System.ComponentModel.DataAnnotations;

namespace OrderManager.DB;

public class Cliente
{
    public long ClienteId { get; set; }
    public string CodiceCliente { get; set; }
    public string Nome { get; set; }
    public string Indirizzo { get; set; }
    public string Telefono { get; set; }
    public string PartitaIva { get; set; }
    public string CodiceFiscale { get; set; }
    public string CodiceUnivoco { get; set; }

    public Cliente()
    {
    }

    public Cliente(long clienteId, string codiceCliente, string nome, string indirizzo, string telefono, string partitaIva, string codiceFiscale, string codiceUnivoco)
    {
        ClienteId = clienteId;
        CodiceCliente = codiceCliente;
        Nome = nome;
        Indirizzo = indirizzo;
        Telefono = telefono;
        PartitaIva = partitaIva;
        CodiceFiscale = codiceFiscale;
        CodiceUnivoco = codiceUnivoco;
    }

    public static Cliente ClienteFactory(long clienteId, string codiceCliente, string nome, string indirizzo, string telefono, string partitaIva, string codiceFiscale, string codiceUnivoco)
    {
        return new Cliente(clienteId, codiceCliente, nome, indirizzo, telefono, partitaIva, codiceFiscale, codiceUnivoco);
    }

    public static Cliente ClienteFactoryCreate(string codiceCliente, string nome, string indirizzo, string telefono, string partitaIva, string codiceFiscale, string codiceUnivoco)
    {
        return new Cliente(0, codiceCliente, nome, indirizzo, telefono, partitaIva, codiceFiscale, codiceUnivoco);
    }
}
