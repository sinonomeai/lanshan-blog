# 蓝山工作室官方网站 — 项目开发文档

## 一、项目概述

**蓝山工作室**是重庆邮电大学信息化办公室指导下的学生开发团队，曾开发"We重邮"等全国知名校园产品。本项目为工作室官方网站，面向大一新生进行品牌宣传与人才招募。

- **项目名称**：lanshan-blog
- **仓库架构**：pnpm Monorepo
- **Node 版本**：>=22.0.0 <23.0.0
- **包管理器**：pnpm@11.9.0

### 技术栈

| 层级     | 技术                  | 版本 |
| -------- | --------------------- | ---- |
| 框架     | Next.js (App Router)  | 16.x |
| UI 库    | React                 | 19.x |
| 样式     | Tailwind CSS          | 4.x  |
| 状态管理 | Zustand               | 5.x  |
| 数据请求 | TanStack Query        | 5.x  |
| 类型系统 | TypeScript (frontend) | 5.x  |
| 类型系统 | TypeScript (root)     | 6.x  |
| 后端     | Go + PostgreSQL       | —    |

---

## 二、项目架构

### 2.1 Monorepo 目录结构

```
lanshan-blog/
├── apps/
│   ├── frontend/          # 前台网站 (Next.js)
│   ├── admin/             # 后台管理系统 (规划中)
│   └── server/            # 后端服务 (Go)
├── docs/                  # 项目文档
│   ├── prd1.md            # 产品需求文档 (PRD)
│   └── project.md         # 本开发文档
├── .husky/                # Git Hooks
│   ├── pre-commit         # 提交前 lint-staged
│   └── commit-msg         # 提交信息校验
├── eslint.config.mjs      # 根 ESLint 配置 (Flat Config)
├── .prettierrc            # Prettier 格式化配置
├── .commitlintrc.yaml     # Commitlint 提交规范
├── .editorconfig          # 编辑器基础配置
├── tsconfig.json          # 根 TypeScript 配置 (Node)
├── pnpm-workspace.yaml    # pnpm 工作空间定义
└── package.json           # 根包 (devDependencies)
```

### 2.2 前端目录结构

```
apps/frontend/
├── public/
│   ├── fonts/             # 本地字体 (HarmonyOS Sans, Noto Sans)
│   └── icon/              # 图标资源
├── src/
│   ├── app/               # Next.js App Router 页面
│   │   ├── layout.tsx     # 根布局
│   │   ├── globals.css    # 全局样式 + Tailwind 导入
│   │   ├── page.module.css# 页面级 CSS Modules
│   │   └── (PC)/          # PC 端路由组
│   │       ├── HomePage.tsx
│   │       ├── HeroSection/index.tsx
│   │       ├── MiddleSection/
│   │       │   ├── index.tsx
│   │       │   └── components/
│   │       │       ├── AboutSection.tsx
│   │       │       ├── OrganizationSection.tsx
│   │       │       ├── ProjectSection.tsx
│   │       │       ├── GraduationSection.tsx
│   │       │       └── ContactSection.tsx
│   │       └── EndSection/index.tsx
│   ├── components/        # 共享组件
│   │   ├── Icon.tsx
│   │   └── Siderbar.tsx
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具函数/通用逻辑
│   │   └── use-fullpage-scroll.ts
│   ├── state/             # Zustand 状态管理
│   ├── types/             # TypeScript 类型定义
│   └── proxy.ts           # API 代理配置
├── next.config.ts
├── tsconfig.json          # 前端 TS 配置 (Next.js + paths: @/*)
├── postcss.config.mjs
├── eslint.config.mjs      # 前端 ESLint 配置
└── package.json
```

### 2.3 前端架构设计

**路由分组**：采用 Next.js Route Groups 组织 PC/Mobile 两套布局。

- `(PC)/` — 桌面端页面路由组
- `(Mobile)/` — 移动端页面路由组（规划中）

**组件分层**：

