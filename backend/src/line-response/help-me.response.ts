export const helpMeResponse = [
  {
    type: "template",
    altText: "this is a carousel template",
    template: {
        type: "carousel",
        columns: [
            {
              thumbnailImageUrl: "https://1c927224.ngrok.io/bot/replyImage/general-problem.jpg?_ignored=",
              imageBackgroundColor: "#FFFFFF",
              title: "General problem",
              text: "Have a problem? Click here!",
              actions: [
                  {
                    type: 'postback',
                    label: 'Get manual',
                    data: 'manual',
                  }
              ]
            },
            {
              thumbnailImageUrl: "https://1c927224.ngrok.io/bot/replyImage/report.jpg?_ignored=",
              imageBackgroundColor: "#000000",
              title: "Faulty locker",
              text: "Unable",
              actions: [
                  {
                      type: "postback",
                      label: "Report",
                      data: "report"
                  },
              ]
            }
        ],
        imageAspectRatio: "rectangle",
        imageSize: "cover"
    }
  }
];
