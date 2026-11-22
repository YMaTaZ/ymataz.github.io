# 排版放松报告 · _site

> 范围：只动 `_site/assets/css/style.css`、`_site/work/kkh.html`、`_site/en/work/kkh.html`。
> `assets/css/motion.css` 与其余 10 个 HTML **零改动**（逐字节比对确认）。
> 全部文案/事实/数字/日期/专有名词零改动：12 页正文文本节点逐节点比对，**全部 TEXT IDENTICAL**。
> `--paper: #E9E4DA` 等颜色变量未改；`.lang` 切换器、`hreflang`、`canonical`、`sitemap.xml`、`data-reveal`、动效层全部保留。

---

## 一、全局 token 改动

| token / 规则 | 改前 | 改后 |
|---|---|---|
| `--page`（版心） | `1240px` | `1180px` |
| `--gutter` | `clamp(20px,5vw,64px)` | `clamp(24px,5.5vw,72px)` |
| `body` 行高 | `1.85` | `2.0` |
| `.case-sec` 上下 padding | `clamp(40px,6vw,76px)` → 实测 76px | `clamp(56px,8vw,104px)` → 实测 104px |
| `.sec` 上下 padding | `clamp(48px,7vw,96px)` | `clamp(64px,9vw,124px)` |
| `.work-list a` 上下 padding | `clamp(20px,2.6vw,30px)` → 实测 30px | `clamp(30px,3.6vw,44px)` → 实测 44px |
| 版心实测（1440 视口） | `1240px`，左 121px，gutter 72px | `1180px`，左 121px，gutter 72px |

1440 视口下案例页栅格：`.col-main` 538.55px → **475.19px**，`.col-side` 355 → 329.3px，`.rail` 152.7px（2 栏）。

---

## 二、中文正文（`html[lang="zh-CN"]`，即默认规则）

| 选择器 | 改前 | 改后 |
|---|---|---|
| `.case-sec p` | 15.84px / 行高 1.9 / `max-width:34em` / `margin:0 0 1.05em` | 15.84px / 行高 **2.05** / `max-width:` **30em** / `margin:0 0 1.7em` |
| `.case-sec li` | 行高 1.85 / `margin-bottom:.6em` / 无独立 max-width | 行高 **2.0** / `margin-bottom:.95em` / `max-width:29em` |
| `.case-sec ul` | `max-width:34em`，`margin-bottom:1.1em` | `max-width:29em`，`margin-bottom:1.7em` |
| `.prose` / `.prose p` | 行高 1.9 / `max-width:34em` / `margin 1.1em` | 行高 **2.0** / `max-width:30em` / `margin 1.7em` |
| `.hero-copy p` | 行高 1.9 / `max-width:34em` / `margin 1.1em` | 行高 **2.0** / `max-width:30em` / `margin 1.55em` |
| `.quote` | 行高 1.85 / `padding 18-26px` / `margin clamp(24,3.4vw,40)` | 行高 1.95 / `padding clamp(26,3.2vw,40) clamp(26,3.4vw,44)` / `margin clamp(32px,4.4vw,52px) 0` / `max-width:30em` |

实测（1440）：中文正文段落 475.19px 宽、字号 **15.84px（未缩小）**、行高 **32.47px（原 30.10）**、段距 **26.93px（原 16.63）**。段距 / 行高比从 0.55 提到 0.83。

---

## 三、英文专属覆盖（`html[lang="en"]`，新增独立一节）

英文**没有**照搬中文的 2.0 行高——拉丁字符 x-height 小，2.0 会散架。单独设：

| 选择器 | 值 |
|---|---|
| `html[lang="en"] body` | `line-height:1.9` |
| `html[lang="en"] .case-sec p` / `.prose` / `.prose p` / `.hero-copy p` | `font-size:1.02rem`（16.32px，原 15.84px）、`line-height:1.9`、`max-width:62ch` |
| `html[lang="en"] .case-sec li` | `1rem` / `1.88` / `62ch` / `margin-bottom:.8em` |
| `html[lang="en"] .case-sec ul` | `max-width:62ch` |
| `html[lang="en"] .case-sec h2` | `clamp(1.3rem,2.5vw,1.8rem)` / `line-height:1.35`（原 `clamp(1.24rem,2.4vw,1.72rem)`，上限放大） |
| `html[lang="en"] .case-claim` | `clamp(1.1rem,2.1vw,1.4rem)` / `line-height:1.7` / `max-width:52ch`（原 `clamp(1.06rem,2vw,1.34rem)`） |
| `html[lang="en"] .quote` / `.dec` | `58ch` |
| `html[lang="en"] .sec-sub` / `.w-line` | `54ch` |
| `html[lang="en"] .kv .row` | `line-height:1.75` |

