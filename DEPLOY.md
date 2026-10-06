# 站点部署说明

本目录（`site/`）就是**独立可部署的站点根目录**。买好域名后，把这里的**全部内容**原样上传到域名的网站根目录即可，不需要任何构建、编译或安装。

## 一、目录结构

```
site/                         ← 部署时，把这个目录“里面的内容”整体上传
├─ index.html                 首页（像素风门面）
├─ eodd.html                  EODD 案例页（暖纸）
├─ kkh.html                   KKH 案例页（暖纸）
├─ eodd-data-viz.html         EODD 数据可视化（像素）
├─ DEPLOY.md                  本说明（上传前可删，不影响站点）
└─ assets/
   ├─ case.css                案例页样式（暖纸系统）
   ├─ case.js                 案例页脚本
   ├─ EODD_Design_Science_Paper.pdf   论文全文（24 页）
   ├─ kkh-storyboard/1–7.jpg  KKH 故事板（7 帧）
   └─ ui-shots/01, 03, 04     KKH 的 UI 截图（3 张）
```

## 二、怎么上传（三种常见主机都一样）

1. 登录主机 / 静态托管后台（宝塔、cPanel、阿里云 OSS、Netlify、Vercel、Nginx 自建…都行）。
2. 找到**网站根目录**：
   - Apache/虚拟主机：通常是 `public_html/` 或 `www/` 或 `htdocs/`
   - Nginx 自建：`/var/www/<域名>/` 或 `root` 指令指向的目录
   - 静态托管：直接“拖拽部署”或上传整个文件夹
3. 把 `site/` **里面的全部文件与文件夹**（`index.html`、`eodd.html`、`kkh.html`、`eodd-data-viz.html`、`assets/`）传进根目录。
   - ⚠️ 不要多套一层：上传后根目录下应直接能看到 `index.html`，而不是 `site/index.html`。
4. 访问你的域名，应直接打开首页。

**不需要**：Node、构建命令、数据库、`.htaccess` 重写规则、GitHub Pages 的目录约定。纯静态文件，任何能放 HTML 的主机都行。

## 三、注意事项

- **默认首页**：几乎所有主机都会自动把 `index.html` 当作首页；若你的主机没有，请把域名默认文档设为 `index.html`。
- **相对路径**：站内所有链接都是相对路径，换域名、换目录、换主机都不会失效。
- **字体**：标题/正文字体从 Google Fonts 加载（Newsreader / Noto Serif SC / Inter / Press Start 2P 等），**需联网**才显示最佳效果；断网或墙内访问会回退到系统字体，页面仍可正常使用。若需完全离线，可后续把字体文件自托管（再说）。
- **外链**（新标签页打开）：`eodd.studio`、`ymataz.github.io/kkh-prems-toolkit`——这两个是别人/自己的线上站，不受本站部署影响。
- **文件体积**：整站约 **1.5 MB**（含论文 PDF 378 KB + 故事板 7 张 ~940 KB + UI 图 3 张 ~400 KB），加载很轻。

## 四、上传后自检（照着点一遍）

1. 打开 `https://你的域名/` → 首页正常
2. 首页点两张案例卡 → 分别进入 EODD / KKH 案例页
3. EODD 页点「阅读完整论文（PDF）」→ PDF 能打开（或下载）
4. EODD 页点「在线体验 EODD Studio」→ 外站新标签页打开
5. EODD 页点「→ EODD 数据可视化画廊」→ 像素数据页
6. 案例页点「← 返回首页」→ 回首页；KKH 页点「← EODD…」→ 互跳
7. KKH 页故事板 7 张、UI 图 3 张、外链「查看工具包网站」均正常
8. 手机宽度下浏览一遍，无横向滚动、无错位

## 五、可选增强

- 开启 HTTPS（多数主机一键，或 Let's Encrypt 免费证书）。
- 自定义 404 页面（可选，非必需）。
- 如后续要改文案，直接编辑对应 `.html` 重新上传即可，无需重新构建。
