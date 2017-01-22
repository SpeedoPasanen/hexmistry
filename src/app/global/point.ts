export class Point {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }
    deltaTo(p: Point) {
        return new Point(this.x - p.x, this.y - p.y);
    }
    distanceTo(p: Point) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    distanceToRound(p: Point) {
        return Math.round(this.distanceTo(p));
    }
    equals(p: Point) {
        return (this.x === p.x) && (this.y === p.y);
    }
    set(x, y) {
        this.x = x; this.y = y;
    }
}
