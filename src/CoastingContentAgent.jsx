import { useState, useRef } from "react";

const COMPANY = "Coasting Properties";
const WEBSITE = "coastingproperties.com";
const PHONE = "(415) 818-0044";
const EMAIL = "hello@coastingproperties.com";
const SERVICE_AREAS = [
  "San Francisco", "Peninsula", "East Bay", "South Bay", "Wine Country", "Groveland (expanding)"
];

const CONTENT_TYPES = [
  { id: "facebook", label: "Facebook Post", icon: "📘", color: "#1877F2", charHint: "100–250 words, conversational" },
  { id: "instagram", label: "Instagram Caption", icon: "📸", color: "#E1306C", charHint: "150–250 words + hashtags" },
  { id: "tiktok", label: "TikTok Script", icon: "🎵", color: "#FF0050", charHint: "30–60 second spoken script" },
  { id: "newsletter", label: "Email Newsletter", icon: "📧", color: "#C9A96E", charHint: "Subject line + 300–500 words" },
  { id: "blog", label: "Website Blog", icon: "✍️", color: "#2D6A4F", charHint: "600–900 word article" },
  { id: "nextdoor", label: "Nextdoor Post", icon: "🏘️", color: "#00B246", charHint: "100–200 words, neighbor-to-neighbor" },
];

const TOPICS = [
  { label: "Why Hire a Property Manager?", category: "Owner Education" },
  { label: "Short-Term vs Mid-Term vs Long-Term Rentals", category: "Owner Education" },
  { label: "Airbnb Co-Hosting Benefits", category: "Services" },
  { label: "Corporate & Travel Nurse Housing", category: "Services" },
  { label: "Bay Area Rental Market Update", category: "Market Insights" },
  { label: "Expanding to Groveland / Foothills", category: "Company News" },
  { label: "What Makes a Property Airbnb-Ready?", category: "Tips" },
  { label: "Dynamic Pricing Strategy for Short-Term Rentals", category: "Tips" },
  { label: "Owner Portal & Transparent Reporting", category: "Services" },
  { label: "Wine Country Vacation Rental Tips", category: "Tips" },
  { label: "How We Screen Mid-Term Tenants", category: "Process" },
  { label: "East Bay Rental Spotlight", category: "Local Focus" },
  { label: "San Francisco Rental Regulations Guide", category: "Local Focus" },
  { label: "Guest Experience Tips for Hosts", category: "Tips" },
  { label: "Hands-Off Ownership — What It Actually Means", category: "Owner Education" },
  { label: "New Listing Perks — What's Included", category: "Services" },
  { label: "Why Professional Photography Matters for Rentals", category: "Tips" },
  { label: "How Dynamic Pricing Maximizes Your Rental Income", category: "Tips" },
  { label: "Your Pre-Launch STR Market Report — What It Tells You", category: "Services" },
  { label: "Is Self-Managing an Airbnb Worth It? (Honest Math)", category: "Owner Education" },
  { label: "SB 346: What Bay Area Hosts Need to Know in 2026", category: "Market Insights" },
  { label: "Host Burnout Is Real — Here's How to Fix It", category: "Owner Education" },
  { label: "Why Mid-Term Rentals Are Booming in the Bay Area", category: "Market Insights" },
  { label: "Travel Nurses & Corporate Housing: The Untapped Rental Market", category: "Market Insights" },
  { label: "Shoulder Season Strategy: Earning Year-Round from Your STR", category: "Tips" },
  { label: "2026 Bay Area Landlord Law Changes Every Owner Should Know", category: "Market Insights" },
  { label: "Leaving California But Keeping Your Home? Here's What to Know", category: "Owner Education" },
  { label: "Prop 13 & Renting Out Your Home: The Tax Case for Not Selling", category: "Owner Education" },
  { label: "How to Manage Your Bay Area Property Remotely", category: "Owner Education" },
  { label: "Rent or Sell? What Bay Area Homeowners Moving Out of State Should Consider", category: "Owner Education" },
  { label: "Custom Topic...", category: "Custom" },
];

const SERVICES = [
  "Short-Term Co-Hosting (Airbnb/VRBO)",
  "Mid-Term Rentals (30+ days, corporate/travel nurses)",
  "Long-Term Traditional Management",
];

