# Livechatt (Lexicon Solo Chat Frontend)

Liten demo av en livechatt-frontend byggd med Next.js, PartyKit (partysocket) och Kinde för autentisering.  
Syfte: visa upp en realtidschatt med PartyKit för WebSocket-händelser, Kinde för användarautentisering och ett lättviktigt gränssnitt byggt med shadcn/ui + Tailwind.

## Teknologier som använts.
- Next.js (App Router, React 19, TypeScript)
- PartyKit / partysocket — realtids WebSocket-händelser & rum/party-modell
- Kinde (kinde-auth-nextjs) — autentisering / sessionshantering
- shadcn/ui + Radix UI-primitiver — UI-komponenter
- Tailwind CSS (v4) + tailwind-merge + clsx
- Zod — runtime-validering för inkommande/utgående händelser
- lucide-react — ikoner
- Biome / ESLint — formatering & lintning

## Funktioner
- Skapa / gå med i rum (lobby)
- Realtidsmeddelanden med gruppering av meddelanden per datum
- Användarnärvaro / avatarmärkning
- Admin-kontroller: rensa meddelanden, stäng rum
- Server-side hjälpfunktioner för API-anrop till PartyKit

## Miljö
Skapa en .env.local med åtminstone följande variabler:
- PARTYKIT (PartyKit host URL)
- KINDE_CLIENT_ID, KINDE_ISSUER, KINDE_CLIENT_SECRET, etc. (som krävs av Kinde-konfigurationen)
- VERCEL_URL eller KINDE_SITE_URL för lokala dev-redirect-fallbacks

Notera: next.config.ts läser KINDE_* env-värden för redirect-standarder; justera vid behov.

## Lokalt uppsättning
Installera beroenden:
- npm install

Utveckling:
- npm run dev

Bygg:
- npm run build
- npm start (produktion)

Formatering / lint:
- npm run lint-format (använder Biome i detta repo)

## Projektstruktur (översikt)
- src/app — Next.js app-rutter och UI
- src/components — delade UI-komponenter & ShadCN
- src/app/validators — Zod-scheman för strukturerade realtids-händelser
- src/app/chat — chatt-sidor, actions och serverfunktioner
- src/app/hooks — egna hooks (partysocket-integration)
- next.config.ts — bilder / env-defaults

## Noteringar
- Repot förväntar sig en PartyKit-host och en konfigurerad Kinde-tenant för autentisering.
- Zod-scheman validerar inkommande/utgående websocket-payloads — justera för att matcha eventuella server-side kontraktsändringar.

Licens
- MIT (justera efter behov)
