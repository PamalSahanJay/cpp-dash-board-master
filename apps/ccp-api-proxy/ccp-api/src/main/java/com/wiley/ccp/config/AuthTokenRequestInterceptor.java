package com.wiley.ccp.config;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;

import com.wiley.ccp.auth.AuthenticationHelper;

/**
 * Sets header with auth token
 */
@RequiredArgsConstructor
@Component
public class AuthTokenRequestInterceptor implements ClientHttpRequestInterceptor {

    private final AuthenticationHelper authenticationHelper;

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
        throws IOException {
        authenticationHelper.apply(request.getHeaders());
        return execution.execute(request, body);
    }
}
