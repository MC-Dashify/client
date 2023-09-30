import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

const OverviewPage = () => {
  return (
    <>
      <h1>overview Page</h1>

      <Link href="/dashboard/stats">stats</Link>
      <Link href="/">root</Link>
    </>
  );
};

OverviewPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OverviewPage;
