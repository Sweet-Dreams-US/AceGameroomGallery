import Matter from "matter-js"

// ── Ball color definitions ──────────────────────────────────────────────
interface BallDef {
  number: number
  color: string
  stripe: boolean
  textColor: string
}

const BALL_DEFS: BallDef[] = [
  { number: 1, color: "#f4c430", stripe: false, textColor: "#111" },
  { number: 2, color: "#003da5", stripe: false, textColor: "#fff" },
  { number: 3, color: "#c0392b", stripe: false, textColor: "#fff" },
  { number: 4, color: "#6a0dad", stripe: false, textColor: "#fff" },
  { number: 5, color: "#e67e22", stripe: false, textColor: "#fff" },
  { number: 6, color: "#1a6b3c", stripe: false, textColor: "#fff" },
  { number: 7, color: "#800000", stripe: false, textColor: "#fff" },
  { number: 8, color: "#111111", stripe: false, textColor: "#fff" },
  { number: 9, color: "#f4c430", stripe: true, textColor: "#111" },
  { number: 10, color: "#003da5", stripe: true, textColor: "#fff" },
  { number: 11, color: "#c0392b", stripe: true, textColor: "#fff" },
  { number: 12, color: "#6a0dad", stripe: true, textColor: "#fff" },
  { number: 13, color: "#e67e22", stripe: true, textColor: "#fff" },
  { number: 14, color: "#1a6b3c", stripe: true, textColor: "#fff" },
  { number: 15, color: "#800000", stripe: true, textColor: "#fff" },
]

// ── Pocket positions (relative to table area) ───────────────────────────
function getPocketPositions(
  margin: number,
  w: number,
  h: number
): { x: number; y: number }[] {
  return [
    { x: margin, y: margin }, // top-left
    { x: w / 2, y: margin - 4 }, // top-center
    { x: w - margin, y: margin }, // top-right
    { x: margin, y: h - margin }, // bottom-left
    { x: w / 2, y: h - margin + 4 }, // bottom-center
    { x: w - margin, y: h - margin }, // bottom-right
  ]
}

// ── Noise texture generation ────────────────────────────────────────────
function createFeltPattern(): CanvasPattern | string {
  const offscreen = document.createElement("canvas")
  offscreen.width = 100
  offscreen.height = 100
  const octx = offscreen.getContext("2d")
  if (!octx) return "#1a6b3c"
  octx.fillStyle = "#1a6b3c"
  octx.fillRect(0, 0, 100, 100)
  // Subtle noise
  const imageData = octx.getImageData(0, 0, 100, 100)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12
    data[i] = Math.min(255, Math.max(0, data[i] + noise))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
  }
  octx.putImageData(imageData, 0, 0)
  const ctx2d = document.createElement("canvas").getContext("2d")
  if (!ctx2d) return "#1a6b3c"
  const pattern = ctx2d.createPattern(offscreen, "repeat")
  return pattern || "#1a6b3c"
}

