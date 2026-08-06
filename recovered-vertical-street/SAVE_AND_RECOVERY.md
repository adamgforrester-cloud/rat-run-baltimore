# Rat Run Save and Recovery Policy

After every meaningful, working change:

1. Keep the active working copy intact.
2. Sync changed files to `recovered-vertical-street` in the OneDrive Git repository.
3. Create a new timestamped ZIP checkpoint; never overwrite an older checkpoint.
4. Verify source and backup checksums for the core game files.
5. Commit the checkpoint on the `phaser-remaster` branch.
6. Push approved checkpoints to GitHub for an off-computer backup.

Do not begin the next milestone until the current checkpoint has been verified.
