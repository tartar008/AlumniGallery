import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertMemberSchema, insertActivitySchema, insertGallerySchema } from "@shared/schema";

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // ==================== MEMBERS ====================

  // Get all members
  app.get("/api/members", async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });

  // Get single member
  app.get("/api/members/:id", async (req, res) => {
    try {
      const member = await storage.getMember(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch member" });
    }
  });

  // Create member
  app.post("/api/members", async (req, res) => {
    try {
      const parsed = insertMemberSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid member data", errors: parsed.error });
      }

      const member = await storage.createMember(parsed.data);
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ message: "Failed to create member" });
    }
  });

  // Update member
  app.patch("/api/members/:id", async (req, res) => {
    try {
      const parsed = insertMemberSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid member data", errors: parsed.error });
      }

      const member = await storage.updateMember(req.params.id, parsed.data);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Failed to update member" });
    }
  });

  // Delete member
  app.delete("/api/members/:id", async (req, res) => {
    try {
      const success = await storage.deleteMember(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete member" });
    }
  });

  // ==================== ACTIVITIES ====================

  // Get all activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Get single activity
  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivity(req.params.id);
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  // Create activity
  app.post("/api/activities", async (req, res) => {
    try {
      const parsed = insertActivitySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid activity data", errors: parsed.error });
      }

      const activity = await storage.createActivity(parsed.data);
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // Update activity
  app.patch("/api/activities/:id", async (req, res) => {
    try {
      const parsed = insertActivitySchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid activity data", errors: parsed.error });
      }

      const activity = await storage.updateActivity(req.params.id, parsed.data);
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to update activity" });
    }
  });

  // Delete activity
  app.delete("/api/activities/:id", async (req, res) => {
    try {
      const success = await storage.deleteActivity(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete activity" });
    }
  });

  // ==================== GALLERIES ====================

  // Get all galleries
  app.get("/api/galleries", async (req, res) => {
    try {
      const galleries = await storage.getAllGalleries();
      res.json(galleries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch galleries" });
    }
  });

  // Get single gallery
  app.get("/api/galleries/:id", async (req, res) => {
    try {
      const gallery = await storage.getGallery(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  // Create gallery
  app.post("/api/galleries", async (req, res) => {
    try {
      const parsed = insertGallerySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid gallery data", errors: parsed.error });
      }

      const gallery = await storage.createGallery(parsed.data);
      res.status(201).json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to create gallery" });
    }
  });

  // Update gallery
  app.patch("/api/galleries/:id", async (req, res) => {
    try {
      const parsed = insertGallerySchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid gallery data", errors: parsed.error });
      }

      const gallery = await storage.updateGallery(req.params.id, parsed.data);
      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to update gallery" });
    }
  });

  // Delete gallery
  app.delete("/api/galleries/:id", async (req, res) => {
    try {
      const success = await storage.deleteGallery(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery" });
    }
  });

  // ==================== FILE UPLOAD ====================

  // Upload image endpoint (for future use)
  app.post("/api/upload", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl, filename: req.file.filename });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
