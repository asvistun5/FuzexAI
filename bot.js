const keywords = {
    "greetings": ["hello", "hi", "hey", "whatsup", "wasup"],
    "farewell": ["bye", "goodbye", "see you", "farewell"],
    "weather": ["weather", "temperature", "forecast"]
    // Добавьте здесь другие команды и ключевые слова
};

// Объект с командами и соответствующими массивами ответов
const responses = {
    "greetings": [
        "Greetings! How may I be of assistance today?",
        "Hello! How can I help you today?",
        "Hi there! How can I assist you today?",
        "Hey! How can I help you today?",
        "Hey there! How's it going?",
        "Hey! What brings you here?",
        "Hello! How's your day going?",
        "Hi! How can I assist you?",
        "Hey there! Need any help?",
        "Hello! What can I do for you today?",
        "Hello again! Is there anything specific you'd like to ask or discuss today, or are you just saying hi?"
    ],
    "farewell": [
        "Goodbye! Have a great day!",
        "Farewell! Don't hesitate to come back if you have more questions.",
        "See you later! Take care!",
        "Bye! If you need anything else, feel free to ask.",
        "Goodbye! Have a wonderful day!"
    ]
    // Добавьте здесь другие команды и их ответы
};

// Функция для получения ответа бота
function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase().trim();
    let command = null;

    // Проверяем, содержится ли какое-либо ключевое слово в сообщении пользователя
    for (let cmd in keywords) {
        if (keywords[cmd].some(keyword => userMessage.includes(keyword))) {
            command = cmd;
            break;
        }
    }

    // Если команда найдена, выбираем случайный ответ
    if (command && responses[command]) {
        const responseOptions = responses[command];
        const randomIndex = Math.floor(Math.random() * responseOptions.length);
        const botResponse = responseOptions[randomIndex];

        setTimeout(() => {
            addMessage(botResponse, "bot");
        }, 250); // Эмуляция задержки ответа бота на 0.5 секунды
    } else {
        const defaultResponses = [
            "Sorry, I didn't understand your question.",
            "I'm not sure I understand. Can you rephrase your question?",
            "The text is not clear to me, could you please provide more details?",
            "I'm sorry, I couldn't comprehend your message.",
            "I'm still learning, Can you ask me something else please?"
        ];

        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        const defaultResponse = defaultResponses[randomIndex];

        setTimeout(() => {
            addMessage(defaultResponse, "bot");
        }, 1500); // Эмуляция задержки ответа бота на 1.5 секунды
    }
}

// Функция добавления сообщения
function addMessage(message, sender) {
    const messageItem = document.createElement("li");
    messageItem.classList.add("message-item");
    messageItem.classList.add(`${sender}-message`);
    messageItem.textContent = message;
    messageList.appendChild(messageItem);
    messageList.scrollTop = messageList.scrollHeight;
}

// Функция отправки сообщения
function sendMessage() {
    const userMessage = userInput.value;

    if (userMessage.trim() !== "") {
        addMessage(userMessage, "user");
        getBotResponse(userMessage);
        userInput.value = "";
    } else {
        userInput.value = "";
    }
}

userInput.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            sendMessage();
        }
});