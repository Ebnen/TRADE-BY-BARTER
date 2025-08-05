"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, MessageCircle, Heart, Filter, Play } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40", rating: 4.8, trades: 23 },
    item: "MacBook Pro 2021",
    wantedItem: "Gaming PC",
    location: "2.3 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Excellent condition MacBook Pro, barely used. Perfect for students or professionals.",
    category: "Electronics",
    timePosted: "2 hours ago",
  },
  {
    id: 2,
    user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40", rating: 4.9, trades: 45 },
    item: "Mountain Bike",
    wantedItem: "Road Bike",
    location: "1.8 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Trek mountain bike in great condition. Looking to switch to road cycling.",
    category: "Sports",
    timePosted: "4 hours ago",
  },
  {
    id: 3,
    user: { name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40", rating: 4.7, trades: 12 },
    item: "Designer Handbag",
    wantedItem: "Jewelry",
    location: "3.1 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Authentic Louis Vuitton bag, used only a few times. Looking for gold jewelry.",
    category: "Fashion",
    timePosted: "6 hours ago",
  },
  {
    id: 4,
    user: { name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", rating: 5.0, trades: 67 },
    item: "Guitar Amplifier",
    wantedItem: "Electric Guitar",
    location: "0.9 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Marshall amp in perfect working condition. Want to trade for a quality electric guitar.",
    category: "Music",
    timePosted: "8 hours ago",
  },
  {
    id: 5,
    user: { name: "Lisa Rodriguez", avatar: "/placeholder.svg?height=40&width=40", rating: 4.6, trades: 18 },
    item: "Coffee Machine",
    wantedItem: "Blender",
    location: "2.7 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "High-end espresso machine, barely used. Looking for a high-power blender.",
    category: "Home",
    timePosted: "12 hours ago",
  },
  {
    id: 6,
    user: { name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40", rating: 4.8, trades: 31 },
    item: "Gaming Chair",
    wantedItem: "Standing Desk",
    location: "1.5 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Ergonomic gaming chair in excellent condition. Want to switch to a standing desk setup.",
    category: "Furniture",
    timePosted: "1 day ago",
  },
  {
    id: 7,
    user: { name: "Rachel Green", avatar: "/placeholder.svg?height=40&width=40", rating: 4.9, trades: 29 },
    item: "Camera Lens",
    wantedItem: "Tripod",
    location: "4.2 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Canon 50mm lens in mint condition. Looking for a professional tripod.",
    category: "Photography",
    timePosted: "1 day ago",
  },
  {
    id: 8,
    user: { name: "Tom Anderson", avatar: "/placeholder.svg?height=40&width=40", rating: 4.7, trades: 22 },
    item: "Skateboard",
    wantedItem: "Longboard",
    location: "3.8 miles away",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Custom skateboard with premium wheels. Want to try longboarding instead.",
    category: "Sports",
    timePosted: "2 days ago",
  },
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [posts, setPosts] = useState(mockPosts)

  const categories = ["All", "Electronics", "Sports", "Fashion", "Music", "Home", "Furniture", "Photography"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.wantedItem.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              <Link href="/discover" className="text-blue-600 font-medium">
                Discover
              </Link>
              <Link href="/my-trades" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                My Trades
              </Link>
              <Link href="/messages" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
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
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for items or what you want..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-transparent">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={post.videoThumbnail || "/placeholder.svg"}
                  alt={post.item}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <Badge className="absolute top-2 left-2 bg-blue-600">{post.category}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{post.user.name}</p>
                    <p className="text-xs text-gray-500">
                      ⭐ {post.user.rating} • {post.user.trades} trades
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 truncate">{post.item}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Wants: <span className="font-medium text-blue-600">{post.wantedItem}</span>
                </p>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {post.location}
                  </div>
                  <span>{post.timePosted}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  )
}
