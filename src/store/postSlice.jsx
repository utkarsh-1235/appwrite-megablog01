import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slug: null,
    title: null,
    content: null,
    featuredImage: null,
    userid: null,
    status: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action)=>{
               state.slug = action.payload.slug;
               state.title = action.payload.title;
               state.content = action.payload.content;
               state.featuredImage = action.payload.featuredImage;
               state.status = action.payload.status;           
        },
        deletePost: (state)=>{
               state.slug = null;
               state.title = null;
               state.content = null;
               state.featuredImage = null;
               state.status = null;               
        },
        updatePost: (state, action)=>{
            state.slug = action.payload.slug;
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.featuredImage = action.payload.featuredImage;
            state.status = action.payload.status;           
        },

  

    }
})

const {createPost, deletePost, updatePost} = postSlice.actions;
export default postSlice.reducer;