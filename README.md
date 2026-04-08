# 🌍 Rwanda Explorer Game

A Vue.js interactive educational game that lets players explore Rwanda's provinces, learn about its rich culture, and complete engaging missions.

![Rwanda Explorer](https://img.shields.io/badge/Vue-3.5.32-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## 📖 Table of Contents
- [About the Game](#about-the-game)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Game Mechanics](#game-mechanics)
- [Provinces & Missions](#provinces--missions)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎮 About the Game

**Rwanda Explorer** is an educational game that takes players on a virtual journey through the "Land of a Thousand Hills." Explore Rwanda's five provinces, discover cultural facts, visit famous landmarks, and complete quests to become a true Rwanda Explorer!

### 🎯 Learning Objectives
- Learn about Rwanda's geography and administrative divisions
- Discover cultural heritage and historical facts
- Explore national parks and tourist attractions
- Test knowledge through interactive quests

## ✨ Features

### 🗺️ Interactive Map
- **Real Geographic Data**: Uses actual Rwanda province boundaries
- **Visual Feedback**: Color-coded provinces show discovery and completion status
- **Landmarks**: Major attractions like Volcanoes National Park, Lake Kivu, and Nyungwe Forest
- **Responsive Controls**: Zoom, pan, and fullscreen modes

### 📚 Cultural Learning
- **5 Detailed Provinces**: Kigali City, Northern, Eastern, Southern, and Western Provinces
- **Fun Facts**: Each province includes interesting cultural and historical facts
- **Must-Visit Places**: Curated list of attractions for each region
- **Cultural Notes**: Random facts about Rwandan culture and traditions

### 🎯 Mission System
- **5 Unique Quests**: One mission per province
- **Multiple Choice Questions**: Test your knowledge about Rwanda
- **Scoring System**: Earn points for discoveries (50 pts) and completed missions (100 pts)
- **Achievement Notifications**: Real-time feedback when you unlock achievements

### 🏆 Game Progression
- **Track Progress**: Visual indicators for discovered and completed provinces
- **Score System**: Accumulate points as you explore
- **Completion Celebration**: Special modal when all missions are completed
- **Replayability**: Reset and start over anytime

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.5.32 | Frontend Framework |
| Leaflet | 1.9.4 | Interactive Maps |
| Font Awesome | 6.0.0 | Icons |
| Vite | 8.0.4 | Build Tool |
| Google Fonts | - | Typography |

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rwanda-explorer.git
cd rwanda-explorer
Install dependencies

bash
npm install
Run development server

bash
npm run dev
Build for production

bash
npm run build
Preview production build

bash
npm run preview
Quick Start (Using CDN)
If you prefer not to use npm, you can run the single HTML file version:

Download index.html from the repository

Open in any modern web browser

Start exploring!

📁 Project Structure
text
rwanda-explorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── GameHeader.vue           # Game stats and header
│   │   ├── MapExplorer.vue          # Interactive Leaflet map
│   │   ├── DistrictInfo.vue         # Cultural information panel
│   │   ├── QuestPanel.vue           # Mission and quiz interface
│   │   ├── WelcomeScreen.vue        # Landing screen
│   │   ├── AchievementNotification.vue  # Toast notifications
│   │   └── CompletionModal.vue      # Game completion modal
│   ├── composables/
│   │   └── useGameState.js          # Game state management
│   ├── data/
│   │   └── rwandaData.js            # Province data and quests
│   ├── App.vue                      # Root component
│   └── main.js                      # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
🎲 Game Mechanics
Scoring System
Action	Points
Discover a Province	+50
Complete a Mission	+100
Complete All Missions	Bonus Celebration
Province States
Undiscovered (Gray): Not yet explored

Discovered (Blue): Clicked on and learned about

Completed (Green): Mission successfully finished

Mission Flow
Click on a province to select it

Read cultural information in the "Culture" tab

Switch to "Mission" tab to attempt the quest

Answer the multiple-choice question

Receive immediate feedback

Earn points upon correct answer

🗺️ Provinces & Missions
Kigali City
Nickname: The Heart of Rwanda

Mission: Kigali City Navigator

Question: What is Kigali famously known for across Africa?

Answer: Being one of the cleanest and safest cities

Northern Province
Nickname: Land of Volcanoes

Mission: Gorilla Guardian

Question: Which primatologist conducted research in Volcanoes National Park?

Answer: Dian Fossey

Eastern Province
Nickname: Savanna Gateway

Mission: Wildlife Explorer

Question: Which Big Five animal was reintroduced to Akagera in 2015?

Answer: Lions

Southern Province
Nickname: Cultural Heartland

Mission: Royal Heritage

Question: Which town was the traditional capital of the ancient kingdom?

Answer: Nyanza

Western Province
Nickname: Lake & Forest Region

Mission: Rainforest Ranger

Question: How many primate species are protected in Nyungwe Forest?

Answer: 13 species

💻 Development
Adding New Features
Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Customizing Provinces
Edit src/data/rwandaData.js to modify:

Province information

Cultural facts

Attractions

Quest questions and answers

Styling
Global styles in App.vue

Component-specific styles use scoped CSS

Uses CSS variables for theming

🤝 Contributing
Contributions are what make the open-source community amazing! Any contributions you make are greatly appreciated.

Ways to Contribute
🐛 Report bugs

💡 Suggest new features

📝 Improve documentation

🌐 Add translations

🎨 Enhance UI/UX

🗺️ Add more locations or quests

Development Guidelines
Follow Vue.js style guide

Use composition API with <script setup>

Keep components focused and reusable

Test on multiple screen sizes

Maintain accessibility standards

📄 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgments
Data Sources: Rwanda Development Board, Visit Rwanda

Icons: Font Awesome

Maps: OpenStreetMap contributors

Fonts: Google Fonts (Poppins, Plus Jakarta Sans)

Inspiration: Rwanda's rich cultural heritage and natural beauty

📞 Contact
Project Link: https://github.com/witfab-dev/rwanda-explorer-game

<p align="center"> Made with ❤️ for Rwanda - Land of a Thousand Hills </p><p align="center"> <img src="https://img.shields.io/badge/Made%20with-Vue.js-42b883?style=for-the-badge&logo=vue.js" alt="Made with Vue.js"> </p> ```
Additional Files
.gitignore
text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Dependencies
node_modules
.pnp
.pnp.js

# Build outputs
dist
dist-ssr
*.local

# Editor directories
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment files
.env
.env.local
.env.*.local

# OS files
.DS_Store
Thumbs.db
LICENSE (MIT)
text
MIT License

Copyright (c) 2024 Rwanda Explorer Game

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
