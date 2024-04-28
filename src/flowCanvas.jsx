import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css'
import ReactFlow, {useNodesState, useEdgesState, addEdge,Controls, Background,useOnSelectionChange, ReactFlowProvider, MarkerType} from 'reactflow';
import 'reactflow/dist/style.css'
import Elements from './elements';
import MessageNode from './custom-nodes/messageNode';
import './custom-nodes/messageNode.css'
import Editor from './editor';
import './editor.css'

let id = 0;
const getId = (type) => `node_${type || 'def'}_${id++}`;
const customNodeTypes = {messageNode:MessageNode};
const defaultEdgeType = {markerEnd:{type:MarkerType.Arrow,width:20,height:20}};
export default function FlowCanvas(){
    const [nodes,setNodes, onNodesChange] = useNodesState([]);
    const [edges,setEdges,onEdgesChange] = useEdgesState([]);
    const [node,setNode] = useState(null);
    const onConnect = useCallback((param)=>setEdges((e)=> addEdge(param,e)),
[setEdges]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('chatflow/element');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(type),
        type,
        position,
        data: { label: 'text' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  const onDataChanged = (newLabel,nodeData)=>{
    console.log("New value");
    console.log(nodeData);
    nodeData.data.label = newLabel;
    console.log(nodes.filter((n)=>n.id===nodeData.id));
    setNodes(nodes.map(n=>n.id === nodeData.id? {...n, data:{...n.data,label : newLabel}}:n));
  }
 return(
    <ReactFlowProvider>
    <div className='flow-container'>
    <main className='flow-space'>
    <ReactFlow nodeTypes={customNodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e,n)=>console.log(n)}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        defaultEdgeOptions={defaultEdgeType}>
        <Controls/>
        <Background/>
    </ReactFlow>
    </main>
    <aside className='side-bar'>
        <Sidebar onDataChanged={onDataChanged}/>
    </aside>
    </div>
    </ReactFlowProvider>
        
 )
}

function Sidebar({onDataChanged}){
    const [selectedNodes, setSelectedNodes] = useState([]);
 
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(nodes.map((n)=>n));
    //   console.log(selectedNodes);    
    },
  });
  useEffect(()=>console.log(selectedNodes),[selectedNodes])
 
  return( 
      selectedNodes.length?<Editor selectedNodeData={selectedNodes} onDataChanged={onDataChanged}/>:<Elements/>
  );
}

