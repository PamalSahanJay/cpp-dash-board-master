package com.wiley.ccp.model.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductItem {
    private String itemId;
    private String modelType;
    private String fileName;
    private String size;
    private String modifiedDate;
    private String versionLabel;
    private String jsonData;
    private boolean hasVersions;
    private List<Version> versions;

}
