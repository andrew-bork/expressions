const error = 0.00001;

const real = (n) => {
    return { r: n, i: 0 };
}
const imag = (n) => {
    return { r: 0, i: n };
}
const comp = (r = 0, i = 0) => {
    return { r: r, i: i };
}

const eql = (a, b) => {
    return zero(sub(a, b));
}

const zero = (a) => {
    return a.r > -error && a.r < error && a.i > -error && a.i < error;
}
const add = (a, b) => {
    return { r: a.r + b.r, i: a.i + b.i };
}
const sub = (a, b) => {
    return { r: a.r - b.r, i: a.i - b.i };
}
const mul = (a, b) => {
    return { r: a.r * b.r - a.i * b.i, i: a.i * b.r + a.r * b.i };
}
const muls = (a, n = 1) => {
    return { r: a.r * n, i: a.i * n };
}
const div = (a, b) => {
    if (isReal(a) && isReal(b)) return real(a.r / b.r);
    return muls(mul(a, conj(b)), b.r * b.r + b.i * b.i);
}
const cis = (n) => {
    return { r: Math.cos(n), i: Math.sin(n) };
};

const isReal = (a) => {
    return a.i > -error && a.i < error;
}

const isImag = (a) => {
    return a.r > -error && a.r < error;
}

const exp = (a) => {
    if (isReal(a)) return real(Math.exp(a.r));
    return muls(cis(a.i), Math.exp(a.r));
}

const pow = (a, b) => {
    const areal = isReal(a);
    const breal = isReal(b);

    // if (areal) {
    //     if (breal) {
    //         return real(Math.pow(a.r, b.r));
    //     }
    //     // return muls(cis(Math.log(a.r) * b.i), Math.pow(a.r, b.r));
    // }
    console.log("EXP",exp(mul(ln(a), b)))
    return exp(mul(ln(a), b));
}

const ln = (a) => {
    return { r: Math.log(mag(a)), i: Math.atan2(a.i, a.r) };
}
const log = (a, base) => {
    return div(ln(a), ln(base));
}
const mag = (a) => {
    return Math.sqrt(a.r * a.r + a.i * a.i);
}
const conj = (a) => {
    return { r: a.r, i: -a.i };
}

const sin = (a) => {
  console.log("SIN",a)
  return {r: Math.sin(a.r)*Math.cosh(a.i), i: Math.cos(a.r) * Math.sinh(a.i)}
}

const cos = (a) => {
  return {r: Math.cos(a.r)*Math.cosh(a.i), i: -Math.sin(a.r) * Math.sinh(a.i)}
}

const tan = (a) => {
  return div(sin(a), cos(a));
}

const sec = (a) => {
  return div({r:1, i:0}, cos(a));
}

const csc = (a) => {
  return div({r:1, i:0}, sin(a));
}

const cot = (a) => {
  return div(cos(a), sin(a));
}

const recip = (a) => {
  return div({r: 1, i: 0}, a);
}

const asin = (a) => {
  console.log(sub(real(1), mul(a,a)));
  console.log(pow(sub(real(1), mul(a,a)), real(0.5)));
  return mul(imag(1), ln(add(pow(sub(real(1), mul(a,a)), real(0.5)),mul(a, imag(1)))));
}

const acos = (a) => {
  return mul(imag(1), ln(add(pow(sub(mul(a,a),real(1)), real(0.5)),a)));
}

const atan = (a) => {
  return mul(imag(0.5), ln(div(add(imag(1), a),sub(imag(1), a))));
}

const asec = (a) => {
  return acos(recip(a));
}

const acsc = (a) => {
  return asin(recip(a));
}

const acot = (a) => {
  return mul(imag(0.5), ln(div(sub(a,imag(1)),add(a,imag(1)))));
}

const sinh = (a) => {
  return muls(sub(exp(a), exp(muls(a, -1))), 0.5);
}

const cosh = (a) => {
  return muls(add(exp(a), exp(muls(a, -1))), 0.5);
}

const tanh = (a) => {
  return div(sinh(a), cosh(a));
}

const sech = (a) => {
  return div(real(1), cosh(a));
}

const csch = (a) => {
  return div(real(1), sinh(a));
}

const coth = (a) => {
  return div(cosh(a), sinh(a));
}

const asinh = (a) => {
  return ln(add(a, pow(add(mul(a,a,), real(1)), real(0.5))))
}

const acosh = (a) => {
  return ln(add(a, mul(pow(add(a,real(1)), real(0.5)), pow(sub(a, 1),0.5))));
}

const atanh = (a) => {
  return muls(ln(div(add(real(1), a), sub(real(1), a))), 0.5)
}

const asech = (a) => {
  return acosh(recip(a));
}

const acsch = (a) => {
  return asinh(recip(a));
}

const acoth = (a) => {
  return muls(ln(div(add(real(1), a), sub(a, real(1)))), 0.5)
}

const string = (a) => {
    if (isReal(a)) {
        return `${a.r}`;
    }
    if (isImag(a)) {
        return `${(a.i === 1 ? "" : (a.i === -1 ? "-1" : a.i))}i`;
    }
    return `${a.r} ${(a.i < 0 ? "-" : "+")} ${(Math.abs(a.i) == 1 ? "" : Math.abs(a.i))}i`;
}

const abs = (a) => {
    return Math.sqrt(a.r * a.r + a.i * a.i);
}
module.exports = {
    complex: {
        add: add,
        sub: sub,
        mul: mul,
        muls: muls,
        div: div,
        exp: exp,
        pow: pow,
        ln: ln,
        conj: conj,
        log: log,
        real: real,
        isReal: isReal,
        comp: comp,
        imag: imag,
        string: string,
        abs: abs,
        eql: eql,
        zero: zero,
        sin: sin,
        cos: cos,
        tan: tan,
        sec: sec,
        csc: csc,
        cot: cot,
        asin: asin,
        acos: acos,
        atan: atan,
        asec: asec,
        acsc: acsc,
        acot: acot,
        sinh: sinh,
        cosh: cosh,
        tanh: tanh,
        sech: sech,
        csch: csch,
        coth: coth,
        asinh: asinh,
        acosh: acosh,
        atanh: atanh,
        asech: asech,
        acsch: acsch,
        acoth: acoth
    }
};