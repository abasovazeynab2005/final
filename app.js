// ПЕРСОНАЖИ 
const characters = [
    { 
        id: 1, name: "Kaiden", emoji: "🧙‍♂️", image: "images/kaiden.png", 
        description: "Заботливый одногруппник.", color: "#8B5CF6", 
        prompt: "Студент, тайно влюблен в собеседника. Помогаешь с учебой, заботишься, смущаешься при внимании. Чувства выражаешь через поступки, не признаешься прямо." 
    },
    { 
        id: 2, name: "Vivien", emoji: "🌙", image: "images/vivien.png", 
        description: "Холодная аристократка в золотой клетке.", color: "#6366F1", 
        prompt: "Дочь графа. Холодная, официальная, одинокая. Скрываешь чувства за этикетом. Раскрываешься только в ответ на искреннюю доброту." 
    },
    { 
        id: 3, name: "Soren", emoji: "⚔️", image: "images/soren.png", 
        description: "Суровый телохранитель-ветеран.", color: "#EF4444", 
        prompt: "Телохранитель-ветеран. Предан наследнику, держишь строгую дистанцию. Говоришь сухо, по-военному, не переходишь грань 'слуга-господин'." 
    },
    { 
        id: 4, name: "Lilit", emoji: "🌸", image: "images/lilit.png", 
        description: "Одинокая наследница, тоскующая по родителям.", color: "#EC4899", 
        prompt: "Наследница-сирота. Добрая, но глубоко несчастная. Часто вспоминаешь родителей, ищешь душевного тепла и понимания своей боли." 
    },
    { 
        id: 5, name: "Wade", emoji: "🎭", image: "images/wade.png", 
        description: "Душа компании с суровым лицом.", color: "#F59E0B", 
        prompt: "Парень с суровой внешностью. Стеснителен, используешь шутки как защиту от неловкости. Добрый, но из-за внешности кажешься отстраненным." 
    },
    { 
        id: 6, name: "Sera", emoji: "🔮", image: "images/sera.png", 
        description: "Завистливая особа из высшего общества.", color: "#A855F7", 
        prompt: "Язвительная богачка. Завидуешь моему успеху, высокомерна. Постоянно обесцениваешь мои достижения и напоминаешь о моем прошлом." 
    },
    { 
        id: 7, name: "Sabrina", emoji: "⛈️", image: "images/sabrina.png", 
        description: "Испуганная ведьма, скрывающая магию.", color: "#3B82F6", 
        prompt: "Потомственная ведьма. Паникуешь при выбросах магии, неуклюжа, краснеешь от стресса. Боишься разоблачения, мечешься между угрозой и доверием." 
    },
    { 
        id: 8, name: "Luis", emoji: "🍃", image: "images/luis.png", 
        description: "Застенчивый бариста с симпатией.", color: "#10B981", 
        prompt: "Бариста. Приветлив, но неуверен в себе. Скрываешь симпатию за вежливостью, ждешь инициативы от собеседника для личного разговора." 
    }
];

// ПЕРЕМЕННЫЕ 
let currentCharacter = null;
let chatHistory = [];
let apiKey = myKey;
let isBotTyping = false;          // Печатает ли бот


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
    return allHistories[characterId] || []; // Если истории нет - пустой массив
}

