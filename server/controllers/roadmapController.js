const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");
const loginApi = require("../helpers/loginApi");
const { Roadmap } = require("../models");

module.exports = class RoadmapController {
    static async generateRoadmap(req, res, next) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { id } = req.params;
        const token = await loginApi();
        try {
            const response = await axios.get(`${process.env.BASE_URL_API}/apis/career-portal/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const job = response.data.data;

            const jobTitle = job.title;
            const jobDescription = job.description;

            const prompt = `
Kamu adalah asisten AI profesional yang menghasilkan roadmap karier dalam format JSON. Buat roadmap agar seseorang bisa bekerja sebagai "${jobTitle}", berdasarkan deskripsi berikut:

"${jobDescription}"

Ikuti **format JSON persis** seperti ini (dengan kunci yang **harus sama persis** dan tipe data sesuai):

{
  "careerRoadmap": [
    {
      "step": 1,
      "title": "string",
      "description": "string",
      "duration": "string",
      "skills": ["string"]
    }
  ]
}

⚠️ Penting:
- Gunakan hanya kunci: step, title, description, duration, skills.
- Hanya kirim JSON murni, tidak ada teks tambahan apa pun.
- Format dan struktur **harus identik** seperti contoh di atas, hanya isinya yang berbeda.
`;

            const resAi = await ai.models.generateContent({
                model: "gemini-1.5-pro",
                contents: prompt,
            });

            let rawText = resAi.text;

            rawText = rawText.replace(/```json\s*|\s*```/g, "");

            const jsonResponse = JSON.parse(rawText);

            const roadmap = await Roadmap.create({
                UserId: req.user.id,
                title: jobTitle,
                roadmap: jsonResponse,
            });

            res.status(200).json(jsonResponse);
        } catch (err) {
            next(err);
        }
    }

    static async getRoadmap(req, res, next) {
        try {
            const roadmaps = await Roadmap.findAll({
                where: {
                    UserId: req.user.id,
                },
            });

            res.status(200).json(roadmaps);
        } catch (err) {
            next(err);
        }
    }

    static async getRoadmapById(req, res, next) {
        try {
            const { id } = req.params;
            const roadmap = await Roadmap.findOne({
                where: {
                    id,
                    UserId: req.user.id,
                },
            });
            
            if (!roadmap) {
                throw {name: 'notFound', message: 'Roadmap not found'}
            }

            res.status(200).json(roadmap);
        } catch (err) {
            next(err);
        }
    }

    static async deleteRoadmap(req, res, next) {
        try {
            const { id } = req.params;
            const roadmap = await Roadmap.findOne({
                where: {
                    id,
                    UserId: req.user.id,
                },
            });

            if (!roadmap) {
                throw {name: 'notFound', message: 'Roadmap not found'}
            }

            await Roadmap.destroy({
                where: {
                    id,
                    UserId: req.user.id,
                },
            });

            res.status(200).json({ message: 'Roadmap deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
};
