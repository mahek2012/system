import { create } from 'zustand'

export const useLMSStore = create((set) => ({
    student: {
        name: 'Mahek',
        level: 14,
        xp: 7500,
        nextLevelXp: 10000,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mahek',
        masteryRadar: [
            { subject: 'Frontend', A: 120, B: 110, fullMark: 150 },
            { subject: 'Backend', A: 98, B: 130, fullMark: 150 },
            { subject: 'Algorithms', A: 86, B: 130, fullMark: 150 },
            { subject: 'System Design', A: 99, B: 100, fullMark: 150 },
            { subject: 'Soft Skills', A: 85, B: 90, fullMark: 150 },
            { subject: 'DevOps', A: 65, B: 85, fullMark: 150 },
        ],
        riskScore: 12, // 12% risk (low)
        completionEstimate: "3 weeks",
        currentModule: "Advanced Distributed Systems",
        quizzes: [
            { id: 1, title: "React Patterns", score: 92, date: "2 days ago" },
            { id: 2, title: "Node.js Streams", score: 78, date: "1 week ago" },
            { id: 3, title: "SQL Indexing", score: 85, date: "2 weeks ago" }
        ],
        announcements: [
            { id: 1, type: 'system', title: "New Skill: Quantum Computing", content: "We've added a new path for basics of Quantum Logic." },
            { id: 2, type: 'peer', title: "Study Group Invitation", content: "Rohan invited you to 'System Design Hard' session." }
        ]
    },

    skills: [
        { id: '1', name: 'React Foundations', status: 'completed', progress: 100 },
        { id: '2', name: 'Zustand State Management', status: 'in-progress', progress: 65 },
        { id: '3', name: 'Advanced Tailwind', status: 'locked', progress: 0 },
        { id: '4', name: 'Framer Motion Basics', status: 'in-progress', progress: 30 },
    ],

    learningGraph: {
        nodes: [
            { id: '1', data: { label: 'Web Dev Basics' }, position: { x: 250, y: 5 }, type: 'input' },
            { id: '2', data: { label: 'React Hooks' }, position: { x: 100, y: 100 } },
            { id: '3', data: { label: 'State Management' }, position: { x: 400, y: 100 } },
            { id: '4', data: { label: 'Next.js Adaptive' }, position: { x: 250, y: 200 } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4', animated: true },
            { id: 'e3-4', source: '3', target: '4' },
        ]
    },

    recommendations: [
        { id: 'r1', title: 'Why Quadtrees for Canvases?', type: 'Reading', duration: '5 min', rationale: 'Matches your interest in Whiteboard Engines' },
        { id: 'r2', title: 'Mastering Framer Motion Drag', type: 'Lab', duration: '15 min', rationale: 'Improve your UI Animation skills' },
    ],

    darkMode: true,
    toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),

    activePage: 'home',
    setActivePage: (page) => set({ activePage: page }),

    selectedCourse: null,
    setSelectedCourse: (course) => set({ selectedCourse: course }),

    updateProgress: (skillId, progress) => set((state) => ({
        skills: state.skills.map(s => s.id === skillId ? { ...s, progress } : s)
    })),

    // Notes System
    notes: {}, // Keyed by courseId, value is { global: string, modules: { [moduleId]: string } }
    saveNote: (courseId, content, moduleId = 'global') => set((state) => {
        const courseNotes = state.notes[courseId] || { global: '', modules: {} }
        if (moduleId === 'global') {
            return {
                notes: { ...state.notes, [courseId]: { ...courseNotes, global: content } }
            }
        }
        return {
            notes: {
                ...state.notes,
                [courseId]: {
                    ...courseNotes,
                    modules: { ...courseNotes.modules, [moduleId]: content }
                }
            }
        }
    })
}))