1. **页面组件** — `app/(PC)/*.tsx`，对应业务页面，组合 Section 组件
2. **区块组件** — `HeroSection/`, `MiddleSection/`, `EndSection/`，页面级区块
3. **子区块组件** — `MiddleSection/components/`，区块内子模块
4. **共享组件** — `components/`，跨页面复用的通用组件 (Icon, Siderbar)
5. **自定义 Hook** — `lib/`，可复用的逻辑 (全屏滚动)

**数据流**：React Query (服务端数据) + Zustand (客户端状态) + Props (组件通信)

**样式方案**：Tailwind CSS 4.x 优先，CSS Modules 作为复杂动画/伪元素的补充。

### 2.4 子包 TypeScript 配置对比

| 配置项           | 根 (Node) | frontend (Next.js) |
| ---------------- | --------- | ------------------ |
| target           | ES2022    | ES2017             |
| module           | ESNext    | esnext             |
| moduleResolution | bundler   | bundler            |
| jsx              | —         | react-jsx          |
| strict           | true      | true               |
| paths            | —         | `@/*` → `./src/*`  |

---

## 三、设计规范

> 详见 [PRD 文档](./prd1.md) 第四章节。

- **视觉风格**：工业风 / 机能风，简洁秩序感。参照《明日方舟：终末地》官网
- **配色**：冷灰 + 深蓝灰主色调，明黄警戒色点缀
- **字体**：HarmonyOS Sans (鸿蒙黑体) + Noto Sans (思源黑体)
- **响应式**：PC / 平板 / 移动端三端适配
- **性能**：首屏加载 <2 秒

---

## 四、开发规范

### 4.1 环境准备

```bash
# 环境要求
Node.js  >= 22.0.0  < 23.0.0
pnpm     >= 11.9.0

# 安装依赖
pnpm install

# 启动前端开发服务器
cd apps/frontend && pnpm dev
```

### 4.2 Git 提交规范 (Husky + Commitlint)

**Git Hooks** (`.husky/`)：

| Hook         | 触发时机        | 行为                               |
| ------------ | --------------- | ---------------------------------- |
| `pre-commit` | `git commit` 前 | 执行 `pnpm exec lint-staged`       |
| `commit-msg` | 编辑提交信息后  | 执行 `pnpm exec commitlint --edit` |

**Commit Message 格式**：遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

```
<type>(<scope>): <subject>
```

| type       | 说明                   |
| ---------- | ---------------------- |
| `feat`     | 新功能                 |
| `fix`      | Bug 修复               |
| `docs`     | 文档变更               |
| `style`    | 代码格式（不影响逻辑） |
| `refactor` | 重构                   |
| `perf`     | 性能优化               |
| `test`     | 测试                   |
| `build`    | 构建系统 / 依赖        |
| `ci`       | CI/CD 配置             |
| `chore`    | 杂项                   |
| `revert`   | 回滚                   |

**规则**：

- `scope` 必须全小写（`scope-case: lower-case`）
- `subject` 使用中文描述

**示例**：

```
feat(frontend): 实现 PC/Mobile 页面布局与侧边栏导航系统
fix(auth): 修复登录 token 过期未刷新问题
chore: 初始化工程化配置
```

### 4.3 提交前检查 (lint-staged)

提交前自动执行 `lint-staged`，根据文件类型触发不同检查：

| 文件类型                        | 操作                            |
| ------------------------------- | ------------------------------- |
| `*.{js,jsx,ts,tsx}`             | ESLint --fix → Prettier --write |
| `*.{json,md,yaml,yml,css,html}` | Prettier --write                |

### 4.4 ESLint 规范

**根 ESLint** (`eslint.config.mjs`，Flat Config) 面向 Node.js 环境，分五层规则：

