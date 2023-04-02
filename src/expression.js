/**
 * 
 * @typedef {BinaryExpression|ConstantExpression|FunctionExpression|VariableExpression|Differential|FlattenedExpression|ExpressionFunction} Expression
 * @typedef {{type: 0|1|2|3|4|8, l: Expression, r: Expression}} BinaryExpression
 * @typedef {{type: 5, name: string, param: Expression}} FunctionExpression
 * @typedef {{type: 6, valType:0|1|2, val: number}} ConstantExpression
 * @typedef {{type: 7, name: string}} VariableExpression
 * @typedef {{type: 0|2, child: [Expression]}} FlattenedExpression
 * @typedef {{type: 12, top: string, bot: string, n: number}} Differential
 * @typedef {{name: string, inv: string, type: 0, evaluate: (ConstantExpression) => (ConstantExpression)}} ExpressionFunction
 * 
 * sin: {
        name: "sin",
        inv: "asin",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.sin(value.val));
        }
    }
 * 
 */

const complex = require("./complex");
const math = require("./complex");


const types = {
    add: 0,
    sub: 1,
    mul: 2,
    div: 3,
    exp: 4,
    elem_func: 5,
    defined_func: 6,
    const: 7,
    var: 8,
    equ: 9,
    flat_add: 10,
    flat_mult: 11,
    differential: 12
}
const valTypes = {
    num: 0,
    vec: 1,
    mat: 2,
}

const variables = { i: 0 };

const isNumber = (stirng) => {
    return /-{0,1}((\d+)|(\d*\.\d+))/g.test(stirng);
}
const isWord = (string) => {
    return /\w+/.test(string);
}

const tokenize = (source) => {
    const keywords = Object.keys(variables);
    var prefix = "";
    if (keywords.length > 0) {
        prefix = keywords.join("|") + "|";
    }
    const funcs = Object.keys(functions).map((e) => functions[e].name);
    if(funcs.length > 0){
        prefix += funcs.join("|") + "|";
    }

    regex = new RegExp(prefix + "/\\\"[^\\\"]*\\\"|\\+(\\+|=){0,1}|-|\\||\\/|\\*|\\)|\\^|\\(|-|{|}|;|<|>|(-{0,1}\\d*\\.\\d+)|\\d+|[A-Za-z]|,|=", "g");
    return source.match(regex);
}

const num = (r = 0, i = 0) => {
    return { type: types.const, valType: valTypes.num, val: { r: r, i: i } };
}
const numc = (c) => {
    return { type: types.const, valType: valTypes.num, val: c };
}

const vec = (val) => {
    return { type: types.const, valType: valTypes.vec, val: val };
}





/** @type {Object<string, ExpressionFunction>} */
var functions = {
    sin: {
        name: "sin",
        inv: "asin",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.sin(value.val));
        }
    },
    cos: {
        name: "cos",
        inv: "acos",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.cos(value.val));
        }
    },
    tan: {
        name: "tan",
        inv: "atan",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.tan(value.val));
        }
    },
    sec: {
        name: "sec",
        inv: "asec",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.sec(value.val));
        }
    },
    csc: {
        name: "csc",
        inv: "acsc",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.csc(value.val));
        }
    },
    cot: {
        name: "cot",
        inv: "acot",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.cot(value.val));
        }
    },
    asin: {
        name: "asin",
        inv: "sin",
        type: 0,
        evaluate: (value) => {
        // console.log()
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.asin(value.val));
        }
    },
    acos: {
        name: "acos",
        inv: "cos",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.acos(value.val));
        }
    },
    atan: {
        name: "atan",
        inv: "tan",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.tan(value.val));
        }
    },
    asec: {
        name: "asec",
        inv: "sec",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.asec(value.val));
        }
    },
    acsc: {
        name: "acsc",
        inv: "csc",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.acsc(value.val));
        }
    },
    acot: {
        name: "acot",
        inv: "cot",
        type: 0,
        evaluate: (value) => {
        // console.log(numc(math.complex.sin(value.val)));
            return numc(math.complex.cot(value.val));
        }
    },
    abs: {
        name: "abs",
        inv: "plusmin",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.abs(value.val));
        }
    },
    ln: {
        name: "ln",
        inv: "exp",
        type: 0,
        evaluate: (value) => {
            return numc(math.complex.ln(value.val));
        }
    },
    // log: {
    //     name: "log",
    //     inv: "pow",
    //     type: 0,
    //     evaluate: (value) => {
    //         return numc(math.complex.log(value.val));
    //     }
    // },
};

