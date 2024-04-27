import { Prodotto } from "./prodotto.model";

export class ProdottoSelezionatoPerOrdine{
    prodotto: Prodotto;
    unitaMisura: string;
    quantita: number;

    constructor(prodotto: Prodotto, unitaMisura: string, quantita: number){
        this.prodotto = prodotto;
        this.unitaMisura = unitaMisura;
        this.quantita = quantita;
    }

    public static ProdottoSelezionatoPerOrdineFactory(prodotto: Prodotto, unitaMisura: string, quantita: number){
        return new ProdottoSelezionatoPerOrdine(prodotto, unitaMisura, quantita);
    }
}