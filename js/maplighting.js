function MapLighting(obj)
{
    copyProps(this, this.default);
    copyProps(this, obj);


}

MapLighting.default = {
	lightmap: [0,0,0,0,0,0,0,0,0],
	map: new Map(),
	
	;
}

