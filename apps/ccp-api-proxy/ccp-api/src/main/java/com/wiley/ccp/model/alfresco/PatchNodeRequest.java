package com.wiley.ccp.model.alfresco;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import lombok.Data;

/**
 * @author <a href="mailto:skorpusova@wiley.com">Korpusova Svetlana</a>
 */
@Data
public class PatchNodeRequest {

    private final Map<String, Serializable> properties = new HashMap<>();

    private final Map<String, Set<String>> peerAssociationsMap = new HashMap<>();

    private String association;

    private String nodeType;

    public <T extends Serializable> void addProperty(Node.PropertyKey key, T value) {
        properties.put(key.getKeyName(), value);
    }

    public void addPeerAssociations(AssociationType peerAssociationType, Set<String> targetIds) {
        peerAssociationsMap.put(peerAssociationType.getValue(), targetIds);
    }

}
