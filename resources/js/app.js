import './bootstrap';
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  User,
  Shield,
  HeadphonesIcon,
  Package,
  UserX,
  Plus,
  Truck,
  History,
  Store,
  Edit,
  Menu,
  CreditCard,
  TrendingUp,
} from "lucide-react"

// Mock data
const mockClients = [
  { id: 1, name: "Jean Dupont", phone: "0123456789", email: "jean@email.com", score: 85, status: "good" },
  { id: 2, name: "Marie Martin", phone: "0987654321", email: "marie@email.com", score: 45, status: "risk" },
  { id: 3, name: "Pierre Durand", phone: "0147258369", email: "pierre@email.com", score: 20, status: "danger" },
]

const mockBlacklist = [
  {
    id: 1,
    name: "Client Fraudeur",
    phone: "0666666666",
    email: "fraud@email.com",
    reason: "Fraude confirmée",
    dateAdded: "2024-01-01",
  },
  {
    id: 2,
    name: "Mauvais Payeur",
    phone: "0555555555",
    email: "bad@email.com",
    reason: "Impayés répétés",
    dateAdded: "2024-01-02",
  },
]

const mockOrders = [
  {
    id: 1,
    orderNumber: "CMD-2024-001",
    clientName: "Marie Dubois",
    clientId: "CLI-001",
    product: "Smartphone Samsung Galaxy",
    amount: 650,
    score: 85,
    status: "confirmed" as const,
    orderDate: "2024-01-15",
    deliveryCompany: "DHL Express",
    deliveryStatus: "delivered" as const,
  },
  {
    id: 2,
    orderNumber: "CMD-2024-002",
    clientName: "Pierre Martin",
    clientId: "CLI-002",
    product: "Ordinateur portable Dell",
    amount: 1200,
    score: 45,
    status: "cancelled" as const,
    orderDate: "2024-01-14",
    deliveryCompany: "Chronopost",
    deliveryStatus: "not_delivered" as const,
  },
  {
    id: 3,
    orderNumber: "CMD-2024-003",
    clientName: "Sophie Laurent",
    clientId: "CLI-003",
    product: "Tablette iPad Pro",
    amount: 800,
    score: 92,
    status: "no_response" as const,
    orderDate: "2024-01-13",
    deliveryCompany: "Colissimo",
    deliveryStatus: "pending" as const,
  },
  {
    id: 4,
    orderNumber: "CMD-2024-004",
    clientName: "Jean Moreau",
    clientId: "CLI-004",
    product: "Casque audio Bose",
    amount: 350,
    score: 25,
    status: "postponed" as const,
    orderDate: "2024-01-12",
    deliveryCompany: "UPS Standard",
    deliveryStatus: "pending" as const,
  },
]

const mockMerchants = [
  { id: 1, name: "Boutique Mode", email: "mode@shop.com", subscription: "premium", status: "active" },
  { id: 2, name: "Électro Store", email: "electro@shop.com", subscription: "basic", status: "active" },
  { id: 3, name: "Librairie Central", email: "livre@shop.com", subscription: "premium", status: "suspended" },
]

const deliveryCompanies = [
  {
    id: 1,
    name: "Ozon Express",
    price: "25 DH",
    delay: "24-48h",
    logo: "/ozon-express-morocco-logo.png",
  },
  {
    id: 2,
    name: "Amana Express",
    price: "30 DH",
    delay: "24-72h",
    logo: "/amana-express-morocco-logo.png",
  },
  {
    id: 3,
    name: "Colis Privé",
    price: "28 DH",
    delay: "48-72h",
    logo: "/colis-prive-morocco-logo.png",
  },
  {
    id: 4,
    name: "CTM Messagerie",
    price: "35 DH",
    delay: "24-48h",
    logo: "/ctm-messagerie-morocco-logo.png",
  },
  {
    id: 5,
    name: "Jumia Express",
    price: "22 DH",
    delay: "48-96h",
    logo: "/jumia-express-morocco-logo.png",
  },
  {
    id: 6,
    name: "Glovo Express",
    price: "40 DH",
    delay: "2-6h",
    logo: "/glovo-express-morocco-logo.png",
  },
]

const mockDeliveryApiConfigs = [
  {
    id: 1,
    companyId: 1,
    companyName: "Ozon Express",
    apiUrl: "https://api.ozonexpress.ma/v1",
    apiKey: "ozon_api_key_123",
    username: "merchant_ozon",
    password: "••••••••",
    trackingEnabled: true,
    labelPrintEnabled: true,
    status: "active",
    logo: "/ozon-express-morocco-logo.png",
  },
  {
    id: 2,
    companyId: 2,
    companyName: "Amana Express",
    apiUrl: "https://api.amanaexpress.ma/v1",
    apiKey: "amana_api_key_456",
    username: "merchant_amana",
    password: "••••••••",
    trackingEnabled: true,
    labelPrintEnabled: false,
    status: "active",
    logo: "/amana-express-morocco-logo.png",
  },
  {
    id: 3,
    companyId: 3,
    companyName: "CTM Messagerie",
    apiUrl: "https://api.ctm.ma/delivery/v1",
    apiKey: "ctm_api_key_789",
    username: "merchant_ctm",
    password: "••••••••",
    trackingEnabled: false,
    labelPrintEnabled: true,
    status: "inactive",
    logo: "/ctm-messagerie-morocco-logo.png",
  },
]

const orderStatusConfig = {
  confirmed: { label: "Confirmé", color: "text-green-700" },
  cancelled: { label: "Annulé", color: "text-red-700" },
  no_response: { label: "Pas de réponse", color: "text-gray-700" },
  postponed: { label: "Reporté", color: "text-orange-700" },
}

const deliveryStatusConfig = {
  delivered: { label: "Livrée", color: "text-blue-700" },
  not_delivered: { label: "Non livrée", color: "text-purple-700" },
  pending: { label: "En attente", color: "text-yellow-700" },
}

