import { useCallback, useEffect, useState } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow
} from 'reactflow'
import InputBox from './InputBox'
import Resizer from './Resizer'

let id = 1
const getId = () => `${id++}`

const nodeTypes = {
  Resizer,
}

export default function DoubleClick({
  reactFlowWrapper,
  nodes,
  setNodes,
  onNodesChange,
}) {
  const { project } = useReactFlow()
  const [selectedNode, setSelectedNode] = useState(null)

  const handleDoubleClick = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane')

      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect()
        const id = getId()
        const newNode = {
          id,
          type: 'Resizer',

          position: project({
            x: event.clientX - left,
            y: event.clientY - top + 35,
          }),
          data: {
            label: <InputBox id={id} />,
          },
          style: {
            background: '#3400aa',
            fontSize: 12,
            border: '1px solid black',
            padding: 5,
            borderRadius: 15,
            height: 100,
          },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [project]
  )

  useEffect(() => { }, [nodes])

  return (
    <ReactFlow
      nodes={nodes}
      zoomOnDoubleClick={false}
      onDoubleClick={handleDoubleClick}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onNodeDragStart={(event, node) => console.log({ node: node.id })}
      onNodeDragStop={(event, node) => {
        console.log({ node: node.id })
        setSelectedNode(null)
      }}
    >
      <Controls />
      <MiniMap zoomable pannable />
      <Background
        variant="lines"
        gap={20}
        size={1}
        color="#ccc"
        className="bg-black"
      />
    </ReactFlow>
  )
}
