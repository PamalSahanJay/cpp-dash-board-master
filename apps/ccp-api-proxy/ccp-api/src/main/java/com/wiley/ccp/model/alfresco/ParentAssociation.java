package com.wiley.ccp.model.alfresco;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * add additional parent to node
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ParentAssociation extends Association {
    @JsonProperty("parentId")
    private String parentId;

    public static ParentAssociation of(AssociationType associationType, String parentId) {
        ParentAssociation association = new ParentAssociation();
        association.setAssocType(associationType.getValue());
        association.setParentId(parentId);
        return association;
    }
}
