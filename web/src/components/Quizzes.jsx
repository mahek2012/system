import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap, Target, Brain, Timer, Trophy, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Award,
    HelpCircle, ChevronRight, ChevronLeft, PlayCircle, BarChart3, Sparkles, Search, Filter,
    MoreHorizontal, Clock, TrendingUp, Users, Lightbulb, AlertCircle, RefreshCw, Code2, Play
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

const mockQuestions = {
    "Data Structures Crash Course": [
        {
            question: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
            codeSnippet: null,
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            correctOption: 2,
            hint: "Think about how the search space is divided at each step.",
            explanation: "In a balanced BST, every comparison eliminates half of the remaining nodes, leading to a logarithmic time complexity O(log n)."
        },
        {
            question: "Which data structure operates on a Last In, First Out (LIFO) principle?",
            codeSnippet: null,
            options: ["Queue", "Tree", "Stack", "Linked List"],
            correctOption: 2,
            hint: "Think of a pile of plates.",
            explanation: "A Stack follows the LIFO principle, meaning the last element added is the first one to be removed."
        },
        {
            question: "Which Array method sorts the elements in place entirely returning the reference?",
            codeSnippet: null,
            options: ["splice()", "slice()", "sort()", "concat()"],
            correctOption: 2,
            hint: "It manipulates the original array arrangement.",
            explanation: "The sort method mutates the native array grouping without cloning it."
        },
        {
            question: "How does a Hash Map handle collisions natively?",
            codeSnippet: null,
            options: ["Chaining or Probing", "Recursion", "Skipping", "Deleting older items"],
            correctOption: 0,
            hint: "It either creates a linked list or skips ahead.",
            explanation: "Hash maps handle index collisions using Open Addressing (Probing) or Separate Chaining (Linked Lists)."
        },
    ],
    "React State Management": [
        {
            question: "Which hook should be used to perform side effects in a React functional component?",
            codeSnippet: `function MyComponent() {\n  // side effect here\n  return <div>Hello</div>\n}`,
            options: ["useState", "useMemo", "useEffect", "useContext"],
            correctOption: 2,
            hint: "It is often used for data fetching, subscriptions, or manually changing the DOM.",
            explanation: "The useEffect hook lets you perform side effects in function components by combining the capabilities of componentDidMount, componentDidUpdate, and componentWillUnmount."
        },
        {
            question: "In React, what property must every listed item have to help React identify which items have changed?",
            codeSnippet: `<ul>\n  {items.map(item => <li ___={item.id}>{item.name}</li>)}\n</ul>`,
            options: ["id", "key", "name", "index"],
            correctOption: 1,
            hint: "It's a special string attribute you need to include when creating lists of elements.",
            explanation: "Keys help React identify which items have changed, are added, or are removed, optimizing the rendering process."
        },
        {
            question: "Which React hook is used to access the global state without prop passing?",
            codeSnippet: `const theme = ___(ThemeContext);`,
            options: ["useState", "useReducer", "useContext", "useCallback"],
            correctOption: 2,
            hint: "It consumes a Context object.",
            explanation: "useContext accepts a context object and returns the current context value, eliminating the need to pass props down manually."
        },
        {
            question: "Why would you use useMemo?",
            codeSnippet: null,
            options: ["To store state values", "To handle API calls", "To memoize expensive calculations", "To manage global state"],
            correctOption: 2,
            hint: "It prevents recalculating things unnessarily.",
            explanation: "useMemo caches the result of a calculation between renders, meaning it only runs when its dependencies change."
        },
    ],
    "Python Basics": [
        {
            question: "In Python, which built-in function is used to get the length of a list?",
            codeSnippet: `my_list = [1, 2, 3, 4]\n# length = ?`,
            options: ["size()", "length()", "len()", "count()"],
            correctOption: 2,
            hint: "It's a three-letter abbreviation of 'length'.",
            explanation: "The len() function returns the number of items in an object, such as a list, string, or dictionary."
        },
        {
            question: "In Python, how do you define a function?",
            codeSnippet: null,
            options: ["function myFunc()", "def myFunc():", "void myFunc()", "fn myFunc()"],
            correctOption: 1,
            hint: "It uses a three letter keyword.",
            explanation: "In Python, functions are defined using the 'def' keyword followed by the function name, parentheses, and a colon."
        },
        {
            question: "Which of the following is a mutable data type in Python?",
            codeSnippet: null,
            options: ["Tuple", "String", "Integer", "Dictionary"],
            correctOption: 3,
            hint: "You can change its keys and values after creation.",
            explanation: "Dictionaries, like lists, are mutable. Tuples, strings, and integers are immutable."
        },
        {
            question: "Which statement properly creates a simple tuple in Python?",
            codeSnippet: `my_tuple = ___`,
            options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
            correctOption: 2,
            hint: "Tuples use parentheses.",
            explanation: "In Python, tuples are created by placing elements inside parentheses `()`, separated by commas."
        },
    ],
    "Machine Learning Math": [
        {
            question: "What is the primary purpose of a Loss Function in Machine Learning?",
            codeSnippet: null,
            options: ["To measure the accuracy of a model", "To quantify how far the models predictions are from actual data", "To increase the learning rate", "To split dataset into train/test"],
            correctOption: 1,
            hint: "It guides the optimizer by showing the 'error'.",
            explanation: "Loss functions are used to measure the discrepancy between the prediction of the model and the actual label."
        },
        {
            question: "Which optimization algorithm is most commonly used for minimizing the cost function in neural networks?",
            codeSnippet: null,
            options: ["Gradient Descent", "Linear Search", "Bubble Sort", "K-Means"],
            correctOption: 0,
            hint: "It involves taking steps proportional to the negative of the gradient.",
            explanation: "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
        },
        {
            question: "What does the dot product of two vectors represent geometrically if they are normalized?",
            codeSnippet: null,
            options: ["The distance between them", "The cosine of the angle between them", "Their sum", "Cross product"],
            correctOption: 1,
            hint: "It's a trig function heavily used in cosine similarity.",
            explanation: "For normalized vectors, the dot product directly equals the cosine of the angle between the two vectors."
        },
        {
            question: "What is an Eigenvector?",
            codeSnippet: null,
            options: ["A vector that points to zero", "A vector that only scales and does not rotate under linear transformation", "A vector with a magnitude of 1", "A completely random scalar value"],
            correctOption: 1,
            hint: "Think about transformations that preserve direction.",
            explanation: "An eigenvector associated with a linear transformation is a non-zero vector that changes at most by a scalar factor when that linear transformation is applied."
        },
    ],
    "Advanced Recursion & Backtracking": [
        {
            question: "Which of the following is essential to prevent a recursive function from running infinitely?",
            codeSnippet: null,
            options: ["A while loop wrapper", "A defined base case", "A large memory limit setting", "Local state variables"],
            correctOption: 1,
            hint: "It acts as the strict stopping condition.",
            explanation: "Every recursive function must have a base case that returns a value without making any subsequent recursive calls to prevent infinite execution and stack overflows."
        },
        {
            question: "In the backtracking algorithm paradigm, what mechanism is heavily utilized to revert bad paths?",
            codeSnippet: null,
            options: ["The Call Stack", "Queues", "Binary Trees", "Hash Maps"],
            correctOption: 0,
            hint: "Returning natively unpops it.",
            explanation: "Backtracking inherently uses Recursion (and under the hood, the system Call Stack) to explore potential outcomes and automatically 'unwind' variable states when a path fails."
        },
        {
            question: "What is the primary optimization technique applied to naive recursive solutions (like Fibonacci) to prevent redundant calculations?",
            codeSnippet: null,
            options: ["Multithreading", "Memoization", "Type Casting", "Stringification"],
            correctOption: 1,
            hint: "It caches prior answers.",
            explanation: "Memoization is a specific form of caching where the results of expensive, repeated recursive function calls are saved so they don't have to be computed twice."
        },
        {
            question: "If a function performs heavily nested recursion calling itself multiple times, what runtime error is it at highest risk of hitting?",
            codeSnippet: null,
            options: ["Timeout Exception", "Out of Memory Exception", "Stack Overflow Error", "Syntax Error"],
            correctOption: 2,
            hint: "It literally overflows a specific internal memory limit.",
            explanation: "Because each recursive call pushes a new execution frame onto the memory stack, excessive calling (or missing a base case) will rapidly exhaust stack memory throwing a Stack Overflow!"
        }
    ]
}

