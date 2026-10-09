import { useEffect, useRef } from 'react'

const STAR_COUNT = 560
const ARM_COUNT = 3

function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

/**
 * Original, dependency-free animated spiral galaxy for the public portfolio.
 * Draws into a transparent canvas and respects the user's reduced-motion setting.
 */
export default function GalaxyCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return undefined

    const random = seededRandom(8085)
    const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
      const arm = index % ARM_COUNT
      const radius = Math.pow(random(), 0.72)
      const spread = (random() - 0.5) * (0.42 + radius * 0.7)
      const angle = radius * Math.PI * 5.1 + (arm / ARM_COUNT) * Math.PI * 2 + spread
      return {
        radius,
        angle,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.53,
        size: 0.35 + Math.pow(random(), 2) * 1.5,
        alpha: 0.2 + random() * 0.75,
        phase: random() * Math.PI * 2,
        orbitFactor: 0.35 + (1 - radius) * 1.25,
        hue: random(),
      }
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let width = 0
    let height = 0
    let pixelRatio = 1
    let rotation = 0
    let lastTime = 0
    let visible = true

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const draw = (time = 0) => {
      if (!visible) return
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
      lastTime = time
      // Faster inner orbits and slower outer orbits keep the spiral recognizable.
      if (!reduceMotion.matches) rotation += delta * 0.32

      context.clearRect(0, 0, width, height)
      const centerX = width * 0.5
      const centerY = height * 0.5
      const radiusX = Math.min(width * 0.48, 660)
      const radiusY = Math.min(height * 0.47, 330)

      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radiusX * 0.92)
      glow.addColorStop(0, 'rgba(201, 143, 255, 0.2)')
      glow.addColorStop(0.28, 'rgba(161, 103, 255, 0.09)')
      glow.addColorStop(0.68, 'rgba(117, 78, 220, 0.025)')
      glow.addColorStop(1, 'rgba(20, 15, 55, 0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      context.save()
      context.translate(centerX, centerY)
      context.rotate(-0.16)
      context.globalCompositeOperation = 'lighter'

      stars.forEach((star) => {
        const angle = star.angle + rotation * star.orbitFactor
        const x = Math.cos(angle) * star.radius * radiusX
        const y = Math.sin(angle) * star.radius * radiusY
        const twinkle = 0.72 + Math.sin(time * 0.0012 + star.phase) * 0.28
        const alpha = star.alpha * twinkle
        const color = star.hue > 0.82
          ? `rgba(255, 190, 245, ${alpha})`
          : star.hue > 0.52
            ? `rgba(159, 218, 255, ${alpha})`
            : `rgba(226, 221, 255, ${alpha})`

        context.beginPath()
        context.fillStyle = color
        context.arc(x, y, star.size * (1 + star.radius * 0.25), 0, Math.PI * 2)
        context.fill()

        if (star.size > 1.45 && star.radius < 0.55) {
          context.beginPath()
          context.fillStyle = `rgba(183, 157, 255, ${alpha * 0.1})`
          context.arc(x, y, star.size * 4, 0, Math.PI * 2)
          context.fill()
        }
      })

      // A small luminous core gives the spiral a tilted-galaxy silhouette.
      const core = context.createRadialGradient(0, 0, 0, 0, 0, Math.min(radiusX, radiusY) * 0.22)
      core.addColorStop(0, 'rgba(255, 239, 255, 0.52)')
      core.addColorStop(0.12, 'rgba(223, 181, 255, 0.28)')
      core.addColorStop(0.36, 'rgba(193, 132, 255, 0.1)')
      core.addColorStop(1, 'rgba(150, 120, 255, 0)')
      context.fillStyle = core
      context.beginPath()
      context.ellipse(0, 0, radiusX * 0.22, radiusY * 0.22, 0, 0, Math.PI * 2)
      context.fill()
      context.restore()

      if (!reduceMotion.matches) frame = window.requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduceMotion.matches) {
        lastTime = 0
        window.cancelAnimationFrame(frame)
        frame = window.requestAnimationFrame(draw)
      } else {
        window.cancelAnimationFrame(frame)
        if (visible) draw(0)
      }
    }, { threshold: 0.01 })

    const onResize = () => {
      resize()
      if (reduceMotion.matches) draw(0)
    }

    resize()
    observer.observe(canvas)
    draw(0)
    window.addEventListener('resize', onResize)

    const onMotionChange = () => {
      window.cancelAnimationFrame(frame)
      lastTime = 0
      if (visible) {
        if (reduceMotion.matches) draw(0)
        else frame = window.requestAnimationFrame(draw)
      }
    }
    reduceMotion.addEventListener?.('change', onMotionChange)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      reduceMotion.removeEventListener?.('change', onMotionChange)
    }
  }, [])

  return (
    <div className="hero-galaxy" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-galaxy__canvas" />
      <div className="hero-galaxy__vignette" />
    </div>
  )
}
