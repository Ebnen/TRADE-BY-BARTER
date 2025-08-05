"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Send, MoreVertical, Phone, Video, Info } from "lucide-react"
import Link from "next/link"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40", online: true },
    lastMessage: "Great! When would be a good time to meet?",
    timestamp: "2 min ago",
    unread: 2,
    item: "MacBook Pro 2021",
    wantedItem: "Gaming PC",
  },
  {
    id: 2,
    user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40", online: false },
    lastMessage: "The bike is in excellent condition, here are more photos",
    timestamp: "1 hour ago",
    unread: 0,
    item: "Mountain Bike",
    wantedItem: "Road Bike",
  },
  {
    id: 3,
    user: { name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40", online: true },
    lastMessage: "I'm interested in your handbag!",
    timestamp: "3 hours ago",
    unread: 1,
    item: "Designer Handbag",
    wantedItem: "Jewelry",
  },
]

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "other",
    message: "Hi! I'm interested in your MacBook Pro. Is it still available?",
    timestamp: "10:30 AM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    sender: "me",
    message: "Yes, it's still available! I saw you have a gaming PC. Can you tell me more about the specs?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    message: "It's a custom build with RTX 4070, AMD Ryzen 7, 32GB RAM, and 1TB NVMe SSD. Built it last year.",
    timestamp: "10:35 AM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    sender: "me",
    message:
      "That sounds perfect! The MacBook has M1 Pro chip, 16GB RAM, 512GB storage. Barely used, still has warranty.",
    timestamp: "10:37 AM",
  },
  {
    id: 5,
    sender: "other",
    message: "Great! When would be a good time to meet?",
    timestamp: "10:40 AM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trade 🤝 Barter
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/discover" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Discover
              </Link>
              <Link href="/my-trades" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                My Trades
              </Link>
              <Link href="/messages" className="text-blue-600 font-medium">
                Messages
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/post">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Post Item
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Messages</h2>
                  <Badge variant="secondary">{mockConversations.length}</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation.id === conversation.id ? "bg-blue-50 border-r-2 border-blue-600" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{conversation.user.name}</p>
                            <div className="flex items-center space-x-1">
                              {conversation.unread > 0 && (
                                <Badge className="bg-blue-600 text-xs px-1.5 py-0.5">{conversation.unread}</Badge>
                              )}
                              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            {conversation.item} ↔ {conversation.wantedItem}
                          </p>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedConversation.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-gray-600">
                        Trading: {selectedConversation.item} ↔ {selectedConversation.wantedItem}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                        message.sender === "me" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      {message.sender === "other" && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
