import type { Summary as SummaryType } from "../types/expense";

interface Props {
  summary: SummaryType[];
}

export default function Summary({ summary }: Props) {
  const max = Math.max(...summary.map((item) => Number(item.total)), 1);

  return (
    <div className="summary-container">
      <h2>Overall Category Summary</h2>
      <p className="summary-note">Based on all recorded expenses</p>

      {summary.map((item) => (
        <div
          key={item.category}
          style={{
            marginBottom: "15px",
          }}
        >
          <div>
            {item.category} (₹{item.total})
          </div>

          <div
            style={{
              height: "20px",
              background: "#e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(Number(item.total) / max) * 100}%`,
                background: "#2563eb",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
