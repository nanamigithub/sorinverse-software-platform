import { useState, useMemo, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const ENGINES = [
  {
    id: "structure", tag: "1.1", name: "structure-engine",
    category: "representation", purpose: "represent & understand",
    summary: "Defines what exists and how it is structured. The foundational layer where all world knowledge is represented.",
    details: ["Knowledge representation: object / attribute / method / relation","Graph schema, indexing, retrieval","Hierarchies, layers, zoom recursion","Structure-first cognition (representation layer)"],
    rule: "All world knowledge lives here."
  },
  {
    id: "system", tag: "1.2", name: "system-engine",
    category: "simulation", purpose: "model & simulate dynamics",
    summary: "Defines how things evolve over time. Models complex systems with feedback loops, stability boundaries, and emergent behavior.",
    details: ["System modeling (variables, feedback loops, constraints)","Stability, phase change, emergence","Simulation & forecasting frameworks","Domain system models (economy / climate / biology / organization)"],
    rule: null
  },
  {
    id: "relationship", tag: "1.3", name: "relationship-engine",
    category: "simulation", purpose: "graph & propagation",
    summary: "Defines how influence and interaction spread across networks. Models propagation dynamics across information, trust, and power dimensions.",
    details: ["Relationship network modeling","Dependency, influence, constraint edges","Propagation / diffusion / contagion logic","Information, attention, trust, power spread modeling"],
    rule: null
  },
  {
    id: "fate", tag: "1.4", name: "fate-engine",
    category: "simulation", purpose: "branching & decision search",
    summary: "Defines possible futures. Constructs scenario trees and navigates path-dependent branching under uncertainty.",
    details: ["What-if branching spaces","Scenario trees & path dependence","Constraint-based branching","Decision search under uncertainty (risk / payoff / constraints)"],
    rule: null
  },
  {
    id: "management", tag: "1.5", name: "management-engine",
    category: "execution", purpose: "plan, execute & iterate",
    summary: "The core execution loop. Transforms understanding into measurable outcomes through continuous planning and feedback closure.",
    details: ["Planning, scheduling, task decomposition","Execution loops & iteration","Metrics, review, automation","Goal → action → feedback closure"],
    rule: null
  },
  {
    id: "perception", tag: "1.6", name: "perception-engine",
    category: "representation", purpose: "sense & experience",
    summary: "Defines how the world is perceived. Controls attention allocation and manages cognitive load before reasoning begins.",
    details: ["Attention allocation & filtering","Sensory abstraction (visual / auditory / experiential)","Cognitive load & information density control","Perception-aware interfaces"],
    rule: "Perception precedes reasoning."
  },
  {
    id: "expression", tag: "1.7", name: "expression-engine",
    category: "representation", purpose: "articulate & externalize",
    summary: "Transforms internal understanding into external signal. Treats expression as a structured system, not mere content output.",
    details: ["Language / symbol / multimodal expression structures","Thought → articulation transformation","Communication & persuasion mechanics","Signal clarity & distortion control"],
    rule: "Expression is a system, not content."
  },
  {
    id: "value", tag: "1.8", name: "value-engine",
    category: "execution", purpose: "evaluate & prioritize",
    summary: "Defines what matters. Every decision passes through value frameworks and civilizational alignment checks.",
    details: ["Value frameworks & trade-off evaluation","Priority resolution under constraint","Ethical & civilizational alignment","Decision weighting beyond efficiency"],
    rule: "No decision exists without values."
  },
  {
    id: "resource", tag: "1.9", name: "resource-engine",
    category: "execution", purpose: "allocate & constrain",
    summary: "Defines what supports action. Models all resource dimensions holistically — time, energy, attention, and capacity alike.",
    details: ["Resource modeling (time, money, energy, attention, capacity)","Scarcity & allocation logic","Conversion efficiency & bottleneck analysis","Sustainability constraints"],
    rule: "Money is a resource, not the resource."
  },
  {
    id: "protection", tag: "1.10", name: "protection-engine",
    category: "safety", purpose: "reduce harm & risk",
    summary: "Prevents damage before it occurs. Safety-first decision filters are applied at every critical decision point.",
    details: ["Risk detection & early warning","Safety-first decision filters","Health, psychological, and systemic protection","Non-violent resolution architectures"],
    rule: "Progress without protection is failure."
  },
  {
    id: "evidence", tag: "1.11", name: "evidence-engine",
    category: "safety", purpose: "audit & trust",
    summary: "Makes all claims auditable and trustworthy. Interface reserved at platform level for v1.x; foundational for long-term system integrity.",
    details: ["Evidence objects & citation graphs","Source reliability / recency / consistency weighting","Conflict resolution across contradictory sources","Confidence calibration for conclusions"],
    rule: "Optional in v1.x. Interface reserved at platform level.",
    optional: true
  },
  {
    id: "physic", tag: "1.12", name: "physic-engine",
    category: "foundational", purpose: "perceive, act & fabricate",
    summary: "The bridge between intelligence and physical reality. Does not decide what to do — defines how actions and embodiment are physically possible.",
    details: ["Embodied perception & sensor abstraction","Five-sense normalization & fusion","Physical action & motion execution","Actuator control (hand / foot / mouth / tool)","Action primitives & execution safety","World-state coupling & digital twin alignment","Fabrication interface (3D printing / modular assembly)","Energy, load, durability, failure-bound awareness"],
    rule: "Does not decide what to do. Defines how actions are physically possible.",
    foundational: true
  },
  {
    id: "orchestrator", tag: "1.13", name: "orchestrator-engine",
    category: "foundational", purpose: "global coordination & intent routing",
    summary: "The system-level command center. The only engine that coordinates globally — all others execute locally under its orchestration.",
    details: ["Receive intent (human / system)","Select, compose, and schedule workflows","Dispatch tasks across engines","Coordinate memory, policy, and evidence","Manage lifecycle, retries, rollback, and iteration"],
    rule: "All engines execute locally. Only orchestrator-engine coordinates globally.",
    foundational: true, isMaster: true
  },
  {
    id: "memory", tag: "1.14", name: "memory-engine",
    category: "foundational", purpose: "persistent system memory",
    summary: "Retains long-term system knowledge and accumulated experience. The substrate that all reasoning depends on.",
    details: ["Structural memory (objects, schemas, evolution)","Execution memory (workflow success / failure)","Preference & behavior memory","Experience accumulation for adaptation"],
    rule: "Memory does not reason. It preserves what reasoning depends on.",
    foundational: true
  }
];

const CAT = {
  representation: { label: "Representation & Cognition", color: "#38bdf8", glow: "rgba(56,189,248,0.18)", dark: "#0a1929" },
  simulation:     { label: "Simulation & Decision",      color: "#8b5cf6", glow: "rgba(139,92,246,0.18)",  dark: "#160f2e" },
  execution:      { label: "Execution & Management",     color: "#34d399", glow: "rgba(52,211,153,0.18)",  dark: "#091f1a" },
  safety:         { label: "Safety & Trust",             color: "#fb7185", glow: "rgba(251,113,133,0.18)", dark: "#1f0e10" },
  foundational:   { label: "Foundational",               color: "#e8a838", glow: "rgba(232,168,56,0.22)",  dark: "#1f1608" }
};
const CAT_ORDER = ["foundational","representation","simulation","execution","safety"];

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("all");
  const [selected, setSelected]     = useState(null);
  const [ready, setReady]           = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ENGINES.filter(e => {
      const mQ = !q || e.name.includes(q) || e.purpose.includes(q) || e.summary.toLowerCase().includes(q);
      const mC = catFilter === "all" || e.category === catFilter;
      return mQ && mC;
    });
  }, [search, catFilter]);

  const grouped = useMemo(() => {
    const g = {};
    CAT_ORDER.forEach(c => { const i = filtered.filter(e => e.category === c); if (i.length) g[c] = i; });
    return g;
  }, [filtered]);

  const sel = selected ? ENGINES.find(e => e.id === selected) : null;

  return (
    <div className="architecture-page">
      {/* Search + Filter */}
        <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ position:"relative", flex:"1 1 160px", maxWidth:240 }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#3a4a5c", fontSize:13, pointerEvents:"none" }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search engines…"
              style={{ width:"100%", background:"#0e1220", border:"1px solid #1a2035", borderRadius:6, padding:"6px 10px 6px 30px", color:"#c8d6e5", fontSize:12, boxSizing:"border-box", transition:"border-color 0.2s" }} />
          </div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            <Pill active={catFilter==="all"} color="#e8a838" onClick={() => setCatFilter("all")}>All</Pill>
            {CAT_ORDER.map(c => <Pill key={c} active={catFilter===c} color={CAT[c].color} onClick={() => setCatFilter(c)}>{CAT[c].label.split(" &")[0].split(" ").slice(0,2).join(" ")}</Pill>)}
          </div>
        </div>

          {/* Grouped Engine Grid */}
          {Object.keys(grouped).length === 0
            ? <div style={{ textAlign:"center", padding:40, color:"#3a4a5c", fontSize:13 }}>No engines match your query.</div>
            : Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7, paddingLeft:1 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:CAT[cat].color, boxShadow:`0 0 5px ${CAT[cat].color}70` }} />
                  <span style={{ fontSize:9, color:CAT[cat].color, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase" }}>{CAT[cat].label}</span>
                  <span style={{ fontSize:8, color:"#3a4a5c" }}>({items.length})</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(185px,1fr))", gap:7 }}>
                  {items.map((eng, idx) => (
                    <EngineCard key={eng.id} engine={eng} isSelected={selected===eng.id}
                      onSelect={() => setSelected(selected===eng.id ? null : eng.id)} ready={ready} delay={idx*45} />
                  ))}
                </div>
              </div>
            ))
          }

      {/* Detail Panel */}
      {sel && <DetailPanel engine={sel} onClose={() => setSelected(null)} onNav={id => setSelected(id)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PILL
═══════════════════════════════════════════════════════ */
function Pill({ active, color, onClick, children }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: active ? color+"18" : (h ? "#141a2a" : "#0e1220"),
      border: "1px solid "+(active ? color+"50" : (h ? "#2a3548" : "#1a2035")),
      color: active ? color : (h ? "#8a9bb0" : "#5a6a7c"),
      borderRadius:14, padding:"3px 10px", cursor:"pointer", fontSize:10,
      fontWeight: active ? 600 : 400, transition:"all 0.2s"
    }}>{children}</button>
  );
}

