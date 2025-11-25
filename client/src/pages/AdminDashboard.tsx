import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: string;
  status: string;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [adminKey, setAdminKey] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("adminKey");
    if (!key) {
      setLocation("/admin/login");
    } else {
      setAdminKey(key);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const adminKey = localStorage.getItem("adminKey");
      const headers = { "x-admin-key": adminKey || "" };

      const [productsRes, ordersRes, submissionsRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders", { headers }),
        fetch("/api/submissions", { headers }),
      ]);

      if (productsRes.ok) setProducts(await productsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (submissionsRes.ok) setSubmissions(await submissionsRes.json());
    } catch (error) {
      toast({ title: "Error loading data", variant: "destructive" });
    }
  };

  const handleAddProduct = async (formData: any) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Product added successfully" });
        loadData();
      }
    } catch (error) {
      toast({ title: "Error adding product", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      if (response.ok) {
        toast({ title: "Product deleted" });
        loadData();
      }
    } catch (error) {
      toast({ title: "Error deleting product", variant: "destructive" });
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({ title: "Order status updated" });
        loadData();
      }
    } catch (error) {
      toast({ title: "Error updating order", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">Shri Bikanerji Admin</h1>
          <Button variant="ghost" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="products" className="w-full" data-testid="tabs-admin">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products" data-testid="tab-products">
                Products ({products.length})
              </TabsTrigger>
              <TabsTrigger value="orders" data-testid="tab-orders">
                Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="submissions" data-testid="tab-submissions">
                Submissions ({submissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-product">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-testid="dialog-add-product">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <ProductForm onSubmit={handleAddProduct} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} data-testid={`row-product-${product.id}`}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            data-testid={`button-delete-${product.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-2xl font-bold">Orders</h2>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} data-testid={`row-order-${order.id}`}>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.customerEmail}</TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32" data-testid={`select-status-${order.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" data-testid={`button-view-order-${order.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Submissions</h2>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} data-testid={`card-submission-${submission.id}`}>
                    <CardHeader>
                      <CardTitle>{submission.name}</CardTitle>
                      <CardDescription>{submission.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold mb-2">{submission.subject}</p>
                      <p className="text-sm">{submission.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}

function ProductForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Barfi",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", price: "", category: "Barfi", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          data-testid="input-product-name"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          data-testid="input-product-description"
        />
      </div>
      <div>
        <Label>Price (₹)</Label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          data-testid="input-product-price"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger data-testid="select-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Barfi">Barfi</SelectItem>
            <SelectItem value="Fried Sweets">Fried Sweets</SelectItem>
            <SelectItem value="Milk Sweets">Milk Sweets</SelectItem>
            <SelectItem value="Gift Boxes">Gift Boxes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          data-testid="input-product-image"
        />
      </div>
      <Button type="submit" className="w-full" data-testid="button-submit-product">
        Add Product
      </Button>
    </form>
  );
}
