import { useCallback, useEffect, useState } from 'react'
import './ImmersiveCity.css'
import profilePic from '../assets/profile.jpg'

const welcomes = [
  ['Assamese', 'স্বাগতম'], ['Bengali', 'স্বাগতম'], ['Bodo', 'बर’आय'],
  ['Dogri', 'सुआगत'], ['Gujarati', 'સ્વાગત'], ['Hindi', 'स्वागत'],
  ['Kannada', 'ಸ್ವಾಗತ'], ['Kashmiri', 'پَزِ آیو'], ['Konkani', 'येवकार'],
  ['Maithili', 'स्वागत'], ['Malayalam', 'സ്വാഗതം'], ['Manipuri', 'ꯌꯥꯏꯐꯕ'],
  ['Marathi', 'स्वागत'], ['Nepali', 'स्वागत'], ['Odia', 'ସ୍ୱାଗତ'],
  ['Punjabi', 'ਜੀ ਆਇਆਂ ਨੂੰ'], ['Sanskrit', 'स्वागतम्'], ['Santali', 'ᱥᱟᱜᱟᱛ'],
  ['Sindhi', 'ڀلي ڪري آيا'], ['Tamil', 'நல்வரவு'], ['Telugu', 'స్వాగతం'],
  ['Urdu', 'خوش آمدید'],
]

const projects = [
  { title: 'Customer Categorization System', kind: 'Machine Learning', summary: 'Customer segmentation and personality classification with data processing, prediction workflows, FastAPI, and MongoDB.', stack: 'Python · ML · FastAPI · MongoDB', url: 'https://github.com/sparkz8085', type: 'analytics' },
  { title: 'Practice Programming Lab', kind: 'Developer Tools', summary: 'A PHP-powered programming practice dashboard for browsing source files, running exercises, and understanding errors across multiple language toolchains.', stack: 'PHP · JavaScript · HTML/CSS', url: 'https://github.com/sparkz8085/practice_programmming_lab', type: 'terminal' },
  { title: 'UniLab', kind: 'Product Concept', summary: 'An AI-assisted university practical and laboratory management concept for digital lab records, assignments, and academic workflows.', stack: 'React · Next.js · Python', url: 'https://github.com/sparkz8085', type: 'dashboard' },
]

const labels = { sunny: 'Sunny skies', cloudy: 'Cloudy skies', rainy: 'Rain in the city', stormy: 'Stormy skies', night: 'The city after dark' }

function getTheme(code, isDay) {
  if (!isDay) return 'night'
  if (code === 0 || code === 1) return 'sunny'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy'
  if ([95, 96, 99].includes(code)) return 'stormy'
  return 'cloudy'
}

function ScreenPreview({ type }) {
  return (
    <div className={'ic-preview ic-preview--' + type} aria-hidden="true">
      <div className="ic-preview__top"><i /><i /><i /><span>{type === 'terminal' ? 'practice-lab / console' : type === 'analytics' ? 'customer insights' : 'unilab / overview'}</span></div>
      {type === 'terminal'
        ? <div className="ic-code"><b>function</b> runExercise() {'{'}<br />&nbsp; <em>const</em> result = compile(code)<br />&nbsp; <strong>return</strong> result.output<br />{' }'}<hr /><span>✓ Process completed</span></div>
        : <><div className="ic-metrics"><b>{type === 'analytics' ? '84%' : '12'}</b><b>{type === 'analytics' ? '6 groups' : 'Experiments'}</b></div><div className="ic-bars"><i /><i /><i /><i /><i /><i /></div><div className="ic-lines"><i /><i /><i /></div></>}
    </div>
  )
}

