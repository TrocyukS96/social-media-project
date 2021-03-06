import {addDialogsMessage, dialogsPageType, MessageType} from "./state";
import smilik from './../assets/images/dialogs/smilik.jpg';
import kazak from "../assets/images/dialogs/kazak.jpg";
import gentlemen from "../assets/images/dialogs/jentlemen.jpg";
import {v1} from "uuid";


const initialState = {
    messages: [
        {
            id: 1110, name: 'Stas', text: "My first post for today", img: kazak
        },
        {
            id: 1111, name: 'Ivan', text: "Other dialogsMessage", img: gentlemen
        },
        {
            id: 1112, name: 'Stas', text: "Im learning front-end", img: smilik
        },
        {
            id: 1113, name: 'Stas', text: "My first post for today", img: gentlemen
        }

    ],
} as dialogsPageType


type addDialogsTextAT = ReturnType<typeof addMessage>

type ActionsTypes = addDialogsTextAT

export const dialogsReducer = (state: dialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {

        case addDialogsMessage: {
            const newMessage: MessageType = {
                id: v1,
                name: state.messages[1].name,
                text: action.newMessage,
                img: smilik
            }
            return {...state, messages: [...state.messages, newMessage]}
        }
        default:
            return state
    }
}
export const addMessage = (newMessage: string) => ({type: addDialogsMessage, newMessage} as const)