那两个**栅格修正**（重要，不是装饰）：

- `html[lang="en"] .about-main{grid-column:1/span 6}` + `.about-side{grid-column:8/span 5}`——原来正文跨 7 栏（594px），62ch 被栏宽盖掉，实测仍是 74 字/行。
- `html[lang="en"] .hero-copy{grid-column:1/span 6}` + `.hero-actions{grid-column:8/span 5}`——原来 5 栏（430px），62ch 被压到 ~50 字/行，出现 `the / in. / second.` 这类**单词独占一行**；展到 6 栏后回到 ~57 字/行。
- 配套降级：`@media(max-width:1000px)` 英文 about 两栏回 12 栏；`@media(max-width:768px)` 英文正文 `max-width:100%`、body 行高 1.82。

实测（1440）：英文段落 506px、字号 **16.32px（原 15.84px，变大）**、行高 **31.01px（原 30.10）**、段距 **22.85px（原 16.63）**。
每行字符数：改前 69.6–74 → 改后 **avg 56.9 / max 68**（`en/work/kkh`），均已落进 62ch 目标区间。

另加两条**不缩字号**的排版修正（Chrome 114/117+ 生效，旧浏览器自动忽略、行为同改前）：

- `.case-title,.case-sec h2,.sec h2,.display,.sec-sub{text-wrap:balance}`——中文长标题原来末行只落 1–2 个字（如「…组件**库**」「…没人会读**完」」），balance 后均分。
- `.case-sec p,.case-sec li,.prose p,.hero-copy p,.case-claim,.lede,.sec-sub{text-wrap:pretty}`——消掉英文段落最后一行只剩一个单词的孤行。

---

## 四、垂直留白与组件间距

| 组件 | 改前 | 改后 |
|---|---|---|
| `.case-head` 下 padding | `clamp(28px,4vw,44px)` | `clamp(44px,5.5vw,68px)` |
| `.case-meta` padding-top | `16px` | `24px`；`.case-meta dd` 行高 1.6→1.8 |
| `.sec-head` margin-bottom | `clamp(28px,4vw,48px)` | `clamp(36px,5vw,64px)` |
| `.kv .row` padding | `.72em 0`（实测 9.91px） | `1.08em 0`（实测 14.86px，**+50%**）；行高 1.7→1.8 |
| `.dec .row` padding | `.78em 0`（实测 11.48px） | `1.12em 0`（实测 16.49px，**+44%**）；行高 1.8→1.9；`.dec .v` 行高 → **1.85** |
| `table.t td` padding | `.72em 12px .72em 0`（实测 10.14px） | `.98em 14px .98em 0`（实测 13.80px，**+36%**）；行高 1.7→1.8 |
| `table.t th` padding | `0 12px .7em 0` | `0 14px .9em 0` |
| `.fig-band` / `.fig-pair` `margin-top` | `clamp(24px,4vw,44px)` | `clamp(32px,5vw,56px)` |
| `.screens` / `.fig-grid` `margin` | `clamp(24px,3.4vw,40px)` / `clamp(20px,3vw,32px)` | 均 `clamp(32px,5vw,56px)`；gap +4px |
| `.fig` / `.fig-band` / `.fig-pair` / `.screens` `figcaption` `margin-top` | `.7–.8em` | `.95–1.05em` |
| `.next` | `margin-top clamp(40,6vw,80)` / `padding-top clamp(20,3vw,32)` | `clamp(56,7vw,96)` / `clamp(26,3.4vw,40)` |
| `.contact-band` | `margin-top clamp(40,6vw,72)` / `padding-top clamp(20,3vw,28)` / gap 16px | `clamp(48,6.5vw,84)` / `clamp(24,3.4vw,34)` / gap 22px，行高 1.85 |
| `.num-block` | `padding-top clamp(16,2vw,24)` / `margin clamp(20,3vw,32)` | `clamp(18,2.4vw,28)` / `clamp(32,4.6vw,52)` |
| `.dg .row` / `.dg .say` / `.field` 等 EODD 结构图 | 间距偏紧 | `margin-bottom 9→12px`、`.say margin 12/26→16/32`、`.field margin-bottom 1.4→1.9em`、`.field .ds` 行高 1.65→1.8 |

