let c;
let ctx;
let version = '0.0.1'

let started = false
const gameName = 'seth_game_3'
const clientName = ''+Math.random()
const ws = new WebSocket('wss://southwestern.media/game_dev');
const game_events = {}

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

window.addEventListener('unload', unload => {
    game_events[clientName] = undefined
    const data = {}
    data.Game = clientName
    data.Name = clientName
    const message_data = {}
    message_data.Leave = true
    data.Message = JSON.stringify(message_data);
    ws.send(JSON.stringify(data))
})

document.addEventListener('click', e => {
    if(!started){
        started = true
    }
    const data = {}
    data.Game = gameName
    data.Name = clientName
    const our_message = {}
    our_message.x = e.clientX
    our_message.y = e.clientY
    data.Message = JSON.stringify(our_message)
    ws.send(JSON.stringify(data))
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

ws.addEventListener('message', event => {
    const message_data = JSON.parse(event.data); 
    if(message_data.Game != gameName) {
        return; 
    }
    message_data.Message = JSON.parse(message_data.Message)
    game_events[message_data.Name] = {x: message_data.Message.x, y: message_data.Message.y}
})

// class choice {
//     constructor()
// }

function draw(){
    ctx.clearRect(0,0, c.width, c.height)

    Object.keys(game_events).forEach(key => {
        const player = game_events[key]; 
        ctx.fillStyle = '#F00'; 
        ctx.fillRect(player.x, player.y, 20, 20); 
    }); 

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