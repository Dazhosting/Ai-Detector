import { useState } from "react";

// Komponen CircularProgress tetap sama, karena gayanya sangat dinamis & spesifik
const CircularProgress = ({ score }) => {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score * circumference);
  const color = score > 0.5 ? '#ef4444' : '#22c55e';

  // Style untuk teks di tengah lingkaran (tetap inline karena dinamis)
  const progressTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#374151',
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle stroke="#e5e7eb" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
        <circle stroke={color} fill="transparent" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" r={radius} cx={size / 2} cy={size / 2} />
      </svg>
      <span style={progressTextStyle}>
        {(score * 100).toFixed(0)}%
      </span>
    </div>
  );
};


// Komponen CSS diletakkan di dalam tag <style>
const PageStyles = () => (
  <style jsx>{`
    .container {
      max-width: 700px;
      margin: 40px auto;
      padding: 20px;
      font-family: system-ui, sans-serif;
      background-color: #f9fafb;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .title {
      text-align: center;
      color: #111827;
      font-size: 2rem;
    }
    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-top: -10px;
      margin-bottom: 30px;
    }
    .inputBox {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      resize: vertical;
      box-sizing: border-box;
    }
    .button {
      padding: 12px 20px;
      font-size: 1rem;
      color: white;
      background-color: #3b82f6;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    .resultsContainer {
      margin-top: 40px;
    }
    .resultsTitle {
      color: #1f2937;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .resultCard {
      background-color: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .cardContent {
      flex: 1;
    }
    .cardScore {
      flex-shrink: 0;
    }
    .sentence {
      margin: 0 0 12px 0;
      color: #374151;
      line-height: 1.6;
    }
    .statusBadge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .ai-badge {
      background-color: #fee2e2;
      color: #b91c1c;
    }
    .human-badge {
      background-color: #dcfce7;
      color: #166534;
    }
  `}</style>
);

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    setLoading(true);
    setTimeout(() => {
       setResult([
        { no: 1, kalimat: 'Ini adalah contoh kalimat yang kemungkinan besar ditulis oleh AI karena strukturnya yang sangat formal dan detail.', score: 0.92, status: 'AI_GENERATED' },
        { no: 2, kalimat: 'kalo yg ini kayaknya tulisan orang biasa aja sih.', score: 0.15, status: 'HUMAN_WRITTEN' }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <PageStyles /> {/* Memanggil komponen style di sini */}
      <div className="container">
        <h1 className="title">🧠 AI Text Detector</h1>
        <p className="subtitle">Analisis teks untuk mendeteksi apakah ditulis oleh AI atau manusia.</p>
        
        <div className="inputBox">
          <textarea
            rows={8}
            className="textarea"
            placeholder="Tulis atau tempel teks di sini untuk dianalisis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handleDetect} 
            disabled={loading || !text} 
            className="button"
          >
            {loading ? "Menganalisis..." : "Deteksi Teks"}
          </button>
        </div>

        {result.length > 0 && (
          <div className="resultsContainer">
            <h2 className="resultsTitle">Hasil Analisis</h2>
            {result.map((item) => {
              const isAI = item.status === 'AI_GENERATED';
              return (
                <div key={item.no} className="resultCard">
                  <div className="cardContent">
                    <p className="sentence">
                      <strong style={{color: '#4b5563'}}>Kalimat {item.no}:</strong> {item.kalimat}
                    </p>
                    <div className={`statusBadge ${isAI ? 'ai-badge' : 'human-badge'}`}>
                      {isAI ? 'Terdeteksi AI' : 'Ditulis Manusia'}
                    </div>
                  </div>
                  <div className="cardScore">
                    <CircularProgress score={item.score} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
  }
