import React, { useMemo } from 'react'
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Handle,
    Position
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useLMSStore } from '../store/useLMSStore'

const CustomNode = ({ data }) => (
    <div className="px-4 py-2 shadow-xl rounded-xl bg-[#1c1c1e] border border-white/10 text-white min-w-[150px] group transition-all hover:border-blue-500/50">
        <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-blue-500 border-none" />
        <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">{data.type || 'Skill'}</div>
        <div className="text-xs font-black">{data.label}</div>
        <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${data.progress || 0}%` }} />
        </div>
        <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-500 border-none" />
    </div>
)

const nodeTypes = {
    custom: CustomNode,
}

export default function SkillGraph() {
    const { learningGraph } = useLMSStore()

    const nodes = useMemo(() => learningGraph.nodes.map(n => ({
        ...n,
        type: 'custom',
        data: { ...n.data, progress: Math.floor(Math.random() * 100) }
    })), [learningGraph.nodes])

    return (
        <div className="w-full h-full bg-[#0a0a0b] rounded-[2rem] overflow-hidden border border-white/5 relative">
            <ReactFlow
                nodes={nodes}
                edges={learningGraph.edges}
                nodeTypes={nodeTypes}
                fitView
                style={{ background: '#0a0a0b' }}
            >
                <Background color="#1a1a1c" gap={20} />
                <Controls className="!bg-[#1c1c1e] !border-white/10" />
                <MiniMap
                    nodeColor="#6366f1"
                    maskColor="rgba(0,0,0,0.6)"
                    className="!bg-[#1c1c1e] !border-white/10"
                />
            </ReactFlow>

            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] bg-blue-600/20 backdrop-blur-md px-3 py-1 rounded-lg border border-blue-500/20">
                    Adaptive Learning Path
                </h3>
            </div>
        </div>
    )
}
