"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  BottomNavigation,
  AnimatedCard,
  StaggeredCardList,
  GlassCard,
  EmptyState,
  Chip,
  ChipGroup,
  ProgressBar,
  CircularProgress,
  SkeletonCard,
  SkeletonList,
  AnimatedModal,
} from "@/components/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { toast } from "sonner";
import {
  Home,
  Compass,
  CalendarDays,
  User,
  MapPin,
  Globe,
  CreditCard,
  Star,
  Plus,
  Search,
  Bell,
  Smartphone,
} from "lucide-react";
import { pageVariants } from "@/lib/animations";

export const dynamic = 'force-dynamic';
export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState("components");
  const [modalOpen, setModalOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/showcase", icon: <Home className="h-4 w-4" /> },
    { label: "Explore", href: "/explore", icon: <Compass className="h-4 w-4" /> },
    { label: "Trips", href: "/trips", icon: <CalendarDays className="h-4 w-4" /> },
  ];

  const bottomNavItems = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Explore", href: "/explore", icon: <Compass className="h-5 w-5" /> },
    { label: "Trips", href: "/trips", icon: <CalendarDays className="h-5 w-5" />, badge: 3 },
    { label: "Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  const chipData = [
    { label: "Europe", variant: "primary" as const },
    { label: "Asia", variant: "secondary" as const },
    { label: "Beach", variant: "default" as const },
    { label: "Adventure", variant: "outline" as const },
    { label: "Budget", variant: "destructive" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <Navbar
          brand={<NavbarBrand />}
          items={navItems}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="sm" className="hidden sm:flex">
                Get Started
              </Button>
            </div>
          }
        />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-24">
          {/* Page Header */}
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              JourneyOS Design System
            </h1>
            <p className="mt-2 text-muted-foreground">
              Production-ready component library. Mobile-first. Accessible. Premium.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
            </TabsList>

            {/* ────────────────────────────────
                COMPONENTS TAB
                ──────────────────────────────── */}
            <TabsContent value="components" className="space-y-8">
              {/* Buttons */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Buttons</h2>
                <StaggeredCardList className="gap-4">
                  <AnimatedCard>
                    <h3 className="mb-3 font-medium">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h3 className="mb-3 font-medium">Sizes</h3>
                    <div className="flex flex-wrap items-end gap-2">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h3 className="mb-3 font-medium">With Icons</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Trip
                      </Button>
                      <Button variant="outline">
                        <Search className="mr-2 h-4 w-4" /> Search
                      </Button>
                    </div>
                  </AnimatedCard>
                </StaggeredCardList>
              </section>

              {/* Badges */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Badges</h2>
                <AnimatedCard>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Urgent</Badge>
                    <Badge className="bg-success text-white">Success</Badge>
                  </div>
                </AnimatedCard>
              </section>

              {/* Inputs */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Inputs</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AnimatedCard>
                    <Label htmlFor="email" className="mb-2 block">Email</Label>
                    <Input id="email" type="email" placeholder="traveler@journeyos.com" />
                  </AnimatedCard>
                  <AnimatedCard>
                    <Label htmlFor="search" className="mb-2 block">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="search" placeholder="Search destinations..." className="pl-9" />
                    </div>
                  </AnimatedCard>
                </div>
              </section>

              {/* Cards */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Cards</h2>
                <StaggeredCardList className="gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trip to Tokyo</CardTitle>
                      <CardDescription>April 15 – April 28, 2026</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Tokyo, Japan</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>$3,450 estimated</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Paris Explorer</CardTitle>
                      <CardDescription>June 1 – June 10, 2026</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Paris, France</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>$2,800 estimated</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                </StaggeredCardList>
              </section>

              {/* Chips */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Chips</h2>
                <AnimatedCard>
                  <ChipGroup>
                    {chipData.map((chip) => (
                      <Chip key={chip.label} label={chip.label} variant={chip.variant} />
                    ))}
                  </ChipGroup>
                </AnimatedCard>
              </section>

              {/* Progress */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Progress</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AnimatedCard>
                    <h3 className="mb-4 font-medium">Linear Progress</h3>
                    <div className="space-y-4">
                      <ProgressBar value={75} variant="default" showLabel />
                      <ProgressBar value={100} variant="success" showLabel />
                      <ProgressBar value={45} variant="warning" showLabel />
                      <ProgressBar value={20} variant="error" showLabel />
                    </div>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h3 className="mb-4 font-medium">Circular Progress</h3>
                    <div className="flex items-center justify-around">
                      <CircularProgress value={75} variant="default" />
                      <CircularProgress value={100} variant="success" />
                      <CircularProgress value={45} variant="warning" />
                    </div>
                  </AnimatedCard>
                </div>
              </section>

              {/* Loading Skeletons */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Loading Skeletons</h2>
                <StaggeredCardList className="gap-4 sm:grid-cols-2">
                  <AnimatedCard>
                    <h3 className="mb-3 font-medium">Card Skeleton</h3>
                    <SkeletonCard />
                  </AnimatedCard>
                  <AnimatedCard>
                    <h3 className="mb-3 font-medium">List Skeleton</h3>
                    <SkeletonList count={3} />
                  </AnimatedCard>
                </StaggeredCardList>
              </section>

              {/* Empty State */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Empty State</h2>
                <AnimatedCard>
                  <EmptyState
                    icon={<Globe className="h-8 w-8" />}
                    title="No trips yet"
                    description="Start planning your next adventure. Add your first trip to begin organizing your journey."
                    action={{
                      label: "Create Trip",
                      onClick: () => toast.success("Trip created! (demo)"),
                    }}
                  />
                </AnimatedCard>
              </section>

              {/* Toast */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Toasts</h2>
                <AnimatedCard>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => toast("Trip saved successfully!")}>
                      Default Toast
                    </Button>
                    <Button variant="outline" onClick={() => toast.success("Booking confirmed")}>
                      Success Toast
                    </Button>
                    <Button variant="outline" onClick={() => toast.warning("Low budget alert")}>
                      Warning Toast
                    </Button>
                    <Button variant="outline" onClick={() => toast.error("Payment failed")}>
                      Error Toast
                    </Button>
                  </div>
                </AnimatedCard>
              </section>

              {/* Modal */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Modal</h2>
                <AnimatedCard>
                  <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                  <AnimatedModal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
                    <h2 className="text-xl font-semibold">Create New Trip</h2>
                    <p className="text-sm text-muted-foreground">
                      Fill in the details below to start planning your next adventure.
                    </p>
                    <Separator />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Destination</Label>
                        <Input placeholder="e.g. Tokyo, Japan" />
                      </div>
                      <div className="space-y-2">
                        <Label>Budget</Label>
                        <Input placeholder="$3,000" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button onClick={() => { setModalOpen(false); toast.success("Trip created!"); }}>
                        Create Trip
                      </Button>
                    </div>
                  </AnimatedModal>
                </AnimatedCard>
              </section>
            </TabsContent>

            {/* ────────────────────────────────
                TOKENS TAB
                ──────────────────────────────── */}
            <TabsContent value="tokens" className="space-y-8">
              {/* Colors */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Brand Colors</h2>
                <div className="grid gap-3 sm:grid-cols-5">
                  {[
                    { name: "Primary", color: "#2563EB", text: "text-white" },
                    { name: "Secondary", color: "#7C3AED", text: "text-white" },
                    { name: "Accent", color: "#F59E0B", text: "text-white" },
                    { name: "Success", color: "#10B981", text: "text-white" },
                    { name: "Error", color: "#EF4444", text: "text-white" },
                  ].map((c) => (
                    <div key={c.name} className="space-y-2">
                      <div
                        className={`h-20 rounded-xl ${c.text} flex items-center justify-center font-semibold text-sm`}
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{c.color}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Typography */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Typography Scale</h2>
                <AnimatedCard>
                  <div className="space-y-3">
                    <div><span className="text-2xl font-bold">Heading 1</span> <span className="text-xs text-muted-foreground ml-2">2.25rem / 700</span></div>
                    <div><span className="text-xl font-bold">Heading 2</span> <span className="text-xs text-muted-foreground ml-2">1.875rem / 700</span></div>
                    <div><span className="text-lg font-semibold">Heading 3</span> <span className="text-xs text-muted-foreground ml-2">1.5rem / 600</span></div>
                    <div><span className="text-base font-semibold">Heading 4</span> <span className="text-xs text-muted-foreground ml-2">1.25rem / 600</span></div>
                    <div><span className="text-sm">Body Large</span> <span className="text-xs text-muted-foreground ml-2">1.125rem</span></div>
                    <div><span className="text-sm">Body Base</span> <span className="text-xs text-muted-foreground ml-2">1rem</span></div>
                    <div><span className="text-xs">Body Small</span> <span className="text-xs text-muted-foreground ml-2">0.875rem</span></div>
                  </div>
                </AnimatedCard>
              </section>

              {/* Spacing */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Spacing Scale</h2>
                <AnimatedCard>
                  <div className="space-y-2">
                    {[4, 8, 16, 24, 32, 48, 64].map((px) => (
                      <div key={px} className="flex items-center gap-3">
                        <span className="w-12 text-xs text-muted-foreground font-mono">{px}px</span>
                        <div className="h-6 bg-brand/20 rounded" style={{ width: `${px}px` }} />
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </section>

              {/* Shadows */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Elevation & Shadows</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { name: "XS", shadow: "0 1px 2px 0 rgba(0,0,0,0.05)" },
                    { name: "SM", shadow: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)" },
                    { name: "MD", shadow: "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05)" },
                    { name: "LG", shadow: "0 10px 15px -3px rgba(0,0,0,0.08)" },
                    { name: "XL", shadow: "0 20px 25px -5px rgba(0,0,0,0.08)" },
                    { name: "2XL", shadow: "0 25px 50px -12px rgba(0,0,0,0.15)" },
                  ].map((s) => (
                    <div
                      key={s.name}
                      className="h-24 rounded-xl bg-card border border-border flex items-center justify-center"
                      style={{ boxShadow: s.shadow }}
                    >
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Border Radius */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Border Radius</h2>
                <div className="grid gap-3 sm:grid-cols-5">
                  {[
                    { name: "none", value: "0" },
                    { name: "sm", value: "0.25rem" },
                    { name: "md", value: "0.5rem" },
                    { name: "lg", value: "0.625rem" },
                    { name: "xl", value: "0.875rem" },
                  ].map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-2">
                      <div
                        className="h-16 w-16 bg-brand/20 border border-brand/30"
                        style={{ borderRadius: r.value }}
                      />
                      <span className="text-xs text-muted-foreground">{r.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* ────────────────────────────────
                PATTERNS TAB
                ──────────────────────────────── */}
            <TabsContent value="patterns" className="space-y-8">
              {/* Navigation Bar Preview */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Navigation Bar</h2>
                <div className="rounded-xl border border-border overflow-hidden">
                  <Navbar
                    brand={<NavbarBrand />}
                    items={navItems}
                    actions={
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Get Started</Button>
                      </div>
                    }
                    sticky={false}
                  />
                </div>
              </section>

              {/* Bottom Navigation Preview */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Bottom Navigation (Mobile)</h2>
                <div className="rounded-xl border border-border overflow-hidden bg-background">
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-2">
                      <Smartphone className="mx-auto h-8 w-8" />
                      <p className="text-sm">Visible on mobile devices</p>
                    </div>
                  </div>
                  <BottomNavigation items={bottomNavItems} className="relative" />
                </div>
              </section>

              {/* Glass Card */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Glass Card</h2>
                <div className="rounded-xl bg-gradient-to-br from-brand/10 to-brand-secondary/10 p-8">
                  <GlassCard>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-brand flex items-center justify-center">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Premium Card</p>
                        <p className="text-sm text-muted-foreground">Glass morphism effect</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </main>

        {/* Bottom Navigation (Mobile) */}
        <BottomNavigation items={bottomNavItems} />

        {/* Toaster */}
        <Toaster richColors position="top-center" />
      </div>
  );
}
