import { useRedirect } from "@/lib/redirect";

const Redirect = () => {
  // 프로젝트가 output: "export"로 설정되어 있다면 Next.js의 i18n 기능을
  // 이용할 수 없기 때문에 기능을 비슷하게 모방했습니다.
  // Root 페이지로 접속할 경우 자동으로 사용자 언어를 감지해 [locale]/로
  // 리다이렉트합니다.
  // https://dev.to/ikramdeveloper/i18n-with-nextjs-output-export-1pbc
  useRedirect();

  return <></>;
};

export default Redirect;
