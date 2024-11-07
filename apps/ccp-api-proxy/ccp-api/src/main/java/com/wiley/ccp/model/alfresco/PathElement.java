package com.wiley.ccp.model.alfresco;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * PathElement
 */
@Data
public class PathElement {
    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("nodeType")
    private String nodeType;

    @JsonProperty("aspectNames")
    private List<String> aspectNames;
}

