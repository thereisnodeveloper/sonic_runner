import k from './kaplay_context.js';
import { makeMotobug } from './motobug.js';
import { makeRing } from './ring.js';
import { makeSonic } from './sonic.js';
export default function game() {
  let score = 0;
  let scoreMultiplier = 1;

  k.setGravity(3100);
  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50;
  });
  const platformWidth = 1280;
  const platformHeight = 700;
  const bgPieceWidth = 1920;

  k.add([
    k.rect(1920, 3000),
    k.opacity(0),
    k.area(),
    k.body({ isStatic: true }),
    k.pos(0, platformHeight + 100),
  ]);
  const bgPieces = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];

  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, platformHeight)], k.scale(8, 2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth, platformHeight)], k.scale(8, 2)),
    k.add([k.sprite('platforms'), k.pos(platformWidth * 2, platformHeight)], k.scale(8, 2)),
  ];

  const scoreDisplay = k.add([k.text('SCORE: 0', { font: 'mania', size: 72 }), k.pos(20, 20)]);

  const sonic = makeSonic(k.vec2(200, 700));
  sonic.setControls();
  sonic.setEvents();

  sonic.onCollide('enemy', (enemy) => {
    if (!sonic.isGrounded()) {
      k.play('destroy', { volume: 0.5 });
      k.play('hyper-ring', { volume: 0.5 });
      k.destroy(enemy);
      sonic.play('jump');
      sonic.jump();
      score += 1 * scoreMultiplier
      updateScore()
      scoreMultiplier++
      //TODO
    } else {
      k.play('hurt', { volume: 0.5 });
      k.go('game-over',score);
      if(score > k.getData('best-score'))
      k.setData('best-score',score)
    }
    

    const ringUIArray = []
    sonic.ringCollectUI = sonic.add([
      k.text('', { font: 'mania', size: 24 }),
      k.color(255, 255, 0),
      k.anchor('center'),
      k.pos(30, -10),
      "ring-ui"
    ]);
    sonic.ringCollectUI.text = `+${scoreMultiplier}`;
    ringUIArray.push(sonic.ringCollectUI)


    k.wait(0.8, () => {
      sonic.remove( ringUIArray.shift())
    });
  });
  sonic.onCollide('ring', (ring) => {
    k.destroy(ring);
    k.play('ring', { volume: 0.5 });
    score += scoreMultiplier;
    updateScore();

    const ringUIArray = []
    sonic.ringCollectUI = sonic.add([
      k.text('', { font: 'mania', size: 24 }),
      k.color(255, 255, 0),
      k.anchor('center'),
      k.pos(30, -10),
      "ring-ui"
    ]);
    sonic.ringCollectUI.text = `+${scoreMultiplier}`;
    ringUIArray.push(sonic.ringCollectUI)


    k.wait(0.8, () => {
      sonic.remove( ringUIArray.shift())
    });
  });

  const updateScore = () => {
    scoreDisplay.text = `SCORE: ${score}`;
  };

  const spawnEnemy = (waitTimeRange, creatorFunction, moveSpeed) => {
    const [min, max] = waitTimeRange;
    const enemy = creatorFunction();
    enemy.onUpdate(() => {
      if (gameSpeed < 3000) {
        enemy.move(moveSpeed, 0);
      }
    });
    enemy.onExitScreen(() => {
      if (enemy.pos.x < 0) k.destroy(enemy);
    });
    const waitTime = k.rand(min, max);

    k.wait(waitTime, spawnEnemy.bind(null, waitTimeRange, creatorFunction, moveSpeed));
  };

  spawnEnemy([1, 1.5], makeMotobug.bind(null, k.vec2(1920, 773)), -(gameSpeed + 300));
  spawnEnemy([0.5, 0.6], makeRing.bind(null, k.vec2(1920, 773)), -gameSpeed);

  // k.onCollideUpdate("sonic", "ring", 
  //   ()=>{
  //     sonic.ringCollectUI = sonic.add([
  //       k.text('', { font: 'mania', size: 24 }),
  //       k.color(255, 255, 0),
  //       k.anchor('center'),
  //       k.pos(30, -10),
  //     ]);
  //       // if (sonic.ringCollectUI.text === '+1') {
  //         sonic.ringCollectUI.move(20, -20);
  //         k.wait(0.5,()=>{
  //           sonic.get("ring").forEach(obj => obj.destroy())
  //         })
          
  //   }
  // )
  
  k.onUpdate(() => {
    if(sonic.ringCollectUI){
      sonic.ringCollectUI.move(20,-20)
    }

    if (sonic.isGrounded()) scoreMultiplier = 1;

    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPiecewidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-40);
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, -sonic.pos.y / 10 - 50);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, platformHeight);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth, platformHeight);
    platforms[2].moveTo(platforms[1].pos.x + platformWidth, platformHeight);
  });
}
