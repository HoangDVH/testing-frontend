import { Link } from "react-router-dom";
import "./SectionHeader.css";

interface SectionHeaderProps {
  label: string;
  title: string;
  viewAllHref?: string;
}

export default function SectionHeader({
  label,
  title,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div>
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {viewAllHref && (
        <Link to={viewAllHref} className="section-header__link">
          View all →
        </Link>
      )}
    </header>
  );
}
