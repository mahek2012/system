import React, { useState } from 'react'
import {
    Search,
    Filter,
    Monitor,
    Brain,
    Cpu,
    FileCode,
    Terminal,
    Globe,
    Lightbulb,
    Leaf,
    Star,
    Users,
    Clock,
    ChevronRight,
    ArrowRight,
    MonitorPlay,
    Layout,
    ArrowLeft,
    RefreshCw,
    Play,
    CheckCircle2,
    Sparkles,
    LineChart,
    BookOpen
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLMSStore } from '../store/useLMSStore'

const courses = [
    {
        id: 'c1',
        title: 'HTML & CSS Fundamentals',
        category: 'Web Development',
        author: 'Sarah Drasner',
        duration: '18h 30m',
        level: 'Beginner',
        rating: 4.9,
        enrollments: '12.5k',
        lessons: '14 Lessons',
        adapted: true,
        isAiRecommended: true,
        price: 'Free',
        description: 'Build modern, responsive websites with semantic HTML5 and CSS3 mastery.',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'G3e-cpL7ofc',
        skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
        whatYouWillLearn: ['Write semantic, accessible HTML markup', 'Style with modern CSS including Grid and Flexbox', 'Build fully responsive layouts', 'Animate elements with CSS transitions'],
        curriculum: [
            { title: 'Module 1: HTML Foundations', duration: '3h 00m' },
            { title: 'Module 2: CSS Styling & Selectors', duration: '4h 30m' },
            { title: 'Module 3: Layouts with Flexbox & Grid', duration: '5h 00m' },
            { title: 'Module 4: Responsive Design', duration: '3h 30m' },
            { title: 'Module 5: Final Project', duration: '2h 30m' },
        ],
    },
    {
        id: 'c2',
        title: 'JavaScript Basics',
        category: 'Web Development',
        author: 'Andrej Karpathy',
        duration: '24h 15m',
        level: 'Beginner',
        rating: 4.8,
        enrollments: '8.2k',
        lessons: '16 Lessons',
        adapted: false,
        isAiRecommended: false,
        price: '₹2,499.00',
        description: 'Master the core concepts of JavaScript and asynchronous programming.',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'W6NZfCO5SIk',
        skills: ['JavaScript ES6+', 'DOM APIs', 'Async/Await', 'Promises', 'Fetch API'],
        whatYouWillLearn: ['Understand core JS data types and functions', 'Work with the DOM to build interactive UIs', 'Handle asynchronous data with Promises and Async/Await', 'Debug code using browser DevTools'],
        curriculum: [
            { title: 'Module 1: JS Fundamentals', duration: '5h 00m' },
            { title: 'Module 2: Working with the DOM', duration: '4h 00m' },
            { title: 'Module 3: ES6+ Features', duration: '5h 15m' },
            { title: 'Module 4: Async Programming', duration: '5h 00m' },
            { title: 'Module 5: Project: Interactive App', duration: '5h 00m' },
        ],
    },
    {
        id: 'c3',
        title: 'Python for Data Science',
        category: 'Data Science',
        author: 'Alex Xu',
        duration: '12h 45m',
        level: 'Intermediate',
        rating: 4.9,
        enrollments: '15.1k',
        lessons: '20 Lessons',
        adapted: true,
        isAiRecommended: true,
        price: 'Free',
        description: 'Analyze data and create visualizations using Pandas and Matplotlib.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
        youtubeId: '_uQrJ0TkZlc',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
        whatYouWillLearn: ['Write clean, Pythonic data analysis code', 'Manipulate datasets with Pandas DataFrames', 'Build compelling data visualizations', 'Apply statistical analysis to real datasets'],
        curriculum: [
            { title: 'Module 1: Python Basics', duration: '2h 30m' },
            { title: 'Module 2: NumPy & Pandas', duration: '3h 15m' },
            { title: 'Module 3: Data Visualization', duration: '3h 00m' },
            { title: 'Module 4: Statistical Analysis', duration: '2h 00m' },
            { title: 'Module 5: Capstone Project', duration: '2h 00m' },
        ],
    },
    {
        id: 'c4',
        title: 'React.js Development',
        category: 'Web Development',
        author: 'Dan Abramov',
        duration: '22h 15m',
        level: 'Intermediate',
        rating: 4.9,
        enrollments: '22k',
        lessons: '22 Lessons',
        adapted: true,
        isAiRecommended: false,
        price: 'Free',
        description: 'Build interactive UIs with React hooks, components, and state management.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'bMknfKXIFA8',
        skills: ['React', 'Hooks', 'Context API', 'React Router', 'State Management'],
        whatYouWillLearn: ['Build reusable component-based UIs', 'Manage global state with Context and Zustand', 'Create multi-page apps with React Router', 'Optimize performance with `useMemo` & `useCallback`'],
        curriculum: [
            { title: 'Module 1: Components & JSX', duration: '4h 00m' },
            { title: 'Module 2: Hooks Deep Dive', duration: '5h 15m' },
            { title: 'Module 3: State & Context', duration: '4h 00m' },
            { title: 'Module 4: React Router & Forms', duration: '4h 00m' },
            { title: 'Module 5: Build a Full Project', duration: '5h 00m' },
        ],
    },
    {
        id: 'c5',
        title: 'Node.js & Express',
        category: 'Backend',
        author: 'Ryan Dahl',
        duration: '18h 45m',
        level: 'Advanced',
        rating: 4.8,
        enrollments: '9.4k',
        lessons: '18 Lessons',
        adapted: false,
        isAiRecommended: false,
        price: 'Free',
        description: 'Build scalable backend APIs and microservices with Node.js.',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'Oe421EPjeBE',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'JWT Auth'],
        whatYouWillLearn: ['Build and secure REST APIs from scratch', 'Integrate MongoDB with Mongoose', 'Handle auth with JWT and bcrypt', 'Deploy APIs on cloud platforms'],
        curriculum: [
            { title: 'Module 1: Node.js Core', duration: '3h 00m' },
            { title: 'Module 2: Express Routing', duration: '3h 45m' },
            { title: 'Module 3: MongoDB & Mongoose', duration: '4h 00m' },
            { title: 'Module 4: Authentication', duration: '4h 00m' },
            { title: 'Module 5: Deployment', duration: '4h 00m' },
        ],
    },
    {
        id: 'c6',
        title: 'UI/UX Design',
        category: 'Design',
        author: 'Don Norman',
        duration: '15h 30m',
        level: 'Beginner',
        rating: 4.7,
        enrollments: '6.8k',
        lessons: '15 Lessons',
        adapted: true,
        isAiRecommended: false,
        price: 'Free',
        description: 'Design user-centric interfaces and conduct effective user research.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'c9Wg6Cb_YlU',
        skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
        whatYouWillLearn: ['Create wireframes and high-fidelity prototypes in Figma', 'Conduct user research and usability tests', 'Build a complete design system', 'Design accessible, inclusive interfaces'],
        curriculum: [
            { title: 'Module 1: Design Principles', duration: '2h 30m' },
            { title: 'Module 2: Figma Mastery', duration: '4h 00m' },
            { title: 'Module 3: User Research', duration: '3h 00m' },
            { title: 'Module 4: Prototyping & Testing', duration: '3h 00m' },
            { title: 'Module 5: Design Portfolio Project', duration: '3h 00m' },
        ],
    },
    {
        id: 'c7',
        title: 'Data Structures & Algorithms',
        category: 'Computer Science',
        author: 'Gayle Laakmann',
        duration: '35h 00m',
        level: 'Advanced',
        rating: 5.0,
        enrollments: '30k+',
        lessons: '20 Lessons',
        adapted: true,
        isAiRecommended: true,
        price: 'Free',
        description: 'Master algorithms and ace your technical coding interviews.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'pkYVOmU3MgA',
        skills: ['Big-O Notation', 'Arrays & Trees', 'Dynamic Programming', 'Graphs', 'Sorting Algorithms'],
        whatYouWillLearn: ['Analyze algorithm complexity with Big-O', 'Solve tree, graph, and DP problems', 'Build intuition for FAANG-style interview questions', 'Implement data structures from scratch'],
        curriculum: [
            { title: 'Module 1: Arrays & Strings', duration: '6h 00m' },
            { title: 'Module 2: Linked Lists & Trees', duration: '7h 00m' },
            { title: 'Module 3: Graphs & BFS/DFS', duration: '7h 00m' },
            { title: 'Module 4: Dynamic Programming', duration: '8h 00m' },
            { title: 'Module 5: Mock Interviews', duration: '7h 00m' },
        ],
    },
    {
        id: 'c8',
        title: 'AI & Neural Networks',
        category: 'Machine Learning',
        author: 'Andrew Ng',
        duration: '42h 15m',
        level: 'Advanced',
        rating: 5.0,
        enrollments: '18k',
        lessons: '28 Lessons',
        adapted: true,
        isAiRecommended: true,
        price: 'Free',
        description: 'Deep dive into neural networks, backpropagation, and deep learning architectures.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'aircAruvnKk',
        skills: ['Neural Networks', 'TensorFlow', 'PyTorch', 'Backpropagation', 'CNNs & RNNs'],
        whatYouWillLearn: ['Implement neural networks from scratch', 'Train models with TensorFlow and PyTorch', 'Build CNNs for image recognition', 'Apply NLP with transformers'],
        curriculum: [
            { title: 'Module 1: Linear Algebra & Calculus Review', duration: '5h 00m' },
            { title: 'Module 2: Neural Network Foundations', duration: '8h 00m' },
            { title: 'Module 3: Convolutional Networks', duration: '9h 00m' },
            { title: 'Module 4: Sequence Models & RNNs', duration: '10h 00m' },
            { title: 'Module 5: Capstone: Build a Classifier', duration: '10h 15m' },
        ],
    },
    {
        id: 'c9',
        title: 'Full Stack Ecosystems',
        category: 'Web Development',
        author: 'Kent C. Dodds',
        duration: '38h 30m',
        level: 'Advanced',
        rating: 4.9,
        enrollments: '11.2k',
        lessons: '32 Lessons',
        adapted: true,
        isAiRecommended: false,
        price: 'Free',
        description: 'Master the MERN stack and modern deployment pipelines for scalable apps.',
        image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'nu_pCVPKzTk',
        skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'CI/CD'],
        whatYouWillLearn: ['Build a full MERN stack application end-to-end', 'Containerize apps with Docker', 'Set up CI/CD pipelines', 'Deploy to cloud platforms'],
        curriculum: [
            { title: 'Module 1: Full Stack Architecture', duration: '5h 00m' },
            { title: 'Module 2: Backend with Node & Express', duration: '8h 00m' },
            { title: 'Module 3: Frontend with React', duration: '8h 00m' },
            { title: 'Module 4: Containerization & CI/CD', duration: '8h 00m' },
            { title: 'Module 5: Production Deployment', duration: '9h 30m' },
        ],
    },
    {
        id: 'c10',
        title: 'Cloud Infrastructure',
        category: 'Cloud & DevOps',
        author: 'Kelsey Hightower',
        duration: '26h 45m',
        level: 'Intermediate',
        rating: 4.8,
        enrollments: '7.5k',
        lessons: '24 Lessons',
        adapted: true,
        isAiRecommended: false,
        price: 'Free',
        description: 'Architect scalable solutions using AWS, Kubernetes and Docker.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'X48VuDVv0do',
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'IAM'],
        whatYouWillLearn: ['Deploy and manage cloud infrastructure on AWS', 'Orchestrate containers with Kubernetes', 'Build infrastructure-as-code with Terraform', 'Design for high availability and fault tolerance'],
        curriculum: [
            { title: 'Module 1: Cloud Fundamentals', duration: '4h 00m' },
            { title: 'Module 2: AWS Core Services', duration: '6h 00m' },
            { title: 'Module 3: Docker & Kubernetes', duration: '7h 00m' },
            { title: 'Module 4: IaC with Terraform', duration: '5h 00m' },
            { title: 'Module 5: Production Architecture', duration: '4h 45m' },
        ],
    },
    {
        id: 'c11',
        title: 'Cyber Security Fundamentals',
        category: 'Cyber Security',
        author: 'Troy Hunt',
        duration: '20h 15m',
        level: 'Beginner',
        rating: 4.9,
        enrollments: '9.1k',
        lessons: '18 Lessons',
        adapted: true,
        isAiRecommended: true,
        price: 'Free',
        description: 'Learn ethical hacking, network security, and how to secure applications.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'inWWhr5tnEA',
        skills: ['Network Security', 'Pen Testing', 'OWASP Top 10', 'Cryptography', 'SIEM'],
        whatYouWillLearn: ['Identify and exploit common web vulnerabilities', 'Perform network penetration tests', 'Secure REST APIs and databases', 'Understand and apply encryption standards'],
        curriculum: [
            { title: 'Module 1: Security Fundamentals', duration: '3h 00m' },
            { title: 'Module 2: Network Security', duration: '4h 15m' },
            { title: 'Module 3: Web Application Security (OWASP)', duration: '5h 00m' },
            { title: 'Module 4: Ethical Hacking & Pen Testing', duration: '4h 00m' },
            { title: 'Module 5: Incident Response', duration: '4h 00m' },
        ],
    },
    {
        id: 'c12',
        title: 'DevOps Pipeline Automation',
        category: 'Cloud & DevOps',
        author: 'Gene Kim',
        duration: '22h 30m',
        level: 'Intermediate',
        rating: 4.8,
        enrollments: '5.6k',
        lessons: '20 Lessons',
        adapted: true,
        isAiRecommended: false,
        price: 'Free',
        description: 'Streamline CI/CD workflows and automate infrastructure as code.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
        youtubeId: 'UbtB4sMaaNM',
        skills: ['Jenkins', 'GitHub Actions', 'Ansible', 'Terraform', 'Monitoring'],
        whatYouWillLearn: ['Build end-to-end CI/CD pipelines', 'Automate server provisioning with Ansible', 'Monitor applications with Prometheus & Grafana', 'Implement GitOps workflows'],
        curriculum: [
            { title: 'Module 1: DevOps Culture & Principles', duration: '2h 30m' },
            { title: 'Module 2: CI with GitHub Actions', duration: '5h 00m' },
            { title: 'Module 3: CD with Jenkins & ArgoCD', duration: '5h 00m' },
            { title: 'Module 4: Infrastructure Automation', duration: '5h 00m' },
            { title: 'Module 5: Observability & Monitoring', duration: '5h 00m' },
        ],
    },
]


