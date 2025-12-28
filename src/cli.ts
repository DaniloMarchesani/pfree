#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import type { Port } from './types';
import { dryRunKillProcesses, killProcesses } from './cmd';
import { getPidsList } from './lib';
import { Logger } from './utils';

program
  .name('pfree')
  .description('A CLI tool for clear running processes and freeing up system resources.')
  .version(process.env.npm_package_version || '0.1.0-alpha', '-v, --version', 'output the current version')
  .usage('<command> [options]');
 
  program.command('<port>', 'Clear processes running on the specified port')
    .option('-p, --port <number>', 'Specify the port number to clear processes from')
    .option('-d, --dry-run', 'Simulate the process clearing without making any changes')
    .action(async (...args) => {
      const options = program.opts();
      if (!options.port) {
        Logger.error('Please provide a port number using the -p or --port option.');
        process.exit(1);
      } 
      const { port }: { port: Port } = args[0];
      if (!port || isNaN(Number(port))) {
        Logger.error('Please provide a valid port number.');
        process.exit(1);
      }
      Logger.info(`Clearing processes on port: ${port}`); 
      // Implement the logic to clear processes on the specified port
      const pids = await getPidsList(port);
      const dryRun = options.dryRun || false;

      if (dryRun) {
        await dryRunKillProcesses(pids);
        process.exit(0);
      }
        await killProcesses(pids);
        process.exit(0);
    });

  program.parse(process.argv);