<template>
  <section ref="root" class="journey-tree3d" aria-labelledby="journey-tree3d-title">
    <div class="journey-tree3d__header">
      <div>
        <p class="record-label">SPATIAL TRACE / INTERACTIVE TREE</p>
        <h3 id="journey-tree3d-title">把旅程展开成一棵树。</h3>
      </div>
      <p class="journey-tree3d__instructions">
        默认正视 · 拖拽旋转 · 滚轮缩放<br />
        FRONT VIEW / DRAG / ZOOM
      </p>
    </div>

    <div class="journey-tree3d__canvas-shell">
      <canvas
        ref="canvas"
        class="journey-tree3d__canvas"
        role="img"
        tabindex="0"
        aria-label="可旋转查看的校友旅程树，按21级、22级、23级分层，每位校友的经历节点依次串联，最终去向为叶片"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerLeave"
        @wheel.prevent="onWheel"
        @keydown="onKeydown"
      ></canvas>
      <div class="journey-tree3d__hud" aria-hidden="true">
        <span>YAW {{ yawLabel }}</span>
        <span>ZOOM {{ zoomLabel }}</span>
      </div>
      <span class="journey-tree3d__hint" aria-hidden="true">HOVER A NODE / 查看经历</span>
    </div>

    <div class="journey-tree3d__toolbar" aria-label="旅程树控制">
      <button type="button" aria-label="向左旋转" title="向左旋转" @click="rotateBy(-0.24)">↺</button>
      <button type="button" aria-label="向右旋转" title="向右旋转" @click="rotateBy(0.24)">↻</button>
      <button type="button" aria-label="缩小" title="缩小" @click="zoomBy(-0.08)">−</button>
      <button type="button" aria-label="放大" title="放大" @click="zoomBy(0.08)">＋</button>
      <button type="button" class="journey-tree3d__reset" @click="resetView">RESET VIEW</button>
      <button type="button" class="journey-tree3d__fullscreen" @click="toggleFullscreen">
        {{ isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN' }}
      </button>
    </div>

    <div class="journey-tree3d__legend" aria-label="旅程树说明">
      <span><i class="journey-tree3d__legend-dot journey-tree3d__legend-dot--employment"></i>入职</span>
      <span><i class="journey-tree3d__legend-dot journey-tree3d__legend-dot--internship"></i>实习</span>
      <span><i class="journey-tree3d__legend-dot journey-tree3d__legend-dot--postgraduate"></i>升学</span>
      <span><i class="journey-tree3d__legend-dot journey-tree3d__legend-dot--writing"></i>正在被努力书写</span>
    </div>

    <p class="journey-tree3d__fallback">
      默认正视角按年级自下而上排列；拖拽可查看前后层级。多段经历会经过多个圆形节点，最后一站以叶片呈现。下方二维树默认折叠。
    </p>
  </section>
</template>

<script>
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import antAsset from '../../assets/alumni-icons/ant.png'
import bilibiliAsset from '../../assets/alumni-icons/bilibili.png'
import bytedanceAsset from '../../assets/alumni-icons/bytedance.png'
import didiAsset from '../../assets/alumni-icons/didi.png'
import dingtalkAsset from '../../assets/alumni-icons/dingtalk.png'
import meituanAsset from '../../assets/alumni-icons/meituan.png'
import tencentAsset from '../../assets/alumni-icons/tencent.png'
import xiaohongshuAsset from '../../assets/alumni-icons/xiaohongshu.png'

const assetRegistry = {
  ant: antAsset,
  bilibili: bilibiliAsset,
  bytedance: bytedanceAsset,
  didi: didiAsset,
  dingtalk: dingtalkAsset,
  meituan: meituanAsset,
  tencent: tencentAsset,
  xiaohongshu: xiaohongshuAsset
}

const lightCohortColors = ['#fb2026', '#3d7cf0', '#09a9bd']
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const rgba = (color, alpha) => {
  const value = color.replace('#', '').trim()
  if (![3, 6].includes(value.length)) return color
  const hex = value.length === 3 ? value.split('').map((part) => `${part}${part}`).join('') : value
  return `rgba(${Number.parseInt(hex.slice(0, 2), 16)}, ${Number.parseInt(hex.slice(2, 4), 16)}, ${Number.parseInt(hex.slice(4, 6), 16)}, ${alpha})`
}

const roundRect = (context, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + width, y, x + width, y + height, r)
  context.arcTo(x + width, y + height, x, y + height, r)
  context.arcTo(x, y + height, x, y, r)
  context.arcTo(x, y, x + width, y, r)
  context.closePath()
}

const leafPath = (context, radiusX, radiusY) => {
  context.beginPath()
  context.moveTo(-radiusX, 0)
  context.bezierCurveTo(-radiusX * 0.34, -radiusY * 1.05, radiusX * 0.55, -radiusY, radiusX, 0)
  context.bezierCurveTo(radiusX * 0.42, radiusY * 0.94, -radiusX * 0.5, radiusY, -radiusX, 0)
  context.closePath()
}

export default defineComponent({
  name: 'JourneyTreeSpatial',
  props: {
    cohorts: { type: Array, default: () => [] }
  },
  setup(props) {
    const root = ref(null)
    const canvas = ref(null)
    const yaw = ref(0)
    const pitch = ref(0)
    const zoom = ref(1)
    const hoveredKey = ref('')
    const isFullscreen = ref(false)
    const viewport = ref({ width: 0, height: 0 })
    const dragging = ref(false)
    const pointer = ref({ x: 0, y: 0 })
    const imageCache = new Map()
    let hitTargets = []
    let resizeObserver
    let themeObserver
    let frameId = 0

    const records = computed(() => {
      const items = props.cohorts.flatMap((cohort, cohortIndex) =>
        cohort.people.map((person, personIndex) => ({ cohort, cohortIndex, person, personIndex, more: false }))
      )
      const lastCohortIndex = props.cohorts.length - 1
      const lastCohort = props.cohorts[lastCohortIndex]
      if (lastCohort && lastCohort.isPartial) {
        items.push({ cohort: lastCohort, cohortIndex: lastCohortIndex, person: null, personIndex: lastCohort.people.length, more: true })
      }
      return items
    })

    const yawLabel = computed(() => `${Math.round((yaw.value * 180) / Math.PI)}°`)
    const zoomLabel = computed(() => `${Math.round(zoom.value * 100)}%`)

    const getPalette = () => {
      const styles = getComputedStyle(root.value || document.documentElement)
      return {
        dark: document.documentElement.dataset.theme === 'dark',
        canvas: styles.getPropertyValue('--canvas').trim() || '#0a0a0b',
        surface: styles.getPropertyValue('--surface').trim() || '#1c1c1e',
        ink: styles.getPropertyValue('--ink').trim() || '#f8fafc',
        muted: styles.getPropertyValue('--ink-muted').trim() || '#b6bfcc',
        accent: styles.getPropertyValue('--accent').trim() || '#e7e9ee',
        red: styles.getPropertyValue('--sta-red').trim() || '#fb2026'
      }
    }

    const cohortColor = (cohortIndex) => {
      return lightCohortColors[cohortIndex]
    }

    const requestRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render)
    }

    const loadImages = () => {
      Object.entries(assetRegistry).forEach(([key, source]) => {
        const image = new Image()
        image.onload = requestRender
        image.src = source
        imageCache.set(key, image)
      })
    }

    const buildScene = () => {
      const baseRoot = { x: 0, y: -350, z: 0, kind: 'root' }
      const cohortRoots = props.cohorts.map((cohort, cohortIndex) => ({
        cohort,
        cohortIndex,
        x: 0,
        y: -210 + cohortIndex * 230,
        z: 0,
        kind: 'cohort'
      }))

      const branches = records.value.map((record, branchIndex) => {
        const cohortRecords = records.value.filter((item) => item.cohortIndex === record.cohortIndex)
        const side = record.personIndex % 2 === 0 ? -1 : 1
        const sideRank = Math.floor(record.personIndex / 2)
        const sideCount = cohortRecords.filter((item) => (item.personIndex % 2 === 0 ? -1 : 1) === side).length
        const verticalOffset = (sideRank - (sideCount - 1) / 2) * 46
        const cohortRoot = cohortRoots[record.cohortIndex]
        const depth = (sideRank - (sideCount - 1) / 2) * 46 + side * 14
        const terminalX = side * (248 + (sideRank % 2) * 26)
        const terminalY = cohortRoot.y + verticalOffset
        const terminalZ = depth
        const personNode = {
          x: side * 94,
          y: cohortRoot.y + verticalOffset * 0.78,
          z: depth * 0.18,
          kind: 'person',
          label: record.more ? '……' : record.person.publicName
        }
        const sourceStops = record.more
          ? [{ organization: '正在被努力书写', label: '下一站，继续发生', asset: '', type: 'writing' }]
          : record.person.stops.slice(1)
        const stopNodes = sourceStops.map((stop, stopIndex) => {
          const progress = (stopIndex + 1) / sourceStops.length
          return {
            x: personNode.x + (terminalX - personNode.x) * progress,
            y: personNode.y + (terminalY - personNode.y) * progress + Math.sin(progress * Math.PI) * 9,
            z: personNode.z + (terminalZ - personNode.z) * progress,
            kind: stopIndex === sourceStops.length - 1 ? 'leaf' : 'stop',
            stop,
            stopIndex
          }
        })
        return {
          ...record,
          branchIndex,
          cohortRoot,
          side,
          personNode,
          stopNodes,
          path: [cohortRoot, personNode, ...stopNodes]
        }
      })

      return { baseRoot, cohortRoots, branches }
    }

    const project = (point, width, height) => {
      const cosYaw = Math.cos(yaw.value)
      const sinYaw = Math.sin(yaw.value)
      const cosPitch = Math.cos(pitch.value)
      const sinPitch = Math.sin(pitch.value)
      const rotatedX = point.x * cosYaw - point.z * sinYaw
      const rotatedZ = point.x * sinYaw + point.z * cosYaw
      const rotatedY = point.y * cosPitch - rotatedZ * sinPitch
      const depth = point.y * sinPitch + rotatedZ * cosPitch
      const fitScale = Math.min(width / 720, height / 820)
      const depthScale = clamp(1 - depth / 1600, 0.76, 1.24)
      const scale = fitScale * zoom.value * depthScale
      return {
        x: width / 2 + rotatedX * scale,
        y: height * 0.53 - rotatedY * scale,
        scale,
        depth
      }
    }

    const drawLine = (context, from, to, width, color, alpha, dashed = false) => {
      const start = project(from, viewport.value.width, viewport.value.height)
      const end = project(to, viewport.value.width, viewport.value.height)
      context.save()
      context.globalAlpha = alpha
      context.strokeStyle = color
      context.lineWidth = Math.max(0.8, width * ((start.scale + end.scale) / 2))
      context.lineCap = 'round'
      if (dashed) context.setLineDash([4, 6])
      context.beginPath()
      context.moveTo(start.x, start.y)
      context.lineTo(end.x, end.y)
      context.stroke()
      context.restore()
    }

    const drawPill = (context, text, x, y, palette, color, size = 11) => {
      context.save()
      context.font = `700 ${size}px "Microsoft YaHei", "Noto Sans SC", sans-serif`
      const width = context.measureText(text).width + 18
      const height = size + 12
      roundRect(context, x - width / 2, y - height / 2, width, height, 8)
      context.fillStyle = rgba(palette.surface, 0.94)
      context.fill()
      context.strokeStyle = rgba(color, 0.44)
      context.lineWidth = 1
      context.stroke()
      context.fillStyle = palette.dark ? palette.ink : color
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(text, x, y + 0.5)
      context.restore()
    }

    const drawLeaf = (context, branch, node, point, palette, key) => {
      const color = branch.more ? palette.accent : cohortColor(branch.cohortIndex, palette)
      const localScale = clamp(point.scale, 0.72, 1.38)
      const radiusX = 25 * localScale
      const radiusY = 17 * localScale
      const active = hoveredKey.value === key

      context.save()
      context.translate(point.x, point.y)
      context.rotate(branch.side * -0.42)
      context.globalAlpha = active ? 1 : 0.92
      context.fillStyle = rgba(color, branch.more ? 0.09 : 0.2)
      context.strokeStyle = rgba(color, active ? 1 : 0.75)
      context.lineWidth = active ? 2 : 1.2
      if (branch.more) context.setLineDash([4, 4])
      leafPath(context, radiusX, radiusY)
      context.fill()
      context.stroke()
      context.setLineDash([])

      const image = imageCache.get(node.stop.asset)
      if (image && image.complete && image.naturalWidth > 0) {
        const size = 22 * localScale
        context.globalAlpha = 1
        context.drawImage(image, -size / 2, -size / 2, size, size)
      } else if (branch.more) {
        context.fillStyle = color
        context.font = `700 ${15 * localScale}px Space Grotesk, sans-serif`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('…', 0, -1)
      }
      context.restore()

      context.save()
      context.fillStyle = palette.ink
      context.font = '700 11px "Microsoft YaHei", "Noto Sans SC", sans-serif'
      context.textAlign = branch.side < 0 ? 'right' : 'left'
      context.textBaseline = 'middle'
      context.shadowColor = palette.canvas
      context.shadowBlur = 5
      context.fillText(`${node.stop.organization} · ${node.stop.label}`, point.x + branch.side * (radiusX + 10), point.y)
      context.restore()
    }

    const drawStop = (context, branch, node, point, palette, key) => {
      const color = cohortColor(branch.cohortIndex, palette)
      const radius = clamp(6 * point.scale, 5, 9)
      const active = hoveredKey.value === key
      context.save()
      context.fillStyle = palette.canvas
      context.strokeStyle = color
      context.lineWidth = active ? 2.4 : 1.5
      context.beginPath()
      context.arc(point.x, point.y, radius, 0, Math.PI * 2)
      context.fill()
      context.stroke()
      context.restore()

      const image = imageCache.get(node.stop.asset)
      if (image && image.complete && image.naturalWidth > 0) {
        const size = radius * 1.45
        context.drawImage(image, point.x - size / 2, point.y - size / 2, size, size)
      }

      context.save()
      context.fillStyle = palette.dark ? palette.ink : palette.muted
      context.font = '10px "Microsoft YaHei", "Noto Sans SC", sans-serif'
      context.textAlign = branch.side < 0 ? 'right' : 'left'
      context.textBaseline = 'bottom'
      context.shadowColor = palette.canvas
      context.shadowBlur = 5
      context.fillText(`${node.stop.organization} · ${node.stop.label}`, point.x + branch.side * (radius + 7), point.y - radius - 3)
      context.restore()
    }

    const drawPerson = (context, branch, point, palette, key) => {
      const color = cohortColor(branch.cohortIndex, palette)
      const radius = clamp(4.2 * point.scale, 3.6, 6.5)
      context.save()
      context.fillStyle = hoveredKey.value === key ? color : palette.canvas
      context.strokeStyle = color
      context.lineWidth = 1.2
      context.beginPath()
      context.arc(point.x, point.y, radius, 0, Math.PI * 2)
      context.fill()
      context.stroke()
      context.fillStyle = palette.ink
      context.font = '700 11px "Microsoft YaHei", "Noto Sans SC", sans-serif'
      context.textAlign = branch.side < 0 ? 'right' : 'left'
      context.textBaseline = 'middle'
      context.shadowColor = palette.canvas
      context.shadowBlur = 5
      context.fillText(branch.personNode.label, point.x + branch.side * (radius + 8), point.y)
      context.restore()
    }

    const drawTooltip = (context, target, palette) => {
      if (!target) return
      const branch = target.branch
      const route = branch.more
        ? '下一站，继续发生'
        : branch.person.stops.slice(1).map((stop) => `${stop.organization} / ${stop.label}`).join(' → ')
      const title = branch.more ? '正在被努力书写' : branch.person.publicName
      const boxWidth = Math.min(viewport.value.width * 0.46, 280)
      const boxX = clamp(target.x + (branch.side < 0 ? -boxWidth - 22 : 22), 14, viewport.value.width - boxWidth - 14)
      const boxY = clamp(target.y - 36, 14, viewport.value.height - 82)
      context.save()
      roundRect(context, boxX, boxY, boxWidth, 66, 9)
      context.fillStyle = rgba(palette.surface, 0.97)
      context.fill()
      context.strokeStyle = rgba(cohortColor(branch.cohortIndex, palette), 0.55)
      context.lineWidth = 1
      context.stroke()
      context.fillStyle = palette.ink
      context.font = '700 12px "Microsoft YaHei", "Noto Sans SC", sans-serif'
      context.textAlign = 'left'
      context.textBaseline = 'alphabetic'
      context.fillText(title, boxX + 13, boxY + 23)
      context.fillStyle = palette.dark ? palette.ink : palette.muted
      context.font = '10px "Microsoft YaHei", "Noto Sans SC", sans-serif'
      context.fillText(route, boxX + 13, boxY + 46, boxWidth - 26)
      context.restore()
    }

    const render = () => {
      frameId = 0
      const context = canvas.value && canvas.value.getContext('2d')
      if (!context || !viewport.value.width) return
      const { width, height } = viewport.value
      const palette = getPalette()
      const scene = buildScene()
      hitTargets = []
      context.clearRect(0, 0, width, height)

      const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.68)
      glow.addColorStop(0, rgba(palette.accent, 0.07))
      glow.addColorStop(1, rgba(palette.canvas, 0))
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      scene.cohortRoots.forEach((cohortRoot) => {
        const point = project(cohortRoot, width, height)
        const color = cohortColor(cohortRoot.cohortIndex, palette)
        context.save()
        context.strokeStyle = rgba(color, 0.16)
        context.lineWidth = 1
        context.setLineDash([3, 7])
        context.beginPath()
        context.moveTo(width * 0.06, point.y)
        context.lineTo(width * 0.94, point.y)
        context.stroke()
        context.setLineDash([])
        context.fillStyle = palette.dark ? rgba(palette.ink, 0.2) : rgba(color, 0.13)
        context.font = '700 42px Space Grotesk, sans-serif'
        context.textAlign = 'left'
        context.textBaseline = 'middle'
        context.fillText(cohortRoot.cohort.label.replace('级', ''), width * 0.035, point.y)
        context.restore()
      })

      const trunk = [scene.baseRoot, ...scene.cohortRoots]
      for (let index = 0; index < trunk.length - 1; index += 1) {
        drawLine(context, trunk[index], trunk[index + 1], index === 0 ? 13 : 9, palette.red, 0.16)
        drawLine(context, { ...trunk[index], z: -4 }, { ...trunk[index + 1], z: -4 }, index === 0 ? 4 : 3, palette.red, 0.78)
        drawLine(context, { ...trunk[index], x: -3, z: 5 }, { ...trunk[index + 1], x: -3, z: 5 }, 1.5, palette.accent, 0.34)
      }

      const orderedBranches = scene.branches
        .map((branch) => ({ branch, depth: project(branch.personNode, width, height).depth }))
        .sort((left, right) => left.depth - right.depth)

      orderedBranches.forEach(({ branch }) => {
        for (let index = 0; index < branch.path.length - 1; index += 1) {
          const widthStep = index === 0 ? 4.4 : Math.max(1.8, 3.2 - index * 0.45)
          drawLine(context, branch.path[index], branch.path[index + 1], widthStep, branch.more ? palette.accent : cohortColor(branch.cohortIndex, palette), branch.more ? 0.46 : 0.58, branch.more)
        }
      })

      scene.cohortRoots.forEach((cohortRoot) => {
        const point = project(cohortRoot, width, height)
        const color = cohortColor(cohortRoot.cohortIndex, palette)
        context.save()
        context.fillStyle = palette.canvas
        context.strokeStyle = color
        context.lineWidth = 2.4
        context.beginPath()
        context.arc(point.x, point.y, 9 * point.scale + 3, 0, Math.PI * 2)
        context.fill()
        context.stroke()
        context.restore()
        drawPill(context, `${cohortRoot.cohort.label} · ${cohortRoot.cohort.phase}`, point.x, point.y - 31 * point.scale - 5, palette, color, 12)
      })

      const rootPoint = project(scene.baseRoot, width, height)
      drawPill(context, 'STA / DEPARTURE', rootPoint.x, rootPoint.y + 30, palette, palette.red, 11)

      orderedBranches.forEach(({ branch }) => {
        const personPoint = project(branch.personNode, width, height)
        const personKey = `${branch.branchIndex}-person`
        drawPerson(context, branch, personPoint, palette, personKey)
        hitTargets.push({ key: personKey, x: personPoint.x, y: personPoint.y, radius: 16, branch })

        branch.stopNodes.forEach((node) => {
          const point = project(node, width, height)
          const key = `${branch.branchIndex}-${node.stopIndex}`
          if (node.kind === 'leaf') drawLeaf(context, branch, node, point, palette, key)
          else drawStop(context, branch, node, point, palette, key)
          hitTargets.push({ key, x: point.x, y: point.y, radius: node.kind === 'leaf' ? 28 : 18, branch })
        })
      })

      drawTooltip(context, hitTargets.find((target) => target.key === hoveredKey.value), palette)
    }

    const resizeCanvas = () => {
      if (!canvas.value) return
      const rect = canvas.value.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      viewport.value = { width: rect.width, height: rect.height }
      canvas.value.width = Math.round(rect.width * ratio)
      canvas.value.height = Math.round(rect.height * ratio)
      canvas.value.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
      requestRender()
    }

    const pointerPosition = (event) => {
      const rect = canvas.value.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerDown = (event) => {
      dragging.value = true
      pointer.value = pointerPosition(event)
      canvas.value.setPointerCapture(event.pointerId)
      canvas.value.classList.add('is-dragging')
    }

    const onPointerMove = (event) => {
      const position = pointerPosition(event)
      if (dragging.value) {
        yaw.value += (position.x - pointer.value.x) * 0.01
        pitch.value = clamp(pitch.value + (position.y - pointer.value.y) * 0.006, -0.58, 0.58)
        pointer.value = position
        hoveredKey.value = ''
        requestRender()
        return
      }

      const target = [...hitTargets].reverse().find((item) => Math.hypot(item.x - position.x, item.y - position.y) <= item.radius)
      const nextKey = target ? target.key : ''
      if (nextKey !== hoveredKey.value) {
        hoveredKey.value = nextKey
        requestRender()
      }
    }

    const onPointerUp = (event) => {
      dragging.value = false
      if (canvas.value.hasPointerCapture(event.pointerId)) canvas.value.releasePointerCapture(event.pointerId)
      canvas.value.classList.remove('is-dragging')
    }

    const onPointerLeave = () => {
      if (!dragging.value && hoveredKey.value) {
        hoveredKey.value = ''
        requestRender()
      }
    }

    const onWheel = (event) => {
      zoom.value = clamp(zoom.value - event.deltaY * 0.0007, 0.72, 1.42)
      requestRender()
    }

    const rotateBy = (amount) => {
      yaw.value += amount
      requestRender()
    }

    const zoomBy = (amount) => {
      zoom.value = clamp(zoom.value + amount, 0.72, 1.42)
      requestRender()
    }

    const resetView = () => {
      yaw.value = 0
      pitch.value = 0
      zoom.value = 1
      hoveredKey.value = ''
      requestRender()
    }

    const toggleFullscreen = async () => {
      if (!root.value) return
      try {
        if (document.fullscreenElement === root.value) await document.exitFullscreen()
        else if (root.value.requestFullscreen) await root.value.requestFullscreen()
      } catch (error) {
        // Fullscreen can be blocked by an embedded preview; the inline view remains usable.
      }
    }

    const onFullscreenChange = () => {
      isFullscreen.value = document.fullscreenElement === root.value
      window.requestAnimationFrame(resizeCanvas)
    }

    const onKeydown = (event) => {
      const handled = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_', '0']
      if (!handled.includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowLeft') rotateBy(-0.14)
      if (event.key === 'ArrowRight') rotateBy(0.14)
      if (event.key === 'ArrowUp') {
        pitch.value = clamp(pitch.value - 0.1, -0.58, 0.58)
        requestRender()
      }
      if (event.key === 'ArrowDown') {
        pitch.value = clamp(pitch.value + 0.1, -0.58, 0.58)
        requestRender()
      }
      if (event.key === '+' || event.key === '=') zoomBy(0.08)
      if (event.key === '-' || event.key === '_') zoomBy(-0.08)
      if (event.key === '0') resetView()
    }

    onMounted(async () => {
      await nextTick()
      loadImages()
      resizeCanvas()
      resizeObserver = new ResizeObserver(resizeCanvas)
      resizeObserver.observe(canvas.value)
      themeObserver = new MutationObserver(requestRender)
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
      document.addEventListener('fullscreenchange', onFullscreenChange)
    })

    onBeforeUnmount(() => {
      if (resizeObserver) resizeObserver.disconnect()
      if (themeObserver) themeObserver.disconnect()
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      if (frameId) window.cancelAnimationFrame(frameId)
    })

    return {
      canvas,
      isFullscreen,
      onKeydown,
      onPointerDown,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
      onWheel,
      resetView,
      root,
      rotateBy,
      toggleFullscreen,
      yawLabel,
      zoomBy,
      zoomLabel
    }
  }
})
</script>
