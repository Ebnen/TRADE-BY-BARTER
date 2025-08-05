"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Video, MapPin, X, Plus } from "lucide-react"
import Link from "next/link"

export default function PostItemPage() {
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [wantedItems, setWantedItems] = useState<string[]>([])
  const [newWantedItem, setNewWantedItem] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [location, setLocation] = useState("")

  const categories = [
    "Electronics",
    "Sports",
    "Fashion",
    "Music",
    "Home",
    "Furniture",
    "Photography",
    "Books",
    "Toys",
    "Automotive",
    "Garden",
    "Other",
  ]

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]

  const addWantedItem = () => {
    if (newWantedItem.trim() && !wantedItems.includes(newWantedItem.trim())) {
      setWantedItems([...wantedItems, newWantedItem.trim()])
      setNewWantedItem("")
    }
  }

  const removeWantedItem = (item: string) => {
    setWantedItems(wantedItems.filter((i) => i !== item))
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
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
              <Link href="/messages" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Messages
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post an Item to Trade</h1>
          <p className="text-gray-600">Share what you have and what you're looking for</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Item Video (Required)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  {videoFile ? (
                    <div className="space-y-4">
                      <Video className="h-12 w-12 text-green-600 mx-auto" />
                      <div>
                        <p className="font-medium text-gray-900">{videoFile.name}</p>
                        <p className="text-sm text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setVideoFile(null)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Remove Video
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">Upload a 30-second video</p>
                        <p className="text-gray-500">Show your item from different angles</p>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <Label htmlFor="video-upload">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Choose Video File
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Max file size: 100MB. Supported formats: MP4, MOV, AVI</p>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name *</Label>
                  <Input
                    id="item-name"
                    placeholder="e.g., MacBook Pro 2021"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item's condition, features, and any important details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Condition *</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond} value={cond}>
                            {cond}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You Want */}
            <Card>
              <CardHeader>
                <CardTitle>What Are You Looking For?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Gaming PC, iPhone, etc."
                    value={newWantedItem}
                    onChange={(e) => setNewWantedItem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addWantedItem()}
                  />
                  <Button onClick={addWantedItem} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {wantedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {wantedItems.map((item, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {item}
                        <button onClick={() => removeWantedItem(item)} className="ml-2 hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-500">Add multiple items you'd be interested in trading for</p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your location or use current location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button onClick={getCurrentLocation} variant="outline">
                    Use Current
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Your exact address won't be shared. Only general area for matching.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview/Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  {videoFile ? (
                    <Video className="h-8 w-8 text-gray-400" />
                  ) : (
                    <p className="text-gray-500 text-sm">Video preview</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">{itemName || "Item Name"}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description || "Item description will appear here..."}</p>
                </div>

                {wantedItems.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Looking for:</p>
                    <div className="flex flex-wrap gap-1">
                      {wantedItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Post Item
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By posting, you agree to our Terms of Service
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
