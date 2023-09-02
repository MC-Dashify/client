"use client";

import Link from "next/link";

const OverviewPage = () => {
  return (
    <>
      <Link href="/dashboard/stats">stats</Link>
      <Link href="/">root</Link>
    </>
  );
};

export default OverviewPage;
