import { k } from './kaplay_context.js';

export default function mainMenu() {

    const gameSpeed = 400

  if (!k.getData('best-score')) k.setData('best-score', 0);

  k.onButtonPress('jump', () => k.go('game'));
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, 700)], k.scale(4)),
    k.add([k.sprite('platforms'), k.pos(platformWidth, 900)], k.scale(4)),
  ];

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPiecewidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-40, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x+platformWidth, 200);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth,500)
    // platforms.push(platforms.shift());
    

    // platforms[0].move(-gameSpeed, 0);
    // platforms[1].moveTo(platforms[0].pos.x + platformWidth, 700);

    // platforms.forEach(platform=>
    // platform.move(-500, 0),platforms)
  });
}
