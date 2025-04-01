import k from "./kaplay_context";

export default function gameOver() {
  k.add([k.text('GAME OVER'), k.pos(k.center().x, 400)]);
}
