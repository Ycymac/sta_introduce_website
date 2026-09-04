# Go Gopher 标准土拨鼠 SVG 动画设计文档

> 文件名：`go_gopher_svg_animation.md`  
> 目标：前端使用 SVG **严格按照标准 Go Gopher（土拨鼠吉祥物）造型**进行动画展示。  
> 核心原则：**不重新设计、不抽象化、不改变比例、不替换五官、不修改标准轮廓。动画只影响“出现过程”，动画结束后的静态终态必须与标准 Gopher 矢量图完全一致。**

---

# 1. 设计基准

Go Gopher 由 Renée French 设计。Go 官方文档明确说明 Gopher 是 Go 项目的吉祥物，并存在用于保持角色特征一致的 model sheet。

本实现不重新绘制“类似 Gopher”的角色，而是：

```text
标准 Gopher 矢量路径
        ↓
拆分 SVG 图层
        ↓
保持所有 path 几何数据不变
        ↓
仅使用 mask / clipPath / opacity / transform 做入场动画
        ↓
动画完成
        ↓
恢复为原始标准 Gopher 静态图
```

## 1.1 推荐矢量基准

生产实现应直接使用标准 Gopher vector 作为 source of truth。

推荐基准：

```text
golang-samples/gopher-vector
└── gopher.svg
```

该矢量版本由 Takuya Ueda 制作，基于 Renée French 的 Go Gopher 设计。

不要使用：

```text
Emoji Gopher
自绘简化版
AI 重绘版
卡通再设计版
只有头部的 favicon
第三方“Golang logo”变体
```

---

# 2. 法务与署名

Go 官方说明：

- Go Gopher 由 **Renée French** 设计。
- Gopher 吉祥物采用 **Creative Commons Attribution** 许可。
- 使用时应保留正确署名。

推荐在项目：

```text
NOTICE
README
Credits 页面
```

加入：

```text
The Go gopher was designed by Renée French.
```

如果直接采用 `golang-samples/gopher-vector/gopher.svg`，还应按该矢量资源自身的许可要求保留 Takuya Ueda 的署名信息。

---

# 3. “完全按照标准 Gopher”定义

以下内容禁止改变。

## 3.1 身体轮廓

必须保持：

- 原始头部宽高比例
- 原始身体曲线
- 原始腹部轮廓
- 原始肩部和手臂位置
- 原始腿部/脚部造型
- 原始耳朵尺寸和位置
- 原始尾部（如果所选标准矢量包含）

禁止：

```text
拉长身体
缩小脑袋
改成圆形头像
把腿画短
改变嘴部轮廓
给 Gopher 增加衣服
增加 Java / Linux / Docker 等装饰
```

---

# 4. 标准视觉特征

Go Gopher 的视觉识别重点包括：

```text
1. 青蓝色主体
2. 极大的白色眼球
3. 黑色小瞳孔
4. 中央棕色鼻子
5. 两颗明显的大门牙
6. 圆润耳朵
7. 米白色腹部
8. 偏扁平卡通的整体比例
```

动画不能破坏这些视觉特征。

---

# 5. SVG 生产策略

## 5.1 不重画 Path

最终 SVG 必须直接继承标准矢量图的：

```xml
<path d="...">
<ellipse ...>
<circle ...>
```

几何数据。

不要根据截图重新估算 path。

正确做法：

```text
复制标准 gopher.svg
→ 清理无关 metadata
→ 保持 viewBox
→ 保持所有 path d
→ 给原 path 添加 id/class
→ 分组
→ 外围添加动画 mask
```

---

# 6. 推荐 DOM 分层

标准矢量导入后，建议整理为：

```text
svg#go-gopher-logo
├─ defs#go-gopher-defs
│  ├─ mask#body-reveal-mask
│  ├─ mask#face-reveal-mask
│  └─ clipPath#full-gopher-clip
│
├─ g#gopher
│  ├─ g#gopher-body
│  │  ├─ path#gopher-body-main
│  │  ├─ path#gopher-belly
│  │  ├─ path#gopher-arm-left
│  │  ├─ path#gopher-arm-right
│  │  ├─ path#gopher-leg-left
│  │  └─ path#gopher-leg-right
│  │
│  ├─ g#gopher-head
│  │  ├─ path#gopher-head-main
│  │  ├─ path#gopher-ear-left
│  │  └─ path#gopher-ear-right
│  │
│  ├─ g#gopher-face
│  │  ├─ path/ellipse#gopher-eye-left
│  │  ├─ path/ellipse#gopher-eye-right
│  │  ├─ circle/path#gopher-pupil-left
│  │  ├─ circle/path#gopher-pupil-right
│  │  ├─ path#gopher-nose
│  │  ├─ path#gopher-mouth
│  │  ├─ path#gopher-tooth-left
│  │  └─ path#gopher-tooth-right
│  │
│  └─ g#gopher-details
│     └─ 原标准 SVG 中其它必要细节
```