---

## 五、拆分布局（只加包裹，不加文字）

新增两个纯结构 class（在 style.css「段落分组」一节）：

```css
.sub-block{max-width:100%;}
.sub-block + .sub-block{margin-top:clamp(44px,5.2vw,76px);}
.sub-block > h2:first-child,.sub-block > h3:first-child{margin-top:0;}
.sub-block > p:last-child,.sub-block > ul:last-child,.sub-block > .dec:last-child,
.sub-block > .quote:last-child,.sub-block > table.t:last-child{margin-bottom:0;}
.sub-band{border-top:1px solid var(--line2);padding-top:clamp(34px,4.6vw,58px);}
.sub-block + .sub-band{margin-top:clamp(52px,6vw,84px);}
```

处理对象 —— **`work/kkh.html` 与 `en/work/kkh.html` 结构一一对应，两文件各有 4 个 `.sub-block`、2 个 `.sub-band`，`<div>` 开/闭 156/156 平衡**：

**第 01 节 `.col-main`（原来「背景两段 + 四条约束 + 我的角色」三块贴着排）→ 3 个 `.sub-block`**

| | `work/kkh.html` | `en/work/kkh.html` |
|---|---|---|
| 块 1 | `<h2>问题不在采集，在读</h2>` + 2 段 | `<h2>The problem is not collecting, it is reading</h2>` + 2 段 |
| 块 2 | `<h3>四条约束（都不是我定的）</h3>` + `<ul>` 4 条 | `<h3>Four constraints (none of them mine to set)</h3>` + `<ul>` 4 条 |
| 块 3 | `<h3>我的角色</h3>` + 1 段 | `<h3>My role</h3>` + 1 段 |

块间实测留白：中文 794/1119/1526（块高 251/333/206），英文 991/1437/1922（块高 373/411/289）。

**第 04 节 `.col-wide`（原来「三图 + 七页目录条 + 会议照与三行表」全挤在一节里）→ 3 个块，后两块升级为 `.sub-band`（带上边细线）**

| | `work/kkh.html` | `en/work/kkh.html` |
|---|---|---|
| 块 1 `.sub-block` | `<h2>我没有重做看板，我做的是翻译层</h2>` + 1 段 + `.screens` 三图 | 同位置英文 |
| 块 2 `.sub-block .sub-band` | 八页目录条（eyebrow + `.guide-strip` 7 图 + 一行说明） | `Contents of the eight pages…` + 同 7 图 |
| 块 3 `.sub-block .sub-band` | 会议照 `.fig` + 三行对照 `table.t` | 同（英文表头） |

原来挂在 wrapper 上的内联 `style="margin:…;border-top:1px solid var(--line);padding-top:16px"` 已移到 `.sub-band` 的 CSS 上，`<p style="margin:14px 0 0">` 顺手改成 18px —— **只动 style 属性，文字一个字符没碰**。

---

## 六、12 页实测表（1440×900，`--force-prefers-reduced-motion`）

`document.body.scrollHeight` / 正文段落 `getBoundingClientRect().width` / `getComputedStyle` 的 font-size、line-height、margin-bottom：

