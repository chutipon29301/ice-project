export const manualResponse = (serverURL: string) => {
    return [
        {
            type: `image`,
            originalContentUrl: `${serverURL}/bot/replyImage/user-manual.jpg?_ignored=`,
            previewImageUrl: `${serverURL}/bot/replyImage/user-manual.jpg?_ignored=`,
        },
        {
            type: `image`,
            originalContentUrl: `${serverURL}/bot/replyImage/user-manual-features.jpg?_ignored=`,
            previewImageUrl: `${serverURL}/bot/replyImage/user-manual-features.jpg?_ignored=`,
        },
    ];
};
