import DashboardLayout from "@/components/layout/DashboardLayout";

const StatsPage = () => {
  return (
    <>
      <h1>Stats Page</h1>
    </>
  );
};

StatsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StatsPage;
