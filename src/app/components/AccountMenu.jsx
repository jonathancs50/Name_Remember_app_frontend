'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Trash, RefreshCw } from 'lucide-react'

export default function AccountMenu({ name, onLogout, onDeleteAccount, onUpdateAccount }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-lg font-semibold hover:underline focus:outline-none"
      >
        {name}
      </button>
      {isOpen && (
        <Card className="absolute mt-2 w-56 z-10">
          <CardContent className="p-4">
            <div className="space-y-2">
           
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={onDeleteAccount}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete account
              </Button>
              
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
