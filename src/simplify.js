
const expression = require("./expression");



/**
 * 
 * @param {expression.Expression} exp1 
 * @param {expression.Expression} exp2 
 * @returns 
 */
 function strictEquals(exp1, exp2) {
    if(exp1.type != exp2.type){
        return false;
    }
    switch(exp1.type) {
        case expression.types.add:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r); 
        case expression.types.sub:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r);
        case expression.types.mul:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r);
        case expression.types.div:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r);
        case expression.types.exp:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r);
        case expression.types.elem_func:
            return false
        case expression.types.defined_func:
            return false
        case expression.types.const:
            return exp1.valType == exp2.valType && math.complex.eql(exp1.val, exp2.val);
        case expression.types.var:
            return exp1.name == exp2.name;
        case expression.types.equ:
            return strictEquals(exp1.l, exp2.l) && strictEquals(exp1.r, exp2.r);
        case expression.types.flat_add:
        case expression.types.flat_mult:
            if(exp1.child.length != exp2.child.length){
                return false;
            }    
            const a = structuredClone(exp1.child);

            exp2.child.forEach((e1) => {
                const i = a.findIndex((e2) => {return strictEquals(e1, e2);});
                a.splice(i,1);
            });
            return a.length == 0;
        case expression.types.differential:
            return false
        }
}

const simplify = (exp) => {
    console.log(exp)
    exp = expression.flatten(expression.clean(exp));
    console.log(exp)
    // console.log(exp)
    // console.log(expression.string(exp))
    // console.log(expression.clean(exp))
    // console.log(exp);
    return expression.evaluateArithmetic(exp);
};


module.exports.simplify = simplify;