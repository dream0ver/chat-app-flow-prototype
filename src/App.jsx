// Importing necessary functions from 'reactflow' and components from the local directory
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";
import Canvas from "./components/Canvas";
import EditNode from "./components/EditNode";
import Panel from "./components/Panel";

// Importing hooks from 'react'
import { useCallback, useState } from "react";

// Main App component
function App() {
  // State hooks to manage editing status, current node, edges, and nodes
  const [editing, setEditing] = useState(false);
  const [currentNode, setCurrentNode] = useState({});
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);

  // Function to add a new node to the canvas
  const addNode = () => {
    const newNode = {
      id: nodes.length.toString(),
      position: { x: nodes.length * 25, y: nodes.length * 25 },
      data: { label: "Node " + nodes.length.toString() },
      type: nodes.length === 0 ? "input" : "default", // Using strict equality for comparison
    };
    setNodes((prev) => [...prev, newNode]);
  };

  // Function to save the current node's data
  const onSave = (msg) => {
    setNodes(
      nodes.map((node) => {
        if (node.id !== currentNode.id) return node; // Using strict equality for comparison
        return {
          ...node,
          data: {
            label: msg,
          },
        };
      })
    );
    setEditing(false);
    setCurrentNode({});
  };

  // Function to cancel editing
  const onCancel = () => {
    setEditing(false);
  };

  // Callbacks for handling node and edge changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Callback for handling new connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Function to handle node click events
  const onNodeClick = (event, node) => {
    setEditing(true);
    setCurrentNode(node);
  };

  // Rendering the canvas and panels
  return (
    <section className="container">
      <Canvas
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        panelHTML={
          editing ? (
            <EditNode
              onSave={onSave}
              onCancel={onCancel}
              currentNode={currentNode}
            />
          ) : (
            <Panel addNode={addNode} />
          )
        }
      />
    </section>
  );
}

// Exporting the App component as the default export
export default App;
