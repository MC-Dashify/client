import ChartIcon from "@/assets/icons-24x/Chart.svg";
import ConsoleIcon from "@/assets/icons-24x/Console.svg";
import EarthIcon from "@/assets/icons-24x/Earth.svg";
import PeopleIcon from "@/assets/icons-24x/People.svg";
import ServerIcon from "@/assets/icons-24x/Server.svg";
import UpDownArrowIcon from "@/assets/icons-24x/UpDownArrow.svg";
import CogIcon from "@/assets/icons-24x/Cog.svg";

const commonRoutes = {
  settings: {
    iconComponent: CogIcon,
    text: "routes.settings",
    href: "/settings",
  },
};

const dashboardRoutes = {
  overview: {
    iconComponent: ChartIcon,
    text: "routes.overview",
    href: "/dashboard/overview",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  stats: {
    iconComponent: ServerIcon,
    text: "routes.stats",
    href: "/dashboard/stats",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  worlds: {
    iconComponent: EarthIcon,
    text: "routes.worlds",
    href: "/dashboard/worlds",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  players: {
    iconComponent: PeopleIcon,
    text: "routes.players",
    href: "/dashboard/players",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  traffic: {
    iconComponent: UpDownArrowIcon,
    text: "routes.traffic",
    href: "/dashboard/traffic",
    hasAutoRefresh: true,
    hasRefresh: true,
  },
  console: {
    iconComponent: ConsoleIcon,
    text: "routes.console",
    href: "/dashboard/console",
    hasAutoRefresh: false,
    hasRefresh: false,
  },
};

const routes = {
  ...commonRoutes,
  ...dashboardRoutes,
};

export { commonRoutes, dashboardRoutes };
export default routes;
