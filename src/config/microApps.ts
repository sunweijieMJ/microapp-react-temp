export enum MicroAppName {
  'micro-fp',
  'micro-opod',
}

export type MicroApp = {
  name: keyof typeof MicroAppName;
  activeRule: string | string[];
  container: string;
  entry: string;
  props?: any;
};

export const microApps: MicroApp[] = [
  {
    name: 'micro-fp',
    activeRule: ['/micro-fp'],
    container: '#micro-fp',
    entry: 'http://localhost:3001/',
  },
  {
    name: 'micro-opod',
    activeRule: ['/micro-opod'],
    container: '#micro-opod',
    entry: 'http://localhost:3002/',
  },
];

export default microApps;
