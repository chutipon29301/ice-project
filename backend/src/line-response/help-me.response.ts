export const helpMeResponse = function (serverURL:string) {
  return  [
   {
     type: "template",
     altText: "this is a carousel template",
     template: {
         type: "carousel",
         columns: [
             {
               thumbnailImageUrl: `${serverURL}/bot/replyImage/howtouse-banner.jpg?_ignored=`,
               imageBackgroundColor: "#FFFFFF",
               title: "How to use 🔧📘",
               text: "Don't know how to use LockerSwam? Click here!",
               actions: [
                   {
                     type: 'postback',
                     label: 'Get manual',
                     data: 'manual',
                   }
               ]
             },
             {
              thumbnailImageUrl: `${serverURL}/bot/replyImage/findlocker-banner.jpg?_ignored=`,
              imageBackgroundColor: "#FFFFFF",
              title: "Can't find the locker ❓",
              text: "Find available lockers",
              actions: [
                  {
                    type: 'uri',
                    label: 'Find',
                    uri: 'line://app/1643085874-xeWvgKgE',
                  }
              ]
            },
             {
               thumbnailImageUrl: `${serverURL}/bot/replyImage/report.jpg?_ignored=`,
               imageBackgroundColor: "#000000",
               title: `Faulty locker ❓`,
               text: `Unable to use locker or any emergencies`,
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
}
