import { Token } from "./token";
import { TokenType } from "./token-type";
import { Tokenizer } from "./tokenizer";

export abstract class TokenPipe {
    public abstract getTokenIterator(): AsyncIterable<Token>;
    public static * flush(stack: Token[]): Generator<Token, boolean>{ 
        while(stack.length) {
            let token = stack.shift()!;
            yield token;
            if(token.type === TokenType.EndOfFile) return true;
        }
        return false;
    }
}

export class StaticTokenPipe extends TokenPipe {
    public constructor(
        public readonly src: Uint8Array){
            super();
    }
    public async * getTokenIterator(): AsyncIterable<Token> {
        const tokenStack = [];
        const tokenizer = Tokenizer.tokenize(tokenStack);
        let argV: number | null = null, offset: number = 0;
        while(true){
            try {
                let {done, value} = tokenizer.next(argV!);

                // Return of tokenizer ended
                if(done) return void (yield * StaticTokenPipe.flush(tokenStack));

                if(offset >= this.src.length) argV = null;
                else argV = this.src[offset]??null;

                offset += value??0;
            }
            catch {
                throw new SyntaxError("Tokenizer error: at " + offset)
            }
            if(tokenStack.length) if(yield * StaticTokenPipe.flush(tokenStack)) return;
        }
    }
}