# NINETWODASH - Project Structure

## 📁 Root Directory
```
92DASH/
├── 📄 CLAUDE.md                    # Claude AI instructions
├── 📄 README.md                    # Project documentation
├── 📄 README-MONGODB.md           # MongoDB setup instructions
├── 📄 package.json                # Dependencies and scripts
├── 📄 next.config.js              # Next.js configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 middleware.ts               # Next.js middleware
├── 📄 .npmrc                      # NPM configuration
└── 📁 node_modules/               # Dependencies
```

## 📁 Source Code Structure (`src/`)
```
src/
├── 📁 app/                        # Next.js App Router
│   ├── 📄 layout.jsx             # Root layout
│   ├── 📄 page.jsx               # Home page (redirects)
│   ├── 📄 globals.css            # Global styles
│   ├── 📄 not-found.jsx          # 404 page
│   │
│   ├── 📁 api/                   # API Routes
│   │   ├── 📁 admin/            # Admin API endpoints
│   │   │   ├── 📁 clients/      # Client management
│   │   │   │   ├── 📄 route.ts  # List/create clients
│   │   │   │   └── 📁 [clientId]/
│   │   │   │       ├── 📄 route.ts           # Get/update client
│   │   │   │       ├── 📁 connection/        # Connection status
│   │   │   │       ├── 📁 credentials/       # API credentials
│   │   │   │       └── 📁 test-connections/  # Test API connections
│   │   │   ├── 📁 dashboard/    # Dashboard stats
│   │   │   ├── 📁 budgets/      # Budget management
│   │   │   └── 📁 tags/         # Tag management
│   │   │
│   │   ├── 📁 auth/             # Authentication
│   │   │   ├── 📁 [...nextauth]/  # NextAuth.js handler
│   │   │   ├── 📁 google-ads/     # Google Ads OAuth
│   │   │   └── 📁 google-analytics/ # Google Analytics OAuth
│   │   │
│   │   ├── 📁 analytics/        # Analytics API
│   │   ├── 📁 campaigns/        # Campaign data
│   │   ├── 📁 charts/           # Chart data
│   │   ├── 📁 clients/          # Client portal data
│   │   ├── 📁 dashboard/        # Dashboard data
│   │   ├── 📁 facebook-ads/     # Facebook Ads API
│   │   ├── 📁 google-ads/       # Google Ads API
│   │   ├── 📁 reports/          # Report generation
│   │   ├── 📁 settings/         # Settings management
│   │   └── 📁 test-connection/  # Connection testing
│   │
│   ├── 📁 admin/                # Admin pages
│   │   ├── 📄 page.jsx          # Admin dashboard
│   │   ├── 📁 clients/          # Client management
│   │   ├── 📁 budgets/          # Budget management
│   │   └── 📁 tags/             # Tag management
│   │
│   ├── 📁 client-analytics/     # Client analytics pages
│   │   └── 📁 [slug]/           # Dynamic client pages
│   │
│   ├── 📁 portal/               # Client portal
│   │   └── 📁 [client]/         # Dynamic client portal
│   │       ├── 📄 page.jsx      # Portal dashboard
│   │       ├── 📁 analytics/    # Analytics view
│   │       ├── 📁 campanhas/    # Campaigns view
│   │       ├── 📁 charts/       # Charts view
│   │       ├── 📁 configuracoes/ # Settings view
│   │       └── 📁 relatorios/   # Reports view
│   │
│   ├── 📁 login/                # Authentication
│   ├── 📁 dashboards/           # Dashboard listing
│   └── 📁 [other-pages]/        # Various UI pages
│
├── 📁 components/               # React Components
│   ├── 📄 AgencyDashboard.jsx   # Main dashboard
│   ├── 📄 ClientList.jsx        # Client listing
│   ├── 📄 ClientAnalytics.jsx   # Client analytics
│   ├── 📄 BudgetManager.jsx     # Budget management
│   ├── 📄 ClientTagsManager.jsx # Tag management
│   ├── 📄 LoadingSpinner.jsx    # Loading component
│   ├── 📄 Breadcrumb.jsx        # Breadcrumb navigation
│   │
│   ├── 📁 admin/                # Admin components
│   │   └── 📄 CredentialsSetup.jsx
│   │
│   ├── 📁 auth/                 # Authentication components
│   │   ├── 📄 ProtectedRoute.jsx
│   │   ├── 📄 ClientAccessGuard.jsx
│   │   └── 📄 LoginForm.jsx
│   │
│   ├── 📁 charts/               # Chart components
│   │   ├── 📄 ChartBuilder.jsx
│   │   └── 📄 CustomChart.jsx
│   │
│   ├── 📁 child/                # Child components
│   │   ├── 📄 UnitCountOne.jsx  # Stats cards
│   │   ├── 📄 ActiveList.jsx    # Activity list
│   │   ├── 📄 AverageDailySales.jsx # Sales chart
│   │   └── 📄 [100+ UI components]
│   │
│   ├── 📁 client-portal/        # Client portal components
│   │   ├── 📄 ClientPortalDashboard.jsx
│   │   └── 📄 ClientPortalLayout.jsx
│   │
│   └── 📁 providers/            # Context providers
│       └── 📄 SessionProvider.jsx
│
├── 📁 lib/                      # Utility libraries
│   ├── 📄 mongodb.ts            # MongoDB connection & models
│   ├── 📄 auth.ts               # NextAuth configuration
│   ├── 📄 client-credentials.ts # API credentials management
│   ├── 📄 connection-status.js  # Connection status utilities
│   ├── 📄 chart-utils.js        # Chart utilities
│   ├── 📄 encryption.ts         # Encryption utilities
│   ├── 📄 cache.ts              # Caching utilities
│   ├── 📄 facebook-ads.ts       # Facebook Ads integration
│   ├── 📄 google-ads.ts         # Google Ads integration
│   └── 📄 google-analytics.ts   # Google Analytics integration
│
├── 📁 hooks/                    # Custom React hooks
│   └── 📄 useAuth.js            # Authentication hook
│
├── 📁 hook/                     # Chart hooks
│   ├── 📄 useReactApexChart.js  # Chart configurations
│   └── 📄 event-utils.js        # Event utilities
│
├── 📁 helper/                   # Helper utilities
│   ├── 📄 Animation.jsx         # Animation utilities
│   ├── 📄 MobileMenuToggle.jsx  # Mobile menu
│   ├── 📄 ThemeToggleButton.jsx # Theme switcher
│   └── 📄 [other helpers]
│
├── 📁 masterLayout/             # Layout components
│   └── 📄 MasterLayout.jsx      # Main layout wrapper
│
└── 📁 types/                    # TypeScript types
    ├── 📄 dashboard.ts          # Dashboard types
    └── 📄 next-auth.d.ts        # NextAuth types
```

