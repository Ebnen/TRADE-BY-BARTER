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
  Ban,
  UserCheck,
  Trash2,
  Mail,
  MapPin,
  Calendar,
  Filter,
  Download,
  Bell,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-01-15",
    location: "San Francisco, CA",
    trades: 23,
    rating: 4.8,
    lastActive: "2 hours ago",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-01-10",
    location: "New York, NY",
    trades: 45,
    rating: 4.9,
    lastActive: "1 day ago",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    joinDate: "2024-01-20",
    location: "Los Angeles, CA",
    trades: 12,
    rating: 4.7,
    lastActive: "3 days ago",
    verified: false,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-12-05",
    location: "Chicago, IL",
    trades: 67,
    rating: 5.0,
    lastActive: "30 minutes ago",
    verified: true,
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    joinDate: "2024-01-25",
    location: "Miami, FL",
    trades: 18,
    rating: 4.6,
    lastActive: "2 weeks ago",
    verified: true,
  },
  {
    id: 6,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-01-08",
    location: "Seattle, WA",
    trades: 31,
    rating: 4.8,
    lastActive: "5 hours ago",
    verified: false,
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [actionDialog, setActionDialog] = useState<{
    open: boolean
    type: "suspend" | "unsuspend" | "delete" | "verify" | null
    user: any
  }>({
    open: false,
    type: null,
    user: null,
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUserAction = (action: string, user: any) => {
    setActionDialog({
      open: true,
      type: action as any,
      user,
    })
  }

  const confirmAction = () => {
    if (!actionDialog.user || !actionDialog.type) return

    const updatedUsers = users
      .map((user) => {
        if (user.id === actionDialog.user.id) {
          switch (actionDialog.type) {
            case "suspend":
              return { ...user, status: "suspended" }
            case "unsuspend":
              return { ...user, status: "active" }
            case "verify":
              return { ...user, verified: true }
            case "delete":
              return null
            default:
              return user
          }
        }
        return user
      })
      .filter(Boolean) as any[]

    setUsers(updatedUsers)
    setActionDialog({ open: false, type: null, user: null })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage and monitor all platform users</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">
                    {users.filter((u) => u.status === "suspended").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Ban className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-purple-600">{users.filter((u) => u.verified).length}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-purple-600" />
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
                  placeholder="Search users by name or email..."
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
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trades</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            {user.verified && <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>}
                          </div>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.trades}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span>{user.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{user.lastActive}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleUserAction("suspend", user)}
                              className="text-red-600"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserAction("unsuspend", user)}
                              className="text-green-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Unsuspend User
                            </DropdownMenuItem>
                          )}
                          {!user.verified && (
                            <DropdownMenuItem onClick={() => handleUserAction("verify", user)}>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Verify User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleUserAction("delete", user)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
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
                {actionDialog.type === "suspend" && "Suspend User"}
                {actionDialog.type === "unsuspend" && "Unsuspend User"}
                {actionDialog.type === "delete" && "Delete User"}
                {actionDialog.type === "verify" && "Verify User"}
              </DialogTitle>
              <DialogDescription>
                {actionDialog.type === "suspend" &&
                  `Are you sure you want to suspend ${actionDialog.user?.name}? They will not be able to access the platform.`}
                {actionDialog.type === "unsuspend" &&
                  `Are you sure you want to unsuspend ${actionDialog.user?.name}? They will regain access to the platform.`}
                {actionDialog.type === "delete" &&
                  `Are you sure you want to delete ${actionDialog.user?.name}? This action cannot be undone.`}
                {actionDialog.type === "verify" &&
                  `Are you sure you want to verify ${actionDialog.user?.name}? They will receive a verified badge.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialog({ open: false, type: null, user: null })}>
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                className={
                  actionDialog.type === "delete" || actionDialog.type === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
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
