import * as _ from 'lodash';
export class Molecule {
    id: string;
    complexity: number = 0;
    ingredients: Array<Molecule> = [];
    globalAmount: number = 0;
    private static _map: any = {};
    public static basicIds = ['A', 'B', 'C', 'D'];
    public static get(id: string) {
        if (!(id in this._map)) {
            var ingredients = [];
            var osat = id.split('-');
            if (osat.length > 1) {
                osat.map(iid => ingredients.push(Molecule.get(iid)));
            }
            osat.sort((a, b) => a >= b ? 1 : -1);
            this._map[id] = new Molecule({ id: id, ingredients: ingredients });
        }
        return this._map[id];
    }
    constructor(obj: any) {
        _.defaultsDeep(this, obj);
        if (this.ingredients.length) {
            this.id = '';
            this.ingredients.map(ing => this.id += ing.id);
        }
        this.complexity = this.ingredients.length;
    }
}