## 📁 Public Assets (`public/`)
```
public/
├── 📄 ninetwo-logo.png         # Main logo
├── 📄 fav.png                  # Favicon
└── 📁 assets/                  # Static assets
    ├── 📁 css/                 # Stylesheets
    │   ├── 📄 style.css        # Main styles
    │   └── 📁 lib/             # CSS libraries
    ├── 📁 images/              # Images
    │   ├── 📄 logo.png         # Logo variants
    │   ├── 📁 auth/            # Auth images
    │   ├── 📁 avatar/          # Avatar images
    │   └── 📁 [other categories]
    └── 📁 webfonts/            # Web fonts
```

## 📁 Scripts (`scripts/`)
```
scripts/
└── 📄 seed-mongodb.js          # Database seeding script
```

## 🔧 Configuration Files
```
├── 📄 .env.local               # Environment variables
├── 📄 .gitignore               # Git ignore rules
├── 📄 package-lock.json        # Dependency lock
├── 📄 next-env.d.ts           # Next.js types
├── 📄 tsconfig.json           # TypeScript config
├── 📄 jsconfig.json           # JavaScript config
├── 📄 middleware.ts           # Next.js middleware
└── 📄 .npmrc                  # NPM configuration
```

## 📊 Key Features by Directory

### `/src/app/api/` - API Routes
- **admin/**: Client management, budgets, tags, dashboard stats
- **auth/**: NextAuth.js authentication + OAuth flows
- **analytics/**: Google Analytics data retrieval
- **campaigns/**: Campaign data from Google Ads & Facebook
- **charts/**: Dynamic chart data generation
- **dashboard/**: Dashboard statistics and metrics
- **reports/**: PDF/Excel report generation

### `/src/components/` - React Components
- **Main**: AgencyDashboard, ClientList, ClientAnalytics
- **Admin**: Credentials setup, client management
- **Auth**: Protected routes, access guards
- **Charts**: Chart builders and custom visualizations
- **Portal**: Client portal dashboard and layout

### `/src/lib/` - Core Libraries
- **mongodb.ts**: Database models and connections
- **auth.ts**: Authentication configuration
- **client-credentials.ts**: Secure API credential management
- **connection-status.js**: Connection status utilities
- **chart-utils.js**: Dynamic chart configurations
- **[platform]-ads.ts**: API integrations for each platform

## 🚀 Key Integrations
- **MongoDB**: Database with encrypted credential storage
- **NextAuth.js**: Authentication with JWT sessions
- **Google Ads API**: Campaign and performance data
- **Facebook Ads API**: Ad account and campaign metrics
- **Google Analytics**: Website traffic and conversion data
- **ApexCharts**: Dynamic chart visualizations
- **Bootstrap**: UI framework with custom styling

## 🛡️ Security Features
- Encrypted API credentials storage
- Role-based access control (admin/client)
- Protected routes with authentication
- Client data isolation
- Secure OAuth flows for all platforms