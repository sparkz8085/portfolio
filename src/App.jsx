import { useState } from 'react'
import emailjs from '@emailjs/browser'
import profilePic from './assets/profile.jpg'
import './App.css'

const projects = [
  {
    number: '01',
    type: 'AI / MACHINE LEARNING',
    title: 'CryptoX Neuron',
    description: 'An AI-assisted customer categorization platform exploring customer segmentation, data workflows, and practical ML integration.',
    stack: ['Python', 'FastAPI', 'MongoDB', 'Scikit-learn'],
    status: 'DEPLOYED PROTOTYPE',
    href: 'https://cryptox-neuron-ai.onrender.com',
    source: 'https://github.com/sparkz8085/customer_catagorization_manager',
    tone: 'lime',
    mark: 'CX',
  },
  {
    number: '02',
    type: 'DEVELOPER TOOL / WEB APP',
    title: 'Practice Programming Lab',
    description: 'A local programming dashboard to browse source files, explore code, and practise with an interactive execution workflow.',
    stack: ['PHP', 'Java', 'JavaScript'],
    status: 'IN DEVELOPMENT',
    href: 'https://github.com/sparkz8085/practice_programmming_lab',
    source: 'https://github.com/sparkz8085/practice_programmming_lab',
    tone: 'violet',
    mark: 'PL',
  },
  {
    number: '03',
    type: 'EDTECH / PRODUCT CONCEPT',
    title: 'UniLab',
    description: 'An AI-assisted university laboratory management concept designed around digital practical records, submissions, and academic workflows.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'MongoDB'],
    status: 'IN DEVELOPMENT',
    href: 'https://github.com/sparkz8085',
    source: 'https://github.com/sparkz8085',
    tone: 'blue',
    mark: 'UL',
  },
]

const skills = ['Java', 'Python', 'PHP', 'JavaScript', 'React', 'Next.js', 'FastAPI', 'MongoDB', 'MySQL', 'Git', 'Linux', 'Canva']

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
}

