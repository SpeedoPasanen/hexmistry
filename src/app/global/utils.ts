export class Utils {
    static rand(min: number, max: number) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    static probability(outOf: number) {
        return Utils.rand(1, outOf) === 1;
    }
}
