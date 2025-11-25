import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertOrderSchema, insertContactSubmissionSchema } from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin auth check middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey === ADMIN_PASSWORD) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.post("/api/products", adminAuth, async (req, res) => {
    try {
      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/products/:id", adminAuth, async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.delete("/api/products/:id", adminAuth, async (req, res) => {
    const deleted = await storage.deleteProduct(req.params.id);
    res.json({ success: deleted });
  });

  // Orders endpoints
  app.get("/api/orders", adminAuth, async (req, res) => {
    const orders = await storage.getAllOrders();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validated = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validated);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.patch("/api/orders/:id", adminAuth, async (req, res) => {
    try {
      const order = await storage.updateOrderStatus(req.params.id, req.body.status);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
      } else {
        res.json(order);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  // Contact submissions endpoints
  app.get("/api/submissions", adminAuth, async (req, res) => {
    const submissions = await storage.getAllContactSubmissions();
    res.json(submissions);
  });

  app.post("/api/submissions", async (req, res) => {
    try {
      const validated = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validated);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
