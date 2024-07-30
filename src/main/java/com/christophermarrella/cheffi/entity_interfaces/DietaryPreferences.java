package com.christophermarrella.cheffi.entity_interfaces;


import java.util.Map;
import java.util.Set;


public interface DietaryPreferences {

    DietaryPreferences getDietaryRestrictions();

    void setDietaryRestrictions(Map<String, Float> dietaryRestrictions);

    void addRestriction(String restriction, Float res);

    Boolean removeRestriction(String restriction, Float res);

    Float getRestriction(String key);

    Set<String> getAllKeys();
}
