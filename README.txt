RAT RUN: BALTIMORE 1.0
DOMINO SUGARS CHAMPIONSHIP EDITION

NEW IN 1.0
- Opening DOMINO SUGARS leaderboard showcase.
- Closing leaderboard refreshed with the newest result highlighted.
- Player-name entry before each run.
- Top-score target visible during gameplay.
- Police-light champion alert when the top score is within reach.
- New Baltimore Champion celebration when first place is passed.
- Point milestone announcements.
- Original procedural arcade music using the Web Audio API.
- Rat, pigeon, traffic, cheese, coffee, Adam, miss, milestone, and record sounds.
- Separate Music and FX mute buttons.
- Refined interface and visual presentation.
- Correct DOMINO SUGARS plural sign.
- Global-leaderboard adapter with local fallback.
- Ready-made Netlify Function and Supabase setup guide.
- Existing traffic, pedestrians, pigeons, power-ups, traps, Adam bonus,
  neighborhood progression, PWA installation, and offline cache retained.

QUICK DEPLOY
For the local/fallback board, upload the static project to Netlify.
For the truly shared board, follow README-GLOBAL-LEADERBOARD.txt.


VERSION 1.1 — STREET GHOUL UPDATE
- New Street Ghoul enemy enters during gameplay.
- The ghoul chases and eats active rats.
- Each eaten rat removes 15 points.
- The ghoul also drains 5 points periodically while on screen.
- Tap the ghoul three times to clear it.
- Each hit awards 10 points; defeating it awards a 75-point bonus.
- New warning banner, animation, particles, and sound.


VERSION 1.2 — STREET GHOUL + FINAL COUNTDOWN
- Built from the stable Version 1.1 clicker.
- Street Ghoul retained and appears slightly earlier.
- Larger warning and visible GHOUL HP label.
- Tap the Ghoul three times to defeat it.
- Giant animated countdown from 10 to 1.
- Final five seconds use an urgent warning style.
- Countdown sound pulse for every number.


VERSION 1.3 — ARCADE POLISH + BALTIMORE STREETS

ARCADE POLISH
- Floating score numbers for rats, Adam, power-ups and the Street Ghoul.
- Stronger particles and screen shake for major catches.
- Combo progress bar.
- 5x, 10x RAT MANIA and larger combo announcements.
- Personal-best celebration saved on the device.
- Improved sound and visual feedback.
- Slightly more fluid rat movement.
- Giant final-ten-seconds countdown retained.

BALTIMORE STREETS
- Reduced repeated street signs.
- Added more detailed brick sidewalks.
- Added layered Baltimore-style rowhouses and marble stoops.
- Added trees, benches, hydrants, trash bins and parked cars.
- Only occasional CHARLES ST and READ ST signs.
- Core straight scrolling road and tap gameplay remain unchanged.

RETAINED
- Street Ghoul.
- DOMINO SUGARS leaderboard presentation.
- Cheese and coffee power-ups.
- Adam bonus target.
- Traffic, pedestrians, pigeons, music, effects and PWA support.


VERSION 1.3.1 — STABILITY PATCH
- Fixed vibrating rowhouses and sidewalk scenery.
- Removed per-frame random building dimensions.
- Stabilized decorative object placement.
- Restored the Street Ghoul update and draw hooks.
- Ghoul now appears earlier for easier testing.
- Ghoul is larger, more visible, and chases rats more aggressively.
- Added visible -15 floating score when the Ghoul eats a rat.
- No changes to the core clicker controls.


VERSION 1.3.2 — STREET GHOUL CRASH FIX
- Rebuilt the Ghoul spawn, update and drawing code.
- Removed the undefined timer reference that froze the game.
- Ghoul remains within the visible play area.
- Ghoul safely handles periods with no rats.
- Ghoul eats rats for -15 and drains -5 periodically.
- Added frame recovery so an actor error cannot freeze the whole game.


VERSION 1.3.3 — EMERGENCY GHOUL FIX
- Fixed repeated crash-and-respawn loop at the Ghoul warning.
- Ghoul cooldown resets before spawning.
- Removed spawn particles and Ghoul audio that could interrupt the frame.
- Rebuilt Ghoul as a simple visible actor.
- Ghoul remains on screen, hunts rats and eats them for -15.
- Ghoul drains -5 every two seconds.
- Tap Ghoul three times to clear it for bonuses.
- Added Ghoul detection to the main tap handler.
- Recovery now waits 12 seconds before another Ghoul attempt.


VERSION 1.4 — PUBLIC RISK + GLOBAL COMPETITION

- 30-second rounds.
- Shared Supabase DOMINO SUGARS leaderboards.
- Weekly and all-time Top 10 visible on opening and after every run.
- Stronger Street Ghoul requiring five taps.
- Pedestrian tap: -25 and one Public Risk strike.
- Dog tap: -30 and one Public Risk strike.
- Car tap: -15 and one Public Risk strike.
- Three strikes dispatch an eight-hit police officer.
- Police drains -12 points while active.
- Brief red/blue police flash and siren.
- Champion-in-sight alert uses the real global high score.
- Rare Sewer Gator requires six taps.
- Defeated Gator drops a clickable GATOR-AID bottle.
- Coffee and Gator-Aid use drinking sounds and random low/medium/high rewards.
- Coffee gives a five-second x2 rush.
- Gator-Aid gives a five-second x3 rush.
- Existing Street Ghoul, Adam, traps, cheese, countdown, music and PWA retained.

WEEKLY PRIZE IDEA
The weekly board resets naturally every Monday at 12:00 AM UTC in the display query.
Past scores remain in the all-time table, so weekly winners can be recorded for prizes.


VERSION 1.4.1 — STARTUP HOTFIX
- Fixed immediate launch crash caused by a stale API variable.
- Added a 3.5-second leaderboard timeout.
- Game opens even if Supabase is slow or temporarily offline.
- Added local leaderboard fallback.
- Added safer opening-screen initialization.
- Updated PWA cache to force the corrected build.


VERSION 1.4.2 — LEADERBOARD DIAGNOSTIC
- Visible GLOBAL LEADERBOARD ONLINE / OFFLINE indicator.
- Refresh Scores button.
- Clear Supabase connection and submission errors.
- Clear confirmation when a score reaches the shared board.
- Local fallback remains available without pretending to be global.
- GitHub-ready folder structure restored.


VERSION 2.0 — STABILITY RELEASE
- Stable 30-second clicker core.
- Shared Supabase leaderboard retained.
- Experimental actors paused until they can be reintroduced individually.
- Debug mode: add ?debug=1 to the game URL.
- Frame errors are recovered without ending the round.


VERSION 2.1 — ACTORS RETURN + STREET LAYERS
- Core game and global leaderboard retained.
- Graphics layering corrected.
- Props stay on sidewalks.
- Traffic stays on the roadway.
- Pedestrians and dogs restored.
- Public Risk and police restored.
- Five-hit Street Ghoul restored.
- Sewer Gator and Gator-Aid restored.
- Screen shake restored for major events.
- Actor systems are isolated so they cannot crash the full game loop.