function DetailModal({ project, close }) {
  useEffect(() => {
    if (!project) return undefined
    const onKey = (event) => { if (event.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('ic-modal-open')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('ic-modal-open') }
  }, [project, close])
  if (!project) return null
  return (
    <div className="ic-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
      <section className="ic-modal" role="dialog" aria-modal="true" aria-labelledby="ic-modal-title">
        <button className="ic-close" onClick={close} aria-label="Close project details">×</button>
        <p className="ic-kicker">{project.kind}</p><h2 id="ic-modal-title">{project.title}</h2>
        <p className="ic-summary">{project.summary}</p>
        <ScreenPreview type={project.type} />
        <p className="ic-stack"><b>BUILT WITH</b><br />{project.stack}</p>
        <p className="ic-note">Illustrative interface preview — replace with real project screenshots when available.</p>
        <a className="ic-link" href={project.url} target="_blank" rel="noreferrer">Explore project ↗</a>
      </section>
    </div>
  )
}

export default function ImmersiveCity() {
  const [progress, setProgress] = useState(0)
  const [welcomeIndex, setWelcomeIndex] = useState(0)
  const [welcomeFinished, setWelcomeFinished] = useState(false)
  const [weather, setWeather] = useState({ theme: 'cloudy', temp: null, location: 'Kolkata' })
  const [activeProject, setActiveProject] = useState(null)
  const closeProject = useCallback(() => setActiveProject(null), [])
  const theme = weather.theme

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      if (index >= welcomes.length) { window.clearInterval(timer); setWelcomeFinished(true); return }
      setWelcomeIndex(index)
    }, 320)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let cancelled = false
    const fetchWeather = async (lat, lon, location) => {
      try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,weather_code,is_day&timezone=auto'
        const response = await fetch(url)
        if (!response.ok) throw new Error('Weather unavailable')
        const data = await response.json()
        if (cancelled || !data.current) return
        setWeather({ theme: getTheme(data.current.weather_code, data.current.is_day === 1), temp: Math.round(data.current.temperature_2m), location })
      } catch { /* Keep the accessible default theme if weather is offline. */ }
    }
    fetchWeather(22.5726, 88.3639, 'Kolkata')
    const timer = window.setInterval(() => fetchWeather(22.5726, 88.3639, 'Kolkata'), 15 * 60 * 1000)
    return () => { cancelled = true; window.clearInterval(timer) }
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = document.querySelector('.immersive-city')
        if (!section) return
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1)
        setProgress(Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  const portrait = Math.min(1, Math.max(0, (progress - 0.1) / 0.2))
  const city = Math.min(1, Math.max(0, (progress - 0.29) / 0.2))
  const night = Math.min(1, Math.max(0, (progress - 0.59) / 0.24))
  const next = Math.min(1, Math.max(0, (progress - 0.8) / 0.12))
  const requestLocalWeather = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + coords.latitude + '&longitude=' + coords.longitude + '&current=temperature_2m,weather_code,is_day&timezone=auto'
        const response = await fetch(url)
        const data = await response.json()
        setWeather({ theme: getTheme(data.current.weather_code, data.current.is_day === 1), temp: Math.round(data.current.temperature_2m), location: 'your location' })
      } catch { /* Retain the last known weather theme. */ }
    }, () => {}, { timeout: 8000, maximumAge: 900000 })
  }

  return <>
    <section className={'immersive-city ic-weather-' + theme} style={{ '--ic-night': night, '--ic-progress': progress }} aria-label="Interactive portfolio journey">
      <div className="ic-sticky">
        <div className="ic-sky" aria-hidden="true">
          <div className="ic-sun" style={{ top: (12 + night * 28) + '%', opacity: 1 - night }} />
          <div className="ic-moon" style={{ top: (44 - night * 30) + '%', opacity: night }} />
          <div className="ic-cloud ic-cloud--one" /><div className="ic-cloud ic-cloud--two" />
          <div className="ic-rain"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="ic-stars" style={{ opacity: night }}>{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
        </div>
        <div className="ic-topbar"><a className="ic-logo" href="#home">KS<span>.</span></a>
          <div className="ic-weather"><i />{weather.temp === null ? labels[theme] + ' · ' + weather.location : labels[theme] + ' · ' + weather.temp + '°C'}<button onClick={requestLocalWeather}>Use my weather</button></div>
          <span className="ic-index">SCROLL JOURNAL / 01</span>
        </div>
        <div className={'ic-welcome ' + (progress < .14 ? 'is-visible' : '')} aria-live="polite">
          <p className="ic-kicker">A little world by Kunal Sarkar</p>
          <div className="ic-word" key={welcomeIndex}><span>{welcomes[welcomeIndex][1]}</span></div>
          <p className="ic-language">{welcomes[welcomeIndex][0]} · {welcomeIndex + 1} / 22</p>
          <p className={'ic-prompt ' + (welcomeFinished && progress < .12 ? 'is-visible' : '')}>Scroll to know more <span>↓</span></p>
        </div>
        <div className="ic-portrait" style={{ opacity: portrait, transform: 'translate(-50%,' + (100 - portrait * 100) + '%) scale(' + (.86 + portrait * .14) + ')' }}>
          <div className="ic-halo" /><img src={profilePic} alt="Kunal Sarkar" />
          <div className="ic-name"><span>THE PERSON BEHIND THE BUILDS</span><b>Kunal Sarkar</b></div>
        </div>
        <div className="ic-city" style={{ opacity: city, transform: 'translateY(' + ((1 - city) * 8) + '%) scale(' + (.96 + city * .04) + ')' }} aria-label="Three Kolkata-inspired buildings, with project screens in two">
          <div className="ic-distant ic-distant--left" /><div className="ic-distant ic-distant--right" />
          <div className="ic-building ic-building--left">
            <div className="ic-cornice" /><div className="ic-sign">KUNAL'S WORKS</div>
            <button className="ic-screen" onClick={() => setActiveProject(projects[0])} aria-label={'Open ' + projects[0].title}>
              <small>01 / FEATURED</small><b>{projects[0].title}</b><ScreenPreview type="analytics" /><span>Tap to explore ↗</span>
            </button>
            <div className="ic-windows">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="ic-balcony" />
          </div>
          <div className="ic-building ic-building--middle">
            <div className="ic-roof" /><div className="ic-windows">{Array.from({ length: 18 }, (_, i) => <i key={i} />)}</div>
            <div className="ic-teashop"><b>চা</b><span>TEA & TALK</span></div>
          </div>
          <div className="ic-building ic-building--right">
            <div className="ic-cornice" /><div className="ic-sign">PROJECT STUDIO</div>
            <button className="ic-screen" onClick={() => setActiveProject(projects[1])} aria-label={'Open ' + projects[1].title}>
              <small>02 / BUILD IN PUBLIC</small><b>{projects[1].title}</b><ScreenPreview type="terminal" /><span>Tap to explore ↗</span>
            </button>
            <div className="ic-windows">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div><div className="ic-balcony" />
          </div>
          <div className="ic-road" />
          <div className="ic-person ic-person--one"><i /><b /><span /></div><div className="ic-person ic-person--two"><i /><b /><span /></div>
          <div className="ic-person ic-person--three"><i /><b /><span /></div><div className="ic-person ic-person--four"><i /><b /><span /></div>
          <p className="ic-cycle">{night < .25 ? 'A day in the city' : night < .7 ? 'Golden hour → blue hour' : 'The city after dark'}</p>
        </div>
        <div className="ic-next" style={{ opacity: next, transform: 'translate(-50%,' + (25 - next * 25) + 'px)' }}>
          <p className="ic-kicker">AFTER HOURS · PROJECT 03</p><h2>Good ideas don't sleep.</h2>
          <p>Tap a screen to explore the work behind it.</p><button onClick={() => setActiveProject(projects[2])}>Explore UniLab ↗</button>
        </div>
        <div className="ic-progress"><span>SCROLL TO MOVE THROUGH THE CITY</span><i><b style={{ transform: 'scaleX(' + progress + ')' }} /></i><span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span></div>
      </div>
    </section>
    <DetailModal project={activeProject} close={closeProject} />
  </>
}
