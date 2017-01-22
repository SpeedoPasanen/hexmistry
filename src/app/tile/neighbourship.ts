import { Tile } from './tile';
export class Neighbourship {
    tiles: Array<Tile> = [];
    distance: number = 0;
    constructor(a: Tile, b: Tile, distance) {
        this.tiles = [a, b];
        this.distance = distance;
    }
    getOther(tile: Tile) {
        return this.tiles[this.tiles.indexOf(tile) ? 0 : 1];
    }
    static create(a: Tile, b: Tile, distance) {
        var o = new Neighbourship(a, b, distance);
        if (!a.hasNeighbourship(a, b)) {
            a.neighbourships.push(o);
        }
        if (!b.hasNeighbourship(a, b)) {
            a.neighbourships.push(o);
        }
    }
}
