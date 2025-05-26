import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TrainsPageComponent } from "@/components/Trains/TrainsPageComponent";

export default function TrainsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TrainsPageComponent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
