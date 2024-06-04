import { useRef } from "react";
export default function EditNode({ onSave, currentNode, onCancel }) {
  const ref = useRef();
  return (
    <div className="flex-col">
      <textarea ref={ref} defaultValue={currentNode.data.label}></textarea>
      <div className="flex-row" style={{ justifyContent: "space-between" }}>
        <button
          className="btn-primary"
          onClick={() => onSave(ref.current.value)}
        >
          Save Changes
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
