// Write your JavaScript code here.
// Remember to pay attention to page loading!
function main(){

    class Vec2 {
        constructor(x = 0, y = 0){
            this.x = x;
            this.y = y;
        }
    }

    const takeoffButton = document.getElementById('takeoff');
    const abortButton = document.getElementById('missionAbort');
    const flightStatus = document.getElementById('flightStatus');
    const shuttleHeight = document.getElementById('spaceShuttleHeight');
    const landingButton = document.getElementById('landing');
    const shuttleBackground = document.getElementById('shuttleBackground');
    const shuttle = document.getElementById('rocket');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const up = document.getElementById('up');
    const down = document.getElementById('down');

    const rocketElement = document.querySelector('#rocket');
    const initialPosition = new Vec2(parseInt(getComputedStyle(rocketElement).left), 
                                     parseInt(getComputedStyle(rocketElement).top));
    let position = Object.assign({}, initialPosition);
    let height = parseInt(shuttleHeight.innerHTML);
    const delta = 10; //movement amount in pixels

    function launch(){
        flightStatus.innerHTML = 'Shuttle in flight.';
        shuttleBackground.style.backgroundColor = '#0000FF';
        height += 10000;
    }

    function land() {
        flightStatus.innerHTML = 'The shuttle has landed';
        shuttleBackground.style.backgroundColor = '';
        height = 0;
        position = Object.assign({}, initialPosition);
    }
    
    function update(){
        shuttleHeight.innerHTML = height;
        shuttle.style.left = String(position.x) + 'px';
        shuttle.style.top = String(position.y) + 'px';
        console.log('x: ' + position.x + ' y: ' + position.y);
    }

    function checkBounds(positionVector, dir){
        //console.log(`DEBUG: position x: ${positionVector.x}, position y: ${positionVector.y}`);
        switch(true){
            case (dir === 'right' && positionVector.x > 2*initialPosition.x + delta): //right boundary, this is dirty but it works
            case (dir === 'left' && positionVector.x < delta): //left boundary
            case (dir === 'up' && positionVector.y < delta): //top boundary
                //console.log('DEBUG: can move: false');
                return false;
            default:
                //console.log('DEBUG: can move: true');
                return true;
        }
    }

    takeoffButton.addEventListener('click', () => {
        if (height >= 10000){
            return;
        }
        let result = window.confirm('Confirm that the shuttle is ready for takeoff.');
        if (result){
            launch();
            update();
        }
    });

    landingButton.addEventListener('click', () =>{
        if (height < 10000){
            return;
        }
        window.alert('The shuttle is landing.  Landing gear engaged.');
        land();
        update();
    });

    abortButton.addEventListener('click', () => {
        let result = window.confirm('Confirm that you want to abort the mission.');
        if (result){
            land();
            flightStatus.innerHTML = 'Mission aborted.';
            update();
        }
    });
    
    left.addEventListener('click', () => {
        if (checkBounds(position, 'left')){
            position.x -= delta;
        }
        update();
    });
    
    right.addEventListener('click', () => {
        if (checkBounds(position, 'right')){
            position.x += delta;
        }
        update();
    });
    
    up.addEventListener('click', () => {
        if (height < 10000){
            launch();
        } else {
            height += 10000;
            if (checkBounds(position, 'up')){
                position.y -= delta;
            }
        }
        update();
    });
    
    down.addEventListener('click', () => {
        if (height > 10000){
            if (checkBounds(position, 'down')){
                position.y += delta;
            }
            height -= 10000;
        } else {
            land();
        }
        update();
    });
}




window.addEventListener('load', main);