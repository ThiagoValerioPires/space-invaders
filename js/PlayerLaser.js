class PlayerLaser {
    constructor($container,x,y){
        this.x = x;
        this.y = y;
        this.container = $container;
        this.speed = 10;
        this.el = document.createElement("img");
        this.el.src = "img/laser-blue-1.png";
        this.el.className = "laser";
        this.container.appendChild(this.el);
        this.isDead = false;
    }

    move(){
        if(!this.isDead){
            this.y += (this.speed * -1);
            this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
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
