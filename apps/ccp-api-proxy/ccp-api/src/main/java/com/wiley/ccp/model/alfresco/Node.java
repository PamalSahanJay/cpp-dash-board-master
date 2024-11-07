package com.wiley.ccp.model.alfresco;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Node
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Node {
    @JsonProperty("id")
    private String id;

    @JsonProperty("parentId")
    private String parentId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("nodeType")
    private String nodeType;

    @JsonProperty("isFolder")
    private Boolean isFolder;

    @JsonProperty("isFile")
    private Boolean isFile;

    @JsonProperty("isLocked")
    private Boolean isLocked = false;

    @JsonProperty("modifiedAt")
    private OffsetDateTime modifiedAt;

    @JsonProperty("modifiedByUser")
    private UserInfo modifiedByUser;

    @JsonProperty("createdAt")
    private OffsetDateTime createdAt;

    @JsonProperty("createdByUser")
    private UserInfo createdByUser;

    @JsonProperty("isLink")
    private Boolean isLink;

    @JsonProperty("isFavorite")
    private Boolean isFavorite;

    @JsonProperty("content")
    private ContentInfo content;

    @JsonProperty("aspectNames")
    private List<String> aspectNames;

    @JsonProperty("properties")
    private Map<String, Object> properties;

    @JsonProperty("association")
    private Association associationInfo;

    @JsonProperty("allowableOperations")
    private List<String> allowableOperations;

    @JsonProperty("path")
    private PathInfo path;

    @JsonProperty("permissions")
    private PermissionsInfo permissions;

    public Optional<String> getStringProperty(PropertyKey propertyKey) {
        return getProperty(propertyKey, String.class);
    }

    public <T> Optional<T> getProperty(PropertyKey propertyKey, Class<T> clazz) {
        if (properties != null) {
            return Optional.ofNullable(clazz.cast(properties.get(propertyKey.getKeyName())));
        }

        return Optional.empty();
    }

    /**
     * Keys to properties map
     */
    public enum PropertyKey {
        NAME("cm:name"),
        OBJECT_ID("wbas:objectId"),
        VERSION_ID("wbas:versionId"),
        VERSION_LABEL("cm:versionLabel"),
        STATE_PRODUCTION("wcon:stateProduction"),
        PRODUCTION_ID("wcon:idProduction"),
        MODEL_TYPE("wbas:modelType"),
        SHORT_TITLE("wbas:shortTitle"),
        PUBLICATION_TYPE_ID("wbas:publicationTypeId"),
        PUBLICATION_TYPE("wbas:publicationType"),
        DATE_ACCEPTED("dct:dateAccepted"),
        DATE_SUBMITTED("dct:dateSubmitted"),
        TITLE("cm:title"),
        MD5_HASH("wbas:md5Hash"),
        ID_ENTITY("wcon:idEntity"),
        HIDE_HEADER("wck:hideHeader"),
        PUBLISHER("wck:publisher"),
        USER_CONTEXT("wck:userContext"),
        IN_LANGUAGE("schema:inLanguage"),
        AUTHOR("wbas:author"),
        MAPS_PRODUCT_ID("wbas:mapsProductId"),
        FILE_NAME("wsup:fileName"),
        TOC_TITLE("wbas:tocTitle"),
        STATE("wbas:state"),
        RENDITION_TYPE_ID("wsup:renditionTypeId"),
        RENDITION_TYPE_MNEMONIC("wsup:renditionTypeMnemonic"),
        CREATOR_ID("wbas:creatorId"),
        CREATOR_TYPE("wbas:creatorType"),
        MODIFIER_ID("wbas:modifierId"),
        MODIFIER_TYPE("wbas:modifierType"),
        ANCILLARY_TYPE_ID("wbas:ancillaryTypeId"),
        ADDITIONAL_PROPERTIES("wbas:additionalProperties"),
        EXTERNAL_SOURCE("wsup:externalSource"),
        IN_PRODUCT("wbas:inProduct"),
        OPEN_CAPTION("wsup:openCaption"),
        COLOR_SPACE("wbas:colorSpace"),
        WIDTH("wbas:width"),
        HEIGHT("wbas:height"),
        DURATION("wbas:duration"),
        ORIENTATION("wbas:orientation"),
        A11Y_BASELINE_FLAG("wbas:a11yBaselineFlag"),
        A11Y_BASELINE_PLUS_FLAG("wbas:a11yBaselinePlusFlag"),
        A11Y_COMMENTS("wbas:a11yComments"),
        FILE_MODIFIED_BY("wsup:fileModifiedBy"),
        FILE_MODIFIED("wsup:fileModified"),
        FILE_MODIFIED_BY_TYPE("wbas:fileModifiedByType"),
        ALT_TEXT("wsup:altText"),
        METADATA_TITLE("wsup:title"),
        AUDIENCE("wsup:audience"),
        DESCRIPTION("wsup:description"),
        LONG_DESCRIPTION("wsup:longDescription"),
        IN_COLLECTION("wsup:inCollection"),
        PERCEIVED_AS("wsup:perceivedAs"),
        WPDC_ASSET_PLACEMENT("wsup:wpdcAssetPlacement"),
        HTM_DESCRIPTION("wbas:htmDescription"),
        URL("wbas:url"),
        MEDIA_TYPE_ID("wbas:mediaTypeId"),
        MEDIA_TYPE_MODEL_TYPE("wbas:mediaTypeModelType"),
        ENTRY_POINT("wbas:entryPoint"),
        KEYWORDS("schema:keywords"),
        PERMISSION_STATUS("wbas:permissionStatus"),
        HIGH_RES_WORKFLOW_STATE("wbas:highResWorkflowState"),
        INQUIRY_TYPE("wbas:inquiryType"),
        ALGORITHMIC_TYPE("wlrn:algorithmicType"),
        AVAILABLE_ASSISTANCE_FEATURE("wlrn:availableAssistanceFeature"),
        DIFFICULTY_LEVEL("wlrn:difficultyLevel"),
        INQUIRY_USAGE_TYPE("wbas:inquiryUsageType"),
        ORIGINAL_CREATOR("wbas:originalCreator"),
        ORIGINAL_SYSTEM("wbas:originalSystem"),
        JSON_ENTITY("wsup:jsonEntity"),
        SEARCH_IDS("wbas:searchIds"),
        EXPIRES("schema:expires"),
        CREATED_ON_BEHALF_OF("wbas:createdOnBehalfOf"),
        SOURCE_CONTENT_ID("wbas:sourceContentId");

        private final String keyName;

        PropertyKey(String keyName) {
            this.keyName = keyName;
        }

        public String getKeyName() {
            return keyName;
        }
    }

    public String getParentId() {
        return parentId;
    }

    // we need this because of "excellence" of Alfresco API. In some cases it returns "parentId" as String property,
    // in some cases as object. So it is a workaround to avoid having two Node classes for different cases.
    public void setParentId(JsonNode parentId) {
        if (parentId.isObject()) {
            this.parentId = parentId.get("id").asText();
        } else {
            this.parentId = parentId.asText();
        }
    }

    // we need this because POST requests return node id as "nodeRef.id"
    public void setNodeRef(JsonNode nodeRef) {
        this.id = nodeRef.get("id").asText();
    }

}

