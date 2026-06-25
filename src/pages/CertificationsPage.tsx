import { CertificationsSection } from '../components/CertificationsSection';
import type { Certification } from '../lib/content';

export function CertificationsPage({ certifications }: { certifications: Certification[] }) {
  return <CertificationsSection certifications={certifications} />;
}
