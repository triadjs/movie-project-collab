# project-movie-app
TriadJS group project movie app

## Table of Contents

- [Setup your development environment](#setup-your-development-environment)
    - [MacOS](#setting-up-node-on-macos)
    - [Windows](#setting-up-node-on-windows)
    - [Setting up .env file](#setting-up-env-file)
    - [Installing dependencies](#installing-dependencies)
    - [Running the app](#running-the-app)
- [Getting an API Key and Token](#getting-an-api-key-and-token)


# Setup your development environment

## Setting up node on MacOS

### Option 1: Using nvm

NVM is a version manager for node. It allows you to install multiple versions of node and switch between them.
It uses `.nvmrc` file to specify the version of node to use.

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. ```sh
   $ nvm install
   $ nvm use
    ```
3. Check your node version
    ```sh
    $ node -v
    ```

#### Troubleshooting MacOS

This is for newer Mac's that use zsh terminals (MacOS Catalina and up).

[watch this video for help](https://www.youtube.com/watch?v=S8ovFOnB4Sg&t=190s) starting at 3:10 mins to 6:53 mins

1. open a new terminal window (you should be in /Users/your-username directory) that is the default for a new terminal window. The reason for this is because that is where it is going to look for .zshrc file and also where it will put nvm.
    ```sh
    $ pwd
    ```
2. Run this command to see if you have a .zshrc file in your current directory.
    ```sh
    $ ls -al
    ```
3. Look to see if you have a .zshrc file is in the list. If you don't, then type the following command.
    ```sh
    $ touch .zshrc
    ```
4. Use the curl command on the [nvm](https://github.com/nvm-sh/nvm) page.
    ```sh
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
5. Make sure you do this step (it updates your .zshrc file).
    ```sh
    $ source ~/.zshrc
    ```
6. Open a terminal in your project folder (either in vs code or navigate a terminal to your project path) and run these 2 commands.
    ```sh
    $ nvm install
    $ nvm use
    ``` 
    the node version is in the `.nvmrc` and that is where it will pull it from.
7. Check your node version
    ```sh
    $ node -v
    ```

### Option 2: Using asdf

Asdf is a version manager for multiple languages. It allows you to install multiple versions of node and switch between them.
It uses plugins to manage different languages.  It uses `.tool-versions` file to specify the version of the language to use.

1. Install [asdf](https://asdf-vm.com/guide/getting-started.html)
2. Install [nodejs plugin for asdf](https://github.com/asdf-vm/asdf-nodejs/)
3. Install [asdf nodejs plugin](https://asdf-vm.com/guide/getting-started.html#_4-install-a-plugin) 
    ```sh
      $ brew install gpg gawk
      $ asdf plugin add nodejs
      $ asdf install
    ``` 
4. Check your node version
    ```sh
    $ node -v
    ```

## Setting up node on Windows

You don't have to use nvm. You can install node.js through the [node.js website](https://nodejs.org/en/download/prebuilt-installer) for the quickest easiest solution. However, if you plan to use node.js for different projects and you want to avoid issues with needing to use different versions of node then you would benefit from using nvm for windows.

1. Install [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. Scroll down until you see Install nvm-windows ["latest installer"](https://github.com/coreybutler/nvm-windows/releases)
3. download and install nvm-setup.exe
4. In cmd (this version of node is from the .nvmrc file in our project)
    ```sh
    nvm install 22.3.0 
    ```
5. Use that version of node
    ```sh
    nvm use 22.3.0
    ```
#### Troubleshooting Windows

[watch this video for help](https://www.youtube.com/watch?v=KW7_F-6Vsa8) 0:00 mins to 2:44 mins

1. Once nvm-windows is installed follow steps 4 and 5 above
2. If you watched the whole video the reason his nvm wouldn't install node at first is because you have to use either
    `xx.x.x` or `xx` so it would be either `22.3.0` or `22`

## Setting up .env file

1. Create a `.env` file in the root of the project
2. Copy the contents of `.env.example` to `.env`
3. Fill in the values in `.env` file
4. Don't forget to add your API Key and API Token to your `.env` file.

## Installing dependencies

```sh
$ npm install
```

## Running the app

```sh
$ npm start
```

## Getting an API Key and Token

We are using [themoviedb.org](themoviedb.org) API for our requests. Sadly they now require a lot of info about you before they give you an API key and token. They didn't use to and I didn't realize that until helping another person register their app. I do know they have had a lot of bad actors using their API so they had to do something. However, I still think they have the best movie and tv show API around. They are the go to source for a lot of other sites because of their vast amount of data and images.

1. Sign up for a basic account [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Verify your email address using a link they send you via email and then log in.
3. Go to the settings and then click api or use this link [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
4. Under Request an API Key use the "click here" link.
5. You have a choice between two options. Choose Developer. Click accept if you agree.
6. Type of Use select Website 
7. Application name is up to you
8. Application URL can be set to localhost:3000
9. Application summary has to be a short sentence or you will get an error
10. Fill out the rest of the form and click submit
11. You will be presented with your API Key and an API Read Access Token. Copy your API Key and Token to your local `.env` file. 
    - Side Note: Personally I recommend using the Token since it is used in all the examples. The Token also allows you to use v3 and v4 of the API and the API Key only lets you use v3. Basically the API key works through a query parameter in the URL and the Token works through setting a header in your URL request. I know people are at different knowledge levels that is why I included both.
12. That is it. You can find the API docs here [developer.themoviedb.org](https://developer.themoviedb.org/docs/getting-started) and endpoints here [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started).