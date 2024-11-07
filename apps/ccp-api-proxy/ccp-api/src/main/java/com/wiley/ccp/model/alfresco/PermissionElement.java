package com.wiley.ccp.model.alfresco;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * PermissionElement
 */
@Data
public class PermissionElement {
    @JsonProperty("authorityId")
    private String authorityId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("accessStatus")
    private AccessStatusEnum accessStatus = AccessStatusEnum.ALLOWED;

    /**
     *
     */
    public enum AccessStatusEnum {
        ALLOWED, DENIED
    }
}