| 页面 | bodyHeight 改前 | bodyHeight 改后 | 变化 | 正文宽度 px | font-size | line-height | margin-bottom |
|---|---|---|---|---|---|---|---|
| `index.html` | 4203 | 4821 | +618 (14.7%) | 480.0 | 16px | 32.0px | 27.2px |
| `work/kkh.html` | 9807 | 11875 | +2068 (21.1%) | 475.19 | 15.84px | 32.47px | 26.93px |
| `work/eodd.html` | 6261 | 7638 | +1377 (22.0%) | 475.19 | 15.84px | 32.47px | 26.93px |
| `work/minimal-design.html` | 3595 | 4255 | +660 (18.4%) | 475.19 | 15.84px | 32.47px | 26.93px |
| `work/digest.html` | 3257 | 3944 | +687 (21.1%) | 475.19 | 15.84px | 32.47px | 26.93px |
| `work/chair.html` | 3797 | 4389 | +592 (15.6%) | 475.19 | 15.84px | 32.47px | 26.93px |
| `en/index.html` | 4958 | 5433 | +475 (9.6%) | 506.0 | 16.32px | 31.01px | 23.66px |
| `en/work/kkh.html` | 12099 | 14271 | +2172 (18.0%) | 506.0 | 16.32px | 31.01px | 22.85px |
| `en/work/eodd.html` | 7468 | 8687 | +1219 (16.3%) | 506.0 | 16.32px | 31.01px | 22.85px |
| `en/work/minimal-design.html` | 4204 | 4827 | +623 (14.8%) | 506.0 | 16.32px | 31.01px | 22.85px |
| `en/work/digest.html` | 3916 | 4648 | +732 (18.7%) | 506.0 | 16.32px | 31.01px | 22.85px |
| `en/work/chair.html` | 4418 | 5053 | +635 (14.4%) | 506.0 | 16.32px | 31.01px | 22.85px |

合计：67983 → 79841（**+17.4%**）。这是「放松」的直接代价，不是 bug。

> **关于两种模式**：`index` / `en-index` 的 DOM 里有 `.pin` 钉住层，带不带 `--force-prefers-reduced-motion` 时 `bodyHeight` 不同（`.pin` 实测高度 1528px，reduce 下塌缩）。上面表格统一用 reduce 模式（= 验收截图所用模式）。若按**不带 reduce** 的口径（与需求里给出的原始数字同口径）：

| 页面 | 改前（motion） | 改后（motion） | 变化 |
|---|---|---|---|
| `index.html` | 5560 | 6165 | +605 (+10.9%) |
| `en/index.html` | 6270 | 6736 | +466 (+7.4%) |
| 其余 10 页 | 与 reduce 模式数值相同 | 同左 | 同左 |

两种口径下结论一致：中文页 +15–22%，英文页 +10–19%。

组件实测（1440，案例页通用，取 `work/kkh.html`）：

| 指标 | 改前 | 改后 |
|---|---|---|
| `.case-sec` padding | 76px / 76px | 104px / 104px |
| `.work-list a` padding（首页） | 30px | 44px |
| `.kv .row` padding-top | 9.91px | 14.86px |
| `.dec .row` padding-top | 11.48px | 16.49px |
| `table.t td` padding-top | 10.14px | 13.80px |
| `.wrap` 宽 | 1240px | 1180px |
| `.col-main` 宽 | 538.55px | 475.19px |

---

## 七、横向溢出检查（4 档宽度）

每档都断言 `document.documentElement.scrollWidth === document.documentElement.clientWidth`：

| 页面 | 500px | 768px | 1024px | 1440px |
|---|---|---|---|---|
| `index.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `work/kkh.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `work/eodd.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `work/minimal-design.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `work/digest.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `work/chair.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/index.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/work/kkh.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/work/eodd.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/work/minimal-design.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/work/digest.html` | 0 / true | 0 / true | 0 / true | 0 / true |
| `en/work/chair.html` | 0 / true | 0 / true | 0 / true | 0 / true |

数值为 `scrollWidth - clientWidth`。48 个组合**全部 0，全部 true**。

额外的 DOM 级体检（1440，12 页逐元素扫）：

- 破图 `img.naturalWidth===0`：**0**
- 子元素内容溢出自身盒（`scrollWidth > clientWidth` 且非滚动容器）：**0**
- 叶子文字节点右边界超出视口（被裁）：**0**
- 有文字但渲染宽度为 0：**0**

---

## 八、英文页中文残留

`en/index.html` + `en/work/{kkh,eodd,minimal-design,digest,chair}.html` 六页，剥掉标签后扫描 `[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]`：

| 页面 | 文本节点中文 | 非白名单 | `alt`/`title`/`aria-label`/`content` 属性中文 |
|---|---|---|---|
| `en/index.html` | 1（「中文」切换器） | **0** | 0 |
| `en/work/kkh.html` | 1 | **0** | 0 |
| `en/work/eodd.html` | 1 | **0** | 0 |
| `en/work/minimal-design.html` | 1 | **0** | 0 |
| `en/work/digest.html` | 1 | **0** | 0 |
| `en/work/chair.html` | 1 | **0** | 0 |

白名单只有「中文」「语言」两词（`.lang` 切换器），合计非白名单中文 **0 处**。

---

## 九、内部链接校验

12 页共 **233** 个相对 `href` / `src`（排除 `http(s):`、`mailto:`、`tel:`、`data:`、`#`、`javascript:`）逐个 `os.path.exists` 解析：

