# Grandma (In German ="Oma") Tetris 80

A custom, retro-style Tetris game I programmed as a surprise for my grandma's 80th birthday! 

It plays just like the classic arcade game, but the blocks are made of custom pixel art: My grandma, my grandpa, me (with a split mustache and beard), a big golden "80", and some North Sea themes like crabs, seagulls, and fish sandwiches. It's fully optimized for tablets and phones, making it perfect for the family birthday party. Including Scoreboard with names!

**Play it live:** [Granny Tetris :)](https://tetris.matteskraus.de)

## Features

* **Custom Pixel Art:** Unique Tetris blocks featuring family members and fun themes.
* **Touch & Keyboard Controls:** Playable on PC (arrow keys) or on mobile/tablets (on-screen buttons with soft-drop support).
* **Local Leaderboard:** Features a built-in top 10 high-score system (with Gold, Silver, and Bronze rankings) that automatically saves scores to a local JSON file.
* **PWA-Ready:** Can be installed on iPads or Android tablets as a real full-screen app ("Add to Home Screen") complete with a custom app icon!

## How to run it locally

Want to run this game on your own machine or server? It's super simple. The game doesn't require a complex database; everything runs via Node.js and simple text files.

### 1. Prerequisites
Make sure you have **Node.js** installed on your system.

### 2. Install Dependencies
Clone the repository, navigate into the folder, and install the required web framework (`express`):

```bash
git clone <your-repo-url>
cd oma_80er
npm install express
```

### 3. Start the game
Run the game using node
```bash
node server.js
```

The game is now running locally! Open your browser and go to: http://localhost:3002

Made with love for the best grandma!
