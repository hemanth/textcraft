'use client'

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormalizationSettings } from '@/components/formalization-settings'
import { Loader2, Copy, Check, Moon, Sun } from 'lucide-react'
import { TEXT_STYLES, TextLength, TextStyle } from './types'
import { useToast } from "../hooks/use-toast"
import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { useTheme } from 'next-themes'

// Initialize Groq client
const groq = createGroq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!
})

export default function TextFormalizer() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<TextStyle>(TEXT_STYLES[0])
  const [tone, setTone] = useState(0.7)
  const [length, setLength] = useState<TextLength>('moderate')
  const [copied, setCopied] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleFormalize = async () => {
    if (!inputText.trim()) return
    
    setIsLoading(true)
    try {
      const prompt = `${selectedStyle.prompt}

Input text: "${inputText}"

Additional instructions:
- Maintain a formality level of ${tone * 100}%
- Keep the response ${length}
- Preserve the core message while improving clarity and professionalism
- Ensure proper grammar and punctuation
- Remove casual language and colloquialisms

Transformed version:`

      const { text: formalized } = await generateText({
        model: groq('mixtral-8x7b-32768'),
        prompt,
        temperature: 0.7,
        maxTokens: 1000,
      })

      setOutputText(formalized)
    } catch (error) {
      console.error('Transformation error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to transform text. Please try again.",
      })
    }
    setIsLoading(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleCopy = async () => {
    if (!outputText) return
    
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy text",
      })
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 flex justify-between items-center">
          <div className="flex-1" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            TextCraft
          </h1>
          <div className="flex-1 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-background/95">
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Enter your text here..." 
                  className="min-h-[200px] resize-none font-mono text-sm"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button 
                  onClick={handleFormalize} 
                  className="w-full font-medium"
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Transform Text'
                  )}
                </Button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Textarea 
                    readOnly 
                    placeholder="Transformed text will appear here..." 
                    className="min-h-[200px] resize-none font-mono text-sm"
                    value={outputText}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="absolute top-2 right-2 rounded-full"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <FormalizationSettings
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              tone={tone}
              setTone={setTone}
              length={length}
              setLength={setLength}
            />
          </CardContent>
        </Card>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Made with ❤️ by <a href="https://h3manth.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">h3manth.com</a></p>
        </footer>
      </div>
    </div>
  )
}

