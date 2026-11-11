
import { useEffect, useRef, useState } from "react";

const testSongs = [
  {
    title: "Midnight Memories",
    artist: "The Dreamers",
    icon: "🌙",
    gradient: "linear-gradient(135deg, #654ea3, #eaafc8)",
  },
  {
    title: "Ocean Lights",
    artist: "Nova Blue",
    icon: "🌊",
    gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)",
  },
  {
    title: "Golden Hour",
    artist: "Summer Days",
    icon: "☀️",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
  },
  {
    title: "After the Rain",
    artist: "Cloud Nine",
    icon: "🌧️",
    gradient: "linear-gradient(135deg, #373b44, #4286f4)",
  },
];

function App() {
  const urlParams = new URLSearchParams(window.location.search);

  const CHANNEL_NAME = urlParams.get("channel");
  const IS_OVERLAY = urlParams.get("overlay") === "true";

  const [visible, setVisible] = useState(true);
  const [songIndex, setSongIndex] = useState(0);

  const timerRef = useRef<number | null>(null);

  const currentSong = testSongs[songIndex];

  // Show notification for approximately 5 seconds.
  const showNotification = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setVisible(true);

    timerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 4650);
  };

  // Simulate a new song starting.
  const playNextSong = () => {
    setSongIndex((previous) => (previous + 1) % testSongs.length);
    showNotification();
  };

  useEffect(() => {
    showNotification();

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!CHANNEL_NAME) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        Please add ?channel=YOUR_TWITCH_USERNAME to the URL.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "10px",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      {/* SONG NOTIFICATION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          width: "320px",
          maxHeight: visible ? "100px" : "0px",
          padding: visible ? "12px" : "0 12px",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.07))",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.28)",
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.20),
            inset 0 1px 1px rgba(255,255,255,0.30)
          `,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition:
            "opacity 350ms ease, transform 350ms ease, max-height 350ms ease, padding 350ms ease",
          pointerEvents: "none",
        }}
      >
        {/* SAMPLE ALBUM ART */}
        <div
          style={{
            width: "58px",
            height: "58px",
            minWidth: "58px",
            borderRadius: "8px",
            background: currentSong.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "27px",
          }}
        >
          {currentSong.icon}
        </div>

        {/* SONG INFORMATION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              color: "#1DB954",
              fontSize: "10px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            ♫ NOW PLAYING
          </span>

          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentSong.title}
          </span>

          <span
            style={{
              color: "#b3b3b3",
              fontSize: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentSong.artist}
          </span>
        </div>
      </div>

      {/* EDITOR TEST BUTTON */}
      {!IS_OVERLAY && (
        <button
          onClick={playNextSong}
          style={{
            width: "fit-content",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            background: "#1DB954",
            color: "#111",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Next test song
        </button>
      )}
    </div>
  );
}

export default App;
