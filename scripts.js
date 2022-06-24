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
    const radioText = document.getElementById('astronautRadio');

    const rocketElement = document.querySelector('#rocket');
    const initialPosition = new Vec2(parseInt(getComputedStyle(rocketElement).left), 
                                     parseInt(getComputedStyle(rocketElement).top));
    let position = Object.assign({}, initialPosition);
    let height = parseInt(shuttleHeight.innerHTML);
    const altitudeChange = 10000;
    const delta = 10; //movement amount in pixels

    function launch(){
        flightStatus.innerHTML = 'Shuttle in flight.';
        shuttleBackground.style.backgroundColor = '#0000FF';
        height += altitudeChange;
        radioChatter(true, 'liftoff');
    }

    function land() {
        flightStatus.innerHTML = 'The shuttle has landed';
        shuttleBackground.style.backgroundColor = '';
        height = 0;
        position = Object.assign({}, initialPosition);
        radioChatter(true, 'landing');
    }

    function update(doRandomRolls = true){
        shuttleHeight.innerHTML = height;
        shuttle.style.left = String(position.x) + 'px';
        shuttle.style.top = String(position.y) + 'px';
        console.log('x: ' + position.x + ' y: ' + position.y);
        if (doRandomRolls){
            radioChatter();
        }
    }

    function radioChatter(force = false, specialState = undefined){
        let roll = Math.ceil(Math.random() * 100);
        let text = 'DEBUG: radioChatter - This text should never appear.';
        if (specialState !== undefined){
            switch (specialState){
                case 'liftoff':
                    text = 'We have liftoff!  All systems green.';
                    break;
                case 'landing':
                    text = 'On the ground now!';
                    break;
                case 'anomaly': //nyi
                    text = 'My God, it\'s full of stars!';
                    break;
                default:
                    console.log('DEBUG: Invalid specialState passed to radioChatter');
            }
            radioText.innerHTML = text;
        } else if (force || roll > 95){
            roll = Math.ceil(Math.random() * 7);
            switch(roll){
                case 1:
                    text = 'Hey, is that a corned beef sandwich?';
                    break;
                case 2:
                    text = 'Houston, the view up here is breathtaking!';
                    break;
                case 3:
                    text = 'Wow, my glasses are floating!';
                    break;
                case 4:
                    text = 'I think I can see my house from up here!';
                    break;
                case 5:
                    text = 'Feeling a little queasy, command...';
                    break;
                case 6:
                    text = 'Whose idea was it for the microwave and the CO2 alarm to make the same sound?';
                    break;
                case 7:
                    text = 'Ludicrous speed, go!';
                    break;
                default:
                    text = 'Wowee!';
            }
            radioText.innerHTML = text;
        }
    }

    function checkBounds(positionVector, dir){
        //console.log(`DEBUG: position x: ${positionVector.x}, position y: ${positionVector.y}`);
        switch(true){
            case (dir === 'right' && positionVector.x > 2*initialPosition.x + delta): //right boundary, this is dirty but it works
            case (dir === 'left' && positionVector.x < delta): //left boundary
            case (dir === 'up' && positionVector.y < delta): //top boundary
            case (dir === 'down' && positionVector.y > initialPosition.y): //bottom boundary
                //console.log('DEBUG: can move: false');
                return false;
            default:
                //console.log('DEBUG: can move: true');
                return true;
        }
    }

    takeoffButton.addEventListener('click', () => {
        if (height >= altitudeChange){
            return;
        }
        let result = window.confirm('Confirm that the shuttle is ready for takeoff.');
        if (result){
            launch();
            update(false);
        }
    });

    landingButton.addEventListener('click', () =>{
        if (height < altitudeChange){
            return;
        }
        window.alert('The shuttle is landing.  Landing gear engaged.');
        land();
        update(false);
    });

    abortButton.addEventListener('click', () => {
        let result = window.confirm('Confirm that you want to abort the mission.');
        if (result){
            land();
            flightStatus.innerHTML = 'Mission aborted.';
            update(false);
        }
    });
    
    left.addEventListener('click', () => {
        if (height > 0 && checkBounds(position, 'left')){
            position.x -= delta;
            update(true);
        } else {
            update(false);
        }
    });
    
    right.addEventListener('click', () => {
        if (height > 0 && checkBounds(position, 'right')){
            position.x += delta;
            update(true);
        } else {
            update(false);
        }
    });
    
    up.addEventListener('click', () => {
        if (height < altitudeChange){
            launch();
            update(false);
        } else {
            height += altitudeChange;
            if (checkBounds(position, 'up')){
                position.y -= delta;
            }
            update(true);
        }
    });
    
    down.addEventListener('click', () => {
        if (height > altitudeChange){
            if (checkBounds(position, 'down')){
                position.y += delta;
            }
            height -= altitudeChange;
            update(true);
        } else {
            land();
            update(false);
        }
    });
}




window.addEventListener('load', main);