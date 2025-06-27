"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Settings, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"

interface NavigationProps {
  className?: string
}

const navItems = [
  { href: "/", label: "Home", active: true },
  { href: "/books", label: "Books", active: false },
  { href: "/discover", label: "Discover", active: false },
  { href: "/rewind", label: "Rewind", active: false },
  { href: "/children", label: "Children", active: false },
]

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("bg-cream-dark border-b border-sage-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-charcoal font-yrsa">niley</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-charcoal",
                  item.active 
                    ? "text-charcoal border-b-2 border-sage-500" 
                    : "text-charcoal/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - User menu and mobile trigger */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=K" alt="User" />
                    <AvatarFallback className="bg-sage-100 text-charcoal">K</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Kayu</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      kayu@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 