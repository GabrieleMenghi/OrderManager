export class Ordine {
    ordineId: number;
    dataCreazione: Date;
    clienteId: number;
    fareFattura: boolean;
    righeOrdine: RigaOrdine[];
    note: string;
}

export class RigaOrdine {
    rigaOrdineId: number;
    prodottoId: number;
    unitaDiMisura: string;
    quantita: number;
}