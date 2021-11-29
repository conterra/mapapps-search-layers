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
import {SyncInMemoryStore} from "store-api/InMemoryStore";
import QueryResults from "store-api/QueryResults";

export default class SearchLayersStore extends SyncInMemoryStore {

    constructor(opts) {
        super(opts);
    }


    /**
     * Function used to flatten layer structure of arbitrary depth to a depth of one
     *
     * @param layers Collection of map layers
     * @returns esri/core/Collection  containing layer and all its sublayers
     */
    _getFlattenLayers(layers) {
        return layers.flatten(item => item.layers || item.sublayers);
    }

    query(query = {}, options = {}) {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = this._getFlattenLayers(layers);
        const searchString = query?.title?.$suggest;

        const results = flattenLayers.filter((layer) => {
            const titleContainsSearchString = layer.title.toLowerCase().includes(searchString.toLowerCase());
            const idContainsSearchString = layer.id.toString().includes(searchString);
            const descriptionContainsSearchString =
                layer.description?.toLowerCase().includes(searchString.toLowerCase());

            return titleContainsSearchString || idContainsSearchString || descriptionContainsSearchString;
        });

        return QueryResults(results.toArray());
    }

    get(uid, options = {}) {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = this._getFlattenLayers(layers);
        return flattenLayers.items.find(item => item.uid === uid);
    }

}
