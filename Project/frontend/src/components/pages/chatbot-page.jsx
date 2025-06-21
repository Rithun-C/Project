"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Bot, User, BookOpen, Calculator, TestTube, FileText, Lightbulb } from "lucide-react"


const quickSuggestions = [
  {
    icon: BookOpen,
    title: "Study Help",
    description: "Get help with course materials",
    prompt: "Can you help me understand calculus derivatives?",
  },
  {
    icon: Calculator,
    title: "Math Problems",
    description: "Solve mathematical equations",
    prompt: "Help me solve this integration problem",
  },
  {
    icon: TestTube,
    title: "Test Preparation",
    description: "Prepare for upcoming exams",
    prompt: "How should I prepare for my physics midterm?",
  },
  {
    icon: FileText,
    title: "Assignment Help",
    description: "Get guidance on assignments",
    prompt: "I need help structuring my chemistry lab report",
  },
]

const sampleConversation= [
  {
    id: 1,
    content: "Hello! I'm your AI study assistant. How can I help you with your studies today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: 2,
    content: "I'm having trouble understanding integration by parts in calculus",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: 3,
    content:
      "I'd be happy to help you with integration by parts! This is a fundamental technique in calculus.\n\nThe formula is: ∫u dv = uv - ∫v du\n\nHere's how to approach it:\n1. Choose which part to be 'u' and which to be 'dv'\n2. Find du and v\n3. Apply the formula\n4. Solve the remaining integral\n\nWould you like me to work through a specific example?",
    sender: "bot",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: 4,
    content: "Yes, can you show me how to solve ∫x·e^x dx?",
    sender: "user",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: 5,
    content:
      "Perfect example! Let's solve ∫x·e^x dx step by step:\n\n**Step 1:** Choose u and dv\n- Let u = x (polynomial, gets simpler when differentiated)\n- Let dv = e^x dx (exponential, stays manageable)\n\n**Step 2:** Find du and v\n- du = dx\n- v = e^x\n\n**Step 3:** Apply the formula\n∫x·e^x dx = x·e^x - ∫e^x dx\n\n**Step 4:** Solve the remaining integral\n= x·e^x - e^x + C\n= e^x(x - 1) + C\n\nThat's your final answer! The key is choosing u and dv wisely. Try the LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
    sender: "bot",
    timestamp: new Date(Date.now() - 60000),
  },
]

export function ChatbotPage() {
  const [messages, setMessages] = useState(sampleConversation)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content) => {
    if (!content.trim()) return

    const userMessage = {
      id: messages.length + 1,
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        content: generateBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("assignment") || input.includes("homework")) {
      return "I can help you with your assignments! Could you tell me which subject and what specific part you're struggling with? I can provide guidance on structure, research methods, or specific concepts."
    }

    if (input.includes("test") || input.includes("exam") || input.includes("midterm")) {
      return "Test preparation is crucial for success! Here are some effective strategies:\n\n1. **Review your notes** systematically\n2. **Practice problems** similar to what will be on the test\n3. **Create a study schedule** leading up to the exam\n4. **Form study groups** with classmates\n5. **Get enough sleep** before the test\n\nWhich subject is your upcoming test in? I can provide more specific study tips!"
    }

    if (input.includes("math") || input.includes("calculus") || input.includes("algebra")) {
      return "Mathematics can be challenging, but with the right approach, it becomes much clearer! What specific math topic are you working on? I can help with:\n\n• Algebra and equations\n• Calculus (derivatives, integrals)\n• Geometry and trigonometry\n• Statistics and probability\n\nJust let me know what you'd like to explore!"
    }

    if (input.includes("physics")) {
      return "Physics is fascinating! It helps us understand how the world works. What physics concept are you studying? I can assist with:\n\n• Mechanics (motion, forces, energy)\n• Thermodynamics\n• Electricity and magnetism\n• Waves and optics\n• Modern physics\n\nFeel free to ask about specific problems or concepts!"
    }

    if (input.includes("chemistry")) {
      return "Chemistry is the study of matter and its interactions! What area of chemistry are you working on? I can help with:\n\n• Atomic structure and bonding\n• Chemical reactions and equations\n• Organic chemistry\n• Stoichiometry\n• Lab procedures and safety\n\nWhat specific topic would you like to explore?"
    }

    return "I'm here to help with your studies! I can assist with various subjects including mathematics, physics, chemistry, and more. I can also help with:\n\n• Explaining difficult concepts\n• Solving practice problems\n• Study strategies and tips\n• Assignment guidance\n• Test preparation\n\nWhat would you like to work on today?"
  }

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
        <p className="text-muted-foreground">Get instant help with your studies, assignments, and exam preparation</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
              <CardDescription>Ask questions about your coursework, get study tips, and more</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[80%] ${message.sender === "user" ? "order-first" : ""}`}>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">{formatTime(message.timestamp)}</p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your studies..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputMessage)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage(inputMessage)} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Quick Help
              </CardTitle>
              <CardDescription>Common study topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                >
                  <div className="flex items-start gap-3">
                    <suggestion.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                  <span>Explain complex concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                  <span>Solve math problems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                  <span>Study strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                  <span>Assignment guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                  <span>Test preparation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>💡 Break study sessions into 25-minute chunks</p>
                <p>📚 Review notes within 24 hours of class</p>
                <p>🎯 Set specific, achievable study goals</p>
                <p>👥 Form study groups with classmates</p>
                <p>🧠 Use active recall techniques</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
