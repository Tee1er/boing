<h1 align="center">boing</h1>

<h3 align="center">A Discord interface for the Mindustry game server .</h3>

- **Intuitive:** Boing is simple and easy to use, and you can access it from any machine, not just the one the server is running on.

- **Multiplayer:** Easily play together with friends --  no need to set up your own Dedicated Server.

- **Easy to install:** Almost anyone should be able to get Boing working, with little to no technical knowledge required.
  
  **What is Boing?**
  Boing is an extra layer on top of the Mindustry Dedicated Server that allows you to control it remotely using a Discord bot. This lets you and your friends play together much more easily.



**<u>For Windows only.</u>**



#### Table of Contents

- [Setup](#-getting-started)
  - [Bot Setup](#-bot-setup)
  - [Boing Setup](#-boing-setup)
- [Features](#-features)
- [Commands](#-commands)
- [Help & Troubleshooting](#-help)

# > Getting Started

Installation of Boing should be relatively straightforward - the wrapper takes care of much, if anything technical and leaves you with a nice, pretty, Discord bot at the end. However, if anything goes wrong, please feel free to open a issue with the problem you're encountering.

First, we'll begin by setting up the Discord bot. 

### > Bot Setup

First, we'll begin by going to the Discord Developer Portal, at https://discord.com/developers/applications.

You should see a page that looks something like this:

Create a new project by clicking on the blue button in the top right corner (**New Application**)

That should take you to the control panel for your new application. 

Switch to the **Add Bot** tab - the **General Information** tab is of no interest to us right now.

Create for yourself a new bot using the button on the right. (**Add Bot**) Next, give it a username & profile picture. There are Boing logos available [here](github.com/Tee1er/boing) if you'd like to use those, but of course, you can always upload your own, or even just leave it as it is right now.

Copy your token by clicking on the **Copy** button. Keep that safe somewhere, and make sure not to share it. You'll need it to set up Boing. (If you do share it by accident, scroll down to the F.A.Q. section for help.)

You're almost done! Now, navigate to the **OAuth 2** tab. In this step, we're going to have your bot join a server. 

In the box **Scopes**, check off the permission **Bot**.

Now, scroll down 'till you find **Bot Permissions**. Give your bot permission to send messages by checking that box, too. You're almost done!

Finally, scroll back up and copy the URL in the **Scopes** box. If you did everything right, it *should* look something like this, with numbers in place of the X's here, obviously.

    https://discord.com/api/oauth2/authorize?client_id=XXXXXXXXXXXXXXXXXX&permissions=2048&scope=bot

Paste that URL into your web browser of choice, and follow the prompts to add Boing to your server. To do this, you need the **Manage Server** permission. 

You are now finished with Part 1 of installation 🎉.

### > Boing Setup

In the last step, you created a bot and added it to a server. In this step, you'll bring that bot to life.

Open the folder that Boing is in, and move it somewhere safe.

Double-click `run.bat` , which should start Boing.

When you start Boing for the first time, you will be asked to answer some questions. 

- When you are asked to enter your token, that's the one we copied from Discord earlier, and that I asked you to save. Paste that in now.
- For more information on Chat Relay & Service Mode, please see the [Features](#-features) section below. I highly encourage you to enable Service Mode - Chat Relay is up to you.

If you enabled Service Mode, you'll need to accept multiple prompts from your operating system in order to complete service installation.  There are a *lot*, but please accept all of them.

If you have **not** enabled Service Mode, start Boing by double-clicking `run.bat` again. This will open the Boing launcher, which should now run Boing. Try it out!

If you **have** enabled Service Mode, Boing should now be running in the background. In the future, then, `run.bat` will exit automatically.

If you encounter any problems during this entire process, please consult the [help](#-help) section below, and/or file an issue in the GitHub Issues tab.



> # Features
> 
> - **Service Mode:** Boing can run in the background as a service, staying off your taskbar and out of your way.
> 
> - **Chat Relay**: (Coming Soon) Messages sent in-game and in a specific channel will be relayed. Players in-game can chat with users in Discord, and vice-versa!
> 
> - **Enhanced Help**: By adding 'help' to the end of any command, you can access detailed help information.
> 
> - **Map Library:** Store user-content server-side, and let users play those maps on-demand. 

> # Commands
> 
> A quick note: this README is liable to be outdated. This commands list was last updated on June 10th, 2021, with Boing 2.0. Therefore, the actual `help` command will likely provide for more up-to-date stuff.
> 
> 
> 
> All of these examples assume you are using 'b' as the prefix. If this is *not* the case, then simply substitute the prefix you *are* using.
> 
> 

> - **help:** Provides information on available commands.
>   
>   > b help
>   > 
>   > → Returns an embed with descriptions of available commands.
> 
> - **host:** Hosts a new map. Will select a random map if one is not given. 
>   
>   > b host
>   > 
>   > → Hosts a new map, randomly selected from the default maps. (see the 'maps' command for a list)
>   > 
>   > b host Ancient_Caldera **or** b host ancient_caldera
>   > 
>   > → Hosts the map "Ancient_Caldera". Map names are not case-sensitive, both "Ancient_Caldera" and "ancient_caldera" would work.
> 
> - **pause/unpause**: Pauses or unpauses the game. This stops all player movement, as well as conveyor belts, production, etc.
>   
>   > b pause
>   > 
>   > → Pauses the game.
>   > 
>   > b unpause
>   > 
>   > → Unpauses the game.


