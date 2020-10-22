// Standard Variables

let score = 100;
let timer = 10;

// Need Question Arrays

const qAndA = [
    {
        q: "What is your name?",
        a: "Sir Lancelot of Camelot",
        choices: ["Roger", "Robert", "Reginold", "Sir Lancelot of Camelot"],
    },
    {
        q: "What is your quest?",
        a: "To seek the Holy Grail",
        choices: ["To booger pick", "To Poop", "To seek the Holy Grail", "To score 100%"]
    },
    {
        q: "What is your favourite colour?",
        a: "Blue",
        choices: ["Blue", "No, Yellow", "Orange-ish", "Maroon"]
    },
    {
        q: "What is the capitol of Assyria?",
        a: "Assur",
        choices: ["I don't know that!", "Where is that?", "Assur", "Wait, Wha?!"]
    },
    {
        q: "What is the air speed velocity of an unladen swallow?",
        a: "African or European?",
        choices: ["African or European?", "120 mph", "45 mph", "Velocity unknown"]
    }
]

// DOM Variables

let mainEl = document.querySelector(".quizArea");
let quizWrapperEl = document.querySelector(".quizWrapper");
let startButtonEl = document.querySelector("#startQuiz");
let countDownEl = document.querySelector(".countDown");
let questionEl = document.querySelector(".question");
let scoreEl = document.querySelector(".score");
let correctOrWrongEl = document.querySelector(".correctOrWrong");
let restartEl = document.querySelector(".restart");

// Clear Quiz Area and all children in the wrapper

const clearQuizWrapperEl = (event) => {
    quizWrapperEl.remove();
    quizWrapperEl.innerHTML = '';
}

// Start the Quiz from the Start Button with the count down and calling of Main Sections
const startQuiz = (event) => {
    countDownEl.textContent = timer;
    restartEl.textContent = "Go back to start page";
    // Timer for the quiz
    const countDown = () => {
        if (timer !== 1) {
            --timer;
            countDownEl.textContent = timer;
            if (timer < 6 ) {
                countDownEl.setAttribute("style", "color: red;")
            }
        } else {
            // Clear the setInterval() and quizWrapper
            countDownEl.textContent = 0;
            clearInterval(startCountDown);
            clearQuizWrapperEl();
            // Call final screen
            tallyQuizWrapperEl();
        }
    }
    const startCountDown = setInterval(countDown, 1000);
    clearQuizWrapperEl();
}

// Finishing Page

const tallyQuizWrapperEl = () => {
    // populate final screen
    quizWrapperEl.appendChild(questionEl);
    quizWrapperEl.appendChild(scoreEl);
    mainEl.appendChild(quizWrapperEl);
    questionEl.textContent = "The quiz has ended!";
    scoreEl.textContent = "Your score: " + score;
    if (score === 100) {
        correctOrWrongEl.textContent = "Perfect Score!";
    } else if (score >= 70) {
        correctOrWrongEl.textContent = "Passable.";
    } else {
        correctOrWrongEl.textContent = "Fail.";
    }
}

// Footer checking previously answered questions


startButtonEl.addEventListener("click", startQuiz);