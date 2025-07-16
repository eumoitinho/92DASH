# 📊 NINETWODASH - API Documentation

Documentação completa das APIs para integração frontend-backend do dashboard de marketing digital.

## 🔐 Autenticação

### Base URL
```
http://localhost:3000/api
```

### Headers Obrigatórios
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <JWT_TOKEN>" // Para rotas protegidas
}
```

---

## 📱 Authentication APIs

### 🔑 Login
```http
POST /api/auth/signin
```

**Body:**
```json
{
  "email": "admin@catalisti.com",
  "password": "admin123"
}
```

**Response Success (200):**
```json
{
  "user": {
    "id": "1",
    "email": "admin@catalisti.com",
    "name": "Admin Catalisti",
    "role": "admin",
    "clientId": null,
    "clientSlug": null,
    "avatar": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🚪 Logout
```http
POST /api/auth/signout
```

---

## 👥 Admin APIs

### 📋 **GET** `/api/admin/clients`
Lista todos os clientes da agência.

**Query Parameters:**
- `limit` (opcional): Limitar número de resultados

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Empresa ABC",
      "email": "contato@empresaabc.com",
      "slug": "empresa-abc",
      "status": "active",
      "monthlyBudget": 5000,
      "avatar": "/uploads/avatar.jpg",
      "tags": ["e-commerce", "fashion"],
      "googleAds": {
        "connected": true,
        "customerId": "123-456-7890",
        "lastSync": "2025-01-15T10:30:00Z"
      },
      "facebookAds": {
        "connected": false,
        "adAccountId": null,
        "lastSync": null
      },
      "googleAnalytics": {
        "connected": true,
        "propertyId": "GA4-123456789",
        "lastSync": "2025-01-15T10:30:00Z"
      },
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-15T10:30:00Z"
    }
  ],
  "message": "5 clientes encontrados",
  "timestamp": "2025-01-16T14:30:00Z"
}
```

### 📊 **GET** `/api/admin/dashboard/stats`
Estatísticas gerais da agência.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalClients": 15,
    "activeClients": 12,
    "totalRevenue": 150000,
    "avgConversionRate": 3.5,
    "totalSpend": 75000,
    "totalConversions": 2500,
    "monthlyBudget": 85000,
    "platformConnections": {
      "googleAds": 10,
      "facebookAds": 8,
      "googleAnalytics": 12
    }
  },
  "message": "Estatísticas carregadas",
  "timestamp": "2025-01-16T14:30:00Z"
}
```

### 💰 **GET** `/api/admin/budgets`
Lista orçamentos dos clientes.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "clientId": "507f1f77bcf86cd799439011",
      "clientName": "Empresa ABC",
      "monthlyBudget": 5000,
      "currentSpend": 3200,
      "remaining": 1800,
      "utilizationPercentage": 64,
      "status": "on_track"
    }
  ]
}
```

### 🏷️ **GET** `/api/admin/tags`
Lista todas as tags disponíveis.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "e-commerce",
      "color": "#3B82F6",
      "clientCount": 5
    },
    {
      "_id": "507f1f77bcf86cd799439013", 
      "name": "fashion",
      "color": "#8B5CF6",
      "clientCount": 3
    }
  ]
}
```

---

## 🏢 Client Management APIs

### ➕ **POST** `/api/admin/clients`
Criar novo cliente.

**Body:**
```json
{
  "name": "Nova Empresa",
  "email": "contato@novaempresa.com",
  "slug": "nova-empresa",
  "monthlyBudget": 3000,
  "tags": ["technology", "startup"],
  "portalSettings": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#8B5CF6",
    "allowedSections": ["dashboard", "campaigns", "analytics"]
  }
}
```

### ✏️ **PUT** `/api/admin/clients/[clientId]`
Atualizar cliente existente.

### 🔗 **POST** `/api/admin/clients/[clientId]/connection`
Atualizar status de conexão das plataformas.

**Body:**
```json
{
  "platform": "googleAds", // googleAds | facebookAds | googleAnalytics
  "connected": true,
  "lastSync": "2025-01-16T14:30:00Z",
  "connectionData": {
    "customerId": "123-456-7890"
  }
}
```

