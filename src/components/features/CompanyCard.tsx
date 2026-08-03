import { IndianRupee, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/src/types";
import { cn } from "@/src/lib/utils";
import { CompanyLogo } from "@/src/components/common/CompanyLogo";
import { getCompanyDomains } from "@/src/lib/domainMapping";

export function CompanyCard({ 
  company, 
  matchInfo 
}: { 
  company: Company;
  matchInfo?: { matchCount: number; totalReq: number };
}) {
  const getOfferTypeColor = (type: string) => {
    if (type.includes("Marquee")) return "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-700 border-orange-200";
    if (type.includes("Super Dream")) return "bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 text-purple-700 border-purple-200";
    if (type.includes("Dream")) return "bg-gradient-to-r from-blue-500/10 to-sky-500/10 text-blue-700 border-blue-200";
    if (type.includes("Regular")) return "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-200";
    return "bg-primary/10 text-primary border-primary/20";
  };

  const allSkills = [
    ...Object.entries(company.programmingSkills)
      .filter(([_, v]) => v)
      .map(([k]) => k),
    ...Object.entries(company.coreSkills)
      .filter(([_, v]) => v)
      .map(([k]) => k),
  ];

  if (company.coreSkillDomains) {
    Object.values(company.coreSkillDomains).forEach(domain => {
      if (!domain) return;
      Object.entries(domain.traditionalTools || {}).forEach(([k, v]) => {
        if (v) allSkills.push(k);
      });
      Object.entries(domain.aiTools || {}).forEach(([k, v]) => {
        if (v) allSkills.push(k);
      });
    });
  }

  const activeSkills = allSkills.slice(0, 3);

  const { primary, secondary } = getCompanyDomains(company);

  return (
    <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <CompanyLogo
            website={company.website}
            companyName={company.companyName}
            logoUrl={company.logoUrl}
            className="w-16 h-16 rounded-xl group-hover:bg-primary/5 transition-colors shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-xl line-clamp-1" title={company.companyName}>
              {company.companyName}
            </h3>
            <p className="text-text-muted text-sm line-clamp-1" title={company.role}>
              {company.role}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end shrink-0 max-w-[45%]">
          {matchInfo && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-100/80 text-emerald-700 border border-emerald-200 uppercase whitespace-nowrap">
              {matchInfo.matchCount}/{matchInfo.totalReq} Match
            </span>
          )}
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border truncate max-w-full",
              getOfferTypeColor(company.offerType),
            )}
            title={company.offerType}
          >
            {company.offerType}
          </span>
          {primary && (
            <span 
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-slate-100 text-slate-700 border border-slate-200 uppercase truncate max-w-full"
              title={primary}
            >
              {primary}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {secondary && (
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-cyan-600" />
            <span className="text-text-muted truncate">
              Also: {secondary}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <IndianRupee className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-text-main">{company.ctc}</span>
        </div>
      </div>

      <div className="mb-6 flex-1">
        <div className="text-xs text-text-muted mb-2 uppercase tracking-wider font-medium">
          Key Skills Required
        </div>
        <div className="flex flex-wrap gap-2">
          {activeSkills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-background border border-border rounded text-xs text-text-muted capitalize"
            >
              {skill.includes(' ') ? skill : skill.replace(/([A-Z])/g, " $1").trim()}
            </span>
          ))}
          {allSkills.length > 3 && (
            <span className="px-2 py-1 bg-background border border-border rounded text-xs text-text-muted">
              +{allSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <Link
        to={`/companies/${company.id}`}
        className="w-full py-2.5 bg-primary border border-primary rounded-xl text-center font-medium text-sm text-background hover:bg-primary-dark hover:border-primary-dark transition-all mt-auto shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
      >
        View Details
      </Link>
    </div>
  );
}
