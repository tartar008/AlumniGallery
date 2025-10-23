// server/index.ts
import { webcrypto as webcrypto2 } from "crypto";
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";
import multer from "multer";
import path from "path";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  members;
  activities;
  galleries;
  constructor() {
    this.members = /* @__PURE__ */ new Map();
    this.activities = /* @__PURE__ */ new Map();
    this.galleries = /* @__PURE__ */ new Map();
    this.seedData();
  }
  async seedData() {
    const sampleMembers = [
      { profileImage: "/images/members/Image_bus.jpg", studentId: "6510210014", name: "\u0E19\u0E32\u0E22\u0E01\u0E24\u0E29\u0E14\u0E32 \u0E2A\u0E32\u0E22\u0E2A\u0E30\u0E2D\u0E34\u0E14", nameEn: "Kritsada Saisa-it", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210037", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E02\u0E19\u0E34\u0E29\u0E10\u0E32\u0E40\u0E1E\u0E47\u0E0D \u0E1B\u0E34\u0E22\u0E30\u0E1B\u0E32\u0E19\u0E31\u0E19\u0E17\u0E4C", nameEn: "Khanittaphen Piyapanan", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210038", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E02\u0E27\u0E31\u0E0D\u0E01\u0E21\u0E25 \u0E14\u0E33\u0E41\u0E01\u0E49\u0E27", nameEn: "Khwan Kamon Damkaew", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210040", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E04\u0E32\u0E23\u0E35\u0E21\u0E32 \u0E21\u0E39\u0E40\u0E01\u0E47\u0E21", nameEn: "Karima Mukem", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210078", name: "\u0E19\u0E32\u0E22\u0E44\u0E0A\u0E22\u0E27\u0E31\u0E12\u0E19\u0E4C \u0E0A\u0E39\u0E17\u0E2D\u0E07", nameEn: "Chaiwat Chuthong", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210096", name: "\u0E19\u0E32\u0E22\u0E13\u0E31\u0E10\u0E1E\u0E07\u0E28\u0E4C \u0E2A\u0E38\u0E02\u0E2D\u0E49\u0E19", nameEn: "Nattapong Sukon", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210126", name: "\u0E19\u0E32\u0E22\u0E18\u0E27\u0E31\u0E0A\u0E0A\u0E31\u0E22 \u0E17\u0E2D\u0E07\u0E44\u0E1D", nameEn: "Thawatchai Thongfai", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210134", name: "\u0E19\u0E32\u0E22\u0E18\u0E35\u0E23\u0E27\u0E31\u0E0A\u0E23 \u0E27\u0E31\u0E0A\u0E19\u0E30", nameEn: "Teerawat Watchana", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210143", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E19\u0E25\u0E34\u0E19\u0E17\u0E34\u0E1E\u0E22\u0E4C \u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13\u0E25\u0E2D\u0E22\u0E25\u0E48\u0E2D\u0E07", nameEn: "Nalinthip Suwanloylong", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210144", name: "\u0E19\u0E32\u0E22\u0E19\u0E27\u0E1E\u0E25 \u0E01\u0E30\u0E21\u0E48\u0E32\u0E2A\u0E32", nameEn: "Nawaphon Kamasa", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210151", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E19\u0E31\u0E08\u0E21\u0E35\u0E22\u0E4C \u0E2B\u0E25\u0E31\u0E07\u0E40\u0E01\u0E15\u0E38", nameEn: "Najmee Langket", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210155", name: "\u0E19\u0E32\u0E22\u0E19\u0E31\u0E17\u0E18\u0E1E\u0E07\u0E28\u0E4C \u0E40\u0E15\u0E25\u0E30\u0E01\u0E38\u0E25", nameEn: "Nattapong Telakul", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210176", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E1A\u0E31\u0E13\u0E17\u0E34\u0E15\u0E32 \u0E27\u0E07\u0E28\u0E4C\u0E1E\u0E38\u0E17\u0E18\u0E23\u0E31\u0E01\u0E29\u0E32", nameEn: "Bantita Wongputtaraksa", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210200", name: "\u0E19\u0E32\u0E22\u0E1B\u0E34\u0E22\u0E30\u0E0A\u0E31\u0E22 \u0E13\u0E23\u0E07\u0E04\u0E4C\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C", nameEn: "Piyachai Narongsab", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210233", name: "\u0E19\u0E32\u0E22\u0E1E\u0E35\u0E23\u0E1E\u0E31\u0E12\u0E19\u0E4C \u0E1A\u0E31\u0E27\u0E02\u0E32\u0E27", nameEn: "Peerapat Buakhao", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210234", name: "\u0E19\u0E32\u0E22\u0E1E\u0E38\u0E12\u0E34\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C \u0E40\u0E14\u0E48\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E2A\u0E23\u0E34\u0E10", nameEn: "Phutilak Denprasert", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210239", name: "\u0E19\u0E32\u0E22\u0E1F\u0E32\u0E23\u0E38\u0E04 \u0E2B\u0E21\u0E31\u0E14\u0E2D\u0E32\u0E14\u0E31\u0E49\u0E21", nameEn: "Faruk Madadam", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210242", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E1F\u0E34\u0E23\u0E14\u0E32\u0E27\u0E2B\u0E4C \u0E25\u0E4A\u0E30\u0E2D\u0E32\u0E2B\u0E25\u0E35", nameEn: "Firdawh La-alee", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210262", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E21\u0E32\u0E23\u0E35\u0E22\u0E30\u0E2B\u0E4C \u0E2A\u0E38\u0E27\u0E32\u0E2B\u0E25\u0E33", nameEn: "Mariya Suwalam", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210264", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E21\u0E38\u0E19\u0E32 \u0E2B\u0E25\u0E32\u0E19\u0E40\u0E01", nameEn: "Muna Lan-Ke", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210267", name: "\u0E19\u0E32\u0E22\u0E21\u0E39\u0E2E\u0E33\u0E2B\u0E21\u0E31\u0E14 \u0E22\u0E30\u0E25\u0E32\u0E1E\u0E32\u0E19\u0E35", nameEn: "Muhammad Yalapanee", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210289", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E27\u0E23\u0E23\u0E13\u0E23\u0E22\u0E32 \u0E17\u0E2D\u0E07\u0E41\u0E14\u0E07", nameEn: "Wannaraya Thongdaeng", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210317", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E28\u0E34\u0E23\u0E34\u0E23\u0E32\u0E15\u0E23\u0E35 \u0E2D\u0E38\u0E15\u0E21\u0E30\u0E21\u0E38\u0E13\u0E35\u0E22\u0E4C", nameEn: "Siriratree Uttamamoonee", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210323", name: "\u0E19\u0E32\u0E22\u0E2A\u0E1E\u0E25\u0E14\u0E19\u0E31\u0E22 \u0E04\u0E39", nameEn: "Sappaladnai Koo", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210337", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E2A\u0E38\u0E0A\u0E32\u0E19\u0E31\u0E19\u0E17\u0E4C \u0E28\u0E23\u0E35\u0E40\u0E17\u0E1E", nameEn: "Suchanan Srithep", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210342", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E2A\u0E38\u0E19\u0E34\u0E2A\u0E32 \u0E2A\u0E35\u0E2D\u0E48\u0E2D\u0E19", nameEn: "Sunisa Sion", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210350", name: "\u0E19\u0E32\u0E22\u0E2A\u0E38\u0E27\u0E34\u0E08\u0E31\u0E01\u0E02\u0E13\u0E4C \u0E1A\u0E31\u0E27\u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13", nameEn: "Suwichak Buasuwan", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210367", name: "\u0E19\u0E32\u0E22\u0E2D\u0E23\u0E23\u0E16\u0E1E\u0E25 \u0E1A\u0E31\u0E27\u0E17\u0E2D\u0E07", nameEn: "Atthaphon Buathong", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210371", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E2D\u0E23\u0E34\u0E2A\u0E23\u0E32 \u0E1E\u0E23\u0E21\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E4C", nameEn: "Arisara Promin", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210395", name: "\u0E19\u0E32\u0E22\u0E2D\u0E32\u0E25\u0E32\u0E2D\u0E39\u0E25\u0E14\u0E34\u0E19 \u0E14\u0E32\u0E40\u0E14\u0E4A\u0E30", nameEn: "Alauldin Dadeh", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210414", name: "\u0E19\u0E32\u0E22\u0E01\u0E24\u0E29\u0E0E\u0E32 \u0E2B\u0E19\u0E31\u0E01\u0E41\u0E01\u0E49\u0E27", nameEn: "Kritsada Nakkaew", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210417", name: "\u0E19\u0E32\u0E22\u0E01\u0E2D\u0E07\u0E01\u0E34\u0E08 \u0E22\u0E35\u0E48\u0E0B\u0E49\u0E32\u0E22", nameEn: "Kongkit Yeesai", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210424", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E01\u0E31\u0E25\u0E22\u0E32\u0E13\u0E35 \u0E2D\u0E32\u0E17\u0E23\u0E2A\u0E34\u0E23\u0E34\u0E23\u0E31\u0E15\u0E19\u0E4C", nameEn: "Kanyanee Athornsirirat", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210437", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E08\u0E35\u0E23\u0E19\u0E31\u0E19\u0E17\u0E4C \u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C\u0E41\u0E01\u0E49\u0E27", nameEn: "Jeeranan Chankaeo", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210463", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E13\u0E31\u0E0A\u0E0A\u0E32 \u0E2A\u0E30\u0E2B\u0E22\u0E31\u0E07", nameEn: "Natcha Sayang", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210480", name: "\u0E19\u0E32\u0E22\u0E18\u0E19\u0E0A\u0E32\u0E15\u0E34 \u0E18\u0E23\u0E23\u0E21\u0E23\u0E07\u0E04\u0E4C", nameEn: "Thanachat Thamrong", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210495", name: "\u0E19\u0E32\u0E22\u0E18\u0E35\u0E23\u0E20\u0E31\u0E17\u0E23 \u0E1B\u0E34\u0E48\u0E19\u0E1E\u0E23\u0E21", nameEn: "Teerapat Pinprom", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210511", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E1A\u0E22\u0E32\u0E19 \u0E2A\u0E34\u0E40\u0E14\u0E30", nameEn: "Bayan Sideh", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210527", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E1E\u0E04\u0E27\u0E14\u0E35 \u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13\u0E0A\u0E32\u0E15\u0E23\u0E35", nameEn: "Phakawadee Suwanchatree", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210528", name: "\u0E19\u0E32\u0E22\u0E1E\u0E0A\u0E23\u0E1E\u0E25 \u0E14\u0E48\u0E32\u0E19\u0E27\u0E23\u0E1E\u0E07\u0E28\u0E4C", nameEn: "Phacharapol Danworapong", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210544", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E1F\u0E34\u0E15\u0E23\u0E35\u0E19\u0E32 \u0E41\u0E21", nameEn: "Fitreena Mae", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210551", name: "\u0E19\u0E32\u0E22\u0E20\u0E32\u0E13\u0E38\u0E27\u0E34\u0E0A\u0E0D\u0E4C \u0E23\u0E31\u0E01\u0E43\u0E2B\u0E21\u0E48", nameEn: "Phanuwitch Rakmai", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210560", name: "\u0E19\u0E32\u0E22\u0E40\u0E21\u0E18\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \u0E23\u0E31\u0E15\u0E19\u0E04\u0E0A", nameEn: "Methasit Rattanakot", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210561", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E40\u0E21\u0E29\u0E34\u0E22\u0E32 \u0E44\u0E1E\u0E23\u0E1E\u0E24\u0E01\u0E29\u0E4C", nameEn: "Mesiya Praipruek", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210574", name: "\u0E19\u0E32\u0E22\u0E27\u0E2A\u0E27\u0E31\u0E15\u0E15\u0E34\u0E4C \u0E19\u0E33\u0E40\u0E2D\u0E01\u0E25\u0E32\u0E20", nameEn: "Wasawat Namekarlap", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210588", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E2A\u0E27\u0E34\u0E0A\u0E0D\u0E32 \u0E2E\u0E27\u0E14\u0E1E\u0E23\u0E2B\u0E21", nameEn: "Savitjaya Huatprom", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210617", name: "\u0E19\u0E32\u0E22\u0E2D\u0E31\u0E1A\u0E14\u0E38\u0E25\u0E01\u0E32\u0E23\u0E35\u0E21 \u0E21\u0E32\u0E21\u0E30", nameEn: "Abdulkarim Mama", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210624", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E2D\u0E32\u0E23\u0E35\u0E14\u0E32 \u0E40\u0E08\u0E30\u0E21\u0E32\u0E21\u0E30", nameEn: "Areeda Jehmama", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210634", name: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E08\u0E34\u0E23\u0E31\u0E0D\u0E0D\u0E32 \u0E14\u0E34\u0E19\u0E40\u0E15\u0E1A", nameEn: "Jiranya Dintep", cohort: "ICT 18", department: "\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 (ICT)", year: 2025, bio: "", position: "", contactInfo: "" }
    ];
    const galleryImages = [
      "Photo_001.jpeg",
      "Photo_001.jpg",
      "Photo_002.jpeg",
      "Photo_002.jpg",
      "Photo_003.jpeg",
      "Photo_003.jpg",
      "Photo_004.jpeg",
      "Photo_004.jpg",
      "Photo_005.jpeg",
      "Photo_005.jpg",
      "Photo_006.jpeg",
      "Photo_006.jpg",
      "Photo_007.jpeg",
      "Photo_007.jpg",
      "Photo_008.jpeg",
      "Photo_008.jpg",
      "Photo_009.jpeg",
      "Photo_009.jpg",
      "Photo_010.jpeg",
      "Photo_010.jpg",
      "Photo_011.jpeg",
      "Photo_011.jpg",
      "Photo_012.jpeg",
      "Photo_012.jpg",
      "Photo_013.jpeg",
      "Photo_013.jpg",
      "Photo_014.jpeg",
      "Photo_014.jpg",
      "Photo_015.jpeg",
      "Photo_015.jpg",
      "Photo_016.jpeg",
      "Photo_016.jpg",
      "Photo_017.jpeg",
      "Photo_017.jpg",
      "Photo_018.jpeg",
      "Photo_018.jpg",
      "Photo_019.jpeg",
      "Photo_019.jpg",
      "Photo_020.jpeg",
      "Photo_020.jpg",
      "Photo_021.jpeg",
      "Photo_021.jpg",
      "Photo_022.jpeg",
      "Photo_022.jpg",
      "Photo_023.jpeg",
      "Photo_023.jpg",
      "Photo_024.jpeg",
      "Photo_024.jpg",
      "Photo_025.jpeg",
      "Photo_025.jpg",
      "Photo_026.jpeg",
      "Photo_026.jpg",
      "Photo_027.jpeg",
      "Photo_027.jpg",
      "Photo_028.jpg",
      "Photo_028.PNG",
      "Photo_029.jpg",
      "Photo_029.PNG",
      "Photo_030.jpg",
      "Photo_030.PNG",
      "Photo_031.jpg",
      "Photo_031.PNG",
      "Photo_032.jpg",
      "Photo_032.PNG",
      "Photo_033.jpg",
      "Photo_033.PNG",
      "Photo_034.jpg",
      "Photo_034.PNG",
      "Photo_035.jpg",
      "Photo_035.PNG",
      "Photo_036.jpg",
      "Photo_036.PNG",
      "Photo_037.jpg",
      "Photo_037.PNG",
      "Photo_038.jpg",
      "Photo_038.PNG",
      "Photo_039.jpg",
      "Photo_039.PNG",
      "Photo_040.jpg",
      "Photo_040.PNG",
      "Photo_041.jpg",
      "Photo_041.PNG",
      "Photo_042.jpg",
      "Photo_042.PNG",
      "Photo_043.jpg",
      "Photo_043.PNG",
      "Photo_044.jpg",
      "Photo_044.PNG",
      "Photo_045.jpg",
      "Photo_045.PNG",
      "Photo_046.jpg",
      "Photo_046.PNG",
      "Photo_047.jpg",
      "Photo_047.PNG",
      "Photo_048.jpg",
      "Photo_048.PNG",
      "Photo_049.jpg",
      "Photo_049.PNG",
      "Photo_050.GIF",
      "Photo_050.jpg",
      "Photo_051.GIF",
      "Photo_051.jpg",
      "Photo_052.GIF",
      "Photo_052.jpg",
      "Photo_053.jpg",
      "Photo_053.PNG",
      "Photo_054.jpg",
      "Photo_054.PNG",
      "Photo_055.jpg",
      "Photo_055.PNG",
      "Photo_056.jpg",
      "Photo_056.PNG",
      "Photo_057.jpg",
      "Photo_057.PNG",
      "Photo_058.jpg",
      "Photo_058.PNG",
      "Photo_059.jpg",
      "Photo_059.PNG",
      "Photo_060.jpg",
      "Photo_060.PNG",
      "Photo_061.jpg",
      "Photo_061.PNG",
      "Photo_062.jpg",
      "Photo_062.PNG",
      "Photo_063.jpg",
      "Photo_063.PNG",
      "Photo_064.jpg",
      "Photo_064.PNG",
      "Photo_065.jpg",
      "Photo_065.PNG",
      "Photo_066.jpg",
      "Photo_066.PNG",
      "Photo_067.jpg",
      "Photo_067.PNG",
      "Photo_068.jpg",
      "Photo_068.PNG",
      "Photo_069.jpg",
      "Photo_069.PNG",
      "Photo_070.jpg",
      "Photo_070.PNG",
      "Photo_071.jpg",
      "Photo_071.PNG",
      "Photo_072.jpg",
      "Photo_072.PNG",
      "Photo_073.jpg",
      "Photo_073.PNG",
      "Photo_074.jpg",
      "Photo_074.PNG",
      "Photo_075.jpg",
      "Photo_075.PNG",
      "Photo_076.jpg",
      "Photo_076.PNG",
      "Photo_077.jpg",
      "Photo_077.PNG",
      "Photo_078.jpg",
      "Photo_078.PNG",
      "Photo_079.jpg",
      "Photo_079.PNG",
      "Photo_080.jpg",
      "Photo_080.PNG",
      "Photo_081.jpg",
      "Photo_081.PNG",
      "Photo_082.jpg",
      "Photo_082.PNG",
      "Photo_083.jpg",
      "Photo_083.PNG",
      "Photo_084.jpg",
      "Photo_084.PNG",
      "Photo_085.jpg",
      "Photo_085.PNG",
      "Photo_086.jpg",
      "Photo_086.PNG",
      "Photo_087.jpg",
      "Photo_087.PNG",
      "Photo_088.jpg",
      "Photo_088.PNG",
      "Photo_089.jpg",
      "Photo_089.PNG",
      "Photo_090.jpg",
      "Photo_090.PNG",
      "Photo_091.jpg",
      "Photo_091.PNG",
      "Photo_092.jpg",
      "Photo_092.PNG",
      "Photo_093.jpg",
      "Photo_093.PNG",
      "Photo_094.jpg",
      "Photo_094.PNG",
      "Photo_095.jpg",
      "Photo_095.PNG",
      "Photo_096.jpg",
      "Photo_096.PNG",
      "Photo_097.jpg",
      "Photo_097.PNG",
      "Photo_098.jpg",
      "Photo_098.PNG",
      "Photo_099.jpg",
      "Photo_099.PNG",
      "Photo_100.jpg",
      "Photo_100.PNG",
      "Photo_101.jpg",
      "Photo_101.PNG",
      "Photo_102.jpg",
      "Photo_102.PNG",
      "Photo_103.jpg",
      "Photo_103.PNG",
      "Photo_104.jpg",
      "Photo_104.PNG",
      "Photo_105.jpg",
      "Photo_105.PNG",
      "Photo_106.jpg",
      "Photo_106.png",
      "Photo_107.jpg",
      "Photo_108.jpg",
      "Photo_109.jpg",
      "Photo_110.jpg",
      "Photo_111.JPG",
      "Photo_112.JPG",
      "Photo_113.JPG",
      "Photo_114.JPG",
      "Photo_115.JPG",
      "Photo_116.JPG",
      "Photo_117.JPG",
      "Photo_118.JPG",
      "Photo_119.JPG",
      "Photo_120.JPG",
      "Photo_121.jpg",
      "Photo_122.JPG",
      "Photo_123.JPG",
      "Photo_124.JPG",
      "Photo_125.JPG",
      "Photo_126.jpg",
      "Photo_127.JPG",
      "Photo_128.jpg",
      "Photo_129.JPG",
      "Photo_130.JPG",
      "Photo_131.JPG",
      "Photo_132.JPG",
      "Photo_133.JPG",
      "Photo_134.JPG",
      "Photo_135.JPG",
      "Photo_136.JPG",
      "Photo_137.JPG",
      "Photo_138.JPG",
      "Photo_139.JPG",
      "Photo_140.JPG",
      "Photo_141.JPG",
      "Photo_142.JPG",
      "Photo_143.JPG",
      "Photo_156.JPG",
      "Photo_157.JPG",
      "Photo_158.JPG",
      "Photo_159.JPG",
      "Photo_160.JPG",
      "Photo_161.jpg",
      "Photo_162.JPG",
      "Photo_163.JPG",
      "Photo_164.JPG",
      "Photo_165.JPG",
      "Photo_166.JPG",
      "Photo_167.JPG",
      "Photo_168.JPG",
      "Photo_169.JPG",
      "Photo_170.JPG",
      "Photo_171.JPG",
      "Photo_172.JPG",
      "Photo_173.JPG",
      "Photo_174.JPG",
      "Photo_175.JPG",
      "Photo_176.JPG",
      "Photo_177.JPG",
      "Photo_178.JPG",
      "Photo_179.JPG",
      "Photo_180.JPG",
      "Photo_181.JPG",
      "Photo_182.JPG",
      "Photo_183.JPG",
      "Photo_184.JPG",
      "Photo_185.JPG",
      "Photo_186.JPG",
      "Photo_187.JPG",
      "Photo_188.JPG",
      "Photo_189.JPG",
      "Photo_190.JPG",
      "Photo_191.jpg"
    ];
    for (const m of sampleMembers) {
      try {
        await this.createMember({
          ...m,
          profileImage: m.profileImage
        });
        console.log("\u2705 Inserted:", m.name);
      } catch (err) {
        console.error("\u274C Insert failed:", m.name, err);
      }
    }
    for (const filename of galleryImages) {
      await this.createGallery({
        imageUrl: `/images/gallery/${filename}`,
        title: filename.replace(/\.[^/.]+$/, ""),
        // ชื่อไฟล์ไม่รวม .jpg
        description: "\u0E20\u0E32\u0E1E\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 ICT 18",
        eventDate: (/* @__PURE__ */ new Date()).toISOString(),
        cohort: "ICT 18",
        category: "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E32\u0E02\u0E32",
        activityId: null
      });
    }
  }
  // Members
  async getAllMembers() {
    return Array.from(this.members.values()).sort((a, b) => b.year - a.year);
  }
  async getMember(id) {
    return this.members.get(id);
  }
  async createMember(insertMember) {
    const id = randomUUID();
    const member = {
      id,
      studentId: insertMember.studentId,
      name: insertMember.name,
      nameEn: insertMember.nameEn ?? null,
      cohort: insertMember.cohort,
      department: insertMember.department,
      bio: insertMember.bio ?? null,
      profileImage: insertMember.profileImage ?? null,
      position: insertMember.position ?? null,
      contactInfo: insertMember.contactInfo ?? null,
      year: insertMember.year
    };
    this.members.set(id, member);
    return member;
  }
  async updateMember(id, updates) {
    const member = this.members.get(id);
    if (!member) return void 0;
    const updated = { ...member, ...updates };
    this.members.set(id, updated);
    return updated;
  }
  async deleteMember(id) {
    return this.members.delete(id);
  }
  // Activities
  async getAllActivities() {
    return Array.from(this.activities.values()).sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );
  }
  async getActivity(id) {
    return this.activities.get(id);
  }
  async createActivity(insertActivity) {
    const id = randomUUID();
    const activity = {
      id,
      title: insertActivity.title,
      description: insertActivity.description ?? null,
      eventDate: insertActivity.eventDate,
      cohort: insertActivity.cohort ?? null,
      category: insertActivity.category,
      imageUrl: insertActivity.imageUrl ?? null
    };
    this.activities.set(id, activity);
    return activity;
  }
  async updateActivity(id, updates) {
    const activity = this.activities.get(id);
    if (!activity) return void 0;
    const updated = { ...activity, ...updates };
    this.activities.set(id, updated);
    return updated;
  }
  async deleteActivity(id) {
    return this.activities.delete(id);
  }
  // Galleries
  async getAllGalleries() {
    return Array.from(this.galleries.values());
  }
  async getGallery(id) {
    return this.galleries.get(id);
  }
  async createGallery(insertGallery) {
    const id = randomUUID();
    const gallery = {
      id,
      title: insertGallery.title ?? null,
      description: insertGallery.description ?? null,
      eventDate: insertGallery.eventDate ?? null,
      cohort: insertGallery.cohort ?? null,
      category: insertGallery.category ?? null,
      imageUrl: insertGallery.imageUrl,
      activityId: insertGallery.activityId ?? null
    };
    this.galleries.set(id, gallery);
    return gallery;
  }
  async updateGallery(id, updates) {
    const gallery = this.galleries.get(id);
    if (!gallery) return void 0;
    const updated = { ...gallery, ...updates };
    this.galleries.set(id, updated);
    return updated;
  }
  async deleteGallery(id) {
    return this.galleries.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // ✅ เพิ่ม studentId
  studentId: varchar("student_id", { length: 20 }).notNull(),
  // เช่น "6510210014"
  name: text("name").notNull(),
  nameEn: text("name_en"),
  cohort: text("cohort").notNull(),
  // เช่น "ICT 18"
  department: text("department").notNull(),
  bio: text("bio"),
  profileImage: text("profile_image"),
  position: text("position"),
  contactInfo: text("contact_info"),
  year: integer("year").notNull()
});
var activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: text("event_date").notNull(),
  // วันที่จัดกิจกรรม
  cohort: text("cohort"),
  // รุ่นที่เกี่ยวข้อง (optional)
  category: text("category").notNull(),
  // "กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"
  imageUrl: text("image_url")
});
var galleries = pgTable("galleries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  description: text("description"),
  eventDate: text("event_date"),
  cohort: text("cohort"),
  // รุ่นที่เกี่ยวข้อง
  category: text("category"),
  // "กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"
  activityId: varchar("activity_id")
  // เชื่อมกับกิจกรรม (optional)
});
var insertMemberSchema = createInsertSchema(members).omit({
  id: true
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true
});
var insertGallerySchema = createInsertSchema(galleries).omit({
  id: true
});

