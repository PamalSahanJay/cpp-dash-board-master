package com.wiley.ccp.service;

import ccp.shared.content.model.PlatformIdentifier;
import ccp.shared.content.model.PlatformStubArray;
import lombok.AllArgsConstructor;


import org.springframework.stereotype.Service;

import java.util.List;

import com.wiley.ccp.api.CapiClient;
import com.wiley.wpp.content.model.alfresco.Node;
import com.wiley.ccp.model.capi.S3DownloadData;
import com.wiley.ccp.model.dashboard.Product;
import com.wiley.ccp.model.dashboard.ProductItem;
import com.wiley.ccp.util.ConverterHelper;


@Service
@AllArgsConstructor
public class CapiService {

    private final CapiClient capiClient;
    private final ConverterHelper converterHelper;

    public List<Node> getNodesByProductOrProductionId(String productionId, String productId) {
        return capiClient.getNodesByProductOrProductionId(productionId, productId);
    }

    public Product getProductByProductOrProductionId(String productionId, String productId) {
        List<Node> nodes = capiClient.getNodesByProductOrProductionId(productionId, productId);
        if (nodes.isEmpty()) {
            return null;
        }

        List<ProductItem> productItems = converterHelper.transformDataToProductItems(nodes, false);

        return Product.builder()
            .productId(productId)
            .productItems(productItems)
            .build();
    }

    public List<ProductItem> getVersionProductItemsByContentId(String contentId) {
        List<Node> nodes = capiClient.getVersionProductItemsByContentId(contentId);
        if (nodes.isEmpty()) {
            return null;
        }

        return converterHelper.transformDataToProductItems(nodes, true);
    }

    public PlatformStubArray getPlatformStubArrayByProductOrProductionId(String productionId, String productId) {
        return capiClient.getPlatformStubArrayByProductOrProductionId(productionId, productId);
    }

    public String getProductItemDownloadUrl(String itemId) {
        S3DownloadData s3DownloadData = capiClient.getS3DirectDownloadUrl(itemId, false);
        return s3DownloadData.getContentUrl();
    }
}

