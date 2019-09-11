export class Message {
    constructor({ nickname, text, ts, isLocal }) {
        this.nickname = nickname;
        this.text = text;
        this.ts = ts;
        this.isLocal = isLocal;
    }
}