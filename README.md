# Trade 🤝 Barter

A modern, location-based bartering platform that connects people in their local community to exchange goods with goods or  monetary transactions. Built with Next.js, TypeScript, and a focus on sustainable, community-driven trading.

## ✨ Features

### 🌍 Core Trading Features
- **Location-Based Matching**: Find traders in your area for convenient exchanges
- **Video Listings**: 30-second video demonstrations of items for better trust and transparency
- **Smart Matching**: Automatic matching between what you have and what others want
- **Secure Messaging**: Built-in chat system for safe trade negotiations
- **Multi-Category Support**: Electronics, Sports, Fashion, Music, Home, Furniture, and more

### 👥 User Experience
- **User Verification**: Rating system and verified user badges for trust
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live notifications for messages and trade requests
- **Advanced Search**: Filter by category, location, and condition
- **Trade History**: Track completed and ongoing trades

### 🛡️ Safety & Security
- **User Rating System**: Community-driven reputation scores
- **Content Moderation**: Report inappropriate content and users
- **Admin Dashboard**: Comprehensive moderation tools and analytics
- **Privacy Protection**: Location sharing limited to general area only

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ebnen/TRADE-BY-BARTER.git
   cd TRADE-BY-BARTER
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
├── app/                          # Next.js 13+ App Router
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── discover/                 # Browse and search items
│   ├── post/                     # Create new trade listings
│   ├── messages/                 # Trade communications
│   ├── login/ & signup/          # Authentication
│   └── admin/                    # Admin dashboard & management
│       ├── users/                # User management
│       ├── content/              # Content moderation
│       ├── reports/              # Handle user reports
│       └── analytics/            # Platform analytics
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   └── theme-provider.tsx        # Theme management
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/                       # Static assets
└── styles/                       # Additional stylesheets
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

### Key Dependencies
- **Animations**: Tailwind CSS Animate
- **Date Handling**: date-fns
- **Carousels**: Embla Carousel
- **Notifications**: Sonner
- **Theme Management**: next-themes
- **Fonts**: Geist Sans & Mono

## 📱 Pages & Features

### Public Pages
- **Landing Page** (`/`): Hero section, features overview, how it works
- **Discover** (`/discover`): Browse available items with filtering and search
- **Authentication** (`/login`, `/signup`): User registration and login

### User Dashboard
- **Post Item** (`/post`): Create new trade listings with video upload
- **Messages** (`/messages`): Trade communications and negotiations
- **My Trades**: Track ongoing and completed exchanges

### Admin Panel
- **Dashboard** (`/admin`): System overview and key metrics
- **User Management** (`/admin/users`): Monitor and manage users
- **Content Moderation** (`/admin/content`): Review and moderate listings
- **Reports** (`/admin/reports`): Handle user reports and disputes
- **Analytics** (`/admin/analytics`): Platform performance and insights

## 🎨 Design System

The project uses a consistent design system based on:
- **Colors**: Blue-to-purple gradients for primary actions
- **Typography**: Geist Sans for UI, Geist Mono for code
- **Components**: Fully accessible Radix UI primitives
- **Responsive**: Mobile-first design approach
- **Dark Mode**: Built-in theme switching support

## 📊 Key Features Deep Dive

### Video-First Listings
- Users must upload a 30-second video of their item
- Builds trust through visual demonstration
- Reduces disputes and misunderstandings

### Location-Based Matching
- Uses geolocation for local trading
- Privacy-focused (only shows general area)
- Reduces shipping needs and carbon footprint

### Smart Trade Matching
- Algorithm matches "have" vs "want" items
- Suggests potential trade partners
- Notifies users of relevant matches

### Comprehensive Admin Tools
- Real-time dashboard with key metrics
- User verification and suspension tools
- Content moderation and reporting system
- Analytics for platform growth and health

## 🚧 Development Status

This is currently an MVP (Minimum Viable Product) with:
- ✅ Complete UI/UX design
- ✅ Responsive layouts
- ✅ Component architecture
- 🚧 Backend integration (in progress)
- 🚧 Database setup (planned)
- 🚧 Authentication system (planned)
- 🚧 Real-time messaging (planned)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [TypeScript]
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email ebenzy1996@gmail.com or create an issue in this repository.

---

**Trade 🤝 Barter** - Building sustainable communities through local exchange