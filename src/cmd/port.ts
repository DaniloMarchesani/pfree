import type { Pid } from "../types";
import { Logger } from "../utils";

export const dryRunKillProcesses = (pids: Pid[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      pids.forEach(pid => { 
        Logger.info(`[Dry Run] Would kill process with PID: ${pid}`); });
      Logger.success(`[Dry Run] Successfully simulated killing processes: ${pids.join(', ')}`);
      resolve();
    } catch (error) {
      Logger.error(`[Dry Run] Failed to simulate killing processes: ${error}`);
      reject(error);
    }
  });
}

export const killProcesses = (pids: Pid[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      pids.forEach(pid => { 
        Logger.info(`Killing process with PID: ${pid}`);
        process.kill(pid); });
      Logger.success(`Successfully killed processes: ${pids.join(', ')}`);
      resolve();
    } catch (error) {
      Logger.error(`Failed to kill processes: ${error}`);
      reject(error);
    }
  });
}