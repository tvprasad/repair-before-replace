# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x | Yes |

## Reporting a Vulnerability

Please do **not** open a public issue for security vulnerabilities.

Email: prasad@vplsolutions.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

You will receive a response within 48 hours. If confirmed, a patch will be released within 7 days.

## Known Considerations

- All API keys (`VITE_*`) are bundled into the client at build time. Restrict your Gemini API key to the deployed domain in Google Cloud Console.
- Auth0 client ID is public by design (SPA pattern). Restrict allowed callback URLs in your Auth0 application settings.
- Backboard API key is client-side. Check Backboard's documentation for domain-level key restrictions.
