
# 🧬 RareDex – Your Rare Disease Companion

RareDex is an  platform designed to **empower patients with rare diseases** through **early symptom identification, real-time social insights, and access to comprehensive disease information.** 

---

## 🔍 Key Features

### 🩺 AI Symptom Analyzer
> An **interactive chatbot** that helps users identify potential rare diseases based on symptoms. Mimics conversations with a healthcare professional and offers support as a first point of contact.

### 🗨️ Social Feed Integration
> Aggregates relevant conversations from **Reddit** and **Twitter/X**, enabling patients to **see real experiences from others with similar conditions**.

### 📊 Disease Statistics & Database
> A **comprehensive database** of rare diseases with:

- Prevalence data
- Symptoms breakdown
- Treatment options
- Interactive data visualizations

---

## 🛠️ Tech Stack

| Technology      | Description                                      |
|-----------------|--------------------------------------------------|
| **Styling**     | Tailwind CSS + Shadcn UI Components              |
| **3D Modeling** | Three.js for interactive rotating DNA animation  |
| **AI Integration** | Custom symptom analysis model via server APIs  |
| **Social Media** | Reddit & Twitter APIs for live feed aggregation  |
| **Data Viz**    | Interactive charts for disease statistics        |

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/teamstrawberry/raredex.git

# 2. Navigate into the project folder
cd raredex

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local

# 5. Edit .env.local with your API keys (Reddit, Twitter, custom AI)

# 6. Run the development server
npm run dev

# 7. Open in your browser
Visit: http://localhost:3000
```

---

## 📂 Project Structure

```
.
├── components
│   ├── ui               # Shadcn UI components (buttons, cards, badges, etc.)
│   ├── rotating-dna.tsx  # 3D DNA animation
│   ├── social-feed.tsx   # Social feed component
│   ├── resource-list.tsx # Resource list component
│   └── PagesWithSidebar.tsx # Layout for pages with sidebars
├── pages
│   ├── index.tsx         # Main landing page (Home)
│   ├── social-feed.tsx   # Social feed page
│   ├── database.tsx      # Disease database page
│   ├── about.tsx         # About page
│   ├── contact.tsx       # Contact page
│   ├── api                # (optional API endpoints if needed)
└── public
    ├── dna.glb           # 3D DNA model file
    └── assets            # Static assets
```

---


---

## 📞 Contact Us

For questions, email me at h.thien@wustl.edu

---

## ✅ Future Plans

- Expand social feed to cover **more groups**.
- Integrate **disease-specific discussion forums**.
- Enhance symptom analyzer with **machine learning model updates**.
- Develop **personalized disease dashboards** for users.
