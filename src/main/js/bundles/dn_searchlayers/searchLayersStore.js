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

export default declare([], {

    id: null,
    _metadata: {
        "title": "Layersuche",
        "name": "Name",
        "objectIdField": "name",
        "fields": [
            {
                "name": "layerId",
                "alias": "layerId",
                "title": "layerId",
                "type": "string",
                "identifier": true,

            },
            {
                "name": "layerName",
                "alias": "layerName",
                "title": "layerName",
                "type": "string"
            }
        ]
    },

    constructor(options) {
        d_lang.mixin(this, options || {});
        this.id = "layersearch";
        const i18n = this.i18n = this._i18n && this._i18n.get().ui;
    },
    getLayers(mapModel){
        const layers= mapModel.map.layers;
    }
});
