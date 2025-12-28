import chalk from "chalk";

export class Logger {
  static info(message: string) {
    console.log(chalk.blue(message));
  }

  static success(message: string) {
    console.log(chalk.green(message));
  }

  static warning(message: string) {
    console.warn(chalk.yellow(message));
  }

  static error(message: string) {
    console.error(chalk.red(message));
  }

  static debug(message: string) {
    if (process.env.DEBUG) {
      console.log(chalk.magenta(`[DEBUG] ${message}`));
    }
  }
}