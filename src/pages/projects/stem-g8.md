---
layout: ../../layouts/ProjectLayout.astro
title: How I Made My Stem-G8 Project
description: How I migrated my portfolio from having to manually edit config.ts
  and add blogs to using DecapCMS for editing, And Netlify Auth for
  authenthication.
technologies:
  - HTML
  - CSS
  - Teamwork
  - Svelte 5
  - JS
  - Python
  - Flask
  - Arduino
  - Sensors
link: www.rishimalnad.dev
---


# 1. How it worked
What we did was have a frontend written in Svelte 5. This would also be the orchestrator, taking in json of the heart heuristics, and then sending it as partial json along with the results of it's tests of the users itself. The backend would take in this partial json and sotre it into a json. Then we would compress and encrypt these reults using eXdupe, then zstd, then age using a public private key pair. only I would have access to the private key but we can ecnrypt it to the public key. we collected hundreds of test reults this way.

# 2. The issues we faced
We faced issues during the start of hwo toa rchitect somehting so complex as this. slowly, everything fell into place including heart heuristics, how we would process it, the role of the frontend and backend, and so on. we also faced numerous issues of sourcing the components. eventually, through hard work, we managed to build this project.

# 3. how the heart sensor worked
The heart sensor specifically was complex. after a few failed attempts, we eventually setlled on using an mpu6050 accelerometer, max30102 heart sensor, and using two arduinos. one would be the dumb pipe to the computer sending the data, and the other as a psu for the accelerometer, since arduinos were very cheap. once we got this working we had a python script that would analyze these results using ai and advanced algorithms then broadcast the results as json every 5 seconds on a port using http. the frontend would then ingest this every 5 seconds and send it wiht uuid as partial json updates to the backend.
