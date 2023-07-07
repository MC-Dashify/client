import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  defaults as chartDefaults,
} from "chart.js";
import { registerSW } from "virtual:pwa-register";

import App from "./App";

import AppData from "./storage/data";
import GlobalStyle, { defaultFontFamily } from "./components/common/globalstyles";
import "./styles/font-settings.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
chartDefaults.font.family = defaultFontFamily;
chartDefaults.font.size = 16;

const VERSION = "0.0.1";
AppData.set("etc.version", VERSION);
// XXX VERSION 파일 삭제 논의

const updateSW = registerSW({
  onOfflineReady() {
    toast("오프라인 준비를 완료했습니다. 이제 오프라인 상태에서도 애플리케이션을 사용할 수 있습니다.", {
      id: "offline-ready",
      duration: 4000,
    });
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <GlobalStyle />

      <BrowserRouter>
        <App />
      </BrowserRouter>

      <ReactTooltip id="dashify__tooltip" place="bottom" />
      <Toaster position="bottom-center" />
  </React.StrictMode>
);

updateSW();
