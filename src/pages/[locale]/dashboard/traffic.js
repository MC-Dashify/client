import DashboardLayout from "@/components/layout/DashboardLayout";

const TrafficPage = () => {
  return (
    <>
      <h1>Traffic Page</h1>
    </>
  );
};

TrafficPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TrafficPage;
