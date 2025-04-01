import { k } from './kaplay_context.js';
import { makeSonic } from './sonic.js';
export default function game() {
  k.setGravity(3100);
  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50;
  });
  const platformWidth = 1280;
  const platformHeight = 700;
  const bgPieceWidth = 1920;

  
  k.add([
    k.rect(1920,3000),
    k.opacity(0),
    k.area(),
    k.body({isStatic:true}),
    k.pos(0,platformHeight+100)
  ])
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];


  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, platformHeight)], k.scale(8, 2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth, platformHeight)], k.scale(8, 2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth * 2, platformHeight)], k.scale(8, 2)),
  ];

  const sonic = makeSonic(k.vec2(200,700))
  sonic.setControls()
  sonic.setEvents()
  



  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPiecewidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    
    bgPieces[0].move(-40);
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y/10-50);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, -sonic.pos.y/10-50);

    
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, platformHeight);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth, platformHeight);
    platforms[2].moveTo(platforms[1].pos.x + platformWidth, platformHeight);
  });
}