**注意：上述 id 是动画语义命名，不代表可以改动原始形状。**

---

# 7. ViewBox 规则

不要人为重新设计坐标系。

应读取标准 `gopher.svg` 自带的：

```xml
viewBox="..."
```

并原样保留。

例如：

```svg
<svg
  id="go-gopher-logo"
  viewBox="[标准 gopher.svg 原始 viewBox]"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
>
```

禁止：

```text
重新裁切头部
只保留上半身
把 Gopher 拉满整个 viewBox
改变 x/y 非等比例缩放
```

如果页面需要留白，通过外层 CSS 控制，而不是修改角色比例。

---

# 8. 色彩规则

## 8.1 最严格模式

如果目标是“完全按照标准 Gopher”，推荐：

```text
直接保留原 gopher.svg 中每个 path 的 fill / stroke
```

不要自行用近似色替换。

## 8.2 禁止主题染色

不要做：

```css
fill: currentColor;
```

因为这会把 Gopher 变成单色图标。

同样禁止：

```text
暗黑模式自动反色
hover 时变紫
hover 时整体变绿
渐变填充
发光描边
玻璃态滤镜
```

标准颜色必须固定。

---

# 9. 动画总体目标

动画表现应是：

> “标准 Gopher 被逐步绘制出来”。

而不是：

> “Gopher 本身持续运动”。

因此推荐：

```text
一次性入场动画
总时长约 2.4s
loop = false
```

最终：

```css
opacity: 1;
transform: none;
filter: none;
```

---

# 10. 推荐动画时间轴

总时长：

```text
2400ms
```

时间线：

| 时间 | 图层 | 动作 |
|---|---|---|
| 0–500ms | Gopher 身体轮廓 | mask 从下到上揭示 |
| 250–850ms | 头部 | 轮廓同步显现 |
| 650–1150ms | 左右耳朵 | 轻微 scale + fade |
| 850–1350ms | 两只眼睛 | 分别淡入 |
| 1050–1450ms | 瞳孔 | 出现，并进行一次微弱视线归位 |
| 1250–1650ms | 鼻子 / 嘴 | 淡入 |
| 1450–1850ms | 两颗门牙 | 从上到下揭示 |
| 1650–2100ms | 腹部与四肢细节 | 完成显现 |
| 2100–2400ms | 全体 | 回到标准静态终态 |

---

# 11. 身体动画

推荐使用 **mask reveal**，不要改变真实 path。

## 11.1 结构

```svg
<defs>
  <mask id="gopher-body-mask">
    <rect
      id="gopher-body-mask-rect"
      x="0"
      y="100%"
      width="100%"
      height="100%"
      fill="white"
    />
  </mask>
</defs>

<g id="gopher-body" mask="url(#gopher-body-mask)">
  <!-- 原始标准 Gopher body path -->
</g>
```

动画：

```css
#gopher-body-mask-rect {
  transform: translateY(100%);
  animation: gopher-reveal-up 700ms cubic-bezier(.4,0,.2,1) forwards;
}

@keyframes gopher-reveal-up {
  to {
    transform: translateY(0);
  }
}
```

实际实现建议根据 SVG 原坐标使用精确 `x/y/height`，不要使用 CSS 百分比造成浏览器差异。

---

# 12. 头部动画

头部整体不允许变形。

只允许非常轻微的入场：

```css
#gopher-head {
  opacity: 0;
  transform-origin: center center;
  animation: gopher-head-in 500ms ease-out 300ms forwards;
}

@keyframes gopher-head-in {
  from {
    opacity: 0;
    transform: scale(.985);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

注意：

```text
scale 最小值不低于 0.98
```

原因是过大的缩放会产生“Q 版弹出”效果，破坏标准 Gopher。

---

# 13. 耳朵动画

左右耳朵可以按：

```text
左 → 右
```

依次出现。

```css
#gopher-ear-left {
  opacity: 0;
  transform-origin: center;
  animation: ear-in 220ms ease-out 650ms forwards;
}

