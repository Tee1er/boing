<h1 align="center">boing</h1>

<h3 align="center"><i>A Discord interface for the Mindustry game server.</i></h3>

- **Intuitive:** Boing is simple and easy to use, and you can access it from any machine, not just the one the server is running on.

- **Multiplayer:** Easily play together with friends --  no need to set up your own Dedicated Server.

- **Easy to install:** Almost anyone should be able to get Boing working, with little to no technical knowledge required.

- **Slash-commands:** Boing is now compatible with Discord's new slash commands system!
  
  Boing is an extra layer on top of the Mindustry Dedicated Server that allows you to control it remotely using a Discord bot. This enables you and your friends to play together much more easily.

****

#### Table of Contents

- [Getting Started](#getting-started)
  - [Bot Setup](#bot-setup)
  - [Boing Setup](#boing-setup)
  - [Network Setup](#network-setup)
- [Features](#features)
- [Commands](#commands)
- [Troubleshooting & Additional Information](#troubleshooting--additional-information)
  - [Fixing Incorrect Information](#fixing-incorrect-information)
  - [Administrator Permissions](#administrator-permissions)
  - ["config" and allowed settings](#"config"-and-allowed-settings)
- [Roadmap](#roadmap)

<hr>
Last updated for <b>v2.4</b> ⚙️
<hr>

## Getting Started

Installation of Boing should be relatively straightforward - the wrapper takes care of much, if anything technical and leaves you with a nice, pretty, Discord bot at the end. However, if anything goes wrong, please feel free to open a issue with the problem you're encountering.

Before we begin the actual setup, **please make sure you have both of the following installed:**

- Java JRE 8+
- Node.js 16.6+

> This README guide is tailored mostly towards Windows users. For those on Linux, see the link below.

Note that both will have to be added to PATH (check the box when installing) for Boing to work properly.

> **Linux users:** See guide [here.](docs/linux-install.md)

#### Bot Setup

First, we'll begin by going to the Discord Developer Portal, at <https://discord.com/developers/applications>.

Create a new project by clicking on the blue button in the top right corner (**New Application**)

That should take you to the control panel for your new application.

Switch to the **Add Bot** tab - the **General Information** tab is of no interest to us right now.

Create for yourself a new bot using the button on the right. (**Add Bot**) Next, give it a username & profile picture. There are Boing logos available [here](https://github.com/Tee1er/boing/tree/main/docs/media) if you'd like to use those, but of course, you can always upload your own, or even just leave it as the default.

Copy your token by clicking on the **Copy** button. Note that down somewhere. You'll need it to set up Boing. (If you do share it by accident, scroll down to the Help section.)

You're almost done! Now, navigate to the **OAuth 2** tab. In this step, we're going to have your bot join a server.

In the box **Scopes**, check off the permission **bot** & **application.commands**.

Finally, scroll back up and copy the URL in the **Generated URL** box.

Paste that URL into your web browser of choice, and follow the prompts to add Boing to your server. To do this, you need the **Manage Server** permission.

Finally, two more pieces of information we'll need to set up Boing later;

**Client ID**: Select the **OAuth2 > General**  tab and copy the Client ID, which should be a long number with around 20 digits.

**Guild (Server) ID**: Go to **User Settings > Advanced** in your Discord user settings & turn on **Developer Mode**. Then, find the server you want to
use Boing in, right-click, and copy the ID.

#### Boing Setup

In the last step, you created a bot and added it to a server. In this step, you'll bring that bot to life by connecting Boing.

First, select the latest release from the **Releases** sidebar. (as of writing, this is v2.1)
Download the file and extract it to where you'd like your Boing instance to go.

Open the folder that Boing is in, and move it somewhere safe.

Run `run.bat` (or `run.sh` if you are on a *NIX system), which should start Boing.

When you start Boing for the first time, you will be asked to provide some information.

- Note that the notifications channel is where Boing will send messages when users join, leave, and when a game ends.

- Administrator roles are required for use of the /modify-config command.

If you encounter any problems during this entire process, please consult the [help](#-help) section below, and/or file an issue in the GitHub Issues tab.

#### Network Setup

If you only plan to play with people in the same LAN as you, then you can stop here & skip this step. However, if you *do* plan to play with others outside of your local network, you'll need to set up port forwarding. Now, this step will likely not be the same for every router. Look under "Administratior" or "Advanced Setup" headers, and consult your router's manufacturer's website if you haven't already.

The gist of it: forward **port 6567** to the local IP of the PC Boing is running on. Search up ["find my local IP"](https://www.google.com/search?q=find+my+local+IP) for more on how to find that. After you've completed the previous step, others should now be able to find the IP of the server using the command `b ip`; they can enter that in under the **Join Game** tab in-game.

<hr>
You're now done with Boing installation! ✅
<hr>

#### Notes

As of version 2.3, Service Mode is no longer a part of Boing — its reliability and ease of setup left a lot to be desired. Instead, we recommend you try using one of these tools instead.

- [**nssm**](https://nssm.cc/download)
<br>
  NSSM is a pretty simple tool to create services on Windows; it's got a decent (if somewhat outdated) GUI and is really easy to use as long as you're comfortable working with a command line.

- **Task Scheduler**
<br>
  This is a surprisngly good choice for creating a service, and it's built into Windows which is a *huge* plus. The only reason it's not listed first is because, as far as I can tell:
  if you start programs using Task Scheduler they won't show up in Task Manager's Services tab. It's not a big deal — you'll know Boing is running if you can connect.
  
  Great if you're not as comfortable using the command line.

- [**sc**](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sc-create)
<br>
  Another command line tool, but this one is built into Windows Powershell. Not as simple as NSSM, which is why it's last on this list, but if you're willing to go through some docs,
  I'm sure it would work just as well.

Some other details — with all of these you'll need to provide a command to be run: you should start either `run.bat` or, alternatively, if that doesn't work: try `launcher.js`, which is located in the
`boing/src` folder.

## Troubleshooting & Additional Information

#### Fixing Incorrect Information

Boing stores that information in a JSON file, which can be found under `boing/data/settings.json`. This file stores your preferences, including your token. Modifying the information in this file will modify Boing's settings. If you are using a service for Boing you'll need to restart it for the changes to take effect.

```json
{
    "token": "YOUR-TOKEN-HERE",
    "prefix": "b",
    "chatChannel": "chat",
    "serviceMode": false

    ... 
}
```

Also of note: if you just want to redo all of the setup, you can reset it by deleting everything in the JSON file *except* for the enclosing two curly brackets. Your file should
look like this now:

```json
{}
```

#### Administrator Permissions

Boing 2.2 introduced the ability to set an *administrator role,* which gives users with those roles special permissions.
Currently the only command that takes advantage of this feature is `config`, but more might be come in the future.
People with administrator permissions have a significant amount of power over the server using `/modify-config`, which is why you might
want to edit the settings they can change.

#### "/modify-config" and allowed settings

As detailed in the prev. section, the `/modify-config` command lets you change server settings. Some of these might be things you don't want
people to be able to change, even administrators. In order to allow / disallow certain commands, we need to edit Boing's internal
settings file — `settings.json`, located under `data/settings.json`. Open it in your text editor of choice — preferably not
Notepad, but it'd work in a pinch.

You should see a key named `"exposedSettings"` and a long list of values in quotes after that. These are the allowed settings, and for
most the name should be more or less self explanatory.

To prevent usage of any of these settings, just remove it from the list. (including the comma following it)

#### Boing crashed - what do I do now?

Even though Boing as a whole is significantly more stable than before, it still does crash occasionally in edge cases, etc. It used to be
that if this happened you would basically lose your entire save, but with the new auto-backups feature this is no longer the case.
If it does crash, simply restart and type `b rollback` (or with your unique prefix) to use the last backup taken. At most you should lose a couple
minutes or so of progress.

#### Need help?

Submit an issue with the **help** label.

****

## Roadmap

Currently, Boing is on **Version 2.4**.

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
- [x] Upgraded autosave / backup system allowing rollback of multiple saves.
- [ ] Slash commands

**Version 2.3**

- [ ] ~~Rewrite portions of codebase to allow for hosting of multiple server instances. ( pushed back to 2.4 or possibly shelved )~~
- [ ] ~~Find a better way of making Boing a service / run in background.~~
- [ ] ~~A tray utility would be *nice* but isn't really necessary. If we have time.~~

**Version 2.4**

- See release notes.
