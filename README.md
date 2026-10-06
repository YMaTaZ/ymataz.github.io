# Portfolio · 个人作品集

AI product / UX / design portfolio — a static, dependency-free site.
AI 产品 / UX / 设计方向的作品集 —— 纯静态、零依赖站点。

**Live · 在线访问**：https://ymataz.github.io/

---

## Pages · 页面

| Page · 页面 | Path | Note · 说明 |
|---|---|---|
| Home · 首页 | `/` | Warm-paper landing · 暖纸风门面 |
| EODD · Explainable AI Decision System | `/eodd.html` | Case study · 案例研究 |
| KKH PREMs Translation Toolkit | `/kkh.html` | Case study · 案例研究 |
| EODD Data Visualization | `/eodd-data-viz.html` | Pixel-art charts · 像素风图表 |

---

## Stack · 技术

- **Plain HTML / CSS / JavaScript** — no framework, no build step.
  纯 HTML / CSS / JavaScript，无框架、无构建步骤。
- **Self-hosted fonts** — Newsreader, Inter, Noto Serif SC, Press Start 2P, Fusion Pixel (all OFL-licensed).
  字体自托管，均为 OFL 开源许可。
- **Motion** — CSS transitions plus light vanilla JS; respects `prefers-reduced-motion`.
  动效为 CSS 过渡加少量原生 JS，遵循 `prefers-reduced-motion`。
- **Accessibility** — semantic landmarks, skip-link, keyboard focus rings, 44px hit areas.
  可访问性：语义 landmark、skip-link、键盘焦点环、44px 命中区。

---

## Structure · 目录结构

```
├─ index.html              Home · 首页
├─ eodd.html               EODD case · 案例
├─ kkh.html                KKH case · 案例
├─ eodd-data-viz.html      EODD data viz · 数据可视化
└─ assets/
   ├─ case.css             Case styles · 案例页样式
   ├─ index.css            Home styles · 首页样式
   ├─ case.js / index.js   Scripts · 脚本
   ├─ fonts/               Self-hosted fonts · 自托管字体
   ├─ EODD_Design_Science_Paper.pdf
   ├─ kkh-storyboard/      Process images · 过程图
   └─ ui-shots/            UI screenshots · 界面截图
```

---

## Local preview · 本地预览

Any static server works · 任何静态服务器即可：

```
python -m http.server 8000
```

---

## License · 许可

Site content © 2026. Fonts under their own open licenses (see `assets/fonts/`).
页面内容 © 2026。字体各自遵循其开源许可（见 `assets/fonts/`）。
