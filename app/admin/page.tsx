"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, ShoppingBag, AlertTriangle, CheckCircle, BarChart3, Bell } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const dashboardStats = {
  totalUsers: 12847,
  activeUsers: 8934,
  totalTrades: 5672,
  completedTrades: 4891,
  totalPosts: 15234,
  activePosts: 11567,
  reportedContent: 23,
  pendingReports: 8,
  revenue: 45670,
  monthlyGrowth: 12.5,
}

const recentActivity = [
  {
    id: 1,
    type: "user_signup",
    user: "Sarah Chen",
    action: "New user registered",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "trade_completed",
    user: "Mike Johnson",
    action: "Completed trade: MacBook ↔ Gaming PC",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "content_reported",
    user: "Anonymous",
    action: "Reported inappropriate content",
    timestamp: "1 hour ago",
    status: "warning",
  },
  {
    id: 4,
    type: "user_suspended",
    user: "Admin",
    action: "Suspended user: @badactor123",
    timestamp: "2 hours ago",
    status: "error",
  },
  {
    id: 5,
    type: "post_created",
    user: "Emma Davis",
    action: "Posted new item: Designer Handbag",
    timestamp: "3 hours ago",
    status: "success",
  },
]

const topTraders = [
  { name: "David Wilson", trades: 67, rating: 5.0, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Mike Johnson", trades: 45, rating: 4.9, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Lisa Rodriguez", trades: 31, rating: 4.8, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Rachel Green", trades: 29, rating: 4.9, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Sarah Chen", trades: 23, rating: 4.8, avatar: "/placeholder.svg?height=32&width=32" },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your trading platform</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/users">
            <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 flex-col">
              <Users className="h-6 w-6 mb-1" />
              <span className="text-sm">Manage Users</span>
            </Button>
          </Link>
          <Link href="/admin/content">
            <Button className="w-full h-16 bg-purple-600 hover:bg-purple-700 flex-col">
              <ShoppingBag className="h-6 w-6 mb-1" />
              <span className="text-sm">Content</span>
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 flex-col">
              <AlertTriangle className="h-6 w-6 mb-1" />
              <span className="text-sm">Reports</span>
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button className="w-full h-16 bg-green-600 hover:bg-green-700 flex-col">
              <BarChart3 className="h-6 w-6 mb-1" />
              <span className="text-sm">Analytics</span>
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activePosts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{dashboardStats.totalPosts.toLocaleString()} total posts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Trades</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.completedTrades.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((dashboardStats.completedTrades / dashboardStats.totalTrades) * 100).toFixed(1)}% success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardStats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">{dashboardStats.reportedContent} total reports</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">by {activity.user}</p>
                      </div>
                      <div className="text-xs text-gray-400">{activity.timestamp}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/admin/activity">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Traders */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Traders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTraders.map((trader, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-500 w-4">#{index + 1}</div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={trader.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{trader.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{trader.name}</p>
                        <p className="text-xs text-gray-500">
                          {trader.trades} trades • ⭐ {trader.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Users
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <p className="text-sm text-gray-600">Critical Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
