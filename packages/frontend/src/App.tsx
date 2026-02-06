import { useEffect, useState } from 'react'
import { greet, type ApiResponse } from 'shared'
import { Button } from "@/components/ui/button"

function App() {
  const [data, setData] = useState<ApiResponse<string> | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="gap-4 p-8 max-w-4xl mx-auto">
      <div className="flex justify-center">
        <Button className="!text-black !bg-gray-200 hover:!bg-blue-600 hover:!text-white" variant="default">Shard Button</Button> 
      </div>
      <h1 className="text-3xl font-bold mb-8">{greet('ESM Frontend')}</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default App
