import ChartIcon from "@/assets/icons-24x/Chart.svg";
import ConsoleIcon from "@/assets/icons-24x/Console.svg";
import EarthIcon from "@/assets/icons-24x/Earth.svg";
import PeopleIcon from "@/assets/icons-24x/People.svg";
import ServerIcon from "@/assets/icons-24x/Server.svg";
import UpDownArrowIcon from "@/assets/icons-24x/UpDownArrow.svg";

const routes = {
  overview: {
    iconComponent: ChartIcon,
    text: "개요",
    href: "/dashboard/overview",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  stats: {
    iconComponent: ServerIcon,
    text: "서버 상태",
    href: "/dashboard/stats",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  worlds: {
    iconComponent: EarthIcon,
    text: "세계",
    href: "/dashboard/worlds",
    hasAutoRefresh: false,
    hasRefresh: true,
  },
  players: {
    iconComponent: PeopleIcon,
    text: "플레이어",
    href: "/dashboard/players",
    hasAutoRefresh: false,
    hasRefresh: true,
  },
  traffic: {
    iconComponent: UpDownArrowIcon,
    text: "트래픽",
    href: "/dashboard/traffic",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  console: {
    iconComponent: ConsoleIcon,
    text: "콘솔 / 로그",
    href: "/dashboard/console",
    hasAutoRefresh: false,
    hasRefresh: false,
  },
};

export default routes;
