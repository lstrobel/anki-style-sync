# anki-style-sync

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Automatically build and sync a CSS file with your Anki card template using Sass. An alternative to the [Anki Editor](https://marketplace.visualstudio.com/items?itemName=pedro-bronsveld.anki-editor) extension for VSCode.

I built this to allow me to write my Anki card styles in Sass and see the changes in real-time. If you just want to work in CSS, I recommend just using [Anki Editor](https://marketplace.visualstudio.com/items?itemName=pedro-bronsveld.anki-editor), which is a great extension.

## Installation

This project has the same add-on requirements as Anki Editor. You will need to install the following add-ons in Anki:

1. [AnkiConnect](https://ankiweb.net/shared/info/2055492159)
2. [Anki Preview Reloader](https://ankiweb.net/shared/info/571150035)

You will also need to install **Node.js** and **npm**.

Then, just clone and install:

```bash
git clone https://github.com/lstrobel/anki-style-sync.git
cd anki-style-sync
npm install
```

## Usage

You'll write your card style in the `src/style.scss` file.

When you want to sync this style to Anki, you'll first need to get the name of the model to update. You can get this from Anki, or run the following command to get a list of all models:

```bash
npm run list-models
```

Then, running the following command will watch for changes to the `src/style.scss` file and automatically build and sync the CSS to Anki:

```bash
npm run watch -- "<model name>"
```

BE WARNED: This will overwrite the existing CSS in Anki. If you have any custom styles in Anki, you will lose them. This tool does not back up your existing CSS.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear messages.
4. Push your changes to your fork.
5. Open a pull request with a description of your changes.

I welcome all contributions and appreciate your help in improving this project.
