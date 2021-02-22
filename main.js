let c;
let ctx;
let version = '0.0.0'

let started = false
const gameName = 'seth_game_3'
const clientName = Math.random()
const ws = new WebSocket('wss://southwestern.media/game_dev');


window.onload = init;

function init(){
    c = document.querySelector('canvas')
    ctx = c.getContext('2d')
    resize()

    window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp){
    window.onresize = resize()
    draw()
    window.requestAnimationFrame(gameLoop)
}

function resize(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

document.addEventListener('click', click => {
    if(!started){
        started = true
    }
})

document.addEventListener("keydown", event => {
    if (event.isComposing || event.code === 229) {
      return;
    }
})

ws.addEventListener('open', open => {
    console.log('WEBSOCKETS OPENED');
});

ws.addEventListener('close', close => {
    console.log('WEBSOCKETS CLOSED'); 
}); 
ws.addEventListener('error', ws_error => {
    console.log('WEBSOCKETS ERROR'); 
}); 

document.addEventListener('click', e => {
    const data = {}
    data.Game = gameName
    data.Name = clientName
    const our_message = {}
    our_message.x = e.clientX
    our_message.y = e.clientY
    data.Message = JSON.stringify(our_message)
    ws.send(JSON.stringify(data))
})

ws.addEventListener('message', event => {
    const message_data = JSON.parse(message.data); 
        if(message_data.Game !== our_game) {
            return; 
        }
    console.log(message_data)
}); 

function draw(){
    ctx.clearRect(0,0, c.width, c.height)

    if(!started){
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 20px Verdana'
        ctx.fillRect(0,0,c.width,c.height)
        ctx.textAlign = "center"
        ctx.translate(c.width/2,c.height/2)
        ctx.strokeStyle = '#ffffff'
        ctx.fillStyle = '#ffffff'
        ctx.lineWidth = 5
        ctx.strokeRect(0-90, -25, 180, 50)
        ctx.fillText('CLICK TO BEGIN', 0, 7, 150)
        ctx.textAlign = "right"
        ctx.fillText(version,c.width/2-5, c.height/2-10)
    }

}