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
        this.id = "searchlayeractivateaction";
    }


    trigger(options) {
        if (!options || !options.items) {
            throw new Error(
                "SearchLayerActivateAction.trigger: " +
                "Cannot execute SearchLayerActivateAction since no trigger options with 'items'" +
                "property have been specified."
            );
        }

        if (!options.items.length) {
            return;
        }

        if (options.source?.id !== "searchlayersstore") {
            return;
        }

        const layer = options.items[0];
        this.recursiveParentVisibility(layer);
    }

    /**
     * Function used to recursively make all parent layers of a layer visible
     *
     * @param layer Esri Layer which has to made visible, including all parents
     */
    recursiveParentVisibility(layer){
        if (!layer.parent.id){
            layer.visible = true;
        }
        else {
            layer.visible = true;
            this.recursiveParentVisibility(layer.parent);
        }
    }
}

