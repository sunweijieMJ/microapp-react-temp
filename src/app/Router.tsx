import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  RouteObject,
  useNavigate,
  useRoutes,
  useSearchParams,
} from 'react-router-dom';
import { Md5 } from 'ts-md5';
import LayoutSkeleton from '@/components/LayoutSkeleton';
import Loading from '@/components/Loading';
import StaticFunction from '@/components/StaticFunction';
import { triggerLoginAction } from '@/redux/actions/user';
import { globalConfigSelector } from '@/redux/selector/global';
import { advanceModeSelector } from '@/redux/selector/system';
import storage from '@/utils/storage';

const HomePage = lazy(() => import('@/pages/HomePage'));
const Setting = lazy(() => import('@/pages/Setting'));
const Login = lazy(() => import('@/pages/Login'));
const Layout = lazy(() => import('@/layout/LayoutMain'));

// 免密登录
const SecretFreeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const freeLoginFlag = searchParams.get('freeLogin');
  const targetUrl = searchParams.get('targetUrl');
  const isAuthenticated = storage('cookie').get('session_id');
  const globalConfig = useSelector(globalConfigSelector);

  useEffect(() => {
    if (!isAuthenticated && freeLoginFlag && globalConfig?.account) {
      dispatch(
        triggerLoginAction.request({
          navigate,
          targetUrl: targetUrl ?? '',
          name: globalConfig.account.username,
          password: Md5.hashStr(globalConfig.account.password),
        })
      );
    }
  }, [
    dispatch,
    navigate,
    isAuthenticated,
    freeLoginFlag,
    globalConfig?.account,
    targetUrl,
  ]);

  return null;
};

// 根据权限区分路由表
export const GetRoutes = () => {
  const [searchParams] = useSearchParams();
  const freeLoginFlag = searchParams.get('freeLogin');
  const queryString = searchParams.toString();
  const isAuthenticated = storage('cookie').get('session_id');
  const advanceMode = useSelector(advanceModeSelector);

  // 高级模式的设置页
  let AdvanceRoute: RouteObject[] = [];
  if (advanceMode) {
    AdvanceRoute = AdvanceRoute.concat({
      path: '/Setting',
      element: <Setting />,
    });
  }

  const unAnthroutes = useRoutes([
    {
      path: '/Login',
      element: <Login />,
    },
    freeLoginFlag
      ? {
          path: '*',
          element: <Loading />,
        }
      : {
          path: '*',
          element: <Navigate to={`/Login?${queryString}`} />,
        },
  ]);
  const authRoutes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/HomePage" />,
        },
        {
          path: '/HomePage',
          element: <HomePage />,
        },
        ...AdvanceRoute,
      ],
    },
    {
      path: '*',
      element: <Layout />,
    },
  ]);

  return isAuthenticated ? authRoutes : unAnthroutes;
};

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutSkeleton />}>
        <StaticFunction />
        <SecretFreeLogin />
        <GetRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
