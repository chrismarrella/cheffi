package com.christophermarrella.cheffi.entities;

import com.christophermarrella.cheffi.entity_interfaces.DietaryPreferences;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Embeddable
public class UserDietaryPreferences implements DietaryPreferences{

    @ElementCollection
    private Map<String, Float> dietaryRestrictions;

    public UserDietaryPreferences() {
        this.dietaryRestrictions = new HashMap<>();
        this.dietaryRestrictions.put("minCarbs", 10F);
        this.dietaryRestrictions.put("maxCarbs", 100.0f);
        this.dietaryRestrictions.put("minProtein", 10.0f);
        this.dietaryRestrictions.put("maxProtein", 100.0f);
        this.dietaryRestrictions.put("minCalories", 200.0f);
        this.dietaryRestrictions.put("maxCalories", 2000.0f);
        this.dietaryRestrictions.put("minSaturatedFat", 1.0f);
        this.dietaryRestrictions.put("maxSaturatedFat", 20.0f);
    }

    public UserDietaryPreferences(Map<String, Float> dietaryRestrictions) {
        this.dietaryRestrictions = dietaryRestrictions;
    }


    public DietaryPreferences getDietaryRestrictions() {
        return this;
    }


    public Map<String, Float> getRestrictionMap() {
        return dietaryRestrictions;
    }


    public void setDietaryRestrictions(Map<String, Float> dietaryRestrictions) {
        this.dietaryRestrictions = dietaryRestrictions;
    }


    public void addRestriction(String restriction, Float res) {
        this.dietaryRestrictions.put(restriction, res);
    }


    public Boolean removeRestriction(String restriction, Float res) {
        return this.dietaryRestrictions.remove(restriction, res);
    }


    public Float getRestriction(String key) {
        return this.dietaryRestrictions.get(key);
    }


    public Set<String> getAllKeys() {
        return this.dietaryRestrictions.keySet();
    }
}
