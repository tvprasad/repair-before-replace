# Contributing

Thank you for your interest in Repair Before Replace!

## Getting Started

```bash
git clone https://github.com/tvprasad/repair-before-replace.git
cd repair-before-replace
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

## Development Workflow

1. Fork the repo and create a branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm run test`
4. Confirm build is clean: `npm run build`
5. Open a pull request against `main`

## Code Standards

- TypeScript strict mode — no `any` without justification
- Components in `src/components/`, pages in `src/pages/`
- All new components need a corresponding test in `src/__tests__/`
- No hardcoded API keys or secrets — use `import.meta.env.VITE_*`

## Reporting Issues

Open an issue at https://github.com/tvprasad/repair-before-replace/issues with:
- Steps to reproduce
- Expected vs actual behaviour
- Browser and OS

## Contributors

[@tvprasad](https://github.com/tvprasad), [@likhita-t](https://github.com/likhita-t), [@vijaya-t](https://github.com/vijaya-t)
