import './App.css'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import LightPillar from './components/LightPillar'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import profilePic from './assets/profile.jpg'

// EmailJS Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'EJ9M9h4EEFlBZoWPp',
  SERVICE_ID: 'service_rahd7zd',
  TEMPLATE_ID: 'template_rv8hsoo',
}

function App() {
  const aboutRef = useScrollAnimation()
  const eduRef = useScrollAnimation()
  const skillsRef = useScrollAnimation()
  const projectsRef = useScrollAnimation()
  const contactRef = useScrollAnimation()
  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formRef.current) {
      alert('Form is not ready. Please refresh and try again.')
      return
    }

    emailjs
      .sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      )
      .then((result) => {
        alert('Message sent successfully!')
        console.log('EmailJS success:', {
          status: result?.status,
          text: result?.text,
        })
        formRef.current.reset()
      })
      .catch((error) => {
        const status = error?.status
          ? `Status ${error.status}`
          : 'Unknown status'
        const reason =
          error?.text || error?.message || 'Unknown error'

        alert(`Failed to send message. ${status}: ${reason}`)
        console.error('EmailJS error:', error)
      })
  }

  const skills = [
    'C Programming',
    'Java',
    'Python',
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Django',
    'FastAPI',
    'Machine Learning',
    'Git & GitHub',
    'MongoDB',
    'Docker',
    'Canva',
  ]

  const projects = [
    {
      title: 'Customer Categorization System',
      description:
        'A machine learning project for customer segmentation and personality classification. I contributed to the ML core, data processing, model pipeline, prediction workflow, debugging, and deployment preparation.',
      stack:
        'Python, Machine Learning, FastAPI, MongoDB, AWS S3, Docker',
    },
    {
      title: 'Calculator Web App',
      description:
        'A web-based calculator application designed with a clean and intuitive interface, focusing on responsive UI and reliable calculation functionality.',
      stack: 'Django, HTML, CSS, JavaScript',
    },
    {
      title: 'Web Inventory System',
      description:
        'A web-based inventory management project designed to organize products, monitor stock information, and simplify inventory-related operations.',
      stack: 'React, Django, Database',
    },
    {
      title: 'Django Notes Project',
      description:
        'A Django-based notes management application built to practice backend development, templates, CRUD functionality, routing, and database interaction.',
      stack: 'Python, Django, HTML, CSS',
    },
    {
      title: 'Personal Portfolio',
      description:
        'A modern responsive portfolio website featuring animated sections, glassmorphic UI elements, project showcases, social links, and an EmailJS-powered contact form.',
      stack: 'React, Vite, JavaScript, CSS, EmailJS',
    },
    {
      title: 'Canva Graphic Design',
      description:
        'A collection of creative design work including professional forms, posters, newspaper-style graphics, thumbnails, social media designs, and custom client-oriented visuals.',
      stack: 'Canva, Graphic Design, Visual Design',
    },
  ]

  return (
    <>
      <div className="page-background">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={0.6}
          rotationSpeed={0.2}
          quality="medium"
          className="page-light"
          glowAmount={0.003}
          pillarWidth={4.0}
          pillarHeight={0.3}
        />
      </div>

      <div className="page-shell">
        {/* HERO */}
        <header className="hero" id="home">
          <div className="hero__badge">
            BCA Student • Developer • Designer
          </div>

          <div className="hero__profile">
            <img
              src={profilePic}
              alt="Kunal Sarkar"
              className="profile-pic"
            />
          </div>

          <h1>
            Kunal Sarkar
            <span>
              Building practical digital experiences while learning every day.
            </span>
          </h1>

          <p>
            I am a Bachelor of Computer Applications student at BPPIMT,
            Salt Lake. I enjoy building web applications, exploring
            machine learning, and creating visually engaging designs.
          </p>

          <div className="hero__actions">
            <a href="#projects">View Projects</a>
            <a href="#contact" className="ghost">
              Contact Me
            </a>
          </div>
        </header>

        <main>
          {/* ABOUT */}
          <section
            className="about-section"
            id="about"
            ref={aboutRef}
          >
            <div className="about-container">
              <div className="about-left">
                <h2>
                  BCA Student & <span>Tech Enthusiast</span>
                </h2>

                <p>
                  I'm a Bachelor of Computer Applications (BCA) student
                  at B.P. Poddar Institute of Management and Technology,
                  with an interest in web development, machine learning,
                  generative AI, and software development.
                </p>

                <p>
                  I enjoy turning ideas into practical projects and
                  continuously improving my programming and development
                  skills through hands-on work.
                </p>

                <div className="about-info-grid">
                  <div className="info-item">
                    <label>Name:</label>
                    <p>Kunal Sarkar</p>
                  </div>

                  <div className="info-item">
                    <label>College:</label>
                    <p>
                      B.P. Poddar Institute of Management and Technology
                    </p>
                  </div>

                  <div className="info-item">
                    <label>Stream:</label>
                    <p>BCA</p>
                  </div>

                  <div className="info-item">
                    <label>Session:</label>
                    <p>2024–2028</p>
                  </div>
                </div>
              </div>

              <div className="about-right">
                <div className="expertise-grid">
                  <div className="expertise-card">
                    <div className="expertise-icon">
                      <span className="skill-badge">HTML</span>
                    </div>
                    <h3>HTML</h3>
                    <p>
                      Structured and semantic web page development.
                    </p>
                  </div>

                  <div className="expertise-card">
                    <div className="expertise-icon">
                      <span className="skill-badge">CSS</span>
                    </div>
                    <h3>CSS</h3>
                    <p>
                      Responsive layouts and modern visual styling.
                    </p>
                  </div>

                  <div className="expertise-card">
                    <div className="expertise-icon">
                      <span className="skill-badge">JS</span>
                    </div>
                    <h3>JavaScript</h3>
                    <p>
                      Interactive interfaces and web functionality.
                    </p>
                  </div>

                  <div className="expertise-card">
                    <div className="expertise-icon">
                      <span className="skill-badge">PY</span>
                    </div>
                    <h3>Python</h3>
                    <p>
                      Backend development, automation, data and ML.
                    </p>
                  </div>

                  <div className="expertise-card">
                    <div className="expertise-icon">
                      <span className="skill-badge">ML</span>
                    </div>
                    <h3>Machine Learning</h3>
                    <p>
                      Practical ML pipelines and prediction systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATION + SKILLS */}
          <section className="grid-two">
            <article
              className="card"
              id="education"
              ref={eduRef}
            >
              <h2>Education</h2>

              <div className="timeline-item">
                <h3>
                  Bachelor of Computer Applications (BCA)
                </h3>

                <p>
                  B.P. Poddar Institute of Management and Technology,
                  Salt Lake
                </p>

                <span>2024–2028 • Current Student</span>
              </div>
            </article>

            <article
              className="card"
              id="skills"
              ref={skillsRef}
            >
              <h2>Skills</h2>

              <ul className="pill-list">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </section>

          {/* PROJECTS */}
          <section
            className="card"
            id="projects"
            ref={projectsRef}
          >
            <h2>Projects & Creative Work</h2>

            <div className="project-grid">
              {projects.map((project) => (
                <article
                  className="project-card"
                  key={project.title}
                >
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <span>{project.stack}</span>
                </article>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section
            className="contact-section"
            id="contact"
            ref={contactRef}
          >
            <div className="contact-header">
              <h2>
                Get In <span>Touch</span>
              </h2>

              <p>
                Have a project in mind or want to collaborate?
                I'd love to hear from you. Let's create something
                useful and interesting together!
              </p>
            </div>

            <div className="contact-container">
              <div className="contact-left">
                <div className="contact-card">
                  <h3>Let's Connect</h3>

                  <p>
                    I'm open to discussing projects, design work,
                    development opportunities, and interesting
                    technology ideas.
                  </p>

                  <div className="contact-email-box">
                    <div className="email-icon">✉️</div>

                    <div>
                      <h4>Email</h4>

                      <a href="mailto:kunalsarkar61570@gmail.com">
                        kunalsarkar61570@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <h3>Follow Me</h3>

                  <div className="social-links">
                    <a
                      href="https://github.com/sparkz8085"
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.666-2.236-1.017 0-1.624.683-1.89 1.346-.097.237-.122.568-.122.899v5.56h-3.555v-11.3h3.555v1.545c.477-.734 1.332-1.78 3.241-1.78 2.366 0 4.14 1.545 4.14 4.87v6.665zM5.337 9.433c-1.144 0-2.063-.931-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.134-.925 2.065-2.064 2.065zm1.782 11.019H3.555V8.152h3.564v12.3zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* CONTACT FORM */}
              <div className="contact-right">
                <div className="contact-card form-card">
                  <div className="form-header">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>

                    <h3>Send Message</h3>
                  </div>

                  <p>
                    Fill out the form below and I'll get back to
                    you as soon as possible.
                  </p>

                  <form
                    className="contact-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>

                        <input
                          type="text"
                          name="user_name"
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Email *</label>

                        <input
                          type="email"
                          name="user_email"
                          placeholder="johndoe@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Subject *</label>

                      <input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Message *</label>

                      <textarea
                        name="message"
                        placeholder="Tell me about your project or just say hello!"
                        rows="6"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="submit-btn"
                    >
                      <span>→</span> Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>
            &copy; 2026 Kunal Sarkar. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
