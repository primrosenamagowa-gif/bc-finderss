const express = require("express");

const router = express.Router();

const { askGemini } = require("../services/geminiService");
const { buildPrompt } = require("../services/promptBuilder");
const { searchKnowledgeBase } = require("../services/knowledgeBase");

const {
    saveMessage,
    getConversation
} = require("../services/memory");

router.post("/", async (req, res) => {

    try {

        const { message } = req.body;

        console.log("Chat route hit:", message);

        if (!message || !message.trim()) {

            return res.json({
                reply: "Please ask a question."
            });
        }

        const userId = "student1";

        saveMessage(userId, message);

        const conversation = getConversation(userId);

        // Search knowledge base
        const kbResult = searchKnowledgeBase(message);

        // If knowledge base found something
        if (kbResult) {

            let reply = "";

            // Field responses
            if (kbResult.field) {

                reply =
`${kbResult.field}

Description:
${kbResult.description}

Possible Careers:
${kbResult.careers.join(", ")}

Skills:
${kbResult.skills.join(", ")}`;
            }

            // Career responses
            else if (kbResult.career) {

                reply =
`${kbResult.career}

Required Subjects:
${kbResult.subjects.join(", ")}

Required Skills:
${kbResult.skills.join(", ")}

Qualification:
${kbResult.qualification}`;
            }

            // Education responses
            else if (kbResult.topic) {

                reply =
`${kbResult.topic}

${kbResult.description}`;
            }

            // Belgium Campus programme responses
            else if (kbResult.programme) {

                reply =
`${kbResult.programme}

${kbResult.description}`;
            }

            return res.json({
                reply
            });
        }

        // Build Gemini Prompt
        const prompt = buildPrompt(
            `
Conversation History:
${Array.isArray(conversation)?conversation.join("\n") : ""}

Current Interest:
${conversation.currentInterest || "None"}

Student Question:
${message}
            `,
            null
        );

        const aiReply = await askGemini(prompt);

        return res.json({
            reply: aiReply || "Sorry, I couldn't generate a response."
        });

    } catch (error) {

        console.error("Chat Route Error:", error);

        return res.status(500).json({
            reply: "Server error." + error.message
        });
    }
});

module.exports = router;