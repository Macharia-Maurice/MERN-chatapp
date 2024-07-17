import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	openDialog,
	closeDialog,
} from "@/redux/features/responsiveDialog/dialogSlice";

const useResponsiveDialog = (dialogName) => {
	const dispatch = useDispatch();
	//read the isDialog open state form redux
	const isDialogOpen = useSelector(
		(state) => state.dialog.isDialogOpen[dialogName]
	);
	function handleOpenDialog() {
		dispatch(openDialog(dialogName));
	}
	function handleCloseDialog() {
		dispatch(closeDialog(dialogName));
	}

	return { isDialogOpen, handleOpenDialog, handleCloseDialog };
};

export default useResponsiveDialog;
