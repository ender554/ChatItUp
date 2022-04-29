# ChatItUp

## full stack chat app for showing to ezoic

This read me will be notes on process.

I am normally a front-end dev so the backend was something I wanted to challenge myself with.

## Step one, set up github repo

standard github set up. This time done from GitHUb website and then cloned, will be mono repo front end and back

## Step 2: A simple back end

using express socketio (for communication) as wekk as cors and http
sockiot io Documentation https://socket.io/docs/v4/typescript/

installation via NPM lead to issues for express, re added via npm install -D @types/express

Basic back end existing will return after react app created

## Step 3: Created react app

used yarn create react-app ./ --template typescript

deleted unused files and template code from create react app

confirm app runs with yarn start

## Step 4: Connect front and back with socket io

Confirm data transfers from client to server
Set up basic join room send chat functions and confirm socket.io on server is recieving the information

## Step 5 Confirm socket.io not properly persisting move on to new tool

Upon research firebase better tool to habdle message back end and persistence
switch to firebase and create app with domain and apikey

## Step 6 Set up firebase project

Allow google sign in for user and set up fore store and api keys for back end hosting

## Step 7 Set up user auth

Create a project in firebase get data from
project and set firestore back end up

Make sure permissions in firestore allow for users to read and write

## Step 8 Deploy

deployed basic proof of concept to netlify

## Future

Would like to add image bubble, perhaps time stamp and improve style