```
PAGES: 12   relative href/src checked: 233   missing: 0
```

含 `assets/portfolio-2026.pdf`、`assets/portfolio-2026-en.pdf`（两文件均存在）。`sitemap.xml`、`robots.txt`、`404.html`、`README.md` 均在位。

---

## 十、结构与元信息未被破坏

逐页比对改前/改后：

| 页面 | `lang` | `hreflang` 数 | `canonical` | `data-reveal` 数 | `.lang` 切换器 | 引入的 CSS/JS |
|---|---|---|---|---|---|---|
| `index.html` | zh-CN | 4 | 1 | 16 | 1 | 同 |
| `work/kkh.html` | zh-CN | 3 | 1 | 48 | 1 | 同 |
| `work/eodd.html` | zh-CN | 3 | 1 | 29 | 1 | 同 |
| `work/minimal-design.html` | zh-CN | 3 | 1 | 17 | 1 | 同 |
| `work/digest.html` | zh-CN | 3 | 1 | 16 | 1 | 同 |
| `work/chair.html` | zh-CN | 3 | 1 | 17 | 1 | 同 |
| `en/index.html` | en | 3 | 1 | 16 | 1 | 同 |
| `en/work/kkh.html` | en | 3 | 1 | 48 | 1 | 同 |
| `en/work/eodd.html` | en | 3 | 1 | 29 | 1 | 同 |
| `en/work/minimal-design.html` | en | 3 | 1 | 17 | 1 | 同 |
| `en/work/digest.html` | en | 3 | 1 | 16 | 1 | 同 |
| `en/work/chair.html` | en | 3 | 1 | 17 | 1 | 同 |

`motion.css` 与 `motion.js` **未改动一个字节**，`data-reveal` 数量逐页不变，`.pin` / `.specs` / `.readbar` 动效逻辑照旧（`pin` 高度 1528px 前后一致）。

---

## 十一、产物清单

- `_site/assets/css/style.css`：21519 B → **25544 B**（918 行；motion.css 仍 10677 B / 308 行，未改）
- `_site/work/kkh.html`、`_site/en/work/kkh.html`：各 +5 个 `<div>`（01 节 3 个 `.sub-block`；04 节 1 个 `.sub-block` + 2 个 `.sub-band`；`<div>` 总数 151 → 156，开/闭 156/156 平衡），文字零改动
- `_shots/after/`：24 张 PNG = 12 张首屏 `*-1440x900.png` + 12 张整屏 `*-full.png`
- `_shots/narrow/`：窄屏抽查图（`index-500`、`index-768`、`kkh-500`、`en-kkh-500`，另有改前对照 `before-index-500`）
- `_shots/motion/`：**不带** reduce 的三张动效态截图（`index-motion`、`kkh-motion`、`en-kkh-motion`），确认 `.pin` / `data-reveal` 在新排版下正常
- `_relax_backup/`：改前完整备份（CSS + 12 HTML），可回滚
- `_probe/`：探针与截图脚本（`probe.py`、`shots.py`）、`before_site/` 基线副本

---

## 十二、逐页改动摘要

