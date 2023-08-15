import { AnimatePresence } from "framer-motion";
import LayoutForTransition from "@/components/layout/LayoutForTransition";

/**
 * 각 대시보드 페이지는 \<LayoutForTransition>를 상위 컴포넌트로 삼고,
 * getLayout으로 \<DashboardLayout>를 반환합니다.
 * 페이지 전환 애니메이션 때문에 구조가 다소 복잡할 수 있습니다. 실제
 * 구동 화면을 보고 전환 애니메이션이 작동하는 부분과 작동하지 않는 부분을
 * 비교해 가면 이해에 도움이 될 것입니다.
 *
 * ```js
 * // _app.js 내용...
 * <AnimatePresence>
 *   <LayoutForTransition>      <--- 여기부터 DashboardLayout
 *     대시보드 레이아웃 내용...
 *     <AnimatePresence>
 *       <DashboardLayout>      <--- 여기부터 페이지
 *         <LayoutForTransition>
 *           페이지 내용...
 * ```
 */
const DashboardLayout = ({ children }) => {
  return (
    <LayoutForTransition>
      <h1>Dashboard Layout</h1>

      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </LayoutForTransition>
  );
};

export default DashboardLayout;
