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
import declare from "dojo/_base/declare"
import ComplexMemory from  "ct/store/ComplexMemory"

export default declare([], {
activate(){
    // check mandatory parameters
    ct_lang.hasProp(properties, "url", true);

    // get data
    return this._createStore();
},

    _createStore() {
        const properties = this._properties || {};

            this._searchLayersStore = new ComplexMemory({
                id: properties.id,
                idProperty: "id",
                metadata: properties.metadata
            });

        this._searchLayersStore.add({
            id: layer.id,
            title: layer.title
        });

    },
    getLayers(mapModel) {
        const layers = mapModel.map.layers;
    }
});



