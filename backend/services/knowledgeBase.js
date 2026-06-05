const careers = require("../data/careers.json");
const fields = require("../data/fields.json");
const education = require("../data/education.json");
const belgiumCampus = require("../data/belgiumCampus.json");

function searchKnowledgeBase(message) {

    const lower = message.toLowerCase();

    // Search Fields
    const fieldMatch = fields.find(field =>
        lower.includes(field.field.toLowerCase())
    );

    if (fieldMatch) {
        return fieldMatch;
    }

    // Search Careers
    const careerMatch = careers.find(career =>
        lower.includes(career.career.toLowerCase())
    );

    if (careerMatch) {
        return careerMatch;
    }

    // Search Education Topics
    const educationMatch = education.find(topic =>
        lower.includes(topic.topic.toLowerCase())
    );

    if (educationMatch) {
        return educationMatch;
    }

    // Search Belgium Campus Programmes
    const programmeMatch = belgiumCampus.find(programme =>
        lower.includes(programme.programme.toLowerCase())
    );

    if (programmeMatch) {
        return programmeMatch;
    }

    return null;
}

module.exports = {
    searchKnowledgeBase
};