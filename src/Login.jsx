import { useState } from "react";

export default function Login({ onAuth }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Hash the entered password and compare to stored hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password + (process.env.REACT_APP_SALT || "coasting2026"));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (hashHex === process.env.REACT_APP_PASSWORD_HASH) {
      // Store session token (hashed password acts as token)
      sessionStorage.setItem("cp_session", process.env.REACT_APP_SESSION_SECRET || hashHex);
      onAuth();
    } else {
      setError(true);
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F7F4EF", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif"
    }}>
      <div style={{
        background: "white", borderRadius: 16, border: "1px solid #E0D8CC",
        padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #C9A96E, #A8834A)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, margin: "0 auto 20px"
        }}>🏄</div>

        <h1 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#1A1A1A" }}>
          Coasting Properties
        </h1>
        <p style={{ margin: "0 0 32px", fontSize: 13, color: "#888", fontFamily: "sans-serif" }}>
          Content Tools — Private Access
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 9,
              border: `1px solid ${error ? "#F5BCBC" : "#D0C8BC"}`,
              fontSize: 14, fontFamily: "sans-serif", outline: "none",
              boxSizing: "border-box", marginBottom: 12,
              background: error ? "#FFF8F8" : "white"
            }}
          />
          {error && (
            <p style={{ margin: "0 0 12px", fontSize: 12, color: "#C0392B", fontFamily: "sans-serif" }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button type="submit" disabled={loading || !password}
            style={{
              width: "100%", padding: "12px", borderRadius: 9, border: "none",
              background: loading || !password ? "#D0C8BC" : "linear-gradient(135deg, #1B3A5C, #0D2238)",
              color: loading || !password ? "#888" : "white",
              cursor: loading || !password ? "not-allowed" : "pointer",
              fontSize: 14, fontWeight: 700, fontFamily: "sans-serif"
            }}>
            {loading ? "Checking..." : "Sign In →"}
          </button>
        </form>

        <p style={{ margin: "24px 0 0", fontSize: 11, color: "#BBB", fontFamily: "sans-serif" }}>
          coastingproperties.com · Internal tools
        </p>
      </div>
    </div>
  );
}
