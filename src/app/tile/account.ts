import { Molecule } from './molecule';
export class Account {
    id: string;
    molecule: Molecule;
    private _amount: number = 0;
    isSpawner: Boolean = false;
    constructor(id: string) {
        this.id = id;
        this.molecule = Molecule.get(id);
    }
    public get amount(): number {
        return this._amount;
    }
    public set amount(n: number) {
        var oldAmount = this._amount;
        var d = n - oldAmount;
        this._amount = n;
        this.molecule.globalAmount += d;
    }
}
