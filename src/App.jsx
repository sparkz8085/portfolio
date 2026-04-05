import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import profileImage from './assets/profile.jpg'
import './App.css'

const EMAILJS_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'EJ9M9h4EEFlBZoWPp',
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_woyjhjd',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_rv8hsoo',
  TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'kunalsarkar61570@gmail.com',
}

const skills = [
  'C Programming',
  'C++ Basics',
  'Java Basics',
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Git & GitHub',
]

const projects = [
  {
    title: 'Calculator Web App',
    description:
      'A full-stack calculator application with a clean, intuitive interface built with Django backend for reliable computation and data handling.',
    stack: 'Django, HTML, CSS, JavaScript',
  },
  {
    title: 'Web Inventory System',
    description:
      'A comprehensive web-based inventory management system to track products, stock levels, and manage warehouse operations efficiently.',
    stack: 'React, Django, Database',
  },
  {
    title: 'Portfolio',
    description:
      'A modern, responsive portfolio website showcasing projects, skills, and professional information with smooth animations and glassmorphism.',
    stack: 'React, Vite, Modern CSS',
  },
]

function App() {
  const formRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formRef.current || isSending) return

    if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      alert('Email service is not configured correctly.')
      return
    }
    if (!EMAILJS_CONFIG.TO_EMAIL) {
      alert('Recipient email is missing in config.')
      return
    }

    setIsSending(true)

    const recipientEmail = formData.email.trim()

    const templateParams = {
      // Recipient aliases
      to_email: recipientEmail,
      email: recipientEmail,
      to: recipientEmail,
      to_mail: recipientEmail,
      to_address: recipientEmail,
      recipient: recipientEmail,
      recipient_email: recipientEmail,
      // Sender aliases
      from_name: formData.name,
      name: formData.name,
      user_name: formData.name,
      from_email: formData.email,
      email_from: formData.email,
      reply_to: formData.email,
      user_email: formData.email,
      // Subject aliases
      subject: formData.subject,
      title: formData.subject,
      mail_subject: formData.subject,
      // Message aliases
      message: formData.message,
      user_message: formData.message,
      content: formData.message,
      text: formData.message,
      body: formData.message,
    }

    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      )
      .then(() => {
        alert('Message sent successfully!')
        formRef.current?.reset()
        setFormData({ name: '', email: '', subject: '', message: '' })
      })
      .catch((error) => {
        const status = error?.status ? `Status ${error.status}` : 'Unknown status'
        const reason =
          error?.text || error?.message || 'Please check EmailJS template fields.'
        alert(`Failed to send message. ${status}: ${reason}`)
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <div className="site">
      <div className="bg-glow" aria-hidden="true" />

      <main className="layout">
        <section className="hero-card" id="home">
          <p className="badge">BCA STUDENT PORTFOLIO</p>
          <img src={profileImage} alt="Kunal Sarkar" className="avatar" />
          <h1>Kunal Sarkar</h1>
          <h2>Building practical web experiences while learning every day.</h2>
          <p className="lead">
            I am a Bachelor of Computer Applications student at BPPIMT, Salt
            Lake. I enjoy creating clean, responsive web projects and improving
            my programming fundamentals.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me
            </a>
          </div>
        </section>

        <section className="about-grid" id="about">
          <article className="about-copy">
            <h3>
              BCA Student & <span>Gen AI Enthusiast</span>
            </h3>
            <p>
              I&apos;m a Bachelor of Computer Applications (BCA) student at B.P.
              Poddar Institute of Management and Technology, with a passion for
              generative AI, machine learning, and web development.
            </p>
            <p>
              My journey in technology is driven by curiosity and a desire to
              build secure, efficient systems. I&apos;m constantly learning and
              exploring new technologies to expand my skillset.
            </p>

            <div className="info-grid">
              <div>
                <label>Name:</label>
                <p>Kunal Sarkar</p>
              </div>
              <div>
                <label>College:</label>
                <p>B.P. Poddar Institute Of Management and Technology</p>
              </div>
              <div>
                <label>Stream:</label>
                <p>BCA</p>
              </div>
              <div>
                <label>Session:</label>
                <p>2024-2028</p>
              </div>
            </div>
          </article>

          <div className="skill-cards">
            <article className="glass">
              <h4>HTML</h4>
              <p>Semantic markup and accessible web structures.</p>
            </article>
            <article className="glass">
              <h4>CSS</h4>
              <p>Responsive design and modern styling techniques.</p>
            </article>
            <article className="glass">
              <h4>JavaScript</h4>
              <p>Interactive features and modern web applications.</p>
            </article>
            <article className="glass">
              <h4>Python</h4>
              <p>Data processing, automation, and AI/ML development.</p>
            </article>
            <article className="glass">
              <h4>C Programming</h4>
              <p>Core programming fundamentals and system development.</p>
            </article>
          </div>
        </section>

        <section className="split-row">
          <article className="panel">
            <h3>Education</h3>
            <h4>Bachelor of Computer Applications (BCA)</h4>
            <p>BPPIMT, Salt Lake</p>
            <span>Current Student</span>
          </article>
          <article className="panel">
            <h3>Skills</h3>
            <ul className="chips">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="panel" id="projects">
          <h3>Projects</h3>
          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.title}>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <span>{project.stack}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <header>
            <h3>
              Get In <span>Touch</span>
            </h3>
            <p>
              Have a project in mind or want to collaborate? I&apos;d love to hear
              from you. Let&apos;s create something amazing together!
            </p>
          </header>

          <div className="contact-grid">
            <div className="contact-left">
              <article className="panel">
                <h4>Let&apos;s Connect</h4>
                <p>
                  I&apos;m always open to discussing new opportunities, interesting
                  projects, or just having a chat about technology and
                  cybersecurity.
                </p>
                <div className="email-box">
                  <strong>Email</strong>
                  <a href="mailto:kunalsarkar61570@gmail.com">
                    kunalsarkar61570@gmail.com
                  </a>
                </div>
              </article>

              <article className="panel">
                <h4>Follow Me</h4>
                <div className="socials">
                  <a
                    href="https://github.com/sparkz8085"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </article>
            </div>

            <article className="panel form-panel">
              <h4>Send Message</h4>
              <p>Fill out the form below and I&apos;ll get back to you quickly.</p>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div>
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="user_name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="user_email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="johndoe67@example.com"
                      required
                    />
                  </div>
                </div>

                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="What&apos;s this about?"
                  required
                />

                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Tell me about your project or just say hello!"
                  required
                />

                <button type="submit" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Kunal Sarkar. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
