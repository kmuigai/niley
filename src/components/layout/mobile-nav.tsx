"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu, Home, BookOpen, Compass, BarChart3, Users, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home, active: true },
  { href: "/books", label: "Books", icon: BookOpen, active: false },
  { href: "/discover", label: "Discover", icon: Compass, active: false },
  { href: "/rewind", label: "Rewind", icon: BarChart3, active: false },
  { href: "/children", label: "Children", icon: Users, active: false },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-bold font-yrsa text-charcoal">niley</DrawerTitle>
          <DrawerDescription>
            Navigate to different sections of your reading tracker
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          {/* Navigation Links */}
          <div className="grid gap-2 mb-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-sage-100 text-charcoal"
                      : "text-charcoal/70 hover:bg-sage-50 hover:text-charcoal"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
          
          {/* Divider */}
          <div className="border-t border-sage-200 mb-4" />
          
          {/* Settings and Logout */}
          <div className="grid gap-2">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-charcoal/70 transition-colors hover:bg-sage-50 hover:text-charcoal"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start rounded-lg px-3 py-3 text-sm font-medium text-charcoal/70 transition-colors hover:bg-sage-50 hover:text-charcoal h-auto"
              onClick={() => {
                setOpen(false)
                // Handle logout logic here
              }}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 