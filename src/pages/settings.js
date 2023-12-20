import DashboardLayout from "@/components/layout/DashboardLayout";

const SettingsPage = () => {
  return (
    <>
      <h1>Settings Page</h1>
    </>
  );
};

SettingsPage.getLayout = (page) => (
  <DashboardLayout hasHeader={false}>{page}</DashboardLayout>
);

export default SettingsPage;
