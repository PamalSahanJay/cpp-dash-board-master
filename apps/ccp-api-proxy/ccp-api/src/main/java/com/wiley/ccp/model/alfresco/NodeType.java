package com.wiley.ccp.model.alfresco;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * possible values of nodeType value for DCM
 */
@AllArgsConstructor
public enum NodeType {
    CONTENT("cm:content"),
    ARTICLE_PRODUCTION("wsup:articleProduction"),
    ANCILLARY_MATERIAL("wbas:ancillaryMaterial"),
    MEDIA_ATOM("wbas:mediaAtom"),
    NARRATIVE_ATOM("wsup:narrativeAtom");

    @Getter
    private String value;

    public boolean matchValue(String value) {
        return this.value.equals(value);
    }
}
