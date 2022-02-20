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

**RHEL/Fedora/CentOS/others**
See the Fedora docs for information on installing Java. The dedicated server requires at least Java 8+. 

[https://docs.fedoraproject.org/en-US/quick-docs/installing-java/]()

### Boing Installation
Installing Boing is similar to on Windows — return to the [README](../README.md).

### Boing as a Service *(Debian only)*

**4.** For Linux, creating a service is relatively easy. This guide applies only to those with `systemd`, but that should be the vast majority of users.

On **Debian**:

Create a file called `boing.service` in `/etc/systemd/system`

    touch /etc/systemd/system

Paste in the following contents:

    [Unit]
    Description=BoingMDI
    After=network.target

    [Service]
    Type=simple
    ExecStart=/bin/bash /your/path/here
    Restart=on-failure

    [Install]
    WantedBy=default.target

Replace `/your/path/here` with the path to `run.sh` in your Boing installation.
Note that this needs to be an absolute path, not a relative one.

Now, edit the `run.sh` file.

Add the following line just below the shebang at the top (`#/bin/bash`) and
before the "`# Install node modules`" comment.

    cd /path/to/your/boing

Replace `path/to/your/boing` with the path to the directory where Boing is located (*not* the "boing" folder in which source is located, the one in which `run.sh`, the `README`, etc are located)

**5.** Finally, create your service.

Test the service first by running:

    sudo systemctl start boing

Confirm everything is working properly:

    systemctl status boing

If everything seems to be OK, then enable the service so it will automatically start.

    sudo systemctl enable boing

<hr>

You're now done with Boing installation! ✅ 






