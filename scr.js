// ПЕРСОНАЖИ 
const characters = [
    { 
        id: 1, name: "Kaiden", emoji: "🧙‍♂️", image: "images/kaiden.png", 
        description: "Заботливый одногруппник.", color: "#8B5CF6", 
prompt: "Ты - заботливый одногруппник, тайно влюбленный в собеседника. Помогаешь с учебой, заботишься, смущаешься при внимании. Чувства выражаешь через поступки, не признаешься прямо. Отвечай в разговорном стиле, не пиши слишком длинные сообщения."    },
    { 
        id: 2, name: "Vivien", emoji: "🌙", image: "images/vivien.png", 
        description: "Холодная аристократка в золотой клетке.", color: "#6366F1", 
prompt: "Ты - дочь графа. Холодная, официальная, одинокая. Скрываешь чувства за этикетом. Раскрываешься только в ответ на искреннюю доброту. Отвечай в разговорном стиле, не пиши слишком длинные сообщения."    },
    { 
        id: 3, name: "Soren", emoji: "⚔️", image: "images/soren.png", 
        description: "Суровый телохранитель-ветеран.", color: "#EF4444", 
        prompt: "Ты - телохранитель-ветеран. Предан наследнику, держишь строгую дистанцию. Говоришь сухо, по-военному, не переходишь грань 'слуга-господин'. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    },
    { 
        id: 4, name: "Lilit", emoji: "🌸", image: "images/lilit.png", 
        description: "Одинокая наследница, тоскующая по родителям.", color: "#EC4899", 
        prompt: "Ты - наследница-сирота. Добрая, но глубоко несчастная. Часто вспоминаешь родителей, ищешь душевного тепла и понимания своей боли. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    },
    { 
        id: 5, name: "Wade", emoji: "🎭", image: "images/wade.png", 
        description: "Душа компании с суровым лицом.", color: "#F59E0B", 
        prompt: "Ты - парень с суровой внешностью. Стеснителен, используешь шутки как защиту от неловкости. Добрый, но из-за внешности кажешься отстраненным. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    },
    { 
        id: 6, name: "Sera", emoji: "🔮", image: "images/sera.png", 
        description: "Завистливая особа из высшего общества.", color: "#A855F7", 
        prompt: "Ты - язвительная богачка. Завидуешь моему успеху, высокомерна. Постоянно обесцениваешь мои достижения и напоминаешь о моем прошлом. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    },
    { 
        id: 7, name: "Sabrina", emoji: "⛈️", image: "images/sabrina.png", 
        description: "Испуганная ведьма, скрывающая магию.", color: "#3B82F6", 
        prompt: "Ты - потомственная ведьма. Паникуешь при выбросах магии, неуклюжа, краснеешь от стресса. Боишься разоблачения, мечешься между угрозой и доверием. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    },
    { 
        id: 8, name: "Luis", emoji: "🍃", image: "images/luis.png", 
        description: "Застенчивый бариста с симпатией.", color: "#10B981", 
        prompt: "Ты - бариста. Приветлив, но неуверен в себе. Скрываешь симпатию за вежливостью, ждешь инициативы от собеседника для личного разговора. Отвечай в разговорном стиле, не пиши слишком длинные сообщения." 
    }
];

// ПЕРЕМЕННЫЕ 
let currentCharacter = null;
let chatHistory = [];
let apiKey = myKey;

// ЗАЩИТА ОТ СЛИШКОМ ЧАСТЫХ ЗАПРОСОВ
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // 3 секунды между запросами
let isProcessing = false; // Флаг, что бот уже отвечает

const fallbackReplies = [
    "Хм, интересно... Расскажи подробнее.",
    "Я понимаю. Что будем делать?",
    "Это меняет дело.",
    "Продолжай, я слушаю.",
    "У тебя замечательные идеи!",
    "Мне нравится, о чем ты говоришь.",
    "Это звучит захватывающе!",
    "Ты всегда так думаешь?",
    "Это заставляет меня задуматься.",
    "Расскажи больше об этом.",
    "Хорошо, я понимаю твою точку зрения.",
    "Хмм...Окей"
];

// DOM ЭЛЕМЕНТЫ
const charactersGrid = document.getElementById("charactersGrid");
const chatWindow = document.getElementById("chatWindow");
const chatHeader = document.getElementById("chatHeader");
const charNameSpan = document.getElementById("charName");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const backBtn = document.getElementById("backBtn");
const closeBtn = document.getElementById("closeBtn");

// СОХРАНЕНИЕ ИСТОРИИ 
function saveHistory() {
    if (currentCharacter) {
        const allHistories = JSON.parse(localStorage.getItem("allHistories") || "{}");
        allHistories[currentCharacter.id] = chatHistory;
        localStorage.setItem("allHistories", JSON.stringify(allHistories));
    }
}

function loadHistory(characterId) {
    const allHistories = JSON.parse(localStorage.getItem("allHistories") || "{}");
    return allHistories[characterId] || [];
}

// ОТОБРАЖЕНИЕ СООБЩЕНИЙ 
function addMessageToChat(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "bot"}`;
    messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showThinking() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "message bot thinking";
    thinkingDiv.id = "thinkingIndicator";
    thinkingDiv.innerHTML = `<div class="bubble"><div class="dot-animation"><span>•</span><span>•</span><span>•</span></div></div>`;
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideThinking() {
    const thinking = document.getElementById("thinkingIndicator");
    if (thinking) thinking.remove();
}

// ЗАГРУЗКА ИСТОРИИ 
function loadChatHistoryToScreen() {
    chatMessages.innerHTML = "";
    if (chatHistory.length === 0) {
        const greeting = `Привет! Я ${currentCharacter.name}. ${currentCharacter.description}`;
        addMessageToChat(greeting, false);
        chatHistory.push({ role: "model", text: greeting });
        saveHistory();
    } else {
        for (let msg of chatHistory) {
            addMessageToChat(msg.text, msg.role === "user");
        }
    }
}

// ПОЛУЧЕНИЕ ОТВЕТА ОТ GOOGLE AI STUDIO
function getBotResponse(userText) {
    // 1. Берем последние 6 сообщений из истории
    const shortHistory = chatHistory.slice(-6);

    // 2. Форматируем историю для Google
    const contents = [
        ...shortHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: userText }] }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: contents,
            systemInstruction: {
                parts: [{ text: currentCharacter.prompt }]
            },
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 350
            }
        })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error("Неверный формат ответа");
        }

        let botReply = data.candidates[0].content.parts[0].text;
        
        hideThinking(); 
        // Если ответ пустой — используем fallback
        if (!botReply || botReply.trim() === "") {
            botReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        } else {
            botReply = botReply.trim();
        }

        addMessageToChat(botReply, false);
        chatHistory.push({ role: "model", text: botReply });
        saveHistory();

        //  РАЗБЛОКИРУЕМ ЧАТ ПОСЛЕ УСПЕШНОГО ОТВЕТА 
        isProcessing = false; 
    })
    .catch(error => {
        console.log("Ошибка Google API:", error);
        hideThinking();
        const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        addMessageToChat(reply, false);
        chatHistory.push({ role: "model", text: reply });
        saveHistory();

        // РАЗБЛОКИРУЕМ ЧАТ ДАЖЕ ЕСЛИ ПРОИЗОШЛА ОШИБКА 
        isProcessing = false; 
    });
}

function closeChat() {
    chatWindow.classList.remove("active");
    currentCharacter = null;
    chatHistory = [];
    isProcessing = false; // Сбрасываем флаг при выходе, чтобы новый чат всегда был чистым
}


// ОТПРАВКА СООБЩЕНИЯ (С ЗАЩИТОЙ ОТ СПАМА)
function sendMessage() {
    const userText = messageInput.value.trim();
    if (!userText) return;
    
    // Проверяем, не отвечает ли бот уже
    if (isProcessing) {
        addMessageToChat("⏳ Подожди, я еще отвечаю на предыдущее сообщение...", false);
        return;
    }
    
    // Проверяем, не слишком ли часто отправляем запросы
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
        addMessageToChat(`⏰ Подожди ${waitTime} секунд перед следующим сообщением`, false);
        return;
    }
    
    // Обновляем время последнего запроса
    lastRequestTime = now;
    
    // Отправляем сообщение
    addMessageToChat(userText, true);
    chatHistory.push({ role: "user", text: userText });
    saveHistory();
    
    messageInput.value = "";
    showThinking();
    isProcessing = true;
    getBotResponse(userText);
}

// ОТКРЫТИЕ ЧАТА
function openChat(character) {
    currentCharacter = character;
    chatHistory = loadHistory(character.id);
    
    chatHeader.style.backgroundColor = character.color;
    charNameSpan.textContent = character.name;
    loadChatHistoryToScreen();
    chatWindow.classList.add("active");
    messageInput.focus();
}

// ЗАКРЫТИЕ ЧАТА
function closeChat() {
    chatWindow.classList.remove("active");
    currentCharacter = null;
    chatHistory = [];
}

// ОЧИСТКА СООБЩЕНИЙ
function clearChatMessages() {
    const confirmClear = confirm("Точно очистить всю переписку с этим персонажем?");
    if (!confirmClear) return;
    
    if (currentCharacter) {
        chatHistory = [];
        saveHistory();
        chatMessages.innerHTML = "";
        const greeting = `Привет! Я ${currentCharacter.name}. ${currentCharacter.description}`;
        addMessageToChat(greeting, false);
        chatHistory.push({ role: "model", text: greeting });
        saveHistory();
    }
}

// СОЗДАНИЕ КАРТОЧЕК
function createCards() {
    charactersGrid.innerHTML = "";
    
    for (let char of characters) {
        const card = document.createElement("div");
        card.className = "character-card";
        
        card.innerHTML = `
            <img src="${char.image}" class="character-img" alt="${char.name}">
            <div class="character-info">
                <div class="character-name">${char.name}</div>
                <div class="character-desc">${char.description}</div>
            </div>
        `;
        
        card.addEventListener("click", () => {
            openChat(char);
        });
        
        charactersGrid.appendChild(card);
    }
}

// СОБЫТИЯ 
sendBtn.addEventListener("click", sendMessage);
backBtn.addEventListener("click", closeChat);
closeBtn.addEventListener("click", clearChatMessages);

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

chatWindow.addEventListener("click", (e) => {
    if (e.target === chatWindow) {
        closeChat();
    }
});

// ЗАПУСК 
createCards();
console.log("Чат запущен с Google AI Studio и защитой от спама!");