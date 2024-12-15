'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import Image from "next/image"
import FancyButton from "./FancyButton"
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
            Transform Brief Encounters into Lasting Connections
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            MeetMinder helps you remember everyone you meet at social events,
            work functions, and gatherings.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Stop awkward moments of forgetting names. Start building meaningful
            relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <FancyButton /> */}
            <Button 
              variant="outline" 
              size="lg"
              className="group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Learn More
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full filter blur-3xl"></div>
          <Image
            src="/meetminder-removebg-preview.png"
            alt="People connecting"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl relative z-10"
          />
        </motion.div>
      </div>
    </section>
  )
}

