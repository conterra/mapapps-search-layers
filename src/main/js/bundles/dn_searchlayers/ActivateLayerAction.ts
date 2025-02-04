///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
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

import async from "apprt-core/async";

import type { InjectedReference } from "apprt-core/InjectedReference";

export default class ActivateLayerAction {
    public id: string;

    private _tocToggleTool: InjectedReference<any>;
    private _properties: InjectedReference<Record<string, any>>;
    private _tocWidget: InjectedReference<any>;

    public constructor() {
        this.id = "activatelayer";
    }

    public async trigger(options: any): Promise<void> {
        const highlightDelay = 100;

        if (!options || !options.items) {
            throw new Error(
                "SearchLayerActivateAction.trigger: " +
                "Cannot execute SearchLayerActivateAction since no trigger options with 'items'" +
                "property have been specified."
            );
        }

        if (!options.items.length || options.source?.id !== "searchlayersstore") {
            return;
        }

        const layer = await options.items[0].load();
        this._tocToggleTool.set("active", true);
        this.changePropsForEveryLayer(layer);

        async(() => {
            this.highlightTocEntry(layer);
        }, highlightDelay);
    }

    private highlightTocEntry(layer: any): void {
        const scrollDelay = 500;

        const tocEntryHighlightTime = this._properties.tocEntryHighlightTime;
        // highlight layer entry in toc
        const tocItemUid: string = this.buildUID(layer);
        const cssValidId: string = tocItemUid.replace(/[^_a-zA-Z0-9-]/g, '_');
        const domElementList: HTMLCollectionOf<Element> = document.getElementsByClassName("ct-toc__layer-tree-item--" + cssValidId);
        const domElement: Element = domElementList.length ? domElementList[0] : undefined;
        domElement?.classList.add("highlight");
        // scroll to highlighted layer
        async(() => {
            domElement?.scrollIntoView();
        }, scrollDelay);
        // remove highlight from layer entry after a configurable time
        async(() => {
            domElement?.classList.remove("highlight");
        }, tocEntryHighlightTime);
    }

    /**
     * Function used to recursively make all parent layers of a layer visible
     *
     * @param layer Esri Layer which has to made visible, including all parents
     */
    private changePropsForEveryLayer(layer: any): void {
        // set visible property to true
        layer.visible = true;

        // get toc model item and set open to true
        const tocModelItem = this.getTocModelItem(layer.uid);
        if (tocModelItem) {
            tocModelItem.open = true;
        }

        // if layer has parent call method again
        if (layer.parent) {
            this.changePropsForEveryLayer(layer.parent);
        }
    }

    private getTocModelItem(uid: any): Object {
        const tocWidget = this._tocWidget;
        const vm = tocWidget.getVM();
        const operationalRoot: any = vm.operationalRoot;

        let tocItem: any;
        operationalRoot.visitTree((it: { reference: { uid: any; }; }) => {
            if (it.reference.uid === uid) {
                tocItem = it;
            }
        });

        return tocItem;
    }

    /**
     * Method copied from TocItemsToMapSync file in mapapps.
     *
     * @param layerOrSublayer
     * @returns {string|*}
     * @private
     */
    private buildUID(layerOrSublayer: { id: string; layer: any; }): string {
        if (!layerOrSublayer) {
            return;
        }
        const localId: string = layerOrSublayer.id;
        if (!this.isSublayer(layerOrSublayer)) {
            // assumed to be unique
            return localId;
        }
        const uidOfSublayersRoot: string = this.buildUID(layerOrSublayer.layer);
        return uidOfSublayersRoot + "$" + localId;
    }

    private isSublayer(layer: { hasOwnProperty: (arg0: string) => any; }): boolean {
        // eslint-disable-next-line no-prototype-builtins
        return layer.hasOwnProperty("layer");
    }
}
