import type { Pid, Port } from "../types";
import { spawn } from "child_process";
import { loadOSEnvironment, Logger } from "../utils";

export const getPidsList = async (port: Port): Promise<Pid[]> => {
  // Detect the operating system
  const os = loadOSEnvironment();

  switch (os) {
    case 'linux':
    case 'macos':
    case 'unix':
      return await launchLsof(port);
    case 'windows':
      return await launchNetstat(port);
    default:
      Logger.error(`Unsupported OS: ${os}`);
      process.exit(1);
  }
}

/**
 * Launch lsof command to get list of open process
 * Unix Os only
 */
export const launchLsof = (port: Port): Promise<Pid[]> => {
  return new Promise((resolve, reject) => {
    const lsof = spawn("lsof", ["-i", "-t", `:${port}`]);

      // Buffer to collect stdout data
      const stdoutChunks: Buffer[] = [];
      // Buffer to collect stderr data
      const stdErrChunks: Buffer[] = [];

      lsof.stdout.on("data", (chunk) => {
        stdoutChunks.push(chunk);
      });

      lsof.stderr.on("data", (chunk) => {
        stdErrChunks.push(chunk);
      });

      lsof.on('close', (code) => {
        if (code === 1) return Logger.warning(`No open processes found on port ${port}`), process.exit(0);
        
        if (code !== 0) {
          const errorMsg = Buffer.concat(stdErrChunks).toString() || `lsof process exited with code ${code}`;
          Logger.error(errorMsg);
          process.exit(1);
        }

        const pids = Buffer.concat(stdoutChunks)
          .toString()
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => parseInt(line, 10)); 

        resolve(pids);
      })
  });
}

//TODO: to test with windows env
/**
 * Launch netstat command to get list of open process
 * Windows Os only
 */
export const launchNetstat = (port: Port): Promise<Pid[]> => {
  return new Promise((resolve, reject) => {
    const netstat = spawn('cmd.exe', [
      '/c',
      `netstat -ano | findstr :${port}`
    ]);

    let stdoutChunks: string = '';
    let stdErrChunks: string = '';

    netstat.stdout.on('data', (chunk) => {
      stdoutChunks += chunk.toString();
    });

    netstat.stderr.on('data', (chunk) => {
      stdErrChunks += chunk.toString();
    });

    netstat.on('close', (code) => {
      if (code === 1) return Logger.info(`No open processes found on port ${port}`), resolve([]);

      if (code !== 0) {
        const errorMsg = stdErrChunks || `netstat process exited with code ${code}`;
        Logger.error(errorMsg);
        process.exit(1);
      }

      const pids = stdoutChunks
       .split('\n')
        .map(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid)) {
            return Number(pid);
          }
        }).filter(pid => pid !== undefined) as Pid[];
        
      resolve(pids);
  });
  });
}