import './App.css'
import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState } from 'react'
import profilePic from './assets/profile.jpg'

const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'EJ9M9h4EEFlBZoWPp',
  SERVICE_ID: 'service_rahd7zd',
  TEMPLATE_ID: 'template_rv8hsoo',
}

const projects = [
  {
    number: '01',
    title: 'Practice Programming Lab',
    kind: 'Developer tools · Web application',
    description:
      'A programming practice dashboard for browsing source files, reviewing code, and running exercises through an interactive console across supported local toolchains.',
    stack: ['PHP', 'JavaScript', 'Process management', 'Toolchains'],
    link: 'https://github.com/sparkz8085/practice_programmming_lab',
    featured: true,
    symbol: '⌘',
  },
  {
    number: '02',
    title: 'Customer Categorization System',
    kind: 'Machine learning · API',
    description:
      'A customer segmentation and personality classification project, spanning data preparation, model workflows, API integration, and deployment preparation.',
    stack: ['Python', 'Machine learning', 'FastAPI', 'MongoDB'],
    symbol: '↗',
  },
  {
    number: '03',
    title: 'UniLab',
    kind: 'Product concept · Education',
    description:
      'An AI-assisted university practical and laboratory management concept focused on digital lab records, structured submissions, and clearer academic workflows.',
    stack: ['Next.js', 'TypeScript', 'Python', 'MongoDB'],
    symbol: '⌁',
  },
  {
    number: '04',
    title: 'Canva Graphic Design',
    kind: 'Visual design · Creative work',
    description:
      'A collection of poster, social media, form, thumbnail, and editorial-style design work created for practice and client-oriented briefs.',
    stack: ['Canva', 'Layout', 'Visual storytelling'],
    symbol: '✳',
  },
  {
    number: '05',
    title: 'Web & learning projects',
    kind: 'Selected experiments',
    description:
      'Small applications built to explore responsive interfaces, CRUD workflows, backend fundamentals, and the details that make a tool useful.',
    stack: ['React', 'Django', 'HTML/CSS', 'JavaScript'],
    symbol: '↳',
  },
]

const capabilities = [
  ['01', 'Web development', 'Responsive interfaces, practical app flows, and APIs that make ideas usable.'],
  ['02', 'AI & automation', 'Exploring ML workflows, helpful automation, and grounded AI features.'],
  ['03', 'Visual design', 'Turning rough ideas into considered layouts, graphics, and clear visual systems.'],
]

const steps = [
  ['01', 'Understand', 'Start with the problem, the people using it, and the constraints.'],
  ['02', 'Prototype', 'Make the key interaction real early, then learn from it.'],
  ['03', 'Build', 'Keep the implementation readable, responsive, and maintainable.'],
  ['04', 'Refine', 'Test the edges, improve the details, and document what matters.'],
]

