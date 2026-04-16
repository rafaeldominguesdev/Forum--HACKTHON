"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"

/* ── Componente de input com animação por letra ── */
function AnimatedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  icon,
  rightElement,
}: {
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  icon: React.ReactNode
  rightElement?: React.ReactNode
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [chars, setChars] = useState<{ ch: string; id: number }[]>([])
  const counter = useRef(0)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value
      onChange(newVal)

      setChars((prev) => {
        if (newVal.length > prev.length) {
          // tecla adicionada
          const added = newVal.slice(prev.length)
          const newChars = added.split("").map((ch) => ({
            ch,
            id: counter.current++,
          }))
          return [...prev, ...newChars]
        } else {
          // tecla deletada
          return prev.slice(0, newVal.length)
        }
      })
    },
    [onChange]
  )

  const isPassword = type === "password"

  return (
    <div className="ai-wrap" onClick={() => inputRef.current?.focus()}>
      <div className="ai-icon">{icon}</div>

      <div className="ai-display">
        {value.length === 0 && (
          <span className="ai-placeholder">{placeholder}</span>
        )}
        {chars.map((c, i) =>
          i < value.length ? (
            <span key={c.id} className="ai-char">
              {isPassword ? "•" : c.ch}
            </span>
          ) : null
        )}
        {/* Cursor piscante */}
        <span className="ai-cursor" />
      </div>

      {/* Input real invisível para capturar digitar */}
      <input
        ref={inputRef}
        type={isPassword ? "password" : type}
        value={value}
        onChange={handleChange}
        required={required}
        className="ai-real-input"
        autoComplete="off"
      />

      {rightElement && <div className="ai-right">{rightElement}</div>}
      <div className="ai-underline-glow" />
    </div>
  )
}