| 页面 | 改了什么 |
|---|---|
| `index.html` | 版心 1240→1180、gutter 加大；hero 下 padding 72→88；`.hero-copy p` 行高 1.9→2.0 / max-width 34em→30em / 段距 1.1→1.55em；`.work-list a` padding 30→44px；`.prose`/`.about` 行高 2.0、30em；`.kv .row` padding +50%；`.chain` 行高 1.75→1.9、`.ev` 上距 .8→1.1em；`.num-block` / `.contact-band` 间距加大 |
| `work/kkh.html` | 全局规则之外，**结构拆分**：01 节 3 个 `.sub-block`、04 节 3 块（后两为 `.sub-band`）；`.screens` gap +4px、margin-top 40→56；`.guide-strip` gap 10→12、上距 14→clamp(18,2.4vw,26)、caption 上距 .5→.7em |
| `work/eodd.html` | 全局规则；`.dg .row` 行距 9→12px、`.dg .say` margin 12/26→16/32、`.field` 间距 1.4→1.9em、`.field .ds` 行高 1.65→1.8；`.fig-pair` gap +4px、margin-top 56 |
| `work/minimal-design.html` | 全局规则；`.case-sec` 104px、`table.t` padding +36%、`figcaption` 上距加大 |
| `work/digest.html` | 全局规则；`.num-block`、`.chain`、`table.t`、`.quote` 间距全部加大 |
| `work/chair.html` | 全局规则；`.fig-grid` / `.fig-band` margin-top 56px、`.screens` gap +4px、caption 上距 .95em |
| `en/index.html` | 英文正文 16.32px / 1.9 / 62ch（独立覆盖）；**hero 5 栏→6 栏**、actions 8 栏起；about-main 7→6 栏、about-side 8 栏起；work-list 44px |
| `en/work/kkh.html` | 与中文 **一一对应的同样拆分**；正文 16.32px/1.9/62ch；`.case-sec h2` / `.case-claim` 上限放大；`.quote`/`.dec` 58ch、`.sec-sub`/`.w-line` 54ch |
| `en/work/eodd.html` | 英文覆盖 + 全局组件间距；`.dec` 58ch；h2/claim 放大 |
| `en/work/minimal-design.html` | 英文覆盖 + 全局组件间距 |
| `en/work/digest.html` | 英文覆盖 + 全局组件间距 |
| `en/work/chair.html` | 英文覆盖 + 全局组件间距 |

---

## 十三、验收命令（可复现）

```bash
mkdir -p "F:/DSH workshop/_shots/after"
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=old --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --window-size=1440,900 \
  --screenshot="F:\DSH workshop\_shots\after\kkh-1440x900.png" \
  --virtual-time-budget=4000 \
  "file:///F:/DSH%20workshop/_site/work/kkh.html"
```

> ⚠️ `--force-prefers-reduced-motion` 必须加，否则首页 `.pin` 钉住层会让首屏呈现空白。

---

## 十四、截图验收记录（逐张读图）

12 页首屏（1440×900）+ 12 页整屏（1440×`bodyHeight`+40）全部 `file://` 直开、带 `--force-prefers-reduced-motion` 截取，落盘 `_shots/after/`。逐张读图确认：

| 检查项 | 结果 |
|---|---|
| 横向溢出 / 出现横向滚动条 | 无（12/12 首屏 + 12/12 整屏） |
| 文字被裁（右侧切字、图片边缘裁切） | 无 |
| 单词独占一行（英文） | 无（`text-wrap:pretty` + 英文 6 栏修正后已消，见第五节） |
| 正文贴边（gutter 不足） | 无，1440 视口下正文左边界 370px、右边界 ~875px，两侧留白充足 |
| 长标题末行只落 1–2 个字（中文） | 无（`text-wrap:balance` 生效，如「…组件**库**」「…没人会读**完」」等已均分） |
| 图带 / 目录条与上文黏连 | 无（`.sub-band` 上边细线 + 34–58px 留白） |

另外用**不带** `--force-prefers-reduced-motion` 的模式补拍 `_shots/motion/{index,kkh,en-kkh}-motion.png` 三张，确认动效层（`.pin` / `data-reveal` / `.readbar`）在新排版下仍正常渲染、首屏不空白。

