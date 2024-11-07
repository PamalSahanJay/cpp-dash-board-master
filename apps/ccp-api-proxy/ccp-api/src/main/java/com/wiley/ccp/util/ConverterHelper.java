package com.wiley.ccp.util;

import ccp.shared.content.model.PlatformIdentifier;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiley.wpp.content.model.alfresco.Node;
import com.wiley.ccp.model.dashboard.ProductItem;
import com.wiley.wpp.content.service.converter.NodeConverter;

@Component
@AllArgsConstructor
public class ConverterHelper {
    private final NodeConverter converter;
    private final ObjectMapper objectMapper;

    @PostConstruct
    private void configureObjectMapper() {
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    public List<ProductItem> transformDataToProductItems(List<Node> data, boolean isVersion ) {
        return data.stream().map(item -> {
            ProductItem productItem = new ProductItem();
            String fileName = (String) item.getProperties().get("wsup:fileName");
            if (fileName == null) {
                fileName = item.getName();
            }
            productItem.setFileName(fileName);

            productItem.setSize(formatBytes(item.getContent().getSizeInBytes(), 2));
            productItem.setModifiedDate(item.getModifiedAt().toString());

            String versionLabelStr = (String) item.getProperties().get("cm:versionLabel");
            productItem.setVersionLabel(versionLabelStr);


            PlatformIdentifier platformIdentifier;
            if (isVersion) {
                platformIdentifier = converter.convertToContentVersion(item);
            } else {
                platformIdentifier = converter.convertToContent(item);
                double versionLabel = Double.parseDouble(versionLabelStr);
                productItem.setHasVersions(versionLabel > 0.1);
            }

            try {
                String platformIdentifierJson = objectMapper.writeValueAsString(platformIdentifier);
                productItem.setJsonData(platformIdentifierJson);
                productItem.setItemId(platformIdentifier.getId());
                productItem.setModelType(platformIdentifier.getModelType());

            } catch (Exception e) {
                e.printStackTrace();
            }

            return productItem;
        }).toList();
    }

    public static String formatBytes(long bytes, int decimals) {
        if (bytes == 0) {
            return "0 Bytes";
        }
        int k = 1024;
        int dm = Math.max(0, decimals);
        String[] sizes = {"Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};
        int i = (int) Math.floor(Math.log(bytes) / Math.log(k));
        return String.format("%." + dm + "f %s", (double) bytes / Math.pow(k, i), sizes[i]);
    }
}
