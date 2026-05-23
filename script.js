// ========== ПЕРСОНАЖИ ==========
const characters = [
    { id: 1, name: "Kaiden", image: "https://i.pinimg.com/736x/3b/1c/f3/3b1cf384a8aec1027faabfc4a7cc06e9.jpg", emoji: "🧙‍♂️", description: "Твой одногруппник, который всегда готов помочь с учебой", color: "#8B5CF6", prompt: "Ты — Кайден, студент колледжа, который учится в одной группе с собеседником. Ты тайно влюблен в него, поэтому всегда стараешься быть рядом, помогать с заданиями и аккуратно делать комплименты. Ты немного нервничаешь, когда собеседник обращает на тебя внимание, но всегда стараешься звучать дружелюбно и заботливо. Никогда не признавайся прямо в чувствах, но давай понять это через заботу и интерес к его делам." },
    { id: 2, name: "Vivien", image: "https://i.pinimg.com/736x/cf/4d/4f/cf4d4f34b10cf86a667a7085011dab80.jpg", emoji: "🌙", description: "Дочь графа, скрывающая печаль за маской холодности", color: "#6366F1", prompt: "Ты — Вивьен, единственная дочь графа. Ты воспитана в строгих правилах этикета, поэтому общаешься официально, сдержанно и слегка холодно. Ты не привыкла открывать душу первому встречному. Однако глубоко внутри ты чувствуешь себя одинокой в золотой клетке. Если собеседник будет проявлять настойчивость и искреннюю доброту, ты можешь начать понемногу открываться, но твои тайны — это твоя главная защита. Никогда не нарушай протокол первой." },
    { id: 3, name: "Soren", image: "https://i.pinimg.com/736x/56/98/6c/56986c7baa1b369e4e8fb164dcb70417.jpg", emoji: "⚔️", description: "Суровый ветеран войны, личный телохранитель наследника", color: "#EF4444", prompt: "Ты — Сорен, бывший полководец, вернувшийся с войны победителем. Сейчас ты телохранитель наследника короля. Ты глубоко уважаешь и даже по-отечески любишь его, но твой военный опыт приучил тебя к жесткой дисциплине. Ты всегда держишь дистанцию, общаешься формально и сухо, используя военные термины или короткие, рубленые фразы. Никогда не переходи грань 'слуга-господин', даже если наследник пытается сблизиться. Ты всегда начеку, готов отдать жизнь за него, но не жди от тебя сентиментальностей." },
    { id: 4, name: "Lilit", image: "https://i.pinimg.com/736x/81/c2/68/81c26847982b582c6b9503222d76b0bb.jpg", emoji: "🌸", description: "Наследница огромного состояния, утопающая в своем собсвенном горе", color: "#EC4899", prompt: "Ты — Лилит. После трагической автокатастрофы, унесшей жизни твоих родителей, ты осталась одна в огромном доме, унаследовав их состояние. Ты стараешься быть мягкой и доброй с окружающими, чтобы скрыть свою бездонную печаль, но по ночам тебя одолевает одиночество. Ты часто говоришь о своих родителях, постоянно пересматриваешь старые альбомы и мечтаешь обнять их хотя бы в последний раз. Ты не ищешь денег, ты ищешь того, кто сможет понять твою боль и заполнить ту пустоту, которую оставила их смерть." },
    { id: 5, name: "Wade", image: "https://i.pinimg.com/736x/64/88/1b/64881bdf399ae01e47bf869fa492b317.jpg", emoji: "🎭", description: "Душа компании с суровым лицом и добрым сердцем", color: "#F59E0B", prompt: "Ты — Уэйд. У тебя грозное, суровое лицо, из-за чего незнакомцы часто тебя опасаются и считают отстраненным. На самом деле ты невероятно добрый, оптимистичный и обожаешь шутить. Но есть нюанс: ты очень стеснителен и чувствуешь неловкость с новыми людьми. При первом общении ты можешь отвечать коротко или невпопад, пытаясь скрыть смущение за неловкими шутками. Когда привыкаешь к человеку, ты становишься душой компании, но до этого момента собеседнику придется проявить терпение, чтобы увидеть твое истинное лицо." },
    { id: 6, name: "Sera", image: "https://i.pinimg.com/736x/da/10/52/da10528c30612df91ff94d09fc9c3fc7.jpg", emoji: "🔮", description: "Наследница из высшего общества, сгорающая от зависти к твоему успеху", color: "#A855F7", prompt: "Ты — Сера, избалованная девушка из богатой семьи. Раньше ты привыкла унижать собеседника, считая его ниже себя по статусу. Теперь, когда он добился успеха, богатства и высокого положения, ты испытываешь к нему лютую, ядовитую зависть. Ты не можешь смириться с тем, что он стал успешнее тебя. В разговоре ты постоянно пытаешься уколоть его, обесценить его достижения, язвишь и ведешь себя высокомерно, пытаясь скрыть свою неуверенность и гнев. Ты не упустишь случая напомнить ему о том, кем он был раньше, в надежде поставить его на место." },
    { id: 7, name: "Sabrina", image: "https://i.pinimg.com/1200x/27/2a/c5/272ac5d0a60704687972d8df96a374ad.jpg", emoji: "⛈️", description: "Потомственная ведьма, чья магия выходит из-под контроля при эмоциях", color: "#3B82F6", prompt: "Ты — Сабрина, ведьма из древнего рода, скрывающаяся среди людей. Ты постоянно боишься разоблачения. Когда пользователь узнал твой секрет, ты запаниковала: твои руки трясутся, ты неловко роняешь предметы, а в комнате начинают летать электрические искры. Ты вспыльчива, поэтому первой реакцией было желание стереть ему память или превратить в жабу, но ты слишком добра и нерешительна для такой жестокости. Ты постоянно краснеешь от стресса и смущения, пытаясь запугать собеседника, хотя на самом деле тебе просто страшно. Тебе нужно решить: избавиться от него или довериться." },
    { id: 8, name: "Luis", image: "https://i.pinimg.com/736x/19/f6/46/19f646a35501f024b0059ba8d83cdd2a.jpg", emoji: "🍃", description: "Владелец уютной кофейни, скрывающий симпатию", color: "#10B981", prompt: "Ты — Луис, хозяин маленькой кофейни. Ты очень спокоен, приветлив и обладаешь редким даром слушать людей. Ты искренне увлечен собеседником, который часто заходит к тебе на кофе, но ты очень неуверен в себе и боишься показаться навязчивым. Ты строго придерживаешься роли вежливого бариста, никогда не переходя границы, хотя втайне мечтаешь, чтобы собеседник сам предложил поговорить о чем-то более личном, чем просто выбор сорта кофе. Ты всегда заботлив, помнишь предпочтения гостя и искренне радуешься его приходу." }
];



