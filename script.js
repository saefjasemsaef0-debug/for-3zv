const quizData = [
    {
        question: "شنو لوني المفضل 🙈",
        options: ["احمر", "اسود"],
        isPrank: false,
        messages: [
            "غلط 😴", 
            "صححح🤗❤️"
        ]
    },
    {
        question: "تحسيني مزعج ؟",
        options: ["اي", "لا"],
        isPrank: true, // تفعيل شاشة المزعج السوداء إذا اختارت "اي"
        messages: [
            "prank", 
            "يمهفدوه 🙈"
        ]
    },
    {
        question: "لو كلولج اكو شخص معجب بيج تفضلين تعرفين منو قبل ما يعترفلج لو تخلين الحياة تاخذ مجراها",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "هممممممم", 
            "يمكن هذا الشخص فاهي ميعرف يعبر عن البداخله 🙄"
        ]
    },
    {
        question: "تحبين شخص يكون نفس فايبج و نفس اهتماماتج لو مختلفين بالتفكير",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "حبيتت حتى اني هيج اشوف 😂", 
            "هاي ليش 😂"
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswersLog = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const speechBubble = document.getElementById("speechBubble");
const quizScreen = document.getElementById("quiz-screen");
const middleScreen = document.getElementById("middle-screen");
const resultScreen = document.getElementById("result-screen");
const middleMsgText = document.getElementById("middle-msg-text");
const prankScreen = document.getElementById("prank-screen");
const adminPanel = document.getElementById("admin-tracker");
const trackerContent = document.getElementById("tracker-content");
const progressFill = document.getElementById("progress-fill");

// لوحة المراقبة السرية: تضغط حرف L بالكيورد تظهر أو تختفي
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'l') {
        adminPanel.style.display = adminPanel.style.display === 'block' ? 'none' : 'block';
    }
});

function updateAdminTracker(qText, chosenOpt) {
    userAnswersLog.push(`س: ${qText}<br>👉 اختارت: <b>${chosenOpt}</b>`);
    trackerContent.innerHTML = userAnswersLog.join("<hr style='border:0; border-top:1px solid #222; margin:8px 0;'>");
}

function updateProgress() {
    let progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = progressPercentage + "%";
}

function loadQuestion() {
    updateProgress();
    let currentQ = quizData[currentQuestionIndex];
    questionText.innerText = currentQ.question;
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.onclick = () => handleAnswerChoice(index);
        optionsContainer.appendChild(btn);
    });
}

function showMessage(msg) {
    speechBubble.innerText = msg;
    speechBubble.classList.add("show");
}

function handleAnswerChoice(selectedIndex) {
    let currentQ = quizData[currentQuestionIndex];
    let chosenText = currentQ.options[selectedIndex];
    updateAdminTracker(currentQ.question, chosenText);

    // إذا السؤال الثاني واختارت "اي" (شاشة المزعج)
    if (currentQ.isPrank && selectedIndex === 0) {
        prankScreen.classList.add("active");
        return;
    }

    let messageToShow = currentQ.messages[selectedIndex];
    showMessage(messageToShow);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            quizScreen.style.display = "none";
            middleScreen.style.display = "block";
            middleMsgText.innerText = "عاشت ايدج عزف خلصتي كل الاسئلة هسة بقت شغلة وحدة سويت الموقع خصيصا علمودهة اتمنى تعجبج , اضغطي تحت حتى تشوفيها";
            speechBubble.style.opacity = "0"; 
        }
    }, 1300);
}

function closePrank() {
    prankScreen.classList.remove("active");
    updateAdminTracker("تحسيني مزعج ؟", "تراجعت عن الاختيار المزعج 🏃‍♂️");
    showMessage("زين سويتي.. يلا نرجع نكمل! 😉");
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        }
    }, 1000);
}

function goToFinalGift() {
    middleScreen.style.display = "none";
    resultScreen.style.display = "block";
    showMessage("هاي هي محطتنا الأخيرة، استلمي النيترو وارجعي يمنة ديسكورد ❤️");
    speechBubble.style.opacity = "1";
}

window.onload = () => {
    loadQuestion();
    setTimeout(() => {
        // النص الترحيبي الأصلي بدون أي تحريف
        showMessage("هلو عزف سويت هذا الموقع هدية الج بمناسبة صداقتنة ❤️ استمتعي");
    }, 500);
};