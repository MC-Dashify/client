import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

const StatsPage = () => {
  return (
    <>
      <h1>Stats Page</h1>

      <Link href="/dashboard/overview">overview</Link>
      <Link href="/">root</Link>
    </>
  );
};

StatsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StatsPage;
