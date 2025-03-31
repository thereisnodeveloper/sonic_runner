import { k } from './kaplay_context.js';
import { makeSonic } from './sonic.js';


export default function mainMenu() {

    const gameSpeed = 300

  if (!k.getData('best-score')) k.setData('best-score', 0);
  console.log()

  k.onButtonPress('jump', () => k.go('game'));
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];

  const platformWidth = 1280;
  const platformHeight = 700
  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, platformHeight)], k.scale(8,2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth, 900)], k.scale(8,2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth*2, 900)], k.scale(8,2)),
  ];
  const defaultObjectOptions = [
    k.anchor("center")
  ];

  //initiate
  k.add([k.text("SONIC RING RUN",{font:"mania",size:96}),k.pos(k.center().x,200),k.anchor("center")])
  k.add([...defaultObjectOptions,
    k.text("Press Space to play"),
    k.pos(k.center().x,400)
  ])
  makeSonic(k.vec2(300, 720))
  

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPiecewidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-40, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x+platformWidth*4,platformHeight);
      platforms.push(platforms.shift());
    }


    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth,platformHeight);
    platforms[2].moveTo(platforms[1].pos.x + platformWidth,platformHeight);
    
    
  });
}
