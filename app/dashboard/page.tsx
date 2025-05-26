import DasboardComponent from "@/components/Dashboard/DasboardComponent";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DasboardComponent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