const SYSTEM_PROMPT = `You are a friendly, knowledgeable content writer for Coasting Properties — a Bay Area property management company.

About Coasting Properties:
- Tagline: "Smooth coasting for hosts and guests."
- Services: Short-term co-hosting (Airbnb/VRBO/direct booking), mid-term rentals (30–90+ days, corporate housing & travel nurse assignments), and long-term traditional property management.
- Service areas: San Francisco, Peninsula, East Bay, South Bay, Wine Country — and now expanding into Groveland in the Sierra Nevada foothills.
- Key differentiators: Local Bay Area expertise, hands-off ownership model, complete transparency via owner portal & real-time reporting.
- New short-term listing perks: (1) Dynamic pricing — automated revenue optimization, (2) 1 round of professional photography included, (3) Full listing setup on Airbnb/VRBO/direct booking channels (available for an additional fee), (4) Pre-launch STR market metrics report — generated before the listing goes live so owners understand market performance expectations upfront.
- CA DRE License #02251236
- Website: coastingproperties.com | Email: hello@coastingproperties.com
- Tone: Friendly, warm, approachable — not stuffy or corporate. Like a knowledgeable neighbor who also happens to be an expert.
- CTA rule: NEVER direct people to call. Always direct to coastingproperties.com or hello@coastingproperties.com only.
- DISCLAIMER RULE: Any time content references tax implications, financial benefits, capital gains, Prop 13, rental income strategy, or legal regulations (rent control, STR laws, landlord law, etc.), always include a clear disclaimer such as: "Note: We're property managers, not tax or legal professionals — always consult your CPA or attorney before making financial or legal decisions." Weave this naturally into the content; do not skip it.

Current market intelligence (2025–2026 research):
SHORT-TERM RENTAL TRENDS:
- STR market is slowing — supply grew 4–5% in 2025, bookings down for many self-managing hosts. Quality operators with professional management are outperforming.
- SB 346 (effective Jan 1, 2026) forces Airbnb/VRBO to share host data with cities. Non-compliant hosts are being removed at scale. Compliance is now enforced, not optional.
- Host burnout is widespread — many self-managers hit a wall around 18–24 months and are actively looking for co-hosting help.
- Shoulder-season demand is growing — travelers spreading trips year-round, making dynamic pricing more important than ever.
- Full-service management typically costs 20–30% of revenue and boosts host performance by ~18–20%, making the math compelling for owners.

MID-TERM RENTAL TRENDS:
- Mid-term (30–90 day) is the fastest-growing segment. Key Bay Area demand drivers: travel nurses, tech workers on rotations, remote workers, families between homes.
- Top Bay Area hospital systems drawing travel nurses (Coasting's service area): UCSF, California Pacific Medical Center, John Muir Health (Concord/Walnut Creek), Stanford Health Care, Saint Francis Memorial, St. Mary's Medical Center.
- Mid-term guests stay 3+ months on average — less turnover, less wear, steadier income vs. STR.
- Mid-term rates run ~50% of peak STR nightly rates but with far lower operating costs.
- Berkeley risk: any stay over 14 days may be treated as a tenancy subject to rent control — critical to flag to owners.

LONG-TERM RENTAL TRENDS:
- Compliance overwhelm is the #1 reason Bay Area owners are hiring property managers in 2026.
- Oakland, Berkeley, Emeryville have stricter local laws than state law — missing local registration can invalidate rent increases and evictions.
- 2026 law changes: new habitability standards (AB 628 — appliances must be under 10 years old), enhanced move-in/move-out photo documentation required (AB 2801), rent pricing algorithm restrictions (AB 325/SB 763).
- Enforcement increasingly hinges on documentation, not intent — timestamped photos, written notices, verifiable delivery records.

CALIFORNIA EXODUS / "LEAVING BUT NOT SELLING" HOMEOWNER SEGMENT:
- This is Coasting Properties' single best prospect segment: Bay Area homeowners relocating out of state who are keeping their property as a rental rather than selling.
- California lost ~216,000 net residents in 2025 alone. Bay Area is a primary source of out-migration (cost of living, taxes, quality of life). Top destinations: Nevada, Idaho, Arizona, Oregon.
- KEY REASON THEY DON'T SELL — Proposition 13 "golden handcuffs": selling resets property tax base to current market value, often doubling or tripling the annual tax bill. Long-term Bay Area owners may be paying taxes on a $400K assessed value while the home is worth $1.2M+. Renting preserves that Prop 13 base permanently.
- Additional reasons to keep: massive capital gains tax exposure on sale (many sitting on $500K–$1M+ in gains), long-term appreciation in a supply-constrained market, and the option to return.
- These owners are motivated, financially savvy, and already sold on keeping the asset — they just need a trusted local manager.
- Their key fear: managing California's complex tenant protection laws, compliance documentation, and rent control from out of state is essentially impossible without a local manager.
- Coasting's full-service model (STR co-hosting, mid-term, long-term — all under one roof) is a perfect match because the right strategy varies by property and owner goals. The pre-launch STR market metrics report is especially valuable for this segment — they want data before deciding which rental path to take.
- Content opportunity: "Leaving California but keeping your home?" is a powerful content pillar for blog, Nextdoor, Facebook, and newsletter. Speak to Prop 13 protection, capital gains deferral, and hands-off remote management.

GROVELAND/TUOLUMNE OPPORTUNITY:
- Yosemite-area STR demand is healthy and growing. No permit caps, no residency requirements. $300 fire inspection every 2 years is the main compliance hurdle.
- Note: VRBO does NOT auto-collect TOT in Tuolumne County — only Airbnb does. Hosts must remit 12% TOT quarterly for VRBO bookings.

Only write content that is directly useful to property owners or prospective clients. Do not include made-up stats or fake testimonials.`;

