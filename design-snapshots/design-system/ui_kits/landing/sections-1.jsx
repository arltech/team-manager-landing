/* Team Manager — Landing page sections (UI kit).
   Recreates the real sales page (src/app/_components/*) using the design-system
   primitives from the bundle. Exports each section to window for index.html. */

(function () {
const TM = window.TeamManagerDesignSystem_6cb67c;
const { Button, Pill, Card, IconBadge, KpiCard, SectionHeader, Accordion, Avatar } = TM;

/* ── Inline icon helper (Lucide paths, stroke 2) ── */
function Icon({ d, size = 24, fill = "none", sw = 2, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", flexShrink: 0 }}>
      {children || <path d={d} />}
    </svg>
  );
}
const Arrow = (p) => <Icon size={p.size||18}>{<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>}</Icon>;
const Shield = (p) => <Icon size={p.size||24}>{<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>}</Icon>;
const Spark = (p) => <Icon size={p.size||14} fill="currentColor" sw={0}>{<path d="M12 2l2 6.5L20.5 10.5 14 12.5 12 19l-2-6.5L3.5 10.5 10 8.5z"/>}</Icon>;
const Bot = () => <Icon><><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></></Icon>;
const Heart = () => <Icon><><path d="M7.5 3C5 3 3 5 3 7.5c0 5 7 9 9 11 2-2 9-6 9-11C21 5 19 3 16.5 3c-1.5 0-3 1-4.5 2.5C10.5 4 9 3 7.5 3z"/></></Icon>;
const Eye = () => <Icon><><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></></Icon>;
const FileCheck = () => <Icon><><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></></Icon>;
const Target = () => <Icon><><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></></Icon>;
const Layers = () => <Icon size={16} sw={2.4}>{<><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>}</Icon>;
const Cap = () => <Icon size={16} sw={2.4}>{<><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></>}</Icon>;
const Clock = () => <Icon size={16} sw={2.4}>{<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}</Icon>;
const Check = () => <Icon size={16} sw={2.4}>{<><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>}</Icon>;
const Quote = () => <Icon size={64} sw={1.5}>{<><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.5C2 21 2 21 3 21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2h.5c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.5C14 21 14 21 15 21z"/></>}</Icon>;
const Db = () => <Icon size={18} sw={2.4}>{<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></>}</Icon>;
const ShieldCheck = () => <Icon size={18} sw={2.4}>{<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>}</Icon>;
const Zap = () => <Icon size={18} sw={2.4}>{<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>}</Icon>;

window.TMIcons = { Arrow, Shield, Spark };

/* ─────────────────────────  HEADER  ───────────────────────── */
function Header({ onCta }) {
  const NAV = [["O Problema","problema"],["Solução","solucao"],["Preços","oferta"],["FAQ","faq"]];
  return (
    <header className="tm-header" style={{ position:"absolute", top:0, left:0, right:0, zIndex:40 }}>
      <div style={{ maxWidth:1152, margin:"0 auto", padding:"0 24px", height:88, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24 }}>
        <img src="../../assets/logo-mark.png" alt="Team Manager" style={{ height:60, filter:"drop-shadow(0 2px 10px rgba(99,102,241,0.25))" }} />
        <nav style={{ display:"flex", alignItems:"center", gap:28 }}>
          {NAV.map(([label,id]) => (
            <a key={id} href={"#"+id} style={{ fontSize:14, fontWeight:500, color:"rgba(255,255,255,0.85)" }}>{label}</a>
          ))}
        </nav>
        <Button variant="white" size="sm" onClick={onCta}>Demonstração</Button>
      </div>
    </header>
  );
}

/* ─────────────────────────  HERO  ───────────────────────── */
function Hero({ onCta, slide, setSlide }) {
  return (
    <section className="hero-gradient" style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1024, margin:"0 auto", padding:"160px 24px 128px", textAlign:"center" }}>
        <div style={{ marginBottom:28 }}>
          <Pill tone="dark-glass">Para redes de escolas e cursos com 2 a 15 unidades</Pill>
        </div>
        <h1 style={{ fontFamily:"var(--font-heading)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.12, fontSize:"clamp(28px,5vw,52px)", maxWidth:760, margin:"0 auto 28px", color:"#fff" }}>
          Você vai parar de ser o único que se importa com a meta de matrícula.{" "}
          <span style={{ color:"rgba(255,255,255,0.45)" }}>Não porque pediu.</span>{" "}
          <span style={{ color:"#fff" }}>Porque o sistema criou cultura.</span>
        </h1>
        <p style={{ fontSize:18, color:"rgba(255,255,255,0.75)", maxWidth:576, margin:"0 auto 40px", lineHeight:1.6 }}>
          Team Manager é o sistema de operação para redes de escolas e cursos que faz o trabalho de cobrar, lembrar, reconhecer e reportar — para que você faça o trabalho de crescer a rede.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:16, marginBottom:64 }}>
          <Button variant="primary" iconRight={<Arrow/>} onClick={onCta}>Agendar demonstração</Button>
          <Button variant="ghost" iconRight={<Arrow size={16}/>} onClick={onCta}>Diagnóstico em 2 min</Button>
        </div>
        <DashboardCarousel slide={slide} setSlide={setSlide} />
      </div>
    </section>
  );
}

function DashboardCarousel({ slide, setSlide }) {
  const slides = [1,2,3,4];
  return (
    <div style={{ maxWidth:920, margin:"0 auto" }}>
      <div style={{ borderRadius:"var(--radius-2xl)", overflow:"hidden", border:"1px solid rgba(255,255,255,0.12)", boxShadow:"0 30px 80px rgba(0,0,0,0.5)", background:"#0a0e27" }}>
        <img src={`../../assets/dashboard/slide-${slide}.png`} alt="Team Manager dashboard" style={{ width:"100%", display:"block" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:18 }}>
        {slides.map((s) => (
          <button key={s} onClick={() => setSlide(s)} aria-label={`Slide ${s}`}
            style={{ height:4, borderRadius:999, border:0, cursor:"pointer", transition:"all .2s",
              width: s===slide?32:6, background: s===slide?"#fff":"rgba(255,255,255,0.3)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────  PROBLEM  ───────────────────────── */
const PAINS = [
  ["Você sabe o resultado do mês só quando o mês acabou.", true],
  ["Tem assessor que some por dois dias e você descobre na reunião de sexta.", true],
  ["Seu time não tem problema com meta — tem problema com ser visto.", false],
  ["Você passa segunda de manhã reconstruindo a semana — de memória, com números errados.", true],
  ["Cada unidade tem uma planilha diferente. Nenhuma tem a mesma coluna.", false],
  ["O follow-up depende de o assessor lembrar. O assessor esquece. O lead some.", false],
];
function Problem() {
  return (
    <section id="problema" className="section-y" style={{ background:"var(--surface)" }}>
      <div style={{ maxWidth:896, margin:"0 auto", padding:"0 24px" }}>
        <SectionHeader pill="O Problema" pillTone="destructive" title="Reconhece algum desses?" align="left" />
        <ul style={{ listStyle:"none", padding:0, margin:"40px 0 0", display:"flex", flexDirection:"column", gap:28 }}>
          {PAINS.map(([t,emph],i) => (
            <li key={i} style={{ display:"flex", gap:20, fontSize:20, lineHeight:1.5, color: emph?"var(--foreground)":"var(--muted-foreground)" }}>
              <span style={{ flexShrink:0, marginTop:4, width:28, height:28, borderRadius:"50%", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
                background: emph?"color-mix(in srgb,var(--destructive) 10%,transparent)":"var(--surface-container)", color: emph?"var(--destructive)":"var(--on-surface-variant)" }}>{i+1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop:80, padding:"48px", borderRadius:24, border:"1px solid color-mix(in srgb,var(--destructive) 15%,transparent)", background:"color-mix(in srgb,var(--destructive) 4%,transparent)" }}>
          <p style={{ fontSize:30, fontWeight:700, lineHeight:1.3, color:"var(--foreground)", margin:0, fontFamily:"var(--font-heading)" }}>
            Se você precisa <em>perguntar</em> pra saber o que aconteceu, você não está gerenciando. <span style={{ color:"var(--destructive)" }}>Está investigando.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  SOLUTION  ───────────────────────── */
const CARDS = [
  { icon:<Bot/>, title:"Cobrança que acontece sem você", is:"Automação 24/7: monitora presença, follow-ups atrasados e prazos — e age antes de você precisar pedir.", el:["A reunião de cobrança","O WhatsApp de \"você viu o lead?\"","O assessor que some porque ninguém percebeu"] },
  { icon:<Heart/>, title:"Cultura de reconhecimento via WhatsApp", is:"Matrículas e top performers são anunciados automaticamente no grupo da equipe — antes de você saber, já foi celebrado.", el:["O assessor que pede demissão por \"nunca ser reconhecido\"","A cultura de pressão que mata engajamento"] },
  { icon:<Eye/>, title:"Visibilidade sem presença", is:"Funil, rotinas, tarefas e ranking de cada unidade em tempo real, com filtro por unidade, sem depender de ninguém te mandar nada.", el:["A reunião de segunda","O \"deixa eu te mandar o número\"","O relatório que chega sexta às 18h"] },
  { icon:<FileCheck/>, title:"Operação que se auto-documenta", is:"Rotina semanal puxa dados do CRM automaticamente. Scripts de vendas gerados por IA a partir do perfil do lead.", el:["Dado digitado duas vezes","Reunião de treinamento de script","Assessor que \"não sabia o que falar\""] },
  { icon:<Target/>, title:"Do primeiro contato à matrícula", is:"IA encontra leads em fontes públicas, o sistema distribui pra unidade certa e cobra follow-up candidato a candidato.", el:["Candidato que pediu informação e sumiu","Planilha de captação sem dono","Lista da franqueadora que vira pasta esquecida"] },
];
function Solution() {
  return (
    <section id="solucao" className="section-y" style={{ background:"var(--surface-container-low)" }}>
      <div style={{ maxWidth:1152, margin:"0 auto", padding:"0 24px" }}>
        <SectionHeader pill="A Solução" pillTone="primary" title="Team Manager foi construído pra isso." align="center" style={{ marginBottom:64 }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:32 }}>
          {CARDS.map((c,i) => (
            <Card key={i} style={ i===CARDS.length-1 ? { gridColumn:"1 / -1" } : {} }>
              <IconBadge size="lg" tone="primary" style={{ marginBottom:28 }}>{c.icon}</IconBadge>
              <h3 style={{ fontSize:24, marginBottom:20, color:"var(--foreground)" }}>{c.title}</h3>
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--on-surface-variant)", marginBottom:8 }}>O que é</div>
              <p style={{ color:"var(--muted-foreground)", marginBottom:28, lineHeight:1.6 }}>{c.is}</p>
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"color-mix(in srgb,var(--destructive) 85%,transparent)", marginBottom:12 }}>O que elimina</div>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
                {c.el.map((e,j) => (
                  <li key={j} style={{ fontSize:14, color:"var(--muted-foreground)", display:"flex", gap:12 }}>
                    <span style={{ color:"color-mix(in srgb,var(--destructive) 70%,transparent)", fontFamily:"monospace", marginTop:2 }}>×</span><span>{e}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

window.TMLanding = { Header, Hero, Problem, Solution, icons: { Arrow, Shield, Spark, Layers, Cap, Clock, Check, Quote, Db, ShieldCheck, Zap } };
})();
