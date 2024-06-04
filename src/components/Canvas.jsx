import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
function Canvas(props) {
  return (
    <div className="canvas-box">
      <ReactFlow {...props}>
        <Background />
        <Controls />
        <Panel position="top-right">{props.panelHTML}</Panel>
      </ReactFlow>
    </div>
  );
}

export default Canvas;