const constants = {
    pi: {
        alias: ["PI", "pi"],
        numerical: num(Math.PI, 0),
        simplify: false,
    },
    e: {
        alias: ["e"],
        numerical: num(Math.E, 0),
        simplify: false,
    }
}


/**
 * 
 * @param {Array<String>} tokens 
 * @returns {Expression}
 */

const parse = (tokens) => {
    /**
    * 
    * @param {Array<String>} tokens 
    * @returns {Expression}
    */
    const parseVector = (tokens) => {
        tokens = tokens.slice(1, -1);
        var paren = 0;
        var curly = 0;
        const val = [];
        var last = 0;
        for (var i = 0; i < tokens.length; i++) {
            const curr = tokens[i];
            if (curr === "(") {
                paren++;
            } else if (curr === ")") {
                paren--;
            } else if (curr === "{") {
                curly++;
            } else if (curr === "}") {
                curly--;
            } else if (curly === 0 && paren === 0) {
                if (curr === ",") {
                    const a = parse(tokens.slice(last, i));
                    // console.log(a);
                    val.push(parse(tokens.slice(last, i)));
                    last = i + 1;
                }
            }
        }
        if (last != tokens.length) {
            const a = parse(tokens.slice(last));
            // console.log(a);
            val.push(parse(tokens.slice(last)));
        }

        return vec(val);
    }

    {// Surrounding Parenthesis
        removeSurroundingParenthesis = (tokens) => {
            if (tokens.length == 0) { return tokens; }
            var paren = 0;
            for (var i = 0; i < tokens.length; i++) {
                if (paren == 0 && i != 0) {
                    return tokens;
                } else if (i == 0 && tokens[i] != "(") {
                    return tokens;
                } else if (tokens[i] == "(") {
                    paren++;
                } else if (tokens[i] == ")") {
                    paren--;
                }
            }
            return removeSurroundingParenthesis(tokens.slice(1, -1));
        }

        tokens = removeSurroundingParenthesis(tokens);
    }

    {// Addition/Subtraction
        var paren = (tokens[-1] === ")" ? -1 : 0);
        var curly = (tokens[-1] === "}" ? -1 : 0);
        var abs = (tokens[-1] === "|" ? true : false);
        for (var i = tokens.length - 1; i >= 1; i--) {
            const curr = tokens[i];
            if (curr === "(") {
                paren++;
            } else if (curr === ")") {
                paren--;
            } else if (curr === "{") {
                curly++;
            } else if (curr === "}") {
                curly--;
            } else if (curr === "|") {
                abs = !abs;
            } else if (curly === 0 && paren === 0 && !abs) {
                if (curr === "+") {
                    return {
                        type: types.add,
                        l: parse(tokens.slice(0, i)),
                        r: parse(tokens.slice(i + 1))
                    };
                } else if (curr === "-") {
                    return {
                        type: types.sub,
                        l: parse(tokens.slice(0, i)),
                        r: parse(tokens.slice(i + 1))
                    };
                }
            }
        }
    }

    {// Multiplication/Division
        paren = (tokens[-1] === ")" ? -1 : 0);
        curly = (tokens[-1] === "}" ? -1 : 0);
        abs = (tokens[-1] === "|" ? true : false);
        for (var i = tokens.length - 1; i >= 1; i--) {
            const curr = tokens[i];
            if (curr === "(") {
                paren++;
            } else if (curr === ")") {
                paren--;
            } else if (curr === "{") {
                curly++;
            } else if (curr === "}") {
                curly--;
            } else if (curr === "|") {
                abs = !abs;
            } else if (curly === 0 && paren === 0 && !abs) {
                if (curr === "*") {
                    return {
                        type: types.mul,
                        l: parse(tokens.slice(0, i)),
                        r: parse(tokens.slice(i + 1))
                    };
                } else if (curr === "/") {
                    return {
                        type: types.div,
                        l: parse(tokens.slice(0, i)),
                        r: parse(tokens.slice(i + 1))
                    };
                }
            }
        }
    }

    if(false) {// Exponents
        paren = (tokens[-1] === ")" ? -1 : 0);
        curly = (tokens[-1] === "}" ? -1 : 0);
        abs = (tokens[-1] === "|" ? true : false);
        for (var i = tokens.length - 1; i >= 1; i--) {
            const curr = tokens[i];
            if (curr === "(") {
                paren++;
            } else if (curr === ")") {
                paren--;
            } else if (curr === "{") {
                curly++;
            } else if (curr === "}") {
                curly--;
            } else if (curr === "|") {
                abs = !abs;
            } else if (curly === 0 && paren === 0 && !abs) {
                if (curr === "^") {
                    return {
                        type: types.exp,
                        l: parse(tokens.slice(0, i)),
                        r: parse(tokens.slice(i + 1))
                    };
                }
            }
        }
    }
    // Terms

    {// Parse Term New

        
        /**
         * 
         * @param {Expression} multexp 
         * @returns {BinaryExpression}
         */
        const multAndParseNext = (multexp, i = 1) => {
            if(tokens.length == i && tokens[i] == "^"){

            }
            return {
                l: multexp,
                r: (tokens.length > i ? parse(tokens.slice(i)) : num(1)),
                type: types.mul
            };
        }

        /**
         * 
         * @param {Number} i 
         * @returns {{next: number, error: Object?, type: number?, term: Expression?}}
         */
        const nextTerm = (i) => {
            if(isNumber(tokens[i])){
                return {
                    next: i + 1,
                    error: null,
                    term: num(parseFloat(tokens[i]))
                };
            }else if(isWord(tokens[i])) {
                if(tokens[i] in functions) {
                    const result = nextTerm(i+1);
                    return {
                        next: result.next,
                        error: null,
                        term: {
                            type: types.elem_func,
                            name: tokens[i],
                            param: result.term,
                        }
                    }
                }else {
                    return {
                        next: i+1,
                        error: null,
                        term: {
                            type: types.var,
                            name: tokens[i],
                        }
                    }
                }
            }else if(["(", "{", "|"].includes(tokens[i])){
                paren = 0;
                curly = 0;
                abs = false;
                var type = -1;
                if(tokens[i] === "("){
                    paren = 1;
                    type = 0;
                }else if(tokens[i] === "{"){
                    curly = 1;
                    type = 1;
                }else if(tokens[i] === "|"){
                    abs = true;
                    type = 2;
                }
                i++;
                const beg = i;

                for (; i < tokens.length && !(paren == 0 && abs == 0 && curly == 0); i++) {
                    const curr = tokens[i];
                    if (curr === "(") {
                        paren++;
                    } else if (curr === ")") {
                        paren--;
                        if(type == 0 && paren == 0){
                            if(paren != 0 && curr != 0 && abs != false){
                                return {
                                    next: i + 1,
                                    error: {},
                                    type: null,
                                    term: null,
                                };
                            }

                            return {
                                next: i + 1,
                                error: null,
                                term: parse(tokens.slice(beg, i))
                            };
                        }
                    } else if (curr === "{") {
                        curly++;
                    } else if (curr === "}") {
                        curly--;
                        if(type == 1 && curly == 0){
                            abs = !abs;
                            if(type == 2 && !abs){
                                if(paren != 0 && curr != 0 && abs != false){
                                    return {
                                        next: i + 1,
                                        error: {},
                                        type: null,
                                        term: null,
                                    };
                                }
    
    
                                // return {
                                //     next: result.i,
                                //     error: null,
                                //     term: {
                                //         type: types.const,
                                //         valType: valTypes.vec

                                //         // name: tokens[i],
                                //     }
                                // }
                                console.log("DONTN GIVE ME VECS YET")
                                return {
                                    next: i + 1,
                                    error: {},
                                    type: null,
                                    term: null,
                                };
                            
                        }
                    } else if (curr === "|") {
                        abs = !abs;
                        if(type == 2 && !abs){
                            if(paren != 0 && curr != 0 && abs != false){
                                return {
                                    next: i + 1,
                                    error: {},
                                    type: null,
                                    term: null,
                                };
                            }

                            return {
                                next: i + 1,
                                error: null,
                                term: {
                                    type: types.elem_func,
                                    // name: tokens[i],
                                    name: "abs",
                                    param: parse(tokens.slice(beg, i)),
                                }
                            }
                        }
                    }

                    if(paren < 0 || curly < 0){
                        return {
                            next: i,
                            error: {},
                            type: null,
                            subtokens:[],
                        };
                    }
                }

                }

                return {
                    next: i + 1,
                    error: {},
                    type: null,
                    term: null,
                };
            }
        }

        var i = 0;
        // var currToken = tokens[i++];
        var lastTerm = num(1, 0);
        if(tokens[0] == "-"){
            lastTerm = num(-1, 0);
            i++;
            // currToken = tokens[i++];
        }

        while(i < tokens.length){
            const result = nextTerm(i);
            i = result.next;
            while(i < tokens.length && tokens[i] == "^") {
                const exponent = nextTerm(i + 1);
                i = exponent.next;
                result.term = {
                    type: types.exp,
                    l: result.term,
                    r: exponent.term,
                };
            }
            lastTerm = {
                type: types.mul,
                l: lastTerm, 
                r: result.term,
            };
        }

        return lastTerm;
    }

    {// Parse Terms Old
        
            
        /**
         * 
         * @param {Expression} multexp 
         * @returns {BinaryExpression}
         */
        const multAndParseNext = (multexp, i = 1) => {
            return {
                l: multexp,
                r: (tokens.length > i ? parse(tokens.slice(i)) : num(1)),
                type: types.mul
            };
        }

        const findNextParenGroup = () => {
            paren = 0;
            curly = 0;
            abs = 0;
            if(tokens[0] === "("){
            paren++;
            }else if(tokens[0] === "{"){
            curly++;
            }else if(tokens[0] === "|"){
            abs = 1;
            }
            var i;
            // console.log("INDEX ", i, tokens.length)
            for (i = 1; i < tokens.length && !(paren == 0 && abs == 0 && curly == 0); i++) {
                // console.log("INDEX ", i, tokens.length)
                const curr = tokens[i];
                // console.log("PAREN ", curr, paren, curly, abs);
                if (curr === "(") {
                    paren++;
                } else if (curr === ")") {
                    paren--;
                } else if (curr === "{") {
                    curly++;
                } else if (curr === "}") {
                    curly--;
                } else if (curr === "|") {
                    abs = !abs;
                }
            }
            return i;
        }


        const next = tokens[0];
        if (isNumber(next)) {
            return multAndParseNext(num(parseFloat(next)));
        }
        const variable = variables[next];
        const func = functions[next];
        //const constants = constants[next];
        // console.log("BrUH ",func, variable)
        if (next == "i") {
            return multAndParseNext(num(0, 1), 1);
        } else if (variable) {
            if (variable.type == 1) {

            } else if (variable.type == 0) {

                if (tokens.length >= 4 && tokens[1] === "(") {
                    const begin = 1;
                    const end = findNextParenGroup() + 1;
                    if (end != -1) {
                        const params = tokens.slice(begin, end);
                        return multAndParseNext({
                            type: types.elem_func,
                            funct: variable,
                            param: parse(params)
                        }, end)
                    }
                }

                return {
                    type: types.elem_func,
                    funct: variable,
                    param: parse(tokens.slice(1))
                }
            } else if (variable.type == 2) {
                if (variable.instanteval) {
                    return multAndParseNext(numc(variable.value));
                } else {
                    return multAndParseNext({
                        type: types.var,
                        name: variable.name
                    });
                }
            }
        }else if(func) {
        if(func.type === 0){
            tokens = tokens.slice(1);
            // console.log("ACDSA",tokens)
            const i = findNextParenGroup();
            const parameters = tokens.slice(0, i);
            // console.log(parameters)
            return multAndParseNext({
            type: types.elem_func,
            funct: func,
            param: parse(parameters)
            }, i);
        }else if(func.type === 1){

        }   
        }else if(next == "-"){
        // console.log(tokens)
        return multAndParseNext(num(-1));
        }else {
            if (next == "(") {
                const begin = 0;
                const end = findNextParenGroup();
                return multAndParseNext(parse(tokens.slice(begin, end)), end)
            }
            return multAndParseNext({
                type: types.var,
                name: next,
            });
        }
}
}

