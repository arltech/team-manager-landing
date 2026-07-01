/* Team Manager — Landing sections part 2: SocialProof, Offer, Faq, CtaFinal. */

(function () {
const TM2 = window.TeamManagerDesignSystem_6cb67c;
const { Button: Btn, Pill: Pl, Card: Cd, IconBadge: IB, KpiCard: KC, SectionHeader: SH, Accordion: Ac, Avatar: Av } = TM2;
const { Arrow, Shield, Spark, Layers, Cap, Clock, Check, Quote, Db, ShieldCheck, Zap } = window.TMLanding.icons;

/* ─────────────────────────  SOCIAL PROOF  ───────────────────────── */
const KPIS = [
  { icon:<Layers/>, value:"14", label:"componentes integrados", sub:"CRM + tarefas + rotinas + ranking + IA" },
  { icon:<Cap/>, value:"4", label:"segmentos de matrícula", sub:"Idiomas, profissional, infantil, regular" },
  { icon:<Clock/>, value:"72h", label:"do setup ao 1º insight", sub:"Setup técnico + onboarding incluso" },
  { icon:<Check/>, value:"30 dias", label:"garantia integral", sub:"100% devolvido se equipe não usar" },
];
const TESTIMONIALS = [
  { quote:"Antes eu ligava toda segunda perguntando 'cadê as matrículas da unidade?'. Agora a unidade me liga na sexta dizendo 'fechei a meta'.", role:"Diretor de rede", context:"3 unidades · Escola de idiomas · Piloto Team Manager" },
  { quote:"Em 6 semanas parei de cobrar follow-up. O sistema cobra sozinho. Eu olho o que importa: por que a unidade A matricula 30% mais que a B.", role:"Sócia-fundadora", context:"5 unidades · Cursos profissionalizantes · Piloto Team Manager" },
  { quote:"Pela primeira vez sei quais consultoras fizeram follow-up de cada candidato sem abrir 4 planilhas. O ranking aparece sexta de manhã.", role:"Coordenador comercial", context:"4 unidades · Preparatório vestibular · Piloto Team Manager" },
];
const TRUST = [
  { icon:<Db/>, title:"Cada unidade vê só o que é dela", body:"A permissão é na raiz dos dados, não num filtro de tela. Auditável e à prova de erro humano." },
  { icon:<ShieldCheck/>, title:"Auditoria e LGPD prontas", body:"Histórico de acesso por usuário, exportação sob demanda, retenção que você define." },
  { icon:<Zap/>, title:"2 horas pra estar rodando", body:"Templates prontos por segmento de escola. Sem consultoria de 3 meses." },
];
function SocialProof() {
  const [ti, setTi] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTi((i) => (i+1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[ti];
  return (
    <section className="section-y" style={{ background:"var(--surface)" }}>
      <div style={{ maxWidth:1152, margin:"0 auto", padding:"0 24px" }}>
        <SH align="center" style={{ marginBottom:64 }}
          pill={<><span style={{ width:6, height:6, borderRadius:"50%", background:"var(--success)" }}/>Em produção hoje</>}
          pillTone="success"
          title={<>Não é beta. Não é demo.<br/><span style={{ color:"var(--muted-foreground)" }}>É operação rodando.</span></>}
          subtitle="Sistema sólido, dados reais, retorno mensurável nos primeiros 7 dias." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, marginBottom:80 }}>
          {KPIS.map((k,i) => <KC key={i} {...k} />)}
        </div>
        {/* testimonial */}
        <div style={{ position:"relative", maxWidth:896, margin:"0 auto 80px" }}>
          <Cd hover={false} padding={56} style={{ background:"linear-gradient(135deg, var(--card), var(--surface-container-low))", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:32, right:32, color:"color-mix(in srgb,var(--primary) 15%,transparent)" }}><Quote/></div>
            <p style={{ fontSize:26, fontWeight:600, lineHeight:1.35, color:"var(--foreground)", margin:"0 0 32px", maxWidth:640 }}>“{t.quote}”</p>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <Av name={t.role} ring />
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"var(--foreground)" }}>{t.role}</div>
                <div style={{ fontSize:12, color:"var(--muted-foreground)" }}>{t.context}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:24 }}>
              {TESTIMONIALS.map((_,i) => (
                <button key={i} onClick={() => setTi(i)} aria-label={`Depoimento ${i+1}`}
                  style={{ height:4, borderRadius:999, border:0, cursor:"pointer", transition:"all .2s", width: i===ti?32:6, background: i===ti?"var(--primary)":"var(--border)" }} />
              ))}
            </div>
          </Cd>
        </div>
        {/* trust */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {TRUST.map((tr,i) => (
            <div key={i} style={{ display:"flex", gap:16, padding:24, borderRadius:16, background:"var(--surface-container-low)", border:"1px solid color-mix(in srgb,var(--border) 40%,transparent)" }}>
              <IB size="sm" tone="primary">{tr.icon}</IB>
              <div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:"0 0 6px", color:"var(--foreground)", lineHeight:1.2 }}>{tr.title}</h3>
                <p style={{ fontSize:12, color:"var(--muted-foreground)", lineHeight:1.6, margin:0 }}>{tr.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  OFFER  ───────────────────────── */
const PLANS = [
  { name:"Starter", units:"1-2 unidades", users:"Até 15 usuários", featured:false, highlight:"Para começar a sair da planilha" },
  { name:"Rede", units:"3-6 unidades", users:"Até 30 usuários", featured:true, highlight:"Mais escolhido — inclui Setup WhatsApp interno + Diagnóstico Fundador" },
  { name:"Regional", units:"7-15 unidades", users:"Ilimitado", featured:false, highlight:"ROI dominante para redes que já escalam" },
];
const STACK = [
  ["Painel multi-unidade com permissão na raiz","R$ 1.500/mês"],
  ["CRM com funil de 6 etapas, histórico e exportação","R$ 950/mês"],
  ["Follow-up automático + lembretes por candidato","R$ 1.100/mês"],
  ["Gamificação: 14 ações + 8 níveis + ranking + XP","R$ 1.800/mês"],
  ["Automação WhatsApp interna","R$ 700/mês"],
  ["Gerador de scripts de venda com IA","R$ 600/mês"],
];
function Offer({ onCta }) {
  return (
    <section id="oferta" className="section-y" style={{ background:"var(--surface-container-low)" }}>
      <div style={{ maxWidth:1152, margin:"0 auto", padding:"0 24px" }}>
        <SH align="center" pill="A Oferta" pillTone="accent" style={{ marginBottom:64 }}
          title="Você paga por um sistema. Recebe a operação inteira."
          subtitle={<>Equivalente de mercado: R$ 12.390/mês. <span style={{ color:"var(--foreground)", fontWeight:700 }}>Seu investimento sai no diagnóstico gratuito.</span></>} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, marginBottom:56, alignItems:"start" }}>
          {PLANS.map((p) => (
            <Cd key={p.name} featured={p.featured} padding={40} style={ p.featured?{ transform:"scale(1.04)" }:{} }>
              {p.featured && (
                <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)" }}>
                  <Pl tone="solid-primary"><Spark/> Recomendado</Pl>
                </div>
              )}
              <h3 style={{ fontSize:30, marginBottom:8, color:"var(--foreground)" }}>{p.name}</h3>
              <div style={{ fontSize:14, color:"var(--muted-foreground)" }}>{p.units}</div>
              <div style={{ fontSize:14, color:"var(--muted-foreground)", marginBottom:32 }}>{p.users}</div>
              <div style={{ marginBottom:32 }}>
                <span style={{ fontSize:30, fontWeight:800, color:"var(--foreground)", fontFamily:"var(--font-heading)" }}>Sob diagnóstico</span>
                <p style={{ fontSize:12, color:"var(--muted-foreground)", margin:"6px 0 0", lineHeight:1.5 }}>Investimento definido pelo porte da sua rede, no diagnóstico gratuito.</p>
              </div>
              <p style={{ fontSize:14, color:"color-mix(in srgb,var(--foreground) 80%,transparent)", marginBottom:32, lineHeight:1.6 }}>{p.highlight}</p>
              <Btn variant={p.featured?"primary":"outline"} fullWidth onClick={onCta}>Agendar demonstração</Btn>
            </Cd>
          ))}
        </div>
        <Ac variant="card" className="" style={{ maxWidth:768, margin:"0 auto 48px" }}
          summary={<>
            <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, color:"var(--on-surface-variant)", marginBottom:4 }}>Por que vale isso?</div>
            <div style={{ fontWeight:700, color:"var(--foreground)" }}>Os 12 componentes que somam R$ 12.390/mês de mercado</div>
          </>}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {STACK.map(([item,price],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", gap:24, padding:"12px 0", borderBottom:"1px solid color-mix(in srgb,var(--border) 30%,transparent)" }}>
                <span style={{ fontSize:14, color:"color-mix(in srgb,var(--foreground) 85%,transparent)" }}>{item}</span>
                <span style={{ fontSize:14, fontWeight:700, color:"var(--foreground)", whiteSpace:"nowrap" }}>{price}</span>
              </div>
            ))}
            <div style={{ marginTop:20, paddingTop:20, borderTop:"2px solid color-mix(in srgb,var(--primary) 20%,transparent)", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
              <span style={{ fontSize:14, color:"var(--muted-foreground)" }}>Total stack</span>
              <span style={{ fontSize:30, fontWeight:800, color:"var(--primary)", fontFamily:"var(--font-heading)" }}>R$ 12.390/mês</span>
            </div>
          </div>
        </Ac>
        <Cd hover={false} padding={40} style={{ maxWidth:768, margin:"0 auto", border:"1px solid color-mix(in srgb,var(--success) 40%,transparent)", background:"var(--success-subtle)" }}>
          <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
            <IB size="lg" tone="success"><Shield/></IB>
            <div>
              <h3 style={{ fontSize:20, margin:"0 0 12px", color:"var(--foreground)" }}>Garantia de 30 dias</h3>
              <p style={{ color:"color-mix(in srgb,var(--foreground) 85%,transparent)", lineHeight:1.6, margin:0 }}>
                Se em <strong>30 dias</strong> você não conseguir ver o funil de todas as unidades sem precisar perguntar a ninguém, devolvemos 100%, sem perguntas.
              </p>
            </div>
          </div>
        </Cd>
      </div>
    </section>
  );
}

