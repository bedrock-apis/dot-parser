import { TokenType } from "./token-type";

export class Token {
    public constructor(
        public readonly type: TokenType,
        public readonly value: Uint8Array,
        public readonly options: any = ({})
    ){}
}