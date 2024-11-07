package com.wiley.ccp.config.restclient;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.Map;

import org.apache.hc.client5.http.config.ConnectionConfig;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.core5.util.Timeout;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import org.springframework.web.util.DefaultUriBuilderFactory;

import com.wiley.ccp.api.CapiClient;
import com.wiley.ccp.config.AuthTokenRequestInterceptor;

@Configuration
@Slf4j
public class CapiRestClientConfig {

    @Value("${content.api.url}")
    private String baseUrl;

    @Value("${api.connection.timeout:5000}")
    private int connectionTimeout;

    @Value("${api.socket.timeout:10000}")
    private int readTimeout;

    @Value("${api.max.connections:50}")
    private int maxConnections;

    @Value("${api.max.connections.per.route:20}")
    private int maxConnectionsPerRoute;

    private final AuthTokenRequestInterceptor authTokenRequestInterceptor;

    public CapiRestClientConfig(AuthTokenRequestInterceptor authTokenRequestInterceptor) {
        this.authTokenRequestInterceptor = authTokenRequestInterceptor;
    }

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
            .baseUrl(baseUrl)
            .requestFactory(clientHttpRequestFactory())
//            .defaultHeaders(headers -> {
//                headers.add("User-Agent", "ccp-dashboard");
//                headers.add("Accept", "application/json");
//            })
            .requestInterceptor(loggingInterceptor())
            .requestInterceptor(authTokenRequestInterceptor)
            .defaultUriVariables(Map.of("version", "v1"))
            .uriBuilderFactory(new DefaultUriBuilderFactory(baseUrl))
            .build();
    }

    private ClientHttpRequestFactory clientHttpRequestFactory() {
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(maxConnections);
        connectionManager.setDefaultMaxPerRoute(maxConnectionsPerRoute);
        connectionManager.setDefaultConnectionConfig(httpConnectionConfig());

        CloseableHttpClient httpClient = HttpClients.custom()
            .setConnectionManager(connectionManager)
            .build();

        return new HttpComponentsClientHttpRequestFactory(httpClient);
    }

    private ConnectionConfig httpConnectionConfig() {
        return ConnectionConfig.custom()
            .setConnectTimeout(Timeout.ofMilliseconds(connectionTimeout))
            .setSocketTimeout(Timeout.ofMilliseconds(readTimeout))
            .build();
    }


    private ClientHttpRequestInterceptor loggingInterceptor() {
        return (request, body, execution) -> {
            log.info("Request: {} {}", request.getMethod(), request.getURI());
            ClientHttpResponse response = execution.execute(request, body);
            log.info("Response: {}", response.getStatusCode());
            return response;
        };
    }

    @Bean
    public CapiClient myApiClient(RestClient restClient) {

        HttpServiceProxyFactory factory = HttpServiceProxyFactory
            .builderFor(RestClientAdapter.create(restClient)).build();

        return factory.createClient(CapiClient.class);
    }


}
