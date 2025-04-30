const { GoogleGenAI } = require("@google/genai");

module.exports = class RoadmapController {
    static async generateRoadmap(req, res, next) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: "bagaimana Ai bisa bekerja sama denagan manusia misalnya dalam bidang teknologi membuat sebuah website ecomerse",
            });
            console.log(response.text);

            res.status(200).json({ message: response.text })
        } catch (err) {
            next(err)
        }
    }
}