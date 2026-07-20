# JourneyOS Database Architecture

---

## Document Information

| Field | Value |
|--------|-------|
| Document | Database Architecture |
| Version | 1.0 |
| Status | Approved |
| Owner | Founder |
| Project | JourneyOS |
| Last Updated | July 2026 |

---

# Purpose

This document defines the complete database architecture of JourneyOS.

It serves as the single source of truth for every database decision.

The database must support Version 1 while remaining flexible enough to support future versions without requiring major redesigns.

The objective is not only to store data, but to model the travel experience.

---

# Database Philosophy

JourneyOS is an Intelligent Travel Operating System.

Therefore, the database is designed around business concepts rather than individual features.

Instead of asking:

"What tables do we need?"

We ask:

"What real-world objects exist inside a travel journey?"

This approach produces a cleaner architecture that scales naturally as the product grows.

---

# Design Principles

The database follows these principles.

## 1. Domain-Driven Design

Tables are grouped by business domain rather than technical function.

Each domain owns its own data and responsibilities.

---

## 2. Single Responsibility

Every table has exactly one responsibility.

Avoid tables that try to represent multiple concepts.

---

## 3. Extensibility

New travel providers, countries, AI models, payment systems, and future features should be added without redesigning existing tables.

---

## 4. Data Integrity

Relationships must be enforced using foreign keys, constraints, and validation.

The application should never rely solely on frontend validation.

---

## 5. Privacy by Design

Personal information is protected by default.

Sensitive information is stored only when necessary.

Every user owns their own data.

---

## 6. AI-Ready

The schema is designed so AI can understand user preferences, trips, history, and behavior without complex joins.

---

## 7. Analytics Ready

The schema should support future dashboards and business intelligence without redesign.

---

# Business Domains

JourneyOS is divided into independent business domains.

Each domain owns its own entities.

---

## Identity Domain

Responsible for user identity.

Entities:

- User
- Profile
- Travel DNA
- Subscription
- Session
- Authentication Metadata

---

## Travel Domain

Responsible for every journey.

Entities:

- Trip
- Destination
- Trip Day
- Booking
- Activity
- Packing List
- Checklist
- Travel Document
- Notes

---

## Finance Domain

Responsible for travel spending.

Entities:

- Budget
- Expense
- Expense Category
- Currency
- Exchange Rate

---

## Intelligence Domain

Responsible for intelligent recommendations.

Entities:

- AI Recommendation
- AI Insight
- AI Alert
- Weather Snapshot
- Visa Information
- Travel Risk
- Currency Snapshot

---

## Knowledge Domain

Stores reusable travel knowledge.

Entities:

- Country
- City
- Airport
- Airline
- Hotel Provider
- Currency Metadata
- Language
- Time Zone
- Emergency Contacts

This domain contains reference information shared by all users.

---

## Community Domain

Responsible for traveler interaction.

Entities:

- Post
- Comment
- Like
- Saved Place
- Shared Itinerary
- Destination Review

---

## System Domain

Responsible for platform operations.

Entities:

- Notification
- Audit Log
- Settings
- Feature Flags
- App Configuration

---

# Entity Relationships

High-level business relationships:

User

↓

Profile

↓

Travel DNA

↓

Trips

↓

Destinations

↓

Bookings

↓

Activities

↓

Expenses

↓

AI Recommendations

↓

Notifications

A user may own many trips.

Each trip contains many destinations.

Each destination contains multiple activities.

Each trip owns one budget.

A budget contains many expenses.

AI recommendations are generated using Travel DNA together with trip information.

---

# Database Standards

Every table must include:

- UUID primary key
- Created timestamp
- Updated timestamp
- Soft delete support where appropriate

Consistency is mandatory across all domains.

---

# Decision Records

## DB-001

Decision:

Use UUIDs as primary keys.

Reason:

Supports distributed systems, easier synchronization, and avoids predictable IDs.

---

## DB-002

Decision:

Separate authentication from user profile data.

Reason:

Authentication is managed by Supabase while JourneyOS owns application-specific information.

---

## DB-003

Decision:

Organize tables by business domain.

Reason:

Improves scalability and maintainability as the application grows.

---

## DB-004

Decision:

Model travel using reusable entities rather than feature-specific tables.

Reason:

Allows future expansion (new transport types, booking providers, services) without redesigning the schema.

---

# Version Strategy

Every entity is assigned a lifecycle status.

Statuses:

- Planned
- In Development
- Implemented
- Deprecated

Every entity also records the version in which it first appears.

Example:

Trip → V1

Travel Insurance → V2

Group Collaboration → V2

Business Travel → V3

---

# Acceptance Criteria

The database architecture is considered complete when:

✓ Every business concept belongs to exactly one domain.

✓ Every table has a clear responsibility.

✓ Relationships are explicit.

✓ Security is built into the design.

✓ Future versions can extend the schema without major restructuring.

---

# Revision History

| Version | Date | Changes |
|----------|------|----------|
| 1.0 | July 2026 | Initial database philosophy and domain architecture. |