package com.wiley.ccp.auth;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import ccp.shared.platform.authentication.security.authentication.TokenAuthentication;
import ccp.shared.platform.authentication.security.utils.AuthenticationUtils;
import ccp.shared.security.authentication.userdetails.AbstractTokenUser;
import lombok.RequiredArgsConstructor;

/***/
@Component
@RequiredArgsConstructor
public class AuthenticationHelper {
    public static final String AUTH_TOKEN_HEADER = "X-WPP-AUTH-TOKEN";

    private final AuthenticationUtils authenticationUtils;

    public void apply(HttpHeaders headers) {
        Authentication oldAuthentication = authenticationUtils.authenticateAsSystem();
        headers.add(AUTH_TOKEN_HEADER, getAuthToken());
        authenticationUtils.authenticate(oldAuthentication);
    }

    public static String getToken() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final User userDetails = ((TokenAuthentication) authentication).getDetails();
        return ((AbstractTokenUser) userDetails).getTokenString();
    }

    String getAuthToken() {
        return getToken();
    }
}
