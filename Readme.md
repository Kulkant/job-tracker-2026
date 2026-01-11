Job & Freelance Tracker
Goal : Help user to track job applications and freelance leads
Tech: React , Node, Express , MongoDB
Deadline: 30Days

Frontend: React
Backend: Node + Express
DB: MongoDb
Auth: JWT

POST /auth/register
POST /auth/login
POST /jobs
GET /jobs
PUT /jobs/:id
DELETE /jobs/:id

Protected Routes Plan
-Middleware : auth.middleware.js
-Verify jwt
-Attach userId to req.user
-Protect /job routes