/**
 * 
 * @param {Expression} exp 
 * @returns {ConstantExpression}
 */
const evaluate = (exp, vars={}) => {
    var l, r;
    var param;
    switch (exp.type) {
        case types.add:
            l = evaluate(exp.l, vars);
            r = evaluate(exp.r, vars);
            if (l.valType === r.valType) {
                switch (l.valType) {
                    case valTypes.num:
                        return numc(math.complex.add(l.val, r.val));
                    case valTypes.vec:
                        return vec(l.val.map((value, i) => num(evaluate(value, vars).val + evaluate(r.val[i]).val, vars)));
                }
            }
            break;
        case types.sub:
            l = evaluate(exp.l, vars);
            r = evaluate(exp.r, vars);
            if (l.valType === r.valType) {
                switch (l.valType) {
                    case valTypes.num:
                        return numc(math.complex.sub(l.val, r.val));
                    case valTypes.vec:
                        return vec(l.val.map((value, i) => num(evaluate(value, vars).val - evaluate(r.val[i]).val, vars)));
                }
            }
            break;
        case types.mul:
            l = evaluate(exp.l, vars);
            r = evaluate(exp.r, vars);
            // console.log("EVAL",l,r);
            if (l.valType == valTypes.num) {
                if (r.valType == valTypes.num) {
                    return numc(math.complex.mul(l.val, r.val));
                } else if (r.valType == valTypes.vec) {
                    return vec(r.val.map(value => num(evaluate(value, vars).val * l.val)));
                }
            } else if (l.valType == valTypes.vec) {
                if (r.valType == valTypes.num) {
                    return vec(l.val.map(value => num(evaluate(value, vars).val * r.val)));
                } else if (r.valType == valTypes.vec) {
                    return vec(r.val.map((value, i) => num(evaluate(value, vars).val * evaluate(l[i]).val, vars)));
                }
            }
            break;
        case types.div:
            l = evaluate(exp.l, vars);
            r = evaluate(exp.r, vars);
            if (l.valType === r.valType) {
                switch (l.valType) {
                    case valTypes.num:
                        return numc(math.complex.div(l.val, r.val));
                    case valTypes.vec:
                        break;
                }
            }
            break;
        case types.exp:
            l = evaluate(exp.l, vars);
            r = evaluate(exp.r, vars);
            if (l.valType === r.valType) {
                switch (l.valType) {
                    case valTypes.num:
                        return numc(math.complex.pow(l.val, r.val));
                    case valTypes.vec:
                        break;
                }
            }
            break;
        case types.var:
            const value = vars[exp.name];
            // console.log(vars)
            if(value){
            return value;
            }
            console.error(`No value for variable "${exp.name}" specified.`);
            break;
        case types.const:
            switch (exp.valType) {
                case valTypes.num:
                    return exp;
                case valTypes.vec:
                    return { type: types.const, valType: valTypes.vec, val: exp.val.map((exp) => { return evaluate(exp, vars); }) };
                case valTypes.mat:

            }
            return exp;
        case types.elem_func:
            param = evaluate(exp.param, vars);
            return functions[exp.name].evaluate(param);
        case types.defined_func:
            param = evaluate(exp.param, vars);
            //return exp.funct.
            return null;
    }
};


