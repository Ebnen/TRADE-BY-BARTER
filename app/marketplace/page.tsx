"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Filter, 
  Play,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Upload,
  Video,
  Camera,
  Eye
} from "lucide-react"
import Link from "next/link"

// Mock data for discover items
const discoverItems = [
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
  }
]

// Mock data for finder requests
const finderRequests = [
  {
    id: 1,
    itemName: "MacBook Pro M3",
    description: "Looking for a MacBook Pro M3 14-inch in good condition. Preferably space gray or silver.",
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
  },
  {
    id: 2,
    itemName: "iPhone 15 Pro Max",
    description: "Need iPhone 15 Pro Max, 256GB or 512GB. Any color except Pink.",
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
  }
]

// Mock data for secondhand items
const secondhandItems = [
  {
    id: 1,
    user: { name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40", rating: 4.6, sales: 18 },
    item: "iPhone 14 Pro",
    price: 85000,
    originalPrice: 120000,
    location: "Lekki, Lagos",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Excellent condition iPhone 14 Pro, 256GB. No scratches, comes with original box and charger.",
    category: "Electronics",
    condition: "Excellent",
    timePosted: "1 hour ago",
    views: 124,
    likes: 15
  },
  {
    id: 2,
    user: { name: "Rachel Green", avatar: "/placeholder.svg?height=40&width=40", rating: 4.8, sales: 29 },
    item: "Gaming Chair",
    price: 45000,
    originalPrice: 65000,
    location: "Ikeja, Lagos",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Ergonomic gaming chair, barely used. Perfect for long gaming sessions or office work.",
    category: "Furniture",
    condition: "Very Good",
    timePosted: "3 hours ago",
    views: 89,
    likes: 12
  },
  {
    id: 3,
    user: { name: "Tom Wilson", avatar: "/placeholder.svg?height=40&width=40", rating: 4.7, sales: 22 },
    item: "Canon DSLR Camera",
    price: 125000,
    originalPrice: 180000,
    location: "Victoria Island, Lagos",
    videoThumbnail: "/placeholder.svg?height=300&width=400",
    description: "Canon EOS R5 with 24-70mm lens. Low shutter count, perfect for photography enthusiasts.",
    category: "Photography",
    condition: "Excellent",
    timePosted: "5 hours ago",
    views: 156,
    likes: 23
  }
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("discover")

  const categories = ["All", "Electronics", "Sports", "Fashion", "Music", "Home", "Furniture", "Photography"]

  // Filter functions for each tab
  const filteredDiscoverItems = discoverItems.filter((item) => {
    const matchesSearch = 
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.wantedItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredFinderRequests = finderRequests.filter((request) => {
    const matchesSearch = 
      request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || request.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredSecondhandItems = secondhandItems.filter((item) => {
    const matchesSearch = 
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Very Good": return "bg-blue-100 text-blue-800"
      case "Good": return "bg-yellow-100 text-yellow-800"
      case "Fair": return "bg-orange-100 text-orange-800"
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
              <img 
                src="/logo1.png" 
                alt="Trade & Barter Logo" 
                className="h-16 w-auto"
              />
              {/* <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent ">
                Trade 🤝 Barter
              </div> */}
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/marketplace" className="text-purple-600 font-medium">
                Marketplace
              </Link>
              <Link href="/messages" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Messages
              </Link>
              <Link href="/profile" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Profile
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/post">
                <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                  Post Item
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Trade, Find, and Buy - All in one place
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for items, services, or requests..."
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
                className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover" className="text-lg py-3">
              <TrendingUp className="h-5 w-5 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="finder" className="text-lg py-3">
              <Search className="h-5 w-5 mr-2" />
              Finder
            </TabsTrigger>
            <TabsTrigger value="secondhand" className="text-lg py-3">
              <DollarSign className="h-5 w-5 mr-2" />
              Secondhand
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab Content */}
          <TabsContent value="discover" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Trade Items</h2>
              <p className="text-slate-600">Exchange goods with other users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDiscoverItems.length > 0 ? (
                filteredDiscoverItems.map((post) => (
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
                      <Badge className="absolute top-2 left-2 bg-purple-600">{post.category}</Badge>
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
                        Wants: <span className="font-medium text-purple-600">{post.wantedItem}</span>
                      </p>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {post.location}
                        </div>
                        <span>{post.timePosted}</span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Finder Tab Content */}
          <TabsContent value="finder" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Find & Earn</h2>
              <p className="text-slate-600">Help people find what they need and earn money</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{filteredFinderRequests.length}</h3>
                  <p className="text-slate-600">Active Requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">₦{filteredFinderRequests.reduce((sum, req) => sum + req.payment, 0).toLocaleString()}</h3>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFinderRequests.length > 0 ? (
                filteredFinderRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{request.itemName}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{request.description}</p>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-slate-700">Reward:</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">₦{request.payment.toLocaleString()}</span>
                    </div>

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

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      I Can Find This
                    </Button>
                  </CardContent>
                </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No finder requests found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Secondhand Tab Content */}
          <TabsContent value="secondhand" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Secondhand Market</h2>
              <p className="text-slate-600">Buy and sell quality used items with 30-second video previews</p>
            </div>

            {/* Post Secondhand Item Button */}
            <div className="text-center mb-8">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4">
                <Video className="h-5 w-5 mr-2" />
                Post Secondhand Item
              </Button>
              <p className="text-sm text-slate-500 mt-2">Include a 30-second video to showcase your item</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSecondhandItems.length > 0 ? (
                filteredSecondhandItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={item.videoThumbnail || "/placeholder.svg"}
                      alt={item.item}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-2 text-white">
                        <Play className="h-8 w-8" />
                        <span className="text-sm">30s</span>
                      </div>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-green-600">{item.category}</Badge>
                    <Badge className={`absolute top-2 right-2 ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.user.name}</p>
                        <p className="text-xs text-gray-500">
                          ⭐ {item.user.rating} • {item.user.sales} sales
                        </p>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.item}</h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-green-600">₦{item.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">₦{item.originalPrice.toLocaleString()}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                      <span>{item.timePosted}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Buy Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No secondhand items found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

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