# 🔓 pfree

A simple and powerful CLI tool to quickly free up ports by killing the processes using them.

## ✨ Features

- 🎯 Find and kill processes by port number
- 🖥️ Interactive process selection with `inquirer`
- 🎨 Beautiful terminal output with `chalk`
- ⚡ Fast and lightweight
- 🛡️ Safe: shows process details before killing

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g pfree
```

### Local Development

```bash
git clone https://github.com/your-username/pfree.git
cd pfree
npm install
npm run build
npm link
```

## 🚀 Usage

### Basic Usage

Free a specific port:

```bash
pfree 3000
```

### Interactive Mode

Run without arguments to enter interactive mode:

```bash
pfree
```

### Help

```bash
pfree --help
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/pfree.git
cd pfree

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm start
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the CLI in development mode
- `npm test` - Run tests (coming soon)

## 🏗️ Built With

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive prompts
- [Chalk](https://github.com/chalk/chalk) - Terminal styling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Danilo Marchesani**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/your-username/pfree/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by Danilo Marchesani