// ── Draw a single pool ball ─────────────────────────────────────────────
function drawBall(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  def: BallDef,
  alpha: number = 1
) {
  ctx.save()
  ctx.globalAlpha = alpha

  // Shadow
  ctx.beginPath()
  ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(0,0,0,0.3)"
  ctx.fill()

  // Ball base circle
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = def.stripe ? "#ffffff" : def.color
  ctx.fill()

  // Stripe band — draw the color band across the middle
  if (def.stripe) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.clip()
    // Color band across center (top/bottom thirds are white, middle is color)
    ctx.fillStyle = def.color
    const bandHeight = radius * 1.1
    ctx.fillRect(x - radius, y - bandHeight / 2, radius * 2, bandHeight)
    ctx.restore()
  }

  // Number circle (white background for number)
  const numCircleR = radius * 0.45
  ctx.beginPath()
  ctx.arc(x, y, numCircleR, 0, Math.PI * 2)
  ctx.fillStyle = "#fff"
  ctx.fill()

  // Number text
  const fontSize = Math.max(8, radius * 0.65)
  ctx.font = `bold ${fontSize}px Arial, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#111"
  ctx.fillText(String(def.number), x, y + 0.5)

  // Specular highlight (10 o'clock position)
  const hlX = x - radius * 0.3
  const hlY = y - radius * 0.3
  const hlR = radius * 0.22
  const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR)
  hlGrad.addColorStop(0, "rgba(255,255,255,0.7)")
  hlGrad.addColorStop(1, "rgba(255,255,255,0)")
  ctx.beginPath()
  ctx.arc(hlX, hlY, hlR, 0, Math.PI * 2)
  ctx.fillStyle = hlGrad
  ctx.fill()

  // Rim edge
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(0,0,0,0.15)"
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.restore()
}

// ── Draw cue ball ───────────────────────────────────────────────────────
function drawCueBall(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number = 1
) {
  ctx.save()
  ctx.globalAlpha = alpha

  // Shadow
  ctx.beginPath()
  ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(0,0,0,0.3)"
  ctx.fill()

  // White ball
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  const ballGrad = ctx.createRadialGradient(
    x - radius * 0.2,
    y - radius * 0.2,
    0,
    x,
    y,
    radius
  )
  ballGrad.addColorStop(0, "#ffffff")
  ballGrad.addColorStop(1, "#e8e8e8")
  ctx.fillStyle = ballGrad
  ctx.fill()

  // Specular highlight
  const hlX = x - radius * 0.3
  const hlY = y - radius * 0.3
  const hlR = radius * 0.25
  const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR)
  hlGrad.addColorStop(0, "rgba(255,255,255,0.9)")
  hlGrad.addColorStop(1, "rgba(255,255,255,0)")
  ctx.beginPath()
  ctx.arc(hlX, hlY, hlR, 0, Math.PI * 2)
  ctx.fillStyle = hlGrad
  ctx.fill()

  // Rim
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(0,0,0,0.1)"
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.restore()
}

// ── Draw the cue stick ──────────────────────────────────────────────────
function drawCueStick(
  ctx: CanvasRenderingContext2D,
  tipX: number,
  tipY: number,
  length: number,
  scale: number
) {
  ctx.save()
  const stickLength = length * scale
  const buttWidth = 10 * scale
  const tipWidth = 4 * scale

  // Stick body (extends to the left of tipX)
  ctx.beginPath()
  ctx.moveTo(tipX, tipY - tipWidth / 2)
  ctx.lineTo(tipX - stickLength, tipY - buttWidth / 2)
  ctx.lineTo(tipX - stickLength, tipY + buttWidth / 2)
  ctx.lineTo(tipX, tipY + tipWidth / 2)
  ctx.closePath()

  // Wood gradient
  const grad = ctx.createLinearGradient(tipX - stickLength, tipY, tipX, tipY)
  grad.addColorStop(0, "#4a2f1a")
  grad.addColorStop(0.3, "#6b3d22")
  grad.addColorStop(0.7, "#c4913a")
  grad.addColorStop(0.92, "#f5deb3")
  grad.addColorStop(1, "#e8e8e0")
  ctx.fillStyle = grad
  ctx.fill()

  // Ferrule (white tip band)
  ctx.beginPath()
  ctx.moveTo(tipX, tipY - tipWidth / 2)
  ctx.lineTo(tipX - 8 * scale, tipY - (tipWidth / 2 + 0.5))
  ctx.lineTo(tipX - 8 * scale, tipY + (tipWidth / 2 + 0.5))
  ctx.lineTo(tipX, tipY + tipWidth / 2)
  ctx.closePath()
  ctx.fillStyle = "#f0ece0"
  ctx.fill()

  // Leather tip
  ctx.beginPath()
  ctx.arc(tipX, tipY, tipWidth / 2, 0, Math.PI * 2)
  ctx.fillStyle = "#5a8fc2"
  ctx.fill()

  ctx.restore()
}

// ── Draw table ──────────────────────────────────────────────────────────
function drawTable(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  margin: number,
  feltPattern: CanvasPattern | string,
  pocketPositions: { x: number; y: number }[],
  pocketRadius: number
) {
  // Outer frame (dark brown wood)
  ctx.fillStyle = "#3b1f0b"
  ctx.fillRect(0, 0, w, h)

  // Inner wood frame
  const frameWidth = margin * 0.6
  ctx.fillStyle = "#5c2e0e"
  ctx.fillRect(frameWidth, frameWidth, w - frameWidth * 2, h - frameWidth * 2)

  // Felt playing surface
  ctx.fillStyle = feltPattern
  ctx.fillRect(margin, margin, w - margin * 2, h - margin * 2)

  // Rail bumpers (slightly lighter green ridges)
  const railW = 6
  ctx.fillStyle = "#1f8048"
  // Top rail
  ctx.fillRect(margin + pocketRadius, margin, w - margin * 2 - pocketRadius * 2, railW)
  // Bottom rail
  ctx.fillRect(margin + pocketRadius, h - margin - railW, w - margin * 2 - pocketRadius * 2, railW)
  // Left rail
  ctx.fillRect(margin, margin + pocketRadius, railW, h - margin * 2 - pocketRadius * 2)
  // Right rail
  ctx.fillRect(w - margin - railW, margin + pocketRadius, railW, h - margin * 2 - pocketRadius * 2)

  // Pockets
  for (const p of pocketPositions) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, pocketRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0a0a0a"
    ctx.fill()
    // Pocket edge shadow
    ctx.beginPath()
    ctx.arc(p.x, p.y, pocketRadius + 2, 0, Math.PI * 2)
    ctx.strokeStyle = "#1a0e06"
    ctx.lineWidth = 3
    ctx.stroke()
  }

  // Diamond markers on the rails (the small circular inlays)
  ctx.fillStyle = "#c4913a"
  const playW = w - margin * 2
  const playH = h - margin * 2
  // Top and bottom rail diamonds
  for (let i = 1; i <= 3; i++) {
    const xLeft = margin + playW * (i / 4)
    // Top
    ctx.beginPath()
    ctx.arc(xLeft, margin - 6, 3, 0, Math.PI * 2)
    ctx.fill()
    // Bottom
    ctx.beginPath()
    ctx.arc(xLeft, h - margin + 6, 3, 0, Math.PI * 2)
    ctx.fill()
  }
  // Left and right rail diamonds
  for (let i = 1; i <= 3; i++) {
    const yTop = margin + playH * (i / 4)
    // Left
    ctx.beginPath()
    ctx.arc(margin - 6, yTop, 3, 0, Math.PI * 2)
    ctx.fill()
    // Right
    ctx.beginPath()
    ctx.arc(w - margin + 6, yTop, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

// ══════════════════════════════════════════════════════════════════════════
// ▌ Main entry — exported for LoadingScreen.tsx
// ══════════════════════════════════════════════════════════════════════════
export function runPoolBreak(
  canvas: HTMLCanvasElement,
  onComplete: () => void
): { cleanup: () => void } {
  const maybeCtx = canvas.getContext("2d")
  if (!maybeCtx) {
    onComplete()
    return { cleanup: () => {} }
  }
  const ctx: CanvasRenderingContext2D = maybeCtx

  // ── Sizing ──────────────────────────────────────────────────────────
  const W = window.innerWidth
  const H = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = W * dpr
  canvas.height = H * dpr
  canvas.style.width = W + "px"
  canvas.style.height = H + "px"
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // Scale factor for mobile
  const scaleFactor = Math.min(W / 1200, H / 700, 1)
  const BALL_RADIUS = Math.max(10, Math.round(14 * scaleFactor))
  const MARGIN = Math.max(24, Math.round(40 * scaleFactor))
  const CUE_STICK_LENGTH = 280 * scaleFactor
  const POCKET_RADIUS = BALL_RADIUS * 1.6

  // ── Matter.js setup ─────────────────────────────────────────────────
  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 0, scale: 0.001 },
  })
  const world = engine.world

  // Table boundaries as static bodies
  const wallOpts: Matter.IChamferableBodyDefinition = {
    isStatic: true,
    restitution: 0.7,
    friction: 0.05,
  }
  const wallThick = 20
  const walls = [
    // Top wall
    Matter.Bodies.rectangle(W / 2, MARGIN - wallThick / 2, W - MARGIN * 2, wallThick, wallOpts),
    // Bottom wall
    Matter.Bodies.rectangle(W / 2, H - MARGIN + wallThick / 2, W - MARGIN * 2, wallThick, wallOpts),
    // Left wall
    Matter.Bodies.rectangle(MARGIN - wallThick / 2, H / 2, wallThick, H - MARGIN * 2, wallOpts),
    // Right wall
    Matter.Bodies.rectangle(W - MARGIN + wallThick / 2, H / 2, wallThick, H - MARGIN * 2, wallOpts),
  ]
  Matter.Composite.add(world, walls)

  // ── Create pool balls in triangle formation ─────────────────────────
  // Triangle apex at ~65% from left, vertically centered
  const triX = W * 0.65
  const triY = H / 2
  const spacing = BALL_RADIUS * 2.15 // slight gap

  // Triangle layout: rows of 5, 4, 3, 2, 1 — apex on left, base on right
  // Standard rack ordering (8-ball in center of third row)
  const rackOrder = [0, 8, 14, 1, 6, 10, 3, 12, 7, 11, 2, 13, 4, 9, 5] // indices into BALL_DEFS
  const rows = [1, 2, 3, 4, 5]
  let ballIdx = 0

  const ballBodyMap: Map<number, { body: Matter.Body; def: BallDef }> = new Map()

  for (let row = 0; row < rows.length; row++) {
    const count = rows[row]
    for (let col = 0; col < count; col++) {
      const defIdx = rackOrder[ballIdx]
      const def = BALL_DEFS[defIdx]
      // Position: apex at left, rows expand rightward
      const xOff = row * spacing * Math.cos(Math.PI / 6)
      const yOff = (col - (count - 1) / 2) * spacing
      // Add slight random offset for natural-looking break
      const randX = (Math.random() - 0.5) * 1.5
      const randY = (Math.random() - 0.5) * 1.5

      const body = Matter.Bodies.circle(triX + xOff + randX, triY + yOff + randY, BALL_RADIUS, {
        restitution: 0.9,
        friction: 0.02,
        frictionAir: 0.015,
        density: 0.005,
        label: `ball-${def.number}`,
      })
      ballBodyMap.set(def.number, { body, def })
      Matter.Composite.add(world, body)
      ballIdx++
    }
  }

  // ── Cue ball ────────────────────────────────────────────────────────
  const cueX = W * 0.25
  const cueY = H / 2
  const cueBall = Matter.Bodies.circle(cueX, cueY, BALL_RADIUS, {
    restitution: 0.9,
    friction: 0.02,
    frictionAir: 0.015,
    density: 0.005,
    label: "cue-ball",
  })
  Matter.Composite.add(world, cueBall)

  // ── Felt pattern ────────────────────────────────────────────────────
  const feltPattern = createFeltPattern()
  const pocketPositions = getPocketPositions(MARGIN, W, H)

  // ── Animation state ─────────────────────────────────────────────────
  let startTime = 0
  let animFrameId = 0
  let cancelled = false
  let completeCalled = false

  // Phase timings (seconds)
  const PHASE_FADE_IN = 0.5
  const PHASE_CUE_PULLBACK_END = 1.0
  const PHASE_STRIKE = 1.0
  const PHASE_PHYSICS_END = 2.8
  const PHASE_FADE_BALLS = 3.3
  const PHASE_LOGO_GROW = 3.8
  const PHASE_CURTAIN_START = 4.0
  const PHASE_END = 4.5

  // Cue stick state
  let cueStickVisible = false
  let cueStickPullback = 0 // 0 to 1
  let struck = false

  // ── The render / update loop ────────────────────────────────────────
  function tick(timestamp: number) {
    if (cancelled) return
    if (!startTime) startTime = timestamp
    const elapsed = (timestamp - startTime) / 1000

    // Update physics (16ms steps)
    if (elapsed >= PHASE_STRIKE && !struck) {
      // Apply strike force to cue ball
      const forceDir = { x: triX - cueX, y: (triY - cueY) * 0.02 }
      const mag = Math.sqrt(forceDir.x ** 2 + forceDir.y ** 2)
      const forceMagnitude = 0.45 * scaleFactor
      Matter.Body.applyForce(cueBall, cueBall.position, {
        x: (forceDir.x / mag) * forceMagnitude,
        y: (forceDir.y / mag) * forceMagnitude,
      })
      struck = true
    }

    if (elapsed >= PHASE_STRIKE) {
      Matter.Engine.update(engine, 1000 / 60)
    }

    // ── Clear + draw table ────────────────────────────────────────────
    ctx.save()
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Curtain lift in final phase
    let curtainOffset = 0
    if (elapsed >= PHASE_CURTAIN_START) {
      const t = Math.min(1, (elapsed - PHASE_CURTAIN_START) / (PHASE_END - PHASE_CURTAIN_START))
      // Ease out cubic
      curtainOffset = -H * (1 - Math.pow(1 - t, 3))
    }
    ctx.translate(0, curtainOffset)

    // Overall scene fade-in
    const sceneAlpha = Math.min(1, elapsed / PHASE_FADE_IN)
    ctx.globalAlpha = sceneAlpha

    drawTable(ctx, W, H, MARGIN, feltPattern, pocketPositions, POCKET_RADIUS)

    // ── Phase 2-3: Cue stick ──────────────────────────────────────────
    if (elapsed >= PHASE_FADE_IN && elapsed < PHASE_STRIKE + 0.15) {
      cueStickVisible = true
      // Pull-back animation (0.5s to 1.0s)
      if (elapsed < PHASE_CUE_PULLBACK_END) {
        const pullT = (elapsed - PHASE_FADE_IN) / (PHASE_CUE_PULLBACK_END - PHASE_FADE_IN)
        cueStickPullback = Math.sin(pullT * Math.PI * 0.5) // eases in
      } else {
        // Snap forward
        const snapT = (elapsed - PHASE_CUE_PULLBACK_END) / 0.1
        cueStickPullback = Math.max(0, 1 - snapT * 4)
      }

      if (cueStickVisible) {
        const pullDist = 50 * scaleFactor * cueStickPullback
        const tipX = cueBall.position.x - BALL_RADIUS - 6 - pullDist
        const tipY = cueBall.position.y
        drawCueStick(ctx, tipX, tipY, CUE_STICK_LENGTH, scaleFactor)
      }
    }

    // ── Phase 4: Draw pool balls (physics running) ────────────────────
    // Determine ball fade
    let ballAlpha = 1
    let eightBallAlpha = 1
    if (elapsed >= PHASE_PHYSICS_END) {
      // Non-8 balls start fading
      const fadeT = Math.min(1, (elapsed - PHASE_PHYSICS_END) / (PHASE_FADE_BALLS - PHASE_PHYSICS_END))
      ballAlpha = 1 - fadeT
    }

    // Draw all numbered balls
    for (const [num, { body, def }] of ballBodyMap) {
      const pos = body.position
      if (num === 8) {
        // 8-ball has special handling in later phases
        if (elapsed >= PHASE_PHYSICS_END) {
          // Move toward center
          const moveT = Math.min(1, (elapsed - PHASE_PHYSICS_END) / (PHASE_FADE_BALLS - PHASE_PHYSICS_END))
          const eased = 1 - Math.pow(1 - moveT, 3)
          const targetX = W / 2
          const targetY = H / 2
          const drawX = pos.x + (targetX - pos.x) * eased
          const drawY = pos.y + (targetY - pos.y) * eased

          // In logo phase, grow and crossfade
          if (elapsed >= PHASE_FADE_BALLS) {
            const logoT = Math.min(1, (elapsed - PHASE_FADE_BALLS) / (PHASE_LOGO_GROW - PHASE_FADE_BALLS))
            const easedLogo = 1 - Math.pow(1 - logoT, 2)
            const growR = BALL_RADIUS + (30 * scaleFactor - BALL_RADIUS) * easedLogo
            eightBallAlpha = 1 - easedLogo

            // Draw fading 8-ball
            if (eightBallAlpha > 0.01) {
              drawBall(ctx, targetX, targetY, growR, def, eightBallAlpha)
            }

            // Draw ACE logo text (crossfading in)
            drawAceLogo(ctx, targetX, targetY, easedLogo, scaleFactor)
          } else {
            drawBall(ctx, drawX, drawY, BALL_RADIUS, def, 1)
          }
        } else {
          drawBall(ctx, pos.x, pos.y, BALL_RADIUS, def, 1)
        }
      } else {
        if (ballAlpha > 0.01) {
          drawBall(ctx, pos.x, pos.y, BALL_RADIUS, def, ballAlpha)
        }
      }
    }

    // Draw cue ball (fades with other balls)
    if (ballAlpha > 0.01 && elapsed < PHASE_FADE_BALLS) {
      const cueAlpha = elapsed >= PHASE_PHYSICS_END ? ballAlpha : 1
      drawCueBall(ctx, cueBall.position.x, cueBall.position.y, BALL_RADIUS, cueAlpha)
    }

    ctx.restore()

    // ── End check ─────────────────────────────────────────────────────
    if (elapsed >= PHASE_END && !completeCalled) {
      completeCalled = true
      onComplete()
      return
    }

    animFrameId = requestAnimationFrame(tick)
  }

  // Start the loop
  animFrameId = requestAnimationFrame(tick)

  // ── Cleanup function ────────────────────────────────────────────────
  function cleanup() {
    cancelled = true
    cancelAnimationFrame(animFrameId)
    Matter.Engine.clear(engine)
    Matter.Composite.clear(world, false)
  }

  return { cleanup }
}

// ── Draw ACE logo text ──────────────────────────────────────────────────
function drawAceLogo(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  alpha: number,
  scale: number
) {
  ctx.save()
  ctx.globalAlpha = alpha

  // "ACE" — large, bold, italic, with gradient
  const aceSize = Math.round(72 * scale)
  ctx.font = `italic bold ${aceSize}px "Georgia", "Playfair Display", serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Red -> orange -> gold gradient
  const grad = ctx.createLinearGradient(cx - aceSize, cy, cx + aceSize, cy)
  grad.addColorStop(0, "#c0392b")
  grad.addColorStop(0.5, "#e67e22")
  grad.addColorStop(1, "#f1c40f")
  ctx.fillStyle = grad

  // Text shadow
  ctx.shadowColor = "rgba(0,0,0,0.4)"
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.fillText("ACE", cx, cy - 12 * scale)

  // Reset shadow
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  // "GAME ROOM GALLERY" — smaller, white, letter-spaced
  const subSize = Math.round(16 * scale)
  ctx.font = `600 ${subSize}px Arial, "Inter", sans-serif`
  ctx.fillStyle = "#ffffff"
  try {
    ctx.letterSpacing = `${3 * scale}px`
  } catch {
    // letterSpacing not supported in older browsers — fallback is fine
  }
  ctx.fillText("GAME ROOM GALLERY", cx, cy + 30 * scale)
  try {
    ctx.letterSpacing = "0px"
  } catch {
    // noop
  }

  ctx.restore()
}
