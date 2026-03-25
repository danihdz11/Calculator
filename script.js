let fullOp = '';
let res = 0;
let isOp = false

function handleClick(number) {

    if (isOp && (number === '+' | number == '-' | number == '/' | number == 'x')) {
        return;
    }

    if (number === '+' | number == '-' | number == '/' | number == 'x') {
        isOp = true;
    }

    console.log(number);
    fullOp = fullOp + number
    showNumber1(fullOp);
}

function erase() {
    document.getElementById("screen").innerHTML = '';
    document.getElementById("screen2").innerHTML = '';
    fullOp = ''
    isOp = false
    res = 0
}

function calculate() {
    console.log(fullOp);
    const [a,op,b] = fullOp.split(/(\+|-|x|\/|\^)/gm);
    console.log({a, op, b});
    switch(op){
        case "+":
            res = Number(a) + Number(b)
            break
        case "-":
            res = Number(a) - Number(b)
            break
        case "x":
            res = Number(a) * Number(b)
            break
        case "/":
            res = Number(a) / Number(b)
            break
        case "^":
            res = Math.pow(Number(a), Number(b))
            break
        case "%":
            res = 10-2
        default:
            break
    }
    isOp = false
    showNumber2(res);
}

function showNumber1(n) {
    document.getElementById("screen").innerHTML = n;
}

function showNumber2(n) {
    document.getElementById("screen2").innerHTML = n;
}