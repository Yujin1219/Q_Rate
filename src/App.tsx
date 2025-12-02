import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import ScrollToTop from './components/ScrollToTop'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    // 브라우저 스크롤 복원 비활성화
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App