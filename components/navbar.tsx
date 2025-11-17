'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // 检查当前用户
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (loading) {
    // 显示加载状态的导航栏
    return (
      <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              <span className="font-semibold text-[13px] sm:text-[15px] tracking-tight">Gosure</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-6 sm:w-20 sm:h-8 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              <span className="font-semibold text-[13px] sm:text-[15px] tracking-tight">Gosure</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {!user ? (
              // 未登录状态
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium px-5 h-9 rounded-lg shadow-sm">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              // 已登录状态
              <div className="flex items-center gap-4">
                <span className="text-foreground text-sm max-w-[150px] truncate" title={user.email}>
                  {user.email}
                </span>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium px-5 h-9 rounded-lg shadow-sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}