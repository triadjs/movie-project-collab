# project-movie-app
[TriadJS group project movie app](https://project-movie-app.onrender.com/)


# Setup your development environment

## Setting up node

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

## Setting up .env file

1. Create a `.env` file in the root of the project
2. Copy the contents of `.env.example` to `.env`
3. Fill in the values in `.env` file

## Installing dependencies

```sh
$ npm install
```

## Running the app

```sh
$ npm start
```