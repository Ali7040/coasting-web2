import { useState, useRef } from "react";

const BLOG_TOPICS = [
  { label: "Why Hire a Property Manager in the Bay Area?", category: "Owner Education", slug: "why-hire-property-manager-bay-area" },
  { label: "Short-Term vs Mid-Term vs Long-Term Rentals: Which Is Right for You?", category: "Owner Education", slug: "short-term-vs-mid-term-vs-long-term-rentals" },
  { label: "Leaving California But Keeping Your Home? Here's What to Know", category: "Owner Education", slug: "leaving-california-keeping-home-rental" },
  { label: "Prop 13 & Renting Out Your Home: The Tax Case for Not Selling", category: "Owner Education", slug: "prop-13-renting-home-tax-case" },
  { label: "How to Manage Your Bay Area Property Remotely", category: "Owner Education", slug: "manage-bay-area-property-remotely" },
  { label: "Rent or Sell? What Bay Area Homeowners Moving Out of State Should Consider", category: "Owner Education", slug: "rent-or-sell-bay-area-moving-out-of-state" },
  { label: "Is Self-Managing an Airbnb Worth It? (Honest Math)", category: "Owner Education", slug: "self-managing-airbnb-worth-it" },
  { label: "Hands-Off Ownership — What It Actually Means", category: "Owner Education", slug: "hands-off-ownership-what-it-means" },
  { label: "Host Burnout Is Real — Here's How to Fix It", category: "Owner Education", slug: "airbnb-host-burnout-how-to-fix" },
  { label: "Airbnb Co-Hosting: What It Is and How It Works", category: "Services", slug: "airbnb-co-hosting-what-it-is" },
  { label: "Corporate & Travel Nurse Housing in the Bay Area", category: "Services", slug: "corporate-travel-nurse-housing-bay-area" },
  { label: "New Short-Term Listing Perks — What's Included with Coasting Properties", category: "Services", slug: "new-short-term-listing-perks" },
  { label: "Your Pre-Launch STR Market Report — What It Tells You", category: "Services", slug: "pre-launch-str-market-report" },
  { label: "Bay Area Rental Market Update 2026", category: "Market Insights", slug: "bay-area-rental-market-update-2026" },
  { label: "SB 346: What Bay Area Hosts Need to Know in 2026", category: "Market Insights", slug: "sb-346-bay-area-hosts-2026" },
  { label: "Why Mid-Term Rentals Are Booming in the Bay Area", category: "Market Insights", slug: "mid-term-rentals-booming-bay-area" },
  { label: "Travel Nurses & Corporate Housing: The Untapped Rental Market", category: "Market Insights", slug: "travel-nurses-corporate-housing-rental-market" },
  { label: "2026 Bay Area Landlord Law Changes Every Owner Should Know", category: "Market Insights", slug: "bay-area-landlord-law-changes-2026" },
  { label: "Why Groveland Is a Smart STR Investment Right Now", category: "Market Insights", slug: "groveland-str-investment-2026" },
  { label: "What Makes a Property Airbnb-Ready?", category: "Tips", slug: "what-makes-property-airbnb-ready" },
  { label: "Dynamic Pricing Strategy for Short-Term Rentals", category: "Tips", slug: "dynamic-pricing-strategy-short-term-rentals" },
  { label: "Shoulder Season Strategy: Earning Year-Round from Your STR", category: "Tips", slug: "shoulder-season-str-strategy" },
  { label: "Why Professional Photography Matters for Rentals", category: "Tips", slug: "professional-photography-rentals" },
  { label: "Guest Experience Tips for Hosts", category: "Tips", slug: "guest-experience-tips-hosts" },
  { label: "Wine Country Vacation Rental Tips", category: "Tips", slug: "wine-country-vacation-rental-tips" },
  { label: "San Francisco Short-Term Rental Regulations: A Host's Guide", category: "Local Focus", slug: "san-francisco-str-regulations-guide" },
  { label: "East Bay Rental Market Spotlight", category: "Local Focus", slug: "east-bay-rental-market-spotlight" },
  { label: "Custom Topic...", category: "Custom", slug: "" },
];

const SERVICE_AREAS = ["All Service Areas", "San Francisco", "Peninsula", "East Bay", "South Bay", "Wine Country", "Groveland"];

