import { createSlice } from '@reduxjs/toolkit'
const Slice=createSlice({
    name:"dictionary",
    initialState:[
        {
            "en":'Computer',
            "aze":'komputer'
        },
        {
            "en":'Mouse',
            "aze":'Sican'
        },
        {
            "en":'Memory',
            "aze":"Yaddas"
        },
        {
            "en":"Translate",
            "aze":"Tercume"
        }
    ],
    reducers:{
        add(state,action){
            const word=action.payload;
            console.log(word);
            state.push(word);
        }
    }
})
export const {add}=Slice.actions
export default Slice;