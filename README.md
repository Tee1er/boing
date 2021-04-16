# boing

A Node.js wrapper for the *Mindustry* server, with a self-hosted Discord bot interface.

The bot is *almost* ready for use, but not quite. 

## Installation Instructions

Installation is a relatively simple process - you could finish it in about 10-15 minutes. Some technical knowledge is required, but no programming experience is necessary.

First, begin by downloading the Mindustry server jar file. The codebase comes bundled with one, but it might not be up to date, etc. After you've downloaded this, you can place it anywhere you'd like, but we reccomend the `server` folder. Just remember the path.

Next, set up your bot.

Go to the Discord Developer Portal, at discord.com/developers/applications. You'll want to click **New Application**, in the upper right. Give it whatever name you'd like. Select **Bot** from the tabs on the left, then click **Add Bot.** You'll want to copy your token by clicking **Copy**. Make sure to keep your token a secret.

Next, invite Boing to your Discord server of choice - you'll need certain permissions to do this, so it's best to either ask a server admin or to create your own.

Begin by selecting the **OAuth2** tab. You'll see a heading labeled **OAuth2 URL Generator.** Select 'bot' from the big list of checkboxes below; it's the 4th down in the second column from left. When it comes to General Permissions, just select "Administrator." (Technically, Boing only needs to be able to send & read messages to function, but this is just easier.) Copy that link and paste it into your web browser of choice; it should work on almost any.

A pretty standard Discord bot page should pop up. Just select your server from the drop-down below, and click **Continue,** then **Authorize.** You might have to do a CAPTCHA before it finally goes through, but otherwise - the Discord portion of setup is basically done!

Now, let's set up Boing's settings.

*settings.json*
```json
{
    "required" : {
        "serverPath": "C:\\Path\\To\\Server\\File",
        "prefix": "b",
        "token": "YOUR-TOKEN"
    },
    "optional" : {
        "chatChannel": "chat"
    }
}
```
For `serverPath`, paste in the path to your jarfile. Remember that in JSON, you'll want to use double backslashes.
Replace the token with the token you copied earlier - and remember, don't share it with others.

As for chatChannel - Boing comes with a chat relay feature that takes chat in a specific channel and relays it to the in-game Mindustry chat.

You can put the name of the channel you'd like to use for that in there at this point in setup.

Now, all you need to do is save the file, and double-click `run.bat`.










