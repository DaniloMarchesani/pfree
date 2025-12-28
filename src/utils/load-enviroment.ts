import * as os from 'os';

/**
 * This function detects the operating system type.
 * returns 'unix', 'macos', 'linux', 'windows', or 'unknown'.
 * @return {string} The detected operating system type.
 */
export function loadOSEnvironment(): 'unix' | 'macos' | 'linux' | 'windows' | 'unknown' {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      return 'macos';
    case 'linux':
      return 'linux';
    case 'win32':
      return 'windows';
    case 'freebsd':
    case 'openbsd':
    case 'sunos':
    case 'aix':
      return 'unix';
    default:
      return 'unknown';
  }
}