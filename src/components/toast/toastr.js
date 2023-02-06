import { toast } from 'react-toastify';

const toastConfig = {
	position: 'bottom-right', // top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
};

export default {
	info(msg) {
		toast.info(msg, toastConfig);
	},
	success(msg) {
		toast.success(msg, toastConfig);
	},
	warn(msg) {
		toast.warn(msg, toastConfig);
	},
	error(msg) {
		toast.error(msg, toastConfig);
	},
	colored(msg) {
		toast(msg, toastConfig);
	},
};