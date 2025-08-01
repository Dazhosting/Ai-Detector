import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [customAlert, setCustomAlert] = useState(null);

  const leaderboardData = [
    { rank: 1, name: "Andi Wijaya", detections: 142, avatar: "👨🏻‍💻" },
    { rank: 2, name: "Siti Aminah", detections: 128, avatar: "👩🏻‍🔬" },
    { rank: 3, name: "Budi Santoso", detections: 115, avatar: "👨🏻‍🚀" },
    { rank: 4, name: "Dewi Lestari", detections: 98, avatar: "👩🏻‍🎨" },
    { rank: 5, name: "Eko Prasetyo", detections: 76, avatar: "👨🏻‍🏫" },
  ];

  const showAlert = (message) => {
    setCustomAlert(message);
    setTimeout(() => setCustomAlert(null), 3000);
  };

  const handleDetect = async () => {
    if (!text.trim()) return showAlert("Teks tidak boleh kosong!");
    setLoading(true);
    setResult([]);
    try {
      await new Promise((r) => setTimeout(r, 1500)); // simulasi
      const mockResult = text.split(".").filter(Boolean).map((s, i) => ({
        no: i + 1,
        kalimat: s.trim() + ".",
        score: Math.random(),
        status: Math.random() > 0.4 ? "AI_GENERATED" : "HUMAN_WRITTEN",
      }));
      setResult(mockResult);
    } catch (err) {
      showAlert("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    background: "#121212",
    surface: "#1e1e1e",
    primary: "#bb86fc",
    primaryHover: "#a050f0",
    secondary: "#03dac6",
    textPrimary: "#e0e0e0",
    textSecondary: "#a0a0a0",
    border: "#333333",
    aiText: "#ff79c6",
    humanText: "#50fa7b",
  };

  const GlobalStyles = `
    body {
      background-color: ${colors.background};
      color: ${colors.textPrimary};
      margin: 0;
      font-family: 'Poppins', sans-serif;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${colors.background}; }
    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover { background: ${colors.primaryHover}; }
  `;

  return (
    <>
      <Head>
        <title>🧠 AI Text Detector Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{GlobalStyles}</style>
      </Head>

      {customAlert && (
        <div style={{
          position: "fixed",
          top: 20,
          right: 20,
          backgroundColor: colors.primary,
          color: "#000",
          padding: "12px 20px",
          borderRadius: 8,
          fontWeight: 600,
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}>
          {customAlert}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        maxWidth: 1200,
        margin: '40px auto',
        padding: '20px',
        flexWrap: 'wrap'
      }}>
        <main style={{ flex: 3, minWidth: 300 }}>
          <header style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.8em', fontWeight: 700, color: colors.primary, marginBottom: 10 }}>AI Text Detector <sup>Pro</sup></h1>
            <p style={{ fontSize: '1.1em', color: colors.textSecondary }}>Analisis teks untuk mendeteksi kemungkinan tulisan yang dihasilkan oleh AI.</p>
          </header>

          <div style={{
            padding: '25px',
            backgroundColor: colors.surface,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginTop: 30
          }}>
            <textarea
              rows={8}
              style={{
                width: '100%',
                padding: 15,
                fontSize: '1em',
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                resize: 'vertical',
                backgroundColor: '#252525',
                color: colors.textPrimary,
                marginBottom: 10,
              }}
              placeholder="Masukkan teks di sini untuk dianalisis..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleDetect}
              disabled={loading || !text.trim()}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              style={{
                width: '100%',
                background: loading || !text.trim()
                  ? "#444"
                  : `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                color: loading || !text.trim() ? "#888" : "#000",
                padding: '12px 20px',
                fontSize: '1.1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: 8,
                cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
                transform: isButtonHovered && !loading ? 'translateY(-2px)' : 'none',
                boxShadow: isButtonHovered && !loading ? `0 6px 15px rgba(187, 134, 252, 0.3)` : 'none',
              }}
            >
              {loading ? "🔎 Menganalisis..." : "Deteksi Teks"}
            </button>
          </div>

          {result.length > 0 && (
            <section style={{ marginTop: 40 }}>
              <h2 style={{
                fontSize: '1.5em',
                fontWeight: 600,
                color: colors.textPrimary,
                borderBottom: `2px solid ${colors.primary}`,
                paddingBottom: 8,
                marginBottom: 20
              }}>📋 Hasil Analisis</h2>

              {result.map((item) => (
                <div key={item.no} style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  padding: '15px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  marginBottom: 12,
                  backgroundColor: 'rgba(30, 30, 30, 0.7)',
                }}>
                  <div style={{
                    width: 65,
                    height: 65,
                    borderRadius: '50%',
                    background: `radial-gradient(closest-side, ${colors.surface} 79%, transparent 80% 100%), conic-gradient(${item.score > 0.5 ? colors.aiText : colors.humanText} ${item.score * 100}%, ${colors.border} 0)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: item.score > 0.5 ? colors.aiText : colors.humanText,
                    flexShrink: 0,
                  }}>
                    {Math.round(item.score * 100)}%
                  </div>
                  <div>
                    <p style={{ margin: 0, color: colors.textSecondary }}>
                      <strong>Kalimat #{item.no}:</strong> {item.kalimat}
                    </p>
                    <p style={{ margin: '8px 0 0', fontWeight: 600 }}>
                      Status:{" "}
                      <span style={{ color: item.status === "AI_GENERATED" ? colors.aiText : colors.humanText }}>
                        {item.status === "AI_GENERATED" ? "🧠 Terdeteksi AI" : "👤 Manusia"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>

        <aside style={{
          flex: 1,
          padding: '20px',
          backgroundColor: 'rgba(30, 30, 30, 0.5)',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          height: 'fit-content',
          minWidth: 280
        }}>
          <h2 style={{
            fontSize: '1.5em',
            fontWeight: 600,
            color: colors.textPrimary,
            borderBottom: `2px solid ${colors.primary}`,
            paddingBottom: '8px',
            marginBottom: '20px',
          }}>📊 Leaderboard</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboardData.map((user) => (
              <div key={user.rank} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: colors.surface,
                borderRadius: '8px',
                border: `1px solid ${colors.border}`
              }}>
                <span style={{ fontSize: '1.2em', fontWeight: '700', color: colors.primary, width: '30px' }}>{user.rank}</span>
                <span style={{ fontSize: '1.5em', marginRight: '12px' }}>{user.avatar}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: colors.textPrimary }}>{user.name}</p>
                  <p style={{ margin: 0, fontSize: '0.9em', color: colors.textSecondary }}>{user.detections} deteksi</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
    }
        
