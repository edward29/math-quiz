// Start of loader
const loader = document.querySelector(".loader-wrap");

window.addEventListener('load', disapperIt);

function disapperIt() {
    setTimeout(() => {
        loader.classList.add("disappear");
    }, 3000);
}
// end of loader

// selection of html tag
const mainCon = document.querySelector('#mainCon');
const dropdown = document.querySelector('#dropdown');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const op = document.querySelector('#op');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#submit');
const solution = document.querySelector('#solution');
const show = document.querySelector('#show');

const totalScore = document.querySelector('#totalScore');
const att = document.querySelector('#att');

const failed = document.querySelector('#failed');
const failed_btn = document.querySelector('#failed-btn');
const passed = document.querySelector('#passed');
const passed_btn = document.querySelector('#passed-btn');

const hintMsg = document.querySelector('#hintMsg');
const hintWrap = document.querySelector('#hintWrap');
const hintYes = document.querySelector('#hintYes');
const hintNo = document.querySelector('#hintNo');

const failedMsg = document.querySelector('#failedMsg');
const passedMsg = document.querySelector('#passedMsg');

const insCon = document.querySelector('#insCon');
const insOk = document.querySelector('#insOk');

// instructions
insOk.addEventListener('click', () => {
    if (insCon.style.display == 'block') {
        insCon.style.display = 'none';
        mainCon.style.display = 'block'
    } else {
        insCon.style.display = 'block';
        mainCon.style.display = 'none';
    }
});


let score = 0;
let attempt = 3;

// generate random numbers
function numbers() {
    n1 = parseInt(Math.floor(Math.random() * 100) + 1);
    n2 = parseInt(Math.floor(Math.random() * 100) + 1);
    num1.innerHTML = n1;
    num2.innerHTML = n2;
}
numbers();

// give the answer
function hint() {
    
    if (op.innerHTML === '+') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 + n2}</span>`;
        score -= 3;
    } else if (op.innerHTML === '−') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 - n2}</span>`;
        score -= 3;
    } else if (op.innerHTML === '×') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${n1 * n2}</span>`;
        score -= 5;
    } else if (op.innerHTML === '÷') {
        show.innerHTML = 'Hide answer';
        solution.innerHTML= `Solution: <span id="sol">${n1} ${op.innerHTML} ${n2} = ${(n1 / n2).toFixed(2)}</span>`;
        score -= 5;
    } else {
        msg.innerHTML = "Please choose operator";
    }
    totalScore.innerHTML = score;
}

// it shows before give the answer
const hintDisplay = {
    getAddSub() {
        if (score >= 3) {
            if (hintWrap.style.display == 'none') {
                hintWrap.style.display = 'flex';
                hintMsg.innerHTML = 'To see the answer your score will be reduced by 3.<br><br>Do you want to see the answer?';
            } else {
                hintWrap.style.display = 'none';
            }
        } else {
            if (hintWrap.style.display == 'none') {
                hintWrap.style.display = 'flex';
                hintMsg.innerHTML = 'You don\'t have enough score to get an answer<br><br>You need "3 score" to show the answer';
                hintNo.innerHTML = 'OK';
                hintNo.style.width = '100%';
                hintNo.style.background = '#1691d8';
                hintYes.style.display = 'none';
            } else {
                hintWrap.style.display = 'none';
            }
        }
    }, 
    getMultDiv() {
        if (score >= 5) {
            if (hintWrap.style.display == 'none') {
                hintWrap.style.display = 'flex';
                hintMsg.innerHTML = 'To see the answer your score will be reduced by 5.<br><br>Do you want to see the answer?';
            } else {
                hintWrap.style.display = 'none';
            }
        } else {
            if (hintWrap.style.display == 'none') {
                hintWrap.style.display = 'flex';
                hintMsg.innerHTML = 'You don\'t have enough score to get an answer<br><br>You need "5 score" to show the answer';
                hintNo.innerHTML = 'OK';
                hintNo.style.width = '100%';
                hintNo.style.background = '#1691d8';
                hintYes.style.display = 'none';
            } else {
                hintWrap.style.display = 'none';
            }
        }
    }
}

// answer button
show.addEventListener('click', () => {
    if (show.innerHTML === 'Hide answer') {
        show.innerHTML = 'Show answer';
        solution.innerHTML = '';
    } else if (op.innerHTML == '+' || op.innerHTML == '−') {
        hintDisplay.getAddSub();
    } else if (op.innerHTML == '×' || op.innerHTML == '÷') {
        hintDisplay.getMultDiv();
    } else {
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
    }
});

// hint buttons
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

// give the color to result
const colors = {
    getCorrect() {
        if (!msg.classList.contains('correct')) {
            msg.classList.remove('wrong');
            msg.classList.add('correct');
        } else {
            msg.classList.remove('wrong');
            msg.classList.add('correct');
        }
    },
    getWrong() {
        if (!msg.classList.contains('correct')) {
            msg.classList.remove('correct');
            msg.classList.add('wrong');
        } else {
            msg.classList.remove('correct');
            msg.classList.add('wrong');
        }
        attempt -= 1;
    }
}

// all operators and computations
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
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 4"`;
            numbers();
            score += 4;
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
            msg.innerHTML = `${ans} is the correct answer<br>"Score + 4"`;
            numbers();
            score += 4;
            colors.getCorrect();
        } else {
            msg.innerHTML = `${ans} is the wrong answer`;
            numbers();
            colors.getWrong();
        }
    }
}

// failed and passed massage
const failedPassed = {
    getCloseFailed() {
        if (failed.style.display == 'grid') {
            failed.style.display = 'none';
            location.reload();
        } else {
            failed.style.display = 'grid';
        }
    },
    getClosePassed() {
        if (passed.style.display == 'grid') {
            passed.style.display = 'none';
            location.reload();
        } else {
            passed.style.display = 'grid';
        }
    }
}

// button for checking answer
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

    if (attempt === 0) {
        setTimeout(() => {
            failed.style.display = 'grid';
        }, 1000);
        failedMsg.innerHTML = "It's natural to feel disappointed after failing a math quiz, but don't let this setback discourage you. Keep working hard and don't give up, you have the determination and ability to overcome this challenge and succeed in math.";
        failed_btn.addEventListener('click', failedPassed.getCloseFailed);
        failed.addEventListener('click', failedPassed.getCloseFailed);
    }
    
    if (score >= 50) {
        setTimeout(() => {
            passed.style.display = 'grid';
        }, 1000);
        passedMsg.innerHTML = "Congratulations on your quiz success! Your hard work and dedication have paid off, and you should be proud of yourself for your accomplishment. Keep up the good work and continue to strive for excellence. Well done!";
        passed_btn.addEventListener('click', failedPassed.getClosePassed);
        passed.addEventListener('click', failedPassed.getClosePassed);
    }

    totalScore.innerHTML = score;
    att.innerHTML = attempt;
});
att.innerHTML = attempt;

// operator dropdown
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