package com.wiley.ccp.model.alfresco;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * refer to https://api-explorer.alfresco.com/api-explorer/#!/nodes/createNode for details about fields
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class CreateNodeRequest {
    private String name;
    private String nodeType;
    private String relativePath;
    private List<String> aspectNames;
    private Map<String, Serializable> properties = new HashMap<>();
    private Association association;
    private List<Association> additionalAssociations;
    private List<ParentAssociation> secondaryParents;

    /**
     * Using it create peer associations when the source node is created node itself
     * Key is association type, value - collection of target ids
     */
    private Map<String, Set<String>> peerAssociationsMap;

    /**
     * Using it to create peer associations when the target node is created node
     * Key is source node id, value - collection of association types.
     */
    private Map<String, Set<String>> sourcePeerAssociationsMap;

    private Map<String, Set<String>> childAssociationsMap;


    public void addPeerAssociations(AssociationType peerAssociationType, Set<String> targetIds) {
        if (peerAssociationsMap == null) {
            peerAssociationsMap = new HashMap<>();
        }

        peerAssociationsMap.put(peerAssociationType.getValue(), targetIds);
    }

    public void addSourcePeerAssociation(AssociationType peerAssociationType, String sourceNodeId) {
        // todo refactor so it's initialized in constructor, but will need to refresh all anystub tests
        // or manually fix the yml tape
        if (sourcePeerAssociationsMap == null) {
            sourcePeerAssociationsMap = new HashMap<>();
        }

        Set<String> associationTypes = sourcePeerAssociationsMap.get(sourceNodeId);
        if (associationTypes == null) {
            associationTypes = new HashSet<>();
        }
        associationTypes.add(peerAssociationType.getValue());
        sourcePeerAssociationsMap.put(sourceNodeId, associationTypes);
    }

    public void addChildAssociations(AssociationType childAssociationType, Set<String> targetIds) {
        if (childAssociationsMap == null) {
            childAssociationsMap = new HashMap<>();
        }
        childAssociationsMap.put(childAssociationType.getValue(), targetIds);
    }

    public <T extends Serializable> void addProperty(Node.PropertyKey key, T value) {
        properties.put(key.getKeyName(), value);
    }

}