const SYSTEM_PROMPT = `You are an expert SEO content writer and property management specialist writing for Coasting Properties — a Bay Area property management company.

About Coasting Properties:
- Tagline: "Smooth coasting for hosts and guests."
- Services: Short-term co-hosting (Airbnb/VRBO/direct booking), mid-term rentals (30–90+ days, corporate housing & travel nurse assignments), and long-term traditional property management.
- Service areas: San Francisco, Peninsula, East Bay, South Bay, Wine Country — and now expanding into Groveland in the Sierra Nevada foothills.
- Key differentiators: Local Bay Area expertise, hands-off ownership model, complete transparency via owner portal & real-time reporting.
- New short-term listing perks: (1) Dynamic pricing, (2) 1 round of professional photography, (3) Full listing setup (additional fee), (4) Pre-launch STR market metrics report.
- CA DRE License #02251236 | coastingproperties.com | hello@coastingproperties.com
- Tone: Friendly, warm, expert — like a trusted local neighbor who knows Bay Area real estate inside and out.
- CTA rule: NEVER direct people to call. Always direct to coastingproperties.com or hello@coastingproperties.com.
- DISCLAIMER RULE: Whenever content references tax implications, financial benefits, capital gains, Prop 13, rental income strategy, or legal regulations, include: "Note: We're property managers, not tax or legal professionals — always consult your CPA or attorney before making financial or legal decisions." Weave this naturally; do not skip it.

Market intelligence:
- STR market slowing — professional management is outperforming self-managers. SB 346 (eff. Jan 2026) forces compliance.
- Host burnout peaks at 18–24 months of self-managing.
- Mid-term rentals (30–90 days) are the fastest-growing segment. Key demand: UCSF, CPMC, John Muir, Stanford, Saint Francis, St. Mary's travel nurses + tech workers.
- Long-term: compliance overwhelm driving owners to professional management. Oakland/Berkeley/Emeryville have stricter local laws.
- California exodus: ~216,000 net residents left in 2025. Bay Area homeowners keeping properties due to Prop 13 golden handcuffs and capital gains exposure.
- Groveland/Tuolumne: no permit caps, no residency req, $300 fire inspection every 2 years. VRBO does NOT auto-collect TOT — hosts remit 12% quarterly.`;

const BLOG_PROMPT = (topic, area, targetAudience, tone, extraNotes) => `Write a complete, SEO-optimized blog article for coastingproperties.com.

Topic: ${topic}
${area !== "All Service Areas" ? `Geographic focus: ${area}` : ""}
${targetAudience ? `Target audience: ${targetAudience}` : ""}
${tone ? `Tone: ${tone}` : "Tone: Friendly, informative, expert but approachable"}
${extraNotes ? `Additional notes: ${extraNotes}` : ""}

Return ONLY a valid JSON object with this exact structure — no markdown, no preamble:
{
  "title": "Full SEO-optimized blog title",
  "metaDescription": "160-character meta description for search engines",
  "slug": "url-friendly-slug",
  "readTime": "X min read",
  "category": "Category name",
  "excerpt": "2-3 sentence excerpt for blog listing page",
  "body": "Full blog article in HTML. Use <h2> for main sections, <h3> for subsections, <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis. 700–1000 words. Include natural internal logic, real Bay Area context, and a CTA at the end pointing to coastingproperties.com or hello@coastingproperties.com. Apply disclaimer where relevant."
}`;

