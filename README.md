<h1 align="center">boing</h1>

<h3 align="center"><i>A Discord interface for the Mindustry game server.</i></h3>

- **Intuitive:** Boing is simple and easy to use, and you can access it from any machine, not just the one the server is running on.

- **Multiplayer:** Easily play together with friends --  no need to set up your own Dedicated Server.

- **Easy to install:** Almost anyone should be able to get Boing working, with little to no technical knowledge required.
  
  
  Boing is an extra layer on top of the Mindustry Dedicated Server that allows you to control it remotely using a Discord bot. This enables you and your friends to play together that much more easily.
  
****

#### Table of Contents

- [Getting Started](#getting-started)
    - [Bot Setup](#bot-setup)
    - [Boing Setup](#boing-setup)
    - [Network Setup](#network-setup)
- [Features](#features)
- [Commands](#commands)
- [Troubleshooting & Additional Information](#troubleshooting--additional-information)
      - [I accidentally entered in wrong information.](#i-accidentally-entered-in-wrong-information)
      - [**The service installation failed for some reason. Now Boing won't work in Service Mode anymore.**](#the-service-installation-failed-for-some-reason-now-boing-wont-work-in-service-mode-anymore)
- [Roadmap](#roadmap)

## Getting Started

Installation of Boing should be relatively straightforward - the wrapper takes care of much, if anything technical and leaves you with a nice, pretty, Discord bot at the end. However, if anything goes wrong, please feel free to open a issue with the problem you're encountering.

First, we'll begin by setting up the Discord bot. 

#### Bot Setup

First, we'll begin by going to the Discord Developer Portal, at https://discord.com/developers/applications.

You should see a page that looks something like this:

![](media\discord-dev-applications.jpg)

Create a new project by clicking on the blue button in the top right corner (**New Application**)

That should take you to the control panel for your new application. 

Switch to the **Add Bot** tab - the **General Information** tab is of no interest to us right now.

Create for yourself a new bot using the button on the right. (**Add Bot**) Next, give it a username & profile picture. There are Boing logos available [here](github.com/Tee1er/boing) if you'd like to use those, but of course, you can always upload your own, or even just leave it as it is right now.

Copy your token by clicking on the **Copy** button. Keep that safe somewhere, and make sure not to share it. You'll need it to set up Boing. (If you do share it by accident, scroll down to the Help section.)

![](media\discord-dev-bot.jpg)

You're almost done! Now, navigate to the **OAuth 2** tab. In this step, we're going to have your bot join a server. 

In the box **Scopes**, check off the permission **Bot**.

![](media\discord-dev-permissions.jpg)

Now, scroll down 'till you find **Bot Permissions**. Give your bot permission to send messages by checking that box (**Send Messages**), too. You're almost done!

Finally, scroll back up and copy the URL in the **Scopes** box. If you did everything right, it *should* look something like this, with numbers in place of the X's here, obviously.

```
https://discord.com/api/oauth2/authorize?client_id=XXXXXXXXXXXXXXXXXX&permissions=2048&scope=bot
```

Paste that URL into your web browser of choice, and follow the prompts to add Boing to your server. To do this, you need the **Manage Server** permission. 

You are now finished with Part 1 of installation 🎉.

#### Boing Setup

In the last step, you created a bot and added it to a server. In this step, you'll bring that bot to life.

Open the folder that Boing is in, and move it somewhere safe.

Double-click `run.bat` , which should start Boing.

When you start Boing for the first time, you will be asked to answer some questions. 

- When you are asked to enter your token, that's the one we copied from Discord earlier, and that I asked you to save. Paste that in now.

  ```
  Please enter your bot's token. » YOUR-TOKEN-HERE
  ```

- For more information on Chat Relay & Service Mode, please see the [Features](#-features) section below. I highly encourage you to enable Service Mode - Chat Relay is up to you.

If you enabled Service Mode, you'll need to accept multiple prompts from your operating system in order to complete service installation.  There are a *lot*, but please accept all of them.

If you have **not** enabled Service Mode, start Boing by double-clicking `run.bat` again. This will open the Boing launcher, which should now run Boing. Try it out!

If you **have** enabled Service Mode, Boing should now be running in the background. In the future, then, `run.bat` will exit automatically. Verify this by opening Task Manager & checking the **Services** tab for `boingmdi.exe` or similar entry.

If you encounter any problems during this entire process, please consult the [help](#-help) section below, and/or file an issue in the GitHub Issues tab.

#### Network Setup

If you only plan to play with people in the same LAN as you, then you can stop here & skip this step. However, if you _do_ plan to play with others outside of your local network, you'll need to set up port forwarding. Now, this step will likely not be the same for every router. Look under "Administratior" or "Advanced Setup" headers, and consult your router's manufacturer's website if you haven't already.

The gist of it: forward **port 6567** to the local IP of the PC Boing is running on. Search up ["find my local IP"](https://www.google.com/search?q=find+my+local+IP) for guides on how to find that. After you've completed the previous step, others should now be able to find the IP of the server using the command `b ip`; they can enter that in under the **Join Game** tab in-game.


## Features

- **Service Mode:** Boing can run in the background as a service, staying off your taskbar and out of your way.
- **Chat Relay**: (Coming Soon) Messages sent in-game and in a specific channel will be relayed. Players in-game can chat with users in Discord, and vice-versa!
- **Enhanced Help**: By adding 'help' to the end of any command, you can access detailed help information.
- **Channel Blacklist**: Channels can be blacklisted, preventing users from using Boing in those channels. 
- **Automatic backups:** Boing takes backups automatically every 5 minutes, adding an extra safety net if you mess up. 
- **Map Library:** Store user-content server-side, and let users play those maps on-demand. 
  - The Map Library stores uploaded maps & loads them when desired. These maps can be deleted, renamed, etc. 
  - Maps are stored in `server/config/saves/boing-library`

## Commands

 A quick note: this README is liable to be outdated. This commands list was last updated on June 10th, 2021, with Boing 2.0. Therefore, the actual help command will likely provide for more up-to-date stuff.

 All of these examples assume you are using 'b' as the prefix. If this is not the case, then simply substitute the prefix you are using.


 - **help:** Provides information on available commands.

   > **b help**
   >
   > → Returns an embed with descriptions of available commands.


- **host:** Hosts a new map. Will select a random map if one is not given. 

  > **b host**
  > 
  > → Hosts a new map, randomly selected from the default maps. (see the 'maps' command for a list)
  > 
  > **b host Ancient_Caldera or b host ancient_caldera**
  > 
  > → Hosts the map "Ancient_Caldera". Map names are not case-sensitive, both "Ancient_Caldera" and "ancient_caldera" would work.

- **pause/unpause**: Pauses or unpauses the game. This stops all player movement, as well as conveyor belts, production, etc.

  > **b pause**
  >
  > → Pauses the game.
  >
  > **b unpause**
  >
  > → Unpauses the game

- **stop:** Stops hosting the map. Players will not be able to join.

  > b stop
  >
  > → Stops hosting the map.

- **export:** Posts the currently hosted map on Discord as an attachment in .msav format. You can specify a name - if you don't, then Boing will generate one automatically. No spaces are allowed in the name - try substituting underscores (_) or dashes (-) instead. 

  > **b export**
  >
  > →  Exports the map to Discord as an .msav, with a random name. 
  >
  > **b export my_save**
  >
  > →  Exports the map to Discord as my_save.msav

- **import:** When used with a file attached to the message, and if the game is stopped (use `b stop`), 'import' will host the save attached to the message. Saves must be in .msav format, and cannot be image files.

  > **b import**
  >
  > →  If a .msav file is attached, will host that save

- **maps:** Displays a list of the default maps. Use 'library' to view the contents of the Map Library. These are the exact same maps you'd see when creating a new Custom Game.

  > **b maps**
  >
  > →  Displays a list of the default maps.

- **library:** Shows the maps in the Map Library. For more information on the Map Library, please see the Features section, above. 

  > **b library**
  >
  > → Returns an embed w/ the list of content in the Map Library

- **add:** Allows you to *add* a map to the Map Library. Unlike most other commands in Boing, a name for the map is **required.** Using this is similar to 'import' - attach a file to your message. 'add' will happily overwrite existing maps if you aren't careful; therefore, please exercise caution.

  > **b add my_map**
  >
  > → Adds this map to the Map Library, under the name my_map. (assuming a file was attached)

- **load:** Hosts a map from the Map Library, using its case-sensitive name. 

  > **b load my_map**
  >
  > → Loads `my_map` from the Map Library.

- **rename:** Renames a map from the Map Library. Accepts two arguments, the first being its current name, and the second being the new name.

  > **b rename my_map a_map**
  >
  > → Renames `my_map` to `a_map`. It will now show up in 'library' as `a_map` instead.

- **delete:** Permanently deletes a map from the Map Library. Accepts one argument, the name of the map.

  > **b delete a_map**
  >
  > → Deletes `a_map`. It will no longer show up in the Library.

- **ip:** Returns the IP (Internet Protocol) address used to join the server. 'ip' uses www.ipify.org to get the address.

  > **b ip**
  >
  > → Returns the IP address of the server.
  
- **rollback**: Stops the server and loads the latest backup. Boing only stores a single save at a time, which currently persists until overwritten with a new one.

  > **b rollback**
  >
  > → Stops the server & loads the latest backup.

## Troubleshooting & Additional Information

##### I accidentally entered in wrong information.

Boing stores that information in a JSON file, which can be found under `boing/src/settings.json`. This file stores your preferences, including your token. Modifying the information in this file will modify Boing's settings. 

```json
{
    "token": "YOUR-TOKEN-HERE",
    "prefix": "b",
    "chatChannel": "chat",
    "serviceMode": false
}
```

If you don't have Service Mode on, then simply change this information and start Boing up again using `run.bat`. If you do, its a little bit more tricky, but still doable. 



Change the information & save the file. Now, open the Task Manager (you can use the Windows Search bar), and switch to the **Services** tab. 

Scroll down till you find an entry that similar to this:

| Name         | PID  | Description | Status  |
| ------------ | ---- | ----------- | ------- |
| boingmdi.exe | 1234 | BoingMDI    | Running |

Right click, and then select **Restart.** Now, when the service finishes restarting, you should find yourself with something that works more like expected.

##### **The service installation failed for some reason. Now Boing won't work in Service Mode anymore.**

Because Service Mode installs the service right after setup, if anything goes wrong during that time, you need to setup Boing again. This can be a little bit of a pain, and is on the roadmap for v2.1. 

Boing detects whether or not setup has occurred by checking for keys in the JSON. In practice, that means that simply deleting all of those pairs will allow you to enter setup mode again. If you just need to change some information, see above. 

To reinstall the service, delete the entire file, but leave the enclosing curly brackets. Those need to stay, other Boing will throw an error.

Your `settings.json` should look like this:

```json
{}
```

Now, if you start the launcher again, after being prompted for setup, Service Mode will activate and install the service, hopefully correctly this time.

**How do I setup the channel blacklist feature?**

The channel blacklist is not included in the setup wizard currently - therefore, you'll need to use a text editor to manually add those in. In the `src/settings.json` config file, you should find yourself with a couple key-value pairs. At the end, add the key `channelBlacklist` (with double quotes around it), and then two square brackets. Between these brackets, you should add the channel names you wish to blacklist, again, surrounded w/ double quotes & with commas separating each entry.

****

## Roadmap

Currently, Boing is on **Version 2.0**, which rewrote a lot of the underlying code. 

**Version 2.0**

- [x] Automatic deletion of imported & exported saves.
- [x] Boing launcher.
- [x] Service Mode. (Windows *only*)
- [x] Easy setup.
- [x] In-depth help commands.
- [x] Map Library
- [x] New command handler.
- [x] Better README
- [ ] ~~Chat Relay, w/ streams.~~



**Version 2.1** 

- [x] Autosaving.
- [x] Rich presence statuses to show when Boing is online?



**Version 2.2** 

- [ ] ~~Add a web admin dashboard?~~ 
- [x] Role permissions, so only authorized users can use certain commands. 
- [ ] Ban, pardon, and kick commands, for administrators only.
- [ ] Mechanism so that users can change settings *after* setup. (probably ties into some sort of Discord-based admin system, replacing the web-based one.)
- [x] Server auto-updating
- [ ] Upgraded Chat Relay w/ webhooks. 
- [ ] Upgraded autosave / backup system allowing rollback of multiple saves.


**Version 2.3**

- [ ] Rewrite portions of codebase to allow for hosting of multiple server instances.
- [ ] Find a better way of making Boing a service / run in background.
- [ ] A tray utility would be *nice* but isn't really necessary. If we have time.
