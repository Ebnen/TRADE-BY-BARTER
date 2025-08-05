"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Flag,
  Play,
  MapPin,
  Calendar,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { Clock } from "lucide-react" // Import Clock component

// Mock content data
const mockContent = [
  {
    id: 1,
    title: "MacBook Pro 2021",
    description: "Excellent condition MacBook Pro, barely used. Perfect for students or professionals.",
    user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
    category: "Electronics",
    status: "active",
    wantedItem: "Gaming PC",
    location: "San Francisco, CA",
    datePosted: "2024-01-15",
    views: 234,
    reports: 0,
    videoThumbnail: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 2,
    title: "Mountain Bike",
    description: "Trek mountain bike in great condition. Looking to switch to road cycling.",
    user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    category: "Sports",
    status: "pending",
    wantedItem: "Road Bike",
    location: "New York, NY",
    datePosted: "2024-01-14",
    views: 156,
    reports: 1,
    videoThumbnail: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    title: "Designer Handbag",
    description: "Authentic Louis Vuitton bag, used only a few times. Looking for gold jewelry.",
    user: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    category: "Fashion",
    status: "flagged",
    wantedItem: "Jewelry",
    location: "Los Angeles, CA",
    datePosted: "2024-01-13",
    views: 89,
    reports: 3,
    videoThumbnail: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 4,
    title: "Guitar Amplifier",
    description: "Marshall amp in perfect working condition. Want to trade for a quality electric guitar.",
    user: { name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    category: "Music",
    status: "active",
    wantedItem: "Electric Guitar",
    location: "Chicago, IL",
    datePosted: "2024-01-12",
    views: 178,
    reports: 0,
    videoThumbnail: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 5,
    title: "Coffee Machine",
    description: "High-end espresso machine, barely used. Looking for a high-power blender.",
    user: { name: "Lisa Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    category: "Home",
    status: "rejected",
    wantedItem: "Blender",
    location: "Miami, FL",
    datePosted: "2024-01-11",
    views: 67,
    reports: 0,
    videoThumbnail: "/placeholder.svg?height=150&width=200",
  },
]

export default function AdminContentPage() {
  const [content, setContent] = useState(mockContent)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [actionDialog, setActionDialog] = useState<{
    open: boolean
    type: "approve" | "reject" | "delete" | "flag" | null
    content: any
  }>({
    open: false,
    type: null,
    content: null,
  })

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleContentAction = (action: string, contentItem: any) => {
    setActionDialog({
      open: true,
      type: action as any,
      content: contentItem,
    })
  }

  const confirmAction = () => {
    if (!actionDialog.content || !actionDialog.type) return

    const updatedContent = content
      .map((item) => {
        if (item.id === actionDialog.content.id) {
          switch (actionDialog.type) {
            case "approve":
              return { ...item, status: "active" }
            case "reject":
              return { ...item, status: "rejected" }
            case "flag":
              return { ...item, status: "flagged" }
            case "delete":
              return null
            default:
              return item
          }
        }
        return item
      })
      .filter(Boolean) as any[]

    setContent(updatedContent)
    setActionDialog({ open: false, type: null, content: null })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
      case "rejected":
        return <Badge className="bg-gray-100 text-gray-800">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const categories = ["All", "Electronics", "Sports", "Fashion", "Music", "Home", "Furniture", "Photography"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trade 🤝 Barter
                </div>
              </Link>
              <Badge className="bg-red-600 text-white">Admin Panel</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600 mt-2">Review and manage all posted items</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{content.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {content.filter((item) => item.status === "pending").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged</p>
                  <p className="text-2xl font-bold text-red-600">
                    {content.filter((item) => item.status === "flagged").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {content.filter((item) => item.status === "active").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search content by title, description, or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle>Content ({filteredContent.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Date Posted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={item.videoThumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{item.title}</p>
                          <p className="text-sm text-gray-500 truncate">Wants: {item.wantedItem}</p>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{item.views}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${item.reports > 0 ? "text-red-600 font-medium" : "text-gray-600"}`}>
                        {item.reports}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(item.datePosted).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedContent(item)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {item.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleContentAction("approve", item)}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleContentAction("reject", item)}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {item.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => handleContentAction("flag", item)}
                              className="text-orange-600"
                            >
                              <Flag className="h-4 w-4 mr-2" />
                              Flag Content
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleContentAction("delete", item)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Confirmation Dialog */}
        <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionDialog.type === "approve" && "Approve Content"}
                {actionDialog.type === "reject" && "Reject Content"}
                {actionDialog.type === "delete" && "Delete Content"}
                {actionDialog.type === "flag" && "Flag Content"}
              </DialogTitle>
              <DialogDescription>
                {actionDialog.type === "approve" &&
                  `Are you sure you want to approve "${actionDialog.content?.title}"? It will be visible to all users.`}
                {actionDialog.type === "reject" &&
                  `Are you sure you want to reject "${actionDialog.content?.title}"? The user will be notified.`}
                {actionDialog.type === "delete" &&
                  `Are you sure you want to delete "${actionDialog.content?.title}"? This action cannot be undone.`}
                {actionDialog.type === "flag" &&
                  `Are you sure you want to flag "${actionDialog.content?.title}"? It will be hidden from public view.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialog({ open: false, type: null, content: null })}>
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                className={
                  actionDialog.type === "delete" || actionDialog.type === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : actionDialog.type === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-orange-600 hover:bg-orange-700"
                }
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
