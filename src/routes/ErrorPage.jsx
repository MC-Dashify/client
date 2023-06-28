import { useRouteError } from "react-router";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Swal from "sweetalert2";

import Button from "../components/common/Button";

const ErrorPage = () => {
  const error = useRouteError();
  const errorText = `${error.stack}`.replace(/\\n/g, "\n");

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    width: "300",
    showConfirmButton: false,
    iconColor: "white",
    timer: 2000,
    grow: "row",
    timerProgressBar: true,
  });

  const copyToClipboard = () => {
    if (typeof navigator.clipboard == "undefined") {
      Toast.fire({
        icon: "error",
        html: '<span style="color:#ffffff">HTTPS 연결이 아니므로 복사할 수 없습니다.</span>',
        background: "#ff3333",
      });
    } else {
      navigator.clipboard
        .writeText(errorText)
        .then(() => {
          Toast.fire({
            icon: "success",
            html: '<span style="color:#ffffff">복사되었습니다</span>',
            background: "#3B86F8",
          });
        })
        .catch((e) => {
          Toast.fire({
            icon: "error",
            html: '<span style="color:#ffffff">복사에 실패하였습니다.</span>',
            background: "#ff3333",
          });
        });
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <h1>에러가 났어용</h1>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <SyntaxHighlighter language="js" style={docco}>
          {errorText}
        </SyntaxHighlighter>

        <Button
          onClick={copyToClipboard}
        >
          <div>클립보드에 복사하기</div>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
