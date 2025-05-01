const request = require('supertest')
const { beforeAll, afterAll, expect, describe } = require('@jest/globals')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User, Roadmap } = require('../models')
const axios = require('axios')
const loginApi = require('../helpers/loginApi')

jest.mock('axios')
jest.mock('../helpers/loginApi')

let accessToken
let userId

beforeAll(async () => {
    const userData = {
        "email": "test@example.com",
        "password": hashPassword("password123"),
        "username": "testuser",
        "createdAt": new Date(),
        "updatedAt": new Date()
    }

    await queryInterface.bulkInsert("Users", [userData])

    const newUser = await User.create({
        "email": "testing@example.com",
        "password": "password123",
        "username": "testinguser"
    })

    userId = newUser.id
    accessToken = signToken({ id: newUser.id, email: newUser.email, username: newUser.username })

    await Roadmap.create({
        "UserId": userId,
        "title": "Fullstack Developer",
        "roadmap": {
            "careerRoadmap": [
                {
                    "step": 1,
                    "title": "Belajar Dasar Pemrograman",
                    "description": "Memahami konsep dasar pemrograman",
                    "duration": "3-6 bulan",
                    "skills": ["HTML", "CSS", "JavaScript"]
                }
            ]
        },
        "createdAt": new Date(),
        "updatedAt": new Date()
    })

    loginApi.mockResolvedValue("mock-token")
    
    axios.get.mockImplementation((url) => {
        if (url.includes('/apis/career-portal/jobs') && !url.includes('/apis/career-portal/jobs/')) {
            return Promise.resolve({
                data: {
                    data: Array(100).fill().map((_, i) => ({
                        id: i + 1,
                        title: `Job ${i + 1}`,
                        description: `Description for Job ${i + 1}`
                    }))
                }
            })
        } 
        else if (url.includes('/apis/career-portal/jobs/')) {
            const jobId = url.split('/').pop()
            return Promise.resolve({
                data: {
                    data: {
                        id: parseInt(jobId),
                        title: `Job ${jobId}`,
                        description: `Description for Job ${jobId}`
                    }
                }
            })
        }
        return Promise.reject(new Error('URL tidak dikenal dalam mock'))
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete("Roadmaps", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe("POST /register", () => {
    test("berhasil mendaftarkan user baru", async () => {
        const userBaru = {
            "email": "user.baru@example.com",
            "password": "password123",
            "username": "userbaru"
        }

        const response = await request(app).post('/register').send(userBaru)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message", "register success")
    })

    test("gagal mendaftarkan user karena email sudah terdaftar", async () => {
        const userDuplikat = {
            "email": "test@example.com",
            "password": "password123",
            "username": "testuser"
        }

        const response = await request(app).post('/register').send(userDuplikat)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendaftarkan user karena data tidak lengkap", async () => {
        const userTidakLengkap = {
            "email": "tidak.lengkap@example.com",
            "password": ""
        }

        const response = await request(app).post('/register').send(userTidakLengkap)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /login", () => {
    test("berhasil login dan mengirimkan access_token", async () => {
        const userCredential = {
            "email": "test@example.com",
            "password": "password123"
        }

        const response = await request(app).post('/login').send(userCredential)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    test("gagal login karena email tidak diberikan", async () => {
        const userCredential = {
            "email": "",
            "password": "password123"
        }

        const response = await request(app).post('/login').send(userCredential)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal login karena password tidak diberikan", async () => {
        const userCredential = {
            "email": "test@example.com",
            "password": ""
        }

        const response = await request(app).post('/login').send(userCredential)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal login karena email tidak terdaftar", async () => {
        const userCredential = {
            "email": "tidak.ada@example.com",
            "password": "password123"
        }

        const response = await request(app).post('/login').send(userCredential)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal login karena password salah", async () => {
        const userCredential = {
            "email": "test@example.com",
            "password": "passwordsalah"
        }

        const response = await request(app).post('/login').send(userCredential)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /jobs", () => {
    test("berhasil mendapatkan daftar pekerjaan", async () => {
        const response = await request(app)
            .get('/jobs')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeLessThanOrEqual(50)
    })

    test("gagal mendapatkan daftar pekerjaan karena tidak terautentikasi", async () => {
        const response = await request(app).get('/jobs')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendapatkan daftar pekerjaan karena token tidak valid", async () => {
        const response = await request(app)
            .get('/jobs')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /jobs/:id", () => {
    test("berhasil mendapatkan detail pekerjaan berdasarkan id", async () => {
        const response = await request(app)
            .get('/jobs/1')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id", 1)
        expect(response.body).toHaveProperty("title", "Job 1")
        expect(response.body).toHaveProperty("description", "Description for Job 1")
    })

    test("gagal mendapatkan detail pekerjaan karena tidak terautentikasi", async () => {
        const response = await request(app).get('/jobs/1')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendapatkan detail pekerjaan karena token tidak valid", async () => {
        const response = await request(app)
            .get('/jobs/1')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /roadmaps/generate/:id", () => {
    test("berhasil menghasilkan roadmap berdasarkan pekerjaan", async () => {
        jest.mock('@google/genai', () => {
            return {
                GoogleGenAI: jest.fn().mockImplementation(() => {
                    return {
                        models: {
                            generateContent: jest.fn().mockResolvedValue({
                                text: JSON.stringify({
                                    careerRoadmap: [
                                        {
                                            step: 1,
                                            title: "Langkah Awal",
                                            description: "Deskripsi langkah awal",
                                            duration: "3 bulan",
                                            skills: ["Skill A", "Skill B"]
                                        }
                                    ]
                                })
                            })
                        }
                    }
                })
            }
        })

        const response = await request(app)
            .post('/roadmaps/generate/1')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("careerRoadmap")
    })

    test("gagal menghasilkan roadmap karena tidak terautentikasi", async () => {
        const response = await request(app).post('/roadmaps/generate/1')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal menghasilkan roadmap karena token tidak valid", async () => {
        const response = await request(app)
            .post('/roadmaps/generate/1')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /roadmaps", () => {
    test("berhasil mendapatkan daftar roadmap milik user", async () => {
        const response = await request(app)
            .get('/roadmaps')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("gagal mendapatkan daftar roadmap karena tidak terautentikasi", async () => {
        const response = await request(app).get('/roadmaps')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendapatkan daftar roadmap karena token tidak valid", async () => {
        const response = await request(app)
            .get('/roadmaps')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /roadmaps/:id", () => {
    test("berhasil mendapatkan detail roadmap berdasarkan id", async () => {
        const roadmaps = await Roadmap.findAll({ where: { UserId: userId } })
        const roadmapId = roadmaps[0].id

        const response = await request(app)
            .get(`/roadmaps/${roadmapId}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id", roadmapId)
        expect(response.body).toHaveProperty("title", "Fullstack Developer")
        expect(response.body).toHaveProperty("roadmap")
    })

    test("gagal mendapatkan detail roadmap karena id tidak ditemukan", async () => {
        const response = await request(app)
            .get('/roadmaps/999')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendapatkan detail roadmap karena tidak terautentikasi", async () => {
        const response = await request(app).get('/roadmaps/1')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal mendapatkan detail roadmap karena token tidak valid", async () => {
        const response = await request(app)
            .get('/roadmaps/1')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("DELETE /roadmaps/:id", () => {
    test("berhasil menghapus roadmap berdasarkan id", async () => {
        const roadmaps = await Roadmap.findAll({ where: { UserId: userId } })
        const roadmapId = roadmaps[0].id

        const response = await request(app)
            .delete(`/roadmaps/${roadmapId}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message", "Roadmap deleted successfully")
    })

    test("gagal menghapus roadmap karena id tidak ditemukan", async () => {
        const response = await request(app)
            .delete('/roadmaps/999')
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal menghapus roadmap karena tidak terautentikasi", async () => {
        const response = await request(app).delete('/roadmaps/1')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("gagal menghapus roadmap karena token tidak valid", async () => {
        const response = await request(app)
            .delete('/roadmaps/1')
            .set('Authorization', 'Bearer token-tidak-valid')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})