### 🔐 **POST** `/api/admin/clients/[clientId]/credentials`
Salvar credenciais de API (criptografadas).

**Body:**
```json
{
  "platform": "googleAds",
  "credentials": {
    "developerId": "123456789",
    "clientId": "client-id.googleusercontent.com",
    "clientSecret": "GOCSPX-secret",
    "refreshToken": "1//refresh-token",
    "customerId": "123-456-7890"
  }
}
```

### 🧪 **POST** `/api/admin/clients/[clientId]/test-connections`
Testar conexões de todas as plataformas.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "googleAds": true,
    "facebookAds": false,
    "googleAnalytics": true
  }
}
```

---

## 📈 Analytics & Data APIs

### 📊 **GET** `/api/dashboard/[client]`
Dashboard consolidado de um cliente específico.

**Query Parameters:**
- `period`: "7d" | "30d" | "90d"

**Response (200):**
```json
{
  "success": true,
  "data": {
    "client": {
      "name": "Empresa ABC",
      "slug": "empresa-abc"
    },
    "summary": {
      "totalImpressions": 125000,
      "totalClicks": 3500,
      "totalCost": 2800,
      "totalConversions": 89,
      "averageCTR": 2.8,
      "averageCPC": 0.80,
      "averageConversionRate": 2.54,
      "totalROAS": 4.2
    },
    "platforms": [
      {
        "platform": "google_ads",
        "metrics": {
          "impressions": 85000,
          "clicks": 2400,
          "cost": 1920,
          "conversions": 65,
          "ctr": 2.82,
          "cpc": 0.80,
          "conversionRate": 2.71
        }
      }
    ],
    "campaigns": [
      {
        "campaignId": "12345",
        "campaignName": "Campanha Verão 2025",
        "platform": "google_ads",
        "status": "active",
        "date": "2025-01-15",
        "metrics": {
          "impressions": 5500,
          "clicks": 165,
          "cost": 132,
          "conversions": 4,
          "ctr": 3.0,
          "cpc": 0.80,
          "conversionRate": 2.42
        }
      }
    ]
  },
  "timestamp": "2025-01-16T14:30:00Z"
}
```

### 📊 **GET** `/api/analytics/[client]`
Dados detalhados do Google Analytics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sessions": 8500,
    "users": 6200,
    "newUsers": 3800,
    "pageviews": 25400,
    "bounceRate": 45.2,
    "sessionDuration": 185,
    "trafficSources": [
      {
        "source": "google",
        "medium": "organic",
        "sessions": 3400,
        "users": 2800,
        "bounceRate": 42.1
      },
      {
        "source": "google",
        "medium": "cpc",
        "sessions": 2100,
        "users": 1850,
        "bounceRate": 38.5
      }
    ],
    "topPages": [
      {
        "page": "/produtos",
        "pageTitle": "Nossos Produtos",
        "pageviews": 5600,
        "uniquePageviews": 4200,
        "avgTimeOnPage": 215
      }
    ]
  }
}
```

