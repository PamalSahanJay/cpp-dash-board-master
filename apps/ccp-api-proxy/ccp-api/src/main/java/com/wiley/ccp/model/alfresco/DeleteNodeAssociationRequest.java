package com.wiley.ccp.model.alfresco;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Multipart request body to be send over to dcm for remove associations requests
 *
 * @author mchathuran
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class DeleteNodeAssociationRequest {

    private final Map<String, Set<String>> peerAssociationsMap = new HashMap<>();

    private final Map<String, Set<String>> childAssociationsMap = new HashMap<>();

    public void addPeerAssociations(AssociationType peerAssociationType, Set<String> targetIds) {
        peerAssociationsMap.put(peerAssociationType.getValue(), targetIds);
    }

    public void addChildAssociations(AssociationType childAssociationType, Set<String> targetIds) {
        childAssociationsMap.put(childAssociationType.getValue(), targetIds);
    }
}
