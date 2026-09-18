import { getServices } from "@/lib/data";
import { ServicesClient } from "./ServicesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services | PT. Ditek Jaya",
  description: "Comprehensive service support including installation, IQ/OQ/PM qualification, training, troubleshooting, and warranty management.",
};

export default function ServicesPage() {
  const services = getServices();
  return <ServicesClient services={services} />;
}
