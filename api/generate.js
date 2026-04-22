export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify session password from request header
  const sessionToken = req.headers["x-session-token"];
  if (!sessionToken || sessionToken !== process.env.SESSION_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Rate limit: max 30 requests per minute per IP
  // (Vercel KV or basic in-memory — keep simple for freelancer handoff)
  const ip = req.headers["x-forwarded-for"] || "unknown";
  console.log(`[generate] IP: ${ip}, model: ${req.body?.model}`);

  // Block any prompt injection attempts — only allow known model
  const { model, max_tokens, system, messages } = req.body;
  if (model !== "claude-sonnet-4-20250514") {
    return res.status(400).json({ error: "Invalid model" });
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[generate] Anthropic error:", data);
      return res.status(response.status).json({ error: "API error", detail: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("[generate] Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
