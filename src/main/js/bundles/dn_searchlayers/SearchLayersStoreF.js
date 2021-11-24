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
import {SyncInMemoryStore} from "store-api/InMemoryStore"
import QueryResults from "store-api/QueryResults";
//import searchLayerActivateAction from "searchLayerActivateAction";
export default class SearchLayersStoreF extends SyncInMemoryStore {
    constructor(opts) {
        super(opts);
    }

    query(query = {}, options = {}) {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = layers.flatten(function (item) {
            return item.layers || item.sublayers;
        });

        let qParam = query.title.$suggest;
        let results = flattenLayers.map((layer) => {
            if (layer.title.includes(qParam)) {
                return {
                    id: layer.id,
                    title: layer.title
                }
            }
        })

        results = results.filter(e => e)._items;

        return QueryResults(results);
    }

    get(id, options = {}) {

        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        let ergebnis;

        // greife auf mapmodel zu und finde layer mit der id die übergeben wird
        // return diesen layer

        console.info(id);
debugger
        layers.items.forEach(layer => {

            console.info(layer.id)

            if (layer.id.includes(id)) {

                 ergebnis = layer;

            } else {
                if ((layer.layers.items[0].id.includes(id))||
                    (layer.layers.items[1].id.includes(id))||
                    (layer.layers.items[2].id.includes(id))){
                    //(layer.layers.items[1].layers.items[0].id.includes(id))||
                    //(layer.layers.items[1].layers.items[1].id.includes(id))||
                    //(layer.layers.items[1].layers.items[2].id.includes(id))||
                    //(layer.layers.items[2].layers.items[0].id.includes(id))||
                    //(layer.layers.items[2].layers.items[1].id.includes(id))||
                    //(layer.layers.items[2].layers.items[2].id.includes(id))){
                    console.info("2. if");
                    ergebnis = layer;
                }
                else{
                   console.info("keine Übereinstimmung")
                }
            }
        }
        );
debugger
        console.info(ergebnis.id);
        return ergebnis;

    }


}





