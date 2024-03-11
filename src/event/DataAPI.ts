import {Console} from "../utils/Console";
import {CatalogFurniture} from "../hotel/catalog/CatalogFurniture";


type RendererConfig = {
    roomitemtypes: {
        furnitype: CatalogFurniture[]
    },
    wallitemtypes: {
        furnitype: CatalogFurniture[]
    }
}

export class DataAPI {

    private _rendererConfig: RendererConfig = null;
    public async start() {
        const rendererConfigUrl = "https://images.habblet.city/leet-asset-bundles/gamedata/habblet_furni.json?v=658";
        this._rendererConfig = await (await fetch(rendererConfigUrl)).json();
        await new Promise((res)=>{
            setTimeout(res, 3000);
        });

    }
    public getFurniByClass(classname: string): CatalogFurniture {
        return this._rendererConfig.roomitemtypes.furnitype.find(
            (furni: CatalogFurniture) => furni.classname == classname
        );
    }

    public getFurniBySpriteID(id: number): CatalogFurniture {
        return this._rendererConfig.roomitemtypes.furnitype.find(
            (furni: CatalogFurniture) => furni.spriteId = id
        );
    }
}