> ⚠️ 再次强调：截图必须加 `--force-prefers-reduced-motion`。不加时首页 `.pin` 钉住层会让 1440×900 首屏呈现大片空白（这是改前既有行为，与本次改动无关）。

---

## 十五、结论

1. **真拥挤的是 4 个长案例页**：`work/kkh`（原 9807px，48 个 `data-reveal` 块）、`en/work/kkh`（12099px）、`work/eodd`（6261px）、`en/work/eodd`（7468px）——它们的问题不是字号，而是**段距只有 1.05em（相对 1.9 行高，段间距 < 行距的 60%）、分节 padding 只有 76px、kv/dec 行几乎贴在一起**，于是整页读起来像一块连续的灰墙。解决方式是「三件套」：段距提到 1.7em（段距/行高比 0.55 → 0.83）、`.case-sec` padding 76 → 104px、kv/dec/td padding +36–50%，而不是缩字号。
2. **英文六页的问题是行宽不是行距**：原来 69.6–74 字符/行（超过 65ch 上限），且 `max-width:34em` 在 62ch 目标下根本没起约束作用。解决方式是给 `html[lang="en"]` 单独一套度量（16.32px / 1.9 / 62ch）+ 把 hero 和 about 的栅格从 5/7 栏调到 6 栏，让 `62ch` 真正生效；结果 avg 56.9 字/行。**英文行高特意比中文低（1.9 vs 2.0）**，拉丁字母照搬 2.0 会散。
3. **`work/kkh` / `en/work/kkh` 的第 01、04 节是结构问题，不是间距问题**：01 节「背景 + 四条约束 + 我的角色」三块无缝相连、04 节「三图 + 七页目录条 + 会议照 + 三行表」四块挤在一屏，光加 margin 只会变成长而均匀的一坨。解决方式是加 `.sub-block` / `.sub-band` 两层纯结构包裹并拆成 3 块（中英一一对应，4 `.sub-block` + 2 `.sub-band`/页），让每组之间是**真的空白或一条细线**，而不是一个更大的 margin。


---

# 第二部分 · 作品集 PDF 放松（16 页 → 34 页，中英同页码）

> 文件：`_pf/out/portfolio.pdf`（中文，3,694,010 B）、`_pf/out/portfolio-en.pdf`（英文，3,264,434 B）
> 已同名覆盖：`_site/assets/portfolio-2026.pdf`、`_site/assets/portfolio-2026-en.pdf`、
> `C:\Users\20769\Desktop\OH-WorkSpace\resume-project\作品集-2026.pdf`、`作品集-2026-EN.pdf`（md5 与源一致）。

## A. 结论先说：PDF 的问题是「英文被整体缩到比中文小 3—4 档」

旧册中文主体 8.0pt / 9.6pt，英文只因用 `--fsz/--spz/--lhz` 做按页缩放，实际落到 **6.5—9.1pt**。
同一页里中文 9.6pt、英文 6.7pt，肉眼就能看出英文挤。**这是「靠缩字号塞进 16 页」的实证。**

所以这次不是「在原页里放宽一点」，而是：**保留字号、放大行高与留白，页数从 16 页加到 34 页**。

## B. 版式参数（新旧对照）

