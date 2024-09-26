'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Link from 'next/link'

export default function Component() {
    const [question, setQuestion] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
  
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
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (question.trim()) {
        console.log('Submitted question:', question)
        setQuestion('')
        setShowConfirmation(true)
        
        setTimeout(() => setShowConfirmation(false), 3000)
      }
    }
  

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className="space-y-4 w-full max-w-md mx-4">
      <Card className="bg-gradient-to-br from-rose-100 via-pink-100 to-violet-200 shadow-lg">
      <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/argents.gif" alt="Content Creator" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xs font-semibold">Minato.ai</CardTitle>
              <CardDescription className='font-bold text-dark'>Submit your questions for the content creator</CardDescription>
            </div>
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
        <div className='text-center mb-1 text-xs font-medium'><Link href='https://minato-ai.vercel.app/'>Powered by Minato.ai</Link></div>
      </Card>

      {showConfirmation && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <p className="text-lg font-semibold">Question submitted successfully!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </div>
  )
}