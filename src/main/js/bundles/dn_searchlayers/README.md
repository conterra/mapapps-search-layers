# dn_searchlayers

A layer can be searched for various attributes such as title, id and description. the search also has an auto-completion feature.
Layers that match the search query are returned and can be selected.
If a layer is selected, the corresponding element is expanded and highlighted. The duration of the highlight can be set in the app.json.

## Usage

1. First you need to add the bundle dn_searchlayers to your app.
2. Then you can configure it.

### Configurable Components of dn_searchlayers:
### ActivateLayerAction
```
        "dn_searchlayers": {
            "ActivateLayerAction": {
                "tocEntryHighlightTime": 5000
            }
        }
```