| 项目 | 旧（16 页） | 新（34 页） |
|---|---|---|
| 页盒 | `.page` 297×210mm，`padding:15mm 18mm 13mm` | `.sheet` 297×210mm，`padding:15mm 20mm 14mm` |
| 内容盒高 | 182mm（且被 16 页固定页盒挤压） | **181mm**（安全线 196mm，实测最高点 ZH 169.9 / EN 189.5） |
| 栅格 | 1.45fr : 1fr，gap 16.52mm（相对宽度，栏宽随内容浮动） | **固定 `121.5mm + 121.5mm`，column-gap 14mm** |
| 通栏带 | 无统一定义 | `.band` 固定 257mm |
| 中文正文 | 9.6pt / 行高 1.9 | **10.3pt / 1.94** |
| 中文引文 | 8.0pt / 1.72 | **10.6pt / 1.94** |
| 表体 | 9.4pt / 1.6 | **10pt / 1.84** |
| 注脚 | 7.4pt / 1.6 | **8.4pt / 1.78** |
| 章首大标题 | 22pt / 1.22 | **26pt / 1.3** |
| 节标题 | 14.5pt / 1.4 | **17pt / 1.5** |
| 块间距 | 3.5—8.3mm 不等（1.89/2.36/7.08 三种 inline 值） | 统一 **7.6mm**（栏内与通栏带同一节奏） |
| 英文缩放 | `--fsz 0.836—0.9` + `--spz` / `--lhz`，共 132 处 | **全部删除**，英文与中文同一套物理字号 |
| 页眉页脚 | 只有页码，且英文册页眉仍是中文 | 页眉 = 章节行 + 起止月；页脚 = 「作品集 2026 · 袁烨 · 交互设计师（B 端）」+ 页码；**英文册页眉/页脚全英文** |
| 页数 | 各 16 页 | **各 34 页（中英严格同页码）** |
| 书签 | 16 条 | 16 条（起点随新分页重算） |
| 可点链接 | 中 6 / 英 11 | 中 11 / 英 10 |

栏宽按字数核对：中文栏 121.5mm ÷ 10.3pt ≈ **每行 33—34 字**（规则书 32—36 字内）；英文同栏 ≈ **每行 66—69 字符**（65—75ch 内）。

## C. 分页（16 章 / 34 页）

| 章 | 页 | 内容 |
|---|---|---|
| 01 | P01—P02 | 封面 · 定位与四个数字 |
| 02 | P03—P05 | 速览 · 这本书怎么读 |
| 03 | P06—P08 | KKH · 背景与约束 |
| 04 | P09—P10 | 判断一 · 两种视角，不是两套需求 |
| 05 | P11—P12 | 判断二 · 从十几个指标到三个数 |
| 06 | P13—P14 | 界面 · 翻译层 |
| 07 | P15—P16 | 判断三 · 它必须能打印 |
| 08 | P17—P18 | 反思 · 三个如果重做 |
| 09 | P19—P20 | EODD · 可解释 AI 决策界面 |
| 10 | P21—P22 | 判断一二 · 可解释不是多给信息 |
| 11 | P23—P24 | 判断三 · 解释更多不能更累（d = 1.81） |
| 12 | P25—P26 | minimal-design · 规则书 |
| 13 | P27—P28 | 六条阈值与它们的来历 |
| 14 | P29—P30 | AI 开源日报 · 200 条 → 3 条 |
| 15 | P31—P32 | 人宠公共座椅 |
| 16 | P33—P34 | 能力与关于 · 联系方式 |

## D. 验收

| 检查 | 结果 |
|---|---|
| 页数一致 | 中 34 / 英 34 ✔ |
| 内容最高点 | ZH 169.9mm / EN 189.5mm，安全线 196mm**零越界** |
| 正文出血 / 贴边 | 逐 span 测 bbox：距左 20mm、右 20mm、上 15mm，**0 处越界**（页脚按设计落在下边距） |
| 字号未被缩小 | 英文旧版 6.5—9.1pt 档**全部消失**，主体 10.3pt / 10.0pt |
| 书签 | 各 16 条，层级 1/1/1/2/2/2/2/2/1/2/2/1/2/1/1/1 |
| 可点链接 | 中 11 / 英 10（mailto / 站点 / GitHub / tel / frontend-assets / cyber-newspaper） |
| 文案一字不改 | 去标签后 token 多重集：ZH 738→738、EN 737→737；差异仅页眉页脚新增文案、交叉引用页码重编号（如 P03—P08 → P06—P18）、三处「十六页」→「三十四页」（分页变化的必然结果） |
| 站内下载链接 | `assets/portfolio-2026.pdf`、`assets/portfolio-2026-en.pdf` 线上均 200 |

## E. 已知可再优化（未做，不影响交付）

ZH 有 3 页偏空：P06（章首页 37%）、P08（46%）、P31（51%）。原因是「每章必须从新页开始」+ 章首大标题块（47.7mm）占用首页顶部，装箱器不会把下一章内容提前。若要更满，可允许章首标题与下一块同页，但会削弱章节分界的节奏感，故保留现状。