/* ─────────────────────────  FAQ  ───────────────────────── */
const FAQS = [
  ["Minha equipe não vai usar.","Você está certo: a maioria dos sistemas falha por isso. Team Manager se encaixa no fluxo que a supervisora já tem. Alerta no WhatsApp, registro em 30 segundos. A gamificação resolve adoção — e o sistema tira XP de quem some. Você não cobra: o sistema cobra."],
  ["É caro, planilha funciona.","Planilha não tem custo de assinatura. Tem custo de lead perdido. Ticket médio R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Plano Rede custa R$ 1.797. ROI líquido no mês 1: R$ 4.953."],
  ["Minha rede é pequena, faz sentido?","O melhor momento de implantar não é quando a rede está grande — é quando ainda é pequena o suficiente pra criar o hábito certo. Com 2-3 unidades você corrige o processo."],
  ["Vocês integram com meu ERP atual?","Em vez de integrar, substituímos. Team Manager assume a operação inteira (CRM + tarefas + rotinas + ranking) — seu ERP financeiro continua sendo financeiro."],
  ["Quanto tempo leva pra implantar?","72 horas. Setup técnico em 2 horas (incluso nos planos Rede e Regional). Templates por segmento pré-configurados. Suporte dedicado nos primeiros 7 dias."],
];
function Faq() {
  return (
    <section id="faq" className="section-y" style={{ background:"var(--surface)" }}>
      <div style={{ maxWidth:768, margin:"0 auto", padding:"0 24px" }}>
        <SH pill="Perguntas frequentes" pillTone="muted" title="As 5 que mais aparecem." align="left" />
        <div style={{ display:"flex", flexDirection:"column", gap:16, marginTop:40 }}>
          {FAQS.map(([q,a],i) => (
            <Ac key={i} variant="card" summary={<span style={{ fontSize:18, fontWeight:700, color:"var(--foreground)" }}>{q}</span>}>
              <p style={{ color:"var(--muted-foreground)", lineHeight:1.6, margin:0, fontSize:15 }}>{a}</p>
            </Ac>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CTA FINAL  ───────────────────────── */
function CtaFinal({ onCta }) {
  return (
    <section className="section-y hero-gradient">
      <div style={{ maxWidth:768, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"var(--font-heading)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.12, fontSize:"clamp(30px,4.5vw,48px)", margin:"0 0 48px", color:"#fff" }}>
          Você vai sair daqui do mesmo jeito. <span style={{ color:"rgba(255,255,255,0.4)" }}>Ou não.</span>
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:24, fontSize:18, color:"rgba(255,255,255,0.8)", marginBottom:56, lineHeight:1.6 }}>
          <p style={{ margin:0 }}>Você pode continuar gerenciando pelo WhatsApp, reconstruindo números às segundas e esperando que o assessor lembre do follow-up.</p>
          <p style={{ margin:0 }}>Ou pode ser o gestor que não precisa cobrar porque o sistema cobra. Que não precisa celebrar porque o grupo já celebrou. Que não precisa investigar porque já sabe.</p>
          <p style={{ color:"#fff", fontSize:24, fontWeight:700, paddingTop:24, margin:0, fontFamily:"var(--font-heading)" }}>Não é uma escolha de software.<br/>É uma escolha sobre o tipo de gestor que você quer ser.</p>
        </div>
        <Btn variant="primary" size="lg" iconRight={<Arrow/>} onClick={onCta}>Ativar o Team Manager — garantia de 30 dias</Btn>
        <p style={{ marginTop:32, fontSize:14, color:"rgba(255,255,255,0.55)", display:"flex", alignItems:"center", justifyContent:"center", gap:8, maxWidth:448, marginLeft:"auto", marginRight:"auto" }}>
          <Shield size={14}/> Se em 30 dias você não enxergar diferença, devolução integral. Sem perguntas.
        </p>
      </div>
    </section>
  );
}

Object.assign(window.TMLanding, { SocialProof, Offer, Faq, CtaFinal });
})();
