export type Pid = number;
export type Port = number;

export interface ProcessInfo {
  pid: Pid;
  name: string;
  cpu: number;
  memory: number;
  port?: Port;
}

export interface KillOptions {
  dryRun?: boolean;
  force?: boolean;
}