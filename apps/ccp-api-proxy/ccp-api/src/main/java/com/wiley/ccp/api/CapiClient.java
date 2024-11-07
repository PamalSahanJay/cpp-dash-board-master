package com.wiley.ccp.api;

import ccp.shared.content.model.PlatformStubArray;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.wiley.wpp.content.model.alfresco.Node;
import com.wiley.ccp.model.capi.S3DownloadData;

@HttpExchange("/api/v1")
public interface CapiClient {

    @GetExchange("/contents/nodes")
    List<Node> getNodesByProductOrProductionId(
        @RequestParam(required = false) String productionId,
        @RequestParam(required = false) String productId
    );

    @GetExchange("/contents/nodes/{contentId}/versions")
    List<Node> getVersionProductItemsByContentId(@PathVariable() String contentId);

    @GetExchange("/contents")
    PlatformStubArray getPlatformStubArrayByProductOrProductionId(
        @RequestParam(required = false) String productionId,
        @RequestParam(required = false) String productId
    );

    @GetExchange("/contents/{itemId}/direct")
    S3DownloadData getS3DirectDownloadUrl(
        @PathVariable(required = true) String itemId,
        @RequestParam(required = false) boolean redirect
    );

}
