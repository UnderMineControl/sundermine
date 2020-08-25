# SunderMine
The UnderMine Save manager and mod loader!

## Build & Run
While not being finished, you can check the progress by running it yourself! The application is built with [Electron](https://www.electronjs.org/) and [Angular](https://angular.io/).
To build it you will need [nodejs 12+](https://nodejs.org/en/) installed. Once NodeJS is installed you can open your favourite terminal/command prompt and run the following commands:

1) Make sure you're in the root folder of SunderMine
2) Resolve the Node Packages (only needs to be done once): ```> npm install```
3) Run the project: ```> npm run start:electron```

Then you should see SunderMine open after everything finishes building. If you have any problems, submit an issue.

## Features
Here is a list of features that are planned for SunderMine:
- [x] A cool UnderMine inspired theme!
- [ ] Save file backup
    - [ ] Support for Steam & GamePass versions of the game
    - [ ] Custom back-up directory and save file renaming
    - [ ] Allow for injecting custom or backed up saves
- [ ] Save inspecting / manipulation
    - [ ] View a list of unlocked relics and potions
        - [ ] Unlock specific ones
        - [ ] Give peasant specific potions and relics
    - [ ] View kill counts for each type of enemies
    - [ ] Modify the peasants name
    - [ ] Modify the gold, bombs, keys, and thorium counts
- [ ] Mod loader
    - [ ] Install [UnderMineControl](https://github.com/underminecontrol/underminecontrol) automatically & keep it up to date
    - [ ] Install mods for UMC in the correct locations & keep them up to date
    - [ ] Ability to enable and disable installed mods
    - [ ] Ability to enable and disable UMC
    - [ ] Fetch a collection of approved mods from a registry (somewhere?)
    - [ ] Allow for manual installation of mods that haven't yet been approved of.

