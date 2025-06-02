import { Token } from "./token";
import { TokenType } from "./token-type";
import {isWhiteSpace} from "./char-constants";
import { ProcessingInstruction } from "./processor-instructions";

const END_OF_FILE_TOKEN = new Token(TokenType.EndOfFile, new Uint8Array(0));


export class Tokenizer{
    private constructor(){}
    public static * whitespaceSkip(): Generator<number, void, number | null>{
        let current: number | null = null;
        while((current = yield ProcessingInstruction.GetCharacter) && isWhiteSpace(current)) yield ProcessingInstruction.MovePointer;
    }
    public static * tokenize(tokensQueue: Token[]): Generator<number, void, number | null>{
        let char: number | null = null;
        while(true){
            (char = (yield 0));
            yield * this.whitespaceSkip();
            switch(char){
                case CHARCODE_DOUBLE_QUOTE:
                    break;
                case CHARCODE_SLASH:
                    tokensQueue.push(yield * this.tokenizeComment());
                    break;
                case null:
                    tokensQueue.push(END_OF_FILE_TOKEN);
                    return;
                default:
                    break;
            }
        }
    }
    public static * tokenizeComment(): Generator<number, Token, number | null>{
        let isMultiline = false;
        let current = yield 1;
        let parts: number[] = [];
        
        // Initial checks "/*" or "//" for comments
        if(current !== CHARCODE_SLASH) throw new ReferenceError("Unexpected token: " + current);
        switch (current = (yield 1)) {
            case CHARCODE_STAR:
                isMultiline = true;
                break;
            case CHARCODE_SLASH:
                break;
            default:
                throw new ReferenceError("Unexpected token: " + current);
        }

        // Skip all until comment ends, by new line or "*/" in case of multiline comment
        while((current = yield 1)){
            if((current === CHARCODE_STAR && (yield 0) === CHARCODE_SLASH) && isMultiline) {
                yield 1;
                break;
            }
            if((current === CHARCODE_NEW_LINE || current === null) && !isMultiline) break;
            parts.push(current);
        }

        //return new token
        return new Token(TokenType.Comment, new Uint8Array(parts), {isMultilineComment: isMultiline});
    }
}