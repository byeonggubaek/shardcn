import { useState, useCallback } from "react"
import { useDebounce } from "use-debounce"
import { ChevronRight, Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"  // 또는 Next.js useRouter

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from "react"

interface NavSubItem {
  id: string
  title: string
  href: string
  description: string
}

interface WdogAutoInputProps {
  value?: string
  onValueChange?: (value: string, item?: NavSubItem) => void
  placeholder?: string
}

const WdogAutoInput = (
{
  value = "",
  onValueChange,
  placeholder = "검색..."
}: WdogAutoInputProps) => 
{
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(value)
  const [navItems, setNavItems] = useState<NavSubItem[]>([])
  const [loading, setLoading] = useState(false)
  const [debouncedValue] = useDebounce(searchValue, 300)

  const fetchNavItems = useCallback(async (query: string) => {
    if (query.length < 2) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/search_menus?title=${encodeURIComponent(query)}`)
      const data = await response.json()
      setNavItems(data.navItems)
      console.log("메뉴 검색 결과:", data.navItems)
    } catch (error) {
      console.error("메뉴 검색 실패:", error)
      setNavItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (debouncedValue) {
      fetchNavItems(debouncedValue)
    } else {
      setNavItems([])
    }
  }, [debouncedValue, fetchNavItems])

  const handleSelect = (item: NavSubItem) => {
    onValueChange?.(item.title, item)
    setSearchValue(item.title)
    setOpen(false)
    navigate(item.href)  // 자동 페이지 이동
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            className="flex h-12 w-full rounded-xl border border-input bg-background px-12 py-3 text-sm shadow-sm ring-offset-background 
                       placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                       disabled:opacity-50 transition-all hover:border-ring"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setOpen(true)}
          />
          {searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 p-0 hover:bg-accent"
              onClick={() => {
                setSearchValue("")
                onValueChange?.("", undefined)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-full p-0 max-h-96" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="메뉴 선택..."
            className="h-12"
          />
          <CommandEmpty>
            {loading ? (
              <div className="flex items-center gap-2 py-8">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                검색중...
              </div>
            ) : (
              `${searchValue} 관련 메뉴 없음`
            )}
          </CommandEmpty>
          <CommandGroup className="max-h-80 overflow-auto">
            {navItems.map((item) => (
              <CommandItem
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer px-4 py-3 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-linear-to-r from-muted to-accent rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {item.id.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-auto" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default WdogAutoInput;