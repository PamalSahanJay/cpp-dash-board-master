package com.wiley.ccp.model.alfresco;

import java.util.AbstractMap;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toMap;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author <a href="mailto:skorpusova@wiley.com">Korpusova Svetlana</a>
 */
@AllArgsConstructor
public enum AssociationType {

    HAS_MEDIA("wbas:hasMedia"),
    HAS_MEDIA_WSUP("wsup:hasMedia"),
    HAS_SUPPORTING_CONTENT("wbas:hasSupportingContent"),
    HAS_ANCILLARY_MATERIAL("wbas:hasAncillaryMaterial"),
    HAS_MANUSCRIPT("wbas:hasManuscript"),
    HAS_MANUSCRIPT_PART("wbas:hasManuscriptPart"),
    HAS_ARTICLE("wbas:hasArticle"),
    HAS_LO_ATOM("wlrn:hasLearningObjectAtom"),
    HAS_SUBTITLE("wsup:hasSubtitle"),
    HAS_TRANSLATION("wbas:hasTranslation"),
    IS_RELATED_TO("wbas:isRelatedTo"),
    HAS_CONTENT_PART("wbas:hasContentPart"),
    HAS_COLLATERAL("wsup:hasCollateral"),
    HAS_RENDITION("wbas:hasRendition"),
    HAS_THUMBNAIL_RENDITION("rn:rendition"),
    PRODUCTION_OF("wbas:productionOf"),
    HAS_SUB_ATOM("wbas:hasSubAtom"),
    HAS_PART("wbas:hasPart"),
    HAS_INQUIRY("wbas:hasInquiry"),
    HAS_EXTERNAL_MEDIA("wbas:hasExternalMedia"),
    IS_PART_OF("wsup:isPartOf"),
    CONTAINS("cm:contains"),
    HAS_COVER("wsup:hasCover");

    private static final Map<String, AssociationType> VALUES
            = Arrays.stream(AssociationType.values())
            .flatMap(v -> Stream.of(
                    new AbstractMap.SimpleEntry<>(v.getValue(), v)))
            .collect(toMap(Map.Entry::getKey, Map.Entry::getValue));

    @Getter
    private String value;

    public static Optional<AssociationType> fromValue(String value) {
        return Optional.ofNullable(VALUES.get(value));
    }
}
