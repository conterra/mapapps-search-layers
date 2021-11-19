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
import AsyncStore, {AsyncInMemoryStore} from "store-api/InMemoryStore"

class SearchLayersStoreFactory {

    activate() {
        return this._createStore();
    }

    _createStore() {
        const properties = this._properties || {};

        // this._searchLayersStore = new AsyncInMemoryStore({
        //     id: properties.id,
        //     idProperty: "id",
        //     metadata: properties.metadata
        // });

        // debugger
        // console.info("Created Store")
    }

    getLayers(mapModel) {
        const layers = mapModel.map.layers;
    }
}

export default SearchLayersStoreFactory;



