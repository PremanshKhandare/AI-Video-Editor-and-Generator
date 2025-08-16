# 🎥✨ AI Video Generator & Editor App  

An advanced **AI-powered video generator & editor** built with **Next.js**, **Neon Database**, **Remotion**, **Inngest**, and **Clerk authentication**.  
With this app, you can **create videos from scratch** manually or with **Gemini AI**, and then **edit them with powerful tools**. 🚀  

---

## ⚡ Features  

### 🎬 Video Creation
- 🤖 **AI-powered generation** with **Gemini AI**  
- ✍️ **Manual video creation** from scratch  
- 🖼️ Add **text overlays** with custom styles & fonts  
- 🎨 Apply **solid** or **gradient backgrounds**  
- 🔲 Choose **video screen size & aspect ratio**  

### 🎨 Video Editing
- 🌟 Add **animated stickers** & fun effects  
- 🔠 Customize **font size, style, and colors**  
- 🎶 Add **background audio** or voice-over  
- 🖌️ Frame your video with **solid or gradient backgrounds**  
- ✏️ Edit & rearrange frames dynamically  

---

## 🛠️ Tech Stack  

- ⚛️ **Next.js** – Frontend & Backend  
- 🗄️ **Neon Database** – Cloud-native Postgres DB  
- 🎞️ **Remotion** – Video rendering engine  
- ⚡ **Inngest** – Background jobs & workflows  
- 🔐 **Clerk** – Authentication & user management  
- 🤖 **Gemini AI** – Smart video content generation  
- 🐘 **Drizzle ORM** – Database ORM & migrations  

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repo  
```bash
git clone https://github.com/your-username/ai-video-generator.git
cd ai-video-generator
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file and add the required keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key  
CLERK_SECRET_KEY=your_clerk_secret  
NEON_DATABASE_URL=your_neon_db_url  
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key  
```

### 4️⃣ Run the App

Start all required services in separate terminals:

#### 🟢 Start Next.js App

```bash
npm run dev
```

#### 🐘 Start Drizzle Studio

```bash
npx drizzle-kit studio
```

#### ⚡ Start Inngest Dev Server

```bash
npx inngest dev
```

Now your app will be live at 👉 [http://localhost:3000](http://localhost:3000)

---

## 🎯 Roadmap

* [ ] Add more **AI video templates** 🖼️
* [ ] Support **multi-language subtitles** 🌍
* [ ] Export in **various resolutions (720p, 1080p, 4K)** 📺
* [ ] Collaboration features (shared projects) 👥

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
