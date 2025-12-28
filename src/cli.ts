#!/usr/bin/env node

import { program } from 'commander';
import type { Port } from './types';
import { dryRunKillProcesses, killProcesses } from './cmd';
import { getPidsList } from './lib';
import { Logger } from './utils';
import { input } from '@inquirer/prompts';

program
  .name('pfree')
  .description('A CLI tool for clear running processes and freeing up system resources.')
  .version(process.env.npm_package_version || '0.1.0-alpha', '-v, --version', 'output the current version')
  .argument('[port]', 'Port number to clear processes from')
  .option('-d, --dry-run', 'Simulate the process clearing without making any changes')
  .action(async (port, options) => {

    if (!port) {
      port = await input({ 
        message: 'Enter the port number:',
        validate: (value) => {
          if (!value || isNaN(Number(value))) {
            Logger.error('Please provide a valid port number.');
            process.exit(1);
          }
          return true;
        }
      });
    }
    
    const pids = await getPidsList(port as Port);
    const dryRun = options.dryRun || false;

    if (dryRun) {
      await dryRunKillProcesses(pids);
      process.exit(0);
    }
    
    Logger.info(`Clearing processes on port: ${port}`);
    await killProcesses(pids);
    process.exit(0);
  });

program.parse(process.argv);