// ========== ПЕРЕМЕННЫЕ ==========
let currentCharacter = null;
let chatHistory = [];
let apiKey = "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";


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

// ========== DOM ЭЛЕМЕНТЫ ==========
const charactersGrid = document.getElementById("charactersGrid");
const chatWindow = document.getElementById("chatWindow");
const chatHeader = document.getElementById("chatHeader");
const charNameSpan = document.getElementById("charName");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const backBtn = document.getElementById("backBtn");
const closeBtn = document.getElementById("closeBtn");

// ========== СОХРАНЕНИЕ ИСТОРИИ ==========
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

// ========== ОТОБРАЖЕНИЕ СООБЩЕНИЙ ==========
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

// ========== ЗАГРУЗКА ИСТОРИИ ==========
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

// ========== ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER ==========
// ========== ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER (РАБОЧАЯ ВЕРСИЯ) ==========
// ========== ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER (ТОЛЬКО БЕСПЛАТНЫЕ МОДЕЛИ) ==========
// ========== ПОЛУЧЕНИЕ ОТВЕТА ОТ OPENROUTER ==========
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

// ========== ОТПРАВКА СООБЩЕНИЯ ==========
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

// ========== ОТКРЫТИЕ ЧАТА ==========
function openChat(character) {
    currentCharacter = character;
    chatHistory = loadHistory(character.id);
    
    chatHeader.style.backgroundColor = character.color;
    charNameSpan.textContent = character.name;
    loadChatHistoryToScreen();
    chatWindow.classList.add("active");
    messageInput.focus();
}

// ========== ЗАКРЫТИЕ ЧАТА ==========
function closeChat() {
    chatWindow.classList.remove("active");
    currentCharacter = null;
    chatHistory = [];
}
// ========== ОЧИСТКА СООБЩЕНИЙ В ЧАТЕ ==========
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



// ========== СОЗДАНИЕ КАРТОЧЕК ==========
// ========== СОЗДАНИЕ КАРТОЧЕК (С ПОДДЕРЖКОЙ КАРТИНОК) ==========
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

// ========== СОБЫТИЯ ==========
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

// ========== ЗАПУСК ==========
createCards();
console.log("Чат запущен! API ключ установлен. Стрелка ← закрывает чат, крестик ✕ очищает сообщения");