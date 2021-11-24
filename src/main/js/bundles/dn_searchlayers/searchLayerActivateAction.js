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

export default class SearchLayerActivateAction {
    constructor() {
        // unique ID of the action
        this.id = "searchlayeractivateaction";
    }

    // trigger method which is called with the search result items
    trigger(options) {
        const mapModel = this._mapWidgetModel;

        const layers = mapModel.map.layers;
        const queryID = options.items[0].id
        debugger

        const flattenLayers = layers.flatten(function (item) {
            return item.layers || item.sublayers;
        });

        flattenLayers.items.forEach(layer => {
            if (layer.id === queryID) {
                layer.visible = true;
                if(layer.parent.id !== undefined){
                   layer.parent.visible = true;
                }
            }
        })
        // //Parentlayer
        // if (queryID === options.items[0].layers.items[0].parent.id) {
        //     options.items[0].visible = true;
        //
        //
        //     options.items[0].layers.items.forEach(item => {
        //
        //         // TODO: Hier der korrekte Vergleich
        //         if (item.parent.layers.items[0].id === options.items[0].layers.items[0].id) {
        //             item.visible = true;
        //         }
        //     })
        //     } else {
        //         console.info("nope");
        //     }
        // }
    }

}

