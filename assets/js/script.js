// Standard Variables

let score = 0;
let timer = 100;
let highScores = [];
let highScoreCounter = 0;
let questionNumber = 0;
let startCountDown = '';

if (sessionStorage.getItem("highScores")!==null) {
    highScores = sessionStorage.getItem("highScores");
    highScores = JSON.parse(highScores);
} else {
    highScores = [];
}

// Need Question Arrays

const qAndA = [
    {
        q: "What surrounds the conditional requirements in an IF/ELSE statement?",
        a: "Parenthesis ()",
        choices: ["Stright Brackets []", "Squiggle Brackets {}", "Parenthesis ()", "Quotes ' '"]
    },
    {
        q: "What is the Emmet syntax to populate a a boilerplate HTML page?",
        a: "!",
        choices: ["!", "HTML", "Starter", "<>"]
    },
    {
        q: "What input element type attribute allows you to input many characters including numbers and symbols?",
        a: "textarea",
        choices: ["type", "textarea", "input", "textarea"]
    },
    {
        q: "When checking an equals condition it is best to use which syntax to avoid possible problems?",
        a: "===",
        choices: ["==", "====", "=", "==="]
    },
    {
        q: "What is the NOT symbol used to reverse boolean conditions?",
        a: "!",
        choices: ["NOT", "/", "-", "!"]
    },
    {
        q: "What is a Web API that can allow JavaScript to manipulate HTML Elements?",
        a: "DOM",
        choices: ["JS-HTML", "DOM", "MOD", "DOT"]
    },
    {
        q: "Which timer method can be used to delay a function call?",
        a: "setTimeout()",
        choices: ["setIntervalDelay()", "setInterval()", "setTimeoutDelay()", "setTimeout()"]
    },
    {
        q: "When using timer methods in JavaScript, the second parameter is in what measurement?",
        a: "milliseconds",
        choices: ["milliseconds", "seconds", "minutes", "microseconds"]
    },
    {
        q: "While Loops continue to run as long as their condition is _______.",
        a: "truthy",
        choices: ["falsy", "equal", "truthy", "none of the above"]
    },
    {
        q: "A CSS rule-set is comprised of at least a selector and a ________.",
        a: "declaration",
        choices: ["rule", "declaration", "style", "function"]
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
let highScoresLinkEl = document.querySelector(".highScoresLink");
let choicesEl = document.querySelector(".choices");
let formEl = '';
let clearScoresBtnEl = '';
let highScoreButtons = '';
let highScoresListEl = '';

// Clear Quiz Area and all children in the wrapper

const clearQuizWrapperEl = () => {

    quizWrapperEl.remove();
    quizWrapperEl.innerHTML = '';

}

// Create Q and A elements

const createQuizQuestions = (num) => {
    quizWrapperEl = document.createElement("div");
    quizWrapperEl.setAttribute("class", "quizWrapper");
    choicesEl.innerHTML = '';
    questionEl.textContent = qAndA[num].q;
    quizWrapperEl.appendChild(questionEl);
    quizWrapperEl.appendChild(choicesEl);
    for (a = 0; a < qAndA[num].choices.length; ++a) {
        choice = document.createElement("button");
        choice.textContent = (a+1) + ". " + qAndA[num].choices[a];
        choice.value = qAndA[num].choices[a];
        choice.setAttribute("class", "choiceItem");
        choice.setAttribute("type", "submit");
        choice.setAttribute("name", "choiceItem");
        choicesEl.appendChild(choice);
    }
    return quizWrapperEl;
}


// Q and A page loaded and looped

const questionsAndAnswers = () => {
    let question = '';
    clearQuizWrapperEl();
    correctOrWrongEl.textContent = '';
    if (questionNumber < qAndA.length) {
        question =  createQuizQuestions(questionNumber);
        mainEl.appendChild(question);
        ++questionNumber;
    } else {
        clearInterval(startCountDown);
        tallyQuizWrapperEl();
    }
}

// Highscores elements create

const highScoresBtnWrapperCreate = () => {

    // Create highScores content
    let highScoresBtnWrapperEl = document.createElement("div");
    highScoresBtnWrapperEl.setAttribute("class", "highScoresBtnWrapper");
    let goBackBtnEl = document.createElement("button");
    goBackBtnEl.setAttribute = ("class", "goBack")
    goBackBtnEl.textContent = "Go Back";
    clearScoresBtnEl = document.createElement("button");
    clearScoresBtnEl.setAttribute("class", "clearScores");
    clearScoresBtnEl.textContent = "Clear high scores";
    // create goBack link
    let goBackLink = document.createElement("a");
    goBackLink.setAttribute("href", "./index.html");
    goBackLink.appendChild(goBackBtnEl);
    // load button wrapper
    highScoresBtnWrapperEl.appendChild(goBackLink);
    highScoresBtnWrapperEl.appendChild(clearScoresBtnEl);
    return highScoresBtnWrapperEl;    

}

// Clear Scores

const clearScores = () => {

    highScores = '';
    highScoreCounter = 0;
    highScoresListEl.remove();
    sessionStorage.clear();
    
}

// Generates Score List

const generateScores = () => {
    let highScoreItem = '';
    highScoresListEl = document.createElement("ul");
    highScoresListEl.setAttribute("class", "highScore");
    if (highScores.length === 0) {
        highScoresListEl.setAttribute("style", "background-color: white;");
    }
    for (b = 0; b < highScores.length; ++b) {
        highScoreItem = document.createElement("li");
        highScoreItem.textContent = `${highScores[b].position+1}. ${highScores[b].initials} - ${score}`;
        highScoresListEl.appendChild(highScoreItem);
    }
    return highScoresListEl;
}


// Highscores Page Load

const highScoresQuizWrapperEl = (event) => {

    // Clear content
    clearQuizWrapperEl();
    // load highScores content
    quizWrapperEl.appendChild(questionEl);
    questionEl.textContent = "High Scores";
    let scoreList = generateScores();
    quizWrapperEl.appendChild(scoreList);
    highScoreButtons = highScoresBtnWrapperCreate();
    quizWrapperEl.appendChild(highScoreButtons);
    mainEl.appendChild(quizWrapperEl);

    clearScoresBtnEl.addEventListener("click", clearScores);

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
            if (timer < 11 ) {
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
    startCountDown = setInterval(countDown, 1000);
    questionsAndAnswers();
    choicesEl.addEventListener("submit", answerChecker);

}

// create Initials Form Element

const initialFormCreate = () => {

    // Create Form element and it's children elements
    // - form wrapper
    formEl = document.createElement("form");
    formEl.setAttribute("class", "initials");
    // - label for the input
    let initialLabelEl = document.createElement("label");
    initialLabelEl.textContent = "Enter initials: ";
    initialLabelEl.setAttribute("for", "initialInput");
    // - text input element for initials
    let initialInputEl = document.createElement("input");
    initialInputEl.setAttribute("type", "text");
    initialInputEl.setAttribute("id", "initialInput");
    initialInputEl.setAttribute("name", "initialInput");
    // - button to submit form assigned from the global
    let initialButtonEl = document.createElement("button");
    initialButtonEl.textContent = "Submit";
    initialButtonEl.setAttribute("type", "submit");
    initialButtonEl.setAttribute("id", "submitInitials");
    // initialButtonEl.setAttribute("type", "submit");
    // -- append all created child elements to the form wrapper
    formEl.appendChild(initialLabelEl);
    formEl.appendChild(initialInputEl);
    formEl.appendChild(initialButtonEl);
    return formEl;
}

// Finishing Page Population

const tallyQuizWrapperEl = () => {
    
    // place children elements with filled in text in empty quiz wrapper
    questionEl.textContent = "The quiz has ended!";
    scoreEl.textContent = `Your score: ${score}`;
    quizWrapperEl.appendChild(questionEl);
    quizWrapperEl.appendChild(scoreEl);
    quizWrapperEl.appendChild(initialFormCreate());
    // place quizWrapper in main section
    mainEl.appendChild(quizWrapperEl);
    // footer announcment
    if (score === 100) {
        correctOrWrongEl.textContent = "Perfect Score!";
    } else if (score >= 70) {
        correctOrWrongEl.textContent = "Passable.";
    } else {
        correctOrWrongEl.textContent = "Fail.";
    }
    // listen for the submit
    formEl.addEventListener("submit", submitHighScore);
}

// Assigning High Score
const assigningHighScore = (value) => {
    let highScoreObj = {
        position: '',
        initials: '',
        score: ''
    };

    highScoreObj.position = highScoreCounter;
    highScoreObj.initials = value;
    highScoreObj.score = score;
    highScores.push(highScoreObj);
    ++highScoreCounter;
    sessionStorage.setItem("highScores", JSON.stringify(highScores));
}

// Submitting functions

const submitHighScore = (event) => {
    event.preventDefault();
    let initialInput = document.querySelector("input[name='initialInput']").value;
    console.log(initialInput);
    assigningHighScore(initialInput);
    highScoresQuizWrapperEl();
}

// Player Answer Checking

const answerChecker = (event) => {
    event.preventDefault();
    let playerAnswer = event.submitter.value;
    if (playerAnswer === qAndA[questionNumber-1].a) {
        score = score + 10;
        correctOrWrongEl.textContent = "Correct! Great Job!";
        let timeToNextQuestion = setTimeout(questionsAndAnswers, 1000);
    } else {
        correctOrWrongEl.textContent = "Wrong! 10 seconds deducted from your time!";
        timer = timer - 10;
        countDownEl.textContent = timer;
        let timeToNextQuestion = setTimeout(questionsAndAnswers, 1000);
    }
}

startButtonEl.addEventListener("click", startQuiz);
highScoresLinkEl.addEventListener("click", highScoresQuizWrapperEl);