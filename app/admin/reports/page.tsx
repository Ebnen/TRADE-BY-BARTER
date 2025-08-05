"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, AlertTriangle, Eye, CheckCircle, XCircle, Clock, Flag, User, Calendar, Bell } from "lucide-react"
import Link from "next/link"

// Mock reports data
const mockReports = [
  {
    id: 1,
    type: "inappropriate_content",
    status: "pending",
    priority: "high",
    reporter: { name: "Anonymous", avatar: null },
    reportedUser: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    reportedContent: {
      type: "post",
      title: "Suspicious Electronics Deal",
      id: 123,
    },
    reason: "Inappropriate Content",
    description:
      "This post contains inappropriate images and seems to be a scam. The user is asking for payment upfront.",
    dateReported: "2024-01-15T10:30:00Z",
    evidence: ["Screenshot of inappropriate content", "Chat logs showing scam behavior"],
  },
  {
    id: 2,
    type: "harassment",
    status: "investigating",
    priority: "high",
    reporter: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
    reportedUser: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    reportedContent: {
      type: "message",
      title: "Harassment in chat",
      id: 456,
    },
    reason: "Harassment",
    description: "User has been sending threatening messages and won't stop contacting me after I declined the trade.",
    dateReported: "2024-01-14T15:45:00Z",
    evidence: ["Chat screenshots", "Multiple unwanted messages"],
  },
  {
    id: 3,
    type: "fake_item",
    status: "resolved",
    priority: "medium",
    reporter: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    reportedUser: { name: "Alex Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    reportedContent: {
      type: "post",
      title: "Fake Designer Bag",
      id: 789,
    },
    reason: "Counterfeit Item",
    description: "The item being traded is clearly a fake designer bag but is being advertised as authentic.",
    dateReported: "2024-01-13T09:20:00Z",
    evidence: ["Photos showing fake details", "Comparison with authentic item"],
    resolution: "Content removed and user warned",
    resolvedDate: "2024-01-14T11:00:00Z",
  },
  {
    id: 4,
    type: "spam",
    status: "pending",
    priority: "low",
    reporter: { name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    reportedUser: { name: "Spam Bot", avatar: null },
    reportedContent: {
      type: "post",
      title: "Multiple Spam Posts",
      id: 101,
    },
    reason: "Spam",
    description: "User is posting the same item multiple times with different titles to flood the feed.",
    dateReported: "2024-01-12T14:15:00Z",
    evidence: ["Multiple duplicate posts", "Automated posting pattern"],
  },
  {
    id: 5,
    type: "safety_concern",
    status: "investigating",
    priority: "high",
    reporter: { name: "Lisa Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    reportedUser: { name: "Suspicious User", avatar: "/placeholder.svg?height=32&width=32" },
    reportedContent: {
      type: "profile",
      title: "Suspicious Profile Activity",
      id: 202,
    },
    reason: "Safety Concern",
    description: "User is asking to meet in unsafe locations and requesting personal information before trades.",
    dateReported: "2024-01-11T16:30:00Z",
    evidence: ["Chat logs requesting personal info", "Unsafe meeting location requests"],
  },
]

export default function AdminReportsPage() {
  const [reports, setReports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [resolutionDialog, setResolutionDialog] = useState<{
    open: boolean
    report: any
    action: "resolve" | "dismiss" | null
  }>({
    open: false,
    report: null,
    action: null,
  })
  const [resolutionNote, setResolutionNote] = useState("")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleReportAction = (action: "resolve" | "dismiss", report: any) => {
    setResolutionDialog({
      open: true,
      report,
      action,
    })
  }

  const confirmResolution = () => {
    if (!resolutionDialog.report || !resolutionDialog.action) return

    const updatedReports = reports.map((report) => {
      if (report.id === resolutionDialog.report.id) {
        return {
          ...report,
          status: resolutionDialog.action === "resolve" ? "resolved" : "dismissed",
          resolution: resolutionNote,
          resolvedDate: new Date().toISOString(),
        }
      }
      return report
    })

    setReports(updatedReports)
    setResolutionDialog({ open: false, report: null, action: null })
    setResolutionNote("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800">Dismissed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Safety</h1>
          <p className="text-gray-600 mt-2">Review and resolve user reports and safety concerns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Flag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reports.filter((r) => r.status === "pending").length}
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
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">
                    {reports.filter((r) => r.priority === "high").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter((r) => r.status === "resolved").length}
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
                  placeholder="Search reports by reason, user, or description..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reports ({filteredReports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{report.reason}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{report.description}</p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <span className="capitalize">{report.reportedContent.type}</span>
                          <span className="mx-1">•</span>
                          <span>{report.reportedContent.title}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={report.reportedUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{report.reportedUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{report.reportedUser.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {report.reporter.avatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={report.reporter.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                        )}
                        <span className="text-sm font-medium">{report.reporter.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(report.dateReported).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedReport(report)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {report.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleReportAction("resolve", report)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReportAction("dismiss", report)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Report Details Dialog */}
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Report Type</label>
                    <p className="text-sm text-gray-900">{selectedReport.reason}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    <div className="mt-1">{getPriorityBadge(selectedReport.priority)}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedReport.description}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Evidence</label>
                  <ul className="text-sm text-gray-900 mt-1 list-disc list-inside">
                    {selectedReport.evidence.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {selectedReport.resolution && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Resolution</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedReport.resolution}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reported User</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedReport.reportedUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedReport.reportedUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{selectedReport.reportedUser.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reporter</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {selectedReport.reporter.avatar ? (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedReport.reporter.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedReport.reporter.name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-gray-500" />
                        </div>
                      )}
                      <span className="text-sm">{selectedReport.reporter.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Resolution Dialog */}
        <Dialog
          open={resolutionDialog.open}
          onOpenChange={(open) => setResolutionDialog({ ...resolutionDialog, open })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{resolutionDialog.action === "resolve" ? "Resolve Report" : "Dismiss Report"}</DialogTitle>
              <DialogDescription>
                {resolutionDialog.action === "resolve"
                  ? "Please provide details about how this report was resolved."
                  : "Please provide a reason for dismissing this report."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter resolution notes..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setResolutionDialog({ open: false, report: null, action: null })}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmResolution}
                className={
                  resolutionDialog.action === "resolve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }
              >
                {resolutionDialog.action === "resolve" ? "Resolve" : "Dismiss"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