### 🎯 **GET** `/api/campaigns/[client]`
Lista campanhas de um cliente.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "campaignId": "12345",
      "campaignName": "Campanha Verão 2025",
      "platform": "google_ads",
      "status": "active",
      "metrics": [
        {
          "date": "2025-01-15T00:00:00Z",
          "impressions": 5500,
          "clicks": 165,
          "cost": 132,
          "conversions": 4,
          "ctr": 3.0,
          "cpc": 0.80,
          "cpm": 24.0,
          "conversionRate": 2.42,
          "roas": 4.5
        }
      ]
    }
  ]
}
```

### 📈 **GET** `/api/charts/[client]`
Dados para gráficos dinâmicos.

**Query Parameters:**
- `type`: "line" | "bar" | "area" | "pie"
- `metric`: "impressions" | "clicks" | "cost" | "conversions"
- `period`: "7d" | "30d" | "90d"

**Response (200):**
```json
{
  "success": true,
  "data": {
    "chartType": "line",
    "metric": "impressions",
    "series": [
      {
        "name": "Google Ads",
        "data": [5500, 6200, 4800, 7100, 5900, 6400, 5800]
      },
      {
        "name": "Facebook Ads", 
        "data": [3200, 3800, 2900, 4100, 3500, 3700, 3300]
      }
    ],
    "categories": ["2025-01-09", "2025-01-10", "2025-01-11", "2025-01-12", "2025-01-13", "2025-01-14", "2025-01-15"],
    "totalValue": 42800
  }
}
```

---

## 📄 Reports APIs

### 📋 **GET** `/api/reports/[client]`
Lista relatórios de um cliente.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Relatório Mensal - Janeiro 2025",
      "type": "monthly",
      "period": {
        "from": "2025-01-01T00:00:00Z",
        "to": "2025-01-31T23:59:59Z"
      },
      "summary": {
        "totalImpressions": 450000,
        "totalClicks": 12500,
        "totalCost": 8500,
        "totalConversions": 285
      },
      "generatedBy": "507f1f77bcf86cd799439001",
      "isShared": true,
      "createdAt": "2025-02-01T09:00:00Z"
    }
  ]
}
```

### 📄 **POST** `/api/reports/[client]`
Gerar novo relatório.

**Body:**
```json
{
  "title": "Relatório Semanal",
  "type": "weekly",
  "period": {
    "from": "2025-01-09T00:00:00Z",
    "to": "2025-01-15T23:59:59Z"
  },
  "includeCharts": true,
  "format": "pdf"
}
```

---

## ⚙️ Settings APIs

### 🔧 **GET** `/api/settings/[client]`
Configurações do cliente.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "portalSettings": {
      "logoUrl": "/uploads/client-logo.png",
      "primaryColor": "#3B82F6",
      "secondaryColor": "#8B5CF6",
      "allowedSections": ["dashboard", "campaigns", "analytics", "charts", "reports"],
      "customDomain": "dashboard.empresaabc.com"
    },
    "integrations": {
      "googleAds": {
        "connected": true,
        "customerId": "123-456-7890",
        "lastSync": "2025-01-15T10:30:00Z"
      },
      "facebookAds": {
        "connected": false,
        "adAccountId": null,
        "lastSync": null
      },
      "googleAnalytics": {
        "connected": true,
        "propertyId": "GA4-123456789",
        "lastSync": "2025-01-15T10:30:00Z"
      }
    }
  }
}
```

### 💾 **PUT** `/api/settings/[client]`
Atualizar configurações do cliente.

---

## 🔌 Connection Testing APIs

### 🧪 **POST** `/api/test-connection/googleAds`
Testar conexão Google Ads.

**Body:**
```json
{
  "clientSlug": "empresa-abc"
}
```

**Response (200):**
```json
{
  "success": true,
  "connected": true,
  "data": {
    "customerId": "123-456-7890",
    "accountName": "Empresa ABC - Google Ads",
    "currency": "BRL",
    "timezone": "America/Sao_Paulo"
  }
}
```

### 🧪 **POST** `/api/test-connection/facebookAds`
Testar conexão Facebook Ads.

### 🧪 **POST** `/api/test-connection/googleAnalytics`
Testar conexão Google Analytics.

---

## 🔐 Portal Client APIs

### 🏠 **GET** `/api/clients/[slug]`
Dados do portal do cliente (acesso restrito).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "client": {
      "name": "Empresa ABC",
      "slug": "empresa-abc",
      "avatar": "/uploads/avatar.jpg"
    },
    "portalSettings": {
      "primaryColor": "#3B82F6",
      "allowedSections": ["dashboard", "campaigns", "analytics"]
    },
    "permissions": {
      "canViewCampaigns": true,
      "canViewAnalytics": true,
      "canViewReports": true,
      "canEditSettings": false
    }
  }
}
```

---

## 📊 Data Models

