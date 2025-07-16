/**
 * MongoDB Seed Script for NINETWODASH
 * Populates the database with sample data for development and testing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ninetwodash');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  avatar: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Client Schema
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  monthlyBudget: { type: Number, required: true },
  avatar: String,
  tags: [String],
  googleAds: {
    customerId: String,
    connected: { type: Boolean, default: false },
    lastSync: Date,
    encryptedCredentials: String
  },
  facebookAds: {
    adAccountId: String,
    pixelId: String,
    connected: { type: Boolean, default: false },
    lastSync: Date,
    encryptedCredentials: String
  },
  googleAnalytics: {
    propertyId: String,
    viewId: String,
    connected: { type: Boolean, default: false },
    lastSync: Date,
    encryptedCredentials: String
  },
  portalSettings: {
    logoUrl: String,
    primaryColor: { type: String, default: '#3B82F6' },
    secondaryColor: { type: String, default: '#8B5CF6' },
    allowedSections: { type: [String], default: ['dashboard', 'campaigns', 'analytics', 'charts', 'reports'] },
    customDomain: String
  },
  customCharts: [{
    id: String,
    name: String,
    type: { type: String, enum: ['line', 'bar', 'area', 'pie'] },
    metrics: [String],
    period: { type: String, enum: ['7d', '30d', '90d'], default: '30d' },
    groupBy: { type: String, enum: ['date', 'campaign', 'platform'], default: 'date' },
    filters: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Campaign Schema
const CampaignSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  campaignId: { type: String, required: true },
  campaignName: { type: String, required: true },
  platform: { type: String, enum: ['google_ads', 'facebook', 'meta'], required: true },
  status: { type: String, enum: ['active', 'paused', 'completed'], required: true },
  metrics: [{
    date: { type: Date, required: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 },
    cpc: { type: Number, default: 0 },
    cpm: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    roas: { type: Number, default: 0 }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Analytics Data Schema
const AnalyticsDataSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, required: true },
  sessions: { type: Number, default: 0 },
  users: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  pageviews: { type: Number, default: 0 },
  bounceRate: { type: Number, default: 0 },
  sessionDuration: { type: Number, default: 0 },
  trafficSources: [{
    source: String,
    medium: String,
    sessions: Number,
    users: Number,
    bounceRate: Number
  }],
  deviceData: [{
    deviceCategory: String,
    sessions: Number,
    users: Number,
    bounceRate: Number
  }],
  topPages: [{
    page: String,
    pageTitle: String,
    pageviews: Number,
    uniquePageviews: Number,
    bounceRate: Number,
    avgTimeOnPage: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', UserSchema);
const Client = mongoose.model('Client', ClientSchema);
const Campaign = mongoose.model('Campaign', CampaignSchema);
const AnalyticsData = mongoose.model('AnalyticsData', AnalyticsDataSchema);

// Sample data
const sampleClients = [
  {
    name: 'Catalisti Holding',
    email: 'contato@catalisti.com',
    slug: 'catalisti-holding',
    status: 'active',
    monthlyBudget: 15000,
    tags: ['holding', 'tecnologia', 'prioritario'],
    googleAds: { customerId: 'CAT123456', connected: true },
    facebookAds: { adAccountId: 'FB789012', connected: true },
    googleAnalytics: { propertyId: 'GA345678', connected: true }
  },
  {
    name: 'ABC EVO',
    email: 'contato@abcevo.com',
    slug: 'abc-evo',
    status: 'active',
    monthlyBudget: 8000,
    tags: ['educacao', 'online'],
    googleAds: { customerId: 'ABC123456', connected: true },
    facebookAds: { adAccountId: 'FB456789', connected: false }
  },
  {
    name: 'Dr. Victor Mauro',
    email: 'contato@drvictor.com',
    slug: 'dr-victor-mauro',
    status: 'active',
    monthlyBudget: 5000,
    tags: ['medicina', 'saude'],
    googleAds: { customerId: 'DRV123456', connected: true },
    facebookAds: { adAccountId: 'FB789123', connected: true }
  },
  {
    name: 'CWTrends',
    email: 'contato@cwtrends.com',
    slug: 'cwtrends',
    status: 'active',
    monthlyBudget: 12000,
    tags: ['marketing', 'trends'],
    googleAds: { customerId: 'CWT123456', connected: true },
    facebookAds: { adAccountId: 'FB234567', connected: true }
  },
  {
    name: 'Global Best Part',
    email: 'contato@globalbestpart.com',
    slug: 'global-best-part',
    status: 'active',
    monthlyBudget: 7000,
    tags: ['autopecas', 'global'],
    googleAds: { customerId: 'GBP123456', connected: false },
    facebookAds: { adAccountId: 'FB345678', connected: true }
  }
];

// Generate sample metrics for last 30 days
function generateSampleMetrics(days = 30) {
  const metrics = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const impressions = Math.floor(Math.random() * 5000) + 1000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const cost = clicks * (Math.random() * 15 + 5);
    const conversions = Math.floor(clicks * (Math.random() * 0.15 + 0.02));
    
    metrics.push({
      date,
      impressions,
      clicks,
      cost: Math.round(cost * 100) / 100,
      conversions,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? cost / clicks : 0,
      cpm: impressions > 0 ? (cost / impressions) * 1000 : 0,
      conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
      roas: cost > 0 ? conversions / cost : 0
    });
  }
  
  return metrics;
}

// Generate sample analytics data
function generateSampleAnalytics(days = 30) {
  const analytics = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const sessions = Math.floor(Math.random() * 1000) + 200;
    const users = Math.floor(sessions * (Math.random() * 0.8 + 0.6));
    const newUsers = Math.floor(users * (Math.random() * 0.4 + 0.3));
    const pageviews = Math.floor(sessions * (Math.random() * 3 + 1.5));
    
    analytics.push({
      date,
      sessions,
      users,
      newUsers,
      pageviews,
      bounceRate: Math.random() * 40 + 30,
      sessionDuration: Math.random() * 180 + 60,
      trafficSources: [
        { source: 'google', medium: 'organic', sessions: Math.floor(sessions * 0.4), users: Math.floor(users * 0.4), bounceRate: Math.random() * 20 + 40 },
        { source: 'facebook', medium: 'social', sessions: Math.floor(sessions * 0.3), users: Math.floor(users * 0.3), bounceRate: Math.random() * 30 + 35 },
        { source: 'direct', medium: '(none)', sessions: Math.floor(sessions * 0.2), users: Math.floor(users * 0.2), bounceRate: Math.random() * 15 + 25 },
        { source: 'google', medium: 'cpc', sessions: Math.floor(sessions * 0.1), users: Math.floor(users * 0.1), bounceRate: Math.random() * 25 + 30 }
      ],
      deviceData: [
        { deviceCategory: 'desktop', sessions: Math.floor(sessions * 0.5), users: Math.floor(users * 0.5), bounceRate: Math.random() * 20 + 35 },
        { deviceCategory: 'mobile', sessions: Math.floor(sessions * 0.4), users: Math.floor(users * 0.4), bounceRate: Math.random() * 25 + 40 },
        { deviceCategory: 'tablet', sessions: Math.floor(sessions * 0.1), users: Math.floor(users * 0.1), bounceRate: Math.random() * 30 + 45 }
      ],
      topPages: [
        { page: '/', pageTitle: 'Home', pageviews: Math.floor(pageviews * 0.3), uniquePageviews: Math.floor(pageviews * 0.25), bounceRate: Math.random() * 30 + 40, avgTimeOnPage: Math.random() * 120 + 60 },
        { page: '/servicos', pageTitle: 'Serviços', pageviews: Math.floor(pageviews * 0.2), uniquePageviews: Math.floor(pageviews * 0.18), bounceRate: Math.random() * 20 + 35, avgTimeOnPage: Math.random() * 150 + 80 },
        { page: '/contato', pageTitle: 'Contato', pageviews: Math.floor(pageviews * 0.15), uniquePageviews: Math.floor(pageviews * 0.13), bounceRate: Math.random() * 25 + 30, avgTimeOnPage: Math.random() * 100 + 50 }
      ]
    });
  }
  
  return analytics;
}

// Main seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Clear existing data
    await User.deleteMany({});
    await Client.deleteMany({});
    await Campaign.deleteMany({});
    await AnalyticsData.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      email: 'admin@ninetwodash.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true
    });
    console.log('👤 Created admin user');
    
    // Create clients
    const createdClients = [];
    for (const clientData of sampleClients) {
      const client = await Client.create(clientData);
      createdClients.push(client);
      console.log(`✅ Created client: ${client.name}`);
      
      // Create client user
      const clientPassword = await bcrypt.hash('client123', 10);
      await User.create({
        email: clientData.email,
        password: clientPassword,
        name: clientData.name,
        role: 'client',
        clientId: client._id,
        isActive: true
      });
      console.log(`👤 Created user for client: ${client.name}`);
    }
    
    // Create campaigns and analytics data for each client
    for (const client of createdClients) {
      // Create Google Ads campaigns
      if (client.googleAds.connected) {
        const googleCampaigns = [
          { campaignId: `google_${client.slug}_search`, campaignName: 'Search Campaign', platform: 'google_ads' },
          { campaignId: `google_${client.slug}_display`, campaignName: 'Display Campaign', platform: 'google_ads' }
        ];
        
        for (const campaignData of googleCampaigns) {
          await Campaign.create({
            clientId: client._id,
            ...campaignData,
            status: 'active',
            metrics: generateSampleMetrics(30)
          });
          console.log(`📊 Created Google Ads campaign for ${client.name}: ${campaignData.campaignName}`);
        }
      }
      
      // Create Facebook campaigns
      if (client.facebookAds.connected) {
        const facebookCampaigns = [
          { campaignId: `facebook_${client.slug}_awareness`, campaignName: 'Brand Awareness', platform: 'facebook' },
          { campaignId: `facebook_${client.slug}_conversion`, campaignName: 'Conversion Campaign', platform: 'facebook' }
        ];
        
        for (const campaignData of facebookCampaigns) {
          await Campaign.create({
            clientId: client._id,
            ...campaignData,
            status: 'active',
            metrics: generateSampleMetrics(30)
          });
          console.log(`📊 Created Facebook campaign for ${client.name}: ${campaignData.campaignName}`);
        }
      }
      
      // Create analytics data
      if (client.googleAnalytics.connected) {
        const analyticsData = generateSampleAnalytics(30);
        for (const dayData of analyticsData) {
          await AnalyticsData.create({
            clientId: client._id,
            ...dayData
          });
        }
        console.log(`📈 Created analytics data for ${client.name}`);
      }
    }
    
    console.log('🎉 Database seed completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Admin user: admin@ninetwodash.com (password: admin123)`);
    console.log(`- ${createdClients.length} clients created`);
    console.log(`- ${createdClients.length} client users created (password: client123)`);
    console.log(`- Campaigns and analytics data populated for connected clients`);
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

// Run the seed
async function run() {
  await connectToDatabase();
  await seedDatabase();
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
  process.exit(0);
}

run();