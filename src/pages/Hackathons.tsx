import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  Calendar,
  Trophy,
  ExternalLink,
  Activity,
  Filter,
  Zap,
} from "lucide-react";
import { mockHackathons } from "@/src/data/hackathons";
import { cn } from "@/src/lib/utils";

const getMonthGroup = (dateStr: string) => {
  const d = dateStr.toLowerCase();
  let month = 'Other';
  if (d.includes('jan')) month = 'January';
  else if (d.includes('feb')) month = 'February';
  else if (d.includes('mar')) month = 'March';
  else if (d.includes('apr')) month = 'April';
  else if (d.includes('may')) month = 'May';
  else if (d.includes('jun')) month = 'June';
  else if (d.includes('jul')) month = 'July';
  else if (d.includes('aug')) month = 'August';
  else if (d.includes('sep')) month = 'September';
  else if (d.includes('oct')) month = 'October';
  else if (d.includes('nov')) month = 'November';
  else if (d.includes('dec')) month = 'December';
  
  if (month === 'Other') return 'Other';
  
  const yearMatch = dateStr.match(/\b(20\d{2})\b/);
  const year = yearMatch ? yearMatch[1] : '2026'; // Default to 2026 if no year found
  
  return `${month} ${year}`;
};

export default function Hackathons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [selectedEventType, setSelectedEventType] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const statuses = ["All", "Upcoming", "Ongoing", "Completed"];
  const modes = ["All", "Online", "Offline", "Hybrid"];
  const allDomains = useMemo(() => {
    const domains = new Set<string>();
    mockHackathons.forEach(h => h.domain.forEach(d => domains.add(d)));
    return ["All", ...Array.from(domains).sort()];
  }, []);

  const allEventTypes = useMemo(() => {
    const types = new Set<string>();
    mockHackathons.forEach(h => {
      if (h.eventType) types.add(h.eventType);
      else types.add('Hackathon'); // legacy fallback
    });
    return ["All", ...Array.from(types).sort()];
  }, []);

  const filteredHackathons = useMemo(() => {
    return mockHackathons.filter((hackathon) => {
      // Exclude past registration dates
      if (hackathon.registrationEndDate) {
        const endDate = new Date(hackathon.registrationEndDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (endDate.getTime() < today.getTime()) {
          return false;
        }
      }



      const matchesSearch =
        hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.organization
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getMonthGroup(hackathon.date).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || hackathon.status === selectedStatus;
        
      const matchesMode = 
        selectedMode === "All" || hackathon.mode === selectedMode;
        
      const matchesDomain =
        selectedDomain === "All" || hackathon.domain.includes(selectedDomain);

      const matchesEventType = 
        selectedEventType === "All" || (hackathon.eventType || 'Hackathon') === selectedEventType;

      return matchesSearch && matchesStatus && matchesMode && matchesDomain && matchesEventType;
    });
  }, [searchQuery, selectedStatus, selectedMode, selectedDomain, selectedEventType]);

  const groupedHackathons = useMemo(() => {
    const groups: Record<string, typeof mockHackathons> = {};
    filteredHackathons.forEach(h => {
      const group = getMonthGroup(h.date);
      if (!groups[group]) groups[group] = [];
      groups[group].push(h);
    });

    return groups;
  }, [filteredHackathons]);

  const monthOrder: Record<string, number> = {
    'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
    'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12, 'Other': 13
  };

  const sortedMonths = Object.keys(groupedHackathons).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
    
    const yearDiff = (parseInt(yearA) || 0) - (parseInt(yearB) || 0);
    if (yearDiff !== 0) return yearDiff;
    
    return (monthOrder[monthA] || 0) - (monthOrder[monthB] || 0);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Ongoing":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Completed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
          Events & Competitions
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Discover and participate in upcoming hardware events, design challenges, and software hackathons
          to showcase your skills and win prizes.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 mb-8 flex flex-col gap-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search hackathons, domains, organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main transition-all text-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              Domain
            </h3>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main"
            >
              {allDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              Event Type
            </h3>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main"
            >
              {allEventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              Mode
            </h3>
            <div className="flex overflow-x-auto hide-scrollbar p-1 bg-background border border-border rounded-xl">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all shrink-0",
                    selectedMode === mode
                      ? "bg-surface text-primary shadow-sm border border-border/50"
                      : "text-text-muted hover:text-text-main border border-transparent",
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              Status
            </h3>
            <div className="flex overflow-x-auto hide-scrollbar p-1 bg-background border border-border rounded-xl">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all shrink-0",
                    selectedStatus === status
                      ? "bg-surface text-primary shadow-sm border border-border/50"
                      : "text-text-muted hover:text-text-main border border-transparent",
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-display font-medium text-text-main">
          {filteredHackathons.length}{" "}
          {filteredHackathons.length === 1 ? "Event" : "Events"} Found
        </h2>
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {sortedMonths.map((month) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-display font-bold text-text-main">
                  {month}
                </h2>
                <div className="h-px bg-border flex-1 mt-2" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {groupedHackathons[month].map((hackathon) => (
                  <motion.div
                    key={hackathon.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-surface border border-border rounded-2xl p-6 flex flex-col h-full hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] z-0 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 origin-top-right" />
                    
                    <div className="relative z-10 flex justify-between items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-xl text-text-main group-hover:text-primary transition-colors line-clamp-2">
                            {hackathon.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-muted">
                          {hackathon.organization}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium border text-center w-full",
                            getStatusColor(hackathon.status),
                          )}
                        >
                          {hackathon.status}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 text-center w-full truncate max-w-[100px]" title={hackathon.eventType || 'Hackathon'}>
                          {hackathon.eventType || 'Hackathon'}
                        </span>
                      </div>
                    </div>

                    <p className="relative z-10 text-sm text-text-muted mb-6 flex-1 line-clamp-3">
                      {hackathon.description}
                    </p>

                    <div className="relative z-10 flex flex-col gap-3 mb-6 bg-background rounded-xl p-4 border border-border group-hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-text-main">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{hackathon.date}</span>
                      </div>
                      {hackathon.location ? (
                        <div className="flex items-center gap-2 text-sm text-text-main">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span className="truncate">
                            {hackathon.location} ({hackathon.mode})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-text-main">
                          <Activity className="w-4 h-4 text-emerald-600" />
                          <span>{hackathon.mode}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-text-main">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-medium text-amber-700">
                          {hackathon.prizePool}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                      {hackathon.domain.map((domain, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-surface border border-border rounded-md text-xs text-text-muted font-medium"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>

                    {hackathon.registrationLink && hackathon.registrationLink !== '#' && (
                      <a
                        href={hackathon.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "relative z-10 mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all group/btn",
                          (hackathon.status === "Completed" || hackathon.status === "Closed")
                            ? "bg-surface border border-border text-text-muted cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary-dark shadow-md",
                        )}
                        onClick={(e) =>
                          (hackathon.status === "Completed" || hackathon.status === "Closed") && e.preventDefault()
                        }
                      >
                        {(hackathon.status === "Completed" || hackathon.status === "Closed")
                          ? "Registration Closed"
                          : "Register Now"}
                        {hackathon.status !== "Completed" && hackathon.status !== "Closed" && (
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        )}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredHackathons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-surface border border-border rounded-2xl"
        >
          <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border">
            <Search className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-2xl font-display font-medium mb-3">
            No events found
          </h3>
          <p className="text-text-muted max-w-md mx-auto">
            Try adjusting your filters or search query.
          </p>
        </motion.div>
      )}
    </div>
  );
}
