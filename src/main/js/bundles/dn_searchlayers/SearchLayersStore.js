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

export default class SearchLayersStore extends SyncInMemoryStore {

    constructor(opts) {
        super(opts);
    }


    /**
     * Function used to flatten layer structure of arbitrary depth to a depth of one
     *
     * @param layers Esri layer object
     * @returns Array Array containing layer and all its sublayers
     */
    flattenLayers(layers) {
        return layers.flatten(item => {
           return item.layers || item.sublayer;
        });
    }

    query(query = {}, options = {}) {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;

        const flattenLayers = this.flattenLayers(layers);

        let queryParameter = query.title.$suggest;

        let results = flattenLayers.filter((layer) => {
            // Convert both search ui input and queryParameter to lowercase to make search case insensitiv
            return layer.title.toLowerCase().includes(queryParameter.toLowerCase());
        })

        return QueryResults(results.toArray());
    }

    get(uid, options = {}) {
        console.info("get")
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;

        const flattenLayers = this.flattenLayers(layers);

        return flattenLayers.items.find(item => {
            return item.uid === uid;
        })
    }
}





