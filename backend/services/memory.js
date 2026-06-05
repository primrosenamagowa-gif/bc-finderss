const memory = {};

function saveMessage(userId, message) {

    if (!memory[userId]) {

        memory[userId] = {
            history: [],
            currentInterest: null
        };
    }

    memory[userId].history.push(message);

    const lower = message.toLowerCase();

    const interests = [
        "software development",
        "database",
        "cybersecurity",
        "cloud computing",
        "data science",
        "networking",
        "artificial intelligence",
        "web development",
        "mobile development",
        "devops"
    ];

    for (const interest of interests) {

        if (lower.includes(interest)) {

            memory[userId].currentInterest = interest;

            break;
        }
    }

    // Keep only the last 10 messages
    if (memory[userId].history.length > 10) {

        memory[userId].history.shift();
    }
}

function getConversation(userId) {

    return memory[userId] || {
        history: [],
        currentInterest: null
    };
}

function clearConversation(userId) {

    delete memory[userId];
}

module.exports = {
    saveMessage,
    getConversation,
    clearConversation
};