const cardStyle = { background: "white", borderRadius: 12, border: "1px solid #E0D8CC", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" };
const labelStyle = { display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif" };
const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #D0C8BC", background: "white", color: "#1A1A1A", fontSize: 13, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };

export default function CoastingBlogAgent() {
  const [topic, setTopic] = useState(BLOG_TOPICS[0].label);
  const [customTopic, setCustomTopic] = useState("");
  const [area, setArea] = useState("All Service Areas");
  const [audience, setAudience] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [library, setLibrary] = useState([]);
  const [activeView, setActiveView] = useState("generate"); // "generate" | "library" | "preview"
  const [previewPost, setPreviewPost] = useState(null);
  const [copyState, setCopyState] = useState("");
  const resultRef = useRef(null);

  const groupedTopics = BLOG_TOPICS.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  const generate = async () => {
    const finalTopic = topic === "Custom Topic..." ? customTopic : topic;
    if (!finalTopic.trim()) return;
    setLoading(true);
    setError(null);
    setPost(null);
    setCopyState("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: BLOG_PROMPT(finalTopic, area, audience, "", extraNotes) }],
        }),
      });
      const data = await response.json();
      const raw = data.content?.map((b) => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const newPost = {
        ...parsed,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        area,
      };
      setPost(newPost);
      setLibrary((prev) => [newPost, ...prev]);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("Something went wrong generating the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopyState(key);
    setTimeout(() => setCopyState(""), 2000);
  };

  const displayPost = previewPost || post;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Georgia', serif", color: "#1A1A1A" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #0D2238 100%)", padding: "20px 32px", borderBottom: "4px solid #C9A96E" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #C9A96E, #A8834A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✍️</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#F7F4EF" }}>Coasting Properties</h1>
              <p style={{ margin: 0, fontSize: 11, color: "#C9A96E", fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Blog Content Generator</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["generate", "library"].map((v) => (
              <button key={v} onClick={() => { setActiveView(v); setPreviewPost(null); }}
                style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${activeView === v ? "#C9A96E" : "#2A4A6A"}`, background: activeView === v ? "#C9A96E20" : "transparent", color: activeView === v ? "#C9A96E" : "#7A9BB5", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600, textTransform: "capitalize" }}>
                {v === "library" ? `Library (${library.length})` : v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* GENERATE VIEW */}
        {activeView === "generate" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, alignItems: "start" }}>
            {/* Left controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={cardStyle}>
                <label style={labelStyle}>Blog Topic</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)} style={inputStyle}>
                  {Object.entries(groupedTopics).map(([cat, items]) => (
                    <optgroup key={cat} label={`— ${cat}`}>
                      {items.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
                    </optgroup>
                  ))}
                </select>
                {topic === "Custom Topic..." && (
                  <textarea value={customTopic} onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Describe your blog topic..." rows={3}
                    style={{ ...inputStyle, marginTop: 8, resize: "vertical", lineHeight: 1.5 }} />
                )}
              </div>

              <div style={cardStyle}>
                <label style={labelStyle}>Geographic Focus</label>
                <select value={area} onChange={(e) => setArea(e.target.value)} style={inputStyle}>
                  {SERVICE_AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div style={cardStyle}>
                <label style={labelStyle}>Target Audience <span style={{ color: "#AAA", fontWeight: 400 }}>(optional)</span></label>
                <input value={audience} onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. homeowners moving out of state, first-time landlords..." style={inputStyle} />
              </div>

              <div style={cardStyle}>
                <label style={labelStyle}>Extra Notes <span style={{ color: "#AAA", fontWeight: 400 }}>(optional)</span></label>
                <textarea value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)}
                  placeholder="e.g. mention Groveland expansion, include Prop 13 angle..." rows={3}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }} />
              </div>

              <button onClick={generate} disabled={loading}
                style={{ padding: "13px", borderRadius: 10, border: "none", background: loading ? "#D0C8BC" : "linear-gradient(135deg, #1B3A5C, #0D2238)", color: loading ? "#888" : "white", cursor: loading ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: loading ? "none" : "0 4px 14px rgba(27,58,92,0.3)" }}>
                {loading ? <><span style={{ width: 15, height: 15, border: "2px solid #AAA", borderTopColor: "#555", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />Writing article...</> : <>✍️ Generate Blog Post</>}
              </button>

              {error && <div style={{ padding: 12, background: "#FFF0F0", border: "1px solid #F5BCBC", borderRadius: 8, color: "#C0392B", fontSize: 13, fontFamily: "sans-serif" }}>{error}</div>}
            </div>

            {/* Right: result */}
            <div ref={resultRef}>
              {post ? (
                <PostCard post={post} copy={copy} copyState={copyState} onPreview={() => { setPreviewPost(post); setActiveView("preview"); }} />
              ) : (
                <div style={{ ...cardStyle, textAlign: "center", padding: "60px 40px", border: "2px dashed #D0C8CC", background: "transparent" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
                  <p style={{ color: "#AAA", fontFamily: "sans-serif", fontSize: 14, margin: 0 }}>Your blog post will appear here</p>
                  <p style={{ color: "#C8B89A", fontFamily: "sans-serif", fontSize: 12, marginTop: 6 }}>SEO title · Meta description · Full article · HTML export</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LIBRARY VIEW */}
        {activeView === "library" && (
          <div>
            {library.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: "#AAA", fontFamily: "sans-serif" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
                <p>No posts yet — generate your first blog post to see it here.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                {library.map((p) => (
                  <div key={p.id} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 11, fontFamily: "sans-serif", color: "#C9A96E", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>{p.category} · {p.date}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.35, color: "#1A1A1A" }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#666", fontFamily: "sans-serif", lineHeight: 1.6, flex: 1 }}>{p.excerpt}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, padding: "3px 8px", background: "#F0EBE0", borderRadius: 20, fontFamily: "sans-serif", color: "#888" }}>{p.readTime}</span>
                      {p.area !== "All Service Areas" && <span style={{ fontSize: 11, padding: "3px 8px", background: "#EAF3F0", borderRadius: 20, fontFamily: "sans-serif", color: "#2D6A4F" }}>{p.area}</span>}
                    </div>
                    <button onClick={() => { setPreviewPost(p); setActiveView("preview"); }}
                      style={{ padding: "8px", borderRadius: 8, border: "1px solid #D0C8BC", background: "white", color: "#1B3A5C", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600 }}>
                      View Full Post →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PREVIEW VIEW */}
        {activeView === "preview" && displayPost && (
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <button onClick={() => { setActiveView(previewPost ? "library" : "generate"); setPreviewPost(null); }}
              style={{ marginBottom: 20, padding: "7px 14px", borderRadius: 8, border: "1px solid #D0C8BC", background: "white", color: "#666", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif" }}>
              ← Back
            </button>
            <PostCard post={displayPost} copy={copy} copyState={copyState} expanded />
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function PostCard({ post, copy, copyState, onPreview, expanded }) {
  const [tab, setTab] = useState("preview");

  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #E0D8CC", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Post header */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid #F0EBE0", background: "#FDFAF6" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontFamily: "sans-serif", color: "#C9A96E", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6 }}>
              {post.category} · {post.readTime} · {post.date}
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: "#1A1A1A" }}>{post.title}</h2>
          </div>
          {!expanded && onPreview && (
            <button onClick={onPreview}
              style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 8, border: "1px solid #D0C8BC", background: "white", color: "#1B3A5C", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600 }}>
              Full Preview
            </button>
          )}
        </div>
      </div>

      {/* SEO meta */}
      <div style={{ padding: "14px 22px", background: "#F7F4EF", borderBottom: "1px solid #E8E0D0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: "sans-serif", color: "#AAA", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 4 }}>URL Slug</div>
          <div style={{ fontSize: 12, fontFamily: "monospace", color: "#1B3A5C", background: "white", padding: "5px 8px", borderRadius: 6, border: "1px solid #E0D8CC", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>/{post.slug}</span>
            <CopyBtn text={`/${post.slug}`} copied={copyState === "slug"} onCopy={() => copy(`/${post.slug}`, "slug")} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontFamily: "sans-serif", color: "#AAA", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 4 }}>Meta Description</div>
          <div style={{ fontSize: 12, fontFamily: "sans-serif", color: "#444", background: "white", padding: "5px 8px", borderRadius: 6, border: "1px solid #E0D8CC", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, lineHeight: 1.5 }}>
            <span>{post.metaDescription}</span>
            <CopyBtn text={post.metaDescription} copied={copyState === "meta"} onCopy={() => copy(post.metaDescription, "meta")} />
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", borderBottom: "1px solid #E0D8CC" }}>
        {["preview", "html"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "10px", border: "none", background: tab === t ? "white" : "#FDFAF6", color: tab === t ? "#1B3A5C" : "#999", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: tab === t ? 700 : 400, borderBottom: tab === t ? "2px solid #C9A96E" : "2px solid transparent" }}>
            {t === "preview" ? "📄 Article Preview" : "💻 HTML Export"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "22px", maxHeight: expanded ? "none" : 520, overflowY: "auto" }}>
        {tab === "preview" ? (
          <div style={{ fontFamily: "sans-serif", fontSize: 15, lineHeight: 1.8, color: "#2A2A2A" }}
            dangerouslySetInnerHTML={{ __html: post.body }} />
        ) : (
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 8, right: 8 }}>
              <CopyBtn text={post.body} copied={copyState === "html"} onCopy={() => copy(post.body, "html")} label="Copy HTML" />
            </div>
            <pre style={{ margin: 0, fontSize: 11, fontFamily: "monospace", color: "#444", background: "#F7F4EF", padding: "16px", borderRadius: 8, overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6 }}>
              {post.body}
            </pre>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div style={{ padding: "14px 22px", borderTop: "1px solid #E0D8CC", background: "#FDFAF6", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <ActionBtn label={copyState === "full" ? "✓ Copied!" : "Copy Full HTML"} onClick={() => copy(post.body, "full")} primary />
        <ActionBtn label={copyState === "title" ? "✓ Copied!" : "Copy Title"} onClick={() => copy(post.title, "title")} />
        <ActionBtn label={copyState === "excerpt" ? "✓ Copied!" : "Copy Excerpt"} onClick={() => copy(post.excerpt, "excerpt")} />
      </div>
    </div>
  );
}

function CopyBtn({ text, copied, onCopy, label }) {
  return (
    <button onClick={onCopy}
      style={{ flexShrink: 0, padding: "2px 8px", borderRadius: 5, border: "1px solid #D0C8BC", background: copied ? "#E8F5E9" : "white", color: copied ? "#2E7D32" : "#888", cursor: "pointer", fontSize: 10, fontFamily: "sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>
      {copied ? "✓" : (label || "Copy")}
    </button>
  );
}

function ActionBtn({ label, onClick, primary }) {
  return (
    <button onClick={onClick}
      style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${primary ? "#1B3A5C" : "#D0C8BC"}`, background: primary ? "#1B3A5C" : "white", color: primary ? "white" : "#555", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600 }}>
      {label}
    </button>
  );
}
