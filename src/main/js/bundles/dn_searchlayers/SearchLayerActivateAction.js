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
        this.changePropsForEveryParent(layer);Bildung und Kultur
    }

    /**
     * Function used to recursively make all parent layers of a layer visible
     *
     * @param layer Esri Layer which has to made visible, including all parents
     */
    changePropsForEveryParent(layer) {
        // set visible property to true
        layer.visible = true;

        // get toc model item and set open to true
        const tocModelItem = this._getTocModelItem(layer.id);
        if(tocModelItem) {
            tocModelItem.open = true;
        }

        // highlight layer entry in toc
        // const x = document.getElementsByClassName("ct-toc__layer-tree-item--" + layer.id);
        // x.classList.add("highlight");

        // if layer has parent call method again
        if (layer.parent) {
            this.changePropsForEveryParent(layer.parent);
        }
    }

    _getTocModelItem(id) {
        const tocWidget = this._tocWidget;
        const vm = tocWidget.getVM();
        const operationalRoot = vm.operationalRoot;
        return operationalRoot.findById(id);
    }
}
