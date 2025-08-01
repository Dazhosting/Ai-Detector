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
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>🧠 AI Text Detector</h1>
      <textarea
        rows={6}
        style={{ width: "100%", padding: 10 }}
        placeholder="Tulis teks di sini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleDetect} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Mendeteksi..." : "Deteksi AI"}
      </button>

      {result.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Hasil Deteksi:</h3>
          <ul>
            {result.map((item) => (
              <li key={item.no}>
                <strong>Kalimat {item.no}:</strong> {item.kalimat}<br />
                Score: {item.score} – <b>{item.status}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
        }
                        
