import { Monitor, Folder, Terminal, Settings, Globe, FileText } from 'lucide-react'

export const APPS = [
    { id: 'explorer', title: 'File Explorer', icon: Folder, color: 'text-yellow-400' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-gray-300' },
    { id: 'browser', title: 'Browser', icon: Globe, color: 'text-blue-400' },
    { id: 'settings', title: 'Settings', icon: Settings, color: 'text-gray-400' },
    { id: 'notepad', title: 'Notepad', icon: FileText, color: 'text-blue-300' },
]
