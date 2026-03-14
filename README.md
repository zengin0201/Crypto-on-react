# 💎 CryptoFlow: Advanced React Market Explorer

A modern, high-performance cryptocurrency tracking dashboard built with React. CryptoFlow provides a real-time window into the blockchain market, featuring advanced sorting, filtering, and a persistent "Favorites" system.


## 🚀 Professional Features

* **Real-Time Data Streaming:** Seamlessly integrates with the **CoinGecko API** to monitor the top 50 global assets.
* **Advanced State Management:** Utilizes React `useState` and `useEffect` hooks to handle complex application states, including loading cycles and data synchronization.
* **Intelligent Sorting Engine:** Custom multi-criteria sorting allows users to organize assets by Price, Name, or 24h Percentage Change in both ascending and descending orders.
* **Persistent Watchlist:** Integrated a "Favorites" system using `localStorage` to ensure user preferences are preserved across browser sessions.
* **Responsive Component Architecture:** Fully modularized UI with reusable components (`CoinCard`), ensuring high maintainability and code readability.
* **Dynamic UX:** Features a "Live Market" pulse indicator and conditional CSS styling for market trends (green for "Up", red for "Down").

## 🛠️ Tech Stack

* **Core:** React 18
* **Language:** JavaScript (ES6+)
* **State & Lifecycle:** Hooks (`useState`, `useEffect`)
* **Data Fetching:** Fetch API with Asynchronous logic
* **Styling:** Modern CSS3 with Custom Properties (Variables) and Flexbox/Grid
* **Build Tool:** Vite

## 🧠 Engineering Highlights

### ⚡ Efficient Filtering Logic
Instead of re-fetching data on every keystroke, the application performs filtering on an optimized local state. This reduces API overhead and provides an instantaneous UI response for the user.

### 🗂️ Logic Separation
The project follows a clean architectural pattern by separating the layout and business logic:
* `App.jsx`: Manages global state, API orchestration, and sorting logic.
* `CoinCard.jsx`: A "pure" presentational component focused on rendering data and handling user interactions via props.

### 💾 Data Persistence
Implemented a robust initialization check for `localStorage` to handle the transition between a fresh visit and a returning user without breaking the React state cycle.



