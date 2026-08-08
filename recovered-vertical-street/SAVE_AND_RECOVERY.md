# Rat Run Save and Recovery Policy

## Future feature reserved

- Sewer alligator “Power Aid”: a rare positive event that emerges from a sewer, clears or frightens nearby rats, and awards a temporary bonus. Build after the travel, traffic, and actor systems are polished.
- Beer power-down: a future negative pickup that temporarily makes rats wobble unpredictably and reduces tap precision. Keep its presentation humorous but its penalty immediately readable.

## Leaderboard seasons

- Season 2 began at `2026-08-08T00:49:38Z` for the layered-parallax feedback release.
- Old scores remain archived in the existing `rat_run_scores` Supabase table. The game filters the public ranking by the season start date; no records were deleted.

After every meaningful, working change:

1. Keep the active working copy intact.
2. Sync changed files to `recovered-vertical-street` in the OneDrive Git repository.
3. Create a new timestamped ZIP checkpoint; never overwrite an older checkpoint.
4. Verify source and backup checksums for the core game files.
5. Commit the checkpoint on the `phaser-remaster` branch.
6. Push approved checkpoints to GitHub for an off-computer backup.

Do not begin the next milestone until the current checkpoint has been verified.
