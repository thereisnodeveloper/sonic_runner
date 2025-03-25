import kaplay from "kaplay"

export const k = kaplay(
  {
    width:1920,
    height: 1080,
    letterbox: true,
    background:[],
    global:false,
    touchToMouse:true,
    buttons:{
      jump:{
        keyboard:["Space"],
        mouse:"left"
      }
    }
  }
)


