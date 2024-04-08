export class Cliente{
    public clienteId: number;
    public codiceCliente: string;
    public nome: string;
    public indirizzo: string;
    public telefono?: string;
    public partitaIva?: string;
    public codiceFiscale?: string;

    constructor(
        clienteId: number,
        codiceCliente: string,
        nome: string,
        indirizzo: string,
        telefono?: string,
        partitaIva?: string,
        codiceFiscale?: string
    ) {
        this.clienteId = clienteId;
        this.codiceCliente = codiceCliente;
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.partitaIva = partitaIva;
        this.codiceFiscale = codiceFiscale;
    }
}