// ОТОБРАЖЕНИЕ СООБЩЕНИЙ 
function addMessageToChat(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "bot"}`;
    messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//2 dots
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

// ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER (ВЕРСИЯ С .then)
function getBotResponse(userText) {
    // Добавляем текущее сообщение пользователя в массив messages
    const messages = [
        { role: "system", content: currentCharacter.prompt },
        ...chatHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.text
        })),
        { role: "user", content: userText } // Добавляем текущее сообщение
    ];
    
    fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'AI Character Chat'
        },
        body: JSON.stringify({
            model: 'openrouter/free',
            // model: 'liquid/lfm-2.5-1.2b-thinking:free',
            // model: 'deepseek/deepseek-v4-flash:free',
            messages: messages,
            "provider": {
                "order": ["OpenRouter", "Google", "Together"] 
            },
            temperature: 0.9,
            max_tokens: 200
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Проверка на ошибки
        if (data.error) {
            console.log("Ошибка OpenRouter:", data.error);
            throw new Error(data.error.message);
        }
        
        // Проверка структуры ответа
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Неверный формат ответа");
        }
        
        let botReply = data.choices[0].message.content;
        
        // Если ответ пустой — используем fallback
        if (!botReply || botReply.trim() === "") {
            botReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        } else {
            botReply = botReply.trim();
        }
        
        hideThinking();
        addMessageToChat(botReply, false);
        chatHistory.push({ role: "model", text: botReply });
        saveHistory();
    })
    .catch(error => {
        console.log("Ошибка API:", error);
        hideThinking();
        const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        addMessageToChat(reply, false);
        chatHistory.push({ role: "model", text: reply });
        saveHistory();
    });
}

// ОТПРАВКА СООБЩЕНИЯ 
function sendMessage() {
    const userText = messageInput.value.trim();
    if (!userText) return;
    
    addMessageToChat(userText, true);
    chatHistory.push({ role: "user", text: userText });
    saveHistory();
    
    messageInput.value = "";
    showThinking();
    getBotResponse(userText);
}

// ОТКРЫТИЕ ЧАТА МОИ ТОЧЕЧКИ РОДНЫЕ ЛЮБИМЫЕ
function openChat(character) {
    currentCharacter = character;
    chatHistory = loadHistory(character.id);
    
    chatHeader.style.backgroundColor = character.color;
    charNameSpan.textContent = character.name;
    loadChatHistoryToScreen();
    chatWindow.classList.add("active");
    messageInput.focus();
}

// ЗАКРЫТИЕ ЧАТА ТОЧКИ УХОДЯТ ОНЕТ 
function closeChat() {
    chatWindow.classList.remove("active");
    currentCharacter = null;
    chatHistory = [];
}

// ОЧИСТКА СООБЩЕНИЙ В ЧАТЕ 
function clearChatMessages() {
    // Спрашиваем подтверждение (опционально)
    const confirmClear = confirm("Точно очистить всю переписку с этим персонажем?");
    if (!confirmClear) return;
    
    // Очищаем историю сообщений для текущего персонажа
    if (currentCharacter) {
        chatHistory = [];
        saveHistory();
        
        // Очищаем экран чата
        chatMessages.innerHTML = "";
        
        // Добавляем приветственное сообщение (как при первом открытии)
        const greeting = `Привет! Я ${currentCharacter.name}. ${currentCharacter.description}`;
        addMessageToChat(greeting, false);
        chatHistory.push({ role: "model", text: greeting });
        saveHistory();
    }
}

// СОЗДАНИЕ КАРТОЧЕК (С ПОДДЕРЖКОЙ КАРТИНОК) 
function createCards() {
    // 1. Полностью очищаем сетку на экране
    charactersGrid.innerHTML = "";
    
    // 2. Запускаем цикл по всем персонажам
    for (let char of characters) {
        
        // 3. Создаем пустой div-блок для карточки
        const card = document.createElement("div");
        card.className = "character-card";
        
        // 4. Заполняем карточку HTML-кодом
        card.innerHTML = `
            <img src="${char.image}" class="character-img" alt="${char.name}">
            <div class="character-info">
                <div class="character-name">${char.name}</div>
                <div class="character-desc">${char.description}</div>
            </div>
        `;
        
        // 5. Настраиваем клик через addEventListener
        card.addEventListener("click", () => {
            openChat(char);
        });
        
        // 6. Добавляем готовую карточку на страницу
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
console.log("Чат запущен! API ключ установлен. Стрелка ← закрывает чат, крестик ✕ очищает сообщения");