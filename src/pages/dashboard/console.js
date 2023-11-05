import DashboardLayout from "@/components/layout/DashboardLayout";

const ConsolePage = () => {
  return (
    <>
      <h1>Console Page</h1>
    </>
  );
};

ConsolePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ConsolePage;