// server/routes.ts
var uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});
async function registerRoutes(app2) {
  app2.use("/uploads", express.static("uploads"));
  app2.get("/api/members", async (req, res) => {
    try {
      const members2 = await storage.getAllMembers();
      res.json(members2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });
  app2.get("/api/members/:id", async (req, res) => {
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
  app2.post("/api/members", async (req, res) => {
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
  app2.patch("/api/members/:id", async (req, res) => {
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
  app2.delete("/api/members/:id", async (req, res) => {
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
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities2 = await storage.getAllActivities();
      res.json(activities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  app2.get("/api/activities/:id", async (req, res) => {
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
  app2.post("/api/activities", async (req, res) => {
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
  app2.patch("/api/activities/:id", async (req, res) => {
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
  app2.delete("/api/activities/:id", async (req, res) => {
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
  app2.get("/api/galleries", async (req, res) => {
    try {
      const galleries2 = await storage.getAllGalleries();
      res.json(galleries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch galleries" });
    }
  });
  app2.get("/api/galleries/:id", async (req, res) => {
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
  app2.post("/api/galleries", async (req, res) => {
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
  app2.patch("/api/galleries/:id", async (req, res) => {
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
  app2.delete("/api/galleries/:id", async (req, res) => {
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
  app2.post("/api/upload", upload.single("image"), (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import { webcrypto } from "crypto";
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __dirname = path2.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  base: "/AlumniGallery/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "client", "src"),
      "@shared": path2.resolve(__dirname, "shared"),
      "@assets": path2.resolve(__dirname, "attached_assets")
    }
  },
  root: path2.resolve(__dirname, "client"),
  build: {
    outDir: path2.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
var __filename = fileURLToPath2(import.meta.url);
var __dirname2 = path3.dirname(__filename);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(__dirname2, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto2;
}
var app = express3();
app.use(express3.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
