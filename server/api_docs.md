### Endpoints

**No need authentication**
- POST /register
- POST /login

**Need authentication**
- GET /jobs
- GET /jobs/:id
- POST /roadmaps/generate/:id
- GET /roadmaps
- GET /roadmaps/:id
- DELETE /roadmaps/:id

---

### POST /register

- Request Body
```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

- Response (201 - Created)
```json
{
  "message": "register success"
}
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### POST /login

- Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

- Response (200 - OK)
```json
{
  "access_token": "string"
}
```

- Response (400 - Bad Request)
```json
{
  "message": "Email or password are required"
}
```

- Response (401 - Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### GET /jobs

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
[
  {
    "id": "string",
    "title": "string",
    ...
  }
]
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### GET /jobs/:id

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  ...
}
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### POST /roadmaps/generate/:id

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
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
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### GET /roadmaps

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
[
  {
    "id": "number",
    "UserId": "number",
    "title": "string",
    "roadmap": {},
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### GET /roadmaps/:id

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
{
  "id": "number",
  "UserId": "number",
  "title": "string",
  "roadmap": {},
  "createdAt": "string",
  "updatedAt": "string"
}
```

- Response (404 - Not Found)
```json
{
  "message": "Roadmap not found"
}
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

---

### DELETE /roadmaps/:id

- Request Header
```json
{
  "access_token": "<your access token>"
}
```

- Response (200 - OK)
```json
{
  "message": "Roadmap deleted successfully"
}
```

- Response (404 - Not Found)
```json
{
  "message": "Roadmap not found"
}
```

- Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

