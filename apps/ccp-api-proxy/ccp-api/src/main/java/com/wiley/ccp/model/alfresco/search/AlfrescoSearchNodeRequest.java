package com.wiley.ccp.model.alfresco.search;

import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.Data;
import lombok.NoArgsConstructor;

import static com.wiley.ccp.model.alfresco.search.IncludeOptions.Options.PROPERTIES;

/**
 * @author mvinokurov
 */
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlfrescoSearchNodeRequest {

    public static final String SEARCH_BY_OBJECT_ID = "=wbas:objectId:%s";
    public static final String SEARCH_BY_PRODUCTION_ID = "=wcon:idProduction:%s";
    public static final String SEARCH_BY_PRODUCT_ID = "=wbas:mapsProductId:%s";
    public static final String SEARCH_BY_OBJECT_IDS = "wbas:objectId:(%s)";
    public static final String SEARCH_BY_NAME_INSIDE_ROOT = "=cm:name:\"%s\"";
    public static final String LANGUAGE_AFTS = "afts";

    private AlfrescoSearchQuery query;
    private String[] include;

    private AlfrescoSearchNodeRequest(String query, String language, IncludeOptions.Options... include) {
        this.query = new AlfrescoSearchQuery(query, language);
        this.include = IncludeOptions.create(include);
    }

    public static AlfrescoSearchNodeRequest nodeByObjectId(String objectId) {
        return new AlfrescoSearchNodeRequest(
                SEARCH_BY_OBJECT_ID.formatted(objectId), LANGUAGE_AFTS, PROPERTIES
        );
    }

    public static AlfrescoSearchNodeRequest nodeByProductionId(String productionId) {
        return new AlfrescoSearchNodeRequest(
                SEARCH_BY_PRODUCTION_ID.formatted(productionId), LANGUAGE_AFTS, PROPERTIES
        );
    }

    public static AlfrescoSearchNodeRequest nodeByProductId(String productId) {
        return new AlfrescoSearchNodeRequest(
                SEARCH_BY_PRODUCT_ID.formatted(productId),
                LANGUAGE_AFTS, PROPERTIES
        );
    }

    public static AlfrescoSearchNodeRequest nodeByNameInsideRoot(String name) {
        return new AlfrescoSearchNodeRequest(
                SEARCH_BY_NAME_INSIDE_ROOT.formatted(name), LANGUAGE_AFTS, PROPERTIES
        );
    }

}