function App() {
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [messageState, setMessageState] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setCommandOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formRef.current || sending) return
    setSending(true)
    setMessageState('')
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
      )
      setMessageState('Thanks — your message has been sent.')
      formRef.current.reset()
    } catch {
      setMessageState('Something went wrong. Please email me directly instead.')
    } finally {
      setSending(false)
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-frame" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kunal Sarkar, home">
          KS<span className="wordmark__dot">.</span>
          <span className="wordmark__descriptor">web · AI · design</span>
        </a>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}><span>01</span> Work</a>
          <a href="#services" onClick={closeMenu}><span>02</span> Services</a>
          <a href="#about" onClick={closeMenu}><span>03</span> About</a>
          <a href="#contact" onClick={closeMenu}><span>04</span> Contact</a>
        </nav>
        <div className="header-actions">
          <button className="command-trigger" type="button" onClick={() => setCommandOpen(true)} aria-label="Open quick navigation">
            <span>⌘K</span>
          </button>
          <a className="header-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? 'Close −' : 'Menu +'}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span>Kunal Sarkar · BCA student & builder</span>
            <span className="availability"><i aria-hidden="true" /> Open to projects & opportunities</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-index">01 / INTRO</span> Ideas into working things.</p>
              <h1 id="hero-title">I make the<br /><em>hard parts</em><br />make sense<span className="heading-period">.</span></h1>
              <p className="hero-lede">Web development, AI experiments, and thoughtful design — built one useful detail at a time.</p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="#about">A little about me <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="terrain-card" aria-label="Abstract technical wireframe illustration">
              <div className="terrain-card__top"><span>FIG. 01 — THINK / MAKE / REFINE</span><span className="live-mark">● LIVE STUDY</span></div>
              <svg className="terrain-svg" viewBox="0 0 560 490" role="img" aria-labelledby="terrain-title">
                <title id="terrain-title">A wireframe terrain rising from a technical grid</title>
                <defs>
                  <pattern id="terrainGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeOpacity=".16" strokeWidth=".7" />
                  </pattern>
                  <linearGradient id="terrainFill" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b7cf88" stopOpacity=".42" />
                    <stop offset="100%" stopColor="#b7cf88" stopOpacity=".02" />
                  </linearGradient>
                </defs>
                <rect width="560" height="490" fill="url(#terrainGrid)" />
                <g className="terrain-contours" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M-10 337 C76 322 92 277 160 283 S244 335 305 283 395 194 470 224 536 209 570 183" />
                  <path d="M-10 359 C76 344 102 300 165 305 S245 357 311 306 399 218 474 246 540 231 570 206" />
                  <path d="M-10 382 C83 365 112 323 171 328 S250 380 318 330 406 241 480 269 545 255 570 229" />
                  <path d="M-10 406 C88 388 120 347 178 351 S257 404 326 354 413 264 486 293 548 278 570 254" />
                  <path d="M-10 430 C93 412 128 370 185 375 S263 428 333 378 420 288 492 316 551 302 570 279" />
                  <path d="M-10 454 C100 436 137 394 192 398 S270 452 341 402 427 312 498 340 554 326 570 304" />
                </g>
                <path className="terrain-mountain" d="M-10 336 C76 322 92 277 160 283 S244 335 305 283 395 194 470 224 536 209 570 183 L570 490 L-10 490 Z" fill="url(#terrainFill)" />
                <g className="terrain-ridge" fill="none" stroke="#77955b" strokeWidth="1.4">
                  <path d="M160 283 L199 242 222 258 270 185 294 213 334 156 361 190 394 145 422 180 470 224" />
                  <path d="M199 242 L210 283 M270 185 L279 250 M334 156 L341 224 M394 145 L401 209" strokeDasharray="3 5" />
                </g>
                <g className="terrain-points" fill="#77955b">
                  <circle cx="270" cy="185" r="4" /><circle cx="334" cy="156" r="4" /><circle cx="394" cy="145" r="4" />
                </g>
                <g className="terrain-labels" fill="currentColor" fontSize="10" letterSpacing="1.4">
                  <text x="22" y="34">IDEA / 001</text><text x="398" y="52">BUILD SYSTEMS</text><text x="22" y="466">ROUGH TERRAIN → CLEAR PATH</text>
                </g>
                <path className="terrain-crosshair" d="M438 118 h20 M448 108 v20" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="terrain-card__bottom"><span>BUILD WITH INTENT</span><span>22°34′ N · KOLKATA, IN</span></div>
            </div>
          </div>
          <div className="hero-bottomline"><span>Mapping ideas to implementation.</span><span>Scroll to explore <span className="scroll-arrow">↓</span></span></div>
        </section>

        <section className="manifesto section-rule" aria-labelledby="manifesto-title">
          <div className="section-label"><span>02</span> / THE APPROACH</div>
          <div className="manifesto-content">
            <h2 id="manifesto-title">Keep the idea.<br />Change what gets<br /><em>in its way.</em></h2>
            <div className="manifesto-note">
              <span className="note-mark">↳ FIELD NOTE 001</span>
              <p>I like solving the bit that makes a project feel difficult: the confusing workflow, the stubborn bug, the gap between a good idea and something people can actually use.</p>
              <p>Sometimes that means code. Sometimes it means simplifying the interface. Usually, it means asking one better question first.</p>
            </div>
          </div>
          <div className="manifesto-footer"><span>CLARITY OVER COMPLEXITY</span><span>PROCESS / 01—03</span></div>
        </section>

        <section className="work-section section-rule" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div><div className="section-label"><span>03</span> / SELECTED WORK</div><h2 id="work-title">Things I’ve been<br /><em>working on.</em></h2></div>
            <p>A mix of practical builds, learning projects, and experiments. Each one is a chance to make a system a little clearer.</p>
          </div>
          <div className="work-list">
            {projects.map((project) => (
              <article className={`work-item ${project.featured ? 'work-item--featured' : ''}`} key={project.number}>
                <div className="work-item__number">{project.number}<span> / 05</span></div>
                <div className="work-item__visual" aria-hidden="true">
                  <div className="project-symbol">{project.symbol}</div>
                  <span className="visual-index">CASE STUDY / {project.number}</span>
                  <div className="visual-lines"><i /><i /><i /><i /></div>
                </div>
                <div className="work-item__details">
                  <div className="work-item__meta"><span>{project.kind}</span><span>2025—26</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tag-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                  {project.link ? <a className="case-link" href={project.link} target="_blank" rel="noreferrer">Explore project <span aria-hidden="true">↗</span></a> : <span className="work-note">Selected work / ongoing</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section section-rule" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div><div className="section-label"><span>04</span> / WHAT I EXPLORE</div><h2 id="services-title">A few ways<br /><em>I can help.</em></h2></div>
            <p>Curious by default. Focused on making useful things, learning the craft, and collaborating well.</p>
          </div>
          <div className="capability-list">
            {capabilities.map(([number, title, description]) => (
              <article className="capability" key={number}>
                <span className="capability-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="capability-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <div className="toolbox"><span className="toolbox-label">CURRENT TOOLBOX</span><div>{['React', 'JavaScript', 'Python', 'FastAPI', 'Django', 'MongoDB', 'Git & GitHub', 'Canva', 'Linux'].map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        </section>

        <section className="about-section section-rule" id="about" aria-labelledby="about-title">
          <div className="section-label"><span>05</span> / A LITTLE ABOUT ME</div>
          <div className="about-layout">
            <div className="about-portrait"><img src={profilePic} alt="Portrait of Kunal Sarkar" /><span>THE HUMAN BEHIND THE SCREEN</span></div>
            <div className="about-copy"><h2 id="about-title">Student now.<br /><em>Builder always.</em></h2><p>I’m Kunal, a BCA student at B.P. Poddar Institute of Management and Technology in Kolkata. I enjoy web development, machine learning, AI, and visual design — especially where they meet in a useful project.</p><p>I learn best by making things, breaking down problems, and refining the result. I’m still exploring, and that’s part of the point.</p><div className="about-facts"><div><span>BASED IN</span><strong>Kolkata, India</strong></div><div><span>STUDYING</span><strong>BCA · 2024—2028</strong></div><div><span>ALSO INTO</span><strong>Linux · Design · AI</strong></div></div><a className="text-link" href="https://github.com/sparkz8085" target="_blank" rel="noreferrer">More on GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="process-section section-rule" aria-labelledby="process-title">
          <div className="section-heading"><div><div className="section-label"><span>06</span> / HOW I WORK</div><h2 id="process-title">Small steps.<br /><em>Good outcomes.</em></h2></div><p>Not every project needs a grand plan. It does need a clear problem, a feedback loop, and care for the details.</p></div>
          <div className="process-grid">{steps.map(([number, title, description]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>

        <section className="contact-section section-rule" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro"><div className="section-label"><span>07</span> / NEXT UP</div><h2 id="contact-title">What are you<br /><em>building?</em></h2><p>Have a project idea, want to collaborate, or just want to talk tech? Send a note.</p><a className="contact-email" href="mailto:kunalsarkar61570@gmail.com">kunalsarkar61570@gmail.com <span aria-hidden="true">↗</span></a></div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="user_name">Your name</label><input id="user_name" type="text" name="user_name" placeholder="What should I call you?" required />
            <label htmlFor="user_email">Email address</label><input id="user_email" type="email" name="user_email" placeholder="you@example.com" required />
            <label htmlFor="subject">What’s this about?</label><input id="subject" type="text" name="subject" placeholder="A project, an idea, a question…" required />
            <label htmlFor="message">A little more detail</label><textarea id="message" name="message" rows="4" placeholder="Tell me a little about it…" required />
            <button className="button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send the note'} <span aria-hidden="true">↗</span></button>
            {messageState && <p className="form-status" role="status">{messageState}</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="#top">KS<span className="wordmark__dot">.</span></a><span>Designed with curiosity · Built in Kolkata</span><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()} Kunal Sarkar</span></footer>

      {commandOpen && <div className="command-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCommandOpen(false) }}><section className="command-panel" role="dialog" aria-modal="true" aria-labelledby="command-title"><div className="command-panel__top"><span id="command-title">QUICK NAVIGATION</span><button type="button" onClick={() => setCommandOpen(false)} aria-label="Close quick navigation">ESC ✕</button></div>{[['#work', '01 / Selected work'], ['#services', '02 / Capabilities'], ['#about', '03 / About me'], ['#contact', '04 / Contact']].map(([href, label]) => <a key={href} href={href} onClick={() => setCommandOpen(false)}>{label}<span>↗</span></a>)}<p>TIP · PRESS ESC TO CLOSE</p></section></div>}
    </div>
  )
}

export default App
