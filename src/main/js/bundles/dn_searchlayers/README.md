# dn_searchlayers

This bundle allows for layers to be searched for various attributes such as title, id and description. Layers that match the search query can be selected and the corresponding toc element is expanded and highlighted. The duration of the highlight can be configured in the app.json.

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
