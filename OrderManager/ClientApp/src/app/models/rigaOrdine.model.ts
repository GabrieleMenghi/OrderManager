import { Prodotto } from "./prodotto.model";

export class RigaOrdine{
    prodotto: Prodotto;
    unitaMisura: string;
    quantita: number;

    constructor(prodotto: Prodotto, unitaMisura: string, quantita: number){
        this.prodotto = prodotto;
        this.unitaMisura = unitaMisura;
        this.quantita = quantita;
    }

    public static RigaOrdineFactory(prodotto: Prodotto, unitaMisura: string, quantita: number){
        return new RigaOrdine(prodotto, unitaMisura, quantita);
    }
}