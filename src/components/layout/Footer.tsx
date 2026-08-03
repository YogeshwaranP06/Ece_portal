import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Github, Linkedin, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Institution Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-text-main">
              Department of Electronics & Communication Engineering
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              SRM TRP Engineering College
            </p>
            <a 
              href="https://trp.srmtrichy.edu.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors text-sm mt-4"
            >
              <ExternalLink className="w-4 h-4" /> Visit College Website
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-main">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-muted hover:text-primary text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/companies" className="text-text-muted hover:text-primary text-sm transition-colors">Companies</Link>
              </li>
              <li>
                <Link to="/skill-match" className="text-text-muted hover:text-primary text-sm transition-colors">Skill Match</Link>
              </li>
              <li>
                <Link to="/hackathons" className="text-text-muted hover:text-primary text-sm transition-colors">Events & Competitions</Link>
              </li>
              <li>
                <Link to="/faculty" className="text-text-muted hover:text-primary text-sm transition-colors">Faculty Profiles</Link>
              </li>
              <li>
                <Link to="/about" className="text-text-muted hover:text-primary text-sm transition-colors">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-main">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>head.placements@srmtrichy.edu.in</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>+91 70944 43495</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>NH 45, Tirchy – Chennai Highway, Irungalur, Mannachanallur Taluk, Tiruchirappalli District, Tamil Nadu</span>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-main">
              Platform Info
            </h3>
            <div className="space-y-2 text-sm text-text-muted">
              <p>Version: 1.0.0</p>
              <p>Last Updated: July 2026</p>
              <div className="pt-4 border-t border-border/50 space-y-5">
                <div>
                  <p className="font-medium text-text-main">Developed by</p>
                  <p className="text-primary font-bold">Nebula Nexus</p>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-text-main">Lead Developer</p>
                  <a 
                    href="https://www.linkedin.com/in/yogeshwaran-p-7a517a332/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors text-xs mt-0.5"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Yogeshwaran P
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium text-text-main">Co-Developer</p>
                  <a 
                    href="https://www.linkedin.com/in/sivaramakrishnan-s-78613832a/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors text-xs mt-0.5"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Sivaramakrishnan S
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-4 flex flex-col gap-6">
          <p className="text-xs text-text-muted text-center max-w-5xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> This portal is developed for educational and placement guidance purposes. Company information, salary packages, and recruitment processes are based on publicly available data and departmental records and may change over time.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              &copy; {currentYear} Department of Electronics & Communication Engineering, SRM TRP Engineering College. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/srm-trp-engineering-college/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/YogeshwaranP06" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
