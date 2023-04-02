const expression = require("./expression.js");
const util = require("./util");
const math = require("./complex.js");
const variables = {
    x:0,
    y:1,
    z:2
};

const numbers = {
    a: 0,
    b: 1,
    c: 2,
}

function structuredClone(cloned){
    if(typeof(cloned) == "object"){
        if(Array.isArray(cloned)){
            return cloned.map((item) => structuredClone(item));
        }else {
            const out = {};
            Object.keys(cloned).forEach((key) => {
                out[key] = structuredClone(cloned[key]);
            })
            return out;
        }
    }else {
        return cloned;
    }
}

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


// x y z are variables.
// a b c .. are constants



function matchTregexInit(matched, pattern, options={vars:{},variables:{x:0, y:1, z:2},constants:{a:0, b:1, c:2},expressions:{u:0, v:1, w: 2}}){

    const vars = options.vars;
    options.variables = options.variables ?? {x:0,y:1,z:2};
    options.constants = options.constants ?? {a:0,b:1,c:2};
    options.expressions = options.expressions ?? {u:0, v:1, w: 2};

    /**
     * 
     * @param {expression.Expression} matched 
     * @param {expression.Expression} pattern 
     * @param {{vars:Map<string,import("./expression.js").VariableExpression|import("./expression.js").ConstantExpression}, variables:Map<string,number>, constants:Map<string, number>}}} options 
     * @returns 
     */
    function matchTregex(matched, pattern){
        console.log("matching", expression.string(matched), expression.string(pattern));
        if(pattern.type == expression.types.var){
            if(options.variables[pattern.name] != null){
                // console.log("matching variables ", pattern.name, options.variables);
                console.log(`\"${pattern.name}\" matches a variable.`);
                if(matched.type == expression.types.var){
                    if(vars[pattern.name]){
                        console.log(`\"${pattern.name}\" already defined. Checking if equal to \"${vars[pattern.name]}\".`);
                        return vars[pattern.name] === matched.name;
                    }else{
                        console.log(`\"${pattern.name}\" is not defined. Defining it as \"${expression.string(matched)}\".`);
                        vars[pattern.name] = matched.name;
                        return true;
                    }
                }
                console.log(`\"${expression.string(matched)}\" is not a variable.`);
            }else if(options.constants[pattern.name] != null){
                // console.log("both numbers ", pattern.name, variables);
                console.log(`\"${pattern.name}\" matches a constant.`);
                if(matched.type == expression.types.const){
                    if(vars[pattern.name]){    
                        console.log(`\"${pattern.name}\" already defined. Checking if equal to \"${math.complex.string(vars[pattern.name])}\".`);
                        return math.complex.eql(vars[pattern.name], matched.val);
                    }else {
                        console.log(`\"${pattern.name}\" is not defined. Defining it as \"${expression.string(matched)}\".`);
                        vars[pattern.name] = matched.val;
                        return true; 
                    }
                }
                console.log(`\"${expression.string(matched)}\" is not a constant.`);
            }else if(options.expressions[pattern.name] != null){
                console.log(`\"${pattern.name}\" matches an expression.`);
                if(vars[pattern.name]){
                    console.log(`\"${pattern.name}\" already defined. Checking if equal to \"${expression.string(vars[pattern.name])}\".`);
                    return strictEquals(vars[pattern.name], matched);
                }else{
                    console.log(`\"${pattern.name}\" is not defined. Defining it as \"${expression.string(matched)}\".`);
                    vars[pattern.name] = matched;
                    return true;
                }
            }

            return false;
        }
        if(matched.type != pattern.type) {
            return false;
        }

        switch(matched.type) {
        case expression.types.add:
            console.log("\"add\" not supported in tregex");
            return false
        case expression.types.sub:
            console.log("\"sub\" not supported in tregex");
            return false
        case expression.types.mul:
            console.log("\"mul\" not supported in tregex");
            return false
        case expression.types.div:
            console.log("\"div\" not supported in tregex");
            return false
        case expression.types.exp:
            return matchTregex(matched.l, pattern.l) && matchTregex(matched.r, pattern.r);
        case expression.types.elem_func:
            return (matched.name == pattern.name) && matchTregex(matched.param, pattern.param)
        case expression.types.defined_func:
            return false;
        case expression.types.const:
            return math.complex.eql(matched.val, pattern.val);
        case expression.types.var:
            return false
        case expression.types.equ:
            return false
        case expression.types.flat_add:
        case expression.types.flat_mult:
        // const neededTerms = structuredClone(matched);
        // var local_vars = structuredClone(vars);
        // for(var i = 0; i < neededTerms.length; i ++){

        // }
        // return false

        var visited = matched.child.map(() => false);

        function dfs_match(vars, visited, i=0){
            console.log("new local vars", vars)
            if(i >= pattern.child.length){
                return true;
            }

            for(var j = 0; j < matched.child.length; j ++){
                if(!visited[j]){
                    console.log(`Matching \"${expression.string(pattern.child[i])}\" with \"${expression.string(matched.child[j])}\"`)
                    const old_vars = vars;
                    const local_vars = structuredClone(vars);
                    vars = local_vars;
                    if(matchTregex(matched.child[j], pattern.child[i], )){
                        visited[j] = true;
                        const result = dfs_match(local_vars, visited, i+1);
                        visited[j] = false;
                        if(result){
                            return true;
                        }
                    }
                    vars = old_vars;
                }
            }
            return false;
        }

        return dfs_match(structuredClone(vars), visited, 0);

        case expression.types.differential:
            return false
        }
    }

    const result = matchTregex(matched, pattern);
    return {matches: result, variables: vars};
}



/*
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
*/

module.exports = {
matchTregex: matchTregexInit
}