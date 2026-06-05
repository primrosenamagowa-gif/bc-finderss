const blockedTopics = [
        "violence",
    "dating",
    "politics",
    "hack",
    "illegal",
    "adult",
    "drugs",
    "gambling",
    "hate",
    "self-harm",
    "weapon"
];

function isAllowed(message) {

    const lowerMessage = message.toLowerCase();

    return !blockedTopics.some(topic =>
        lowerMessage.includes(topic)
    );
}

module.exports = { isAllowed };