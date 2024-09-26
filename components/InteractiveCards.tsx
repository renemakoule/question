'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const [showAll, setShowAll] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const cards = [
    {
      id: 1,
      question: "What's been your favorite trip of 2024 so far? ✈️",
      date: "14 AUG AT 15:30",
      responses: 633,
    },
    {
      id: 2,
      question: "Best restaurant you've tried recently?",
      date: "13 AUG AT 12:45",
      responses: 521,
    },
    {
      id: 3,
      question: "What's your go-to weekend activity?",
      date: "12 AUG AT 09:15",
      responses: 789,
    },
  ]

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute w-80 bg-white rounded-3xl shadow-lg p-6 cursor-pointer"
            initial={{ scale: 1, rotate: index * 5, y: index * -10 }}
            animate={showAll ? { scale: 1, rotate: 0, y: index * 60 } : {}}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowAll(true)}
          >
            <div className="text-sm text-gray-500 mb-4">{card.date}</div>
            <h2 className="text-xl font-bold mb-4">{card.question}</h2>
            <div className="flex items-center mb-4">
              <div className="flex -space-x-2 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200"></div>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">+{card.responses}</span>
            </div>
            <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Add response
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}