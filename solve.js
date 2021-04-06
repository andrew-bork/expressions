/**
 * 
 * @typedef {BinaryExpression|ConstantExpression|FunctionExpression|VariableExpression} Expression
 * @typedef {{type: 0|1|2|3|4|8, l: Expression, r: Expression}} BinaryExpression
 * @typedef {{type: 5, funct: ExpressionFunction, param: Expression}} FunctionExpression
 * @typedef {{type: 6, valType:0|1|2, val: number}} ConstantExpression
 * @typedef {{type: 7}} VariableExpression
 * @typedef {{type:0, evaluate: (val:ConstantExpression) => ConstantExpression}} ExpressionFunction
 * 
 * 
 * 
 * 
 */

const { types, valTypes, parse, tokenize, evaluate, string, clean } = require("./expression");

/**
 * 
 * @param {BinaryExpression} equation 
 * @returns 
 */
const solve = (equation) => {
    if (equation.type != 8) return false;
    equation.l;
    equation.r;
}

const findUnknowns = (expression, variables) => {
    const knowns = Object.keys(variables);
    const unknowns = [];

    const search = (e) => {
        switch (e.type) {
            case types.add:
            case types.sub:
            case types.mul:
            case types.div:
            case types.exp:
            case types.equ:
                search(e.l);
                search(e.r);
                break;
            case types.func:
                search(e.param);
                break;
            case types.var:
                if (knowns.find(b => b === e.name) == null && unknowns.find(b => b === e.name) == null) {
                    unknowns.push(e.name);
                }
            case types.const:
        }
    }
    search(expression);
    console.log(unknowns);
}


console.log(findUnknowns(parse("(x+y)/y"), { y: 0 }));