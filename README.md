# simple2d
Simple 2D Game Engine in JavaScript, operating with a rectangular logic for very lightweight applications

!!! This is a working work in progress !!!

The goal of this project was purely educational, relying as little as possible on outside resources but instead, 
thinking about the problems and working towards solutions as opposed to just googling them (although there's nothing wrong with that). 

# Getting Started
The following instructions should allow you to stand up the working demo and interact with the engine:

1. clone the repo
2. run npm install
3. check package.json to see the included commands
4. run npm run build
   (if you don't understand the error or how to read scripts)
    > run npm run build 
    (again)
5. nodemon is what is used to host you can invoke by running: npm run watch
6. you should be able to go to "localhost:3000/home"

# Default Controls
W, A, S, D to move
Arrow Keys to "look" (red square will change direction); 

Blocks will turn blue to indicate which ones are being checked for collision

# Contributing
Please do so only for your own practice and understand we aren't necessarily trying to create something 
others will rely on, if that's your goal, fork away!

Oh you're still interested? Well...
## Branching Strategy
TL;DR: Branch from the "develop" branch, you're branch should be either a "feature/...", "bugfix/...", or "refactor/..."

The main branch should stay as clean and functional. 