/* ═══════════════════════════════════════════════════════
   ENGINE CARD
═══════════════════════════════════════════════════════ */
function EngineCard({ engine, isSelected, onSelect, ready, delay }) {
  const m = CAT[engine.category];
  const [h, setH] = useState(false);
  const active = isSelected || h;

  return (
    <button onClick={onSelect} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: isSelected ? m.dark : (h ? "#111824" : "#0e1220"),
      border: "1px solid "+(active ? m.color+"55" : "#1a2035"),
      borderRadius:8, padding:"10px 12px", cursor:"pointer", textAlign:"left",
      transition:"all 0.2s", position:"relative", overflow:"hidden",
      boxShadow: active ? `0 0 14px ${m.glow}` : "none",
      opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(6px)",
      animation: ready ? `fadeUp 0.28s ease ${delay}ms both` : "none"
    }}>
      {engine.foundational && <div style={{ position:"absolute", top:-18, right:-18, width:55, height:55, borderRadius:"50%", background:`radial-gradient(circle, ${m.color}10, transparent 70%)`, pointerEvents:"none" }} />}
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
        <span style={{ fontSize:7.5, fontWeight:700, color:m.color, background:m.dark, padding:"1.5px 5px", borderRadius:3, border:"1px solid "+m.color+"28", fontFamily:"monospace", letterSpacing:"0.3px" }}>{engine.tag}</span>
        {engine.foundational && <span style={{ fontSize:8, color:"#e8a838" }}>★</span>}
        {engine.optional && <span style={{ fontSize:7, color:"#3d4f63", marginLeft:"auto", letterSpacing:"0.5px" }}>RESERVED</span>}
      </div>
      <div style={{ fontSize:13, fontWeight:600, color:"#eef2f7", marginBottom:2, lineHeight:1.3 }}>{engine.name.replace("-engine","")}</div>
      <div style={{ fontSize:10, color:m.color, opacity:0.8 }}>{engine.purpose}</div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   DETAIL PANEL
