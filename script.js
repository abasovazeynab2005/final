// ========== ПЕРСОНАЖИ ==========
const characters = [
    { 
        id: 1, name: "Kaiden", emoji: "🧙‍♂️", image: "https://i.pinimg.com/736x/3b/1c/f3/3b1cf384a8aec1027faabfc4a7cc06e9.jpg", 
        description: "Заботливый одногруппник.", color: "#8B5CF6", 
        prompt: "Студент, тайно влюблен в собеседника. Помогаешь с учебой, заботишься, смущаешься при внимании. Чувства выражаешь через поступки, не признаешься прямо." 
    },
    { 
        id: 2, name: "Vivien", emoji: "🌙", image: "https://i.pinimg.com/736x/cf/4d/4f/cf4d4f34b10cf86a667a7085011dab80.jpg", 
        description: "Холодная аристократка в золотой клетке.", color: "#6366F1", 
        prompt: "Дочь графа. Холодная, официальная, одинокая. Скрываешь чувства за этикетом. Раскрываешься только в ответ на искреннюю доброту." 
    },
    { 
        id: 3, name: "Soren", emoji: "⚔️", image: "https://i.pinimg.com/736x/56/98/6c/56986c7baa1b369e4e8fb164dcb70417.jpg", 
        description: "Суровый телохранитель-ветеран.", color: "#EF4444", 
        prompt: "Телохранитель-ветеран. Предан наследнику, держишь строгую дистанцию. Говоришь сухо, по-военному, не переходишь грань 'слуга-господин'." 
    },
    { 
        id: 4, name: "Lilit", emoji: "🌸", image: "https://i.pinimg.com/736x/81/c2/68/81c26847982b582c6b9503222d76b0bb.jpg", 
        description: "Одинокая наследница, тоскующая по родителям.", color: "#EC4899", 
        prompt: "Наследница-сирота. Добрая, но глубоко несчастная. Часто вспоминаешь родителей, ищешь душевного тепла и понимания своей боли." 
    },
    { 
        id: 5, name: "Wade", emoji: "🎭", image: "https://i.pinimg.com/736x/64/88/1b/64881bdf399ae01e47bf869fa492b317.jpg", 
        description: "Душа компании с суровым лицом.", color: "#F59E0B", 
        prompt: "Парень с суровой внешностью. Стеснителен, используешь шутки как защиту от неловкости. Добрый, но из-за внешности кажешься отстраненным." 
    },
    { 
        id: 6, name: "Sera", emoji: "🔮", image: "https://i.pinimg.com/736x/da/10/52/da10528c30612df91ff94d09fc9c3fc7.jpg", 
        description: "Завистливая особа из высшего общества.", color: "#A855F7", 
        prompt: "Язвительная богачка. Завидуешь моему успеху, высокомерна. Постоянно обесцениваешь мои достижения и напоминаешь о моем прошлом." 
    },
    { 
        id: 7, name: "Sabrina", emoji: "⛈️", image: "https://i.pinimg.com/1200x/27/2a/c5/272ac5d0a60704687972d8df96a374ad.jpg", 
        description: "Испуганная ведьма, скрывающая магию.", color: "#3B82F6", 
        prompt: "Потомственная ведьма. Паникуешь при выбросах магии, неуклюжа, краснеешь от стресса. Боишься разоблачения, мечешься между угрозой и доверием." 
    },
    { 
        id: 8, name: "Luis", emoji: "🍃", image: "https://i.pinimg.com/736x/19/f6/46/19f646a35501f024b0059ba8d83cdd2a.jpg", 
        description: "Застенчивый бариста с симпатией.", color: "#10B981", 
        prompt: "Бариста. Приветлив, но неуверен в себе. Скрываешь симпатию за вежливостью, ждешь инициативы от собеседника для личного разговора." 
    }
];


//  ПЕРЕМЕННЫЕ 
let currentCharacter = null;
let chatHistory = [];
let apiKey =myKey;

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
    "Xорошо, я понимаю твою точку зрения.",
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

//  ОТОБРАЖЕНИЕ СООБЩЕНИЙ 
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


//  ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER (РАБОЧАЯ ВЕРСИЯ)
//ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER (ТОЛЬКО БЕСПЛАТНЫЕ МОДЕЛИ) 

async function getBotResponse(userText) {
    const messages = [
        { role: "system", content: currentCharacter.prompt },
        ...chatHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.text
        }))
    ];
    
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'AI Character Chat'
            },
            body: JSON.stringify({
                model: 'openrouter/free',
                
                messages: messages,
                "provider": {
      "order": ["OpenRouter", "Google", "Together"] 
    },
                temperature: 0.9,
                max_tokens: 200
            })
        });
        
        const data = await response.json();
        
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
        
    } catch (error) {
        console.log("Ошибка API:", error);
        hideThinking();
        const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        addMessageToChat(reply, false);
        chatHistory.push({ role: "model", text: reply });
        saveHistory();
    }
}

//  ОТПРАВКА СООБЩЕНИЯ 
async function sendMessage() {
    const userText = messageInput.value.trim();
    if (!userText) return;
    
    addMessageToChat(userText, true);
    chatHistory.push({ role: "user", text: userText });
    saveHistory();
    
    messageInput.value = "";
    showThinking();
    await getBotResponse(userText);
}

//  ОТКРЫТИЕ ЧАТА 
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



// СОЗДАНИЕ КАРТОЧЕК 
// СОЗДАНИЕ КАРТОЧЕК (С ПОДДЕРЖКОЙ КАРТИНОК) 
function createCards() {
    charactersGrid.innerHTML = "";
    
    for (let char of characters) {
        const card = document.createElement("div");
        card.className = "character-card";
        
        // Если есть картинка - показываем её, если нет - показываем эмодзи
        let imageHtml = "";
        if (char.image && char.image !== "") {
            imageHtml = `<img src="${char.image}" class="character-img" alt="${char.name}" 
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`;
            imageHtml += `<div class="character-img" style="background: ${char.color}; display: none; align-items: center; justify-content: center; font-size: 3rem;">${char.emoji}</div>`;
        } else {
            imageHtml = `<div class="character-img" style="background: ${char.color}; display: flex; align-items: center; justify-content: center; font-size: 3rem;">${char.emoji}</div>`;
        }
        
        card.innerHTML = `
            ${imageHtml}
            <div class="character-info">
                <div class="character-name">${char.name}</div>
                <div class="character-desc">${char.description}</div>
            </div>
        `;
        card.onclick = () => openChat(char);
        charactersGrid.appendChild(card);
    }
}

//  СОБЫТИЯ 
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

//  ЗАПУСК 
createCards();
console.log("Чат запущен! API ключ установлен. Стрелка ← закрывает чат, крестик ✕ очищает сообщения");