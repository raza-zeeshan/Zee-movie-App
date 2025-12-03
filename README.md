# 🎬 Zee-Movie App

A modern, feature-rich movie management application built with React and Vite. Browse, search, filter, and manage a comprehensive collection of movies with an intuitive user interface.

## ✨ Features

- **Movie Search**: Search movies by title in real-time
- **Genre Filtering**: Filter movies by multiple genres simultaneously
- **CRUD Operations**: Add, edit, and delete movies from your collection
- **Pagination**: Browse through large movie datasets with smooth pagination
- **Local Storage**: Persistent data storage using browser's localStorage
- **Responsive Design**: Mobile-friendly interface built with Bootstrap 5
- **Loading States**: User-friendly loading indicators
- **API Integration**: Fetch movie data from external APIs using Axios

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **Styling**: Bootstrap 5.3
- **HTTP Client**: Axios 1.13
- **Code Quality**: ESLint 9.39
- **State Management**: React Hooks (useState, useEffect, useMemo)

## 📋 Project Structure

```
movie-app/
├── src/
│   ├── components/
│   │   ├── MovieList.jsx      # Displays list of movies
│   │   ├── MovieModal.jsx     # Modal for adding/editing movies
│   │   └── Footer.jsx         # Footer component
│   ├── App.jsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json               # Project dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
└── index.html                 # HTML entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raza-zeeshan/Zee-movie-App.git
   cd Zee-movie-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://your-movie-api-url.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173` (or the next available port)

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎯 How to Use

1. **Search Movies**: Use the search box to find movies by title
2. **Filter by Genre**: Check/uncheck genres to filter movies
3. **Add Movie**: Click "Add New Movie" button to add a movie to your collection
4. **Edit Movie**: Click the edit button on any movie card to modify its details
5. **Delete Movie**: Click the delete button to remove a movie from your collection
6. **Pagination**: Navigate through pages using the pagination controls

## 💾 Data Persistence

The app automatically stores movie data and genres in the browser's localStorage. When you close and reopen the app, your movies will still be there. The initial movie data is fetched from the configured API and cached locally for faster access.

## 🔧 Configuration

### API Endpoint

Update the `VITE_API_URL` environment variable to point to your movie API:

```javascript
// In App.jsx
const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
```

Currently, the app fetches a subset of movies (indices 30000-36300) from the API. Modify the slice range in `App.jsx` to fetch different data:

```javascript
const data = response.data.slice(30000, 36300); // Adjust as needed
```

## 🎨 Customization

### Styling

- Global styles: `src/index.css`
- App-specific styles: `src/App.css`
- Bootstrap utility classes are used throughout the app

### Colors & Theme

The app uses a custom color scheme:
- Primary: Dark navigation bar
- Secondary: Blue-tinted background (#3c6187d0)
- Accent: Bootstrap warning and success colors

## 🐛 Troubleshooting

**Movies not loading?**
- Check if the API endpoint is correctly set in `.env`
- Open browser developer tools and check the Network tab
- Verify the API is returning valid JSON data

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild the project: `npm run build && npm run preview`

**Port already in use?**
- Vite will automatically use the next available port
- Or manually specify: `npm run dev -- --port 3000`

## 📝 Component Details

### App.jsx
Main component managing:
- Movie state and pagination
- Search and genre filtering
- Modal state for add/edit operations
- LocalStorage synchronization

### MovieList.jsx
Displays movies in a grid or list format with action buttons

### MovieModal.jsx
Modal dialog for creating and editing movie entries

### Footer.jsx
Application footer with additional information

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` directory.

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The `dist` folder can be deployed to:
- GitHub Pages
- Netlify
- AWS S3
- Any static hosting service

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Zeeshan Raza**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/raza-zeeshan/Zee-movie-App/issues).

## 💬 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by Zeeshan Raza**
