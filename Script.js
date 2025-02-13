const questions = [
    {
        question: "What's my full name?🤨",
        answers: ["Imjungsang Mollier", "Imjung Mollier"],
        correct: "Imjungsang Mollier"
    },
    {
        question: "When is my date of birth?",
        answers: ["13 Dec 2003", "13 Dec 2004"],
        correct: "13 Dec 2003"
    },
    {
        question: "When did we first meet?",
        answers: ["July 28", "June 28"],
        correct: "June 28"
    },
    {
        question: "Am I a summer or winter person?",
        answers: ["Summer", "Winter"],
        correct: "Winter"
    },
    {
        question: "Will we be together forever?",
        answers: ["Absolutely!!!!!!!", "Is that even a question? Of course we will be"],
        correct: "Both" // Special case where both are correct
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
const valentineMessage = `
Hey baby, I know I'm late for this but I wanna say thank you. 
Yes, thank you for being here for me. You don't know how much you mean to me.
Days we fought, days we cried, days we laughed and had fun, I remember, because it's hard to forget the time I had with you.
You're the reason I'm as I am now. Words can't describe how much I love you.
You deserve all the beautiful flowers, the best plushies, the most expensive dark chocolates, and all the love.
As much as I get disappointed in you, it all goes away when I think of losing you.
Losing you is my greatest fear, I hope it never happens.
In the end, I just wanna say thank you, thank you again, and I'll never stop thanking God.
Happy Valentine's Day, baby ❤️.
`;

function loadQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer, q.correct);
        answersDiv.appendChild(btn);
    });

    document.getElementById("result").textContent = "";
    document.getElementById("next").style.display = "none";
}

function checkAnswer(answer, correct) {
    let resultText = document.getElementById("result");

    if (answer === correct || correct === "Both") {
        resultText.textContent = "🎊🎊🎉 Congratulations! 🎊🎊🎉";
        resultText.style.color = "green";
        correctAnswers++;
    } else {
        resultText.textContent = "Blehh, you got it wrong 😝";
        resultText.style.color = "red";
    }

    document.querySelectorAll("#answers button").forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct || correct === "Both") {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
        }
    });

    document.getElementById("next").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showMessage();
    }
}

function showMessage() {
    document.getElementById("quiz-container").innerHTML = "<h1>Quiz Completed!</h1>";

    if (correctAnswers >= 3) {
        document.getElementById("quiz-container").innerHTML += `
            <h2>🎉 Congratulations! Here's your secret message 💖</h2>
            <p>${valentineMessage}</p>
        `;
    } else {
        document.getElementById("quiz-container").innerHTML += `
            <h2>Oops! You need at least 3 correct answers for the secret message. 😢</h2>
            <button onclick="restartQuiz()">Try Again 🔄</button>
        `;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById("quiz-container").innerHTML = `
        <h1>Get 3 questions correct for a secret message at the end! 💌</h1>
        <p id="question"></p>
        <div id="answers"></div>
        <p id="result"></p>
        <button id="next" onclick="nextQuestion()" style="display: none;">Next</button>
    `;
    loadQuestion();
}

loadQuestion();
window.onload = function() {
    const music = document.getElementById("bg-music");

    // Try to play the music automatically after user interaction
    document.body.addEventListener("click", function() {
        if (music.paused) {
            music.play().catch(error => console.log("Autoplay blocked:", error));
        }
    });

    // Try to play music immediately (some browsers allow this)
    setTimeout(() => {
        music.play().catch(error => console.log("Autoplay blocked:", error));
    }, 1000);
};