| 层级 | 插件                     | 职责                                           |
| ---- | ------------------------ | ---------------------------------------------- |
| 1    | `@eslint/js`             | JS 基础推荐规则                                |
| 2    | `typescript-eslint`      | TypeScript 类型安全 (`recommendedTypeChecked`) |
| 3    | `eslint-plugin-n`        | Node.js 最佳实践                               |
| 4    | `eslint-plugin-import`   | 导入顺序与模块管理                             |
| 5    | `eslint-config-prettier` | 关闭与 Prettier 冲突的规则                     |

**关键规则**：

- **`@typescript-eslint/no-explicit-any`** → `"warn"` — 不禁止但需谨慎使用
- **`@typescript-eslint/no-unused-vars`** → `"error"` — `_` 前缀变量可豁免
- **`@typescript-eslint/consistent-type-imports`** → `"error"` — 强制使用 `import type`
- **`import/no-duplicates`** → `"error"` — 禁止重复导入
- **`import/order`** → `"warn"` — 导入顺序：内置 → 第三方 → 内部模块，分组间空行，字母序排列
- **`import/no-cycle`** → `"warn"` — 禁止循环引用

**前端 ESLint** (`apps/frontend/eslint.config.mjs`) 继承 `eslint-config-next` 的 `core-web-vitals` + `typescript` 规则。

### 4.5 代码格式化规范 (Prettier + EditorConfig)

**Prettier** (`.prettierrc`)：

| 规则         | 值                                       |
| ------------ | ---------------------------------------- |
| 分号         | 必须 (`semi: true`)                      |
| 引号         | 单引号 (`singleQuote: true`)             |
| 缩进         | 2 空格 (`tabWidth: 2`, `useTabs: false`) |
| 尾逗号       | 全部添加 (`trailingComma: "all"`)        |
| 行宽         | 100 字符 (`printWidth: 100`)             |
| 箭头函数括号 | 始终加 (`arrowParens: "always"`)         |
| 换行符       | CRLF (`endOfLine: "crlf"`)               |

**EditorConfig** — 所有文件统一 UTF-8 + 2 空格缩进 + 尾行空格裁剪 + 文件末尾空行。

### 4.6 TypeScript 规范

**根 `tsconfig.json`（Node 环境）**：

- `strict: true` — 严格模式全开
- `noUnusedLocals: true` — 禁止未使用的局部变量
- `noUnusedParameters: true` — 禁止未使用的参数
- `declaration: true` — 生成 `.d.ts` 声明文件

**前端 `tsconfig.json`（Next.js）**：

- `strict: true`, `jsx: "react-jsx"`
- `paths: { "@/*": ["./src/*"] }` — 路径别名

### 4.7 命名规范

| 场景        | 约定                    | 示例                              |
| ----------- | ----------------------- | --------------------------------- |
| 组件文件    | PascalCase              | `HeroSection.tsx`, `Siderbar.tsx` |
| 组件导出    | `PC_` 前缀 (PC端)       | `PC_HeroSection`                  |
| Hook 文件   | kebab-case，`use-` 前缀 | `use-fullpage-scroll.ts`          |
| Hook 函数   | camelCase，`use` 前缀   | `useFullpageScroll`               |
| CSS Modules | camelCase               | `page.module.css`                 |
| 路由组      | `(groupName)`           | `(PC)`, `(middle)`                |
| Git 分支    | kebab-case              | `feat/frontend-hero-section`      |

### 4.8 常用命令速查

```bash
# 代码检查
pnpm lint                          # ESLint 检查并自动修复

# 代码格式化
pnpm format                        # Prettier 格式化全部文件
pnpm format:check                  # Prettier 仅检查（CI 用）

# 前端开发
cd apps/frontend
pnpm dev                           # 启动开发服务器 (localhost:3000)
pnpm build                         # 生产构建
pnpm start                         # 启动生产服务器
pnpm lint                          # 前端 ESLint 检查
```

---

## 五、部署

- 前端部署平台：Vercel / Netlify（待定）
- CI/CD：配合 GitHub Actions 实现自动化构建与部署
- 环境变量：`.env` 文件管理，已加入 `.gitignore`

---

> 本文档随项目迭代持续更新。
