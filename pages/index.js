import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Logika deteksi yang akurat: memeriksa user agent dan lebar layar.
    const checkIsMobile = () => {
      // Mengembalikan true jika user agent mengandung "Mobi" atau "Android", ATAU jika lebar window < 1024px.
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 1024;
      setIsMobile(isMobileDevice);
    };

    // Jalankan pengecekan saat komponen pertama kali dimuat di browser.
    checkIsMobile();

    // Tambahkan listener untuk mengecek ulang jika ukuran window berubah.
    window.addEventListener("resize", checkIsMobile);

    // Hapus listener saat komponen tidak lagi digunakan untuk mencegah memory leak.
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // State untuk fungsionalitas inti
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setButtonHovered] = useState(false);

  // Data dummy untuk leaderboard
  const [leaderboardData] = useState([
    { rank: 1, name: "User 1839", detections: 142, avatar: "👨🏻‍💻" },
    { rank: 2, name: "User 2947", detections: 128, avatar: "👩🏻‍🔬" },
    { rank: 3, name: "User 2373", detections: 115, avatar: "👨🏻‍🚀" },
    { rank: 4, name: "User 8639", detections: 98, avatar: "👩🏻‍🎨" },
    { rank: 5, name: "User 3638", detections: 76, avatar: "👨🏻‍🏫" },
  ]);

  const handleDetect = async () => {
    if (!text.trim()) {
      alert("Teks tidak boleh kosong!");
      return;
    }
    setLoading(true);
    setResult([]);
    try {
      // Simulasi API call (ganti dengan fetch asli Anda jika perlu)
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResult = text.split('.').filter(s => s.trim() !== '').map((s, i) => ({
        no: i + 1,
        kalimat: s.trim() + '.',
        score: Math.random(),
        status: Math.random() > 0.4 ? "AI_GENERATED" : "HUMAN_WRITTEN",
      }));
      setResult(mockResult);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
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
    ::-webkit-scrollbar-thumb { background: ${colors.primary}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${colors.primaryHover}; }
  `;
  
  // Jika terdeteksi sebagai mobile, tampilkan halaman fallback.
  if (isMobile) {
    return (
      <>
        <Head>
          <title>Mode Desktop Diperlukan</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
          <style>{`
            body { 
              background-color: #121212; 
              color: #e0e0e0; 
              font-family: 'Poppins', sans-serif;
              margin: 0;
            }
          `}</style>
        </Head>
        <div style={styles.mobileFallbackContainer}>
            <span style={styles.mobileFallbackIcon}>🖥️</span>
            <h1 style={styles.mobileFallbackTitle}>Tampilan Desktop Diperlukan</h1>
            <p style={styles.mobileFallbackText}>
              Aplikasi ini dioptimalkan untuk pengalaman desktop. Silakan buka di perangkat dengan layar yang lebih lebar.
            </p>
        </div>
      </>
    );
  }

  // Jika bukan mobile, tampilkan aplikasi utama.
  return (
    <>
      <Head>
        <title>🧠 AI Text Detector Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{GlobalStyles}</style>
      </Head>

      <div style={styles.container}>
        <div style={styles.mainContent}>
          <header style={styles.header}>
            <h1 style={styles.title}>AI Text Detector <sup>Pro</sup></h1>
            <p style={styles.subtitle}>
              Analisis teks untuk mendeteksi kemungkinan tulisan yang dihasilkan oleh AI.
            </p>
          </header>

          <div style={styles.inputSection}>
            <textarea
              rows={8}
              style={styles.textarea}
              placeholder="Masukkan teks di sini untuk dianalisis..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleDetect}
              disabled={loading || !text.trim()}
              style={{
                ...styles.button,
                ...(isButtonHovered && !loading && text.trim() ? styles.buttonHover : {}),
                ...(loading || !text.trim() ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              {loading ? "🔎 Menganalisis..." : "Deteksi Teks"}
            </button>
          </div>
          
          {loading && <div style={styles.loader}></div>}

          {result.length > 0 && !loading && (
            <div style={styles.results}>
              <h2 style={styles.sectionTitle}>📋 Hasil Analisis</h2>
              {result.map((item) => (
                <div key={item.no} style={styles.resultCard}>
                  <div style={styles.scoreCircle(item.score)}>
                    <span style={styles.scoreText}>{Math.round(item.score * 100)}%</span>
                  </div>
                  <div style={styles.resultTextContainer}>
                    <p style={styles.resultSentence}>
                      <strong>Kalimat #{item.no}:</strong> {item.kalimat}
                    </p>
                    <p style={styles.resultStatus}>
                      Status:{" "}
                      <span style={item.status === "AI_GENERATED" ? styles.aiLabel : styles.humanLabel}>
                        {item.status === "AI_GENERATED" ? "🧠 Terdeteksi AI" : "👤 Manusia"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside style={styles.sidebar}>
          <h2 style={styles.sectionTitle}>📊 Leaderboard</h2>
          <div style={styles.leaderboardContainer}>
            {leaderboardData.map((user) => (
              <div key={user.rank} style={styles.leaderboardCard}>
                <span style={styles.leaderboardRank}>{user.rank}</span>
                <span style={styles.leaderboardAvatar}>{user.avatar}</span>
                <div style={styles.leaderboardUser}>
                  <p style={styles.leaderboardName}>{user.name}</p>
                  <p style={styles.leaderboardDetections}>{user.detections} deteksi</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

// --- Styles Object ---

const colors = {
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#bb86fc',
  primaryHover: '#a050f0',
  secondary: '#03dac6',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0a0',
  border: '#333333',
  aiText: '#ff79c6',
  humanText: '#50fa7b',
};

const styles = {
  mobileFallbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
  mobileFallbackIcon: {
    fontSize: '5em',
    marginBottom: '20px',
  },
  mobileFallbackTitle: {
    color: colors.primary,
    fontSize: '2em',
    margin: '0 0 10px 0',
  },
  mobileFallbackText: {
    color: colors.textSecondary,
    fontSize: '1.1em',
    maxWidth: '400px',
    lineHeight: 1.5,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    maxWidth: 1200,
    margin: '40px auto',
    padding: '20px',
  },
  mainContent: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  sidebar: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    borderRadius: '12px',
    border: '1px solid #2a2a2a',
    backdropFilter: 'blur(10px)',
    height: 'fit-content',
  },
  header: { textAlign: 'center' },
  title: {
    fontSize: '2.8em',
    fontWeight: 700,
    color: colors.primary,
    margin: '0 0 10px 0',
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: '1.1em',
    color: colors.textSecondary,
    margin: 0,
    maxWidth: '500px',
    margin: '0 auto',
  },
  inputSection: {
    padding: '25px',
    backgroundColor: colors.surface,
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    fontSize: '1em',
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    marginBottom: '15px',
    resize: 'vertical',
    backgroundColor: '#252525',
    color: colors.textPrimary,
    fontFamily: "'Poppins', sans-serif",
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  button: {
    width: '100%',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
    color: '#000',
    padding: '12px 20px',
    fontSize: '1.1em',
    fontWeight: '600',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 15px rgba(187, 134, 252, 0.3)`,
  },
  buttonDisabled: {
    background: '#444',
    color: '#888',
    cursor: 'not-allowed',
  },
  loader: {
      border: '4px solid rgba(255, 255, 255, 0.2)',
      borderTop: `4px solid ${colors.primary}`,
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      margin: '20px auto',
  },
  results: { marginTop: '10px' },
  sectionTitle: {
    fontSize: '1.5em',
    fontWeight: 600,
    color: colors.textPrimary,
    borderBottom: `2px solid ${colors.primary}`,
    paddingBottom: '8px',
    marginBottom: '20px',
  },
  resultCard: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    padding: '15px',
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
  },
  scoreCircle: (score) => ({
    width: 65,
    height: 65,
    borderRadius: '50%',
    background: `radial-gradient(closest-side, ${colors.surface} 79%, transparent 80% 100%), conic-gradient(${
      score > 0.5 ? colors.aiText : colors.humanText
    } ${score * 100}%, ${colors.border} 0)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: score > 0.5 ? colors.aiText : colors.humanText,
    flexShrink: 0,
  }),
  scoreText: { fontSize: '1em' },
  resultTextContainer: { flex: 1 },
  resultSentence: { margin: 0, color: colors.textSecondary },
  resultStatus: {
    margin: '8px 0 0',
    fontSize: '1.1em',
    fontWeight: '600',
  },
  aiLabel: { color: colors.aiText },
  humanLabel: { color: colors.humanText },
  leaderboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  leaderboardCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: colors.surface,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
  },
  leaderboardRank: {
    fontSize: '1.2em',
    fontWeight: '700',
    color: colors.primary,
    width: '30px',
  },
  leaderboardAvatar: { fontSize: '1.5em', marginRight: '12px' },
  leaderboardUser: { display: 'flex', flexDirection: 'column' },
  leaderboardName: { margin: 0, fontWeight: 600, color: colors.textPrimary },
  leaderboardDetections: {
    margin: 0,
    fontSize: '0.9em',
    color: colors.textSecondary,
  },
};
