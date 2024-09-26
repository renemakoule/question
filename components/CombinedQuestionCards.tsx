'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, CheckCircle } from "lucide-react"
import Link from 'next/link'
import { RainbowButton } from "@/components/magicui/rainbow-button"

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAddingResponse, setIsAddingResponse] = useState(false)
  const [currentResponse, setCurrentResponse] = useState(0)
  const [question, setQuestion] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const questions = [
    "What's been your favorite trip of 2024 so far? ✈️",
    "Best book you've read this year? 📚",
    "Favorite new restaurant discovery? 🍽️",
    "Most exciting tech gadget you've tried? 🖥️"
  ]
  const responses = [
    "Paris was amazing!",
    "Loved my trip to Japan",
    "Backpacking through Europe",
    "Relaxing beach vacation in Bali"
  ]

  const placeholders = [
    "Enter your question here",
    "What would you like to know?",
    "Ask the content creator anything",
    "Your curiosity drives great content",
    "What's on your mind?",
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
    }, 3000) // Change placeholder every 3 seconds

    return () => clearInterval(intervalId)
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    setIsAddingResponse(false)
  }

  const toggleAddResponse = () => {
    setIsAddingResponse(!isAddingResponse)
    setIsExpanded(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      console.log('Submitted question:', question)
      setQuestion('')
      setShowConfirmation(true)
      setIsAddingResponse(false)
      
      setTimeout(() => setShowConfirmation(false), 3000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 p-4">
      <motion.div
        className="relative w-full max-w-md"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Background cards */}
        <motion.div
          className="absolute top-2 left-2 w-full h-full bg-white/30 rounded-3xl"
          animate={{ rotate: isExpanded || isAddingResponse ? 4 : 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        ></motion.div>
        <motion.div
          className="absolute top-1 left-1 w-full h-full bg-white/60 rounded-3xl"
          animate={{ rotate: isExpanded || isAddingResponse ? -2 : -1 }}
          transition={{ type: "spring", stiffness: 300 }}
        ></motion.div>
        
        {/* Main card */}
        <Card className="relative bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-center">{questions[0]}</h2>
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 -ml-4 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 -ml-4 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500">+633</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 mr-2"
              onClick={toggleExpand}
            >
              {isExpanded ? "Hide responses" : "Show responses"}
            </Button>
            <Button
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 ml-2"
              onClick={toggleAddResponse}
            >
              Add response
            </Button>
          </CardFooter>
          <div className='text-center mb-10 text-xs font-medium z-30'>
                  <Link href='https://minato-ai.vercel.app/'><u>Powered by Minato.ai</u></Link>
          </div>
        </Card>
        
        {/* Peeking responses */}
        <AnimatePresence>
          {!isExpanded && !isAddingResponse && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-between px-4 pb-2 text-white font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                className="text-sm truncate"
                key={currentResponse}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {responses[currentResponse]}
              </motion.span>
              <motion.span
                className="text-sm truncate"
                key={currentResponse + 1}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {responses[(currentResponse + 1) % responses.length]}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded responses */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 space-y-4 h-[280px] overflow-y-auto scrollbar-hide">
                <div className="fixed top-0 flex justify-between items-center space-x-48 z-10 bg-white">
                  <h3 className="text-xl font-bold">Recent Questions</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpand}
                    className="rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                {questions.map((question, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="font-medium">{question}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {responses[index % responses.length]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add response form */}
        <AnimatePresence>
          {isAddingResponse && (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-rose-100 via-pink-100 to-violet-200 h-[280px] shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/argents.gif" alt="Content Creator" />
                        <AvatarFallback>CC</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xs font-semibold">Minato.ai</CardTitle>
                        <CardDescription className='font-bold text-dark'>Submit your questions</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleAddResponse}
                      className="rounded-full"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input 
                        type="text" 
                        placeholder={placeholders[placeholderIndex]} 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                  <RainbowButton onClick={handleSubmit} type='submit'>Submit</RainbowButton>
                </CardFooter>
                <div className='text-center mb-1 text-xs font-medium'>
                  <Link href='https://minato-ai.vercel.app/'><u>Powered by Minato.ai</u></Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation message */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-green-50 border-green-200">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <p className="text-lg font-semibold">Question submitted successfully!</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
