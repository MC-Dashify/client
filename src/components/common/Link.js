import NextLink from "next/link";
import { useRouter } from "next/router";

// styled component를 이용해 컴포넌트를 스타일링하려면 className prop이 있어야 합니다.
// https://stackoverflow.com/q/52542817
const Link = ({ children, skipLocaleHandling, target, className, ...rest }) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || "";

  let href = rest.href || router.asPath;

  if (href.indexOf("http") === 0) skipLocaleHandling = true;

  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace("[locale]", locale);
  }

  return (
    <NextLink href={href} target={target} className={className}>
      {children}
    </NextLink>
  );
};

export default Link;
