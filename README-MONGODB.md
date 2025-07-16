# NINETWODASH - MongoDB Integration Guide

## 📋 Project Overview

This guide covers the complete MongoDB integration for the NINETWODASH project, including database setup, API refactoring, and data migration.

## 🔧 Setup Instructions

### 1. Prerequisites
- MongoDB installed locally or connection to MongoDB Atlas
- Node.js >= 18.0.0
- npm or yarn package manager

### 2. Environment Configuration

Copy the `.env.local` file and configure your MongoDB connection:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ninetwodash
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ninetwodash

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Encryption for client credentials
ENCRYPTION_KEY=your_32_character_encryption_key_here

# API Security
API_SECRET_KEY=your_api_secret_key_here
```

### 3. Database Setup

1. **Install dependencies:**
```bash
npm install mongoose bcrypt --legacy-peer-deps
```

2. **Seed the database with sample data:**
```bash
npm run seed
```

3. **For development environment:**
```bash
npm run seed:dev
```

## 🗄️ Database Schema

### Collections Structure

#### 1. Users Collection
- **admin users**: Full access to all clients
- **client users**: Access restricted to their own data
- Password hashing with bcrypt
- Role-based access control

#### 2. Clients Collection
- Client information and settings
- API connection status (Google Ads, Facebook Ads, Google Analytics)
- Encrypted credential storage
- Custom portal settings
- Custom charts configuration

#### 3. Campaigns Collection
- Campaign data from Google Ads and Facebook Ads
- Daily metrics with historical data
- Platform-specific campaign information
- Performance metrics (impressions, clicks, cost, conversions)

#### 4. Analytics Data Collection
- Google Analytics 4 data
- Daily session and user metrics
- Traffic sources and device breakdown
- Page performance data

#### 5. Reports Collection
- Generated reports with period data
- Platform breakdown and summary metrics
- Chart data for visualizations
- User attribution and sharing settings

#### 6. Activity Logs Collection
- User action logging
- System events and API calls
- Audit trail for compliance

## 🔄 API Refactoring Summary

### Completed API Endpoints

#### 1. `/api/admin/clients` ✅
- **GET**: List all clients with pagination and filtering
- **POST**: Create new client with validation
- Full MongoDB integration with proper indexing

#### 2. `/api/dashboard/[client]` ✅
- **GET**: Consolidated dashboard data
- Aggregates data from campaigns, analytics, and external APIs
- Intelligent caching with MongoDB queries
- Fallback to external APIs when needed

#### 3. `/api/campaigns/[client]` ✅
- **GET**: Campaign list with filtering by platform, status, and period
- MongoDB aggregation for performance metrics
- Real-time campaign status updates

#### 4. `/api/analytics/[client]` ✅
- **GET**: Google Analytics data with MongoDB caching
- Daily analytics aggregation
- Traffic source and device breakdown
- Fallback to Google Analytics API

#### 5. `/api/charts/[client]` ✅
- **GET**: Chart data generation from MongoDB
- **POST**: Custom chart configuration storage
- Dynamic chart data based on campaigns and analytics
- Multiple chart types support (performance, analytics, comparison, funnel)

#### 6. `/api/reports/[client]` ✅
- **GET**: Report listing with filtering and pagination
- **POST**: Generate new reports with MongoDB data
- Comprehensive report generation with charts and summaries
- Platform breakdown and device analytics

## 🚀 Usage Examples

### 1. Starting the Application

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm run start
```

### 2. Database Operations

```bash
# Seed database with sample data
npm run seed

# Clear and reseed database
npm run seed:dev
```

### 3. API Usage Examples

#### Get Client Dashboard
```javascript
const response = await fetch('/api/dashboard/catalisti-holding?period=30d');
const data = await response.json();
```

#### Get Campaign List
```javascript
const response = await fetch('/api/campaigns/catalisti-holding?platform=google_ads&status=active');
const campaigns = await response.json();
```

#### Generate Report
```javascript
const response = await fetch('/api/reports/catalisti-holding', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'monthly',
    period: { days: 30 },
    title: 'Monthly Performance Report'
  })
});
```

## 📊 Sample Data

The seed script creates:
- **1 admin user**: `admin@ninetwodash.com` (password: `admin123`)
- **5 sample clients**: Catalisti Holding, ABC EVO, Dr. Victor Mauro, CWTrends, Global Best Part
- **Client users**: Each client has a user account (password: `client123`)
- **Campaign data**: 30 days of sample metrics for each connected platform
- **Analytics data**: 30 days of Google Analytics sample data
- **Custom charts**: Sample chart configurations

## 🔒 Security Features

### 1. Authentication
- NextAuth.js integration with role-based access
- Password hashing with bcrypt
- Session management with JWT

### 2. Data Protection
- Client credentials encrypted at rest
- API key validation for internal requests
- Rate limiting and input validation

### 3. Access Control
- Admin users: Full access to all clients
- Client users: Restricted to their own data
- API endpoint protection with session validation

## 🎯 Performance Optimizations

### 1. Database Indexing
- Composite indexes for common queries
- Client-based partitioning for large datasets
- Date-based indexing for time-series data

### 2. Caching Strategy
- LRU cache for frequently accessed data
- TTL-based cache invalidation
- Client-specific cache keys

### 3. Query Optimization
- Aggregation pipelines for complex queries
- Projection to limit returned fields
- Pagination for large result sets

## 🔧 Development Tips

### 1. Adding New Clients
```javascript
// Via API
POST /api/admin/clients
{
  "name": "New Client",
  "email": "contact@newclient.com",
  "slug": "new-client",
  "monthlyBudget": 10000,
  "tags": ["industry", "type"]
}
```

### 2. Custom Chart Configuration
```javascript
// Save custom chart
POST /api/charts/client-slug
{
  "id": "custom-chart-1",
  "name": "Custom Performance Chart",
  "type": "line",
  "metrics": ["impressions", "clicks", "cost"],
  "period": "30d"
}
```

### 3. Report Generation
```javascript
// Generate custom report
POST /api/reports/client-slug
{
  "type": "custom",
  "period": { "from": "2024-01-01", "to": "2024-01-31" },
  "title": "Custom Monthly Report",
  "customFilters": { "platform": "google_ads" }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check `MONGODB_URI` in `.env.local`
   - Ensure MongoDB is running
   - Verify network connectivity

2. **Seeding Fails**
   - Clear existing data: `db.dropDatabase()`
   - Check bcrypt installation
   - Verify environment variables

3. **API Authentication Issues**
   - Check `NEXTAUTH_SECRET` configuration
   - Verify session cookie settings
   - Ensure proper user roles

### Debug Mode
Enable detailed logging:
```env
DEBUG_API_CALLS=true
NODE_ENV=development
```

## 📝 Next Steps

1. **Real API Integration**: Configure actual Google Ads, Facebook Ads, and Google Analytics API credentials
2. **Production Deployment**: Set up MongoDB Atlas and configure production environment
3. **Monitoring**: Implement API monitoring and error tracking
4. **Testing**: Add unit and integration tests for all API endpoints
5. **Documentation**: Generate API documentation with OpenAPI/Swagger

## 🔄 Migration Status

### ✅ Completed
- MongoDB connection and schema setup
- User authentication system
- Client management APIs
- Dashboard data aggregation
- Campaign management
- Analytics data processing
- Chart generation
- Report system
- Sample data seeding

### 🔄 In Progress
- External API synchronization
- Advanced caching strategies
- Performance monitoring

### 📋 Pending
- Production deployment
- Real-time data updates
- Advanced reporting features
- Mobile app integration

---

For questions or support, contact the development team or check the project documentation.