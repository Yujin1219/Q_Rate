
import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import CreatePage from '../pages/create/page';
import SurveyPage from '../pages/survey/page';
import ResultsPage from '../pages/results/page';
import TemplatesPage from '../pages/templates/page';
import MyPage from '../pages/mypage/page';
import LoginPage from '../pages/login/page';
import SignupPage from '../pages/signup/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/create',
    element: <CreatePage />
  },
  {
    path: '/templates',
    element: <TemplatesPage />
  },
  {
    path: '/survey/:id',
    element: <SurveyPage />
  },
  {
    path: '/results/:id',
    element: <ResultsPage />
  },
  {
    path: '/mypage',
    element: <MyPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
