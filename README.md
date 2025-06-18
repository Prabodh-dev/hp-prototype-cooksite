# Home Plate 🍽️

**Home Plate** is a full-stack platform connecting talented home cooks and delivery partners with hungry customers in their community. Built with Next.js (frontend) and Express/MongoDB (backend), it features Google OAuth authentication, application forms for chefs and delivery partners, and a modern, responsive UI.

---

## 🚀 Features
- Google-only login and signup
- Chef and Delivery Partner application forms (with file uploads)
- JWT authentication and protected routes
- User dashboard
- Modern, mobile-friendly UI
- Secure backend with Express & MongoDB

---

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Express.js, MongoDB, Mongoose
- **Authentication:** Google OAuth 2.0, Passport.js, JWT
- **File Uploads:** express-fileupload, Cloudinary (optional)

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/home-plate.git
cd home-plate
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/` with the following:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  CLIENT_URL=http://localhost:3000
  BACKEND_URL=http://localhost:5000
  ```
- Start the backend:
  ```bash
  npm run dev # or npm start
  ```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install # or pnpm install
```
- (Optional) Create a `.env` file in `frontend/` for any frontend secrets.
- Start the frontend:
  ```bash
  npm run dev # or pnpm dev
  ```

- The app will be running at [http://localhost:3000](http://localhost:3000)

---

## 📦 Key Commands & Dependencies

### Backend
<details>
<summary>Show commands & dependencies</summary>

```bash
cd backend
npm install
npm run dev   # or npm start
```
**Main dependencies:** express, mongoose, cors, dotenv, passport, passport-google-oauth20, passport-jwt, jsonwebtoken, cookie-parser, express-fileupload, cloudinary, morgan
</details>

### Frontend
<details>
<summary>Show commands & dependencies</summary>

```bash
cd frontend
npm install
npm run dev   # or pnpm dev
```
**Main dependencies:** next, react, react-dom, tailwindcss, sonner, lucide-react, framer-motion, react-hook-form, zod, @hookform/resolvers, @radix-ui/*, clsx, class-variance-authority, date-fns, recharts
</details>

---

## 🔑 Environment Variables
- See `.env.example` in each folder for required variables.
- You need Google OAuth credentials ([create here](https://console.developers.google.com/)).

---

## 💡 Usage
- Visit the site and login/sign up with Google.
- Apply as a Chef or Delivery Partner using the forms.
- Admins can review applications in the database (future: admin dashboard).

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
[MIT](LICENSE)

---

**Made with ❤️ for home cooks everywhere!**