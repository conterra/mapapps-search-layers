/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Action from "map-actions";

export default class SearchLayerActivateAction {
    constructor() {
        // unique ID of the action
        this.id = "searchlayeractivateaction";
    }

    // trigger method which is called with the search result items
    trigger(options) {
        debugger
        // const mapWidgetModel = this._mapWidgetModel;
        //const layers = mapWidgetModel.map.layers;

        //const items = options.items;
        //const someProperty = options["searchlayeractivateaction"];
        console.info("hi");
        debugger
        if (//Layer
            options.items[0].id == options.items[0].layers.items[0].parent.id) {
            options.items[0].visible = true;
            options.items[0].layers.items[0].visible = true;
            options.items[0].layers.items[1].visible = true;
            options.items[0].layers.items[2].visible = true;
        } else {
            if (//Sublayer
                options.items[0].id == ((options.items[0].layers.items[0].id) || (options.items[0].layers.items[1].id) || (options.items[0].layers.items[2].id))) {
                //options.items[0].visible = true;
                //nur den richtigen Layer raussuchen
                //const visible1 = options.items[0].id == options.items[0].layers.items[0].id;
                //const visible2 = options.items[0].id == (options.items[0].layers.items[1].id);
                //const visible3 = options.items[0].id == (options.items[0].layers.items[2].id);
                options.items[0].layers.items[0].forEach(item => {
                    if (item.id === options.items[0].id) {
                        item.visible = true;
                    }
                })

                //switch(visibility) {
                //    case visible1:
                // code block
                //       options.items[0].layers.items[0].visible = true;
                //       break;
                //  case visible2:
                // code block
                //    options.items[0].layers.items[2].visible = true;
                //   break;
                //case visible3:
                //code block
                //  options.items[0].layers.items[2].visible = true;

                //default:
                // code block
            }


            //if(visible1 == true) {
            //    options.items[0].layers.items[0].visible = true;
            //} else {
            //    if (visible2 == true) {
            //        options.items[0].layers.items[1].visible = true;
            //    } else {
            //        if (visible3 == true) {
            //            options.items[0].layers.items[2].visible = true;
            //        }
            //    }
            //}


    else
        {
            console.info("nope");
        }
    }

    // Do something with the items...
    //map.layers.layer.visible = true;
    //const mapWidgetModel = this._mapWidgetModel;
    //const layers = mapWidgetModel.map.layers;
    //const id = layer.get;
    //debugger
    //if (options.id === layers.id){

    // layers.visible=true;
    //console.info(layers.id);

    //} else {
    //    console.info("Kein Trigger");
    //}
}

// actionService;
//trigger([searchlayeractivateaction]);
}

