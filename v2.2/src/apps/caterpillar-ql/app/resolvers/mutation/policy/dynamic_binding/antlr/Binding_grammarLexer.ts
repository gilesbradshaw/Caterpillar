// Generated from ./src/models/dynamic_binding/antlr/binding_grammar.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

const LITERAL_NAMES = [
	undefined, "'nominates'", "'releases'", "'self'", undefined, "'case-creator'", 
	"'and'", "'or'", "'is'", "'in'", "'not'", "'Under'", "','", "'.'", "';'", 
	"'('", "')'", "'{'", "'}'"
]
const SYMBOLIC_NAMES = [
	undefined, "NOMINATES", "RELEASES", "SELF", "ENDORSED_BY", "CASE_CREATOR", 
	"AND", "OR", "IS", "IN", "NOT", "UNDER", "COMMA", "DOT", "SEMICOLON", 
	"LPAREN", "RPAREN", "LBRACES", "RBRACES", "IDENTIFIER", "WS"
]

class Binding_grammarLexer extends Lexer {
	public static readonly NOMINATES=1;
	public static readonly RELEASES=2;
	public static readonly SELF=3;
	public static readonly ENDORSED_BY=4;
	public static readonly CASE_CREATOR=5;
	public static readonly AND=6;
	public static readonly OR=7;
	public static readonly IS=8;
	public static readonly IN=9;
	public static readonly NOT=10;
	public static readonly UNDER=11;
	public static readonly COMMA=12;
	public static readonly DOT=13;
	public static readonly SEMICOLON=14;
	public static readonly LPAREN=15;
	public static readonly RPAREN=16;
	public static readonly LBRACES=17;
	public static readonly RBRACES=18;
	public static readonly IDENTIFIER=19;
	public static readonly WS=20;
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE"
	];

	public static readonly ruleNames: string[] = [
		"NOMINATES", "RELEASES", "SELF", "ENDORSED_BY", "CASE_CREATOR", "AND", 
		"OR", "IS", "IN", "NOT", "UNDER", "COMMA", "DOT", "SEMICOLON", "LPAREN", 
		"RPAREN", "LBRACES", "RBRACES", "IDENTIFIER", "WS"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = LITERAL_NAMES
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = SYMBOLIC_NAMES
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LITERAL_NAMES, SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return Binding_grammarLexer.VOCABULARY;
	}


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(Binding_grammarLexer._ATN, this);
	}

	@Override
	public get grammarFileName(): string { return "binding_grammar.g4"; }

	@Override
	public get ruleNames(): string[] { return Binding_grammarLexer.ruleNames; }

	@Override
	public get serializedATN(): string { return Binding_grammarLexer._serializedATN; }

	@Override
	public get modeNames(): string[] { return Binding_grammarLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x16\x97\b\x01"+
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06"+
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r"+
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t"+
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x03\x02\x03\x02\x03\x02"+
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03"+
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04"+
		"\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05"+
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05"+
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05X\n\x05\x03\x06\x03\x06"+
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06"+
		"\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03"+
		"\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03"+
		"\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10"+
		"\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x14\x06\x14"+
		"\x8D\n\x14\r\x14\x0E\x14\x8E\x03\x15\x06\x15\x92\n\x15\r\x15\x0E\x15\x93"+
		"\x03\x15\x03\x15\x02\x02\x02\x16\x03\x02\x03\x05\x02\x04\x07\x02\x05\t"+
		"\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17"+
		"\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13"+
		"%\x02\x14\'\x02\x15)\x02\x16\x03\x02\x04\x06\x022;C\\aac|\x05\x02\v\f"+
		"\x0E\x0F\"\"\x99\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07"+
		"\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03"+
		"\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03"+
		"\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03"+
		"\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03"+
		"\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02"+
		"\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x03+\x03\x02\x02\x02\x05"+
		"5\x03\x02\x02\x02\x07>\x03\x02\x02\x02\tW\x03\x02\x02\x02\vY\x03\x02\x02"+
		"\x02\rf\x03\x02\x02\x02\x0Fj\x03\x02\x02\x02\x11m\x03\x02\x02\x02\x13"+
		"p\x03\x02\x02\x02\x15s\x03\x02\x02\x02\x17w\x03\x02\x02\x02\x19}\x03\x02"+
		"\x02\x02\x1B\x7F\x03\x02\x02\x02\x1D\x81\x03\x02\x02\x02\x1F\x83\x03\x02"+
		"\x02\x02!\x85\x03\x02\x02\x02#\x87\x03\x02\x02\x02%\x89\x03\x02\x02\x02"+
		"\'\x8C\x03\x02\x02\x02)\x91\x03\x02\x02\x02+,\x07p\x02\x02,-\x07q\x02"+
		"\x02-.\x07o\x02\x02./\x07k\x02\x02/0\x07p\x02\x0201\x07c\x02\x0212\x07"+
		"v\x02\x0223\x07g\x02\x0234\x07u\x02\x024\x04\x03\x02\x02\x0256\x07t\x02"+
		"\x0267\x07g\x02\x0278\x07n\x02\x0289\x07g\x02\x029:\x07c\x02\x02:;\x07"+
		"u\x02\x02;<\x07g\x02\x02<=\x07u\x02\x02=\x06\x03\x02\x02\x02>?\x07u\x02"+
		"\x02?@\x07g\x02\x02@A\x07n\x02\x02AB\x07h\x02\x02B\b\x03\x02\x02\x02C"+
		"D\x07g\x02\x02DE\x07p\x02\x02EF\x07f\x02\x02FG\x07q\x02\x02GH\x07t\x02"+
		"\x02HI\x07u\x02\x02IJ\x07g\x02\x02JK\x07f\x02\x02KL\x07/\x02\x02LM\x07"+
		"d\x02\x02MX\x07{\x02\x02NO\x07g\x02\x02OP\x07p\x02\x02PQ\x07f\x02\x02"+
		"QR\x07q\x02\x02RS\x07t\x02\x02ST\x07u\x02\x02TU\x07g\x02\x02UV\x07t\x02"+
		"\x02VX\x07u\x02\x02WC\x03\x02\x02\x02WN\x03\x02\x02\x02X\n\x03\x02\x02"+
		"\x02YZ\x07e\x02\x02Z[\x07c\x02\x02[\\\x07u\x02\x02\\]\x07g\x02\x02]^\x07"+
		"/\x02\x02^_\x07e\x02\x02_`\x07t\x02\x02`a\x07g\x02\x02ab\x07c\x02\x02"+
		"bc\x07v\x02\x02cd\x07q\x02\x02de\x07t\x02\x02e\f\x03\x02\x02\x02fg\x07"+
		"c\x02\x02gh\x07p\x02\x02hi\x07f\x02\x02i\x0E\x03\x02\x02\x02jk\x07q\x02"+
		"\x02kl\x07t\x02\x02l\x10\x03\x02\x02\x02mn\x07k\x02\x02no\x07u\x02\x02"+
		"o\x12\x03\x02\x02\x02pq\x07k\x02\x02qr\x07p\x02\x02r\x14\x03\x02\x02\x02"+
		"st\x07p\x02\x02tu\x07q\x02\x02uv\x07v\x02\x02v\x16\x03\x02\x02\x02wx\x07"+
		"W\x02\x02xy\x07p\x02\x02yz\x07f\x02\x02z{\x07g\x02\x02{|\x07t\x02\x02"+
		"|\x18\x03\x02\x02\x02}~\x07.\x02\x02~\x1A\x03\x02\x02\x02\x7F\x80\x07"+
		"0\x02\x02\x80\x1C\x03\x02\x02\x02\x81\x82\x07=\x02\x02\x82\x1E\x03\x02"+
		"\x02\x02\x83\x84\x07*\x02\x02\x84 \x03\x02\x02\x02\x85\x86\x07+\x02\x02"+
		"\x86\"\x03\x02\x02\x02\x87\x88\x07}\x02\x02\x88$\x03\x02\x02\x02\x89\x8A"+
		"\x07\x7F\x02\x02\x8A&\x03\x02\x02\x02\x8B\x8D\t\x02\x02\x02\x8C\x8B\x03"+
		"\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x8C\x03\x02\x02\x02\x8E\x8F\x03"+
		"\x02\x02\x02\x8F(\x03\x02\x02\x02\x90\x92\t\x03\x02\x02\x91\x90\x03\x02"+
		"\x02\x02\x92\x93\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x93\x94\x03\x02"+
		"\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\b\x15\x02\x02\x96*\x03\x02\x02"+
		"\x02\x06\x02W\x8E\x93\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Binding_grammarLexer.__ATN) {
			Binding_grammarLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(Binding_grammarLexer._serializedATN));
		}

		return Binding_grammarLexer.__ATN;
	}

}

export {
	Binding_grammarLexer
}