/* ── Componente principal ── */
export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (email === "admin@example.com" && password === "123456") {
        router.push("/")
      } else {
        setError("Email ou senha incorretos.")
      }
    } catch {
      setError("Erro ao fazer login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gl-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          background: radial-gradient(ellipse at 30% 20%, #1a5c38 0%, #0a2e1a 40%, #04111a 100%);
          position: relative;
          overflow: hidden;
        }

        .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .orb-1 { width:500px;height:500px;top:-100px;left:-100px;background:radial-gradient(circle,rgba(0,127,63,.5) 0%,transparent 70%); }
        .orb-2 { width:400px;height:400px;bottom:-80px;right:-80px;background:radial-gradient(circle,rgba(0,80,40,.6) 0%,transparent 70%); }
        .orb-3 { width:300px;height:300px;top:30%;right:15%;background:radial-gradient(circle,rgba(255,198,50,.12) 0%,transparent 70%);filter:blur(60px); }
        .orb-4 { width:200px;height:200px;top:10%;left:30%;background:radial-gradient(circle,rgba(0,180,90,.2) 0%,transparent 70%);filter:blur(50px); }

        .bokeh { position:absolute;border-radius:50%;pointer-events:none;animation:float 8s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1);opacity:.6} 50%{transform:translateY(-18px) scale(1.05);opacity:.9} }

        /* Card */
        .glass-card {
          position:relative;z-index:10;width:100%;max-width:400px;margin:24px;
          background:rgba(255,255,255,.07);
          backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
          border-radius:24px;border:1px solid rgba(255,198,50,.25);
          box-shadow:0 32px 80px rgba(0,0,0,.45),0 0 0 .5px rgba(255,255,255,.08) inset,inset 0 1px 0 rgba(255,255,255,.15);
          padding:48px 40px 40px;overflow:hidden;
        }
        .glass-card::before {
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 40%,rgba(255,198,50,.3) 60%,transparent 100%);
        }
        .glass-card::after {
          content:'';position:absolute;top:0;left:20%;right:20%;height:60px;
          background:radial-gradient(ellipse,rgba(255,255,255,.08) 0%,transparent 70%);pointer-events:none;
        }

        .avatar-wrap { display:flex;justify-content:center;margin-bottom:28px; }
        .avatar-ring {
          width:76px;height:76px;border-radius:50%;border:2px solid rgba(255,198,50,.5);
          background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 20px rgba(255,198,50,.15),0 0 0 8px rgba(255,198,50,.05);
        }

        .card-title { text-align:center;font-size:.7rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.9);margin-bottom:36px; }

        /* ── AnimatedInput ── */
        .ai-wrap {
          position:relative;display:flex;align-items:center;
          border-bottom:1.5px solid rgba(255,198,50,.35);
          margin-bottom:28px;cursor:text;transition:border-color .3s;
        }
        .ai-wrap:focus-within { border-bottom-color:#FFC632; }

        .ai-icon { color:#FFC632;flex-shrink:0;margin-right:14px;opacity:.8; }

        /* Display visível das letras */
        .ai-display {
          flex:1;min-height:40px;display:flex;align-items:center;
          font-size:.82rem;font-weight:600;color:white;letter-spacing:.04em;
          padding:8px 0;position:relative;overflow:hidden;
        }

        /* Placeholder */
        .ai-placeholder {
          position:absolute;left:0;top:50%;transform:translateY(-50%);
          font-size:.78rem;font-weight:400;color:rgba(255,255,255,.3);letter-spacing:.05em;
          pointer-events:none;
        }

        /* Cada caractere animado */
        .ai-char {
          display:inline-block;
          animation:charIn .18s cubic-bezier(.34,1.56,.64,1) both;
        }

        @keyframes charIn {
          0% { opacity:0; transform:translateY(8px) scale(0.7); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        /* Cursor piscante */
        .ai-cursor {
          display:inline-block;width:2px;height:1em;
          background:#FFC632;margin-left:2px;border-radius:1px;
          animation:blink .9s step-end infinite;vertical-align:middle;
          opacity:0;
        }
        .ai-wrap:focus-within .ai-cursor { opacity:1; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Input real invisível */
        .ai-real-input {
          position:absolute;top:0;left:0;width:100%;height:100%;
          opacity:0;border:none;outline:none;background:transparent;
          font-size:.82rem;cursor:text;
        }

        .ai-right { position:relative;z-index:2;margin-left:8px; }

        .ai-underline-glow {
          position:absolute;bottom:-1px;left:28px;right:0;height:1px;
          background:linear-gradient(90deg,#FFC632,rgba(255,198,50,0));
          opacity:0;transition:opacity .3s;pointer-events:none;
        }
        .ai-wrap:focus-within .ai-underline-glow { opacity:1; }

        /* Bottom row */
        .bottom-row { display:flex;justify-content:space-between;align-items:center;margin-bottom:32px; }
        .remember-label { display:flex;align-items:center;gap:8px;cursor:pointer;font-size:.7rem;color:rgba(255,255,255,.55);font-weight:500;letter-spacing:.03em;user-select:none; }
        .forgot-link { font-size:.67rem;font-weight:700;color:#FFC632;text-decoration:none;letter-spacing:.04em;opacity:.85;transition:opacity .2s; }
        .forgot-link:hover { opacity:1; }

        /* Botão */
        .btn-login {
          width:100%;height:50px;border:none;border-radius:30px;
          background:linear-gradient(135deg,#FFC632 0%,#e8a800 50%,#c98f00 100%);
          color:white;font-family:'Montserrat',sans-serif;font-weight:800;font-size:.78rem;
          letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .3s;
          box-shadow:0 8px 32px rgba(255,198,50,.35),0 2px 8px rgba(0,0,0,.3);
          position:relative;overflow:hidden;
        }
        .btn-login::before {
          content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s;
        }
        .btn-login:hover::before { left:100%; }
        .btn-login:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 14px 40px rgba(255,198,50,.45),0 4px 12px rgba(0,0,0,.3); }
        .btn-login:disabled { opacity:.6;cursor:not-allowed; }

        .error-msg {
          background:rgba(185,28,28,.2);backdrop-filter:blur(8px);border:1px solid rgba(252,165,165,.3);
          border-radius:10px;padding:10px 14px;font-size:.72rem;text-align:center;
          margin-bottom:18px;color:#fca5a5;font-weight:600;letter-spacing:.02em;
        }

        .top-logo { position:absolute;top:32px;left:50%;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:10px; }
        .logo-badge {
          width:32px;height:32px;border-radius:8px;background:rgba(0,127,63,.8);
          border:1px solid rgba(255,198,50,.4);display:flex;align-items:center;justify-content:center;
          color:#FFC632;font-weight:900;font-size:.65rem;letter-spacing:.03em;backdrop-filter:blur(8px);
        }
        .logo-name { font-size:.75rem;font-weight:700;color:rgba(255,255,255,.8);letter-spacing:.05em; }
        .page-footer { position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-size:.62rem;color:rgba(255,255,255,.2);white-space:nowrap;z-index:20;font-family:'Montserrat',sans-serif;letter-spacing:.05em; }
      `}</style>

      <div className="gl-root">
        {/* SVG decorativo de fundo — identidade Petrobras */}
        <svg
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid de hexágonos (referência indústria petrolífera) */}
          <defs>
            <pattern id="hex-pattern" x="0" y="0" width="80" height="92" patternUnits="userSpaceOnUse">
              <polygon points="40,2 78,22 78,70 40,90 2,70 2,22"
                fill="none" stroke="rgba(255,198,50,0.06)" strokeWidth="1" />
            </pattern>
            <pattern id="hex-pattern-2" x="40" y="46" width="80" height="92" patternUnits="userSpaceOnUse">
              <polygon points="40,2 78,22 78,70 40,90 2,70 2,22"
                fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="fade-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(4,17,26,0)" />
              <stop offset="100%" stopColor="rgba(4,17,26,0.85)" />
            </radialGradient>
          </defs>

          {/* Hexágonos de fundo */}
          <rect width="1440" height="900" fill="url(#hex-pattern)" />
          <rect width="1440" height="900" fill="url(#hex-pattern-2)" />
          {/* Vinheta para não competir com card */}
          <rect width="1440" height="900" fill="url(#fade-center)" />

          {/* Logo Petrobras watermark — "P" estilizado grande */}
          <text x="72" y="520" fontFamily="Georgia, serif" fontSize="420" fontWeight="900"
            fill="rgba(0,127,63,0.07)" letterSpacing="-20">P</text>

          {/* Letra menor espelhada canto direito */}
          <text x="1020" y="260" fontFamily="Georgia, serif" fontSize="220" fontWeight="900"
            fill="rgba(255,198,50,0.04)" letterSpacing="-10">PETROBRAS</text>

          {/* Linha diagonal dourada superior */}
          <line x1="0" y1="0" x2="400" y2="900" stroke="rgba(255,198,50,0.05)" strokeWidth="1.5" />
          <line x1="60" y1="0" x2="460" y2="900" stroke="rgba(255,198,50,0.03)" strokeWidth="1" />

          {/* Linha diagonal direita */}
          <line x1="1440" y1="0" x2="1040" y2="900" stroke="rgba(0,127,63,0.08)" strokeWidth="1.5" />
          <line x1="1380" y1="0" x2="980" y2="900" stroke="rgba(0,127,63,0.04)" strokeWidth="1" />

          {/* Círculo decorativo canto superior direito */}
          <circle cx="1340" cy="80" r="180" fill="none" stroke="rgba(255,198,50,0.07)" strokeWidth="1.5" />
          <circle cx="1340" cy="80" r="120" fill="none" stroke="rgba(255,198,50,0.05)" strokeWidth="1" />
          <circle cx="1340" cy="80" r="60"  fill="none" stroke="rgba(255,198,50,0.04)" strokeWidth="1" />

          {/* Círculo decorativo canto inferior esquerdo */}
          <circle cx="100" cy="820" r="150" fill="none" stroke="rgba(0,127,63,0.1)" strokeWidth="1.5" />
          <circle cx="100" cy="820" r="90"  fill="none" stroke="rgba(0,127,63,0.06)" strokeWidth="1" />

          {/* Cruz/cruzinha estilizada */}
          <line x1="200" y1="140" x2="200" y2="200" stroke="rgba(255,198,50,0.18)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="170" y1="170" x2="230" y2="170" stroke="rgba(255,198,50,0.18)" strokeWidth="1.5" strokeLinecap="round" />

          <line x1="1260" y1="700" x2="1260" y2="760" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1230" y1="730" x2="1290" y2="730" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Pontos decorativos */}
          <circle cx="320" cy="80"  r="2.5" fill="rgba(255,198,50,0.3)" />
          <circle cx="340" cy="80"  r="2.5" fill="rgba(255,198,50,0.2)" />
          <circle cx="360" cy="80"  r="2.5" fill="rgba(255,198,50,0.15)" />

          <circle cx="1100" cy="820" r="2.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="1120" cy="820" r="2.5" fill="rgba(255,255,255,0.12)" />
          <circle cx="1140" cy="820" r="2.5" fill="rgba(255,255,255,0.08)" />

          {/* Símbolo petróleo — gota estilizada canto direito */}
          <path d="M1380 400 Q1410 360 1420 390 Q1430 420 1380 440 Q1330 420 1340 390 Q1350 360 1380 400 Z"
            fill="rgba(255,198,50,0.05)" stroke="rgba(255,198,50,0.1)" strokeWidth="1" />
        </svg>

        {/* Logo Petrobras — marca d'água grande no fundo */}
        <img
          src="/petrobras-logo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: "260px",
            opacity: 0.07,
            filter: "brightness(0) invert(1)",
            pointerEvents: "none",
            zIndex: 2,
            userSelect: "none",
          }}
        />

        {/* Logo menor no canto superior esquerdo também */}
        <img
          src="/petrobras-logo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "6%",
            left: "4%",
            width: "130px",
            opacity: 0.05,
            filter: "brightness(0) invert(1)",
            pointerEvents: "none",
            zIndex: 2,
            userSelect: "none",
          }}
        />

        <div className="top-logo">
          <div className="logo-badge">PB</div>
          <span className="logo-name">AcessívelBR Hub</span>
        </div>

        <div className="glass-card">
          <div className="avatar-wrap">
            <div className="avatar-ring">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          <div className="card-title">Acessar Sistema</div>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <AnimatedInput
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={setEmail}
              required
              icon={<Mail size={16} />}
            />

            <AnimatedInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              required
              icon={<Lock size={16} />}
            />

            <div className="bottom-row">
              <label className="remember-label">
                <div style={{ width:16, height:16, borderRadius:4, border:"1.5px solid rgba(255,198,50,.5)", background:"rgba(0,127,63,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="#FFC632" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Lembrar de mim
              </label>
              <a href="#" className="forgot-link">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Login"}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:".65rem", color:"rgba(255,255,255,.3)", marginTop:20, letterSpacing:".04em" }}>
            Precisa de ajuda?{" "}
            <a href="#" style={{ color:"#FFC632", fontWeight:700, textDecoration:"none", opacity:.8 }}>Suporte Interno</a>
          </p>
        </div>

        <div className="page-footer">© 2026 Petrobras · AcessívelBR Hub · Todos os direitos reservados</div>
      </div>
    </>
  )
}
