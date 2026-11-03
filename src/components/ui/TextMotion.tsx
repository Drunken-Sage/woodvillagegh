import {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type SplitBy = "character" | "word" | "line"
export type Effect =
  | "transform"
  | "scramble"
  | "type"
  | "liquid"
  | "dissolve"
  | "melt"
  | "chroma"
  | "shine"
  | "neon"
  | "wipe"
export type EasingName = "spring" | "bounce" | "smooth" | "snappy" | "gentle"
export type Origin = "center" | "top" | "bottom" | "left" | "right"
export type Order = "forward" | "reverse" | "center" | "random"
export type Trigger =
  | "onView"
  | "sectionInView"
  | "onScroll"
  | "onMount"
  | "hover"
  | "loop"
export type Align = "left" | "center" | "right"

/** Every motion parameter a preset can set. */
export interface Recipe {
  splitBy: SplitBy
  effect: Effect
  amount: number
  detail: number
  settle: number
  chaos: number
  z: number
  x: number
  y: number
  opacity: number
  blur: number
  scale: number
  scaleX: number
  scaleY: number
  rotate: number
  rotateX: number
  rotateY: number
  skewX: number
  origin: Origin
  clip: boolean
  order: Order
  duration: number
  stagger: number
  easing: EasingName
}

/** Every preset is a diff against BASE, so the table below stays readable. */
const BASE: Recipe = {
  splitBy: "word",
  effect: "transform",
  amount: 0,
  detail: 10,
  settle: 1.8,
  chaos: 0,
  z: 0,
  x: 0,
  y: 0,
  opacity: 0,
  blur: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  origin: "center",
  clip: false,
  order: "forward",
  duration: 0.7,
  stagger: 0.03,
  easing: "smooth",
}

/** 37 recipes, grouped by family. "custom" is absent and falls through to props. */
const PRESETS = {
  // Movement
  fade: { y: 18, duration: 0.6, stagger: 0.04 },
  rise: { splitBy: "line", y: 80, duration: 0.8, stagger: 0.12, easing: "spring" },
  drop: { splitBy: "character", y: -60, duration: 0.7, stagger: 0.02, easing: "spring" },
  slide: { x: -60, duration: 0.7, stagger: 0.05 },

  // Softness
  split: { splitBy: "character", y: 48, blur: 8, duration: 0.7, stagger: 0.02, easing: "spring" },
  blur: { blur: 14, duration: 0.9, stagger: 0.06 },
  focus: { splitBy: "character", blur: 18, scale: 1.15, duration: 0.8, stagger: 0.02 },

  // Reveal
  mask: { splitBy: "line", clip: true, y: 100, duration: 0.9, stagger: 0.12, easing: "snappy" },
  curtain: { clip: true, y: 100, duration: 0.7, stagger: 0.05, easing: "snappy" },
  unfold: { splitBy: "line", rotateX: -80, origin: "top", duration: 0.9, stagger: 0.1, easing: "gentle" },
  /** Diagonal clip sweep. The clip does the revealing, so nothing fades. */
  wipe: { splitBy: "line", effect: "wipe", amount: 22, opacity: 1, duration: 0.9, stagger: 0.12, easing: "snappy" }, //
  /** Odometer roll: clipped box plus a hinge at the bottom edge. */
  roll: { splitBy: "character", clip: true, y: 100, rotateX: -90, origin: "bottom", duration: 0.7, stagger: 0.03, easing: "snappy" },

  // Scale
  pop: { splitBy: "character", scale: 0.4, duration: 0.6, stagger: 0.025, easing: "snappy" },
  punch: { splitBy: "line", scale: 0.8, y: 20, duration: 0.5, stagger: 0.08, easing: "bounce" },
  zoom: { splitBy: "line", scale: 1.6, blur: 10, duration: 0.9, stagger: 0.1 },
  shrink: { splitBy: "character", scale: 2.2, duration: 0.6, stagger: 0.02, easing: "snappy" },
  /** Non-uniform squash. The only preset that scales the axes independently. */
  stretch: { splitBy: "character", scaleX: 0.3, scaleY: 1.8, duration: 0.7, stagger: 0.025, easing: "spring" },

  // Rotation
  flip: { rotateX: 90, duration: 0.8, stagger: 0.06, easing: "gentle" },
  swivel: { rotateY: 90, duration: 0.8, stagger: 0.06, easing: "gentle" },
  tilt: { splitBy: "character", rotate: -12, y: 30, duration: 0.7, stagger: 0.025, easing: "spring" },
  spin: { splitBy: "character", rotate: 180, scale: 0.5, duration: 0.7, stagger: 0.03, easing: "snappy" },
  shear: { skewX: 20, x: 30, duration: 0.6, stagger: 0.05, easing: "snappy" },

  // Sequencing
  glitch: { splitBy: "character", x: 14, skewX: -18, duration: 0.35, stagger: 0.012, easing: "snappy", order: "random" },
  wave: { splitBy: "character", y: 30, duration: 0.7, stagger: 0.035, easing: "spring", order: "center" },
  cascade: { splitBy: "character", y: 40, duration: 0.7, stagger: 0.025, order: "reverse" },
  scatter: { splitBy: "character", y: 40, x: 20, rotate: 20, duration: 0.8, stagger: 0.03, easing: "spring", order: "random" },

  // Signature: these need machinery beyond transforms
  /** Glyphs churn, then land on the real character. Opacity stays 1 because the churn is the reveal. */
  scramble: { splitBy: "character", effect: "scramble", opacity: 1, duration: 0.4, stagger: 0.035 },
  /** Characters appear one at a time. */
  type: { splitBy: "character", effect: "type", opacity: 1, duration: 0.01, stagger: 0.045 },
  /** Low-frequency turbulence: a slow wobble. */
  liquid: { splitBy: "line", effect: "liquid", amount: 70, detail: 10, settle: 1.3, duration: 2.4, stagger: 0.18 },
  /** High-frequency turbulence: fine grain that reassembles into letterforms. */
  dissolve: { effect: "dissolve", amount: 150, detail: 76, settle: 2.2, duration: 1.2, stagger: 0.06 },
  /** Chromatic aberration: the red and cyan fringes converge. */
  chroma: { splitBy: "character", effect: "chroma", amount: 14, duration: 0.7, stagger: 0.02, easing: "snappy" },
  /** Staggered brightness peak reads as a highlight sweeping across the line. */
  shine: { splitBy: "character", effect: "shine", amount: 2.8, duration: 0.5, stagger: 0.03 },
  /** Glow blooms and tightens onto the glyph. */
  neon: { effect: "neon", amount: 18, duration: 0.9, stagger: 0.07 }, //

  // Extravagant
  /** Every glyph arrives from its own random direction and converges. */
  explode: { splitBy: "character", chaos: 1, scale: 0.3, blur: 4, duration: 1.1, stagger: 0.015, easing: "spring", order: "random" },
  /** Two full turns, collapsing in from nothing, on a scattered radius. */
  vortex: { splitBy: "character", chaos: 0.55, rotate: 720, scale: 0, duration: 1.2, stagger: 0.03, easing: "spring" },
  /** Real depth: words hurtle in from far behind the screen, swivelling. */
  warp: { z: -900, rotateY: 65, blur: 12, duration: 1, stagger: 0.08, origin: "left" },
  /** Turbulence stretched into wide vertical columns, so the text drips into place. */
  melt: { splitBy: "line", effect: "melt", amount: 95, detail: 6, settle: 1.2, duration: 2.3, stagger: 0.15 },
} satisfies Record<string, Partial<Recipe>>

export type PresetName = keyof typeof PRESETS | "custom"
type FixedPreset = keyof typeof PRESETS

/** Dropdown order. */
export const PRESET_NAMES: readonly PresetName[] = [
  "fade", "rise", "drop", "slide",
  "split", "blur", "focus",
  "mask", "curtain", "unfold", "wipe", "roll",
  "pop", "punch", "zoom", "shrink", "stretch",
  "flip", "swivel", "tilt", "spin", "shear",
  "glitch", "wave", "cascade", "scatter",
  "scramble", "type", "liquid", "dissolve", "chroma", "shine", "neon",
  "explode", "vortex", "warp", "melt",
  "custom",
]

/** Presets with a fixed recipe, used for the demo dots. */
const DEMO_PRESETS = PRESET_NAMES.filter((p): p is FixedPreset => p !== "custom")

const EASING: Record<EasingName, Transition> = {
  /** Critically damped: natural spring deceleration with no overshoot. */
  spring: { type: "spring", bounce: 0 },
  /** The only genuinely bouncy option, used by the punch preset. */
  bounce: { type: "spring", bounce: 0.55 },
  smooth: { ease: [0.22, 1, 0.36, 1] },
  snappy: { ease: [0.16, 1, 0.3, 1] },
  gentle: { ease: [0.4, 0, 0.2, 1] },
}

const ORIGIN: Record<Origin, string> = {
  center: "50% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
}

const DEMO_ALIGN_SELF: Record<Align, CSSProperties["alignSelf"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}

const DEMO_JUSTIFY: Record<Align, CSSProperties["justifyContent"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*<>/\\[]{}"

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

interface IndexedUnit {
  unit: string
  index: number
  isSpace: boolean
  chars: { c: string; index: number }[] | null
}

/** Split text into lines, then into the animated units for that mode. */
function tokenize(text: string, splitBy: SplitBy): string[][] {
  const lines = text.split("\n")
  if (splitBy === "line") return lines.map((line) => [line])
  return lines.map((line) => line.split(/(\s+)/).filter((t) => t.length > 0))
}

/** Deterministic, so server, client and tests agree on the same "random". */
function pseudoRandom(n: number): number {
  const x = Math.sin((n + 1) * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/** Where a token sits in the stagger queue, which is not always its position in the text. */
function staggerIndex(i: number, total: number, order: Order): number {
  switch (order) {
    case "reverse":
      return total - 1 - i
    case "center":
      return Math.abs(i - (total - 1) / 2)
    case "random":
      return pseudoRandom(i) * total
    default:
      return i
  }
}

/** Resolves which engine a preset runs on. */
export function presetEffect(preset: PresetName, propEffect?: Effect): Effect {
  if (preset === "custom") return propEffect ?? "transform"
  const recipe: Partial<Recipe> = PRESETS[preset]
  return recipe.effect ?? "transform"
}

/** True for the effects that use the SVG turbulence filter (liquid, dissolve, melt). */
export const usesTurbulenceEffect = (e: Effect) =>
  e === "liquid" || e === "dissolve" || e === "melt"

/** Turbulence frequency from a friendly 0 to 100 dial. Squared so the low end has resolution. */
function detailToFrequency(detail: number, effect: Effect): string {
  const f = Math.max(Math.pow(detail / 100, 2) * 1.2, 5e-4)
  if (effect === "liquid") return `${f.toFixed(4)} ${(f * 1.8).toFixed(4)}`
  if (effect === "melt") return `${(f * 0.25).toFixed(4)} ${(f * 6).toFixed(4)}`
  return `${f.toFixed(4)} ${f.toFixed(4)}`
}

/**
 * One filter string shape for every state, so framer-motion always interpolates
 * number for number. Dropping a function between keyframes makes it snap.
 */
function filterString(blurPx: number, brightness: number, glowPx: number, glowColor: string) {
  return `blur(${blurPx}px) brightness(${brightness}) drop-shadow(0 0 ${glowPx}px ${glowColor})`
}

/** Both keyframes carry the same two shadows so only the numbers move. */
function chromaShadow(offset: number, alpha: number) {
  return `${offset}px 0 0 rgba(255,0,80,${alpha}), ${-offset}px 0 0 rgba(0,255,255,${alpha})`
}

/** Four-point polygon in both states, so the clip stays interpolable. */
function wipeClip(progress: 0 | 1, skew: number) {
  return progress === 0
    ? `polygon(0% 0%, 0% 0%, ${-skew}% 100%, 0% 100%)`
    : `polygon(0% 0%, ${100 + skew}% 0%, 100% 100%, 0% 100%)`
}

/** Signed -1..1 from a token's seed, so each glyph gets a stable direction of its own. */
const spread = (seed: number, salt: number) => (pseudoRandom(seed * 3 + salt) - 0.5) * 2

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface TextMotionProps {
  text?: string
  preset?: PresetName
  trigger?: Trigger
  /** Seconds before the first token starts. */
  delay?: number
  /** Replay the entrance each time the element re-enters the view or scrolls. */
  replay?: boolean
  /** Share of the element that must be visible to count as "in view" (0 to 1). */
  threshold?: number
  /** Seconds between loops when trigger is "loop". */
  loopDelay?: number

  /** Skip all motion and show the final text. Also applied when the user prefers reduced motion. */
  skipAnimation?: boolean

  demoPanel?: boolean
  demoAutoPlay?: boolean
  demoAutoInterval?: number
  demoDotSize?: number
  demoGap?: number
  demoSpacing?: number
  demoColor?: string
  demoInactiveOpacity?: number
  demoAlign?: Align
  demoPosition?: "above" | "below"

  /** Scales everything the preset moves. 1 is the preset as designed. */
  intensity?: number
  duration?: number
  stagger?: number
  /** Turbulence grain. Low is a slow liquid wave, high is fine sand. */
  detail?: number
  /** How fast the turbulence decays. Lower lingers, higher snaps to rest. */
  settle?: number

  /** Overrides below apply on top of any preset. Left undefined, the preset decides. */
  effect?: Effect
  easing?: EasingName
  splitBy?: SplitBy
  order?: Order
  origin?: Origin
  amount?: number
  chaos?: number
  z?: number
  x?: number
  y?: number
  blur?: number
  scale?: number
  scaleX?: number
  scaleY?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  skewX?: number
  opacity?: number
  clip?: boolean

  /** Text color. Defaults to inheriting from the parent. */
  color?: string
  className?: string
  style?: CSSProperties
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * TextMotion
 *
 * Animates text in by character, word, or line. 37 presets, or set
 * `preset="custom"` and pass any motion parameter as a prop. Turn on
 * `demoPanel` to preview every preset from a row of dots under the text.
 */
export default function TextMotion(props: TextMotionProps) {
  const {
    text = "Text animations that\nyou’ll gonna remembers.",
    preset = "split",
    trigger = "onView",
    delay = 0,
    replay = true,
    threshold = 0.4,
    loopDelay = 1.2,
    skipAnimation = false,
    demoPanel = false,
    demoAutoPlay = false,
    demoAutoInterval = 2,
    demoDotSize = 8,
    demoGap = 5,
    demoSpacing = 34,
    demoColor = "#FFFFFF",
    demoInactiveOpacity = 0.3,
    demoAlign = "center",
    demoPosition = "below",
    color,
    className,
    style,
  } = props

  const prefersReducedMotion = useReducedMotion()
  const forceVisible = skipAnimation || Boolean(prefersReducedMotion)

  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const scrollTriggeredRef = useRef(false)

  /** Set the first time a demo dot is clicked. Once set, it overrides the preset prop. */
  const [demoPreset, setDemoPreset] = useState<FixedPreset | null>(null)

  const inView = useInView(ref, { amount: threshold, once: !replay })

  /** The demo pick only wins while the panel is shown, so hiding it reverts to the prop. */
  const activePreset: PresetName = demoPanel ? demoPreset ?? preset : preset

  const handleDemoSelect = useCallback(
    (p: FixedPreset) => {
      if (p === activePreset) return
      startTransition(() => {
        setDemoPreset(p)
        setCycle((c) => c + 1)
      })
    },
    [activePreset]
  )

  /** Preset wins unless the caller switched to custom. Props override the preset. */
  const m: Recipe = useMemo(() => {
    const base: Recipe =
      activePreset === "custom"
        ? { ...BASE, splitBy: "character", y: 40, easing: "spring" }
        : { ...BASE, ...(PRESETS[activePreset] as Partial<Recipe>) }

    /** One dial instead of ten. Intensity scales every magnitude the preset moves. */
    const k = props.intensity ?? 1
    /** Scales are ratios around 1, so their distance from rest is what scales. */
    const ratio = (v: number) => 1 + (v - 1) * k

    return {
      splitBy: props.splitBy ?? base.splitBy,
      effect: props.effect ?? base.effect,
      amount: (props.amount ?? base.amount) * k,
      detail: props.detail ?? base.detail,
      settle: props.settle ?? base.settle,
      chaos: (props.chaos ?? base.chaos) * k,
      z: (props.z ?? base.z) * k,
      x: (props.x ?? base.x) * k,
      y: (props.y ?? base.y) * k,
      opacity: props.opacity ?? base.opacity,
      blur: (props.blur ?? base.blur) * k,
      scale: ratio(props.scale ?? base.scale),
      scaleX: ratio(props.scaleX ?? base.scaleX),
      scaleY: ratio(props.scaleY ?? base.scaleY),
      rotate: (props.rotate ?? base.rotate) * k,
      rotateX: (props.rotateX ?? base.rotateX) * k,
      rotateY: (props.rotateY ?? base.rotateY) * k,
      skewX: (props.skewX ?? base.skewX) * k,
      origin: props.origin ?? base.origin,
      clip: props.clip ?? base.clip,
      order: props.order ?? base.order,
      duration: props.duration ?? base.duration,
      stagger: props.stagger ?? base.stagger,
      easing: props.easing ?? base.easing,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activePreset,
    props.intensity, props.splitBy, props.effect, props.amount, props.detail,
    props.settle, props.chaos, props.z, props.x, props.y, props.opacity,
    props.blur, props.scale, props.scaleX, props.scaleY, props.rotate,
    props.rotateX, props.rotateY, props.skewX, props.origin, props.clip,
    props.order, props.duration, props.stagger, props.easing,
  ])

  const lines = useMemo(() => tokenize(text, m.splitBy), [text, m.splitBy])

  /** Flat running index so stagger is continuous across lines and words. */
  const indexed = useMemo<IndexedUnit[][]>(() => {
    let i = 0
    return lines.map((units) =>
      units.map((unit) => {
        const isSpace = /^\s+$/.test(unit)
        if (isSpace) return { unit, index: -1, isSpace, chars: null }
        if (m.splitBy === "character") {
          return {
            unit,
            index: -1,
            isSpace,
            chars: Array.from(unit).map((c) => ({ c, index: i++ })),
          }
        }
        return { unit, index: i++, isSpace, chars: null }
      })
    )
  }, [lines, m.splitBy])

  const totalUnits = useMemo(() => {
    let n = 0
    for (const units of indexed) {
      for (const u of units) {
        if (u.isSpace) continue
        n += u.chars ? u.chars.length : 1
      }
    }
    return Math.max(n, 1)
  }, [indexed])

  useEffect(() => {
    scrollTriggeredRef.current = scrollTriggered
  }, [scrollTriggered])

  /** Loop re-mounts the tree on a timer so the whole stagger replays. */
  useEffect(() => {
    if (trigger !== "loop" || forceVisible) return
    const cycleMs = (delay + m.duration + m.stagger * totalUnits + loopDelay) * 1e3
    const id = window.setInterval(
      () => startTransition(() => setCycle((c) => c + 1)),
      cycleMs
    )
    return () => window.clearInterval(id)
  }, [trigger, forceVisible, delay, m.duration, m.stagger, totalUnits, loopDelay])

  /** Section in view uses the nearest section-like ancestor, or this element as fallback. */
  useEffect(() => {
    if (trigger !== "sectionInView" || forceVisible) return
    const node = ref.current
    if (!node) return
    const sectionLike =
      node.closest(
        "section, main, article, [role='region'], [data-section], [data-name*='Section']"
      ) ?? node
    const observer = new IntersectionObserver(
      (entries) => {
        const next = entries[0]?.isIntersecting ?? false
        startTransition(() => setSectionVisible(next))
      },
      { threshold }
    )
    observer.observe(sectionLike)
    return () => observer.disconnect()
  }, [trigger, forceVisible, threshold])

  /** On scroll replays the entrance on discrete scroll events (throttled). */
  useEffect(() => {
    if (trigger !== "onScroll" || forceVisible) return
    let lastTick = 0
    const throttleMs = 180
    const onScroll = () => {
      const now = Date.now()
      if (now - lastTick < throttleMs) return
      lastTick = now
      if (!replay && scrollTriggeredRef.current) return
      scrollTriggeredRef.current = true
      startTransition(() => setScrollTriggered(true))
      startTransition(() => setCycle((c) => c + 1))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [trigger, forceVisible, replay])

  /** Left and right arrows step through the demo presets while the panel is on. */
  useEffect(() => {
    if (!demoPanel || forceVisible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const target = e.target as HTMLElement | null
      if (target?.isContentEditable) return
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return
      e.preventDefault()
      const delta = e.key === "ArrowRight" ? 1 : -1
      const currentIndex = DEMO_PRESETS.indexOf(activePreset as FixedPreset)
      const nextIndex =
        (currentIndex + delta + DEMO_PRESETS.length) % DEMO_PRESETS.length
      handleDemoSelect(DEMO_PRESETS[nextIndex])
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [demoPanel, forceVisible, activePreset, handleDemoSelect])

  /** Read inside the interval without depending on it, so auto play never restarts mid-cycle. */
  const activePresetRef = useRef(activePreset)
  useEffect(() => {
    activePresetRef.current = activePreset
  }, [activePreset])

  /** Auto play walks the whole set on a timer, wrapping like the arrow keys. */
  useEffect(() => {
    if (!demoPanel || !demoAutoPlay || forceVisible) return
    const id = window.setInterval(() => {
      const currentIndex = DEMO_PRESETS.indexOf(activePresetRef.current as FixedPreset)
      const nextIndex = (currentIndex + 1 + DEMO_PRESETS.length) % DEMO_PRESETS.length
      startTransition(() => {
        setDemoPreset(DEMO_PRESETS[nextIndex])
        setCycle((c) => c + 1)
      })
    }, Math.max(demoAutoInterval, 0.1) * 1e3)
    return () => window.clearInterval(id)
  }, [demoPanel, demoAutoPlay, forceVisible, demoAutoInterval])

  const playing =
    forceVisible ||
    /** A manual demo pick, or auto play, always plays regardless of trigger, but only while the panel is shown. */
    (demoPanel && (demoPreset !== null || demoAutoPlay)) ||
    trigger === "onMount" ||
    trigger === "loop" ||
    (trigger === "onScroll" && scrollTriggered) ||
    (trigger === "onView" && inView) ||
    (trigger === "sectionInView" && sectionVisible) ||
    (trigger === "hover" && hovered)

  /** Content-mutating and SVG-filter effects need a wall clock. Transforms do not. */
  const usesTurbulence = usesTurbulenceEffect(m.effect)
  const usesClock = m.effect === "scramble" || m.effect === "type" || usesTurbulence
  const [elapsed, setElapsed] = useState(0)
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null)
  const filterId = `tm-${useId().replace(/:/g, "")}`

  /** Restart the clock whenever a fresh play begins. */
  useEffect(() => {
    if (!usesClock) return
    setElapsed(forceVisible ? 9999 : 0)
  }, [usesClock, cycle, activePreset, forceVisible])

  useEffect(() => {
    if (!usesClock || forceVisible || !playing) return
    const start = performance.now()
    let raf = 0
    const total = delay + m.duration + m.stagger * totalUnits

    const step = () => {
      const t = (performance.now() - start) / 1e3
      /** Drive the SVG filter imperatively, with no re-render per frame. */
      if (displaceRef.current) {
        const p = Math.min(t / Math.max(total, 0.01), 1)
        const eased = Math.pow(1 - p, m.settle)
        displaceRef.current.setAttribute("scale", String(m.amount * eased))
      }
      setElapsed(t)
      if (t < total + 0.1) raf = window.requestAnimationFrame(step)
    }
    raf = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(raf)
  }, [
    usesClock, forceVisible, playing, cycle, activePreset, delay,
    m.duration, m.stagger, m.amount, m.settle, totalUnits,
  ])

  const isChroma = m.effect === "chroma"
  const isShine = m.effect === "shine"
  const isNeon = m.effect === "neon"
  const isWipe = m.effect === "wipe"
  const isScramble = m.effect === "scramble"
  const isType = m.effect === "type"
  const glowColor = color ?? "currentColor"

  const variants: Variants = {
    /** A function so `chaos` can give every token its own start, not just its own delay. */
    hidden: ({ seed }: { seed: number }) => ({
      opacity: m.opacity,
      /** Chaos is in px, so it cannot mix with the percentage offsets a clip mask uses. */
      x: m.x + (m.chaos && !m.clip ? spread(seed, 1) * m.chaos * 240 : 0),
      /** Under a clip mask the offset is a share of the line box, not pixels. */
      y: m.clip ? `${m.y}%` : m.y + (m.chaos ? spread(seed, 2) * m.chaos * 200 : 0),
      z: m.z,
      scale: m.scale,
      scaleX: m.scaleX,
      scaleY: m.scaleY,
      rotate: m.rotate + (m.chaos ? spread(seed, 3) * m.chaos * 160 : 0),
      rotateX: m.rotateX,
      rotateY: m.rotateY,
      skewX: m.skewX,
      /** Per element, so 3D survives the nested word wrappers. */
      transformPerspective: 800,
      filter: filterString(m.blur, isShine ? m.amount : 1, isNeon ? m.amount : 0, glowColor),
      ...(isChroma ? { textShadow: chromaShadow(m.amount, 0.9) } : null),
      ...(isWipe ? { clipPath: wipeClip(0, m.amount) } : null),
    }),
    visible: ({ i }: { i: number }) => ({
      opacity: 1,
      x: 0,
      y: m.clip ? "0%" : 0,
      z: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      transformPerspective: 800,
      filter: filterString(0, 1, 0, glowColor),
      ...(isChroma ? { textShadow: chromaShadow(0, 0) } : null),
      ...(isWipe ? { clipPath: wipeClip(1, m.amount) } : null),
      transition: {
        ...EASING[m.easing],
        duration: m.duration,
        delay: delay + i * m.stagger,
      },
    }),
  }

  const tokenStyle: CSSProperties = {
    display: "inline-block",
    transformOrigin: ORIGIN[m.origin],
    willChange: "transform, filter, opacity",
  }

  /** The mask box. Padding and negative margin keep descenders from being sliced. */
  const clipStyle: CSSProperties = {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom",
    paddingBottom: "0.15em",
    marginBottom: "-0.15em",
  }

  const isFilled = style?.width === "100%"

  /** Liquid, dissolve and melt distort the whole text block, so the filter goes on a wrapper. */
  const turbulenceWrapStyle: CSSProperties = usesTurbulence
    ? { filter: `url(#${filterId})`, willChange: "filter" }
    : {}

  /**
   * For the content-driven effects, swap what the token renders based on the clock:
   * before its turn a scramble token shows a junk glyph and a type token shows nothing.
   */
  const contentFor = (content: string, orderIdx: number): string => {
    if (!isScramble && !isType) return content
    if (forceVisible) return content
    const revealAt = delay + orderIdx * m.stagger
    if (elapsed >= revealAt) return content
    if (isType) return ""
    /** Re-roll roughly every 45ms, offset per token so they do not churn in lockstep. */
    const seed = Math.floor(elapsed / 0.045) + orderIdx
    return SCRAMBLE_GLYPHS[Math.floor(pseudoRandom(seed) * SCRAMBLE_GLYPHS.length)]
  }

  const renderToken = (content: string, index: number, key: number): ReactNode => {
    const orderIdx = staggerIndex(index, totalUnits, m.order)
    const shown = contentFor(content, orderIdx)

    const token = (
      <motion.span
        key={m.clip ? undefined : key}
        custom={{ i: orderIdx, seed: index }}
        variants={variants}
        initial={forceVisible ? "visible" : "hidden"}
        animate={forceVisible || playing ? "visible" : "hidden"}
        style={tokenStyle}
      >
        {shown === "" ? <span style={{ visibility: "hidden" }}>{content}</span> : shown}
      </motion.span>
    )

    if (!m.clip) return token
    return (
      <span key={key} style={clipStyle}>
        {token}
      </span>
    )
  }

  const demoPanelEl = demoPanel ? (
    <div
      key="demo-panel"
      role="group"
      aria-label="Preset demo"
      style={{
        display: "flex",
        /** Always a single row. The row grows as wide as it needs. */
        flexWrap: "nowrap",
        justifyContent: DEMO_JUSTIFY[demoAlign],
        alignItems: "center",
        gap: demoGap,
        marginTop: demoPosition === "below" ? demoSpacing : 0,
        marginBottom: demoPosition === "above" ? demoSpacing : 0,
        alignSelf: DEMO_ALIGN_SELF[demoAlign],
      }}
    >
      {DEMO_PRESETS.map((p) => {
        const isActive = p === activePreset
        return (
          <button
            key={p}
            type="button"
            onClick={() => handleDemoSelect(p)}
            aria-label={p.charAt(0).toUpperCase() + p.slice(1)}
            aria-pressed={isActive}
            style={{
              display: "block",
              flexShrink: 0,
              width: demoDotSize,
              height: demoDotSize,
              padding: 0,
              margin: 0,
              border: "none",
              borderRadius: "50%",
              /** Independent of the text color. The panel is UI chrome, not part of the copy. */
              background: demoColor,
              /** Same size for every dot. The active one is only brighter. */
              opacity: isActive ? 1 : demoInactiveOpacity,
              cursor: "pointer",
              transition: "opacity 0.2s ease",
            }}
          />
        )
      })}
    </div>
  ) : null

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={forceVisible ? undefined : () => startTransition(() => setHovered(true))}
      onMouseLeave={forceVisible ? undefined : () => startTransition(() => setHovered(false))}
      style={{
        ...style,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: color ?? style?.color ?? "inherit",
        ...(isFilled ? null : { minWidth: "max-content" }),
      }}
    >
      {demoPosition === "above" && demoPanelEl}

      {usesTurbulence && (
        <svg
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
        >
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              /** Low frequency reads as a liquid wave. High frequency reads as fine grain. */
              baseFrequency={detailToFrequency(m.detail, m.effect)}
              numOctaves={m.effect === "liquid" ? 2 : 1}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="noise"
              scale={forceVisible ? 0 : m.amount}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div style={turbulenceWrapStyle}>
        {indexed.map((units, li) => (
          <div key={`${cycle}-${li}`} style={{ display: "block", whiteSpace: "pre-wrap" }}>
            {units.map((u, ui) => {
              if (u.isSpace) return <span key={ui}>{u.unit}</span>
              if (u.chars) {
                return (
                  <span key={ui} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {u.chars.map(({ c, index }, ci) => renderToken(c, index, ci))}
                  </span>
                )
              }
              return renderToken(u.unit, u.index, ui)
            })}
          </div>
        ))}
      </div>

      {demoPosition === "below" && demoPanelEl}
    </div>
  )
}