const mockClientHistory = {
  "0666666666": {
    name: "Client Fraudeur",
    phone: "0666666666",
    score: 15,
    deliveredOrders: 2,
    undeliveredOrders: 8,
    refusedOrders: 12,
    lastDeliveryDate: "2023-11-15",
    totalOrders: 22,
    orderHistory: [
      { date: "2024-01-10", status: "refused", amount: 450 },
      { date: "2023-12-20", status: "undelivered", amount: 320 },
      { date: "2023-11-15", status: "delivered", amount: 180 },
    ],
  },
  "0555555555": {
    name: "Mauvais Payeur",
    phone: "0555555555",
    score: 25,
    deliveredOrders: 5,
    undeliveredOrders: 3,
    refusedOrders: 7,
    lastDeliveryDate: "2023-12-28",
    totalOrders: 15,
    orderHistory: [
      { date: "2024-01-08", status: "refused", amount: 680 },
      { date: "2023-12-28", status: "delivered", amount: 250 },
      { date: "2023-12-15", status: "undelivered", amount: 420 },
    ],
  },
}

interface Order {
  id: number
  status: keyof typeof orderStatusConfig
  deliveryStatus: keyof typeof deliveryStatusConfig
}

function OrderStatusSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Statut commande" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(orderStatusConfig).map(([key, config]) => (
          <SelectItem key={key} value={key} className={config.color}>
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function DeliveryStatusSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Statut livraison" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(deliveryStatusConfig).map(([key, config]) => (
          <SelectItem key={key} value={key} className={config.color}>
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function updateOrderStatus(orders: any[], orderId: number, newStatus: string) {
  return orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as any } : order))
}

function updateDeliveryStatus(orders: any[], orderId: number, newDeliveryStatus: string) {
  return orders.map((order) => (order.id === orderId ? { ...order, deliveryStatus: newDeliveryStatus as any } : order))
}