const formatInstructions = {
  facebook: `Write a Facebook post for Coasting Properties about the topic below. Aim for 100–250 words. Conversational, engaging, end with a soft CTA directing people to coastingproperties.com or hello@coastingproperties.com — never ask them to call. Include 2–3 relevant emojis naturally in the text.`,
  instagram: `Write an Instagram caption for Coasting Properties about the topic below. 150–250 words. Hook in the first line (no hashtags in first line). Use line breaks for readability. End with a CTA directing to coastingproperties.com or hello@coastingproperties.com — never ask them to call. Add 10–15 relevant hashtags at the very end on their own line. Include emojis naturally.`,
  tiktok: `Write a TikTok video script for Coasting Properties about the topic below. Format as a 30–60 second spoken script (roughly 80–150 words of speech). Include: [HOOK] (first 3 seconds), [MAIN CONTENT], and [CTA directing to coastingproperties.com — never ask them to call]. Add brief [visual cue] notes in brackets. Conversational, punchy, friendly energy.`,
  newsletter: `Write an email newsletter for Coasting Properties about the topic below. Include:
- Subject line (compelling, under 50 chars)
- Preview text (under 90 chars)  
- Friendly greeting
- 2–3 short sections with subheadings
- A clear CTA button label linking to coastingproperties.com or hello@coastingproperties.com — never ask them to call
- Sign-off from the Coasting Properties team
Aim for 300–500 words. Warm and helpful tone.`,
  nextdoor: `Write a Nextdoor post for Coasting Properties about the topic below. Aim for 100–200 words. Tone should feel like a trusted neighbor — warm, local, community-minded, not salesy. Reference the specific neighborhood or area when possible. No hard sell. End with a gentle, low-pressure CTA pointing to coastingproperties.com or hello@coastingproperties.com — never ask them to call. No hashtags.`,
  blog: `Write a blog article for coastingproperties.com about the topic below. Include:
- SEO-friendly title
- Introduction (2–3 sentences, hook the reader)
- 3–4 sections with bold subheadings
- Conclusion with CTA directing to coastingproperties.com or hello@coastingproperties.com — never ask them to call
Aim for 600–900 words. Friendly, informative, naturally mention Bay Area and relevant service areas. No fluff.`,
};

