package com.wiley.ccp.model.capi;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wiley.ccp.model.alfresco.Node;
import com.wiley.ccp.model.alfresco.S3DirectUrl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.wiley.ccp.model.alfresco.Node.PropertyKey.MODEL_TYPE;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class S3DownloadData {
    private String id;
    private String modelType;
    private String contentUrl;
    private Boolean attachment;
    private OffsetDateTime expiryTime;
    private String errorMessage;

    @JsonIgnore
    private Node node;

    public S3DownloadData(String id, String errorMessage) {
        this.id = id;
        this.errorMessage = errorMessage;
    }

    public S3DownloadData(String id, Node node, S3DirectUrl s3DirectUrl) {
        this.id = id;
        this.modelType = node.getStringProperty(MODEL_TYPE).orElse(null);
        this.contentUrl = s3DirectUrl.getContentUrl().toString();
        this.attachment = s3DirectUrl.isAttachment();
        this.expiryTime = s3DirectUrl.getExpiryTime();
        this.node = node;
    }
}