/**
 * 
 * @param {Expression} exp
 * @returns {String} 
 */
function string(exp, precesdence = 0) {
    // console.log("stringing exp", exp)
    if (!exp) return "NULL";
    var out = "";
    switch (exp.type) {
        case types.add:
            
            if (precesdence > 0) {
                return `(${string(exp.l)} + ${string(exp.r)})`;
            }
            return `${string(exp.l)} + ${string(exp.r)}`;
        case types.sub:
            if (precesdence > 0) {
                return `(${string(exp.l)} - ${string(exp.r)})`;
            }
            return `${string(exp.l)} - ${string(exp.r)}`;
        case types.mul:
            if (precesdence > 1) {
                return `(${string(exp.l,1)} * ${string(exp.r,1)})`;
            }
            return `${string(exp.l,1)} * ${string(exp.r,1)}`;
        case types.div:
            if (precesdence > 1) {
                return `(${string(exp.l,1)} / ${string(exp.r,1)})`;
            }
            return `${string(exp.l,1)} / ${string(exp.r,1)}`;
        case types.exp:
            if (precesdence > 2) {
                return `(${string(exp.l,2)} ^ ${string(exp.r,2)})`;
            }
            return `${string(exp.l,2)} ^ ${string(exp.r,2)}`;
        case types.elem_func:
        case types.defined_func:
            return `${exp.name}(${string(exp.param)})`;
        case types.var:
            return `${exp.name}`;
        case types.const:
            switch (exp.valType) {
                case valTypes.num:
                    return math.complex.string(exp.val);
                case valTypes.vec:
                    if (exp.val.length >= 1) {
                        out += `{${string(exp.val[0])}`;
                        for (var i = 1; i < exp.val.length; i++) {
                            out += `, ${string(exp.val[i])}`;
                        }
                        out += `}`;
                    }
                    break;
                case valTypes.mat:
                    break;
            }
            break;
        case types.equ:
            return `${string(exp.l)} = ${string(exp.r)}`;
        case types.flat_add:
            exp.child.forEach((e, i) => {
                out += string(e)
                if (i != exp.child.length - 1) {
                    out += " + ";
                }
            })
            if(precesdence > 0){
                return `(${out})`;
            }
            return out;
        case types.flat_mult:
            exp.child.forEach((e, i) => {
                out += string(e)
                if (i != exp.child.length - 1) {
                    out += " * ";
                }
            })
            if(precesdence > 1){
                return `(${out})`;
            }
            return out;
    }
    return out;
}

