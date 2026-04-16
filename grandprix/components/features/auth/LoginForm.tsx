"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

/* ── Componente de input com animação por letra ── */
function AnimatedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  icon,
  rightElement,
  showValue = false,
}: {
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  icon: React.ReactNode
  rightElement?: React.ReactNode
  showValue?: boolean
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
  // mostra bullet quando é senha E showValue está false
  const showBullet = isPassword && !showValue
  const [focused, setFocused] = useState(false)

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
              {showBullet ? "•" : c.ch}
            </span>
          ) : null
        )}
        {/* Cursor só pisca quando focado */}
        {focused && <span className="ai-cursor" />}
      </div>

      {/* Input real invisível para capturar digitar */}
      <input
        ref={inputRef}
        type={showBullet ? "password" : "text"}
        value={value}
        onChange={handleChange}
        required={required}
        className="ai-real-input"
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
  const [showPassword, setShowPassword] = useState(false)
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
          background: #021a0d;
          position: relative;
          overflow: hidden;
        }

        /* Blobs animados */
        .blob-animated {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* ── 8 blobs cobrindo todos os cantos + centro ── */

        /* Canto superior esquerdo — verde */
        .b1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,200,80,0.95) 0%, transparent 70%);
          filter: blur(85px);
          top: -200px; left: -200px;
          animation: moveA 15s ease-in-out infinite alternate, glowG 6s ease-in-out infinite alternate;
        }

        /* Canto superior direito — amarelo */
        .b2 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(255,210,0,0.9) 0%, transparent 70%);
          filter: blur(80px);
          top: -180px; right: -180px;
          animation: moveB 18s ease-in-out infinite alternate, glowY 7s ease-in-out infinite alternate;
          animation-delay: 0s, 1.5s;
        }

        /* Canto inferior esquerdo — amarelo */
        .b3 {
          width: 580px; height: 580px;
          background: radial-gradient(circle, rgba(255,190,0,0.85) 0%, transparent 70%);
          filter: blur(90px);
          bottom: -200px; left: -180px;
          animation: moveC 20s ease-in-out infinite alternate, glowY 8s ease-in-out infinite alternate;
          animation-delay: 0s, 3s;
        }

        /* Canto inferior direito — verde */
        .b4 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,180,70,0.9) 0%, transparent 70%);
          filter: blur(85px);
          bottom: -200px; right: -200px;
          animation: moveD 17s ease-in-out infinite alternate, glowG 5s ease-in-out infinite alternate;
          animation-delay: 0s, 2s;
        }

        /* Centro — branco pulsante */
        .b5 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 65%);
          filter: blur(100px);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 5s ease-in-out infinite alternate, glowW 5s ease-in-out infinite alternate;
        }

        /* Centro esquerda — verde claro */
        .b6 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(0,220,100,0.8) 0%, transparent 70%);
          filter: blur(75px);
          top: 30%; left: -100px;
          animation: moveA 22s ease-in-out infinite alternate, glowG 9s ease-in-out infinite alternate;
          animation-delay: 0s, 4s;
        }

        /* Centro direita — amarelo */
        .b7 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(255,220,0,0.8) 0%, transparent 70%);
          filter: blur(80px);
          top: 40%; right: -100px;
          animation: moveB 19s ease-in-out infinite alternate, glowY 6s ease-in-out infinite alternate;
          animation-delay: 0s, 5s;
        }

        /* Centro topo — branco */
        .b8 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 65%);
          filter: blur(95px);
          top: -80px; left: 35%;
          animation: moveC 16s ease-in-out infinite alternate, glowW 7s ease-in-out infinite alternate;
          animation-delay: 0s, 2.5s;
        }

        /* Centro baixo — branco */
        .b9 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 65%);
          filter: blur(95px);
          bottom: -80px; left: 40%;
          animation: moveD 21s ease-in-out infinite alternate, glowW 6s ease-in-out infinite alternate;
          animation-delay: 0s, 3.5s;
        }

        /* ── Movimentos ── */
        @keyframes moveA {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(100px,80px) scale(1.1); }
          100% { transform: translate(60px,160px) scale(0.95); }
        }
        @keyframes moveB {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-90px,-80px) scale(1.15); }
          100% { transform: translate(-60px,-150px) scale(0.9); }
        }
        @keyframes moveC {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(80px,-100px) scale(1.2); }
          100% { transform: translate(-80px,80px) scale(0.85); }
        }
        @keyframes moveD {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-100px,80px) scale(1.1); }
          100% { transform: translate(80px,-60px) scale(0.9); }
        }
        @keyframes pulse {
          0%   { transform: translate(-50%,-50%) scale(0.9); }
          50%  { transform: translate(-50%,-50%) scale(1.15); }
          100% { transform: translate(-50%,-50%) scale(0.95); }
        }

        /* ── Brilhos pulsantes ── */
        @keyframes glowG {
          0%   { opacity: 0.3; filter: blur(85px) brightness(0.9); }
          50%  { opacity: 0.8; filter: blur(65px) brightness(1.5); }
          100% { opacity: 0.4; filter: blur(90px) brightness(1.0); }
        }
        @keyframes glowY {
          0%   { opacity: 0.25; filter: blur(90px) brightness(0.8); }
          50%  { opacity: 0.75; filter: blur(70px) brightness(1.6); }
          100% { opacity: 0.35; filter: blur(95px) brightness(1.0); }
        }
        @keyframes glowW {
          0%   { opacity: 0.08; filter: blur(100px) brightness(1.0); }
          50%  { opacity: 0.5;  filter: blur(75px) brightness(2.2); }
          100% { opacity: 0.12; filter: blur(105px) brightness(1.2); }
        }

        /* Blur overlay — foco no card */
        .blur-overlay {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(2, 14, 6, 0.22);
          pointer-events: none;
          z-index: 3;
        }

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
        {/* 9 blobs cobrindo toda a tela — verde, amarelo e branco */}
        <div className="blob-animated b1" />
        <div className="blob-animated b2" />
        <div className="blob-animated b3" />
        <div className="blob-animated b4" />
        <div className="blob-animated b5" />
        <div className="blob-animated b6" />
        <div className="blob-animated b7" />
        <div className="blob-animated b8" />
        <div className="blob-animated b9" />

        {/* Blur overlay — suaviza o fundo e dá foco ao card */}
        <div className="blur-overlay" />





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
              showValue={showPassword}
              required
              icon={<Lock size={16} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background:"transparent", border:"none", cursor:"pointer", color:"rgba(255,198,50,0.6)", display:"flex", alignItems:"center", padding:"4px", transition:"color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#FFC632")}
                  onMouseLeave={e => (e.currentTarget.style.color="rgba(255,198,50,0.6)")}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
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
