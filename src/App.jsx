import { useState, useEffect } from "react";
import Login from "./Login";
import CoastingContentAgent from "./CoastingContentAgent";
import CoastingBlogGenerator from "./CoastingBlogGenerator";

// Patch both tools to use the secure proxy instead of Anthropic directly
const PROXY_URL = "/api/generate";

// Override fetch inside components by providing it via window
if (typeof window !== "undefined") {
  const _originalFetch = window.fetch;
  window.__coastingFetch = async (url, options) => {
    if (url.includes("anthropic.com")) {
      const session = sessionStorage.getItem("cp_session");
      const newOptions = {
        ...options,
        headers: {
          ...options?.headers,
          "x-session-token": session || "",
        },
      };
      return _originalFetch(PROXY_URL, newOptions);
    }
    return _originalFetch(url, options);
  };
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("content");

  // Check for existing session on load
  useEffect(() => {
    const session = sessionStorage.getItem("cp_session");
    if (session) setAuthed(true);
  }, []);

  // Patch fetch when authed
  useEffect(() => {
    if (authed && window.__coastingFetch) {
      window._patchedFetch = window.fetch;
      window.fetch = window.__coastingFetch;
    }
    return () => {
      if (window._patchedFetch) window.fetch = window._patchedFetch;
    };
  }, [authed]);

  const handleLogout = () => {
    sessionStorage.removeItem("cp_session");
    setAuthed(false);
  };

  if (!authed) return <Login onAuth={() => setAuthed(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF" }}>
      {/* Top nav */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A5C 0%, #0D2238 100%)",
        borderBottom: "3px solid #C9A96E", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px 14px 0", borderRight: "1px solid #2A4A6A", marginRight: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #C9A96E, #A8834A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🏄</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#F7F4EF", fontFamily: "'Georgia', serif" }}>Coasting Properties</span>
          </div>
          {/* Tabs */}
          {[
            { id: "content", label: "📱 Social Content" },
            { id: "blog", label: "✍️ Blog Generator" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: "18px 20px", border: "none", background: "transparent",
                color: tab === t.id ? "#C9A96E" : "#7A9BB5",
                cursor: "pointer", fontSize: 13, fontFamily: "sans-serif",
                fontWeight: tab === t.id ? 700 : 400,
                borderBottom: tab === t.id ? "3px solid #C9A96E" : "3px solid transparent",
                marginBottom: "-3px"
              }}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={handleLogout}
          style={{ padding: "6px 14px", borderRadius: 7, border: "1px solid #2A4A6A", background: "transparent", color: "#7A9BB5", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif" }}>
          Sign Out
        </button>
      </div>

      {/* Tool panels */}
      <div style={{ display: tab === "content" ? "block" : "none" }}>
        <CoastingContentAgent />
      </div>
      <div style={{ display: tab === "blog" ? "block" : "none" }}>
        <CoastingBlogGenerator />
      </div>
    </div>
  );
}
