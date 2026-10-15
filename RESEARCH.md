# Why no-login casual games are addictive

Short version: they remove every second between "I'm bored" and "I'm playing", then pay out a small, unpredictable reward every few seconds, and give you a reason to come back tomorrow.

## What the market says
- The most downloaded mobile game of 2025 was **Block Blast**, a block-placement puzzle (356M downloads, ahead of Roblox at 286M). Tile-match (503M, +28%) and mahjong solitaire (258M, +189%) were the fastest-growing casual genres. Source: [PocketGamer.biz, AppMagic data](https://www.pocketgamer.biz/the-most-downloaded-mobile-games-of-2025)
- Hyper-casual sessions are short (about 6.7 min, second-shortest of 20 genres) but very frequent: about 167M sessions a year vs 43M for casual. Top games hit about 42% day-1 retention; publishers usually won't scale a game under 35 to 40% D1. Most players are lost in the first week. Source: [GameRefinery / GameAnalytics](https://www.gamerefinery.com/hyper-casual-gaming-the-latest-stats-and-trends-you-need-to-know/)
- Takeaway: the winners are simple puzzles you can play for 30 seconds or 30 minutes, with no fail timer and lots of "one more go".

## The hooks, and how this game uses each

| Hook | Why it works | In Tidepool Blocks |
|---|---|---|
| Zero friction | No login, no tutorial, no loading. The first touch is gameplay. | Opens straight onto the board. A game in progress is restored exactly where you left it. |
| One-sentence rules | Anyone gets it in 3 seconds. | Drag blocks, fill a row or column, it clears. |
| Juice | Every action gets sound, motion and haptics, so even small moves feel good. | Placement pop and thud, ripple-clear from where you dropped, particles, screen shake that scales with lines, rising musical notes, vibration. |
| Anticipation | Seeing a reward before you claim it builds the urge to finish the move. | While dragging, the lines you're about to clear light up in your piece's color. |
| Variable rewards | Unpredictable payouts (slot-machine schedule) are the strongest habit former. | Random pieces, multi-line clears (Good! to Legendary!), board-clear bonus. |
| Streaks / combos | Keeping a streak alive makes you play more carefully and longer. | Combo multiplier that grows with each clearing move and survives up to 2 non-clearing moves. |
| Near miss | Losing narrowly feels like "I almost had it", not "I failed". | Progress bar toward your best; game-over says "Only 120 points from your best". |
| Fair difficulty | Players quit when losses feel random. Top block games quietly tune the piece generator. | Generator prefers sets you can actually place and helps more when the board is crowded; the safety net loosens as your score climbs. |
| Second chance | A revive at the moment of loss is the most valuable offer in the game (in commercial games it's a rewarded ad). | One free "Keep going" per game that clears 4 lines. |
| Goal gradient | Visible progress toward a target speeds people up. | Best-score bar, "New best!" mid-game celebration with confetti. |
| Daily return | Daily rewards and missions turn a fun game into a habit. | 7-day login streak (big day-7 reward), 3 new missions every day. |
| Collection / spend | Currency needs somewhere to go. | Coins from score, missions and daily rewards unlock 4 extra board themes. |

## Ethics note
These same mechanics can be pushed into dark patterns (paid loot boxes, punishing streak loss, ad walls). This build keeps them fair: no ads, no purchases, no penalties for skipping a day beyond restarting the streak.

## If you want to ship it
- Monetize later with a rewarded ad on the revive and on doubling daily coins, plus an occasional interstitial between games. That is the standard hybrid-casual model.
- Wrap for Android with Capacitor: `npm i @capacitor/core @capacitor/cli @capacitor/android`, `npx cap init`, point `webDir` at this folder (it uses `index.html`), `npx cap add android`, `npx cap open android`.
- Measure D1/D7 retention and session count from day one (GameAnalytics or Firebase are free).
