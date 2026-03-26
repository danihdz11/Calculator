let fullOp = '';
let res = 0;
let isOp = false

function handleClick(number) {

    if (number === 'DEL') {
        if (fullOp.length === 0)return;
        fullOp = fullOp.slice(0, -1);
        isOp = false;
        for (let i = 1; i < fullOp.length; i++) {
            const c = fullOp[i];
            if (c === '+' || c === 'x' || c === '/' || c === '^' || c === '-') {
                isOp = true;
                break;
            }
        }
        showNumber1(fullOp);
        return;
    }

    if (fullOp === "" && (number === "+" || number === "x" || number === "/" || number === "^")) {
        return;
    }

    if (number === "-" && (fullOp === "" || /[+\-x/^]$/.test(fullOp))) {
        fullOp = fullOp + number;
        showNumber1(fullOp);
        return;
    }

    if (number === ".") {
        const lastPart = fullOp.split(/[+\-x/^]/).pop();
        if (lastPart.includes(".")) return;
        if (lastPart === "") {
            fullOp = fullOp + "0.";
            showNumber1(fullOp);
            return;
        }
    }

    if (isOp && (number === '+' || number == '-' || number == '/' || number == 'x')) {
        return;
    }

    if (number === '+' || number == '-' || number == '/' || number == 'x') {
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
    const m = fullOp.match(/^(-?\d+(?:\.\d+)?)([+\-x\/^])(-?\d+(?:\.\d+)?)$/);
    if (!m) return;
    const [, a, op, b] = m;
    console.log({ a, op, b });
    switch (op) {
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
        default:
            break
    }
    res = Number(res.toFixed(2))
    isOp = false
    showNumber2(res)
}

function showNumber1(n) {
    document.getElementById("screen").innerHTML = n;
}

function showNumber2(n) {
    document.getElementById("screen2").innerHTML = n;
}

function initHistorySearch() {
    const searchInput = document.getElementById('history-search');
    if (!searchInput) return;

    const countEl = document.getElementById('history-count');

    function updateHistoryCount() {
        const n = [...document.querySelectorAll('.history-list li')].filter(
            (li) => li.style.display !== 'none'
        ).length;
        if (countEl) countEl.textContent = String(n);
    }

    function filterHistory() {
        const q = searchInput.value.toLowerCase().trim();
        document.querySelectorAll('.history-list li').forEach((li) => {
            const card = li.querySelector('.history-card');
            if (!card) return;
            const match = !q || card.textContent.toLowerCase().includes(q);
            li.style.display = match ? '' : 'none';
        });
        updateHistoryCount();
    }

    searchInput.addEventListener('input', filterHistory);
    updateHistoryCount();
}

initHistorySearch();