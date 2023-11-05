import DashboardLayout from "@/components/layout/DashboardLayout";

const WorldsPage = () => {
  return (
    <>
      <h1>Worlds Page</h1>
    </>
  );
};

WorldsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WorldsPage;
