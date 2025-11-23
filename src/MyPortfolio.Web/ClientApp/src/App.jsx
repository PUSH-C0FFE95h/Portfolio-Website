import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center gap-8 mb-8">
            <a 
              href="https://vite.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <img 
                src={viteLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_2em_#646cffaa]" 
                alt="Vite logo" 
              />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <img 
                src={reactLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow" 
                alt="React logo" 
              />
            </a>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Vite + React
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Mit Tailwind CSS 🎨
          </p>
        </div>

        {/* Card Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <div className="text-center">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-6"
            >
              <span className="relative z-10">Count is {count}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <p className="text-gray-300 mb-4">
              Edit <code className="bg-gray-800/50 px-3 py-1 rounded-lg text-blue-400 font-mono">src/App.jsx</code> and save to test HMR
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                ⚡ Vite
              </span>
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                ⚛️ React
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                🎨 Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App

