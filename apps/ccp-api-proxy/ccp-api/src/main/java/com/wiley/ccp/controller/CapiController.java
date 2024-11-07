package com.wiley.ccp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.wiley.ccp.model.dashboard.ProductItem;
import com.wiley.wpp.content.model.alfresco.Node;
import com.wiley.ccp.model.dashboard.Product;
import com.wiley.ccp.service.CapiService;

@RestController
@RequestMapping("/api/v1")
public class CapiController {

    private final CapiService capiService;

    @Autowired
    public CapiController(CapiService capiService) {
        this.capiService = capiService;
    }

    @GetMapping("/contents/nodes")
    public List<Node> getNodesByProductOrProductionId(
            @RequestParam(required = false) String productionId,
            @RequestParam(required = false) String productId) {
        return capiService.getNodesByProductOrProductionId(productionId, productId);
    }

    @GetMapping("/contents/product")
    public Product getProductByProductOrProductionId(
        @RequestParam(required = false) String productionId,
        @RequestParam(required = false) String productId) {
        return capiService.getProductByProductOrProductionId(productionId, productId);
    }

    @GetMapping("/contents/{contentId}/versions")
    public List<ProductItem> getVersionProductItems(@PathVariable String contentId) {
        return capiService.getVersionProductItemsByContentId(contentId);
    }


    @GetMapping("/contents/download/{itemId}")
    public String getProductItemDownloadUrl(
        @PathVariable(required = true) String itemId) {
        return capiService.getProductItemDownloadUrl(itemId);
    }
}
