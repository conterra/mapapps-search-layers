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

export default class SearchLayersStoreFactory extends SyncInMemoryStore {
    constructor(opts) {
        super(opts);
    }

    query(query = {}, options = {}) {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = layers.flatten(function(item){
            return item.layers || item.sublayers;
        });

        let qParam = query.title.$suggest;
        let results = flattenLayers.map((layer) => {
            if (layer.title.includes(qParam)){
                return {
                    id: layer.id,
                    title: layer.title
                }
            }
            // TODO: Find a better solution for non-matching IDs
            else {
                return ""
            }
        })

        debugger
        results = results.filter(e => e)._items;
        debugger


        return QueryResults(results);
}
}




