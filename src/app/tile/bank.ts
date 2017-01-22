import { Molecule } from './molecule';
import { Account } from './account';
export class Bank {
    accounts: Array<Account> = [];
    private _accountMap: any = {};
    public addAmount(id: string, n: number) {
        this.setAmount(id, this.getAmount(id) + n);
    }
    public getAmount(id: string): number {
        return this.getAccount(id).amount;
    }
    public setAmount(id: string, amount: number) {
        if (amount <= 0) {
            this.removeAccount(id);
            return;
        }
        this.getAccount(id).amount = amount;
    }
    private removeAccount(id) {
        if (!this.hasAccount(id)) {
            return;
        }
        this.accounts.splice(this.accounts.indexOf(this._accountMap[id]), 1);
        delete this._accountMap[id];
    }
    public getAccount(id: string): Account {
        if (!this.hasAccount(id)) {
            this.addAccount(id);
        }
        return this._accountMap[id];
    }
    public hasAccount(id: string) {
        return id in this._accountMap;
    }
    private addAccount(id: string) {
        var acc = new Account(id);
        this._accountMap[id] = acc;
        this.accounts.push(acc);
    }
}
