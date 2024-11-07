package com.wiley.ccp.model.alfresco.search;

import java.util.Arrays;

/**
 * IncludeOptions used for sending in parameter options for AlfrescoAPI requests.
 */
public class IncludeOptions {
    private IncludeOptions() {}

    /**
     * Options enum for allowable include options
     */
    public enum Options {
        ALLOWABLE_OPERTIONS("allowableOperations"), ASSOCIATION("association"), IS_LINK("isLink"),
        IS_LOCKED("isLocked"), IS_FAVORITE("isFavorite"), PATH("path"), PERMISSIONS("permissions"),
        PROPERTIES("properties");

        private final String optionValue;

        Options(String option){
            this.optionValue = option;
        }

        private String getOption(){
            return optionValue;
        }
    }

    /**
     * Sets include options that are used for alfresco api request.
     * @param options array of options to set.
     * @return Option values set.
     */
    public static String[] create(Options... options){
        return Arrays.stream(options)
                .map(Options::getOption)
                .toArray(String[]::new);
    }

    public static String[] properties(){
        return create(Options.PROPERTIES);
    }

    public static String[] propertiesAndAssociations(){
        return create(Options.PROPERTIES, Options.ASSOCIATION);
    }
}
