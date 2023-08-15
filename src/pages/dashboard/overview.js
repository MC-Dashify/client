import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LayoutForTransition from "@/components/layout/LayoutForTransition";

const OverviewPage = () => {
  return (
    <LayoutForTransition>
      <h1>Overview Page</h1>

      <Link href="/dashboard/stats">stats</Link>
      <Link href="/">root</Link>
    </LayoutForTransition>
  );
};

OverviewPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OverviewPage;
