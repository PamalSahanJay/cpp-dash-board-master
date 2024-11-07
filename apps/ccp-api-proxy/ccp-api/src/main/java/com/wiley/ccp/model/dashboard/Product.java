package com.wiley.ccp.model.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class Product {
    private String productId;
    private String authorName;
    private List<ProductItem> productItems;
}
