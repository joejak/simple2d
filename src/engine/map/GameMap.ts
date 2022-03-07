import { Cell } from './Cell'; 

export class GameMap {
    cellsByCol; 
    cellsByRow; 
    rowCount:number;
    colCount:number;
    cellWidth:number;
    cellHeight:number;
    mapMarkers:MapDimensions; 
    defaultCellColor; 
    constructor(
        TLX:number,
        TLY:number,
        defaultCellColor:string,
        BRX:number | null,
        BRY:number | null,
        cellWidth:number | null | undefined,
        cellHeight:number | null | undefined,
        rowCount:number | null | undefined,
        colCount:number | null | undefined){
        this.mapMarkers = new MapDimensions();
        this.mapMarkers.TLX = TLX; 
        this.mapMarkers.TLY = TLY;
        if(!BRX&&!cellWidth&&!colCount){
            throw new Error("must include 2 of the three possible arguments (BRX, cellWidth, colCount");
        }
        if(!BRY&&!cellHeight&&!rowCount){
            throw new Error("must include 2 of the three possible arguments (BRY, cellHeight, rowCount");
        }  
        if(BRX){
            this.mapMarkers.BRX = BRX;
            if(cellWidth){
                this.cellWidth = cellWidth; 
                this.colCount = this.mapMarkers.BRX/this.cellWidth; 
            }
            else{
                this.colCount = <number> colCount; 
                this.cellWidth = this.mapMarkers.BRX/this.colCount; 
            }
        }
        else{
            this.cellWidth = <number> cellWidth;
            this.colCount = <number> colCount; 
            this.mapMarkers.BRX = this.cellWidth*this.colCount;
        }
        if(BRY){
            this.mapMarkers.BRY = BRY;
            if(cellHeight){
                this.cellHeight = cellHeight; 
                this.rowCount = this.mapMarkers.BRY/this.cellHeight; 
            }
            else{
                this.rowCount = <number> rowCount; 
                this.cellHeight = this.mapMarkers.BRY/this.rowCount; 
            }
        }
        else{
            this.cellHeight = <number> cellHeight;
            this.rowCount = <number> rowCount; 
            this.mapMarkers.BRY = this.cellHeight*this.rowCount;
        }
        this.cellsByCol = new Array<Array<Cell | false>>(); 
        this.cellsByRow = new Array<Array<Cell | false>>(); 
        this.defaultCellColor = defaultCellColor; 
    }

    conformCellsByRow2CellsByCol(){
        this.cellsByRow = new Array<Array<Cell|false>>(); 
        for(var i = 0; i<this.rowCount; i++){
            var yCols = Array<Cell|false>(); 
            this.cellsByCol.forEach(cell => {
                yCols.push(cell[i]); 
            });
            this.cellsByRow.push(yCols);  
        }
    }

    conformCellsByCol2CellsByRow(){
        this.cellsByCol = new Array<Array<Cell|false>>(); 
        for(var i = 0; i<this.colCount; i++){
            var xRows = Array<Cell|false>(); 
            this.cellsByRow.forEach(cell => {
                xRows.push(cell[i]); 
            });
            this.cellsByRow.push(xRows);  
        }
    }

    async randomlyPopulateMap(scarcity:number){
        scarcity = scarcity>0 ? scarcity<10 ? scarcity : 10 : 0; 
        for(var x = 0; x<this.colCount; x++){
            var xRows = new Array<Cell | false>(); 
            for(var y = 0; y<this.rowCount; y++){
                var tlx = this.mapMarkers.TLX+(x*this.cellWidth);
                var tly = this.mapMarkers.TLY+(y*this.cellHeight); 
                if((Math.random()*10)>scarcity){
                    xRows.push(new Cell(`${x}BY${y}`, tlx, tly, this.cellWidth, this.cellHeight, this.defaultCellColor)); 
                }
                else{
                    xRows.push(false); 
                }  
            }
            this.cellsByCol.push(xRows); 
        }
        console.info(`Map Generated: columns (${this.cellsByCol.length}) | rows (${this.cellsByCol[0].length})`)
    }

    getAllCells():Array<Cell>{
        var ret = Array<Cell>(); 
        this.cellsByCol.forEach((cols)=>{
            cols.forEach(cell => {
                if(cell){
                    ret.push(cell); 
                }
            })
        })
        return ret; 
    }

    getCellsByCols(start:number, count:number):Array<Cell>{
        var ret = Array<Cell>(); 
        this.cellsByCol.slice(start, start+count).forEach(col=>{
            col.forEach(cell=>{
                if(cell){
                    ret.push(cell);
                }            
            })
        })
        return ret; 
    }

    getCellsNear(x:number, y:number, range:number):Array<Cell>{
        var approxMinCol = Math.floor(x/this.cellHeight) - range; 
        var approxMaxCol = Math.ceil(x/this.cellHeight) + range; 
        var approxMinRow = Math.floor(y/this.cellWidth) - range; 
        var approxMaxRow = Math.ceil(y/this.cellWidth) +range; 
        if(approxMinRow < 0){
            approxMinRow = 0; 
        }
        if(approxMinCol < 0){
            approxMinCol = 0; 
        }
        if(approxMaxCol > this.colCount){
            approxMaxCol = this.colCount; 
        }
        if(approxMaxRow > this.rowCount){
            approxMaxRow = this.rowCount; 
        }
        console.log(approxMinCol, approxMaxCol, approxMinRow, approxMaxRow)
        var candidates = new Array<Cell>(); 
        this.cellsByCol.slice(approxMinCol, approxMaxCol).forEach((col)=>{
            col.slice(approxMinRow, approxMaxRow).forEach(cell => {
                if(cell){
                    candidates.push(cell); 
                }
            }); 
        })
        return candidates; 
    }
}

class MapDimensions{
    TLX:number;
    TLY:number;
    BRX:number;
    BRY:number;
    LeftMargin:number; 
    RightMargin:number;
    TopMargin:number;
    BottomMargin:number;

    constructor(){
        this.TLX = this.TLY = this.BRX = this.BRY = 0; 
        this.LeftMargin = this.RightMargin = this.TopMargin = this.BottomMargin = 0; 
    }

    async getInnerMapArea():Promise<Number>{
        return (Math.max(this.TLX, this.TLY) - Math.min(this.TLX, this.TLY)) * (Math.max(this.TLY, this.BRY) - Math.min(this.TLY, this.BRY)); 
    }

    async getOutterMapArea():Promise<Number>{
        return ((Math.max(this.TLX, this.TLY) - Math.min(this.TLX, this.TLY))+this.LeftMargin+this.RightMargin)
         * ((Math.max(this.TLY, this.BRY) - Math.min(this.TLY, this.BRY))+this.TopMargin+this.BottomMargin); 
    }
}