export class Prodotto{
    prodottoId: number;
    codice: string
    descrizione: string
    prezzo: number

    constructor (prodottoId: number, codice: string, descrizione: string, prezzo: number){
        this.prodottoId = prodottoId;
        this.codice = codice
        this.descrizione = descrizione
        this.prezzo = prezzo
     }
}