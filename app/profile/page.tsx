"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Star, 
  Calendar, 
  Edit, 
  ShoppingBag, 
  MessageCircle, 
  TrendingUp, 
  DollarSign,
  Eye,
  Heart,
  Settings
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  id: 1,
  name: "Sarah Chen",
  username: "@sarahchen",
  email: "sarah.chen@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=200&width=800",
  location: "Victoria Island, Lagos, Nigeria",
  joinDate: "March 2024",
  bio: "Passionate trader and tech enthusiast. Love finding great deals and helping others discover amazing items. Specializing in electronics and gadgets.",
  verified: true,
  stats: {
    completedTrades: 'Coming-soon',
    totalEarnings: 'Coming-Soon',
    itemsPosted: 13,
    itemsFound: "Cooming-Soon"
  },
  badges: ["Market-Novice",
"Market Professional",
    "Market Expert",
    "Market Master"
  ]
}

// Mock posted items
const postedItems = [
  {
    id: 1,
    title: "MacBook Pro M3 14-inch",
    description: "Excellent condition MacBook Pro, barely used...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Electronics",
    status: "Active",
    wantedItem: "Gaming PC",
    views: 245,
    likes: 23,
    timePosted: "2 days ago"
  },
  {
    id: 2,
    title: "Designer Handbag Collection",
    description: "Authentic Louis Vuitton bags in perfect condition...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Fashion",
    status: "Traded",
    wantedItem: "Jewelry",
    views: 189,
    likes: 31,
    timePosted: "1 week ago"
  },
  {
    id: 3,
    title: "Camera Equipment Bundle",
    description: "Professional camera with lenses and accessories...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Photography",
    status: "Active",
    wantedItem: "Drone",
    views: 156,
    likes: 18,
    timePosted: "3 days ago"
  }
]

// Mock finder requests
const finderRequests = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    description: "Looking for iPhone 15 Pro Max in any color except pink...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Electronics",
    payment: 25000,
    status: "Active",
    urgency: "High",
    responses: 12,
    timePosted: "1 day ago"
  },
  {
    id: 2,
    title: "Gaming Chair",
    description: "Need an ergonomic gaming chair, preferably Secretlab...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Furniture",
    payment: 12000,
    status: "Found",
    urgency: "Medium",
    responses: 8,
    timePosted: "2 weeks ago"
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Traded": return "bg-blue-100 text-blue-800"
      case "Found": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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
              <Link href="/Finders" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Finders
              </Link>
              <Link href="/messages" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">
                Messages
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/post">
                <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                  Post Item
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-600 to-orange-500 relative">
            <img 
              src={userData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-50"
            />
            <Button 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-2xl">{userData.name[0]}</AvatarFallback>
                </Avatar>
                {userData.verified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{userData.name}</h1>
                    <p className="text-slate-600">{userData.username}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {userData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{userData.stats.rating}</div>
                      <div className="text-sm text-slate-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{userData.stats.totalTrades}</div>
                      <div className="text-sm text-slate-500">Trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{userData.stats.successRate}%</div>
                      <div className="text-sm text-slate-500">Success</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-700 mt-4 max-w-2xl">{userData.bio}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                 {/* Badges */}
<div className="flex flex-wrap gap-2 mt-4">
  {(() => {
    let badgeText = "";
    let badgeVariant = "default"; // you can change this for colors

    if (userData.stats.itemsPosted < 30) {
      badgeText = "Market Novice";
      badgeVariant = "outline";
    } else if (userData.stats.itemsPosted < 60) {
      badgeText = "Market Professional";
      badgeVariant = "default";
    } else if (userData.stats.itemsPosted < 100) {
      badgeText = "Market Expert";
      badgeVariant = "outline";
    } else {
      badgeText = "Market Master";
      badgeVariant = "destructive";
    }

    return (
      <Badge variant= {badgeVariant}>
        {badgeText}
      </Badge>
    );
  })()}
</div>

                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{userData.stats.itemsPosted}</h3>
              <p className="text-slate-600">Items Posted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{userData.stats.itemsFound}</h3>
              <p className="text-slate-600">Items Found</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">₦{userData.stats.totalEarnings.toLocaleString()}</h3>
              <p className="text-slate-600">Total Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{userData.stats.completedTrades}</h3>
              <p className="text-slate-600">Completed Trades</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posted Items</TabsTrigger>
            <TabsTrigger value="requests">Finder Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Posted Items Tab */}
          <TabsContent value="posts" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                    <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                      {item.category}
                    </Badge>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="text-sm">
                      <span className="text-slate-600">Wants: </span>
                      <span className="font-medium text-purple-600">{item.wantedItem}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                      <span>{item.timePosted}</span>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Post
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Finder Requests Tab */}
          <TabsContent value="requests" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finderRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={request.image}
                      alt={request.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </Badge>
                    <Badge className={`absolute bottom-2 right-2 ${getStatusColor(request.status)}`}>
                      {request.status}
                    </Badge>
                    <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                      {request.category}
                    </Badge>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{request.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{request.description}</p>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                      <span className="text-sm font-medium text-slate-700">Reward:</span>
                      <span className="font-bold text-green-600">₦{request.payment.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{request.responses} responses</span>
                      </div>
                      <span>{request.timePosted}</span>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Request
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <Input defaultValue={userData.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input defaultValue={userData.email} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Location</label>
                    <Input defaultValue={userData.location} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Bio</label>
                    <Input defaultValue={userData.bio} />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Verification Status
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Deactivate Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
