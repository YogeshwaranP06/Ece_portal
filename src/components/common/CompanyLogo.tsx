import { Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface CompanyLogoProps {
  website?: string;
  companyName: string;
  logoUrl?: string;
  className?: string;
  iconClassName?: string;
}

export function CompanyLogo({ website, companyName, logoUrl, className, iconClassName }: CompanyLogoProps) {
  const [errorLevel, setErrorLevel] = useState(0);

  let domain = "";
  try {
    if (website) {
      let host = new URL(website).hostname;
      if (host.startsWith('www.')) host = host.substring(4);
      
      const parts = host.split('.');
      if (parts.length > 2 && parts[parts.length-2] !== 'co' && parts[parts.length-2] !== 'com' && parts[parts.length-2] !== 'in') {
        domain = parts.slice(-2).join('.');
      } else if (parts.length > 3) {
        domain = parts.slice(-3).join('.');
      } else {
        domain = host;
      }
    }
  } catch (e) {
    domain = "";
  }
  
  // Custom fixes for specific bad domains
  if (domain === 'samsungr&d.com') domain = 'samsung.com';
  if (domain === 'amazon.jobs') domain = 'amazon.com';
  if (domain === 'hyundaimotorindia.com') domain = 'hyundai.com';
  if (domain === 'renaultnissan.in') domain = 'nissan-global.com';
  if (companyName === 'L&T') domain = 'larsentoubro.com';
  if (domain === 'mindtree.com') domain = 'ltimindtree.com';

  let customLogoUrl = logoUrl;
  if (companyName === 'Mindtree' || companyName === 'LTIMindtree') {
    customLogoUrl = '/logos/Mindtree.jpg';
  }

  // Order of preference: Custom URL -> Clearbit -> Google Favicon -> UI Avatars
  const sources = [
    customLogoUrl || null,
    domain ? `https://logo.clearbit.com/${domain}` : null,
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=random&color=fff&size=128&font-size=0.4`
  ].filter(Boolean) as string[];

  const currentSrc = sources[errorLevel];

  if (errorLevel >= sources.length || !currentSrc) {
    return (
      <div className={cn("bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0", className)}>
        <Building2 className={iconClassName || "w-6 h-6"} />
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0", className)}>
      <img
        src={currentSrc}
        alt={`${companyName} Logo`}
        className={cn("w-full h-full object-contain", errorLevel === 2 ? "" : "p-1.5")}
        onError={() => {
          setErrorLevel(prev => prev + 1);
        }}
      />
    </div>
  );
}