═══════════════════════════════════════════════════════ */
function DetailPanel({ engine, onClose, onNav }) {
  const m = CAT[engine.category];

  return (
    <div style={{ marginTop:18, background:"#0e1220", border:"1px solid "+m.color+"28", borderRadius:10, overflow:"hidden", boxShadow:`0 6px 28px ${m.glow}, inset 0 1px 0 rgba(255,255,255,0.03)`, animation:"fadeUp 0.25s ease" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(90deg, ${m.dark}, #0e1220)`, borderBottom:"1px solid #1a2035", padding:"13px 16px", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
            <span style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, color:m.color, background:m.dark, padding:"1.5px 6px", borderRadius:3, border:"1px solid "+m.color+"28" }}>{engine.tag}</span>
            <span style={{ fontSize:8.5, color:"#4a5568", textTransform:"uppercase", letterSpacing:"1px" }}>{m.label}</span>
            {engine.foundational && <span style={{ fontSize:8, color:"#e8a838" }}>★ Foundational</span>}
          </div>
          <h3 style={{ fontSize:17, fontWeight:700, color:"#eef2f7", margin:"3px 0 2px", letterSpacing:"-0.2px" }}>{engine.name}</h3>
          <div style={{ fontSize:11, color:m.color, fontWeight:500 }}>{engine.purpose}</div>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", color:"#4a5568", cursor:"pointer", fontSize:15, padding:"1px 5px", borderRadius:4, lineHeight:1 }}
          onMouseEnter={e => e.currentTarget.style.color="#c8d6e5"} onMouseLeave={e => e.currentTarget.style.color="#4a5568"}>✕</button>
      </div>

      {/* Body */}
      <div style={{ padding:"15px 16px 16px" }}>
        <p style={{ fontSize:11.5, color:"#8a9bb0", lineHeight:1.65, margin:"0 0 16px" }}>{engine.summary}</p>

        {/* Responsibilities */}
        <div style={{ fontSize:8.5, color:"#4a5568", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>Responsibilities</div>
        <div style={{ marginBottom:16 }}>
          {engine.details.map((d, i) => (
            <div key={i} style={{ fontSize:11, color:"#a0b0c0", padding:"5px 0 5px 14px", position:"relative", borderBottom: i < engine.details.length-1 ? "1px solid #1a2035" : "none" }}>
              <span style={{ position:"absolute", left:0, color:m.color, fontSize:7, top:7 }}>▸</span>{d}
            </div>
          ))}
        </div>

        {/* Principle */}
        {engine.rule && (
          <div style={{ background:"#080c1a", border:"1px solid "+m.color+"22", borderRadius:6, padding:"10px 13px", marginBottom:16 }}>
            <div style={{ fontSize:8, color:m.color, textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:4 }}>{engine.optional ? "Note" : "Principle"}</div>
            <p style={{ fontSize:11, color:m.color, margin:0, lineHeight:1.55, opacity:0.82, fontStyle:"italic" }}>"{engine.rule}"</p>
          </div>
        )}

        {/* Connections */}
        <div style={{ fontSize:8.5, color:"#4a5568", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:7 }}>
          {engine.id === "orchestrator" ? "Coordinates All Engines" : "Coordinated By"}
        </div>
        {engine.id === "orchestrator"
          ? <ConnectedEngines allEngines={ENGINES} onNav={onNav} />
          : <NavChip label="orchestrator-engine →" color="#e8a838" bg="#1f1608" border="#e8a83830" onClick={() => onNav("orchestrator")} />
        }
      </div>
    </div>
  );
}

function ConnectedEngines({ allEngines, onNav }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
      {allEngines.filter(e => e.id !== "orchestrator").map(e => {
        const m = CAT[e.category];
        return <NavChip key={e.id} label={e.name.replace("-engine","")} color={m.color} bg={m.dark} border={m.color+"28"} onClick={() => onNav(e.id)} />;
      })}
    </div>
  );
}

function NavChip({ label, color, bg, border, onClick }) {
  const [h, setH] = useState(false);
  return (
    <span onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      fontSize:10, color, background: h ? color+"18" : bg, padding:"2px 9px", borderRadius:12,
      cursor:"pointer", border:"1px solid "+(h ? color+"50" : border), transition:"all 0.15s", display:"inline-block", fontFamily:"monospace"
    }}>{label}</span>
  );
}

