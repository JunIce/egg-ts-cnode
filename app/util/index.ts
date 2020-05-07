export const unixTime = (): number => Math.ceil(new Date().valueOf() / 1000);
export function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  // tslint:disable-next-line: forin
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}
