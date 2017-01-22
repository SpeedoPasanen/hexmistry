import { Tile } from '../tile/tile';
import { Bank } from '../tile/bank';
import { Skill } from './skill';
import { Utils } from '../global/utils';
export class Creature {
    tile: Tile;
    bank: Bank;
    skills: Array<Skill> = [];
    static _allCreatures: Array<Creature> = [];
    constructor(tile: Tile) {
        this.tile = tile;
        this.evolution();
        setTimeout(() => this.act(), Utils.rand(100, 500));
        Creature._allCreatures.push(this);
    }
    static tick() {
        // DEPRECATED
        this._allCreatures.map(c => c.act());
    }
    act() {
        if (!this.skills.length) {
            this.evolution();
        }
        setTimeout(() => this.act(), Utils.rand(1500, 3000));
    }
    die() {
        Creature._allCreatures.splice(Creature._allCreatures.indexOf(this), 1);
        this.bank.accounts.map(acc => this.tile.bank.addAmount(acc.id, acc.amount));
    }
    /**
     * Lisää skilli, poista vanhat joita ei käytetä.
     */
    evolution() {
        if (!this.tile.bank.accounts.length) {
            return;
        }
    }
    removeSkill(skill: Skill) {
        this.skills.splice(this.skills.indexOf(skill), 1);
    }
    skillCount(): number {
        return this.skills.length;
    }
}
