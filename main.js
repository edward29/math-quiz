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
    } else if (score < 2) {
        alert("You don't have enough points to get an answer\n\"You need 2 points to show the answer\"");
    } else {
        let question = confirm('To see the answer your points will be reduced by 2.\nDo you want to see the answer?')
        if (question == false) {
            return false;
        } else {
            hint();
        }
        
    }

    // if (score <= 0) {
    //     alert('Game Over!');
    //     location.reload();
    // }

    // totalScore.innerHTML = score;
    // att.innerHTML = attempt;
    pts.innerHTML = points;
});

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
            msg.innerHTML = `${ans} is the wrong answer<br>"Score - 2"`;
            numbers();
            // score -= 2;
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
            msg.innerHTML = `${ans} is the wrong answer<br>"Score - 2"`;
            numbers();
            // score -= 2;
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
            msg.innerHTML = `${ans} is the wrong answer<br>"Score - 3"`;
            numbers();
            // score -= 3;
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
            msg.innerHTML = `${ans} is the wrong answer<br>"Score - 3"`;
            numbers();
            // score -= 3;
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
        alert('Failed!');
        location.reload();
    }
    

    if (score >= 50) {
        alert("Passed!");
        location.reload();
    }


    totalScore.innerHTML = score;
    att.innerHTML = attempt;
    pts.innerHTML = points;
});




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