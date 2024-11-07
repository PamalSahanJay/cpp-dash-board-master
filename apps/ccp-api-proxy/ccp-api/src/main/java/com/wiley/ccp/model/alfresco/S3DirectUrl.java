package com.wiley.ccp.model.alfresco;

import java.net.URI;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Setter;


public class S3DirectUrl {

    @JsonProperty("entry")
    @Setter
    private Entry entry;

    public URI getContentUrl() {
        return entry.getContentUrl();
    }

    public boolean isAttachment() {
        return entry.isAttachment();
    }

    public OffsetDateTime getExpiryTime() {
        return entry.getExpiryTime();
    }

    @Data
    class Entry {
        @JsonProperty("contentUrl")
        private URI contentUrl;

        @JsonProperty("attachment")
        private boolean attachment;

        @JsonProperty("expiryTime")
        private OffsetDateTime expiryTime;
    }
}