function SlideNav({ label, target }) {
  const [progress, setProgress] = useState(0)

  const handleSlide = (event) => {
    const next = Number(event.target.value)
    setProgress(next)
    if (next >= 96) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => setProgress(0), 350)
    }
  }

  return (
    <label className="slide-nav">
      <span className="slide-nav-label">{label}</span>
      <span className="slide-nav-track">
        <input
          aria-label={`Slide to ${label.toLowerCase()}`}
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSlide}
          style={{ '--slide-progress': `${progress}%` }}
        />
      </span>
      <span className="slide-nav-hint">DRAG TO GO</span>
    </label>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setFeedback('')
    const form = event.currentTarget
    try {
      await emailjs.sendForm(
        'service_rahd7zd',
        'template_rv8hsoo',
        form,
        { publicKey: 'EJ9M9h4EEFlBZoWPp' },
      )
      setFeedback('Message sent. Thanks for reaching out!')
      form.reset()
    } catch {
      setFeedback('Could not send the message right now. Please email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Kunal Sarkar home">KS<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">LET'S TALK <Arrow diagonal /></a>
      </header>

      <main id="home">
        <section className="hero section-wrap">
          <div className="hero-kicker"><span className="status-dot"></span> BCA STUDENT · DEVELOPER IN PROGRESS <span className="kicker-year">KOLKATA, IN</span></div>
          <div className="hero-title-wrap">
            <h1>Building digital<br /><span>things that</span> <em>matter.</em></h1>
            <div className="hero-stamp" aria-label="Kunal Sarkar monogram"><span>KS</span><small>DESIGN · CODE<br />& CURIOSITY</small></div>
          </div>
          <div className="hero-bottom">
            <p>I’m Kunal — a BCA student exploring software development, AI, and thoughtful digital experiences. I like turning curious ideas into practical projects.</p>
            <div className="hero-actions">
              <SlideNav label="EXPLORE MY WORK" target="#work" />
              <SlideNav label="SEND MESSAGE" target="#contact" />
            </div>
          </div>
          <div className="hero-index"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span><span>01 / 04</span></div>
        </section>

        <section className="marquee" aria-label="Areas of interest">
          <div className="marquee-track"><span>BUILD</span><i>✳</i><span>LEARN</span><i>✳</i><span>EXPERIMENT</span><i>✳</i><span>REFINE</span><i>✳</i><span>BUILD</span><i>✳</i><span>LEARN</span><i>✳</i><span>EXPERIMENT</span><i>✳</i><span>REFINE</span><i>✳</i></div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading">
            <div><span className="eyebrow">01 — SELECTED WORK</span><h2>Some things<br />I’ve <em>been building.</em></h2></div>
            <p>A selection of projects, experiments, and ideas I’ve worked on while learning by building.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={'project-art art-' + project.tone}>
                  <span className="art-number">{project.number} / PROJECT</span>
                  <span className="art-mark">{project.mark}</span>
                  <span className="art-caption">IDEA → IMPLEMENTATION</span>
                </div>
                <div className="project-info">
                  <div className="project-meta"><span>{project.type}</span><span className="project-status">{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="project-links"><a href={project.href} target="_blank" rel="noreferrer">VIEW PROJECT <Arrow diagonal /></a><a href={project.source} target="_blank" rel="noreferrer">SOURCE CODE <Arrow diagonal /></a></div>
                </div>
              </article>
            ))}
          </div>
          <a className="all-projects" href="https://github.com/sparkz8085" target="_blank" rel="noreferrer">MORE ON GITHUB <Arrow diagonal /></a>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-heading">
            <div><span className="eyebrow">02 — A LITTLE ABOUT ME</span><h2>Curious by nature.<br /><em>Builder by habit.</em></h2></div>
          </div>
          <div className="about-grid">
            <div className="portrait-card"><img src={profilePic} alt="Portrait of Kunal Sarkar" /><span>THE HUMAN BEHIND THE KEYBOARD</span></div>
            <div className="about-copy">
              <p className="about-lead">I’m currently pursuing a Bachelor of Computer Applications at B. P. Poddar Institute of Management and Technology.</p>
              <p>I enjoy exploring how software works — from building interfaces and APIs to experimenting with machine learning and Linux. I learn best by making things, finding what breaks, and improving them one step at a time.</p>
              <p>Outside code, I’m interested in visual design, technology, and the small details that make digital products feel clear and useful.</p>
              <a className="under-link" href="https://www.linkedin.com/in/kunal-sarkar-00a0b8449/" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN <Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section className="skills section-wrap" id="skills">
          <div className="section-heading">
            <div><span className="eyebrow">03 — MY TOOLKIT</span><h2>Tools I’m learning<br />to make <em>ideas real.</em></h2></div>
            <p>My current toolkit keeps evolving as I work on projects and learn new concepts.</p>
          </div>
          <div className="skills-panel">
            <div className="skills-label"><span>TECHNICAL & CREATIVE</span><span>12 ITEMS</span></div>
            <div className="skill-cloud">{skills.map((skill, index) => <span key={skill}><small>{String(index + 1).padStart(2, '0')}</small>{skill}</span>)}</div>
          </div>
          <div className="learning-note"><span className="status-dot"></span> ALWAYS LEARNING. ALWAYS BUILDING.</div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-top"><span className="eyebrow">04 — HAVE A PROJECT OR AN IDEA?</span><span className="contact-index">LET'S MAKE IT HAPPEN</span></div>
          <h2>Have a good<br /><em>one in mind?</em></h2>
          <div className="contact-grid">
            <div><p>I’m open to learning opportunities, collaborations, internships, and conversations around technology.</p><a className="contact-email" href="https://www.linkedin.com/in/kunal-sarkar-00a0b8449/" target="_blank" rel="noreferrer">Let’s connect on LinkedIn <Arrow diagonal /></a><div className="social-links"><a href="https://github.com/sparkz8085" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a><a href="https://www.linkedin.com/in/kunal-sarkar-00a0b8449/" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal /></a></div></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Your name<input name="from_name" placeholder="What should I call you?" required /></label>
              <label>Your email<input type="email" name="reply_to" placeholder="you@example.com" required /></label>
              <label>Your message<textarea name="message" rows="3" placeholder="Tell me a little about it..." required /></label>
              <button className="button button-lime" type="submit" disabled={sending}>{sending ? 'SENDING...' : 'SEND MESSAGE'} <Arrow diagonal /></button>
              {feedback && <p className="form-feedback" role="status">{feedback}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap"><a className="brand" href="#home">KS<span>.</span></a><span>DESIGNED & BUILT BY KUNAL SARKAR</span><a href="#home">BACK TO TOP ↑</a><span>© {new Date().getFullYear()}</span></footer>
    </div>
  )
}

export default App