/**
 * 
 * @param {[String]} tokens 
 */
const parseEquation = (tokens) => {
    var i = tokens.findIndex((e) => { return e === "="; });

    const front = parse(tokens.slice(0, i));


    const expression = parse(tokens.slice(i + 1));

    return {
        type: types.equ,
        l: front,
        r: expression,
    }
}


/**
 * 
 * @param {Expression} expression
 * @returns {Expression}
 */
const clean = (expression) => {
    var l, r, lc, rc;
    var child = [];
    switch (expression.type) {
        case types.add:
            l = clean(expression.l);
            r = clean(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && math.complex.zero(r.val)) {
                return l;
            }
            if (lc && math.complex.zero(l.val)) {
                return r;
            }

            return {
                type: types.add,
                l: l,
                r: r,
            }
        case types.sub:
            l = clean(expression.l);
            r = clean(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && math.complex.zero(r.val)) {
                return l;
            }
            if (lc && math.complex.zero(l.val)) {
                return {
                    type: types.mul,
                    l: num(-1),
                    r: r,
                };
            }

            return {
                type: types.sub,
                l: l,
                r: r,
            }
        case types.mul:
            l = clean(expression.l);
            r = clean(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && math.complex.zero(r.val)) {
                return num(0);
            }
            if (lc && math.complex.zero(l.val)) {
                return num(0);
            }
            if (rc && math.complex.eql(r.val, math.complex.real(1))) {
                return l;
            }
            if (lc && math.complex.eql(l.val, math.complex.real(1))) {
                return r;
            }


            return {
                type: types.mul,
                l: l,
                r: r,
            }
        case types.div:
            l = clean(expression.l);
            r = clean(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && math.complex.zero(r.val)) {
                return num(NaN);
            }
            if (lc && math.complex.zero(l.val)) {
                return num(0);
            }
            if (rc && math.complex.eql(r.val, math.complex.real(1))) {
                return l;
            }
            if(lc && math.complex.eql(l.val, math.complex.real(1))){
                return num(1);
            }

            return {
                type: types.div,
                l: l,
                r: r,
            }
        case types.var:
            return expression;
        case types.elem_func:
        case types.defined_func:
            expression.param = clean(expression.param);
            return expression;
        case types.exp:
            l = clean(expression.l);
            r = clean(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (lc && math.complex.eql(l.val, math.complex.real(1))) {
                return num(1);
            } else if (lc && math.complex.zero(l.val)) {
                if (rc && math.complex.zero(r.val)) {
                    return num(NaN);
                }
                return num(0);
            }

            return {
                type: types.exp,
                l: l,
                r: r,
            }
        case types.equ:
            return {
                type: types.equ,
                l: clean(expression.l),
                r: clean(expression.r),
            }
        case types.const:
            return expression;
        case types.flat_add:
            expression.child.forEach((e, i) => {
                e = clean(e);
                if (!(e.type == types.const && math.complex.zero(e.val))) {
                    child.push(e);
                }
            })
            return {
                type: types.flat_add,
                child: child
            };
        case types.flat_mult:
            const bruh = expression.child.map((e) => { return clean(e) });
            if (bruh.some((e) => { return e.type == types.const && math.complex.zero(e.val) })) {
                return num(0, 0);
            }
            expression.child.forEach((e, i) => {
                if (!(e.type == types.const && math.complex.eql(e.val, math.complex.real(1)))) {
                    child.push(e);
                }
            })
            return {
                type: types.flat_mult,
                child: child
            };
    }
}




/**
 * 
 * @param {Expression} a 
 * @param {Expression} b 
 */
const equal = (a, b) => {
    if (a.type != b.type) return false;


}






const flatten = (expression) => {

    const res = [];

    const search = (e, query = () => { return false }) => {
        // console.log(e);
        if (query(e)) {
            search(e.l, query);
            search(e.r, query);
        } else {
            res.push(e);
        }
    }

    var l, r, lc, rc;
    switch (expression.type) {
        case types.add:
            search(expression, (e) => { return e.type == types.add });
            return {
                type: types.flat_add,
                child: res.map((e) => flatten(e))
            };
        case types.mul:
            search(expression, (e) => { return e.type == types.mul });
            return {
                type: types.flat_mult,
                child: res.map((e) => flatten(e))
            };
        case types.div:
        case types.sub:
            l = flatten(expression.l);
            r = flatten(expression.r);
            return {
                type: expression.type,
                l: l,
                r: r,
            };
        case types.elem_func:
        case types.defined_func:
            expression.param = flatten(expression.param);
            return expression;
        case types.exp:
            l = flatten(expression.l);
            r = flatten(expression.r);
            return {
                type: types.exp,
                l: l,
                r: r,
            };
        case types.var:
        case types.equ:
        case types.const:
            return expression;
    }
}


const evaluateArithmetic = (expression) => {
    var l, r, lc, rc;
    var child = [];
    switch (expression.type) {
        case types.add:
            l = evaluateArithmetic(expression.l);
            r = evaluateArithmetic(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && lc) {
                return numc(math.complex.add(l.val, r.val));
            }
            return {
                type: types.add,
                l: l,
                r: r,
            };
        case types.sub:
            l = evaluateArithmetic(expression.l);
            r = evaluateArithmetic(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && lc) {
                return numc(math.complex.sub(l.val, r.val));
            }
            return {
                type: types.sub,
                l: l,
                r: r,
            };
        case types.mul:
            l = evaluateArithmetic(expression.l);
            r = evaluateArithmetic(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && lc) {
                return numc(math.complex.mul(l.val, r.val));
            }
            return {
                type: types.mul,
                l: l,
                r: r,
            };
        case types.div:
            l = evaluateArithmetic(expression.l);
            r = evaluateArithmetic(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (rc && lc) {
                return numc(math.complex.div(l.val, r.val));
            }
            return {
                type: types.div,
                l: l,
                r: r,
            };
        case types.elem_func:
        case types.defined_func:
            expression.param = clean(expression.param);
            return expression;
        case types.exp:
            l = evaluateArithmetic(expression.l);
            r = evaluateArithmetic(expression.r);
            lc = l.type === types.const;
            rc = r.type === types.const;
            if (lc && rc) {
                return numc(math.complex.pow(l.val, r.val));
            }
            return {
                type: types.exp,
                l: l,
                r: r,
            };
        case types.var:
        case types.equ:
        case types.const:
            return expression;
        case types.flat_add:
            var sum = math.complex.real(0);
            expression.child.forEach((e) => {
                e = evaluateArithmetic(e);
                if (e.type == types.const) {
                    sum = math.complex.add(sum, e.val);
                } else {
                    child.push(e);
                }
            });
            if (child.length == 0) {
                return numc(sum);
            }
            if (!math.complex.zero(sum)) {
                child.push(numc(sum));
            }
            return {
                type: types.flat_add,
                child: child,
            };
        case types.flat_mult:
            var prod = math.complex.real(1);
            expression.child.forEach((e) => {
                e = evaluateArithmetic(e);
                if (e.type == types.const) {
                    prod = math.complex.mul(prod, e.val);
                } else {
                    child.push(e);
                }
            });

            if (child.length == 0) {
                return numc(prod);
            }
            if (math.complex.zero(prod)) {
                return num(0, 0);
            }
            if (!math.complex.eql(prod, math.complex.real(1))) {
                child.push(numc(prod));
            }
            return {
                type: types.flat_mult,
                child: child,
            };
    }
}


/**
 * 
 * @param {Expression} expression 
 * @param {Object<String, Expression>} substitutions 
 */
const substitute = (expression, substitutions) => {
    var l, r, lc, rc;
    var child = [];
    switch (expression.type) {
        case types.add:
        case types.sub:
        case types.mul:
        case types.div:
        case types.exp:
        case types.equ:
            l = substitute(expression.l, substitutions);
            r = substitute(expression.r, substitutions);
            return {
                type: expression.type,
                l: l,
                r: r,
            };
        case types.elem_func:
            return {
                type: expression.type,

            }
        case types.defined_func:

            return expression;
        case types.var:
            if(expression.name in substitutions){
                return substitutions[expression.name];
            }
        case types.const:
            return expression;
        case types.flat_add:
            return
        case types.flat_mult:
            return;
    }
}









module.exports = {
    types: types,
    valTypes: valTypes,
    parse: (source) => {
        return parse(tokenize(source));
    },
    tokenize: (source) => {
        return tokenize(source);
    },
    evaluate: (source, vars={}) => {
        return evaluate(parse(tokenize(source)),vars);
    },
    clean: clean,
    string: string,
    //variables: variables,
    num: num,
    flatten: flatten,
    num: num,
    numc: numc,
    vec: vec,
    evaluateArithmetic: evaluateArithmetic,
};