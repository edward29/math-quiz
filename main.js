const loader = document.querySelector(".loader-wrap");

window.addEventListener('load', disapperIt);

function disapperIt() {
    setTimeout(() => {
        loader.classList.add("disappear");
        // loader.style.display = 'none';
    }, 3000);
}

const dropdown = document.querySelector('#dropdown');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const op = document.querySelector('#op');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#submit');
const totalScore = document.querySelector('#totalScore');
const solution = document.querySelector('#solution');
const show = document.querySelector('#show');
const pts = document.querySelector('#pts');
const att = document.querySelector('#att');

const failed = document.querySelector('#failed');
const failed_btn = document.querySelector('#failed-btn');
const passed = document.querySelector('#passed');
const passed_btn = document.querySelector('#passed-btn');

const hintMsg = document.querySelector('#hintMsg');
const hintWrap = document.querySelector('#hintWrap');
const hintYes = document.querySelector('#hintYes');
const hintNo = document.querySelector('#hintNo');

let score = 0;
let points = 0;
let attempt = 0;

function numbers() {
    n1 = parseInt(Math.floor(Math.random() * 100) + 1);
    n2 = parseInt(Math.floor(Math.random() * 100) + 1);
    num1.innerHTML = n1;
    num2.innerHTML = n2;
}
numbers();

function hint() {
    
    if (op.innerHTML === '+') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 + n2}</span>`;
        points -= 2;
    } else if (op.innerHTML === '−') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 - n2}</span>`;
        points -= 2;
    } else if (op.innerHTML === '×') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 * n2}</span>`;
        points -= 2;
    } else if (op.innerHTML === '÷') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${(n1 / n2).toFixed(2)}</span>`;
        points -= 2;
    } else {
        msg.innerHTML = "Please choose operator";
    }
}

show.addEventListener('click', () => {
    if (show.innerHTML === 'Hide answer') {
        show.innerHTML = 'Show answer';
        solution.innerHTML = '';
    } else if (points >= 2) {
        if (hintWrap.style.display == 'none') {
            hintWrap.style.display = 'flex';
            hintMsg.innerHTML = 'To see the answer your points will be reduced by 2.<br><br>Do you want to see the answer?';
        } else {
            hintWrap.style.display = 'none';
        }
    } else if (op.innerHTML == '_') {
        if (hintWrap.style.display == 'none') {
            hintWrap.style.display = 'flex';
            hintMsg.innerHTML = 'Please choose operator';
            hintNo.innerHTML = 'OK';
            hintNo.style.width = '100%';
            hintNo.style.background = '#1691d8';
            hintYes.style.display = 'none';
        } else {
            hintWrap.style.display = 'none';
        }
    } else {
        if (hintWrap.style.display == 'none') {
            hintWrap.style.display = 'flex';
            hintMsg.innerHTML = 'You don\'t have enough points to get an answer<br><br>You need "2 points" to show the answer';
            hintNo.innerHTML = 'OK';
            hintNo.style.width = '100%';
            hintNo.style.background = '#1691d8';
            hintYes.style.display = 'none';
        } else {
            hintWrap.style.display = 'none';
        }
    }
    
    pts.innerHTML = points;
});

hintYes.addEventListener('click', () => {
    closeHint();
    hint();
});

hintNo.addEventListener('click', () => {
    closeHint();
    hintNo.innerHTML = 'No';
    hintNo.style.width = '50%';
    hintNo.style.background = '#c70f0f';
    hintYes.style.display = 'block';
});


function closeHint() {
    if (hintWrap.style.display == 'flex') {
        hintWrap.style.display = 'none';
    } else {
        hintWrap.style.display = 'flex';
    }
}
let total;

const colors = {
    getCorrect() {
        if (!msg.classList.contains('correct')) {
            msg.classList.remove('wrong');
            msg.classList.add('correct');
        } else {
            msg.classList.remove('wrong');
            msg.classList.add('correct');
        }
        points += 1;
    },
    getWrong() {
        if (!msg.classList.contains('correct')) {
            msg.classList.remove('correct');
            msg.classList.add('wrong');
        } else {
            msg.classList.remove('correct');
            msg.classList.add('wrong');
        }
        attempt += 1;
    }
}

const operators = {
    
    getAddition() {
        ans = document.querySelector('#ans').value;
        ans = Number(ans);
        total = n1 + n2;
        
        if (ans === total) {
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 2"`;
            numbers();
            score += 2;
            colors.getCorrect();
        } else {
            msg.innerHTML = `${ans} is the wrong answer`;
            numbers();
            colors.getWrong();
        }
    },
    getSubtraction() {
        ans = document.querySelector('#ans').value;
        ans = Number(ans);
        total = n1 - n2;
        
        if (ans === total) {
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 2"`;
            numbers();
            score += 2;
            colors.getCorrect();
        } else {
            msg.innerHTML = `${ans} is the wrong answer`;
            numbers();
            colors.getWrong();
        }
    },
    getMultiplication() {
        ans = document.querySelector('#ans').value;
        ans = Number(ans);
        total = n1 * n2;
        
        if (ans === total) {
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 5"`;
            numbers();
            score += 5;
            colors.getCorrect();
        } else {
            msg.innerHTML = `${ans} is the wrong answer`;
            numbers();
            colors.getWrong();
        }
    },
    getDivision() {
        ans = document.querySelector('#ans').value;
        ans = Number(ans);
        total = n1 / n2;
        
        if (ans.toFixed(2) === total.toFixed(2)) {
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 5"`;
            numbers();
            score += 5;
            colors.getCorrect();
        } else {
            msg.innerHTML = `${ans} is the wrong answer`;
            numbers();
            colors.getWrong();
        }
    }
}


btn.addEventListener('click', () => {

    if (op.innerHTML === '+') {
        operators.getAddition();
    } else if (op.innerHTML === '−') {
        operators.getSubtraction();
    } else if (op.innerHTML === '×') {
        operators.getMultiplication();
    } else if (op.innerHTML === '÷') {
        operators.getDivision();
    } else {
        msg.innerHTML = "Please choose operator";
    }

    document.querySelector('#ans').value = '';

    if (attempt === 3) {
        setTimeout(() => {
            failed.style.display = 'grid';
        }, 1000);
        failed_btn.addEventListener('click', closeFailed);
        failed.addEventListener('click', closeFailed);
    }
    

    if (score >= 50) {
        setTimeout(() => {
            passed.style.display = 'grid';
        }, 1000);
        passed_btn.addEventListener('click', closePassed);
        passed.addEventListener('click', closePassed);
    }


    totalScore.innerHTML = score;
    att.innerHTML = attempt;
    pts.innerHTML = points;
});

function closeFailed() {
    if (failed.style.display == 'grid') {
        failed.style.display = 'none';
        location.reload();
    } else {
        failed.style.display = 'grid';
    }
}

function closePassed() {
    if (passed.style.display == 'grid') {
        passed.style.display = 'none';
        location.reload();
    } else {
        passed.style.display = 'grid';
    }
}


dropdown.addEventListener("change", () => {
    let selectedValue = dropdown.value;

    if (selectedValue == "plus") {
        op.innerHTML = '&#43';
    } else if (selectedValue == "minus") {
        op.innerHTML = '&#8722';
    } else if (selectedValue == "times") {
        op.innerHTML = '&#215';
    } else if (selectedValue == "div") {
        op.innerHTML = '&#247';
    } else {
        op.innerHTML = '_';
    }
});