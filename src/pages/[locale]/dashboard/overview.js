import DashboardLayout from "@/components/layout/DashboardLayout";

const OverviewPage = () => {
  return (
    <>
      <h1>overview Page</h1>
    </>
  );
};

OverviewPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OverviewPage;
