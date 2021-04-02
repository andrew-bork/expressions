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

const { types, valTypes, parse, tokenize, evaluate, string } = require("./expression");

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