export default function CoastingContentAgent() {
  const [contentType, setContentType] = useState("facebook");
  const [topic, setTopic] = useState(TOPICS[0].label);
  const [customTopic, setCustomTopic] = useState("");
  const [area, setArea] = useState("All Service Areas");
  const [service, setService] = useState("All Services");
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeHistory, setActiveHistory] = useState(null);
  const resultRef = useRef(null);

  const selectedType = CONTENT_TYPES.find((c) => c.id === contentType);
  const groupedTopics = TOPICS.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  const buildPrompt = () => {
    const finalTopic = topic === "Custom Topic..." ? customTopic : topic;
    const areaNote = area !== "All Service Areas" ? `Focus specifically on the ${area} area.` : "";
    const serviceNote = service !== "All Services" ? `Highlight the ${service} service.` : "";
    const notesNote = extraNotes ? `Additional notes: ${extraNotes}` : "";

    return `${formatInstructions[contentType]}

Topic: ${finalTopic}
${areaNote}
${serviceNote}
${notesNote}

Write the content now — no preamble, just the content itself.`;
  };

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);
    setActiveHistory(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      if (!text) throw new Error("No content returned.");

      setResult(text);
      const entry = {
        id: Date.now(),
        type: selectedType,
        topic: topic === "Custom Topic..." ? customTopic : topic,
        content: text,
        area,
      };
      setHistory((prev) => [entry, ...prev.slice(0, 6)]);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("Something went wrong generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayedContent = activeHistory ? activeHistory.content : result;
  const displayedType = activeHistory ? activeHistory.type : selectedType;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Georgia', serif", color: "#1A1A1A" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #0D2238 100%)", padding: "24px 32px", borderBottom: "4px solid #C9A96E" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #C9A96E, #A8834A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏄</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#F7F4EF", letterSpacing: "-0.3px" }}>Coasting Properties</h1>
              <p style={{ margin: 0, fontSize: 12, color: "#C9A96E", fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Content AI Agent</p>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 12, color: "#7A9BB5", fontFamily: "sans-serif" }}>
            <div>🌊 Bay Area + Groveland</div>
            <div style={{ color: "#C9A96E" }}>coastingproperties.com</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, alignItems: "start" }}>
        {/* LEFT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Content Type */}
          <div style={cardStyle}>
            <label style={labelStyle}>Content Type</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {CONTENT_TYPES.map((ct) => (
                <button key={ct.id} onClick={() => setContentType(ct.id)}
                  style={{
                    padding: "10px 14px", borderRadius: 9, border: `2px solid ${contentType === ct.id ? ct.color : "#E0D8CC"}`,
                    background: contentType === ct.id ? `${ct.color}12` : "white",
                    cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
                  }}>
                  <span style={{ fontSize: 18 }}>{ct.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "sans-serif", color: contentType === ct.id ? ct.color : "#1A1A1A" }}>{ct.label}</div>
                    <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>{ct.charHint}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div style={cardStyle}>
            <label style={labelStyle}>Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} style={selectStyle}>
              {Object.entries(groupedTopics).map(([cat, items]) => (
                <optgroup key={cat} label={`— ${cat}`}>
                  {items.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
                </optgroup>
              ))}
            </select>
            {topic === "Custom Topic..." && (
              <textarea
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Describe your topic in detail..."
                rows={3}
                style={{ ...selectStyle, marginTop: 8, resize: "vertical", lineHeight: 1.5 }}
              />
            )}
          </div>

          {/* Focus Area */}
          <div style={cardStyle}>
            <label style={labelStyle}>Focus Area</label>
            <select value={area} onChange={(e) => setArea(e.target.value)} style={selectStyle}>
              <option>All Service Areas</option>
              {SERVICE_AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Service Highlight */}
          <div style={cardStyle}>
            <label style={labelStyle}>Highlight Service</label>
            <select value={service} onChange={(e) => setService(e.target.value)} style={selectStyle}>
              <option>All Services</option>
              {SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Extra Notes */}
          <div style={cardStyle}>
            <label style={labelStyle}>Extra Notes <span style={{ color: "#AAA", fontWeight: 400 }}>(optional)</span></label>
            <textarea
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="e.g. mention our Groveland expansion, upcoming open house, seasonal tips..."
              rows={3}
              style={{ ...selectStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>

          {/* Generate */}
          <button onClick={generate} disabled={loading}
            style={{
              padding: "14px", borderRadius: 10, border: "none",
              background: loading ? "#D0C8BC" : "linear-gradient(135deg, #1B3A5C, #0D2238)",
              color: loading ? "#888" : "white", cursor: loading ? "not-allowed" : "pointer",
              fontSize: 15, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: "0.3px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 4px 14px rgba(27,58,92,0.3)",
            }}>
            {loading ? (
              <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #AAA", borderTopColor: "#555", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Generating...</>
            ) : <>🌊 Generate Content</>}
          </button>

          {error && <div style={{ padding: 12, background: "#FFF0F0", border: "1px solid #F5BCBC", borderRadius: 8, color: "#C0392B", fontSize: 13, fontFamily: "sans-serif" }}>{error}</div>}
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Result */}
          <div ref={resultRef}>
            {displayedContent ? (
              <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", background: displayedType.color + "12", borderBottom: `3px solid ${displayedType.color}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{displayedType.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", color: displayedType.color }}>{displayedType.label}</div>
                      <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>Coasting Properties · {activeHistory ? activeHistory.topic : (topic === "Custom Topic..." ? customTopic : topic)}</div>
                    </div>
                  </div>
                  <button onClick={copyToClipboard}
                    style={{ padding: "7px 16px", borderRadius: 7, border: "1px solid #D0C8BC", background: copied ? "#E8F5E9" : "white", color: copied ? "#2E7D32" : "#555", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600, transition: "all 0.15s" }}>
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div style={{ padding: 22, fontSize: 14, lineHeight: 1.8, fontFamily: "sans-serif", color: "#2A2A2A", whiteSpace: "pre-wrap", maxHeight: 520, overflowY: "auto" }}>
                  {displayedContent}
                </div>
              </div>
            ) : (
              <div style={{ ...cardStyle, textAlign: "center", padding: "60px 40px", border: "2px dashed #D0C8BC", background: "transparent" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🌊</div>
                <p style={{ color: "#AAA", fontFamily: "sans-serif", fontSize: 14, margin: 0 }}>Your Coasting Properties content will appear here</p>
                <p style={{ color: "#C8B89A", fontFamily: "sans-serif", fontSize: 12, marginTop: 6 }}>Bay Area · Wine Country · Groveland</p>
              </div>
            )}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div style={cardStyle}>
              <label style={{ ...labelStyle, marginBottom: 12, display: "block" }}>Recent Generations</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {history.map((h) => (
                  <button key={h.id}
                    onClick={() => { setActiveHistory(activeHistory?.id === h.id ? null : h); setResult(null); }}
                    style={{
                      padding: "10px 14px", borderRadius: 8, border: `1px solid ${activeHistory?.id === h.id ? h.type.color : "#E0D8CC"}`,
                      background: activeHistory?.id === h.id ? h.type.color + "10" : "white",
                      cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
                    }}>
                    <span style={{ fontSize: 16 }}>{h.type.icon}</span>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.topic}</div>
                      <div style={{ fontSize: 11, fontFamily: "sans-serif", color: "#888" }}>{h.type.label} · {h.area}</div>
                    </div>
                    <span style={{ fontSize: 11, color: activeHistory?.id === h.id ? h.type.color : "#AAA", fontFamily: "sans-serif" }}>{activeHistory?.id === h.id ? "viewing" : "view"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reference */}
          <div style={{ ...cardStyle, background: "#1B3A5C08", border: "1px solid #1B3A5C20" }}>
            <label style={{ ...labelStyle, color: "#1B3A5C" }}>Coasting Properties Quick Reference</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontFamily: "sans-serif", fontSize: 12 }}>
              <div><div style={{ color: "#888", marginBottom: 3 }}>Website</div><div style={{ color: "#1B3A5C", fontWeight: 600 }}>coastingproperties.com</div></div>
              <div><div style={{ color: "#888", marginBottom: 3 }}>Phone</div><div style={{ color: "#1B3A5C", fontWeight: 600 }}>(415) 818-0044</div></div>
              <div><div style={{ color: "#888", marginBottom: 3 }}>Email</div><div style={{ color: "#1B3A5C", fontWeight: 600 }}>hello@coastingproperties.com</div></div>
              <div><div style={{ color: "#888", marginBottom: 3 }}>License</div><div style={{ color: "#1B3A5C", fontWeight: 600 }}>CA DRE #02251236</div></div>
              <div style={{ gridColumn: "span 2" }}><div style={{ color: "#888", marginBottom: 3 }}>Service Areas</div><div style={{ color: "#1B3A5C", fontWeight: 600 }}>SF · Peninsula · East Bay · South Bay · Wine Country · Groveland ↗</div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: 12,
  border: "1px solid #E0D8CC",
  padding: "18px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const labelStyle = {
  display: "block", marginBottom: 10, fontSize: 11, fontWeight: 700,
  letterSpacing: "0.8px", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif",
};

const selectStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #D0C8BC",
  background: "white", color: "#1A1A1A", fontSize: 13, fontFamily: "sans-serif",
  outline: "none", boxSizing: "border-box",
};