#gopher-ear-right {
  opacity: 0;
  transform-origin: center;
  animation: ear-in 220ms ease-out 730ms forwards;
}

@keyframes ear-in {
  from {
    opacity: 0;
    transform: scale(.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

终态仍然是标准原始耳朵尺寸。

---

# 14. 眼睛动画

眼球本身建议只做 opacity。

```css
#gopher-eye-left,
#gopher-eye-right {
  opacity: 0;
  animation: eye-in 250ms ease-out forwards;
}

#gopher-eye-left {
  animation-delay: 850ms;
}

#gopher-eye-right {
  animation-delay: 920ms;
}

@keyframes eye-in {
  to {
    opacity: 1;
  }
}
```

不要让眼球持续缩放。

---

# 15. 瞳孔动画

可进行一次非常克制的视线归位。

初始：

```text
X 偏移 ±2~3 SVG 单位
```

最终：

```text
完全回到原始 SVG 中瞳孔坐标
```

例如：

```css
#gopher-pupil-left {
  opacity: 0;
  transform: translateX(-2px);
  animation: pupil-in-left 300ms ease-out 1050ms forwards;
}

#gopher-pupil-right {
  opacity: 0;
  transform: translateX(2px);
  animation: pupil-in-right 300ms ease-out 1080ms forwards;
}

@keyframes pupil-in-left {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pupil-in-right {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**禁止循环转眼珠。**

---

# 16. 鼻子与嘴部

鼻子：

```css
#gopher-nose {
  opacity: 0;
  animation: face-detail-in 220ms ease-out 1250ms forwards;
}
```

嘴部：

```css
#gopher-mouth {
  opacity: 0;
  animation: face-detail-in 220ms ease-out 1320ms forwards;
}
```

统一：

```css
@keyframes face-detail-in {
  to {
    opacity: 1;
  }
}
```

---

# 17. 门牙动画

门牙是 Gopher 最重要的识别元素之一。

不能：

```text
旋转
弹跳
变长
变形
```

推荐使用 clipPath 自上而下揭示。

```svg
<clipPath id="teeth-reveal">
  <rect id="teeth-reveal-rect" x="..." y="..." width="..." height="0"/>
</clipPath>
```

然后：

```svg
<g clip-path="url(#teeth-reveal)">
  <path id="gopher-tooth-left" d="[原路径]" />
  <path id="gopher-tooth-right" d="[原路径]" />
</g>
```

动画只是增加 clip rect 高度。

---

# 18. 腹部动画

腹部区域建议最后出现：

```text
opacity 0 → 1
```

或使用 mask 从上向下揭示。

不要改变腹部颜色。

```css
#gopher-belly {
  opacity: 0;
  animation: belly-in 380ms ease-out 1650ms forwards;
}

@keyframes belly-in {
  to {
    opacity: 1;
  }
}
```

---

# 19. 四肢动画

左右手臂、左右腿：

```text
只建议 opacity
或 2~3px 以内的短距离位移
```

例如：

```css
#gopher-arm-left,
#gopher-arm-right,
#gopher-leg-left,
#gopher-leg-right {
  opacity: 0;
  transform: translateY(3px);
  animation: limb-in 300ms ease-out forwards;
}

@keyframes limb-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

# 20. 禁止使用持续动画

“完全按照标准 Gopher”模式下默认：

```text
loop = false
```

禁止：

```text
无限眨眼
无限呼吸
无限摇摆
无限上下漂浮
尾巴摆动
手臂挥舞
弹跳
持续旋转瞳孔
```

原因：

这些动画会使角色长期偏离标准静态 Gopher。

---

# 21. 可选的一次性眨眼

如果产品一定需要“更有生命力”，允许在入场阶段增加**一次**眨眼。

推荐：

```text
1500ms 左右
持续 120ms
```

实现时：

```text
不要直接 scaleY 整个眼球 path
```

最佳方法是单独增加与标准眼皮轮廓匹配的 `clipPath` / mask。

如果没有精确眼皮几何，宁可不做眨眼。

---

# 22. 完整动画 CSS 结构示例

