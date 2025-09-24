interface BaseDto {
    id: number | undefined,
    name: string,
    description: string,
}


export interface PartDto extends BaseDto {
    length: number,
    width: number,
    height: number,
    manufacturerId: number,
    rebrickableId: number,
    bricklinkId: number,
    roomId: number | null,
    roomName: string | null
}

export interface RoomDto extends BaseDto  {
    pictureNumber?: number,
}