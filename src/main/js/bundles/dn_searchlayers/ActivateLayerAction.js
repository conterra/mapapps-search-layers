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
import async from "apprt-core/async";

export default class ActivateLayerAction {

    constructor() {
        this.id = "activatelayer";
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

        // open toc
        this._tocToggleTool.set("active", true);

        const layer = options.items[0];
        this.changePropsForEveryLayer(layer);
        async(()=>{
            this._highlightTocEntry(layer);
        }, 100);

    }

    _highlightTocEntry(layer) {
        // highlight layer entry in toc
        const tocItemUid = this._buildUID(layer);
        const cssValidId = tocItemUid.replace(/[^_a-zA-Z0-9-]/g, '_');
        const domElementList = document.getElementsByClassName("ct-toc__layer-tree-item--" + cssValidId);
        const domElement = domElementList.length? domElementList[0] : undefined;
        domElement?.classList.add("highlight");
        //tocEntryHighlightTime Einbauen
        //domElement?.classList.remove("highlight");
        async(()=>{
            domElement?.classList.remove("highlight");
        }, 25000);
    }

    /**
     * Function used to recursively make all parent layers of a layer visible
     *
     * @param layer Esri Layer which has to made visible, including all parents
     */
    changePropsForEveryLayer(layer) {
        // set visible property to true
        layer.visible = true;

        // get toc model item and set open to true
        const tocModelItem = this._getTocModelItem(layer.id);
        if (tocModelItem) {
            tocModelItem.open = true;
        }

        // if layer has parent call method again
        if (layer.parent) {
            this.changePropsForEveryLayer(layer.parent);
        }
    }

    _getTocModelItem(id) {
        const tocWidget = this._tocWidget;
        const vm = tocWidget.getVM();
        const operationalRoot = vm.operationalRoot;
        return operationalRoot.findById(id);
    }

    /**
     * Method copied from TocItemsToMapSync file in mapapps.
     *
     * @param layerOrSublayer
     * @returns {string|*}
     * @private
     */
    _buildUID(layerOrSublayer) {
        if (!layerOrSublayer) {
            return;
        }
        const localId = layerOrSublayer.id;
        if (!this._isSublayer(layerOrSublayer)) {
            // assumed to be unique
            return localId;
        }
        const uidOfSublayersRoot = this._buildUID(layerOrSublayer.layer);
        return uidOfSublayersRoot + "$" + localId;
    }

    _isSublayer(layer) {
        return layer.hasOwnProperty("layer");
    }
}
