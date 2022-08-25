# DUNGEON CARDS GAME

This is an adaptation of android game [Dungeon cards](https://play.google.com/store/apps/details?id=com.The717pixels.DungeonCards&hl=ru&gl=US) and implementation of autoplay algorithm.

Here you play as a brave knight fighting against monsters. You can walk horizontally and vertically only to the closest cards.
If you tap on a monster, you will lose as much hp as the monster has.
If you tap on a health potion, you will recieve as much hp as the potion has.
You must keep your health above 0 or you will lose!

You can press `Enable auto play` button to make computer play instead of you and then press again to disable algorithm

![image](https://res.cloudinary.com/dkfwehxio/image/upload/v1640197618/Screenshot_2021-12-22_212625_vmwiqm.png)

You can try this game yourself in [application demo](https://blackpawsstudio.github.io/Dominoes-tech-challenge/)!

# SETUP and USAGE

The steps below will take you through cloning your own fork, installing dependencies and building:

1. Fork and/or clone this repository. To use Git from command line, see the [Setting up Git](https://help.github.com/articles/set-up-git/) and [Fork repo](https://help.github.com/articles/fork-a-repo/) articles.

```bash
git clone https://github.com/BlackPawsStudio/Dungeon-cards/
```

2. Open your copied repo folder in terminal and install necessary modules with command, make sure that you have installed [npm](https://www.npmjs.com/get-npm):

```bash
npm install
```

3. Now you are able to run or build the project:

To run the project write `npm run` in terminal and live development server will open.

Run `npm run build` to build the project. The build files will be stored in the `dist/` directory. 
You can go to the `dist/` directory and open `index.html` file to see the results.