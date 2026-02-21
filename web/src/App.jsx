import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Courses from './components/Courses'
import Network from './components/Network'
import Quizzes from './components/Quizzes'
import CourseDetails from './components/CourseDetails'
import Profile from './components/Profile'
import { useLMSStore } from './store/useLMSStore'

function App() {
    const { darkMode, activePage } = useLMSStore()

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard />
            case 'courses':
                return <Courses />
            case 'network':
                return <Network />
            case 'quizzes':
                return <Quizzes />
            case 'course-details':
                return <CourseDetails />
            case 'profile':
                return <Profile />
            case 'home':
            default:
                return <Home />
        }
    }

    return (
        <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${darkMode ? 'bg-[#121820] text-white' : 'bg-white text-gray-900'
            }`}>
            <Navbar />
            <main className="flex-1 w-full">
                {renderContent()}
            </main>
            <Footer />
        </div>
    )
}

export default App
