export class Prodotto{
    codice: string
    descrizione: string
    prezzo: number

    constructor (codice: string, descrizione: string, prezzo: number){
        this.codice = codice
        this.descrizione = descrizione
        this.prezzo = prezzo
     }
}