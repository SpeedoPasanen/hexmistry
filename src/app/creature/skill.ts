import { Molecule } from '../tile/molecule';
import { Creature } from './creature';
import { Bank } from '../tile/bank';
export class Skill {
    inputs: Array<Molecule>;
    outputs: Array<Molecule>;
    byproducts: Array<Molecule>;
    utilization: number = 1000;
    creature: Creature;
    constructor(creature: Creature, molecules: Array<Molecule>) {

    }
    use(bank: Bank) {
        this.utilization *= 0.95;

        if (this.utilization < 10) {
            this.creature.removeSkill(this);
            return;
        }
    }
}
