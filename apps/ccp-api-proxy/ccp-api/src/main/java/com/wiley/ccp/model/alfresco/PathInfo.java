package com.wiley.ccp.model.alfresco;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * PathInfo
 */
@Data
public class PathInfo {
    @JsonProperty("elements")
    private List<PathElement> elements;

    @JsonProperty("name")
    private String name;

    @JsonProperty("isComplete")
    private Boolean isComplete;
}

