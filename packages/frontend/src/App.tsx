import { useEffect, useState } from 'react'
import { greet, type ApiResponse } from 'shared'

function App() {
  const [data, setData] = useState<ApiResponse<string> | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{greet('ESM Frontend')}</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default App
