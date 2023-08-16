import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LayoutForTransition from "@/components/layout/LayoutForTransition";

const StatsPage = () => {
  return (
    <LayoutForTransition key="stats">
      <h1>Stats Page</h1>

      <Link href="/dashboard/overview">overview</Link>
      <Link href="/">root</Link>
    </LayoutForTransition>
  );
};

StatsPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default StatsPage;
