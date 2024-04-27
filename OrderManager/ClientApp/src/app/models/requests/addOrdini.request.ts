import { Ordine, RigaOrdine } from "../ordine.model";

export class AddOrderRequest{
    ordine: Ordine;

    constructor(ordine: Ordine){
        this.ordine = ordine;
    }
}