export default function Courses() {
    const { darkMode, setSelectedCourse, setActivePage } = useLMSStore()
    const [activeTab, setActiveTab] = useState('All Courses')
    const [searchQuery, setSearchQuery] = useState('')

    // Smart Enrollment States
    const [enrollmentState, setEnrollmentState] = useState(null) // null, 'smart-flow'
    const [smartStep, setSmartStep] = useState(1)
    const [enrollingCourse, setEnrollingCourse] = useState(null)
    const [personalization, setPersonalization] = useState({ goal: 'Career Switch', time: '10h / week', difficulty: 'Adaptive' })
    const [isProcessing, setIsProcessing] = useState(false)
    const tabs = ['All Courses', 'Web Development', 'Data Science', 'Machine Learning', 'Design', 'Computer Science', 'Cloud & DevOps', 'Cyber Security']

    const filteredCourses = courses.filter(course => {
        const matchesTab = activeTab === 'All Courses' ||
            (activeTab === 'Web Development' && (course.category === 'Web Development' || course.category === 'Backend')) ||
            course.category === activeTab;

        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    })

    return (
        <div className={`transition-colors duration-500 min-h-screen pb-20 ${darkMode ? 'bg-[#121820]' : 'bg-gray-50'}`}>
            {/* Header Hero Section */}
            <header className={`relative pt-16 pb-24 px-6 lg:px-20 overflow-hidden ${darkMode ? 'bg-gradient-to-b from-[#1a222c] to-[#121820]' : 'bg-gradient-to-b from-white to-gray-50'}`}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 1, x: 0 }}
                            className={`text-6xl lg:text-8xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                            Browse <span className="text-yellow-500">Courses</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 1 }}
                            className={`text-xl leading-relaxed max-w-xl transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            Master in-demand skills with our diverse range of courses that adapt to your learning pace and skill level.
                        </motion.p>

                        <div className="relative max-w-md mx-auto lg:mx-0">
                            <div className={`relative flex items-center p-2 rounded-2xl border transition-all ${darkMode ? 'bg-[#1c232d]/80 border-white/5 shadow-2xl' : 'bg-white border-gray-200'}`}>
                                <Search className="ml-4 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className={`w-full h-12 bg-transparent pl-4 pr-4 text-lg focus:outline-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                />
                                <button className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-[500px] relative mt-10 lg:mt-0">
                        <div className="relative aspect-square flex items-center justify-center">
                            <FloatingIcon icon={Brain} delay={0} x="-35%" y="-35%" size={56} color="text-blue-500" />
                            <FloatingIcon icon={Cpu} delay={1.2} x="40%" y="-40%" size={48} color="text-yellow-500" bg="bg-yellow-500/10" />
                            <FloatingIcon icon={FileCode} delay={0.6} x="-50%" y="15%" size={44} color="text-orange-500" />
                            <FloatingIcon icon={Lightbulb} delay={1.8} x="50%" y="10%" size={52} color="text-yellow-400" />
                            <FloatingIcon icon={Leaf} delay={0.9} x="45%" y="45%" size={40} color="text-green-500" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className={`w-[280px] h-[180px] md:w-[350px] md:h-[220px] rounded-3xl border-4 relative flex items-center justify-center ${darkMode ? 'bg-[#1c232d] border-[#2c3543]' : 'bg-white border-gray-200 shadow-2xl'}`}
                            >
                                <div className="absolute inset-x-0 top-0 h-4 bg-gray-500/10 rounded-t-2xl border-b border-white/5" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                                <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[320px] md:w-[400px] h-4 rounded-b-xl border-x-4 border-b-4 ${darkMode ? 'bg-[#2c3543] border-[#2c3543]' : 'bg-gray-300 border-gray-300'}`} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Courses Grid Section */}
            <main className="max-w-7xl mx-auto py-12 px-6">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-blue-500 text-white shadow-lg'
                                : darkMode ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-500 hover:text-gray-900 bg-white border border-gray-100 shadow-sm'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-300 flex flex-col ${darkMode
                                ? 'bg-[#1a222c] border-white/5 hover:border-yellow-500/30'
                                : 'bg-white border-gray-100 shadow-xl'
                                }`}
                        >
                            {/* Card Image */}
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                <div className="absolute top-4 left-4 right-4 flex justify-between">
                                    <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                        <Clock size={14} /> {course.duration}
                                    </div>
                                    {course.isAiRecommended && (
                                        <div className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles size={14} /> AI Pick
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <h3 className={`text-xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {course.title}
                                    </h3>
                                </div>

                                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {course.description}
                                </p>

                                <div className="mt-auto pt-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={14} fill="currentColor" /> {course.rating}
                                        </div>
                                        <div className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                                            {course.level}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course)
                                                setActivePage('course-details')
                                            }}
                                            className={`flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 border-2 ${darkMode
                                                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20'
                                                : 'bg-white border-yellow-500 text-yellow-600 hover:bg-yellow-50'}`}>
                                            <BookOpen size={16} />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEnrollingCourse(course)
                                                setEnrollmentState('smart-flow')
                                                setSmartStep(1)
                                            }}
                                            className="flex-1 py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* ── SMART ENROLLMENT FLOW OVERLAY ── */}
            <AnimatePresence>
                {enrollmentState === 'smart-flow' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[7000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border shadow-2xl relative ${darkMode ? 'bg-[#1a222c] border-white/10' : 'bg-white border-gray-100'}`}
                        >
                            {/* Progress Indicator */}
                            {smartStep < 4 && (
                                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(smartStep / 3) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    />
                                </div>
                            )}

                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {smartStep === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center py-6">
                                            <div className="w-24 h-24 bg-purple-500/20 text-purple-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
                                                <Brain size={48} />
                                            </div>
                                            <div className="space-y-3">
                                                <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Baseline Check</h2>
                                                <p className={`text-lg font-medium max-w-lg mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Would you like to take a quick skill assessment for {enrollingCourse?.title}?</p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                                <button onClick={() => setSmartStep(2)} className="px-10 py-5 bg-purple-500 hover:bg-purple-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-3">
                                                    <Sparkles size={22} /> Take Assessment
                                                </button>
                                                <button onClick={() => setSmartStep(2)} className={`px-10 py-5 rounded-[2rem] font-black text-lg border transition-all active:scale-95 ${darkMode ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                                    Skip for Now
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {smartStep === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                            <div className="text-center">
                                                <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personalization Setup</h2>
                                                <p className={`text-lg font-medium mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tailor your learning journey for {enrollingCourse?.title}.</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Primary Learning Goal</label>
                                                        <select value={personalization.goal} onChange={e => setPersonalization({ ...personalization, goal: e.target.value })} className={`w-full p-5 rounded-3xl border outline-none font-bold text-lg ${darkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                                            <option>Career Switch</option>
                                                            <option>Freelancing Mastery</option>
                                                            <option>Academic Research</option>
                                                            <option>Self Improvement</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Commitment Level</label>
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {['5h', '10h', '20h'].map(t => (
                                                                <button key={t} onClick={() => setPersonalization({ ...personalization, time: t + ' / week' })} className={`p-4 rounded-2xl border font-bold transition-all ${personalization.time.includes(t) ? 'bg-blue-500 border-blue-500 text-white shadow-lg' : darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-100 text-gray-600'}`}>
                                                                    {t}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`p-8 rounded-[2.5rem] border shadow-inner flex flex-col justify-center gap-6 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                    <div className="flex gap-4">
                                                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Sparkles size={20} /></div>
                                                        <p className="text-sm font-medium text-gray-500 leading-relaxed">AI will use these parameters to drop supplemental resources and schedule milestones.</p>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><LineChart size={16} /></div>
                                                        <p className="text-sm font-medium text-gray-500 leading-relaxed">Adaptive engine enabled.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-6">
                                                <button onClick={() => setSmartStep(3)} className="w-full sm:w-auto px-12 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                                                    Generate Path →
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {smartStep === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                            <div className="text-center">
                                                <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning Roadmap</h2>
                                                <p className={`text-lg font-medium mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based on your profile, completion will take approx 6 weeks.</p>
                                            </div>

                                            <div className={`p-10 rounded-[3rem] border shadow-xl ${darkMode ? 'bg-gradient-to-br from-blue-900/10 to-purple-900/10 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'}`}>
                                                <div className="flex flex-col md:flex-row gap-10 items-center">
                                                    <div className="w-40 h-40 shrink-0 relative flex items-center justify-center">
                                                        <div className="absolute inset-0 rounded-full border-8 border-gray-200/20 dark:border-white/5" />
                                                        <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-spin-slow" />
                                                        <div className="text-center">
                                                            <div className="text-3xl font-black text-blue-500">92%</div>
                                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Match</div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4 text-left">
                                                        <div className="flex gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">1</div>
                                                            <p className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weeks 1-2: Foundation & Core Logic</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-xs">2</div>
                                                            <p className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weeks 3-4: Advanced Integration</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-center pt-4">
                                                <button onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setSmartStep(4); }, 1500) }} className="w-full sm:w-auto px-16 py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-4">
                                                    {isProcessing ? <RefreshCw className="animate-spin" /> : 'Confirm Enrollment'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {smartStep === 4 && (
                                        <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 text-center py-6">
                                            <div className="space-y-4">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 bg-green-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto shadow-2xl">
                                                    <CheckCircle2 size={40} />
                                                </motion.div>
                                                <h2 className={`text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Successfully Enrolled! 🎉</h2>
                                                <p className={`text-xl font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>The course has been added to your Learning Path.</p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                                <button onClick={() => setEnrollmentState(null)} className="p-6 bg-blue-500 text-white rounded-3xl font-black shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex flex-col items-center gap-2">
                                                    <MonitorPlay size={28} /> Start Learning
                                                </button>
                                                <button onClick={() => { setEnrollmentState(null); setActivePage('network') }} className={`p-6 rounded-3xl font-black border transition-all active:scale-95 flex flex-col items-center gap-2 ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                                                    <Users size={28} className="text-blue-500" /> Join Study Group
                                                </button>
                                            </div>
                                            <button onClick={() => setEnrollmentState(null)} className="text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Close Overlay</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function FloatingIcon({ icon: Icon, delay, x, y, size, color, bg = "bg-white/5" }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: x,
                y: [y, `calc(${y} - 25px)`, y]
            }}
            transition={{
                delay: delay + 0.5,
                opacity: { duration: 1 },
                scale: { duration: 0.8, type: "spring" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay }
            }}
            style={{ position: 'absolute', zIndex: 20 }}
            className={`p-5 rounded-[1.5rem] backdrop-blur-xl border border-white/10 shadow-2xl ${bg} ${color}`}
        >
            <Icon size={size} />
        </motion.div>
    )
}