### Client Model
```typescript
interface Client {
  _id: string;
  name: string;
  email: string;
  slug: string;
  status: 'active' | 'inactive' | 'pending';
  monthlyBudget: number;
  avatar?: string;
  tags: string[];
  
  googleAds: {
    customerId?: string;
    connected: boolean;
    lastSync?: Date;
    encryptedCredentials?: string;
  };
  
  facebookAds: {
    adAccountId?: string;
    pixelId?: string;
    connected: boolean;
    lastSync?: Date;
    encryptedCredentials?: string;
  };
  
  googleAnalytics: {
    propertyId?: string;
    viewId?: string;
    connected: boolean;
    lastSync?: Date;
    encryptedCredentials?: string;
  };
  
  portalSettings: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    allowedSections: string[];
    customDomain?: string;
  };
  
  customCharts: CustomChart[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Campaign Model
```typescript
interface Campaign {
  _id: string;
  clientId: string;
  campaignId: string;
  campaignName: string;
  platform: 'google_ads' | 'facebook' | 'meta';
  status: 'active' | 'paused' | 'completed';
  
  metrics: {
    date: Date;
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpm: number;
    conversionRate: number;
    roas: number;
  }[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Report Model
```typescript
interface Report {
  _id: string;
  clientId: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  
  period: {
    from: Date;
    to: Date;
  };
  
  summary: {
    totalImpressions: number;
    totalClicks: number;
    totalCost: number;
    totalConversions: number;
    averageCTR: number;
    averageCPC: number;
    averageCPM: number;
    averageConversionRate: number;
    totalROAS: number;
  };
  
  platforms: PlatformMetrics[];
  charts: ChartData;
  generatedBy: string;
  isShared: boolean;
  createdAt: Date;
}
```

---

## 🚫 Error Responses

### Formato Padrão de Erro
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Descrição detalhada do erro",
  "timestamp": "2025-01-16T14:30:00Z"
}
```

### Códigos de Erro Comuns
- `UNAUTHORIZED` (401): Token inválido ou expirado
- `FORBIDDEN` (403): Sem permissão para acessar recurso
- `NOT_FOUND` (404): Recurso não encontrado
- `VALIDATION_ERROR` (422): Dados inválidos
- `RATE_LIMIT_EXCEEDED` (429): Muitas requisições
- `INTERNAL_SERVER_ERROR` (500): Erro interno do servidor

---

## 🔄 Frontend Integration Examples

### Fetch Client List (React)
```javascript
const fetchClients = async () => {
  try {
    const response = await fetch('/api/admin/clients', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      setClients(data.data);
    }
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
};
```

### Update Connection Status
```javascript
const updateConnectionStatus = async (clientId, platform, connected) => {
  try {
    const response = await fetch(`/api/admin/clients/${clientId}/connection`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platform,
        connected,
        lastSync: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Erro ao atualizar conexão:', error);
    return false;
  }
};
```

### Generate Chart Data
```javascript
const fetchChartData = async (clientSlug, type, metric, period) => {
  try {
    const params = new URLSearchParams({ type, metric, period });
    const response = await fetch(`/api/charts/${clientSlug}?${params}`);
    const data = await response.json();
    
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Erro ao carregar dados do gráfico:', error);
    return null;
  }
};
```

---

## 📋 Status Codes & Best Practices

### HTTP Status Codes
- **200**: Sucesso
- **201**: Recurso criado
- **400**: Requisição inválida
- **401**: Não autenticado
- **403**: Sem permissão
- **404**: Não encontrado
- **422**: Dados inválidos
- **500**: Erro interno

### Frontend Best Practices
1. **Sempre verificar `data.success`** antes de processar dados
2. **Implementar loading states** durante requisições
3. **Tratar erros adequadamente** com mensagens user-friendly
4. **Usar cache local** para dados que não mudam frequentemente
5. **Implementar retry logic** para requisições críticas
6. **Validar dados** no frontend antes de enviar

---

## 🔒 Security Notes

- Todas as credenciais de API são **criptografadas** antes do armazenamento
- Tokens JWT expiram em **24 horas**
- Rate limiting implementado em **todas as rotas**
- Logs de auditoria para **ações sensíveis**
- Validação de input em **todas as requisições**

---

**📞 Suporte:** Para dúvidas sobre integração, consulte o time de desenvolvimento ou abra uma issue no repositório.