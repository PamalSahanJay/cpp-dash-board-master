package com.wiley.ccp.model.alfresco;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AssociationInfo
 */
@Data
@NoArgsConstructor
public class Association {

    @JsonProperty("isPrimary")
    private Boolean isPrimary;

    @JsonProperty("assocType")
    private String assocType;

    public static Association of(AssociationType associationType) {
        Association association = new Association();
        association.setAssocType(associationType.getValue());
        return association;
    }

}
