import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  X,
  Zap,
  Cpu,
  Code,
  Radio,
  Activity,
} from "lucide-react";
import { mockCompanies } from "@/src/data/companies";
import { CompanyCard } from "@/src/components/features/CompanyCard";
import { MAIN_DOMAINS, getCompanyDomains } from "@/src/lib/domainMapping";
import { cn } from "@/src/lib/utils";

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOfferTypes, setSelectedOfferTypes] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"primary" | "common">("primary");

  const offerTypes = ["Regular", "Dream", "Super Dream", "Marquee"];



  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((company) => {
      const matchesSearch =
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOfferType =
        selectedOfferTypes.length === 0 ||
        selectedOfferTypes.some((type) =>
          company.offerType.split("/").map((s) => s.trim()).includes(type)
        );

      const { primary, secondary } = getCompanyDomains(company);
      
      let matchesDomain = true;
      if (selectedDomains.length > 0) {
        if (filterMode === "primary") {
          matchesDomain = selectedDomains.includes(primary);
        } else {
          const companyDomains = [primary, ...(secondary ? [secondary] : [])];
          matchesDomain = selectedDomains.every((domain) =>
            companyDomains.includes(domain)
          );
        }
      }

      return matchesSearch && matchesOfferType && matchesDomain;
    });
  }, [searchQuery, selectedOfferTypes, selectedDomains, filterMode]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain],
    );
  };

  const toggleOfferType = (type: string) => {
    setSelectedOfferTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case "Semiconductor":
        return <Cpu className="w-5 h-5" />;
      case "Embedded Systems & Robotics":
        return <Zap className="w-5 h-5" />;
      case "Digital Signal Processing":
        return <Activity className="w-5 h-5" />;
      case "Communication Systems":
        return <Radio className="w-5 h-5" />;
      case "Software / IT":
        return <Code className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-16 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">
            Company Directory
          </span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto font-medium">
          Explore recruitment partners, analyze domain requirements, and discover your ideal role across core and IT sectors.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-10 flex flex-col gap-8 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Search */}
        <div className="relative w-full z-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search by company name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 transition-all text-lg font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-slate-200/50 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Domain Filter */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                Filtering Mode
              </h3>
              <div className="flex items-center gap-1 bg-slate-100/80 border border-slate-200/60 p-1 rounded-xl inline-flex">
                <button
                  onClick={() => setFilterMode("primary")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    filterMode === "primary"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Primary Domain Only
                </button>
                <button
                  onClick={() => setFilterMode("common")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    filterMode === "common"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Common Domain Match
                </button>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
              Filter by Domain
            </h3>
            <div className="flex flex-wrap gap-2">
              {MAIN_DOMAINS.map((domain) => {
                const isActive = selectedDomains.includes(domain);
                return (
                  <button
                    key={domain}
                    onClick={() => toggleDomain(domain)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                      isActive
                        ? "bg-primary/10 text-primary border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        : "bg-background text-text-muted border-border hover:border-text-muted/30 hover:text-text-main",
                    )}
                  >
                    {getDomainIcon(domain)}
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offer Type Filter */}
          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
              Offer Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {offerTypes.map((type) => {
                const isActive = selectedOfferTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleOfferType(type)}
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm font-medium transition-all border",
                      isActive
                        ? "bg-primary/10 text-primary border-primary/50"
                        : "bg-background text-text-muted border-border hover:border-text-muted/30 hover:text-text-main",
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-medium text-text-main">
          {filteredCompanies.length}{" "}
          {filteredCompanies.length === 1 ? "Company" : "Companies"} Found
        </h2>
        {(selectedDomains.length > 0 ||
          selectedOfferTypes.length > 0 ||
          searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDomains([]);
              setSelectedOfferTypes([]);
            }}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCompanies.map((company, index) => (
              <motion.div
                layout
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-surface border border-border rounded-2xl"
        >
          <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border rotate-3">
            <Search className="w-10 h-10 text-text-muted -rotate-3" />
          </div>
          <h3 className="text-2xl font-display font-medium mb-3">
            No matching companies
          </h3>
          <p className="text-text-muted max-w-md mx-auto mb-8">
            We couldn't find any companies matching your current filters. Try
            adjusting your domains or search terms.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDomains([]);
              setSelectedOfferTypes([]);
            }}
            className="px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl hover:bg-primary/20 transition-colors font-medium"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