const recommendedQuiz = {
    id: 'r1',
    title: "Advanced Recursion & Backtracking",
    topic: "Algorithms",
    difficulty: "Advanced",
    timeLimit: "30 mins",
    matchPercent: 94,
    weakSkill: "Recursion"
}

const availableQuizzesData = [
    { id: 'q1', title: "Data Structures Crash Course", topic: "Computer Science", difficulty: "Intermediate", questions: 15, timeLimit: "20 min", attemptsLeft: 2, color: 'blue' },
    { id: 'q2', title: "React State Management", topic: "Frontend", difficulty: "Advanced", questions: 20, timeLimit: "30 min", attemptsLeft: 1, color: 'indigo', isRecommended: true },
    { id: 'q3', title: "Python Basics", topic: "Python", difficulty: "Beginner", questions: 10, timeLimit: "10 min", attemptsLeft: 3, color: 'green' },
    { id: 'q4', title: "Machine Learning Math", topic: "Data Science", difficulty: "Advanced", questions: 12, timeLimit: "45 min", attemptsLeft: 1, color: 'purple', isRecommended: true },
]

const pastAttemptsData = [
    { id: 'p1', title: "Graph Algorithms", score: 85, timeTaken: "18m 20s", improvement: "+5%", icon: 'algorithms' },
    { id: 'p2', title: "CSS Grid & Flexbox", score: 60, timeTaken: "25m 10s", improvement: "-2%", icon: 'css' },
]

