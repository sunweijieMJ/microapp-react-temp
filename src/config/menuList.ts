import type { MicroAppName } from './microApps';

export type MenuList = {
  name: keyof typeof MicroAppName;
  title: string;
  routeName: string;
  routePath: string;
  children: MenuList[];
};

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

export default menuList;
