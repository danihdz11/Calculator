let fullOp = '';
let res = 0;
let isOp = false
let justCalculated = false
let historyOps = JSON.parse(localStorage.getItem("historyOps") || "[]");

function handleClick(number) {

    if (number === 'DEL') {
        if (justCalculated) {
            return;
        }
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

    if (justCalculated) {
        return;
    }

    if (fullOp === "" && (number === "+" || number === "x" || number === "/" || number === "^")) {
        return;
    }

    const lastChar = fullOp.slice(-1);

    if (number === "-" && (fullOp === "" || "+x/^".includes(lastChar))) {
        fullOp = fullOp + number;
        showNumber1(fullOp);
        return;
    }

    if (number === "-" && fullOp.endsWith("-")) {
        return;
    }

    if ((number === "+" || number === "x" || number === "/" || number === "^") &&
        (lastChar === "+" || lastChar === "x" || lastChar === "/" || lastChar === "^" || lastChar === "-")) {
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

    if (isOp && (number === '+' || number == '-' || number == '/' || number == 'x' || number == '^')) {
        return;
    }

    if (number === '+' || number == '-' || number == '/' || number == 'x' || number == '^') {
        isOp = true;
    }

    console.log(number);
    justCalculated = false;
    fullOp = fullOp + number
    showNumber1(fullOp);
}

function erase() {
    document.getElementById("screen").innerHTML = '';
    document.getElementById("screen2").innerHTML = '';
    fullOp = ''
    isOp = false
    res = 0
    justCalculated = false
}

function calculate() {
    if (justCalculated) {
        return;
    }
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
    saveHistory(fullOp, res);
    isOp = false
    justCalculated = true
    showNumber2(fullOp)
    showNumber1(res)
}

function showNumber1(n) {
    document.getElementById("screen2").innerHTML = n;
}

function showNumber2(n) {
    document.getElementById("screen").innerHTML = n;
}

function saveHistory(expression, result) {
    const now = new Date();
    historyOps.unshift({
        expression,
        result,
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    localStorage.setItem("historyOps", JSON.stringify(historyOps));
}

//ayuda de IA en las siguientes funciones

function renderHistory() {
    const historyList = document.getElementById("history-list");
    if (!historyList) return;
    historyList.innerHTML = "";

    historyOps.forEach((item) => {
        historyList.innerHTML += `
            <li>
                <article class="history-card">
                    <div class="history-card-top">
                        <span class="history-expr">${item.expression}</span>
                        <time class="history-time">${item.time}</time>
                    </div>
                    <div class="history-card-result">
                        <span class="history-eq">=</span>
                        <span class="history-value">${item.result}</span>
                    </div>
                </article>
            </li>
        `;
    });
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

function initHistoryActions() {
    const clearBtn = document.getElementById("btn-clear-history");
    if (!clearBtn) return;
    clearBtn.addEventListener("click", () => {
        historyOps = [];
        localStorage.setItem("historyOps", JSON.stringify(historyOps));
        renderHistory();
        initHistorySearch();
    });
}

renderHistory();
initHistoryActions();
initHistorySearch();