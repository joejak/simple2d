export class Cell {
    id
    X
    Y
    width
    height
    color
    contents
    celement
    constructor(id, x, y, width, height, color){
        this.id = id; 
        this.X = x; 
        this.Y = y;
        this.width = width; 
        this.height = height; 
        this.color = color;  
        this.contents = []; 
        this.celement = document.createElement("div");
        document.body.appendChild(this.celement);
        this.redrawElement(); 

    }

    refreshColorFromContent(){
        if(this.contents.length > 0){
            this.color = this.contents[this.contents.length-1].color;
        }
    }

    redrawElement(){
        try{
            document.body.removeChild(this.celement);
        }catch(ex){
            //don't care
        }
        this.celement.setAttribute("id", this.id); 
        this.celement.style.position = "absolute"; 
        this.celement.style.backgroundColor = this.color; 
        this.celement.style.width = this.width+"px"; 
        this.celement.style.height = this.height+"px"; 
        this.celement.style.left = this.X+"px"; 
        this.celement.style.top = this.Y+"px"; 
        document.body.appendChild(this.celement);  
    }

    addContents(content){
        this.contents.push(content); 
        if(content.color){
            this.color = content.color
        }
        this.redrawElement(); 
    }

    removeContents(index){
        this.contents = this.contents.splice(index, 1)
    }

    getHTML(){
        return `<div id="${this.id}" style="position:absolute; background-color:${this.color}; width:${this.width}px; height:${this.height}px; left:${this.X}px; top:${this.Y}px"></div>`;
    }
    

    getElement(){
        if(this.celement){
            return this.celement; 
        }
        else{
            this.celement = document.getElementById(this.id); 
            return this.celement; 
        }
    }
}