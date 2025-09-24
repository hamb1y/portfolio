---
layout: ../../layouts/ProjectLayout.astro
title: Running Artificial Intelligence models locally on my laptop
description: How I ran powerful Artificial Intelligence models locally on my computer.
technologies: [
        "Artificial Intelligence",
        "Server/Administration",
        "Bash",
        "Ollama",
        "Python",
      ]
---
# Running Artificial Intelligence models locally on my laptop:
So, here's how I ran artificial intelligence models locally on my laptop. I wanted to see if I could have chatGPT with me even when I was offline. So I decided to research into running AI models locally on my computer. I found out that if your laptop/computer has a discrete GPU (My laptop does have one, though it is less powerful), you could easily run small Artificial Intelligence models locally on your computer. So, I decided to do just that and found an easy way to run models on your local computer, a CLI (Command Line Interface) tool called Ollama.

![An image of the Ollama Models page, which lists many downloadable AI models.](/localai-ollamahome.png)

- Step 1: I downloaded and installed Ollama on my linux laptop using the command `curl -fsSL https://ollama.com/install.sh | sh`. During installation, the script automatically enabled the Ollama daemon to start on startup, and configured a dual setup with my Nvidia GPU, AMD integrated GPU and octa-core AMD CPU.