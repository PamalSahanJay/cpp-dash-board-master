package com.wiley.ccp.model.alfresco;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * pagination details of Alfresco search result
 */

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchPagination {
    int count;
    boolean hasMoreItems;
    int totalItems;
}
