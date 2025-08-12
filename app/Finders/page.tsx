"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Users, TrendingUp, DollarSign, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock data for finder requests (items people need)
const finderRequests = [
  {
    id: 1,
    itemName: "MacBook Pro M3",
    description: "Looking for a MacBook Pro M3 14-inch in good condition. Preferably space gray or silver. Must have original charger and box.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 15000,
    category: "Electronics",
    location: "Victoria Island, Lagos",
    postedBy: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      completedFinds: 23
    },
    timePosted: "2 hours ago",
    urgency: "High",
    specifications: ["14-inch", "Space Gray/Silver", "Original Charger", "Box Included"]
  },
  {
    id: 2,
    itemName: "iPhone 15 Pro Max",
    description: "Need iPhone 15 Pro Max, 256GB or 512GB. Any color except Pink. Must be unlocked and in excellent condition.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 25000,
    category: "Electronics",
    location: "Ikeja, Lagos",
    postedBy: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      completedFinds: 31
    },
    timePosted: "4 hours ago",
    urgency: "Medium",
    specifications: ["256GB or 512GB", "Any color except Pink", "Unlocked", "Excellent condition"]
  },
  {
    id: 3,
    itemName: "Designer Handbag",
    description: "Looking for authentic Louis Vuitton or Chanel handbag. Preferably black or brown leather. Must come with authenticity certificate.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 8000,
    category: "Fashion",
    location: "Lekki, Lagos",
    postedBy: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      completedFinds: 18
    },
    timePosted: "6 hours ago",
    urgency: "Low",
    specifications: ["Louis Vuitton or Chanel", "Black or Brown Leather", "Authenticity Certificate", "Good Condition"]
  },
  {
    id: 4,
    itemName: "Gaming Chair",
    description: "Need an ergonomic gaming chair, preferably Secretlab or similar brand. Must have lumbar support and adjustable height.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 12000,
    category: "Furniture",
    location: "Abuja, FCT",
    postedBy: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      completedFinds: 12
    },
    timePosted: "8 hours ago",
    urgency: "Medium",
    specifications: ["Secretlab or similar", "Lumbar Support", "Adjustable Height", "Good Condition"]
  },
  {
    id: 5,
    itemName: "Canon DSLR Camera",
    description: "Looking for Canon EOS R5 or similar professional camera. Must include lens kit and camera bag. Low shutter count preferred.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 35000,
    category: "Photography",
    location: "Port Harcourt, Rivers",
    postedBy: {
      name: "Rachel Green",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      completedFinds: 27
    },
    timePosted: "12 hours ago",
    urgency: "High",
    specifications: ["Canon EOS R5 or similar", "Lens Kit Included", "Camera Bag", "Low Shutter Count"]
  },
  {
    id: 6,
    itemName: "Mountain Bike",
    description: "Need a quality mountain bike for weekend trails. Trek, Giant, or Specialized preferred. Size Large (19-21 inch frame).",
    imageUrl: "/placeholder.svg?height=200&width=300",
    payment: 18000,
    category: "Sports",
    location: "Kaduna, Kaduna",
    postedBy: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      completedFinds: 15
    },
    timePosted: "1 day ago",
    urgency: "Low",
    specifications: ["Trek/Giant/Specialized", "Size Large (19-21\")", "Good Condition", "Weekend Trail Ready"]
  }
]

export default function FindersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedUrgency, setSelectedUrgency] = useState("All")

  const categories = ["All", "Electronics", "Fashion", "Furniture", "Photography", "Sports", "Books", "Automotive"]
  const urgencyLevels = ["All", "High", "Medium", "Low"]

  const filteredRequests = finderRequests.filter((request) => {
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || request.category === selectedCategory
    const matchesUrgency = selectedUrgency === "All" || request.urgency === selectedUrgency
    return matchesSearch && matchesCategory && matchesUrgency
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Trade 🤝 Barter
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/discover" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Discover
              </Link>
              <Link href="/Finders" className="text-purple-600 font-medium">
                Finders
              </Link>
              <Link href="/messages" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Messages
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/post">
                <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                  Post Request
                </Button>
              </Link>
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Find & <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Earn</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Help people find what they need and earn money for your efforts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for items people need..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Category:</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Urgency:</p>
              <div className="flex flex-wrap gap-2">
                {urgencyLevels.map((urgency) => (
                  <Button
                    key={urgency}
                    variant={selectedUrgency === urgency ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedUrgency(urgency)}
                    className={selectedUrgency === urgency ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {urgency}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{finderRequests.length}</h3>
              <p className="text-slate-600">Active Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">₦{finderRequests.reduce((sum, req) => sum + req.payment, 0).toLocaleString()}</h3>
              <p className="text-slate-600">Total Rewards</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">24hrs</h3>
              <p className="text-slate-600">Avg Response Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Finder Requests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative">
                <img
                  src={request.imageUrl}
                  alt={request.itemName}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency} Priority
                </Badge>
                <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                  {request.category}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-4">
                {/* Item Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{request.itemName}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{request.description}</p>
                </div>

                {/* Payment */}
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-slate-700">Reward:</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">₦{request.payment.toLocaleString()}</span>
                </div>

                {/* Specifications */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Required Specs:</p>
                  <div className="flex flex-wrap gap-1">
                    {request.specifications.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {request.specifications.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{request.specifications.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Posted By */}
                <div className="flex items-center space-x-3 pt-2 border-t">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.postedBy.avatar} />
                    <AvatarFallback>{request.postedBy.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{request.postedBy.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{request.postedBy.rating}</span>
                      <span>•</span>
                      <span>{request.postedBy.completedFinds} finds</span>
                    </div>
                  </div>
                </div>

                {/* Location & Time */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{request.timePosted}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  I Can Find This
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Load More Requests
          </Button>
        </div>
      </div>
    </div>
  )
}