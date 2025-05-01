import Swal from 'sweetalert2'

const handleError = (err) => {
    console.log(err)

    if (err.name === 'AxiosError') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message
          });
    }
}

export default handleError