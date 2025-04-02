import k from "./kaplay_context";


export default function gameOver(score) {
  k.add([k.text('GAME OVER'), k.pos(k.center().x, 400)]);
  k.add([k.text(`Current Score:${score}`),k.pos(k.center().x, 600)])
  k.add([k.text(`Best Score:${k.getData('best-score')}`),k.pos(k.center().x, 800)])
}
