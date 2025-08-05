"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, ShoppingBag, MessageCircle, DollarSign, Download, Bell } from "lucide-react"
import Link from "next/link"

// Mock analytics data
const analyticsData = {
  userGrowth: {
    current: 12847,
    previous: 11456,
    change: 12.1,
    chartData: [
      { month: "Jan", users: 8500 },
      { month: "Feb", users: 9200 },
      { month: "Mar", users: 9800 },
      { month: "Apr", users: 10500 },
      { month: "May", users: 11200 },
      { month: "Jun", users: 11800 },
      { month: "Jul", users: 12847 },
    ],
  },
  tradeMetrics: {
    totalTrades: 5672,
    completedTrades: 4891,
    successRate: 86.2,
    averageTradeValue: 245,
    monthlyTrades: [
      { month: "Jan", trades: 650 },
      { month: "Feb", trades: 720 },
      { month: "Mar", trades: 810 },
      { month: "Apr", trades: 890 },
      { month: "May", trades: 920 },
      { month: "Jun", trades: 980 },
      { month: "Jul", trades: 1102 },
    ],
  },
  categoryBreakdown: [
    { category: "Electronics", count: 3245, percentage: 28.5 },
    { category: "Fashion", count: 2156, percentage: 18.9 },
    { category: "Sports", count: 1876, percentage: 16.4 },
    { category: "Home", count: 1543, percentage: 13.5 },
    { category: "Music", count: 1234, percentage: 10.8 },
    { category: "Books", count: 987, percentage: 8.6 },
    { category: "Other", count: 432, percentage: 3.8 },
  ],
  topLocations: [
    { city: "San Francisco", state: "CA", users: 1245, trades: 892 },
    { city: "New York", state: "NY", users: 1156, trades: 834 },
    { city: "Los Angeles", state: "CA", users: 1089, trades: 756 },
    { city: "Chicago", state: "IL", users: 987, trades: 678 },
    { city: "Seattle", state: "WA", users: 876, trades: 612 },
  ],
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("users")

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
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
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
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Track platform performance and user behavior</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.userGrowth.current.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{analyticsData.userGrowth.change}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.tradeMetrics.totalTrades.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{analyticsData.tradeMetrics.successRate}% success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Trade Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analyticsData.tradeMetrics.averageTradeValue}</div>
              <p className="text-xs text-muted-foreground">Estimated value per trade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11,567</div>
              <p className="text-xs text-muted-foreground">Currently available for trade</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between space-x-2">
                  {analyticsData.userGrowth.chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-blue-600 rounded-t w-full transition-all duration-300 hover:bg-blue-700"
                        style={{
                          height: `${(data.users / Math.max(...analyticsData.userGrowth.chartData.map((d) => d.users))) * 250}px`,
                        }}
                      />
                      <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                      <div className="text-xs font-medium text-gray-900">{data.users.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">{category.category}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-600">{category.count.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">({category.percentage}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trade Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trade Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.tradeMetrics.monthlyTrades.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-purple-600 rounded-t w-full transition-all duration-300 hover:bg-purple-700"
                      style={{
                        height: `${(data.trades / Math.max(...analyticsData.tradeMetrics.monthlyTrades.map((d) => d.trades))) * 200}px`,
                      }}
                    />
                    <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                    <div className="text-xs font-medium text-gray-900">{data.trades}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Trading Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {location.city}, {location.state}
                        </div>
                        <div className="text-xs text-gray-500">{location.users.toLocaleString()} users</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{location.trades}</div>
                      <div className="text-xs text-gray-500">trades</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.3</div>
                  <p className="text-sm text-gray-600">Avg trades per user</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.2</div>
                  <p className="text-sm text-gray-600">Days avg to complete trade</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <p className="text-sm text-gray-600">User satisfaction rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