/* ═══════════════════════════════════════════════════════
   PIPELINE VIEW
═══════════════════════════════════════════════════════ */
export function PipelineView({ onEngine }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const stages = [
    { label:"INTENT",         sub:"Human or System Input",           color:"#6366f1", engines:[], endpoint:true, endIcon:"⇵" },
    { label:"PERCEIVE",       sub:"Sense & filter reality",          color:"#38bdf8", engines:["perception","physic"] },
    { label:"UNDERSTAND",     sub:"Build structured knowledge",      color:"#38bdf8", engines:["structure","relationship","memory"] },
    { label:"SIMULATE",       sub:"Model dynamics & possible futures",color:"#8b5cf6", engines:["system","fate"] },
    { label:"DECIDE",         sub:"Evaluate, constrain & protect",   color:"#e8a838", engines:["value","resource","protection"] },
    { label:"EXPRESS & ACT",  sub:"Articulate & execute",            color:"#34d399", engines:["management","expression","physic"] },
    { label:"OUTPUT",         sub:"Verifiable Real-World Outcome",   color:"#10b981", engines:[], endpoint:true, endIcon:"✓" },
  ];

  return (
    <div>
      <div style={{ marginBottom:18 }}>
        <h3 style={{ fontSize:14, color:"#eef2f7", margin:"0 0 3px", fontWeight:600 }}>Output-Centric Pipeline</h3>
        <p style={{ fontSize:11, color:"#4a5568", margin:0 }}>All processing converges toward verifiable real-world outcomes. Click engine tags to explore details.</p>
      </div>

      {/* Orchestrator Banner */}
      <div style={{ background:"linear-gradient(90deg,#1f1608,#141008)", border:"1px solid #e8a83838", borderRadius:8, padding:"9px 14px", marginBottom:18, display:"flex", alignItems:"center", gap:11, boxShadow:"0 0 18px rgba(232,168,56,0.07)" }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:"#e8a838", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 8px rgba(232,168,56,0.4)", flexShrink:0 }}>
          <span style={{ color:"#080c1a", fontSize:11, fontWeight:800 }}>O</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11.5, fontWeight:700, color:"#e8a838" }}>orchestrator-engine</div>
          <div style={{ fontSize:9.5, color:"#7a6a2a" }}>Global intent routing & coordination across all pipeline stages</div>
        </div>
        <span style={{ fontSize:7.5, color:"#e8a838", background:"#1f160815", padding:"1.5px 7px", borderRadius:8, border:"1px solid #e8a83828", fontFamily:"monospace" }}>1.13 ★</span>
      </div>

      {/* Stages */}
      {stages.map((stage, i) => (
        <div key={i} style={{ opacity:ready?1:0, transform:ready?"translateY(0)":"translateY(6px)", transition:`all 0.38s ease ${i*75}ms` }}>
          <StageRow stage={stage} index={i} onEngine={onEngine} />
          {i < stages.length-1 && (
            <div style={{ display:"flex", justifyContent:"center", padding:"2px 0" }}>
              <div style={{ width:1, height:9, background:`linear-gradient(180deg, ${stage.color}35, ${stages[i+1].color}35)` }} />
            </div>
          )}
        </div>
      ))}

      {/* Bottom Row: Libs + Foundations */}
      <div style={{ marginTop:22, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <BoxSection title="Capability Libraries">
          {["movement","voice","visual","hand","cognition"].map(lib => (
            <Tag key={lib}>{lib}-lib</Tag>
          ))}
        </BoxSection>
        <BoxSection title="Platform Foundations">
          {["Registries","Schemas","Orchestration","Telemetry","Reproducibility"].map(f => (
            <Tag key={f}>{f}</Tag>
          ))}
        </BoxSection>
      </div>

      {/* Domain Packs */}
      <div style={{ marginTop:8, background:"#0a1522", border:"1px solid #38bdf822", borderRadius:8, padding:"11px 14px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
          <span style={{ fontSize:8.5, color:"#38bdf8", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600 }}>Domain Packs</span>
          <span style={{ fontSize:7.5, color:"#38bdf8", background:"#38bdf812", padding:"1px 6px", borderRadius:8, border:"1px solid #38bdf828" }}>External Facing</span>
        </div>
        <p style={{ fontSize:10, color:"#4a5568", margin:0 }}>唯一对外售卖层 — The only externally sold layer. All core runtime engines remain internal platform assets.</p>
      </div>
    </div>
  );
}

function StageRow({ stage, index, onEngine }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: stage.endpoint ? (index===0 ? "#111038" : "#091a14") : (h ? "#111824" : "#0e1220"),
      border: "1px solid "+(stage.endpoint ? stage.color+"32" : (h ? "#2a3548" : "#1a2035")),
      borderRadius:8, padding:"9px 13px", display:"flex", alignItems:"center", gap:11, transition:"all 0.2s"
    }}>
      <div style={{
        width:26, height:26, borderRadius:"50%", flexShrink:0,
        background: stage.endpoint ? stage.color : stage.color+"14",
        border: stage.endpoint ? "none" : "2px solid "+stage.color,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize: stage.endpoint ? 11 : 11, fontWeight:700,
        color: stage.endpoint ? "#080c1a" : stage.color
      }}>
        {stage.endpoint ? stage.endIcon : index+1}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:11.5, fontWeight:600, color:stage.color }}>{stage.label}</div>
        <div style={{ fontSize:9.5, color:"#4a5568" }}>{stage.sub}</div>
      </div>
      {stage.engines.length > 0 && (
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", justifyContent:"flex-end" }}>
          {stage.engines.map(eid => {
            const eng = ENGINES.find(e => e.id === eid);
            if (!eng) return null;
            const m = CAT[eng.category];
            return <PipelineEngineTag key={eid+"-"+index} eng={eng} m={m} onEngine={onEngine} />;
          })}
        </div>
      )}
    </div>
  );
}

function PipelineEngineTag({ eng, m, onEngine }) {
  const [h, setH] = useState(false);
  return (
    <span onClick={() => onEngine(eng.id)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      fontSize:9, color: h ? "#eef2f7" : m.color, background: h ? m.color+"20" : m.dark,
      padding:"2px 7px", borderRadius:9, cursor:"pointer",
      border:"1px solid "+(h ? m.color+"55" : m.color+"25"), transition:"all 0.15s", fontFamily:"monospace"
    }}>
      {eng.name.replace("-engine","")}
    </span>
  );
}

function BoxSection({ title, children }) {
  return (
    <div style={{ background:"#0e1220", border:"1px solid #1a2035", borderRadius:8, padding:"11px 13px" }}>
      <div style={{ fontSize:8.5, color:"#4a5568", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:7 }}>{title}</div>
      <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{children}</div>
    </div>
  );
}

function Tag({ children }) {
  return <span style={{ fontSize:8.5, color:"#6a7a8c", background:"#080c1a", padding:"2px 7px", borderRadius:9, border:"1px solid #1a2035", fontFamily:"monospace" }}>{children}</span>;
}
