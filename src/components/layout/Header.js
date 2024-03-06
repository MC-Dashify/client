import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import Button from "@/components/common/Button";
import routes from "@/constants/routes";
import BottomArrowWithoutShaftIcon from "@/assets/icons-16x/BottomArrowWithoutShaft.svg";
import LocalStorage from "@/lib/localstorage";

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex: 1 0 0;
  width: 0;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 100%;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Domain = styled.div`
  font-size: 24px;
  line-height: 100%;
  font-weight: 400;
  opacity: 0.6;
`;

const DropdownSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DropdownSelectLabel = styled.div`
  opacity: 0.6;
  font-weight: 400;
  user-select: none;
`;

const DropdownSelect = styled.div`
  display: flex;
  padding: 4px 2px;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
`;

const exampleData = {
  name: "프로필 이름",
  domain: "example.com",
  port: 8080,
};

const Header = () => {
  const { name, domain } = exampleData;
  const INITIAL_REFRESH_PERIOD = 15;

  const pathname = usePathname();
  const currentRoute = pathname.split("/")[3]; // /[locale]/dashboard/overview에서 overview
  const { hasAutoRefresh, hasRefresh } = routes[currentRoute];

  const [selectedRefreshPeriod, setSelectedRefreshPeriod] = useState(
    new Set([INITIAL_REFRESH_PERIOD])
  );

  // 로컬 스토리지를 관장하는 useEffect들은 hooks/useLocalStorage.js와 생김새가 유사한데,
  // 굳이 hook을 쓰지 않은 이유는 스토리지 key 이름을 currentRoute에 맞춰 동적으로 관리해야
  // 하기 때문입니다. hook을 쓰면 useRefreshPeriod(page) 꼴로 사용해야 하는데,
  // currentRoute가 바뀌어도 hook에는 변화가 없기 때문에 새로고침 주기에 이상이 생깁니다.

  useEffect(() => {
    // Next.js에서는 window 객체가 서버에서는 존재하지 않기 때문에
    // 존재 여부를 먼저 확인해야 합니다.

    !hasAutoRefresh && setSelectedRefreshPeriod(new Set([]));

    const fromLocal = () => {
      if (typeof window === "undefined") {
        return INITIAL_REFRESH_PERIOD;
      }

      try {
        const item = LocalStorage.getItem(
          `settings.refreshPeriod.${currentRoute}`
        );

        return item !== null ? item : INITIAL_REFRESH_PERIOD;
      } catch (error) {
        console.error(error);

        return INITIAL_REFRESH_PERIOD;
      }
    };

    setSelectedRefreshPeriod(new Set([fromLocal()]));
  }, [currentRoute, hasAutoRefresh]);

  useEffect(() => {
    // Next.js에서는 window 객체가 서버에서는 존재하지 않기 때문에
    // 존재 여부를 먼저 확인해야 합니다.

    try {
      if (typeof window !== "undefined" && hasAutoRefresh) {
        LocalStorage.setItem(
          `settings.refreshPeriod.${currentRoute}`,
          Array.from(selectedRefreshPeriod)[0]
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedRefreshPeriod, currentRoute, hasAutoRefresh]);

  const memoedRefreshPeriod = useMemo(
    () => Array.from(selectedRefreshPeriod)[0],
    [selectedRefreshPeriod]
  );

  // 추후 i18n을 위해 Header 컴포넌트에서 안으로 넣었습니다.
  const refreshDropdownOptions = [
    { label: "1초", key: 1 },
    { label: "3초", key: 3 },
    { label: "5초", key: 5 },
    { label: "10초", key: 10 },
    { label: "15초", key: 15 },
    { label: "30초", key: 30 },
    { label: "1분", key: 60 },
  ];

  return (
    <HeaderBox>
      <TitleContainer>
        <Title>{name}</Title>

        <Domain>({domain})</Domain>
      </TitleContainer>

      {hasAutoRefresh && (
        <DropdownSelectWrapper>
          <DropdownSelectLabel>새로 고침 주기</DropdownSelectLabel>

          <Dropdown>
            <DropdownTrigger>
              <DropdownSelect tabIndex={0}>
                {
                  refreshDropdownOptions.find(
                    (i) => i.key === Number(memoedRefreshPeriod)
                  ).label
                }

                <BottomArrowWithoutShaftIcon width={16} height={16} />
              </DropdownSelect>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="새로 고침 주기 선택"
              selectionMode="single"
              disallowEmptySelection={true}
              selectedKeys={selectedRefreshPeriod}
              onSelectionChange={setSelectedRefreshPeriod}
            >
              {refreshDropdownOptions.map(({ label, key }) => (
                <DropdownItem key={key}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </DropdownSelectWrapper>
      )}

      {hasRefresh && (
        <Button
          variant="tertiary"
          size="small"
          onClick={() => {
            // TODO 새로고침
          }}
        >
          지금 새로 고침
        </Button>
      )}
    </HeaderBox>
  );
};

export default Header;