```css
.go-gopher-logo {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

#gopher-body {
  animation-fill-mode: forwards;
}

#gopher-head {
  opacity: 0;
  transform-origin: center;
  animation:
    gopher-head-in
    500ms
    ease-out
    300ms
    forwards;
}

#gopher-ear-left {
  opacity: 0;
  transform-origin: center;
  animation: ear-in 220ms ease-out 650ms forwards;
}

#gopher-ear-right {
  opacity: 0;
  transform-origin: center;
  animation: ear-in 220ms ease-out 730ms forwards;
}

#gopher-eye-left {
  opacity: 0;
  animation: eye-in 250ms ease-out 850ms forwards;
}

#gopher-eye-right {
  opacity: 0;
  animation: eye-in 250ms ease-out 920ms forwards;
}

#gopher-pupil-left {
  opacity: 0;
  transform: translateX(-2px);
  animation: pupil-in-left 300ms ease-out 1050ms forwards;
}

#gopher-pupil-right {
  opacity: 0;
  transform: translateX(2px);
  animation: pupil-in-right 300ms ease-out 1080ms forwards;
}

#gopher-nose {
  opacity: 0;
  animation: face-detail-in 220ms ease-out 1250ms forwards;
}

#gopher-mouth {
  opacity: 0;
  animation: face-detail-in 220ms ease-out 1320ms forwards;
}

#gopher-belly {
  opacity: 0;
  animation: belly-in 380ms ease-out 1650ms forwards;
}

@keyframes gopher-head-in {
  from {
    opacity: 0;
    transform: scale(.985);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ear-in {
  from {
    opacity: 0;
    transform: scale(.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes eye-in {
  to {
    opacity: 1;
  }
}

@keyframes pupil-in-left,
@keyframes pupil-in-right {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes face-detail-in {
  to {
    opacity: 1;
  }
}

@keyframes belly-in {
  to {
    opacity: 1;
  }
}
```

实际生产时应拆分两个 pupil keyframe，避免部分 CSS 工具链对合并声明处理不一致。

---

# 23. 推荐 SVG 骨架

注意：

**以下仅表示动画 DOM 结构。`d="..."` 必须替换为标准 Gopher SVG 中对应的原始 path 数据。**

```svg
<svg
  id="go-gopher-logo"
  class="go-gopher-logo"
  viewBox="[KEEP ORIGINAL VIEWBOX]"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="go-gopher-title go-gopher-desc"
>
  <title id="go-gopher-title">Go Gopher</title>
  <desc id="go-gopher-desc">
    The Go programming language Gopher mascot.
  </desc>

  <defs>
    <mask id="gopher-body-mask">
      <!-- animation mask only -->
    </mask>

    <clipPath id="gopher-teeth-clip">
      <!-- animation clip only -->
    </clipPath>
  </defs>

  <g id="gopher">

    <g id="gopher-body">
      <!-- 原标准 gopher.svg body paths -->
    </g>

    <g id="gopher-head">
      <!-- 原标准 gopher.svg head paths -->

      <g id="gopher-ears">
        <!-- 原标准 ears paths -->
      </g>

      <g id="gopher-face">
        <!-- 原标准 eye whites -->

        <!-- 原标准 pupils -->

        <!-- 原标准 nose -->

        <!-- 原标准 mouth -->

        <!-- 原标准 teeth -->
      </g>
    </g>

    <g id="gopher-details">
      <!-- 保留原 SVG 中所有细节 -->
    </g>

  </g>
</svg>
```

---

# 24. Vue 使用建议

如果当前项目使用 Vue：

```vue
<template>
  <div class="gopher-wrapper">
    <GoGopherSvg
      class="gopher"
      :class="{ 'gopher--animate': animated }"
    />
  </div>
</template>
```

推荐不要：

```vue
<img src="/gopher.svg">
```

因为 `<img>` 内部 SVG DOM 无法方便地单独控制眼睛、身体、门牙等图层动画。

推荐：

```text
inline SVG
或
Vue SVG Component
```

---

# 25. React 使用建议

```tsx
export function GoGopher({
  animated = true,
}: {
  animated?: boolean;
}) {
  return (
    <svg
      className={animated ? "go-gopher-logo is-animated" : "go-gopher-logo"}
      viewBox="..."
    >
      {/* 标准 Gopher paths */}
    </svg>
  );
}
```

---

# 26. 动画触发方式

推荐支持：

```ts
type GopherAnimationTrigger =
  | "mount"
  | "viewport"
  | "manual";
```

### mount

组件挂载后自动播放一次。

### viewport

使用 IntersectionObserver：

```text
Gopher 至少 40% 进入视口
→ 播放一次
```

### manual

通过 prop 或 class 手动触发。

推荐默认：

```text
viewport
```

避免用户还没看到组件时动画已经结束。

---

# 27. IntersectionObserver 推荐配置

