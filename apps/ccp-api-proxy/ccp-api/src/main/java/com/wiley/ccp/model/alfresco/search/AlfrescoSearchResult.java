package com.wiley.ccp.model.alfresco.search;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.wiley.ccp.model.alfresco.NodeEntry;
import com.wiley.ccp.model.alfresco.SearchPagination;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author mvinokurov
 */
@Data
@NoArgsConstructor
public class AlfrescoSearchResult {

    private ListWrapper list;

    public List<NodeEntry> get() {
        return list.entries;
    }

    public SearchPagination getPagination() {
        return list.pagination;
    }

    @Data
    @NoArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    private class ListWrapper {
        SearchPagination pagination;
        List<NodeEntry> entries;
    }
}
