// pages/index.js
import { useState } from "react";

// Komponen CircularProgress telah disesuaikan dengan palet warna baru
const CircularProgress = ({ score }) => {
  const size = 70; // Ukuran sedikit lebih kecil agar pas di kartu baru
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score * circumference);
  
  // Warna disesuaikan dengan tema baru
  // Merah untuk skor > 0.5 (AI), Hijau untuk skor <= 0.5 (Manusia)
  const color = score > 0.5 ? '#f87171' : '#4ade80';

  const progressTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.9rem', // Font lebih kecil agar sesuai
    fontWeight: '600',
    color: '#334155', // Warna teks lebih lembut
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle stroke="#e2e8f0" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
        <circle 
            stroke={color} 
            fill="transparent" 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            r={radius} 
            cx={size / 2} 
            cy={size / 2}
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <span style={progressTextStyle}>
        {(score * 100).toFixed(0)}%
      </span>
    </div>
  );
};

// Komponen CSS yang telah didesain ulang sepenuhnya
const PageStyles = () => (
  <style jsx>{`
    /* Global Styles */
    :global(body) {
      background-color: #f8fafc; /* Latar belakang body lebih cerah */
      color: #334155;
      font-family: 'Inter', system-ui, sans-serif;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ellipsis {
      to { width: 1.25em; }
    }

    /* Main Container */
    .container {
      max-width: 700px;
      margin: 50px auto;
      padding: 32px;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #1e293b;
      background: linear-gradient(to right, #4f46e5, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: #64748b;
      margin-top: 8px;
    }

    /* Input Area */
    .inputBox {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .textarea {
      width: 100%;
      padding: 14px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 1rem;
      resize: vertical;
      box-sizing: border-box;
      background-color: #f8fafc;
      transition: all 0.2s ease-in-out;
    }
    .textarea:focus {
      outline: none;
      border-color: #6366f1;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }
    .button {
      padding: 14px 24px;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      background: linear-gradient(to right, #6366f1, #8b5cf6);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 4px 10px -2px rgba(124, 58, 237, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 7px 15px -3px rgba(124, 58, 237, 0.4);
    }
    .button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      box-shadow: none;
    }
    .button.loading::after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4,end) 1.5s infinite;
      content: "...";
      width: 0px;
    }
    
    /* Results Section */
    .resultsContainer {
      margin-top: 40px;
      animation: fadeIn 0.5s ease-out;
    }
    .resultsTitle {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 24px;
    }
    .resultCard {
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      /* Border kiri diberi warna sesuai status */
      border-left-width: 5px;
      padding: 20px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 20px;
      transition: box-shadow 0.2s;
    }
    .resultCard:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .cardContent {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .sentence {
      margin: 0;
      color: #475569;
      line-height: 1.6;
    }
    .statusBadge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      align-self: flex-start; /* Agar badge tidak memenuhi lebar */
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
    // Hapus hasil lama saat analisis baru dimulai
    setResult([]); 
    
    // Simulasi pemanggilan API
    setTimeout(() => {
       setResult([
        { no: 1, kalimat: 'Ini adalah contoh kalimat yang kemungkinan besar ditulis oleh AI karena strukturnya yang sangat formal dan detail.', score: 0.92, status: 'AI_GENERATED' },
        { no: 2, kalimat: 'kalo yg ini kayaknya tulisan orang biasa aja sih, santai banget bahasanya.', score: 0.15, status: 'HUMAN_WRITTEN' },
        { no: 3, kalimat: 'Analisis mendalam terhadap data historis menunjukkan korelasi signifikan antara variabel independen dan dependen, yang mengimplikasikan perlunya revisi model prediktif saat ini.', score: 0.98, status: 'AI_GENERATED' }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <PageStyles />
      <div className="container">
        <div className="header">
          <h1 className="title">🧠 AI Text Detector</h1>
          <p className="subtitle">Analisis teks untuk mendeteksi apakah ditulis oleh AI atau manusia.</p>
        </div>
        
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
            className={`button ${loading ? "loading" : ""}`}
          >
            {loading ? "Menganalisis" : "Deteksi Teks"}
          </button>
        </div>

        {result.length > 0 && (
          <div className="resultsContainer">
            <h2 className="resultsTitle">Hasil Analisis</h2>
            {result.map((item) => {
              const isAI = item.status === 'AI_GENERATED';
              const cardStyle = {
                // Memberi warna pada border kiri kartu secara dinamis
                borderLeftColor: isAI ? '#f87171' : '#4ade80'
              };

              return (
                <div key={item.no} className="resultCard" style={cardStyle}>
                  <div className="cardContent">
                    <p className="sentence">
                      <strong style={{color: '#334155'}}>Kalimat #{item.no}:</strong> "{item.kalimat}"
                    </p>
                    <div className={`statusBadge ${isAI ? 'ai-badge' : 'human-badge'}`}>
                      {isAI ? 'Terdeteksi AI' : 'Ditulis Manusia'}
                    </div>
                  </div>
                  <div className="cardScore">
                    <CircularProgress score={isAI ? item.score : (1 - item.score)} />
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