```js
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('is-animated');
      observer.disconnect();
    }
  },
  {
    threshold: 0.4
  }
);
```

只播放一次。

---

# 28. prefers-reduced-motion

必须支持：

```css
@media (prefers-reduced-motion: reduce) {
  .go-gopher-logo *,
  .go-gopher-logo *::before,
  .go-gopher-logo *::after {
    animation: none !important;
    transition: none !important;
  }

  .go-gopher-logo g,
  .go-gopher-logo path,
  .go-gopher-logo circle,
  .go-gopher-logo ellipse {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

reduce 模式：

```text
直接显示标准 Gopher 静态终态
```

---

# 29. 响应式规则

SVG 必须：

```css
.go-gopher-logo {
  width: 100%;
  height: auto;
  aspect-ratio: auto;
}
```

推荐容器：

```css
.gopher-wrapper {
  width: clamp(140px, 24vw, 320px);
}
```

禁止：

```css
width: 300px;
height: 200px;
```

这种非等比尺寸会把 Gopher 拉扁。

---

# 30. 动画组件 API

推荐：

```ts
interface GoGopherProps {
  size?: number | string;
  animated?: boolean;
  autoplay?: boolean;
  trigger?: 'mount' | 'viewport' | 'manual';
  duration?: number;
  className?: string;
}
```

默认：

```ts
{
  size: 240,
  animated: true,
  autoplay: true,
  trigger: 'viewport',
  duration: 2400
}
```

不提供：

```ts
loop
```

或固定：

```ts
loop: false
```

---

# 31. 完全复刻验收

最终必须满足：

## 几何

```text
原始 viewBox        100% 保留
所有 path d         100% 保留
所有 ellipse 参数    100% 保留
所有 circle 参数     100% 保留
所有 fill/stroke     100% 保留
角色比例             100% 保留
```

## 动画结束

```text
opacity       = 原始值
transform     = none / 原始 transform
filter        = 原始值
clipPath      = 完全开放
mask          = 完全开放
```

---

# 32. Pixel Diff 测试

这是保证“完全按照标准 Gopher”的关键。

准备两份：

```text
A = 未添加动画的标准 gopher.svg
B = 动画版本 seek 到最终帧
```

相同条件渲染：

```text
viewport = 1024 × 1024
background = transparent
devicePixelRatio = 1
```

进行像素差：

```text
A vs B
```

验收要求：

```text
理想：0 像素差
```

如果由于浏览器 rasterization 存在误差：

```text
允许极少量边缘抗锯齿误差
```

但绝不允许：

```text
几何形状偏移
颜色变化
缺少图层
边缘变粗
局部比例变化
```

---

# 33. 最重要的实现要求

本任务不是：

```text
“参照 Gopher 重新画一个类似的土拨鼠”
```

而是：

```text
“直接把标准 Gopher 矢量图本体变成可动画的 SVG”
```

因此：

```text
标准 SVG = 唯一几何真值
```

动画代码永远不能修改它的静态终态。

---

# 34. 推荐开发流程

```text
1. 获取标准 gopher.svg
2. 保存原始文件：
   gopher.original.svg

3. 复制为：
   gopher.animated.svg

4. 保留：
   viewBox
   path d
   fill
   stroke
   transform

5. 清理：
   Illustrator / Inkscape metadata
   无意义 id

6. 按语义重新添加 id：
   body
   head
   ears
   eyes
   pupils
   nose
   mouth
   teeth
   belly
   limbs

7. 不直接改真实 path
8. 使用 mask / clipPath / opacity 做动画
9. seek 至 2400ms
10. 与 gopher.original.svg 做 pixel diff
11. pixel diff 通过后上线
```

---

# 35. 推荐目录

```text
src/
└── assets/
    └── go/
        ├── gopher.original.svg
        ├── gopher.animated.svg
        ├── GoGopher.vue
        ├── go-gopher.css
        └── go_gopher_svg_animation.md
```

---

# 36. 最终原则总结

要做到“完全按照 Go 土拨鼠标志”，必须同时满足：

```text
不重绘
不简化
不变色
不改变比例
不改变五官
不改变身体
不改变角色姿态
不使用无限动画
不让终态与原 SVG 不同
```

只允许：

```text
标准 Gopher 原始 SVG
+
分层
+
mask / clipPath
+
一次性 reveal / fade / 极轻微 transform
```

最终视觉结果应满足：

> **动画结束的一瞬间，如果去掉所有动画 CSS，用户看不出任何区别。**
