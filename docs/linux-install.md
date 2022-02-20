# Installing on Raspi/Linux

This guide is intended to provide useful information for those installing Boing on Linux distributions.

### Prerequisites

**1.** This guide assumes you already have Linux installed on your computer. It's primarily intended for those on Debian-based Linux
distros, particularly using Raspberry Pi's, since those are a rather cheap way to run a Mindustry server that will be decently performant. 
However, most of the content here should be applicable to other distros, as well. 

> **1a.**
If you're installing on a Pi — and are using Raspberry Pi Imager, save yourself a headache and enable SSH and WiFi while you're at it. (click the gear icon!)

### Software Installation

For installing Boing, there are two pieces of software that Boing depends on — Java (for the Mindustry Dedicated Server), and Node.js. (for Boing itself) 

**2.** Begin by installing Node.js. There are a couple ways to do so, but this guide will cover the NodeSource PPAs in particular. `fnm` and `nvm` are also useful if you're using multiple Node version. Boing requires v16.6+. 

**Debian**

As root, enter these commands:

    curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
    apt-get install -y nodejs

**Ubuntu**

For users on Ubuntu:

    curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt-get install -y nodejs

**RHEL/Fedora/CentOS/others**

    curl -fsSL https://rpm.nodesource.com/setup_17.x | sudo bash -

Finally, to confirm, run:

    node --version


> **2a.** This installs Node v17; to install a more recent version (if it exists), consult the README located [here.](https://github.com/nodesource/distributions/blob/master/README.md)

**3.** Next, install Java. This is even simpler than Node (at least for those on Debian.)

**Debian & Ubuntu**

    sudo apt install default-jdk

**Fedora**

See the docs below for information on installing Java. The dedicated server requires at least Java 8+.

[https://docs.fedoraproject.org/en-US/quick-docs/installing-java/]()

**Others**

Consult documentation for your specific distro ("how to install Java on [MY DISTRO]")

### Boing Installation
Installing Boing is similar to on Windows — return to the [README](../README.md).

### Running in the Background

If you SSH into your instance of Linux, to keep it running after you disconnect, simply use

    nohup ./run.sh &

This will keep it from terminating the program after you close your session.

Using tools / daemons like systemctl, forever, nodemon, etc, are possible. However, there is an issue where Boing itself will be started, but the 
server either is not started or does not accept input. This is a known issue, but I'm not sure how to fix it. 

In any case, this seems to be pretty simple and works relatively well. You *will* have to manually restart Boing when/if it crashes, though. 

<hr>

You're now done with Boing installation! ✅ 






