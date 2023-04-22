export class FormClass {
  cotation!: number;
  fret: number = 15;
  taux!: number;
  taxePortuaires: number = 21.04;
  fraisApprocheFixe: number = 16.62;
  fraisApprocheVariable: number = 1.8;
  taxeParafiscale: number = 0.25;
  remunerationStockage: number = 150;

  prixRepriseTonne!: number;
  prixReprise100Littres!: number;

  tic: number = 242.2;
  tva: number = 10; //% * (prix de reprise 100L + tic)
  creditDroit: number = 0.41; // % *(tic+tva)
  sousTotal!: number; //prix de reprise 100L + tic + tva + credit de droit
  fraisMargeDistribution: number = 28.4;

  prixVenteGrosHorsTva!: number; // sous total + fraisMargeDistribution - tva
  prixVenteGrosAvecTva!: number; // prixVenteGrosHorsTva + tva*prixVenteGrosHorsTva

  coulageDetaillants: number = 0.5; //% * prixVenteGrosAvecTva
  correctionVariationThermique: number = 1.5;
  margeDetail: number = 26.4;
  prixVenteDetailHorsTva!: number; //prixVenteGrosAvecTva+coulageDetaillants+correctionVariationThermique+margeDetail+ tva*prixVenteGrosHorsTva
  prixVenteDetailAvecTva!: number; //prixVenteDetailHorsTva + tva*prixVenteDetailHorsTva

  finalPrice!: number;
  constructor() {}

  calculePart1(): void {
    let cotatioMAD = this.cotation * this.taux;
    let fretMad = this.fret * this.taux;

    let fraitApproche =
      this.fraisApprocheFixe +
      (this.fraisApprocheVariable * (cotatioMAD + fretMad)) / 100;

    let fraisParafiscale =
      (this.taxeParafiscale * (cotatioMAD + fretMad + this.taxePortuaires)) /
      100;

    this.prixRepriseTonne =
      cotatioMAD +
      fretMad +
      this.taxePortuaires +
      fraitApproche +
      fraisParafiscale +
      this.remunerationStockage;

    this.prixRepriseTonne = this.round2(this.prixRepriseTonne);
    this.prixReprise100Littres =
      Math.round(this.prixRepriseTonne * 0.84 * 10) / 10 / 10;

    this.prixReprise100Littres = this.round2(this.prixReprise100Littres);
  }

  calculePart2(): void {
    let tvaValue = (this.tva * (this.prixReprise100Littres + this.tic)) / 100;
    let creditDroitValue = (this.creditDroit * (this.tic + tvaValue)) / 100;
    this.sousTotal = this.round2(
      this.prixReprise100Littres + this.tic + tvaValue + creditDroitValue
    );
  }

  calculePart3(): void {
    let tvaValue = (this.tva * (this.prixReprise100Littres + this.tic)) / 100;
    this.prixVenteGrosHorsTva = this.round2(
      this.sousTotal + this.fraisMargeDistribution - tvaValue
    );

    this.prixVenteGrosAvecTva = this.round2(
      (this.tva * this.prixVenteGrosHorsTva) / 100 + this.prixVenteGrosHorsTva
    );
  }

  calculePart4(): void {
    let coulageDetaillantsValue =
      (this.coulageDetaillants * this.prixVenteGrosAvecTva) / 100;
    let tvaValue = (this.tva * this.prixVenteGrosHorsTva) / 100;

    this.prixVenteDetailHorsTva = this.round2(
      this.prixVenteGrosAvecTva +
        coulageDetaillantsValue +
        this.correctionVariationThermique +
        this.margeDetail -
        tvaValue
    );

    let tva2Value = (this.tva * this.prixVenteDetailHorsTva) / 100;

    this.prixVenteDetailAvecTva = this.round2(
      this.prixVenteDetailHorsTva + tva2Value
    );
  }
  calcule(): number {
    this.calculePart1();
    this.calculePart2();
    this.calculePart3();
    this.calculePart4();

    this.finalPrice = Math.ceil(this.prixVenteDetailAvecTva) / 100;

    return this.finalPrice;
  }

  equals(anotherFrom: FormClass): boolean {
    return JSON.stringify(this) === JSON.stringify(anotherFrom);
  }

  round2(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
