import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    setLoading(true);
    setResult([]);

    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.success) setResult(data.result);
      else alert("Gagal mendeteksi: " + data.message);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 AI Text Detector</h1>
      <textarea
        rows={6}
        style={styles.textarea}
        placeholder="Tulis teks di sini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleDetect} disabled={loading} style={styles.button}>
        {loading ? "Mendeteksi..." : "Deteksi AI"}
      </button>

      {result.length > 0 && (
        <div style={styles.results}>
          <h3>📋 Hasil Deteksi</h3>
          {result.map((item) => (
            <div key={item.no} style={styles.resultCard}>
              <div style={styles.scoreCircle(item.score)}>
                <span style={styles.scoreText}>{Math.round(item.score * 100)}%</span>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Kalimat {item.no}:</strong> {item.kalimat}
                </p>
                <p style={{ margin: "5px 0 0" }}>
                  Status: <b>{item.status === "AI_GENERATED" ? "🧠 AI" : "👤 Manusia"}</b>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "auto",
    padding: 20,
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2em",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    padding: 12,
    fontSize: "1em",
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 10,
    resize: "vertical",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "10px 16px",
    fontSize: "1em",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
  },
  resultCard: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    marginBottom: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    backgroundColor: "#fafafa",
  },
  scoreCircle: (score) => ({
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: `conic-gradient(${
      score > 0.5 ? "#ff4d4f" : "#52c41a"
    } ${score * 360}deg, #e0e0e0 0deg)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#333",
    flexShrink: 0,
  }),
  scoreText: {
    fontSize: "0.9em",
  },
};
         
