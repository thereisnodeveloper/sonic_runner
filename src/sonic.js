import k  from './kaplay_context.js';
import game from './game.js';

export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite('sonic', { anim: 'run' }),
    k.scale(4),
    k.area(),
    k.anchor('center'),
    k.pos(pos),
    k.body({jumpForce:1700}),
    {
      ringCollectUI:null,
      setControls() {
        k.onButtonPress('jump', () => {
          if (this.isGrounded()) {
            this.play('jump');
            this.jump();
            k.play("jump",{volume: 0.35});
            
          }
        });
      },
      setEvents(){
        this.onGround(()=>{
          this.play("run")
        })
      }
    },
    "sonic"
  ]);


  return sonic
}
