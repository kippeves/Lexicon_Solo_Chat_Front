# Livechatt (Lexicon Solo Chat Frontend)

Liten demo av en livechatt-frontend byggd med Next.js, PartyKit (partysocket) och Kinde för autentisering.  
Syfte: visa upp en realtidschatt med PartyKit för WebSocket-händelser, Kinde för användarautentisering och ett lättviktigt gränssnitt byggt med shadcn/ui + Tailwind.

## Teknologier som använts.
- Next.js (App Router, React 19, TypeScript)
- PartyKit & PartySocket — realtids WebSocket-händelser
- Kinde (kinde-auth-nextjs) — autentisering / sessionshantering
- shadcn/ui + UI-komponenter
- Tailwind CSS (v4)
- Zod — Validering av inkommande/utgående händelser
- Lucide-react — Ikoner
- Biome — formatering & lintning

## Funktioner
- Skapa / gå med i rum (lobby)
- Realtidsmeddelanden med gruppering av meddelanden per datum
- Användarnärvaro & avatarmärkning
- Admin-kontroller: rensa meddelanden, stäng rum
- Server-side hjälpfunktioner för API-anrop till PartyKit

## Miljö
Skapa en .env.local med åtminstone följande variabler:
- PARTYKIT (PartyKit host URL)
- KINDE_CLIENT_ID, KINDE_ISSUER, KINDE_CLIENT_SECRET, etc. (som krävs av Kinde-konfigurationen)
- VERCEL_URL eller KINDE_SITE_URL för lokala dev-redirect-fallbacks

Notera: next.config.ts läser KINDE_* env-värden för redirect-standarder; justera vid behov.

## 📚 Lärdomar
- NextJS & React
  - Parallel routes - För lobby & rum - För att minska duplicerad kod och ha en enhetlig källa för layout.
  - Serverside-funktioner - För de anrop som säkerhetsmässigt bör hålls gömda från clientside.
- Kinde
  - Integration av OIDC i frontend.
- PartyKit / WebSocket
  - Realtids-eventhantering för frontend.
  - Säkerhet med JWT-validering.
- Zod
  - Validering av inkommande & utgående information
  - Hantering av typer baserade på valideringsobjekt för en Single-Source-of-Truth.

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
- Repot förväntar sig en PartyKit-host och en konfigurerat Kinde-projekt för autentisering.
- Zod-scheman validerar inkommande/utgående websocket-payloads, justera vid behov.

Licens
- MIT (justera efter behov)
