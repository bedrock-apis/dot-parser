export const SPACE: number = ' '.charCodeAt(0);
export const NEW_LINE: number = '\n'.charCodeAt(0);
export const LINE_RETURN: number = '\r'.charCodeAt(0);
export const TAB: number = '\t'.charCodeAt(0);
export const ASTERISK: number = '*'.charCodeAt(0);
export const SLASH: number = '/'.charCodeAt(0);
export const EQUAL: number = '='.charCodeAt(0);
export const PARENTHESIS_OPEN: number = '('.charCodeAt(0);
export const PARENTHESIS_close: number = ')'.charCodeAt(0);
export const BRACE_OPEN: number = '{'.charCodeAt(0);
export const BRACE_CLOSE: number = '}'.charCodeAt(0);
export const BRACKET_OPEN: number = '['.charCodeAt(0);
export const BRACKET_CLOSE: number = ']'.charCodeAt(0);

export const isWhiteSpace = (n: number): boolean=>(n === SPACE || n === NEW_LINE || n=== LINE_RETURN || n === TAB);
export const isAlphabetical = (n: number): boolean=>(n >= 65 && n <=90) || (n >= 97 && n <= 122);
export const isDigit = (n: number): boolean=>(n >= 48 && n <= 57);