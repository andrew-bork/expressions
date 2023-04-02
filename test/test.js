const expression = require("../src/expression")
// const test = "cos(asin(-2))";
// console.log(expression.tokenize(test));
// console.log(expression.parse(test));
// console.log(expression.string(expression.parse(test)));
// console.log(expression.string(expression.evaluate(test, {x: expression.num(Math.PI/2)})));

// expression.parse("sin(x)");
// console.log(expression.string(expression.simplify(expression.clean(expression.parse("6 * 2 + 7 * x + 3")))));

const regex_tree = require("../src/regex-tree.js");

// [pattern, matched]
const tests = [
    ["x^a", "b^2", true],
    ["a*a", "2*4", false],
    ["a*b", "2*4", true],
    ["b*b*b*x", "2*2*x*2", true],
    ["2+x", "x+2", true],
    ["3+x", "x+2", false],
    ["a+x", "x+2", true],
    ["a+ax", "2+2x", true],
    ["a+ax", "2+3x", false],
    ["sin(x)", "sin(x)", true],
    ["sin(x)", "cos(x)", false],
    ["a*sin(ax)", "2sin(2x)", true],
    ["a*sin(ax)", "2sin(4x)", false],
    ["a*sin(bx)", "2sin(4x)", true],
    ["u*sin(u)","(1+2x) * sin(1+2x)", true],
    ["sin(u)cos(u)","(1+2x)sin(1+2x)", false],
    ["sin(u)cos(u)","sin(2)cos(2)", true],
    ["sin(u)cos(u)","sin(2)cos(4)", false],
    ["sin(u)cos(4)","sin(2)cos(4)", true],
    ["cos(u)sin(2)","sin(2)cos(4)", true],
    ["u*(1+2*u)","2x*(1+4x)", true],
    ["ln(a)+ln(b)","ln(1)+ln(2)", true],
    ["sin(u)^2+cos(u)^2","sin(xy)^2 + cos(xy)^2", true],
    ["sin(a * pi / 2)","1-sin(u)^2", true],
    ["u*(1+2*u)","2x*(1+4x)", true],
];

const failed = []
var success = 0;

// console.log(expression.string(expression.parse("(1+2x)sin(1+2x)")))
tests.forEach((test) => {
    const pattern = expression.flatten(expression.clean(expression.parse(test[0])));
    const matched = expression.flatten(expression.clean(expression.parse(test[1])));
    console.log(matched)
    const result = regex_tree.matchTregex(matched, pattern);
    if(result.matches){
        console.log(`\"${test[1]}\" matches pattern \"${test[0]}\".`);
        console.log("variables defined: ", result.variables)
    }else{
        console.log(`\"${test[1]}\" does not match pattern \"${test[0]}\".`);
    }
    if(result.matches == test[2]){
        // console.log("Test Passed.");
        success ++;
    }else{
        failed.push(test)
        // console.log("Test Failed");
    }


});
console.log("\nFailed Tests: \n", failed);
console.log(`Score: (${success}/${tests.length}) ${Math.round(100 * success/tests.length)}%`)


// const simplifyier = require("./simplify");
// 
// console.log(expression.tokenize("22x^23+435sin(x)|y|+zcos(pix)"))
// const simplified = expression.parse("lnx");
// console.log(simplified)
// console.log(expression.string(simplified));
// console.log(expression.string(simplifyier.simplify(simplified)));

// console.log(simplified);
// console.log(expression.string(simplified))