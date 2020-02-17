 class Player{
    constructor($container,x,y){
        this.container = $container;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.lastShoot = 0;
        this.laserCooldown = 300;
        this.el = document.createElement("img");
        this.el.src = "img/player-blue-1.png";
        this.el.className = "player";
        this.container.appendChild(this.el);
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    move(direction){
        
        this.x += (this.speed * direction);

        if(this.x < 15){ 
            this.x = 15;
        }else if(this.x > 785){
            this.x = 785;
        }

        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
            
    }

    shoot(){
        const currentTime = Date.now();
        if(currentTime > this.lastShoot + this.laserCooldown){
            this.lastShoot = currentTime;
            return new PlayerLaser(this.container,this.x,this.y);
        }
        return null;
    }

    area(){
        return this.el.getBoundingClientRect();
    }
}