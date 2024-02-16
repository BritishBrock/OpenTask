export interface Coord {
    x:number,
    y:number,
}

export interface Size{
    width:number,
    height:number,
}

export function setPos(y:number,x:number):Coord{
    return {x:x,y:y}
}
