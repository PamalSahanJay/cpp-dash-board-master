package com.wiley.ccp.model.alfresco.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author mvinokurov
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlfrescoSearchQuery {
    private String query;
    private String language;
}
