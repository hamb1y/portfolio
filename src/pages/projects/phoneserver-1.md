---
layout: ../../layouts/ProjectLayout.astro
title: Converting my Grandmother's Old, Broken phone into a server
description: How I converted my grandmother's old and broken phone into a (almost) fully functioning server.
technologies: [
        "Web",
        "Linux",
        "Bash",
        "Android",
        "Server/Administration", 
      ]
link: https://project1.com
---

# Converting my Grandmother's Old, Broken phone into a server

So, around January of 2025 I gifted my grandmother a new phone, since her old one was laggy and it's touchscreen was broken However, the old phone worked perfectly fine so I decided to convert it to a linux server with Termux. Termux (not to be confused with terminal multiplexer tmux) is a linux terminal emulator built for android that allows you to use android tools such as nginx and java on an android phone through the CLI. So, here's how I converted my grandmother's phone to a webserver:

![Image of me connecting to the phone through ssh](/phoneserver-1.png)
 - Step 1: After getting the phone, I factory reset it and cleaned it as much as I could. After that, I installed the F-droid store and installed Shizuku, Canta and Termux. I started Shizuku by turning on developer mode and sending the adb command once connected to my computer. After that, Canta could remove most of the Samsung Bloat with Shizuku Access. I did that, then opened termux, installed dropbear and made a script to execute `dropbear -p 43000` so that I could connect to it through my laptop, thus making it much easier to configure and run.
 - Step 2: After connecting through ssh, I installed python, nodejs, git, nginx, neovim and figlet using the command `pkg update && pkg upgrade && pkg install python nodejs nvim git figlet nginx` (pkg is termux's package manager, based on apt). Then, I installed pnpm which is more disk and memory efficient using the command `npm install pnpm@latest --global`, which allowed me to use the pnpm command locally.
 - Step 3: After installing all the dependencies, I had 3 uses for the phoneserver.
    1. Host an FTP Server with some files
    2. Host 2 static astro.js sites
    3. Host the dynamic JNVCKM Site v2
 - Step 4: to do this, for the first one I asked Grok AI to build me a python webserver, then added some css to it and made a start script. To host the two astro.js sites, I did `cd && git clone https://github.com/hamb1y/portfolio && git clone https://github.com/hamb1y/orangesmp-website` to get both of these sites onto my server. Then I did `cd ~/portfolio && pnpm install && pnpm run astro build && pnpm run astro preview --host` to first go into the portfolio root directory, then install all the dependencies, then build the site, then run the site to test that it did in fact work. I did the same for both of the astro.js sites. Then, I made a startup script for both of those, which looks like this:
    1. Portfolio:

     `
        pkg update -y;
        pkg upgrade -y;
        pkg install git nodejs -y;
        npm install pnpm@latest --global;
        rm -rf ~/portfolio;
        git clone https://github.com/hamb1y/portfolio.git;
        cd ~/portfolio;
        pnpm install;
        pnpm run astro build;
        figlet "Server Started!";
        pnpm run astro preview --host;
     `
     
     2. OrangeSMP Website:

     `
        pkg update -y;
        pkg upgrade -y;
        pkg install git nodejs -y;
        npm install pnpm@latest --global;
        rm -rf ~/orangesmp-website;
        git clone https://github.com/hamb1y/orangesmp-website.git;
        cd ~/orangesmp-website;
        pnpm install;
        pnpm run astro build;
        figlet "Server Started!";
        pnpm run astro preview --host;
     `

 However, there are a few caveats which I found out later which made this almost uselss:
  - There's no root access, which makes everything much harder and different
  - It only support arm64 linux programs. While it's better than windows, many programs can't be used because of this.
  - **!IMPORTANT!** - Due to no root access, it becomes very difficult to port forward from here to the outside internet or a domain name. This made this phone almost entirely useless, and I had to find this out the hard way later.
