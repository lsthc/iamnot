import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Generate from './pages/Generate'
import Viewer from './pages/Viewer'

function getQueryParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    page: params.get('page'),
    id: params.get('id')
  }
}

function App() {
  const [params, setParams] = useState(getQueryParams)

  useEffect(() => {
    // 초기 로드 시 파라미터 다시 확인
    setParams(getQueryParams())

    // popstate 이벤트 (뒤로가기/앞으로가기)
    const handlePopState = () => {
      setParams(getQueryParams())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 디버깅용 콘솔 로그
  console.log('Current URL:', window.location.href)
  console.log('Search params:', window.location.search)
  console.log('Parsed params:', params)

  const { page, id } = params

  // /?page=iamnot&id=0123 → Viewer
  // 또는 /?id=0123 → Viewer
  if (page === 'iamnot' || id !== null) {
    return <Viewer id={id} />
  }

  // /?page=generate → Generator
  if (page === 'generate') {
    return <Generate />
  }

  // / → Landing
  return <Landing />
}

export default App
