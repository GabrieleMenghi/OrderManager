export class Ordine {
    ordineId: number;
    dataCreazione: string;
    clienteId: number;
    fareFattura: boolean;
    righeOrdine: RigaOrdine[];
    note: string;

    constructor(ordineId: number, dataCreazione: string, clienteId: number, fareFattura: boolean, righeOrdine: RigaOrdine[], note: string) {
        this.ordineId = ordineId;
        this.dataCreazione = dataCreazione;
        this.clienteId = clienteId;
        this.fareFattura = fareFattura;
        this.righeOrdine = righeOrdine;
        this.note = note;
    }

    public static OrdineFactory(ordineId: number, dataCreazione: string, clienteId: number, fareFattura: boolean, righeOrdine: RigaOrdine[], note: string){
        return new Ordine(ordineId, dataCreazione, clienteId, fareFattura, righeOrdine, note);
    }

    public static OrdineFactoryCreate(dataCreazione: string, clienteId: number, fareFattura: boolean, righeOrdine: RigaOrdine[], note: string){
        return new Ordine(0, dataCreazione, clienteId, fareFattura, righeOrdine, note);
    }
}

export class RigaOrdine {
    rigaOrdineId: number;
    prodottoId: number;
    unitaDiMisura: string;
    quantita: number;

    constructor(rigaOrdineId: number, prodottoId: number, unitaDiMisura: string, quantita: number) {
        this.rigaOrdineId = rigaOrdineId;
        this.prodottoId = prodottoId;
        this.unitaDiMisura = unitaDiMisura;
        this.quantita = quantita;
    }

    public static RigaOrdineFactory(rigaOrdineId: number, prodottoId: number, unitaDiMisura: string, quantita: number){
        return new RigaOrdine(rigaOrdineId, prodottoId, unitaDiMisura, quantita);
    }

    public static RigaOrdineFactoryCreate(prodottoId: number, unitaDiMisura: string, quantita: number){
        return new RigaOrdine(0, prodottoId, unitaDiMisura, quantita);
    }
}