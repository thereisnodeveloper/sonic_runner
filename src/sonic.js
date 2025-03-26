import { k } from "./kaplay_context.js"

export function makeSonic(pos){
    const sonic = k.add([
        k.sprite("sonic",{anim:"run"}),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos)
    ])
}

