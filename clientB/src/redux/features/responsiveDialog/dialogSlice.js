import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDialogOpen: {
		editProfile: false,
		post: false,
		editProfilePicture: false,
	},
};

const dialogSlice = createSlice({
	name: "dialogSlice",
	initialState,
	reducers: {
		openDialog: (state, action) => {
			const dialogName = action.payload;
			if (state.isDialogOpen.hasOwnProperty(dialogName)) {
				state.isDialogOpen[dialogName] = true;
			}
		},
		closeDialog: (state, action) => {
			const dialogName = action.payload;
			if (state.isDialogOpen.hasOwnProperty(dialogName)) {
				state.isDialogOpen[dialogName] = false;
			}
		},
	},
});

const { actions, reducer } = dialogSlice;
export const { openDialog, closeDialog } = actions;
export default reducer;
