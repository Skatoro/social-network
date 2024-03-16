const SEND_MESSAGE = "/dialogsPageReducer/SEND_MESSAGE";
const UPDATE_DRAFT = "/dialogsPageReducer/UPDATE_DRAFT";

let initialState = {
    dialogs: [
        {
            dialogId: 0,
            name: "Andrey",
            messages: [
                {messageId: 0, message: "Сообщения из локального стейта. Заглушка до возможного введения серверной части", sender: "user"},
                {messageId: 1, message: "Local state messages. A placeholder for possible server-side introduction", sender: "opponent"},
            ],
            lastMessageId: 1,
            draft: '',
        },
        {
            dialogId: 1,
            name: "Stas",
            messages: [
                {messageId: 0, message: "Hallo, everynyan", sender: "opponent"},
                {messageId: 1, message: "How are you? Fine, sank you", sender: "opponent"},
                {messageId: 2, message: "Oh my gaah!", sender: "user"},
                {messageId: 3, message: "I wish i were a bird.", sender: "opponent"},
                {messageId: 4, message: "Why are you speaking english?", sender: "user"},
                {messageId: 5, message: "My daughter is going to America", sender: "opponent"},
            ],
            lastMessageId: 5,
            draft: 'Это черновик, он запоминает все, что вы вписываете, но не отправляете',
        },
        {
            dialogId: 2,
            name: "Illya",
            messages: [
                {messageId: 0, message: "3", sender: "opponent"},
                {messageId: 1, message: "4", sender: "user"},
            ],
            lastMessageId: 1,
            draft: 'This is draft, it remembers everything you type in but do not send',
        },
        {
            dialogId: 3,
            name: "Alina",
            messages: [
                {messageId: 0, message: "bruh", sender: "opponent"},
                {messageId: 1, message: "bruh", sender: "user"},
                {messageId: 2, message: "bruh", sender: "opponent"},
                {messageId: 3, message: "bruh", sender: "user"},
                {messageId: 4, message: "bruh", sender: "opponent"},
                {messageId: 5, message: "bruh", sender: "user"},
                {messageId: 6, message: "bruh", sender: "opponent"},
                {messageId: 7, message: "bruh", sender: "user"},
                {messageId: 8, message: "bruh", sender: "opponent"},
                {messageId: 9, message: "bruh", sender: "user"},
                {messageId: 10, message: "bruh", sender: "opponent"},
                {messageId: 11, message: "bruh", sender: "user"},
                {messageId: 12, message: "bruh", sender: "opponent"},
                {messageId: 13, message: "bruh", sender: "user"},
                {messageId: 14, message: "bruh", sender: "opponent"},
                {messageId: 15, message: "bruh", sender: "user"},
            ],
            lastMessageId: 1,
            draft: '',
        },
    ],
    currentlyActiveDialog: 0,
}


export const dialogsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SEND_MESSAGE): {
            let currentDialog = state.dialogs[action.dialogId];
            let newMessages = {
                messageId: currentDialog.lastMessageId + 1,
                message: action.message,
                sender: action.sender,
            }
            let newLastMessageId = newMessages.messageId;
            let dialogs = state.dialogs.map((dialog, i) => i === action.dialogId
                ? {...dialog, messages: dialog.messages.concat(newMessages), lastMessageId: newLastMessageId}
                : dialog)
            return {
                ...state,
                dialogs: dialogs,
            };
        }
        case (UPDATE_DRAFT): {
            return {
                ...state,
                dialogs: state.dialogs.map((dialog, i) => i === action.dialogId
                    ? {...dialog, draft: action.draft}
                    : dialog
                )
            };
        }
        default: {
            return state;
        }
    }
}


export const sendMessageActionCreator = (message, dialogId) => {
    return {
        type: SEND_MESSAGE,
        dialogId,
        message,
        sender: "user",
    }
}
export const updateDraftActionCreator = (draft, dialogId) => {
    return {
        type: UPDATE_DRAFT,
        dialogId,
        draft,
    }
}

export default dialogsPageReducer;