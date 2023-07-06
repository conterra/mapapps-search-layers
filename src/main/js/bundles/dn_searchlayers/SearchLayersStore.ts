///
/// Copyright (C) 2023 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import QueryResults from "store-api/QueryResults";

import { SyncInMemoryStore, ConstructorOptions } from "store-api/InMemoryStore";
import { ComplexQueryExpression, ResultItems } from "store-api/api";
import { InjectedReference } from "apprt-core/InjectedReference";
import { MapWidgetModel } from "map-widget/api";

export default class SearchLayersStore extends SyncInMemoryStore<ConstructorOptions<any>, string> {
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;

    /**
     * Function used to flatten layer structure of arbitrary depth to a depth of one
     *
     * @param layers Collection of map layers
     * @returns esri/core/Collection  containing layer and all its sublayers
     */
    private getFlattenLayers(layers: __esri.Collection<__esri.Layer>): __esri.Collection<__esri.Layer> {
        return layers.flatten(item => item.layers || item.sublayers);
    }

    public query(query:ComplexQueryExpression = {}): ResultItems<ConstructorOptions<any>> {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = this.getFlattenLayers(layers);
        flattenLayers.forEach((layer) => {
            if (layer.layer) {
                layer.searchId = `${layer.layer.id}/${layer.id}`;
            } else {
                layer.searchId = layer.id;
            }
        });
        const searchString = query?.title?.$suggest;

        const results = flattenLayers.filter((layer) => {
            // handle malformed searchStrings
            if (!searchString) {
                return false;
            }
            const titleContainsSearchString = layer.title?.toLowerCase().includes(searchString.toLowerCase());
            const idContainsSearchString = layer.id.toString().includes(searchString);
            // eslint-disable-next-line max-len
            const descriptionContainsSearchString = layer.description?.toLowerCase().includes(searchString.toLowerCase());
            const metadataContainsSearchString = layer.metadata?.toLowerCase().includes(searchString);
            const copyrightContainsSearchString = layer.copyright?.toLowerCase().includes(searchString);
            const tagsContainsSearchString = layer.tags?.toString()?.toLowerCase().includes(searchString);

            let visibleInToc = layer.listMode === "show";
            if (layer.listMode === undefined && layer.layer) {
                visibleInToc = layer.layer.listMode === "show";
            }

            return ((titleContainsSearchString || idContainsSearchString ||
                descriptionContainsSearchString || metadataContainsSearchString ||
                copyrightContainsSearchString || tagsContainsSearchString) && visibleInToc);
        });
        return QueryResults(results.toArray());
    }

    public get(searchId: string):__esri.Layer {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.layers;
        const flattenLayers = this.getFlattenLayers(layers);
        return flattenLayers.find((item: { searchId: any; }) => item.searchId === searchId);
    }

}
