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

/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
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
export default class TocItemExpander {

    activate() {
        const mapWidgetModel = this._mapWidgetModel;
        const layers = mapWidgetModel.map.allLayers;
        layers.forEach((layer) => {
            if (layer.expanded) {
                const tocModelItem = this._getTocModelItem(layer.id);
                tocModelItem.open = true;
            }
        })
    }

    _getTocModelItem(id) {
        const tocWidget = this._tocWidget;
        const vm = tocWidget.getVM();
        const operationalRoot = vm.operationalRoot;
        return operationalRoot.findById(id);
    }

}
