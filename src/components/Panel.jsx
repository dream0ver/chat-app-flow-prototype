export default function Panel({ addNode }) {
  return (
    <div>
      <button className="btn-primary" onClick={addNode}>
        Add Message Node
      </button>
    </div>
  );
}
