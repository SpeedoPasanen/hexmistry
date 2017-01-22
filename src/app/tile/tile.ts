import * as _ from 'lodash';
import { Bank } from './bank';
import { Molecule } from './molecule';
import { Neighbourship } from './neighbourship';
import { Creature } from '../creature/creature';
import { Utils } from '../global/utils';
export class Tile {
    id: string;
    x: number;
    y: number;
    l: Tile;
    r: Tile;
    t: Tile;
    b: Tile;
    lt: Tile;
    lb: Tile;
    rt: Tile;
    rb: Tile;
    neighbourships: Array<Neighbourship> = [];
    bank: Bank = new Bank();
    creature: Creature = null;
    constructor(obj: any) {
        _.defaultsDeep(this, obj);
        this.id = this.x + '-' + this.y;
        if (Utils.probability(100)) {
            var r = Utils.rand(0, Molecule.basicIds.length - 1);
            var randId = Molecule.basicIds[r];
            this.spawn(randId, Utils.rand(0, 500));
            this.bank.getAccount(randId).isSpawner = true;
        }
        if (Utils.probability(2)) {
            //setTimeout(() => { this.creature = new Creature(this) }, Utils.rand(1, 500));
            this.creature = new Creature(this);
        }
    }
    public distribute(id, amount) {
        this.bank.addAmount(id, amount);
        this.neighbourships.map(ns => {
            var divider = Math.pow(0.5, ns.distance);
            ns.getOther(this).bank.addAmount(id, Math.round(divider * amount));
        });
    }
    private spawn(id, amount) {
        this.distribute(id, amount);
        setTimeout(() => { this.spawn(id, amount); }, Utils.rand(5000, 10000));
    }
    public hasNeighbourship(a: Tile, b: Tile) {
        for (var i = 0; i < this.neighbourships.length; i++) {
            var n = this.neighbourships[i];
            if ((n.tiles.indexOf(a) > 0) && (n.tiles.indexOf(b) > 0)) {
                return true;
            }
        }
        return false;
    }

}