export default function OrderManagementDemo() {
  const [currentRole, setCurrentRole] = useState<"merchant" | "admin" | "support">("merchant")
  const [searchClient, setSearchClient] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [orders, setOrders] = useState(mockOrders)
  const [blacklist, setBlacklist] = useState(mockBlacklist)
  const [merchants, setMerchants] = useState(mockMerchants)
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")
  const [profileForm, setProfileForm] = useState({
    name: "Mohammed Alami",
    email: "m.alami@boutique.ma",
    phone: "0661234567",
    company: "Boutique Alami",
    address: "123 Rue Hassan II, Casablanca",
  })
  const [newBlacklistEntry, setNewBlacklistEntry] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
  })

  const [historyPhone, setHistoryPhone] = useState("")
  const [clientHistory, setClientHistory] = useState<any>(null)
  const [newOrderForm, setNewOrderForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    orderAmount: "",
    orderDescription: "",
    deliveryCompany: "",
  })

  const [deliveryConfigForm, setDeliveryConfigForm] = useState({
    companyName: "",
    apiUrl: "",
    apiKey: "",
    username: "",
    password: "",
    trackingEnabled: false,
    labelPrintEnabled: false,
    notificationEnabled: false,
  })

  const [marketplaceForm, setMarketplaceForm] = useState({
    platform: "",
    step: 1,
    shopName: "",
    apiKey: "",
    apiSecret: "",
    webhookUrl: "",
    storeUrl: "",
  })

  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 1,
      platform: "Shopify",
      storeName: "Ma Boutique Test",
      status: "Connecté",
      webhookUrl: "https://api.monapp.com/webhook/shopify/orders",
      lastSync: "2024-01-15 14:30",
    },
  ])

  const platforms = [
    { name: "Shopify", logo: "/shopify-logo.png", color: "bg-green-50" },
    { name: "YouCan", logo: "/youcan-ecommerce-logo.png", color: "bg-blue-50" },
    { name: "WooCommerce", logo: "/woocommerce-logo.png", color: "bg-purple-50" },
    { name: "PrestaShop", logo: "/prestashop-logo.png", color: "bg-pink-50" },
    { name: "Magento", logo: "/magento-logo.png", color: "bg-orange-50" },
  ]

  const [subscriptionForm, setSubscriptionForm] = useState({
    plan: "basic",
    billingCycle: "monthly",
    features: [] as string[],
  })

  const handleMarketplaceConnect = () => {
    if (marketplaceForm.step < 3) {
      setMarketplaceForm({ ...marketplaceForm, step: marketplaceForm.step + 1 })
    } else {
      // Simulate connection
      const newConnection = {
        id: connectedPlatforms.length + 1,
        platform: marketplaceForm.platform,
        storeName: marketplaceForm.shopName,
        status: "Connecté",
        webhookUrl: marketplaceForm.webhookUrl,
        lastSync: new Date().toLocaleString("fr-FR"),
      }
      setConnectedPlatforms([...connectedPlatforms, newConnection])
      setMarketplaceForm({
        platform: "",
        step: 1,
        shopName: "",
        apiKey: "",
        apiSecret: "",
        webhookUrl: "",
        storeUrl: "",
      })
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-100 text-green-800">Bon client</Badge>
    if (score >= 40) return <Badge className="bg-orange-100 text-orange-800">Risque modéré</Badge>
    return <Badge className="bg-red-100 text-red-800">Risque élevé</Badge>
  }

  const getRecommendation = (score: number) => {
    if (score >= 70) return { text: "Accepter conseillé", color: "text-green-600", icon: CheckCircle }
    if (score >= 40) return { text: "Prudence recommandée", color: "text-orange-600", icon: AlertTriangle }
    return { text: "Rejet conseillé", color: "text-red-600", icon: XCircle }
  }

  const handleOrderDecision = (orderId: number, decision: "accepted" | "rejected") => {
    setOrders(updateOrderStatus(orders, orderId, decision))
  }

  const searchClientByInfo = () => {
    const client = mockClients.find(
      (c) =>
        c.name.toLowerCase().includes(searchClient.toLowerCase()) ||
        c.phone.includes(searchClient) ||
        c.email.toLowerCase().includes(searchClient.toLowerCase()),
    )
    setSelectedClient(client || null)
  }

  const searchClientHistory = () => {
    const history = mockClientHistory[historyPhone as keyof typeof mockClientHistory]
    setClientHistory(history || null)
  }

  const getNavigationItems = () => {
    switch (currentRole) {
      case "merchant":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "orders", label: "Commandes", icon: Package },
          { id: "blacklist", label: "Liste Noire", icon: UserX },
          { id: "new-order", label: "Nouvelle Commande", icon: Plus },
          { id: "delivery-config", label: "Config Livraison", icon: Truck },
          { id: "client-history", label: "Historique Client", icon: History },
          { id: "marketplace", label: "Marketplace", icon: Store },
          { id: "subscription", label: "Mon Abonnement", icon: CreditCard },
        ]
      case "admin":
        return [
          { id: "merchants", label: "Commerçants", icon: Users },
          { id: "blacklist-admin", label: "Liste Noire", icon: UserX },
          { id: "metrics", label: "Métriques", icon: BarChart3 },
          { id: "system", label: "Système", icon: Settings },
          { id: "subscriptions-admin", label: "Gestion Abonnements", icon: CreditCard },
          { id: "clients-admin", label: "Gestion Clients", icon: Users },
        ]
      case "support":
        return [
          { id: "tickets", label: "Tickets Support", icon: HeadphonesIcon },
          { id: "merchant-help", label: "Assistance Commerçants", icon: Users },
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
              <Menu className="w-4 h-4" />
            </Button>
            {sidebarOpen && (
              <Select value={currentRole} onValueChange={(value: any) => setCurrentRole(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merchant">
                    <div className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Commerçant
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="support">
                    <div className="flex items-center">
                      <HeadphonesIcon className="w-4 h-4 mr-2" />
                      Support
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {sidebarOpen && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{profileForm.name}</p>
                    <p className="text-xs text-gray-500 truncate">{profileForm.email}</p>
                  </div>
                  <Edit className="w-4 h-4 text-gray-400" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Modifier le Profil</DialogTitle>
                  <DialogDescription>Mettez à jour vos informations personnelles</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Nom complet</Label>
                    <Input
                      id="profile-name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-email">Email</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-phone">Téléphone</Label>
                    <Input
                      id="profile-phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-company">Entreprise</Label>
                    <Input
                      id="profile-company"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-address">Adresse</Label>
                    <Textarea
                      id="profile-address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    />
                  </div>
                  <Button className="w-full">Sauvegarder</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {getNavigationItems().map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Système de Gestion des Commandes</h1>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Merchant Interface */}
          {currentRole === "merchant" && (
            <div className="space-y-6">
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <Package className="h-8 w-8 text-blue-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Commandes</p>
                            <p className="text-2xl font-bold text-gray-900">1,247</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Confirmées</p>
                            <p className="text-2xl font-bold text-green-600">892</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <XCircle className="h-8 w-8 text-red-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Annulées</p>
                            <p className="text-2xl font-bold text-red-600">156</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <Truck className="h-8 w-8 text-blue-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Livrées</p>
                            <p className="text-2xl font-bold text-blue-600">743</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <AlertTriangle className="h-8 w-8 text-orange-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Non Livrées</p>
                            <p className="text-2xl font-bold text-orange-600">149</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Revenue Card */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
                          <p className="text-3xl font-bold text-green-600">127,450 MAD</p>
                          <p className="text-sm text-gray-500">+12.5% par rapport au mois dernier</p>
                        </div>
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Delivery Status Pie Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Statut des Livraisons</CardTitle>
                        <CardDescription>Répartition des commandes livrées vs non livrées</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-48 h-48 rounded-full border-8 border-blue-200 relative overflow-hidden">
                              <div 
                                className="absolute inset-0 bg-blue-600 rounded-full"
                                style={{
                                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 83.3%, 50% 50%)'
                                }}
                              ></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold">83.3%</div>
                                <div className="text-sm text-gray-600">Livrées</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center space-x-6 mt-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                            <span className="text-sm">Livrées (743)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-200 rounded-full mr-2"></div>
                            <span className="text-sm">Non Livrées (149)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Orders by City */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Commandes par Ville</CardTitle>
                        <CardDescription>Nombre de commandes par ville</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { city: "Casablanca", orders: 387, percentage: 31 },
                            { city: "Rabat", orders: 298, percentage: 24 },
                            { city: "Marrakech", orders: 234, percentage: 19 },
                            { city: "Fès", orders: 156, percentage: 13 },
                            { city: "Tanger", orders: 98, percentage: 8 },
                            { city: "Autres", orders: 74, percentage: 5 }
                          ].map((item) => (
                            <div key={item.city} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                <span className="font-medium">{item.city}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${item.percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium w-12 text-right">{item.orders}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Monthly Trend Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution Mensuelle</CardTitle>
                      <CardDescription>Nombre de commandes par mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <div className="flex items-end justify-between h-48 px-4">
                          {[
                            { month: "Jan", orders: 89 },
                            { month: "Fév", orders: 112 },
                            { month: "Mar", orders: 134 },
                            { month: "Avr", orders: 98 },
                            { month: "Mai", orders: 156 },
                            { month: "Jun", orders: 187 },
                            { month: "Jul", orders: 203 },
                            { month: "Aoû", orders: 178 },
                            { month: "Sep", orders: 165 },
                            { month: "Oct", orders: 189 },
                            { month: "Nov", orders: 234 },
                            { month: "Déc", orders: 198 }
                          ].map((item, index) => (
                            <div key={item.month} className="flex flex-col items-center">
                              <div 
                                className="bg-blue-600 w-8 rounded-t"
                                style={{ height: `${(item.orders / 250) * 100}%` }}
                              ></div>
                              <span className="text-xs mt-2 text-gray-600">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des Commandes</CardTitle>
                    <CardDescription>Suivez et gérez vos commandes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>N° Commande</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Client ID</TableHead>
                          <TableHead>Produit</TableHead>
                          <TableHead>Statut Commande</TableHead>
                          <TableHead>Statut Livraison</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.clientId}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(value) => {
                                  setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: value } : o)))
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="confirmed">
                                    <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
                                  </SelectItem>
                                  <SelectItem value="cancelled">
                                    <Badge className="bg-red-100 text-red-800">Annulé</Badge>
                                  </SelectItem>
                                  <SelectItem value="no_response">
                                    <Badge className="bg-yellow-100 text-yellow-800">Pas de réponse</Badge>
                                  </SelectItem>
                                  <SelectItem value="postponed">
                                    <Badge className="bg-orange-100 text-orange-800">Reporté</Badge>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={order.deliveryStatus}
                                onValueChange={(value) => {
                                  setOrders(
                                    orders.map((o) => (o.id === order.id ? { ...o, deliveryStatus: value } : o)),
                                  )
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="delivered">
                                    <Badge className="bg-blue-100 text-blue-800">Livrée</Badge>
                                  </SelectItem>
                                  <SelectItem value="not_delivered">
                                    <Badge className="bg-purple-100 text-purple-800">Non livrée</Badge>
                                  </SelectItem>
                                  <SelectItem value="pending">
                                    <Badge className="bg-gray-100 text-gray-800">En attente</Badge>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {activeTab === "score-check" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recherche Client</CardTitle>
                    <CardDescription>Entrez le nom, téléphone ou email du client</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Nom, téléphone ou email..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={searchClientByInfo}>Rechercher</Button>
                    </div>

                    {selectedClient && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            Informations Client
                            <Badge className={getScoreColor(selectedClient.score)}>
                              Score: {selectedClient.score}/100
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Nom</p>
                                <p className="font-medium">{selectedClient.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Téléphone</p>
                                <p className="font-medium">{selectedClient.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium">{selectedClient.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Statut</p>
                                <Badge className={getScoreColor(selectedClient.score)}>{selectedClient.status}</Badge>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-2">Recommandation du système</h4>
                              {(() => {
                                const rec = getRecommendation(selectedClient.score)
                                return (
                                  <>
                                    {rec.icon}
                                    <span className={`font-medium ${rec.color}`}>{rec.text}</span>
                                  </>
                                )
                              })()}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-4">
                            <Button
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleOrderDecision(selectedClient.id, "accepted")}
                            >
                              Accepter la commande
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleOrderDecision(selectedClient.id, "rejected")}
                            >
                              Rejeter la commande
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "blacklist" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Consultation Liste Noire
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Ajouter Client</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ajouter à la liste noire</DialogTitle>
                            <DialogDescription>Ajouter un client à la liste noire</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="merchant-bl-name">Nom</Label>
                              <Input
                                id="merchant-bl-name"
                                placeholder="Nom du client"
                                value={newBlacklistEntry.name}
                                onChange={(e) => setNewBlacklistEntry({ ...newBlacklistEntry, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="merchant-bl-phone">Téléphone</Label>
                              <Input
                                id="merchant-bl-phone"
                                placeholder="0123456789"
                                value={newBlacklistEntry.phone}
                                onChange={(e) => setNewBlacklistEntry({ ...newBlacklistEntry, phone: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="merchant-bl-email">Email</Label>
                              <Input
                                id="merchant-bl-email"
                                type="email"
                                placeholder="email@example.com"
                                value={newBlacklistEntry.email}
                                onChange={(e) => setNewBlacklistEntry({ ...newBlacklistEntry, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="merchant-bl-reason">Raison du blacklistage</Label>
                              <Textarea
                                id="merchant-bl-reason"
                                placeholder="Pourquoi ce client est-il ajouté à la liste noire ?"
                                value={newBlacklistEntry.reason}
                                onChange={(e) => setNewBlacklistEntry({ ...newBlacklistEntry, reason: e.target.value })}
                              />
                            </div>
                            <Button
                              className="w-full"
                              onClick={() => {
                                if (newBlacklistEntry.name && newBlacklistEntry.phone && newBlacklistEntry.reason) {
                                  const newEntry = {
                                    id: blacklist.length + 1,
                                    name: newBlacklistEntry.name,
                                    phone: newBlacklistEntry.phone,
                                    email: newBlacklistEntry.email,
                                    reason: newBlacklistEntry.reason,
                                    dateAdded: new Date().toISOString().split("T")[0],
                                  }
                                  setBlacklist([...blacklist, newEntry])
                                  setNewBlacklistEntry({ name: "", phone: "", email: "", reason: "" })
                                }
                              }}
                            >
                              Ajouter à la liste noire
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                    <CardDescription>Rechercher dans la liste des clients blacklistés</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Rechercher par nom, téléphone ou email..." />
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Raison</TableHead>
                          <TableHead>Date d'ajout</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blacklist.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.phone}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.reason}</TableCell>
                            <TableCell>{client.dateAdded}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {activeTab === "new-order" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Nouvelle Commande</CardTitle>
                    <CardDescription>Créer une commande manuellement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client-name">Nom du client</Label>
                        <Input
                          id="client-name"
                          placeholder="Nom complet"
                          value={newOrderForm.clientName}
                          onChange={(e) => setNewOrderForm({ ...newOrderForm, clientName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client-phone">Téléphone</Label>
                        <Input
                          id="client-phone"
                          placeholder="0123456789"
                          value={newOrderForm.clientPhone}
                          onChange={(e) => setNewOrderForm({ ...newOrderForm, clientPhone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client-email">Email</Label>
                        <Input
                          id="client-email"
                          type="email"
                          placeholder="email@example.com"
                          value={newOrderForm.clientEmail}
                          onChange={(e) => setNewOrderForm({ ...newOrderForm, clientEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="order-amount">Montant</Label>
                        <Input
                          id="order-amount"
                          type="number"
                          placeholder="150"
                          value={newOrderForm.orderAmount}
                          onChange={(e) => setNewOrderForm({ ...newOrderForm, orderAmount: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="order-description">Description</Label>
                      <Textarea
                        id="order-description"
                        placeholder="Description de la commande..."
                        value={newOrderForm.orderDescription}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, orderDescription: e.target.value })}
                      />
                    </div>

                    {/* Delivery company selection */}
                    <div>
                      <Label htmlFor="delivery-company">Agence de livraison</Label>
                      <div className="space-y-3 mt-2">
                        {deliveryCompanies.map((company) => (
                          <div
                            key={company.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              id={`delivery-${company.id}`}
                              name="delivery-company"
                              value={company.id}
                              checked={newOrderForm.deliveryCompany === company.id.toString()}
                              onChange={(e) => setNewOrderForm({ ...newOrderForm, deliveryCompany: e.target.value })}
                              className="w-4 h-4"
                            />
                            <img
                              src={company.logo || "/placeholder.svg"}
                              alt={`${company.name} logo`}
                              className="w-16 h-8 object-contain"
                            />
                            <div className="flex-1">
                              <Label htmlFor={`delivery-${company.id}`} className="font-medium cursor-pointer">
                                {company.name}
                              </Label>
                              <p className="text-sm text-gray-600">
                                {company.price} - Délai: {company.delay}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" disabled={!newOrderForm.deliveryCompany}>
                      Créer la commande
                    </Button>

                    {/* Display form data in real-time */}
                    {(newOrderForm.clientName ||
                      newOrderForm.clientPhone ||
                      newOrderForm.clientEmail ||
                      newOrderForm.orderAmount ||
                      newOrderForm.orderDescription) && (
                      <Card className="mt-4 bg-blue-50">
                        <CardHeader>
                          <CardTitle className="text-sm">Données du formulaire</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {newOrderForm.clientName && (
                            <p>
                              <strong>Nom:</strong> {newOrderForm.clientName}
                            </p>
                          )}
                          {newOrderForm.clientPhone && (
                            <p>
                              <strong>Téléphone:</strong> {newOrderForm.clientPhone}
                            </p>
                          )}
                          {newOrderForm.clientEmail && (
                            <p>
                              <strong>Email:</strong> {newOrderForm.clientEmail}
                            </p>
                          )}
                          {newOrderForm.orderAmount && (
                            <p>
                              <strong>Montant:</strong> {newOrderForm.orderAmount}€
                            </p>
                          )}
                          {newOrderForm.orderDescription && (
                            <p>
                              <strong>Description:</strong> {newOrderForm.orderDescription}
                            </p>
                          )}
                          {newOrderForm.deliveryCompany && (
                            <p>
                              <strong>Transporteur:</strong>{" "}
                              {deliveryCompanies.find((c) => c.id === Number.parseInt(newOrderForm.deliveryCompany))?.name}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Delivery configuration tab */}
              {activeTab === "delivery-config" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration des Agences de Livraison</CardTitle>
                    <CardDescription>
                      Gérer les intégrations API pour automatiser les actions de livraison
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current configurations */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Configurations existantes</h3>
                    </div>

                    {/* Add new configuration */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Ajouter une Nouvelle Configuration</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="config-company">Agence de livraison</Label>
                          <select
                            id="config-company"
                            className="w-full p-2 border rounded-md"
                            value={deliveryConfigForm.companyName}
                            onChange={(e) =>
                              setDeliveryConfigForm({ ...deliveryConfigForm, companyName: e.target.value })
                            }
                          >
                            <option value="">Sélectionner une agence</option>
                            <option value="Ozon Express">Ozon Express</option>
                            <option value="Amana Express">Amana Express</option>
                            <option value="Colis Privé">Colis Privé</option>
                            <option value="CTM Messagerie">CTM Messagerie</option>
                            <option value="Jumia Express">Jumia Express</option>
                            <option value="Glovo Express">Glovo Express</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="config-api-url">URL de l'API</Label>
                          <Input
                            id="config-api-url"
                            placeholder="https://api.transporteur.com/v1"
                            value={deliveryConfigForm.apiUrl}
                            onChange={(e) => setDeliveryConfigForm({ ...deliveryConfigForm, apiUrl: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="config-api-key">Clé API</Label>
                          <Input
                            id="config-api-key"
                            type="password"
                            placeholder="Votre clé API"
                            value={deliveryConfigForm.apiKey}
                            onChange={(e) => setDeliveryConfigForm({ ...deliveryConfigForm, apiKey: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="config-username">Nom d'utilisateur</Label>
                            <Input
                              id="config-username"
                              placeholder="Username"
                              value={deliveryConfigForm.username}
                              onChange={(e) =>
                                setDeliveryConfigForm({ ...deliveryConfigForm, username: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="config-password">Mot de passe</Label>
                            <Input
                              id="config-password"
                              type="password"
                              placeholder="Password"
                              value={deliveryConfigForm.password}
                              onChange={(e) =>
                                setDeliveryConfigForm({ ...deliveryConfigForm, password: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Options d'automatisation</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="tracking-enabled"
                              checked={deliveryConfigForm.trackingEnabled}
                              onChange={(e) =>
                                setDeliveryConfigForm({ ...deliveryConfigForm, trackingEnabled: e.target.checked })
                              }
                            />
                            <Label htmlFor="tracking-enabled">Suivi automatique des colis</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="label-enabled"
                              checked={deliveryConfigForm.labelPrintEnabled}
                              onChange={(e) =>
                                setDeliveryConfigForm({ ...deliveryConfigForm, labelPrintEnabled: e.target.checked })
                              }
                            />
                            <Label htmlFor="label-enabled">Impression automatique des étiquettes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="notification-enabled"
                              checked={deliveryConfigForm.notificationEnabled}
                              onChange={(e) =>
                                setDeliveryConfigForm({ ...deliveryConfigForm, notificationEnabled: e.target.checked })
                              }
                            />
                            <Label htmlFor="notification-enabled">Notifications clients automatiques</Label>
                          </div>
                        </div>

                        <Button className="w-full">Sauvegarder la configuration</Button>

                        {/* Display delivery config form data */}
                        {(deliveryConfigForm.companyName || deliveryConfigForm.apiUrl || deliveryConfigForm.apiKey) && (
                          <Card className="mt-4 bg-green-50">
                            <CardHeader>
                              <CardTitle className="text-sm">Configuration saisie</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {deliveryConfigForm.companyName && (
                                <p>
                                  <strong>Société:</strong> {deliveryConfigForm.companyName}
                                </p>
                              )}
                              {deliveryConfigForm.apiUrl && (
                                <p>
                                  <strong>URL API:</strong> {deliveryConfigForm.apiUrl}
                                </p>
                              )}
                              {deliveryConfigForm.apiKey && (
                                <p>
                                  <strong>Clé API:</strong> {"*".repeat(deliveryConfigForm.apiKey.length)}
                                </p>
                              )}
                              {deliveryConfigForm.username && (
                                <p>
                                  <strong>Username:</strong> {deliveryConfigForm.username}
                                </p>
                              )}
                              {deliveryConfigForm.password && (
                                <p>
                                  <strong>Password:</strong> {"*".repeat(deliveryConfigForm.password.length)}
                                </p>
                              )}
                              <div className="space-y-1">
                                <p>
                                  <strong>Options activées:</strong>
                                </p>
                                {deliveryConfigForm.trackingEnabled && (
                                  <p className="text-sm text-green-600">✓ Suivi automatique</p>
                                )}
                                {deliveryConfigForm.labelPrintEnabled && (
                                  <p className="text-sm text-green-600">✓ Impression étiquettes</p>
                                )}
                                {deliveryConfigForm.notificationEnabled && (
                                  <p className="text-sm text-green-600">✓ Notifications clients</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "client-history" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Historique Client Détaillé</CardTitle>
                    <CardDescription>
                      Consultez l'historique complet d'un client (essayez 0666666666 ou 0555555555)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Numéro de téléphone..."
                        value={historyPhone}
                        onChange={(e) => setHistoryPhone(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={searchClientHistory}>Rechercher Historique</Button>
                    </div>

                    {clientHistory && (
                      <div className="space-y-6">
                        {/* Client Info Summary */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {clientHistory.name}
                              <Badge
                                className={`${clientHistory.score < 30 ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"}`}
                              >
                                Score: {clientHistory.score}/100
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{clientHistory.deliveredOrders}</div>
                                <div className="text-sm text-gray-600">Commandes Livrées</div>
                              </div>
                              <div className="text-center p-4 bg-orange-50 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">
                                  {clientHistory.undeliveredOrders}
                                </div>
                                <div className="text-sm text-gray-600">Non Livrées</div>
                              </div>
                              <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">{clientHistory.refusedOrders}</div>
                                <div className="text-sm text-gray-600">Refusées</div>
                              </div>
                              <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{clientHistory.totalOrders}</div>
                                <div className="text-sm text-gray-600">Total Commandes</div>
                              </div>
                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="text-sm font-medium">Dernière Livraison Réussie</Label>
                              <p className="text-lg font-semibold">{clientHistory.lastDeliveryDate}</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Order History */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Historique des Commandes Récentes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Statut</TableHead>
                                  <TableHead>Montant</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {clientHistory.orderHistory.map((order: any, index: number) => (
                                  <TableRow key={index}>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>
                                      <Badge
                                        className={
                                          order.status === "delivered"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "undelivered"
                                              ? "bg-orange-100 text-orange-800"
                                              : "bg-red-100 text-red-800"
                                        }
                                      >
                                        {order.status === "delivered"
                                          ? "Livrée"
                                          : order.status === "undelivered"
                                            ? "Non Livrée"
                                            : "Refusée"}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{order.amount}€</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {historyPhone && !clientHistory && (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">Aucun historique trouvé pour ce numéro.</p>
                          <p className="text-sm text-gray-400 mt-2">
                            Essayez avec 0666666666 ou 0555555555 pour voir des données de démonstration.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "marketplace" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Connexion Marketplace</CardTitle>
                    <CardDescription>
                      Connectez votre boutique avec les principales plateformes e-commerce
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Connected Platforms */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Plateformes Connectées</h3>
                      {connectedPlatforms.length > 0 ? (
                        <div className="space-y-3">
                          {connectedPlatforms.map((platform) => (
                            <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                  <span className="text-green-600 font-semibold">{platform.platform[0]}</span>
                                </div>
                                <div>
                                  <div className="font-medium">{platform.platform}</div>
                                  <div className="text-sm text-gray-500">{platform.storeName}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-800">{platform.status}</Badge>
                                <div className="text-xs text-gray-500 mt-1">Sync: {platform.lastSync}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Aucune plateforme connectée</p>
                      )}
                    </div>

                    {/* Add New Connection */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Ajouter une Nouvelle Connexion</h3>

                      {marketplaceForm.step === 1 && (
                        <div className="space-y-4">
                          <Label>Choisissez votre plateforme</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {platforms.map((platform) => (
                              <button
                                key={platform.name}
                                onClick={() => setMarketplaceForm({ ...marketplaceForm, platform: platform.name })}
                                className={`p-4 border-2 rounded-lg transition-all ${
                                  marketplaceForm.platform === platform.name
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                } ${platform.color}`}
                              >
                                <img
                                  src={platform.logo || "/placeholder.svg"}
                                  alt={platform.name}
                                  className="h-8 mx-auto mb-2"
                                />
                                <div className="font-medium text-center">{platform.name}</div>
                              </button>
                            ))}
                          </div>
                          {marketplaceForm.platform && (
                            <Button onClick={handleMarketplaceConnect} className="w-full">
                              Continuer avec {marketplaceForm.platform}
                            </Button>
                          )}
                        </div>
                      )}

                      {marketplaceForm.step === 2 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Badge className="bg-blue-100 text-blue-800">Étape 2/3</Badge>
                            <span className="font-medium">Configuration {marketplaceForm.platform}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="shop-name">Nom de la boutique</Label>
                              <Input
                                id="shop-name"
                                placeholder="ma-boutique"
                                value={marketplaceForm.shopName}
                                onChange={(e) => setMarketplaceForm({ ...marketplaceForm, shopName: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="store-url">URL de la boutique</Label>
                              <Input
                                id="store-url"
                                placeholder="https://ma-boutique.myshopify.com"
                                value={marketplaceForm.storeUrl}
                                onChange={(e) => setMarketplaceForm({ ...marketplaceForm, storeUrl: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="api-key">Clé API</Label>
                              <Input
                                id="api-key"
                                type="password"
                                placeholder="Votre clé API"
                                value={marketplaceForm.apiKey}
                                onChange={(e) => setMarketplaceForm({ ...marketplaceForm, apiKey: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="api-secret">Secret API</Label>
                              <Input
                                id="api-secret"
                                type="password"
                                placeholder="Votre secret API"
                                value={marketplaceForm.apiSecret}
                                onChange={(e) => setMarketplaceForm({ ...marketplaceForm, apiSecret: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setMarketplaceForm({ ...marketplaceForm, step: 1 })}
                            >
                              Retour
                            </Button>
                            <Button onClick={handleMarketplaceConnect} className="flex-1">
                              Continuer
                            </Button>
                          </div>
                        </div>
                      )}

                      {marketplaceForm.step === 3 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Badge className="bg-green-100 text-green-800">Étape 3/3</Badge>
                            <span className="font-medium">Configuration Webhook</span>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">URL pour créer des commandes :</h4>
                            <code className="bg-white p-2 rounded border block text-sm">
                              https://api.monapp.com/orders/create/{marketplaceForm.platform.toLowerCase()}
                            </code>
                          </div>

                          <div>
                            <Label htmlFor="webhook-url">URL Webhook {marketplaceForm.platform}</Label>
                            <Input
                              id="webhook-url"
                              placeholder="https://api.monapp.com/webhook/orders"
                              value={marketplaceForm.webhookUrl}
                              onChange={(e) => setMarketplaceForm({ ...marketplaceForm, webhookUrl: e.target.value })}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Configurez cette URL dans votre tableau de bord {marketplaceForm.platform} pour recevoir
                              les notifications de commandes
                            </p>
                          </div>

                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Instructions pour {marketplaceForm.platform} :</h4>
                            <ol className="text-sm space-y-1 list-decimal list-inside">
                              <li>Allez dans Paramètres → Notifications</li>
                              <li>Créez un nouveau webhook</li>
                              <li>Collez l'URL webhook ci-dessus</li>
                              <li>Sélectionnez les événements : Order creation, Order payment</li>
                              <li>Activez le webhook</li>
                            </ol>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setMarketplaceForm({ ...marketplaceForm, step: 2 })}
                            >
                              Retour
                            </Button>
                            <Button onClick={handleMarketplaceConnect} className="flex-1">
                              Finaliser la Connexion
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Display form data */}
                    {marketplaceForm.platform && (
                      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium mb-2">Données du formulaire :</h4>
                        <div className="text-sm space-y-1">
                          <div>
                            <strong>Plateforme :</strong> {marketplaceForm.platform}
                          </div>
                          <div>
                            <strong>Étape :</strong> {marketplaceForm.step}/3
                          </div>
                          {marketplaceForm.shopName && (
                            <div>
                              <strong>Boutique :</strong> {marketplaceForm.shopName}
                            </div>
                          )}
                          {marketplaceForm.storeUrl && (
                            <div>
                              <strong>URL :</strong> {marketplaceForm.storeUrl}
                            </div>
                          )}
                          {marketplaceForm.apiKey && (
                            <div>
                              <strong>API Key :</strong> {"*".repeat(marketplaceForm.apiKey.length)}
                            </div>
                          )}
                          {marketplaceForm.webhookUrl && (
                            <div>
                              <strong>Webhook :</strong> {marketplaceForm.webhookUrl}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "subscription" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Mon Abonnement</CardTitle>
                    <CardDescription>Gérer votre abonnement et fonctionnalités</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current Subscription */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Abonnement Actuel</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-blue-700">Plan Premium</p>
                          <p className="text-sm text-blue-600">Facturation mensuelle - 299 MAD/mois</p>
                          <p className="text-xs text-blue-500">Renouvellement le 15 Mars 2024</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Actif</Badge>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700">Commandes ce mois</h4>
                        <p className="text-2xl font-bold text-gray-900">247</p>
                        <p className="text-sm text-gray-500">Limite: 500</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700">API Calls</h4>
                        <p className="text-2xl font-bold text-gray-900">1,234</p>
                        <p className="text-sm text-gray-500">Limite: 5,000</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700">Stockage</h4>
                        <p className="text-2xl font-bold text-gray-900">2.1 GB</p>
                        <p className="text-sm text-gray-500">Limite: 10 GB</p>
                      </div>
                    </div>

                    {/* Available Plans */}
                    <div>
                      <h3 className="font-semibold mb-4">Plans Disponibles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold text-lg">Basic</h4>
                          <p className="text-2xl font-bold text-blue-600">99 MAD<span className="text-sm">/mois</span></p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>• 100 commandes/mois</li>
                            <li>• 1,000 API calls</li>
                            <li>• 1 GB stockage</li>
                            <li>• Support email</li>
                          </ul>
                          <Button variant="outline" className="w-full mt-4 bg-transparent">Rétrograder</Button>
                        </div>
                        <div className="border-2 border-blue-500 rounded-lg p-4 relative">
                          <Badge className="absolute -top-2 left-4 bg-blue-500">Actuel</Badge>
                          <h4 className="font-bold text-lg">Premium</h4>
                          <p className="text-2xl font-bold text-blue-600">299 MAD<span className="text-sm">/mois</span></p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>• 500 commandes/mois</li>
                            <li>• 5,000 API calls</li>
                            <li>• 10 GB stockage</li>
                            <li>• Support prioritaire</li>
                            <li>• Intégrations avancées</li>
                          </ul>
                          <Button className="w-full mt-4" disabled>Plan Actuel</Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold text-lg">Enterprise</h4>
                          <p className="text-2xl font-bold text-blue-600">799 MAD<span className="text-sm">/mois</span></p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>• Commandes illimitées</li>
                            <li>• API calls illimitées</li>
                            <li>• 100 GB stockage</li>
                            <li>• Support 24/7</li>
                            <li>• Fonctionnalités custom</li>
                          </ul>
                          <Button className="w-full mt-4">Upgrader</Button>
                        </div>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div>
                      <h3 className="font-semibold mb-4">Historique des Paiements</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Facture</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>15 Fév 2024</TableCell>
                            <TableCell>299 MAD</TableCell>
                            <TableCell>Premium</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-800">Payé</Badge></TableCell>
                            <TableCell><Button variant="ghost" size="sm">Télécharger</Button></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>15 Jan 2024</TableCell>
                            <TableCell>299 MAD</TableCell>
                            <TableCell>Premium</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-800">Payé</Badge></TableCell>
                            <TableCell><Button variant="ghost" size="sm">Télécharger</Button></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Admin Interface */}
          {currentRole === "admin" && (
            <div className="space-y-6">
              {/* ... existing admin tabs ... */}

              {activeTab === "subscriptions-admin" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des Abonnements</CardTitle>
                    <CardDescription>Gérer tous les abonnements des commerçants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-700">Total Abonnements</h4>
                        <p className="text-2xl font-bold text-blue-900">156</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700">Revenus Mensuels</h4>
                        <p className="text-2xl font-bold text-green-900">42,340 MAD</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-700">Expirations ce mois</h4>
                        <p className="text-2xl font-bold text-yellow-900">23</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-700">Impayés</h4>
                        <p className="text-2xl font-bold text-red-900">7</p>
                      </div>
                    </div>

                    {/* Subscriptions Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commerçant</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Expiration</TableHead>
                          <TableHead>Revenus</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">Mohammed Alami</p>
                              <p className="text-sm text-gray-500">m.alami@email.com</p>
                            </div>
                          </TableCell>
                          <TableCell><Badge>Premium</Badge></TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Actif</Badge></TableCell>
                          <TableCell>15 Mars 2024</TableCell>
                          <TableCell>299 MAD/mois</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Modifier</Button>
                              <Button size="sm" variant="destructive">Suspendre</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">Fatima Zahra</p>
                              <p className="text-sm text-gray-500">f.zahra@email.com</p>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="secondary">Basic</Badge></TableCell>
                          <TableCell><Badge className="bg-yellow-100 text-yellow-800">Expire bientôt</Badge></TableCell>
                          <TableCell>28 Fév 2024</TableCell>
                          <TableCell>99 MAD/mois</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Renouveler</Button>
                              <Button size="sm">Upgrader</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {activeTab === "clients-admin" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des Clients</CardTitle>
                    <CardDescription>Vue globale de tous les clients du système</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search and Filters */}
                    <div className="flex space-x-4">
                      <Input placeholder="Rechercher un client..." className="flex-1" />
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filtrer par score" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Score élevé (80-100)</SelectItem>
                          <SelectItem value="medium">Score moyen (50-79)</SelectItem>
                          <SelectItem value="low">Score faible (0-49)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="blacklisted">Liste noire</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Client Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-700">Total Clients</h4>
                        <p className="text-2xl font-bold text-blue-900">2,847</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700">Clients Actifs</h4>
                        <p className="text-2xl font-bold text-green-900">2,156</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-700">Liste Noire</h4>
                        <p className="text-2xl font-bold text-red-900">342</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-700">Clients Inactifs</h4>
                        <p className="text-2xl font-bold text-yellow-900">349</p>
                      </div>
                    </div>

                    {/* Clients Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">Jean Dupont</p>
                            </div>
                          </TableCell>
                          <TableCell>jean.dupont@email.com</TableCell>
                          <TableCell>0612345678</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">85</Badge></TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Actif</Badge></TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Modifier</Button>
                              <Button size="sm" variant="destructive">Blacklister</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">Sophie Martin</p>
                            </div>
                          </TableCell>
                          <TableCell>sophie.martin@email.com</TableCell>
                          <TableCell>0698765432</TableCell>
                          <TableCell><Badge className="bg-red-100 text-red-800">32</Badge></TableCell>
                          <TableCell><Badge className="bg-yellow-100 text-yellow-800">Inactif</Badge></TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Modifier</Button>
                              <Button size="sm">Activer</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
  )
}
