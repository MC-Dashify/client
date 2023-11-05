import DashboardLayout from "@/components/layout/DashboardLayout";

const PlayersPage = () => {
  return (
    <>
      <h1>Players Page</h1>
    </>
  );
};

PlayersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PlayersPage;
