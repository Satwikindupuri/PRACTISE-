const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log("Game started!");
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    console.log("Shuffled questions:", shuffledQuestions);
    currentQuestionIndex = 0;
    quizScore = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    console.log("Setting next question...");
    resetState();
    if (shuffledQuestions[currentQuestionIndex]) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        console.error("No more questions available!");
    }
}

function showQuestion(question) {
    console.log("Showing question:", question);
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}


function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (correct) {
        quizScore++;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which planet is known as the “Red Planet”?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false }
        ],
    },
    {
        question: 'What has a face and two hands, but no arms or legs?',
        answers: [
            { text: 'A clock', correct: true },
            { text: 'A potato', correct: false },
            { text: 'A tree', correct: false },
            { text: 'A rock', correct: false }
        ],
    },
    {
        question: 'What is the most widely spoken language in the world?',
        answers: [
            { text: 'English', correct: false },
            { text: 'Spanish', correct: false },
            { text: 'Mandarin', correct: true },
            { text: 'Hindi', correct: false }
        ],
    },
];