export default function Quizzes() {
    const { darkMode } = useLMSStore()
    const [view, setView] = useState('list') // 'list', 'taking', 'quiz-active', 'result', 'review'
    const [isAdaptiveMode, setIsAdaptiveMode] = useState(true)
    const [activeQuiz, setActiveQuiz] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterDifficulty, setFilterDifficulty] = useState('All')
    const [isJoinedGroup, setIsJoinedGroup] = useState(false)

    const filteredQuizzes = availableQuizzesData.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.topic.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (filterDifficulty !== 'All') {
            if (filterDifficulty === 'Recommended') {
                matchesFilter = quiz.isRecommended === true;
            } else {
                matchesFilter = quiz.difficulty === filterDifficulty;
            }
        }

        return matchesSearch && matchesFilter;
    });

    const [quizState, setQuizState] = useState({
        currentQuestionIndex: 0,
        selectedOptions: {}, // Tracks answered options for Normal Mode mapping
        isAnswerChecked: false, // Used for Adaptive instant checks
        score: 0,
        showHint: false,
        timeRemaining: isAdaptiveMode ? 0 : 1800, // Adaptive runs up count, Normal runs down from 30 mins
        questions: [], // The set of questions for this session
        masteryScore: 0, // Adaptive spec
        difficultyLevel: 'medium' // Adaptive start
    })

    // Helper to shuffle questions
    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5)

    const startQuiz = (quizTitle) => {
        setActiveQuiz({ title: quizTitle })

        // Grab specific questions mapped to this quiz title, fallback to python mock if not found
        const specificQuestionsRow = mockQuestions[quizTitle] || mockQuestions["Python Basics"]

        let initialQuestions = []
        if (isAdaptiveMode) {
            // Adaptive mode will load all questions and we process iteratively
            initialQuestions = shuffleArray(specificQuestionsRow)
        } else {
            // Normal mode grabs as many as possible
            initialQuestions = shuffleArray(specificQuestionsRow)
        }

        setQuizState({
            currentQuestionIndex: 0,
            selectedOptions: {},
            isAnswerChecked: false,
            score: 0,
            showHint: false,
            timeRemaining: isAdaptiveMode ? 0 : 1800,
            questions: initialQuestions,
            masteryScore: 50, // start Developing
            difficultyLevel: 'medium'
        })
        setIsJoinedGroup(false)
        setView('taking')
    }

    const handleSelectOptionNormal = (idx) => {
        setQuizState(prev => ({
            ...prev,
            selectedOptions: {
                ...prev.selectedOptions,
                [prev.currentQuestionIndex]: idx
            }
        }))
    }

    const handleCheckAnswerAdaptive = () => {
        setQuizState(prev => ({ ...prev, isAnswerChecked: true }))
    }

    const handleNextQuestionAdaptive = () => {
        const { currentQuestionIndex, selectedOptions, questions, masteryScore } = quizState;
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOptions[currentQuestionIndex] === currentQuestion.correctOption;

        // Simulating Adaptive mastery logic:
        const masteryChange = isCorrect ? 5 : -3;
        const newMastery = Math.min(100, Math.max(0, masteryScore + masteryChange));

        if (currentQuestionIndex + 1 < questions.length && currentQuestionIndex < 15) { // Stop adaptive at 15 for demo
            setQuizState(prev => ({
                ...prev,
                currentQuestionIndex: prev.currentQuestionIndex + 1,
                isAnswerChecked: false,
                showHint: false,
                masteryScore: newMastery,
                difficultyLevel: isCorrect ? 'harder' : 'easier',
                score: isCorrect ? prev.score + 1 : prev.score
            }))
        } else {
            setQuizState(prev => ({
                ...prev,
                masteryScore: newMastery,
                score: isCorrect ? prev.score + 1 : prev.score
            }))
            setView('result')
        }
    }

    const handleNextNormal = () => {
        if (quizState.currentQuestionIndex + 1 < quizState.questions.length) {
            setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }))
        }
    }

    const handlePrevNormal = () => {
        if (quizState.currentQuestionIndex > 0) {
            setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }))
        }
    }

    const handleSubmitNormal = () => {
        // Calculate score
        let newScore = 0;
        quizState.questions.forEach((q, idx) => {
            if (quizState.selectedOptions[idx] === q.correctOption) {
                newScore += 1;
            }
        });
        setQuizState(prev => ({ ...prev, score: newScore }))
        setView('result')
    }

    const toggleHint = () => {
        setQuizState(prev => ({ ...prev, showHint: !prev.showHint }))
    }

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    return (
        <div className={`p-6 lg:p-10 transition-colors duration-500 min-h-screen ${darkMode ? 'bg-[#121820]' : 'bg-gray-50'}`}>
            <AnimatePresence mode="wait">
                {view === 'list' && (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-7xl mx-auto space-y-12"
                    >
                        {/* 1. Header Area Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200/20">
                            <div className="space-y-3">
                                <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Adaptive Quizzes
                                </h1>
                                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Test your skills with AI-powered assessments. <Sparkles className="inline text-yellow-500 w-5 h-5 ml-1" />
                                </p>
                            </div>

                            {/* Adaptive Mode Toggle */}
                            <div className={`flex items-center gap-3 p-2 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                                <button
                                    onClick={() => setIsAdaptiveMode(false)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isAdaptiveMode ? 'bg-blue-500 text-white shadow-md' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}
                                >
                                    Normal Mode
                                </button>
                                <button
                                    onClick={() => setIsAdaptiveMode(true)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isAdaptiveMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}
                                >
                                    <Brain size={16} /> Adaptive Mode
                                </button>
                            </div>
                        </div>

                        {/* Filters & Search */}
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by topic (e.g., Python, React)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none font-medium transition-all focus:ring-4 focus:ring-blue-500/20 ${darkMode ? 'bg-[#1c232d] border-white/5 text-white placeholder:text-gray-500 focus:border-blue-500/50' : 'bg-white border-gray-100 text-gray-900 focus:border-blue-500'}`}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                                {['All', 'Beginner', 'Intermediate', 'Advanced', 'Recommended'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setFilterDifficulty(filter)}
                                        className={`whitespace-nowrap px-6 py-4 rounded-2xl border-2 text-sm font-bold transition-all ${filterDifficulty === filter
                                            ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                                            : (darkMode ? 'border-white/5 bg-[#1c232d] text-gray-400 hover:border-white/10' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200')
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Recommended Quiz (AI Section) */}
                        <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl -z-10 rounded-[3rem]`} />
                            <div className={`p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl ${darkMode ? 'bg-gradient-to-br from-[#1c232d]/90 to-[#121820]/90 border-white/10' : 'bg-gradient-to-br from-white to-blue-50/50 border-blue-100 shadow-blue-500/5'}`}>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-500/20 p-2 rounded-xl">
                                            <Sparkles className="text-purple-500 w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-black tracking-widest uppercase text-purple-500">AI Recommended</span>
                                    </div>
                                    <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Based on your weak skill: <span className="underline decoration-purple-500 decoration-4 underline-offset-4">{recommendedQuiz.weakSkill}</span>
                                    </h2>
                                    <p className={`text-lg font-medium flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {recommendedQuiz.title} &bull; <Target size={18} className="text-blue-500" /> {recommendedQuiz.matchPercent}% Match
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${darkMode ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                            <Timer size={14} /> {recommendedQuiz.timeLimit}
                                        </div>
                                        <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${darkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                                            <Brain size={14} /> {recommendedQuiz.difficulty}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => startQuiz(recommendedQuiz.title)}
                                        className="group relative px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/25 transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative z-10">Start Adaptive Quiz</span>
                                        <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3. Available Quizzes Section */}
                        <div className="space-y-6">
                            <h3 className={`text-2xl font-black flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <Brain className="text-blue-500" /> Available Quizzes
                            </h3>
                            {filteredQuizzes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredQuizzes.map((quiz) => (
                                        <motion.div
                                            key={quiz.id}
                                            whileHover={{ y: -5 }}
                                            className={`p-6 md:p-8 rounded-[2rem] border transition-all flex flex-col ${darkMode ? 'bg-[#1c232d] border-white/5 hover:border-blue-500/30' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-xl shadow-sm'}`}
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex flex-col gap-2 items-start">
                                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                        {quiz.topic}
                                                    </span>
                                                    {quiz.isRecommended && (
                                                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-500 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                                                            <Sparkles size={12} /> Recommended
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                                                    {quiz.difficulty}
                                                </div>
                                            </div>

                                            <h4 className={`text-xl font-bold mb-4 flex-1 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {quiz.title}
                                            </h4>

                                            <div className={`grid grid-cols-2 gap-4 mb-8 text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <div className="flex items-center gap-2"><HelpCircle size={16} className="text-blue-500" /> {quiz.questions} Qs</div>
                                                <div className="flex items-center gap-2"><Timer size={16} className="text-blue-500" /> {quiz.timeLimit}</div>
                                                <div className="col-span-2 flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-xl w-fit">
                                                    <RefreshCw size={14} /> {quiz.attemptsLeft} Attempts left
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => startQuiz(quiz.title)}
                                                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${darkMode ? 'bg-white/5 text-white hover:bg-blue-500' : 'bg-gray-50 text-gray-900 hover:bg-blue-500 hover:text-white'}`}
                                            >
                                                <PlayCircle size={18} /> Start Quiz
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`text-center py-10 rounded-[2rem] border-2 border-dashed ${darkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-bold">No quizzes found for "{searchQuery}" or selected category.</p>
                                </div>
                            )}
                        </div>

                        {/* 4. Past Attempts Section */}
                        <div className="space-y-6 pt-4">
                            <h3 className={`text-2xl font-black flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <Clock className="text-gray-400" /> Past Attempts
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pastAttemptsData.map((attempt) => (
                                    <div key={attempt.id} className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all ${darkMode ? 'bg-[#1c232d] border-white/5 hover:bg-white/5' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20`}>
                                            <TrendingUp className="text-blue-500" />
                                        </div>
                                        <div className="flex-1 w-full space-y-2">
                                            <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{attempt.title}</h4>
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500">
                                                <span className="flex items-center gap-1.5"><Timer size={14} /> {attempt.timeTaken}</span>
                                                <span className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                                                    {attempt.improvement} Improvement
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex sm:flex-col items-center sm:items-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                                            <div className={`text-2xl font-black ${attempt.score >= 80 ? 'text-green-500' : 'text-orange-500'}`}>
                                                {attempt.score}%
                                            </div>
                                            <button onClick={() => startQuiz(attempt.title)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${darkMode ? 'border-white/10 text-gray-300 hover:bg-white/10' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                Retake
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'taking' && (
                    <motion.div
                        key="taking"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-4xl mx-auto py-32"
                    >
                        <div className="text-center space-y-10">
                            <div className="w-28 h-28 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500 relative">
                                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-ping" />
                                <Brain size={56} className="animate-pulse" />
                            </div>
                            <div className="space-y-4">
                                <h2 className={`text-5xl md:text-6xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {activeQuiz?.title || 'Preparing Test...'}
                                </h2>
                                <p className="text-lg text-blue-500 font-bold flex items-center justify-center gap-2">
                                    <Sparkles size={20} /> Initializing AI Proctor and Adaptive Engine
                                </p>
                            </div>
                            <div className="w-full h-3 bg-gray-500/10 rounded-full max-w-md mx-auto overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    onAnimationComplete={() => setView('quiz-active')}
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'quiz-active' && (() => {
                    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
                    if (!currentQuestion) return null; // Safe guard

                    // Selected option logic depends on mode
                    const isSelectedIdx = quizState.selectedOptions[quizState.currentQuestionIndex] ?? null;

                    return (
                        <motion.div
                            key="quiz-active"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl mx-auto py-8"
                        >
                            {/* Quiz Header */}
                            <div className="flex items-center justify-between mb-8 px-4">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setView('list')} className={`p-3 rounded-2xl border transition-colors ${darkMode ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div>
                                        <div className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Question {quizState.currentQuestionIndex + 1} of {isAdaptiveMode ? '???' : quizState.questions.length}</div>
                                        <div className={`font-black flex items-center gap-2 ${isAdaptiveMode ? (darkMode ? 'text-blue-400' : 'text-blue-600') : (darkMode ? 'text-purple-400' : 'text-purple-600')}`}>
                                            {isAdaptiveMode ? <Zap size={16} /> : <Target size={16} />}
                                            {isAdaptiveMode ? 'Adaptive Mode' : 'Normal Mode'}
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-black font-mono text-xl ${quizState.timeRemaining < 60 && !isAdaptiveMode ? 'border-red-500/50 bg-red-500/10 text-red-500' : (darkMode ? 'bg-[#1c232d] border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900')}`}>
                                    {isAdaptiveMode ? <AlertCircle size={20} className="text-blue-500" /> : <Timer size={24} />}
                                    {isAdaptiveMode ? `Strength: ${quizState.masteryScore}%` : formatTime(quizState.timeRemaining)}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-500/10 rounded-full mb-10 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${isAdaptiveMode ? 'bg-blue-500' : 'bg-purple-500'}`}
                                    style={{ width: `${((quizState.currentQuestionIndex) / quizState.questions.length) * 100}%` }}
                                />
                            </div>

                            <div className={`p-8 md:p-12 rounded-[2.5rem] border shadow-2xl transition-all duration-500 ${darkMode ? (isAdaptiveMode ? 'bg-[#1c232d] border-blue-500/20 shadow-blue-500/10' : 'bg-[#1c232d] border-purple-500/20 shadow-purple-500/10') : 'bg-white border-gray-100 shadow-xl'}`}>
                                <h3 className={`text-2xl md:text-3xl font-bold leading-relaxed mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {currentQuestion.question}
                                </h3>

                                {/* Code Snippet */}
                                {currentQuestion.codeSnippet && (
                                    <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] group relative">
                                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                                            <Code2 size={16} className="text-gray-400" />
                                            <span className="text-xs font-mono font-bold text-gray-400 uppercase">Snippet</span>
                                        </div>
                                        <pre className="p-6 overflow-x-auto text-sm font-mono text-green-400 leading-relaxed">
                                            <code>{currentQuestion.codeSnippet}</code>
                                        </pre>
                                    </div>
                                )}

                                {/* Hint System */}
                                <div className="mb-8">
                                    <button
                                        onClick={toggleHint}
                                        className={`flex items-center gap-2 text-sm font-bold transition-all ${darkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-orange-500 hover:text-orange-600'}`}
                                    >
                                        <Lightbulb size={18} /> {quizState.showHint ? 'Hide Hint' : 'Need a hint?'}
                                    </button>
                                    <AnimatePresence>
                                        {quizState.showHint && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`mt-4 p-4 rounded-xl text-sm font-medium border-l-4 border-yellow-500 ${darkMode ? 'bg-yellow-500/10 text-yellow-200/80' : 'bg-yellow-50 text-orange-800'}`}
                                            >
                                                {currentQuestion.hint}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Options */}
                                <div className="space-y-4 mb-10">
                                    {currentQuestion.options.map((option, idx) => {
                                        const isSelected = isSelectedIdx === idx;
                                        const isCorrectOption = idx === currentQuestion.correctOption;

                                        let optionClass = `w-full text-left p-6 rounded-2xl border-2 transition-all flex justify-between items-center group cursor-pointer active:scale-[0.99] `;

                                        if (isAdaptiveMode && quizState.isAnswerChecked) {
                                            // Adaptive Mode visually shows Instant Feedback
                                            if (isCorrectOption) {
                                                optionClass += darkMode ? 'bg-green-500/20 border-green-500/50 text-white shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-green-50 border-green-500 text-green-900';
                                            } else if (isSelected) {
                                                optionClass += darkMode ? 'bg-red-500/20 border-red-500/50 text-white' : 'bg-red-50 border-red-500 text-red-900';
                                            } else {
                                                optionClass += darkMode ? 'border-white/5 text-gray-500 cursor-default opacity-50' : 'border-gray-100 text-gray-400 cursor-default opacity-50';
                                            }
                                        } else {
                                            // Normal Mode or pre-check Adaptive merely shows 'Selected'
                                            if (isSelected) {
                                                optionClass += isAdaptiveMode
                                                    ? (darkMode ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-blue-50 border-blue-500 text-blue-900 shadow-lg')
                                                    : (darkMode ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'bg-purple-50 border-purple-500 text-purple-900 shadow-lg');
                                            } else {
                                                optionClass += darkMode ? 'border-white/5 text-gray-300 hover:border-white/20 hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50';
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isAdaptiveMode && quizState.isAnswerChecked}
                                                onClick={() => handleSelectOptionNormal(idx)}
                                                className={optionClass}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${isSelected && !(isAdaptiveMode && quizState.isAnswerChecked) ? (isAdaptiveMode ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white') : (darkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500')} ${isAdaptiveMode && quizState.isAnswerChecked && isCorrectOption && 'bg-green-500 text-white'} ${isAdaptiveMode && quizState.isAnswerChecked && isSelected && !isCorrectOption && 'bg-red-500 text-white'}`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="text-lg font-medium">{option}</span>
                                                </div>
                                                {isAdaptiveMode && quizState.isAnswerChecked && isCorrectOption && <CheckCircle2 className="text-green-500" size={28} />}
                                                {isAdaptiveMode && quizState.isAnswerChecked && !isCorrectOption && isSelected && <XCircle className="text-red-500" size={28} />}
                                                {(!isAdaptiveMode || !quizState.isAnswerChecked) && isSelected && <CheckCircle2 className={isAdaptiveMode ? "text-blue-500" : "text-purple-500"} size={28} />}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Explanation Area (Adaptive only) */}
                                <AnimatePresence>
                                    {isAdaptiveMode && quizState.isAnswerChecked && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mb-10 p-6 rounded-2xl border flex gap-4 ${darkMode ? 'bg-blue-900/10 border-blue-500/20 text-blue-100' : 'bg-blue-50 border-blue-100 text-blue-900'}`}
                                        >
                                            <div className="shrink-0 p-2 bg-blue-500/20 rounded-xl h-fit">
                                                <Brain size={24} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-2 flex items-center gap-2">AI Explanation <Sparkles size={16} className="text-yellow-500" /></h4>
                                                <p className="font-medium text-sm leading-relaxed opacity-90">{currentQuestion.explanation}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center pt-8 border-t border-gray-200/10">
                                    <div className={`text-sm font-bold flex gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {isAdaptiveMode ? 'Auto-adjusting difficulty based on performance...' : (
                                            <button
                                                onClick={handlePrevNormal}
                                                disabled={quizState.currentQuestionIndex === 0}
                                                className={`px-6 py-3 rounded-xl border flex items-center gap-2 transition-all ${quizState.currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95'}`}
                                            >
                                                <ChevronLeft size={18} /> Previous
                                            </button>
                                        )}
                                    </div>

                                    {isAdaptiveMode ? (
                                        // ADAPTIVE CONTROLS
                                        !quizState.isAnswerChecked ? (
                                            <button
                                                onClick={handleCheckAnswerAdaptive}
                                                disabled={isSelectedIdx === null}
                                                className={`px-10 py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-xl ${isSelectedIdx !== null ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20' : (darkMode ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed')}`}
                                            >
                                                Check Answer
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNextQuestionAdaptive}
                                                className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 active:scale-95 group"
                                            >
                                                {quizState.currentQuestionIndex + 1 < quizState.questions.length ? 'Next Question' : 'View AI Analysis'}
                                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        )
                                    ) : (
                                        // NORMAL CONTROLS
                                        quizState.currentQuestionIndex + 1 < quizState.questions.length ? (
                                            <button
                                                onClick={handleNextNormal}
                                                className="px-10 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-purple-500/20 flex items-center gap-3 active:scale-95 group"
                                            >
                                                Next Question <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleSubmitNormal}
                                                className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-green-500/20 flex items-center gap-3 active:scale-95"
                                            >
                                                Submit Test <CheckCircle2 size={24} />
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })()}

                {view === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto py-12"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 relative ${isAdaptiveMode ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}
                            >
                                <div className={`absolute inset-0 rounded-full blur-xl ${isAdaptiveMode ? 'bg-blue-500/20' : 'bg-green-500/20'}`} />
                                <Trophy size={64} className="relative z-10" />
                            </motion.div>
                            <h2 className={`text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{isAdaptiveMode ? 'AI Assessment Complete!' : 'Test Submitted!'}</h2>
                            <p className={`text-xl font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isAdaptiveMode ? 'Here is your AI-generated skill mastery breakdown.' : 'Here is your final test overview.'}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {/* Score Card */}
                            <div className={`p-8 rounded-[2rem] border text-center flex flex-col justify-center ${darkMode ? 'bg-[#1c232d] border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
                                <h3 className={`text-lg font-bold mb-6 text-gray-500`}>{isAdaptiveMode ? 'Overall Mastery Score' : 'Final Grade Score'}</h3>
                                <div className="relative w-48 h-48 mx-auto -rotate-90">
                                    <svg className="w-full h-full">
                                        <circle cx="96" cy="96" r="80" stroke={darkMode ? '#334155' : '#e2e8f0'} strokeWidth="16" fill="transparent" />
                                        <motion.circle
                                            initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                                            animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - (isAdaptiveMode ? (quizState.masteryScore / 100) : (quizState.score / quizState.questions.length))) }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            cx="96" cy="96" r="80"
                                            stroke={isAdaptiveMode ? "#3b82f6" : "#22c55e"} strokeWidth="16" fill="transparent"
                                            strokeDasharray={`${2 * Math.PI * 80}`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center rotate-90`}>
                                        <span className={`text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {isAdaptiveMode ? `${quizState.masteryScore}%` : `${Math.round((quizState.score / quizState.questions.length) * 100)}%`}
                                        </span>
                                        <span className="text-sm font-bold text-gray-500">
                                            {isAdaptiveMode
                                                ? (quizState.masteryScore > 80 ? 'Advanced' : quizState.masteryScore > 50 ? 'Proficient' : 'Developing')
                                                : `${quizState.score}/${quizState.questions.length} Correct`
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Box depending on Mode */}
                            <div className={`p-8 rounded-[2rem] border lg:col-span-2 ${darkMode ? 'bg-[#1c232d] border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
                                {isAdaptiveMode ? (
                                    <>
                                        <h3 className={`text-2xl font-black mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            <Brain className="text-blue-500" /> Topic-wise AI Breakdown
                                        </h3>
                                        <div className="space-y-6">
                                            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                                                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2"><Target size={18} /> Weak Skill Detect: Recursion Logic</h4>
                                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    System reduced difficulty when you struggled on Time Complexity bounds. Focus required.
                                                </p>
                                            </div>
                                            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-green-500/5 border-green-500/10' : 'bg-green-50 border-green-100'}`}>
                                                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2"><TrendingUp size={18} /> Proficient Mastery Update</h4>
                                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Your JavaScript Fundamentals confidence score went up drastically. System considers you 'Advanced' here.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className={`text-2xl font-black mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            <Target className="text-purple-500" /> Basic Overview
                                        </h3>
                                        <div className="space-y-4">
                                            <div className={`flex justify-between p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                <span className="font-bold text-gray-500">Correct Answers:</span>
                                                <span className="font-black text-green-500">{quizState.score}</span>
                                            </div>
                                            <div className={`flex justify-between p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                <span className="font-bold text-gray-500">Wrong Answers:</span>
                                                <span className="font-black text-red-500">{quizState.questions.length - quizState.score}</span>
                                            </div>
                                            <div className={`flex justify-between p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                <span className="font-bold text-gray-500">Performance Grading:</span>
                                                <span className="font-black text-purple-500">{(quizState.score / quizState.questions.length) > 0.75 ? 'Pass' : 'Needs Review'}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>

                        {/* Next Steps */}
                        <div className={`p-8 rounded-[2rem] border mb-12 text-center bg-gradient-to-br ${isAdaptiveMode ? 'from-blue-600 to-purple-600 shadow-blue-500/20' : 'from-purple-600 to-pink-600 shadow-purple-500/20'} border-none shadow-2xl text-white`}>
                            <h3 className="text-2xl font-black mb-4">{isAdaptiveMode ? 'Recommended Next Step' : 'Feeling Unsure?'}</h3>
                            <p className="text-blue-100 font-medium mb-8 max-w-xl mx-auto">
                                {isAdaptiveMode ? 'Based on your AI analysis, we suggest reviewing the "Recursion" module due to weak logic execution.' : 'Take a moment to review the provided solutions or Retake the exam!'}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={() => isAdaptiveMode ? setView('list') : startQuiz(activeQuiz?.title || 'Data Structures Crash Course')}
                                    className={`px-8 py-4 bg-white rounded-xl font-bold transition-all shadow-lg active:scale-95 hover:bg-gray-50 ${isAdaptiveMode ? 'text-blue-600' : 'text-purple-600'}`}
                                >
                                    {isAdaptiveMode ? 'Review Recursion Module' : 'Retake Exam'}
                                </button>
                                {!isAdaptiveMode && (
                                    <button
                                        onClick={() => setView('review')}
                                        className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold transition-all hover:bg-white/30 backdrop-blur active:scale-95"
                                    >
                                        Review Solutions
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsJoinedGroup(true)}
                                    className={`px-8 py-4 rounded-xl font-bold transition-all backdrop-blur flex items-center gap-2 active:scale-95 ${isJoinedGroup ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-black/20 text-white hover:bg-black/30'}`}
                                >
                                    {isJoinedGroup ? <CheckCircle2 size={18} /> : <Users size={18} />}
                                    {isJoinedGroup ? 'Joined Group!' : 'Join Study Group'}
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setView('list')}
                                className={`px-8 py-4 rounded-xl font-bold transition-all active:scale-95 border ${darkMode ? 'bg-[#1c232d] border-white/10 text-white hover:bg-white/5' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === 'review' && (
                    <motion.div
                        key="review"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="max-w-4xl mx-auto space-y-8 pb-32"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={`text-3xl font-black flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <CheckCircle2 className="text-purple-500" /> Exam Review
                            </h2>
                            <button
                                onClick={() => setView('result')}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${darkMode ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                Back to Results
                            </button>
                        </div>

                        <div className="space-y-8">
                            {quizState.questions.map((q, idx) => {
                                const selectedOpt = quizState.selectedOptions[idx];
                                const isCorrect = selectedOpt === q.correctOption;
                                return (
                                    <div key={idx} className={`p-8 rounded-3xl border ${darkMode ? 'bg-[#1c232d] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <h3 className={`text-xl font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                <span className="text-gray-500 mr-2">{idx + 1}.</span>
                                                {q.question}
                                            </h3>
                                            {selectedOpt != null && (
                                                <div className={`shrink-0 p-2 rounded-xl border ${isCorrect ? (darkMode ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-green-50 border-green-200 text-green-600') : (darkMode ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-red-50 border-red-200 text-red-600')}`}>
                                                    {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                                </div>
                                            )}
                                        </div>

                                        {q.codeSnippet && (
                                            <div className="mb-6 rounded-xl overflow-hidden shadow-inner border border-gray-200/50 bg-[#0d1117] relative">
                                                <div className="absolute top-0 right-0 p-2 text-gray-500/50">
                                                    <Code2 size={20} />
                                                </div>
                                                <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto">
                                                    <code>{q.codeSnippet}</code>
                                                </pre>
                                            </div>
                                        )}

                                        <div className="space-y-3 mb-6">
                                            {q.options.map((opt, optIdx) => {
                                                const isThisCorrect = optIdx === q.correctOption;
                                                const isThisSelected = selectedOpt === optIdx;

                                                let optClass = `w-full text-left p-4 rounded-xl border flex items-center justify-between `;
                                                if (isThisCorrect) {
                                                    optClass += darkMode ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-green-50 border-green-200 text-green-700';
                                                } else if (isThisSelected && !isThisCorrect) {
                                                    optClass += darkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700';
                                                } else {
                                                    optClass += darkMode ? 'border-white/5 text-gray-400 opacity-50' : 'border-gray-100 text-gray-500 opacity-50';
                                                }

                                                return (
                                                    <div key={optIdx} className={optClass}>
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold opacity-50">{String.fromCharCode(65 + optIdx)}.</span>
                                                            <span className="font-medium">{opt}</span>
                                                        </div>
                                                        {isThisSelected && <span className="text-xs font-bold px-2 py-1 rounded bg-black/10 uppercase tracking-wider">Your Answer</span>}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className={`p-5 rounded-2xl flex gap-3 ${darkMode ? 'bg-blue-500/5 border border-blue-500/10 text-blue-200' : 'bg-blue-50 border border-blue-100 text-blue-800'}`}>
                                            <Brain size={20} className="shrink-0 text-blue-500 mt-0.5" />
                                            <div>
                                                <strong className="block mb-1 font-bold text-sm">Explanation</strong>
                                                <p className="text-sm font-medium leading-relaxed opacity-90">{q.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
