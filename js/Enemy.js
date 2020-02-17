class Enemy {
    constructor($container,x,y){
        this.x = x;
        this.y = y;
        this.container = $container;
        this.speed = 2;
        
        this.el = document.createElement("img");
        this.el.src = "img/enemy-red-1.png";
        this.el.className = "enemy";
        this.container.appendChild(this.el);
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.isDead = false;
        this.steps = 1;
        this.direction = 1;
    }

    move(){
        if(this.steps >= 65){
            this.steps = 1;
            this.direction *= -1
                       
        }
        this.y ++; 

        if(this.y > 600){
            this.y = 0;
        }

        this.steps++;

        this.x += (this.speed * this.direction);

        if(this.x < 15){ 
            this.x = 15;
        }else if(this.x > 785){
            this.x = 785;
        }

        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
            
    }

    shoot(){
        return new EnemyLaser(this.container,this.x,this.y);
    }

    destroy(){
        if(!this.isDead){
            this.container.removeChild(this.el);
            this.isDead = true;
        }
    }

    area(){
        return this.el.getBoundingClientRect();
    }
}