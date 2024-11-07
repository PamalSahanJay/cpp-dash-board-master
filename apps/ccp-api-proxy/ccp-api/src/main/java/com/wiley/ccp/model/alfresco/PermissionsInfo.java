package com.wiley.ccp.model.alfresco;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * PermissionsInfo
 */
@Data
public class PermissionsInfo {
    @JsonProperty("isInheritanceEnabled")
    private Boolean isInheritanceEnabled;

    @JsonProperty("inherited")
    private List<PermissionElement> inherited;

    @JsonProperty("locallySet")
    private List<PermissionElement> locallySet;

    @JsonProperty("settable")
    private List<String> settable;
}

