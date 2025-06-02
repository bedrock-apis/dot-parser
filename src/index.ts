import {StaticTokenPipe} from "./source-provider";

const encoder = new TextEncoder();

const pipe = new StaticTokenPipe(encoder.encode("//Hello mf"));
for await(const p of pipe.getTokenIterator()){
    console.log(p.type, new TextDecoder().decode(p.value));
}