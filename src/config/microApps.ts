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

export type MenuList = {
  name: keyof typeof MicroAppName;
  title: string;
  routeName: string;
  routePath: string;
  children: MenuList[];
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

export const menuList = [
  {
    name: 'micro-fp',
    title: 'fp',
    routeName: 'micro-fp',
    routePath: '/micro-fp',
    children: [],
  },
  {
    name: 'micro-opod',
    title: 'opod',
    routeName: 'micro-opod',
    routePath: '/micro-opod',
    children: [],
  },
];

export default microApps;
