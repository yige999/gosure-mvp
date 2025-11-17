'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestPage() {
  const [status, setStatus] = useState('Testing...')
  const supabase = createClient()

  useEffect(() => {
    async function test() {
      try {
        // 测试Supabase连接 - 查询系统表
        const { data, error } = await supabase.from('information_schema.tables').select('table_name').limit(1)

        if (error && error.message.includes('schema cache')) {
          // 这个错误说明连接成功，但表不存在，这正是我们期望的
          setStatus('✅ Supabase connected successfully!')
        } else if (error) {
          setStatus('❌ Error: ' + error.message)
        } else {
          setStatus('✅ Supabase connected successfully!')
        }
      } catch (err) {
        setStatus('❌ Error: ' + (err as Error).message)
      }
    }
    test()
  }, [])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Supabase Connection Test</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '2rem' }}>{status}</p>
    </div>
  )
}