import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const modalContent = withReactContent(Swal);

/* 
  @param {string} body - The body of the modal
  @param {number} width - The width of the modal
  @param {object} options - The options of the modal
  @example
  showModal('Hello World', 600, { title: 'Hello World' })
  showModal(<div>This is toast</div>, 600, { toast: true })
*/
export const showModal = (body, width, options) => {
  modalContent.fire({
    width: width,
    html: body,
    showCloseButton: true,
    showConfirmButton: false,
    ...options
  });
};
