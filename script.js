// 🔗 رابط الـ Webhook الخاص بسيرفرك في الديسكورد
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1557666233556537404/CrdsVi1q13B_Di4JUi8syc-tnuJsttLNhCHRBHDni7wPz2Vztst8TSFHDrXtYzpTtYknp";

const quizData = [
    {
        question: "تحبين الشخص اللي يهتم بيچ من بعيد؟ 🙈",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "حليوة حركة الاهتمام الهادئ ✨",
            "يعني تفضلين الاهتمام المباشر! 😉"
        ]
    },
    {
        question: "تحبين واحد يغار عليچ بس ما يبين؟ 🤫",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "الغيرة السكتية الها طعم ثاني 😂",
            "يعني تحبين الغيرة تكون واضحة ومبينة! ❤️"
        ]
    },
    {
        question: "تحبين البزازين كلش؟ 🐾",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "أصلاً البزازين يخببلون 😻",
            "أفااا ليش ما تحبين البزازين 😿"
        ]
    },
    {
        question: "الأسود يعجبچ أكثر من باقي الألوان؟ 🖤",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "سيد الألوان اكيد ✨",
            "يعني تحبين الألوان الفاتحة أكثر 🎨"
        ]
    },
    {
        question: "إذا واحد يحب نفس الأشياء اللي تحبينها، يلفت نظرچ؟ 💫",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "نفس الفايب والاهتمام دايماً يلفت! 🤝",
            "تفضلين الاختلاف بين الأشخاص أكثر 🤔"
        ]
    },
    {
        question: "تحبين واحد يلاحظ أدق تفاصيلچ؟ 👀",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "التركيز بالتفاصيل من أصدق أنواع الاهتمام 🌸",
            "تفضلين البساطة بدون تدقيق زائد ✨"
        ]
    },
    {
        question: "لو واحد معجب بيچ، تحبين يلمحلچ لو يحچيها بصراحة؟ 💬",
        options: ["تلميح", "صراحة"],
        isPrank: false,
        messages: [
            "التلميحات بيهة متعة وحيرة حلوة 🙈",
            "الصراحة والوضوح أقصر طريق للقلب ❤️"
        ]
    },
    {
        question: "إذا واحد دايمًا يحاول يسعدچ، ممكن تتعلقين بيه؟ ✨",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "اللي يسعى لسعادتنا يستاهل مكانه بالقلب 💖",
            "التعلق يحتاج وقت ومواقف أكثر 👍"
        ]
    },
    {
        question: "لو عرفتي أكو شخص معجب بيچ من زمان، تحبين تعرفين منو؟ 🕵️‍♀️",
        options: ["اي", "لا"],
        isPrank: false,
        messages: [
            "الفضول لازم يشتغل هنا 😂",
            "تخلين الأمور تمشي براحتها بدون استعجال ✨"
        ]
    },
    {
        question: "آخر سؤال… إذا الشخص اللي دا يسألچ هاي الأسئلة هو نفسه معجب بيچ، شراح تسوين؟ 🙈❤️",
        options: ["أبتسم وأسكت", "أتحمس وأعرف أكثر"],
        isPrank: false,
        messages: [
            "ابتسامتچ واصلة لحد هنا 🙈❤️",
            "احلى خبر ممكن أسمعه اليوم! ✨"
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

// 📤 دالة إرسال الإجابات إلى ديسكورد
function sendToDiscord(question, answer) {
    if (!DISCORD_WEBHOOK_URL) return;

    const payload = {
        username: "مراقب إجابات عزف 🐾",
        embeds: [{
            title: "إجابة جديدة من عزف ✨",
            color: 16731501,
            fields: [
                { name: "السؤال:", value: question, inline: false },
                { name: "اختارت:", value: `**${answer}**`, inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(err => console.error("Discord Webhook Error:", err));
}

// 1. فتح اللوحة بالضغط على حرف L (للكمبيوتر)
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'l') {
        toggleAdminPanel();
    }
});

// 2. فتح اللوحة بالنقر 3 مرات سريعة على السؤال (للآيفون)
let tapCount = 0;
let tapTimer = null;
function handleSecretTap() {
    tapCount++;
    clearTimeout(tapTimer);
    if (tapCount === 3) {
        toggleAdminPanel();
        tapCount = 0;
    } else {
        tapTimer = setTimeout(() => { tapCount = 0; }, 400);
    }
}

function toggleAdminPanel() {
    if (adminPanel) {
        adminPanel.style.display = (adminPanel.style.display === 'block') ? 'none' : 'block';
    }
}

function updateAdminTracker(qText, chosenOpt) {
    userAnswersLog.push(`س: ${qText}<br>👉 اختارت: <b>${chosenOpt}</b>`);
    if (trackerContent) {
        trackerContent.innerHTML = userAnswersLog.join("<hr style='border:0; border-top:1px solid rgba(255,255,255,0.1); margin:8px 0;'>");
    }
}

function updateProgress() {
    let progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    if (progressFill) {
        progressFill.style.width = progressPercentage + "%";
    }
}

function loadQuestion() {
    updateProgress();
    let currentQ = quizData[currentQuestionIndex];
    if (questionText) {
        questionText.innerText = currentQ.question;
        questionText.onclick = handleSecretTap;
    }
    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        currentQ.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.classList.add("option-btn");
            btn.onclick = () => handleAnswerChoice(index);
            optionsContainer.appendChild(btn);
        });
    }
}

function showMessage(msg) {
    if (speechBubble) {
        speechBubble.innerText = msg;
        speechBubble.classList.add("show");
    }
}

function handleAnswerChoice(selectedIndex) {
    let currentQ = quizData[currentQuestionIndex];
    let chosenText = currentQ.options[selectedIndex];
    
    updateAdminTracker(currentQ.question, chosenText);
    sendToDiscord(currentQ.question, chosenText);

    if (currentQ.isPrank && selectedIndex === 0) {
        if (prankScreen) prankScreen.classList.add("active");
        return;
    }

    let messageToShow = currentQ.messages[selectedIndex];
    showMessage(messageToShow);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            if (quizScreen) quizScreen.style.display = "none";
            if (middleScreen) middleScreen.style.display = "block";
            if (middleMsgText) {
                middleMsgText.innerText = "عاشت ايدج عزف خلصتي كل الاسئلة، هسة بقت شغلة وحدة سويت الموقع خصيصاً علمودها أتمنى تعجبج ❤️";
            }
            if (speechBubble) speechBubble.classList.remove("show");
        }
    }, 1300);
}

function closePrank() {
    if (prankScreen) prankScreen.classList.remove("active");
    updateAdminTracker("تنبيه", "تراجعت عن الاختيار 🏃‍♂️");
    showMessage("زين سويتي.. يلا نرجع نكمل! 😉");
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        }
    }, 1000);
}

function goToFinalGift() {
    if (middleScreen) middleScreen.style.display = "none";
    if (resultScreen) resultScreen.style.display = "block";
    showMessage("هاي هي محطتنا الأخيرة، استلمي الهدية وارجعي يمنة ديسكورد ❤️");
}

window.onload = () => {
    loadQuestion();
    setTimeout(() => {
        showMessage("هلو عزف سويت هذا الموقع هدية الج بمناسبة صداقتنة ❤️ استمتعي");
    }, 500);
};