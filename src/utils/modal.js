import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const modalContent = withReactContent(Swal);

export const showModal = (body, width) => {
    modalContent.fire({
        width: width,
        html: body,
        showCloseButton: true,
        showConfirmButton: false,
    });
}