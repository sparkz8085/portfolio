import './App.css'
import './ScrollExperience.css'
import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const terrainSvgRef = useRef(null)
  const terrainRidgeRef = useRef(null)
  const terrainContoursRef = useRef(null)
  const terrainPointerVerticalRef = useRef(null)
  const terrainPointerHorizontalRef = useRef(null)
  const terrainPointerDotRef = useRef(null)
  const terrainPointerLabelRef = useRef(null)
  const terrainReadoutRef = useRef(null)
  const signatureRef = useRef(null)
  const geometrySvgRef = useRef(null)
  const geometryVerticalRef = useRef(null)
  const geometryHorizontalRef = useRef(null)
  const geometryProbeRef = useRef(null)
  const geometryProbeLabelRef = useRef(null)
  const geometryReadoutRef = useRef(null)
  const workStoryRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)
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

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrowScreen = window.matchMedia('(max-width: 900px)').matches
    if (reduceMotion || narrowScreen) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const signatureContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: signatureRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
      })

      timeline
        .set('#letterKMask', { attr: { width: 0 } }, 0)
        .set('#letterSMask', { attr: { width: 0 } }, 0)
        .to('#letterKMask', { attr: { width: 490 }, duration: 0.9, ease: 'none' }, 0.05)
        .to('.signature-guide--stem', { scaleY: 1, duration: 0.45, ease: 'none' }, 0.2)
        .to('.signature-diagonal', { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, 0.23)
        .to('.geometry-circle:not(.geometry-circle--dashed)', { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, 0.34)
        .to('.geometry-dimension', { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, 0.48)
        .to('.geometry-angle-arc', { strokeDashoffset: 0, duration: 0.45, ease: 'none' }, 0.58)
        .to('.geometry-extension', { opacity: 1, duration: 0.3, ease: 'none' }, 0.5)
        .to('#letterSMask', { attr: { width: 850 }, duration: 0.85, ease: 'none' }, 0.72)
        .to('.signature-annotations', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, 1.24)
    }, signatureRef)

    const workContext = gsap.context(() => {
      let lastStep = -1
      ScrollTrigger.create({
        trigger: workStoryRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (trigger) => {
          const nextStep = Math.min(projects.length, Math.floor(trigger.progress * (projects.length + 1)))
          if (nextStep !== lastStep) {
            lastStep = nextStep
            setActiveProject(nextStep)
          }
        },
      })
    }, workStoryRef)

    return () => {
      signatureContext.revert()
      workContext.revert()
    }
  }, [])

  const handleTerrainPointerMove = (event) => {
    const svg = terrainSvgRef.current
    const matrix = svg?.getScreenCTM()
    if (!svg || !matrix) return

    const pointer = svg.createSVGPoint()
    pointer.x = event.clientX
    pointer.y = event.clientY
    const local = pointer.matrixTransform(matrix.inverse())
    const x = Math.max(0, Math.min(560, local.x))
    const y = Math.max(0, Math.min(490, local.y))
    const normalX = x / 560 - 0.5
    const normalY = y / 490 - 0.5
    const roundedX = Math.round(x).toString().padStart(3, '0')
    const roundedY = Math.round(y).toString().padStart(3, '0')

    terrainPointerVerticalRef.current?.setAttribute('x1', String(x))
    terrainPointerVerticalRef.current?.setAttribute('x2', String(x))
    terrainPointerHorizontalRef.current?.setAttribute('y1', String(y))
    terrainPointerHorizontalRef.current?.setAttribute('y2', String(y))
    terrainPointerDotRef.current?.setAttribute('cx', String(x))
    terrainPointerDotRef.current?.setAttribute('cy', String(y))

    const labelX = x > 420 ? x - 114 : x + 12
    const labelY = y < 35 ? y + 20 : y - 10
    terrainPointerLabelRef.current?.setAttribute('x', String(labelX))
    terrainPointerLabelRef.current?.setAttribute('y', String(labelY))

    if (terrainRidgeRef.current) {
      terrainRidgeRef.current.setAttribute(
        'transform',
        'translate(' + (-normalX * 7).toFixed(2) + ' ' + (-normalY * 5).toFixed(2) + ')',
      )
    }
    if (terrainContoursRef.current) {
      terrainContoursRef.current.setAttribute(
        'transform',
        'translate(' + (normalX * 3.5).toFixed(2) + ' ' + (normalY * 2.5).toFixed(2) + ')',
      )
    }

    let nearestName = 'TERRAIN SURVEY'
    let nearestDistance = Infinity
    svg.querySelectorAll('[data-terrain-node]').forEach((node) => {
      const nodeX = Number(node.getAttribute('cx'))
      const nodeY = Number(node.getAttribute('cy'))
      const distance = Math.hypot(x - nodeX, y - nodeY)
      node.classList.toggle('is-near', distance < 34)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestName = node.getAttribute('data-terrain-node') || nearestName
      }
    })

    svg.classList.add('is-interacting')
    svg.closest('.terrain-card')?.classList.add('is-interacting')
    if (terrainReadoutRef.current) {
      terrainReadoutRef.current.textContent =
        (nearestDistance < 34 ? nearestName + '  /  ' : 'CURSOR  /  ') +
        'X ' + roundedX + '  ·  Y ' + roundedY
    }
  }

  const handleTerrainPointerLeave = () => {
    const svg = terrainSvgRef.current
    svg?.classList.remove('is-interacting')
    svg?.closest('.terrain-card')?.classList.remove('is-interacting')
    svg?.querySelectorAll('[data-terrain-node]').forEach((node) => node.classList.remove('is-near'))
    terrainRidgeRef.current?.removeAttribute('transform')
    terrainContoursRef.current?.removeAttribute('transform')
    if (terrainReadoutRef.current) {
      terrainReadoutRef.current.textContent = 'HOVER GRAPH TO INSPECT'
    }
  }

  const handleGeometryPointerMove = (event) => {
    const svg = geometrySvgRef.current
    const matrix = svg?.getScreenCTM()
    if (!svg || !matrix) return

    const pointer = svg.createSVGPoint()
    pointer.x = event.clientX
    pointer.y = event.clientY
    const local = pointer.matrixTransform(matrix.inverse())
    const x = Math.max(0, Math.min(1000, local.x))
    const y = Math.max(0, Math.min(520, local.y))
    const roundedX = Math.round(x)
    const roundedY = Math.round(y)

    geometryVerticalRef.current?.setAttribute('x1', String(x))
    geometryVerticalRef.current?.setAttribute('x2', String(x))
    geometryHorizontalRef.current?.setAttribute('y1', String(y))
    geometryHorizontalRef.current?.setAttribute('y2', String(y))
    geometryProbeRef.current?.setAttribute('cx', String(x))
    geometryProbeRef.current?.setAttribute('cy', String(y))

    const labelX = x > 800 ? x - 172 : x + 14
    const labelY = y < 42 ? y + 25 : y - 12
    geometryProbeLabelRef.current?.setAttribute('x', String(labelX))
    geometryProbeLabelRef.current?.setAttribute('y', String(labelY))

    let nearestNode = null
    let nearestDistance = Infinity
    svg.querySelectorAll('[data-geometry-node]').forEach((node) => {
      const nodeX = Number(node.getAttribute('cx'))
      const nodeY = Number(node.getAttribute('cy'))
      const distance = Math.hypot(x - nodeX, y - nodeY)
      node.classList.toggle('is-near', distance < 36)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestNode = node
      }
    })

    const snapNode = nearestDistance < 36 ? nearestNode : null
    const nodeName = snapNode?.getAttribute('data-geometry-node')
    if (geometryReadoutRef.current) {
      geometryReadoutRef.current.textContent = nodeName
        ? nodeName + '  ·  X ' + roundedX + '  /  Y ' + roundedY
        : 'CURSOR  ·  X ' + roundedX + '  /  Y ' + roundedY
    }
    svg.classList.add('is-tracking')
  }

  const handleGeometryPointerLeave = () => {
    const svg = geometrySvgRef.current
    svg?.classList.remove('is-tracking')
    svg?.querySelectorAll('[data-geometry-node]').forEach((node) => node.classList.remove('is-near'))
    if (geometryReadoutRef.current) {
      geometryReadoutRef.current.textContent = 'MOVE POINTER TO INSPECT GEOMETRY'
    }
  }

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
  const activeCase = activeProject < projects.length ? projects[activeProject] : null

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
              <h1 id="hero-title">I build things<br /><em>that work</em><br />beautifully<span className="heading-period">.</span></h1>
              <p className="hero-lede">From web apps and AI-powered workflows to thoughtful visual systems, I turn practical problems into digital experiences people can actually use.</p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="#about">A little about me <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="terrain-card" aria-label="Interactive topographic wireframe illustration">
              <div className="terrain-card__top"><span>FIG. 01 — THINK / MAKE / REFINE</span><span className="live-mark">● LIVE STUDY</span></div>
              <svg
                ref={terrainSvgRef}
                className="terrain-svg"
                viewBox="0 0 560 490"
                role="img"
                aria-label="Interactive topographic terrain: move the pointer to inspect coordinates and ridge points."
                onPointerMove={handleTerrainPointerMove}
                onPointerLeave={handleTerrainPointerLeave}
              >
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
                <g ref={terrainContoursRef} className="terrain-contours" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M-10 337 C76 322 92 277 160 283 S244 335 305 283 395 194 470 224 536 209 570 183" />
                  <path d="M-10 359 C76 344 102 300 165 305 S245 357 311 306 399 218 474 246 540 231 570 206" />
                  <path d="M-10 382 C83 365 112 323 171 328 S250 380 318 330 406 241 480 269 545 255 570 229" />
                  <path d="M-10 406 C88 388 120 347 178 351 S257 404 326 354 413 264 486 293 548 278 570 254" />
                  <path d="M-10 430 C93 412 128 370 185 375 S263 428 333 378 420 288 492 316 551 302 570 279" />
                  <path d="M-10 454 C100 436 137 394 192 398 S270 452 341 402 427 312 498 340 554 326 570 304" />
                </g>
                <path className="terrain-mountain" d="M-10 336 C76 322 92 277 160 283 S244 335 305 283 395 194 470 224 536 209 570 183 L570 490 L-10 490 Z" fill="url(#terrainFill)" />
                <g ref={terrainRidgeRef} className="terrain-ridge" fill="none" stroke="#77955b" strokeWidth="1.4">
                  <path d="M160 283 L199 242 222 258 270 185 294 213 334 156 361 190 394 145 422 180 470 224" />
                  <path d="M199 242 L210 283 M270 185 L279 250 M334 156 L341 224 M394 145 L401 209" strokeDasharray="3 5" />
                </g>
                <g className="terrain-points" fill="#77955b">
                  <circle data-terrain-node="RIDGE 01" cx="270" cy="185" r="4" />
                  <circle data-terrain-node="RIDGE 02" cx="334" cy="156" r="4" />
                  <circle data-terrain-node="RIDGE 03" cx="394" cy="145" r="4" />
                </g>
                <g className="terrain-labels" fill="currentColor" fontSize="10" letterSpacing="1.4">
                  <text x="22" y="34">IDEA / 001</text><text x="398" y="52">BUILD SYSTEMS</text><text x="22" y="466">ROUGH TERRAIN → CLEAR PATH</text>
                </g>
                <path className="terrain-crosshair" d="M438 118 h20 M448 108 v20" stroke="currentColor" strokeWidth="1" />
                <g className="terrain-pointer-layer" pointerEvents="none">
                  <line ref={terrainPointerVerticalRef} className="terrain-pointer-line" x1="280" x2="280" y1="0" y2="490" />
                  <line ref={terrainPointerHorizontalRef} className="terrain-pointer-line" x1="0" x2="560" y1="245" y2="245" />
                  <circle ref={terrainPointerDotRef} className="terrain-pointer-dot" cx="280" cy="245" r="5" />
                  <text ref={terrainPointerLabelRef} className="terrain-pointer-label" x="292" y="235">X 280 · Y 245</text>
                </g>
              </svg>
              <div className="terrain-card__bottom"><span>BUILD WITH INTENT</span><span ref={terrainReadoutRef} className="terrain-readout" aria-live="polite">HOVER GRAPH TO INSPECT</span></div>
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

        <section ref={signatureRef} className="signature-section" aria-labelledby="signature-title">
          <div className="signature-stage">
            <div className="signature-stage__heading">
              <div>
                <div className="section-label"><span>03</span> / SIGNATURE STUDY</div>
                <h2 id="signature-title">A name becomes<br /><em>a system.</em></h2>
              </div>
              <p>Scroll to assemble the KS mark. Move your pointer across the board to inspect coordinates, snap to anchor nodes, and trace measured geometry.</p>
            </div>
            <div className="signature-board">
              <svg
                ref={geometrySvgRef}
                className="signature-svg geometry-interactive"
                viewBox="0 0 1000 520"
                role="img"
                aria-label="Interactive KS geometry board. Move the pointer to inspect coordinates and construction nodes."
                onPointerMove={handleGeometryPointerMove}
                onPointerLeave={handleGeometryPointerLeave}
              >
                <defs>
                  <marker id="geometryArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff5a1f" />
                  </marker>
                  <pattern id="geometryFineGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M10 0H0V10" fill="none" stroke="#ffffff" strokeOpacity=".045" strokeWidth=".5" />
                  </pattern>
                  <clipPath id="letterKReveal" clipPathUnits="userSpaceOnUse">
                    <rect id="letterKMask" x="0" y="0" width="490" height="520" />
                  </clipPath>
                  <clipPath id="letterSReveal" clipPathUnits="userSpaceOnUse">
                    <rect id="letterSMask" x="0" y="0" width="850" height="520" />
                  </clipPath>
                </defs>
                <rect width="1000" height="520" fill="url(#geometryFineGrid)" pointerEvents="none" />
                <g className="geometry-construction" pointerEvents="none">
                  <path className="signature-guide signature-diagonal" d="M155 430 L520 65" />
                  <path className="signature-guide signature-diagonal" d="M300 65 L690 455" />
                  <line className="signature-crosshair" x1="0" y1="260" x2="1000" y2="260" />
                  <line className="signature-crosshair" x1="500" y1="0" x2="500" y2="520" />
                  <path className="geometry-construction-line geometry-circle" d="M 253 260 m -128 0 a 128 128 0 1 0 256 0 a 128 128 0 1 0 -256 0" />
                  <circle className="geometry-circle" cx="505" cy="260" r="172" />
                  <path className="geometry-circle geometry-circle--dashed" d="M 253 260 L 505 260 L 505 8" />
                  <path className="geometry-angle-arc" d="M 430 260 A 75 75 0 0 0 451 207" />
                  <text className="signature-measure" x="440" y="225">45°</text>
                  <line className="geometry-extension" x1="202" y1="105" x2="220" y2="105" />
                  <line className="geometry-extension" x1="202" y1="365" x2="220" y2="365" />
                  <line className="geometry-dimension" x1="202" y1="105" x2="202" y2="365" markerStart="url(#geometryArrow)" markerEnd="url(#geometryArrow)" />
                  <text className="geometry-dimension-label" x="187" y="236" transform="rotate(-90 187 236)">3.7 U / STEM</text>
                  <line className="geometry-extension" x1="220" y1="390" x2="220" y2="410" />
                  <line className="geometry-extension" x1="272" y1="390" x2="272" y2="410" />
                  <line className="geometry-dimension" x1="220" y1="400" x2="272" y2="400" markerStart="url(#geometryArrow)" markerEnd="url(#geometryArrow)" />
                  <text className="geometry-dimension-label" x="223" y="423">0.75 U</text>
                  <line className="geometry-dimension geometry-dimension--diagonal" x1="344" y1="181" x2="425" y2="100" markerStart="url(#geometryArrow)" markerEnd="url(#geometryArrow)" />
                  <text className="geometry-dimension-label" x="369" y="126" transform="rotate(-45 369 126)">45° / DIAGONAL</text>
                  <path className="geometry-extension" d="M 155 430 L 155 450 M 520 65 L 540 65" />
                  <text className="geometry-dimension-label" x="160" y="472">X = Y / 1:1 RATIO</text>
                </g>
                <g className="geometry-hover-layer" pointerEvents="none">
                  <line ref={geometryVerticalRef} className="geometry-hover-line" x1="500" x2="500" y1="0" y2="520" />
                  <line ref={geometryHorizontalRef} className="geometry-hover-line" x1="0" x2="1000" y1="260" y2="260" />
                  <circle ref={geometryProbeRef} className="geometry-probe" cx="500" cy="260" r="6" />
                  <text ref={geometryProbeLabelRef} className="geometry-probe-label" x="514" y="248">CURSOR</text>
                </g>
                <line className="signature-guide--stem" x1="253" y1="90" x2="253" y2="420" />
                <text className="signature-letter signature-letter--outline" x="220" y="365">K</text>
                <text className="signature-letter signature-letter--outline" x="470" y="365">S</text>
                <text className="signature-letter signature-letter--solid" clipPath="url(#letterKReveal)" x="220" y="365">K</text>
                <text className="signature-letter signature-letter--solid" clipPath="url(#letterSReveal)" x="470" y="365">S</text>
                <circle className="signature-anchor" data-geometry-node="STEM NODE" cx="253" cy="260" r="5" />
                <circle className="signature-anchor" data-geometry-node="UPPER DIAGONAL NODE" cx="650" cy="65" r="5" />
                <circle className="signature-anchor" data-geometry-node="BASELINE NODE" cx="830" cy="470" r="5" />
                <g className="signature-annotations">
                  <text className="signature-measure" x="274" y="103">STEM / 3.7U</text>
                  <text className="signature-measure" x="673" y="91">45° / CONSTRUCTION</text>
                  <text className="signature-measure" x="670" y="446">KS / IDENTITY SYSTEM</text>
                </g>
              </svg>
              <div className="signature-board__caption"><span>FORM STUDY <strong>— 001</strong></span><span ref={geometryReadoutRef} className="geometry-coordinate-readout" aria-live="polite">MOVE POINTER TO INSPECT GEOMETRY</span><span>GEOMETRY · LETTER · IDENTITY</span></div>
            </div>
            <div className="signature-footer"><span><i /> SCROLL-DRIVEN CONSTRUCTION</span><span>FROM SHAPE TO SIGNATURE ↓</span></div>
          </div>
        </section>

        <section ref={workStoryRef} className="work-story-section" id="work" aria-labelledby="work-title">
          <div className="work-story-stage">
            <div className="work-story-head">
              <div>
                <div className="section-label"><span>04</span> / SELECTED WORK</div>
                <h2 id="work-title">Things I’ve been<br /><em>building.</em></h2>
              </div>
              <p className="work-story-head__note">Every project, in one view. Keep scrolling to inspect each build, its role, the tools behind it, and the problem it explores.</p>
            </div>

            <div className="work-story-layout">
              <aside className="project-details-panel" aria-live="polite" aria-atomic="true">
                {activeCase ? (
                  <div className="project-details-enter" key={activeProject}>
                    <div className="project-details-panel__index">{activeCase.number} / 05 — CASE STUDY</div>
                    <div className="project-details-panel__kind">{activeCase.kind}</div>
                    <h3>{activeCase.title}</h3>
                    <p>{activeCase.description}</p>
                    <ul className="tag-list">{activeCase.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                    {activeCase.link ? (
                      <a className="case-link" href={activeCase.link} target="_blank" rel="noreferrer">Explore project <span aria-hidden="true">↗</span></a>
                    ) : (
                      <span className="work-note">Selected work / learning in progress</span>
                    )}
                  </div>
                ) : (
                  <div className="project-details-enter project-profile-detail" key="profile">
                    <div className="project-details-panel__index">06 / THE BUILDER</div>
                    <div className="profile-detail__portrait"><img src={profilePic} alt="Kunal Sarkar" /></div>
                    <div className="project-details-panel__kind">BCA STUDENT · WEB / AI / DESIGN</div>
                    <h3>Kunal<br /><em>Sarkar.</em></h3>
                    <p>I’m a Kolkata-based student and builder who likes turning complicated ideas into clear, useful digital experiences.</p>
                    <div className="profile-detail__facts"><span>KOLKATA, INDIA</span><span>LEARN · BUILD · REFINE</span></div>
                    <a className="case-link" href="#about">Meet me properly <span aria-hidden="true">↗</span></a>
                  </div>
                )}
              </aside>

              <div className="project-wall" aria-label="All selected projects and profile">
                {projects.map((project, index) => (
                  <button
                    className={'project-tile ' + (activeProject === index ? 'project-tile--active' : '')}
                    type="button"
                    key={project.number}
                    aria-pressed={activeProject === index}
                    onClick={() => setActiveProject(index)}
                  >
                    <span className="project-tile__index"><span>CASE / {project.number}</span><b>{activeProject === index ? 'ACTIVE' : 'OPEN'}</b></span>
                    <span className={'project-art project-art--' + (index + 1)} aria-hidden="true">
                      <span className="project-art__label">{['SOURCE / 001', 'SEGMENTS / 002', 'WORKFLOW / 003', 'COMPOSITION / 004', 'INTERFACE / 005'][index]}</span>
                      {index === 0 && <span className="art-terminal"><span>$ php runner</span><br /><span>01&nbsp; compile()</span><br /><span>02&nbsp; execute()</span><i /></span>}
                      {index === 1 && <span className="art-node-map"><i /><i /><i /><i /></span>}
                      {index === 2 && <span className="art-dashboard"><i /><i /><i /><i /></span>}
                      {index === 3 && <span className="art-poster"><span>VISUAL STUDY / 24</span><b>IDEA<br />→ FORM</b><span>LAYOUT / SYSTEM</span></span>}
                      {index === 4 && <span className="art-browser"><span className="art-browser__bar"><i /><i /><i /></span><span className="art-browser__body"><i /><i /><i /><i /></span></span>}
                    </span>
                    <span className="project-tile__title"><strong>{project.title}</strong><span>{project.number} ↗</span></span>
                    <span className="project-tile__kind">{project.kind}</span>
                  </button>
                ))}
                <button
                  className={'project-tile profile-tile ' + (activeProject === projects.length ? 'project-tile--active' : '')}
                  type="button"
                  aria-pressed={activeProject === projects.length}
                  onClick={() => setActiveProject(projects.length)}
                >
                  <span className="project-tile__index"><span>PROFILE / 006</span><b>{activeProject === projects.length ? 'ACTIVE' : 'ABOUT'}</b></span>
                  <span className="profile-tile__art" aria-hidden="true"><img src={profilePic} alt="" /></span>
                  <span className="project-tile__title"><strong>Kunal Sarkar</strong><span>06 ↗</span></span>
                  <span className="project-tile__kind">The person behind the projects</span>
                </button>
              </div>
            </div>

            <div className="work-story-footer">
              <span className="story-footer__status"><i /> SCROLL TO INSPECT</span>
              <div
                className="story-progress"
                role="progressbar"
                aria-label="Portfolio story progress"
                aria-valuemin={1}
                aria-valuemax={projects.length + 1}
                aria-valuenow={activeProject + 1}
              >
                <span style={{ width: String(((activeProject + 1) / (projects.length + 1)) * 100) + '%' }} />
              </div>
              <span className="story-footer__count">{String(activeProject + 1).padStart(2, '0')} / 06</span>
            </div>
          </div>
        </section>

        <section className="services-section section-rule" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div><div className="section-label"><span>05</span> / WHAT I EXPLORE</div><h2 id="services-title">A few ways<br /><em>I can help.</em></h2></div>
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
          <div className="section-label"><span>06</span> / A LITTLE ABOUT ME</div>
          <div className="about-layout">
            <div className="about-portrait"><img src={profilePic} alt="Portrait of Kunal Sarkar" /><span>THE HUMAN BEHIND THE SCREEN</span></div>
            <div className="about-copy"><h2 id="about-title">Student now.<br /><em>Builder always.</em></h2><p>I’m Kunal, a BCA student at B.P. Poddar Institute of Management and Technology in Kolkata. I enjoy web development, machine learning, AI, and visual design — especially where they meet in a useful project.</p><p>I learn best by making things, breaking down problems, and refining the result. I’m still exploring, and that’s part of the point.</p><div className="about-facts"><div><span>BASED IN</span><strong>Kolkata, India</strong></div><div><span>STUDYING</span><strong>BCA · 2024—2028</strong></div><div><span>ALSO INTO</span><strong>Linux · Design · AI</strong></div></div><a className="text-link" href="https://github.com/sparkz8085" target="_blank" rel="noreferrer">More on GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="process-section section-rule" aria-labelledby="process-title">
          <div className="section-heading"><div><div className="section-label"><span>07</span> / HOW I WORK</div><h2 id="process-title">Small steps.<br /><em>Good outcomes.</em></h2></div><p>Not every project needs a grand plan. It does need a clear problem, a feedback loop, and care for the details.</p></div>
          <div className="process-grid">{steps.map(([number, title, description]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>

        <section className="contact-section section-rule" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro"><div className="section-label"><span>08</span> / NEXT UP</div><h2 id="contact-title">What are you<br /><em>building?</em></h2><p>Have a project idea, want to collaborate, or just want to talk tech? Send a note.</p><a className="contact-email" href="mailto:kunalsarkar61570@gmail.com">kunalsarkar61570@gmail.com <span aria-hidden="true">↗</span></a></div>
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
