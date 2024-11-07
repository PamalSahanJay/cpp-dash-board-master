package com.wiley.ccp.model.alfresco;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * ContentInfo
 */
@Data
public class ContentInfo {
    @JsonProperty("mimeType")
    private String mimeType;

    @JsonProperty("mimeTypeName")
    private String mimeTypeName;

    @JsonProperty("sizeInBytes")
    private Integer sizeInBytes;

    @JsonProperty("encoding")
    private String encoding;
}

