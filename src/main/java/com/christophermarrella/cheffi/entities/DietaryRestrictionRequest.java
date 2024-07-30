package com.christophermarrella.cheffi.entities;

public class DietaryRestrictionRequest {
    private String restriction;
    private String value;
    private String removeItem;

    public DietaryRestrictionRequest(String restriction, String value, String removeItem) {
        this.restriction = restriction;
        this.value = value;
        this.removeItem = removeItem;
    }

    public String getRemoveItem() {
        return removeItem;
    }

    public void setRemoveItem(String removeItem) {
        this.removeItem = removeItem;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getRestriction() {
        return restriction;
    }

    public void setRestriction(String restriction) {
        this.restriction = restriction;
    }
}
