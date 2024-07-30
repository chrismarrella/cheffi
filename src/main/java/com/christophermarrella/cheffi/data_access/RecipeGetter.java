package com.christophermarrella.cheffi.data_access;

import com.christophermarrella.cheffi.entities.FoodItem;
import com.christophermarrella.cheffi.entities.User;
import com.christophermarrella.cheffi.entities.UserDietaryPreferences;
import com.christophermarrella.cheffi.entity_interfaces.DietaryPreferences;
import com.google.gson.*;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.util.*;

public class RecipeGetter {
    private final List<String> macros = Arrays.asList("minCarbs", "maxCarbs",
            "minProtein", "maxProtein", "minCalories", "maxCalories", "minSaturatedFat", "maxSaturatedFat");

    private final List<String> diets = Arrays.asList("Vegetarian", "Ketogenic", "Vegan");

    public JsonObject getRecipe(String key, List<Object> settings) {
        String incFood = (String) settings.get(0);
        String excFood = (String) settings.get(1);
        String diet = (String) settings.get(2);
        Map<String, Float> newPrefs = (HashMap<String, Float>) settings.get(3);

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(String.format(
                        "https://api.spoonacular.com/recipes/complexSearch?apiKey=%s&diet=%s&includeIngredients=%s&excludeIngredients=%s&minCarbs=%s&maxCarbs=%s&minProtein=%s&maxProtein=%s&minCalories=%s&maxCalories=%s&minSaturatedFat=%s&maxSaturatedFat=%s&number=%s",
                        key, diet, incFood, excFood, newPrefs.get("minCarbs"), newPrefs.get("maxCarbs"), newPrefs.get("minProtein"),
                        newPrefs.get("maxProtein"), newPrefs.get("minCalories"), newPrefs.get("maxCalories"),
                        newPrefs.get("minSaturatedFat"), newPrefs.get("maxSaturatedFat"), 1))
                .build();
        try {
            Response response = client.newCall(request).execute();
            return JsonParser.parseString(response.body().string()).getAsJsonObject();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Object> preferenceConverter(List<FoodItem> ingredients, User user) {
        Map<String, Float> restrictionMap = user.getRestrictionMap();
        DietaryPreferences dietaryPreferences = new UserDietaryPreferences(restrictionMap);

        Set<String> prefs = dietaryPreferences.getAllKeys();
        List<Object> res = new ArrayList<>(4);
        StringBuilder includedFood = new StringBuilder();
        StringBuilder excludedFood = new StringBuilder();
        StringBuilder diet = new StringBuilder();
        Map<String, Float> newPrefs = new HashMap<>();

        for (String item : prefs) {
            if (macros.contains(item)) {
                newPrefs.put(item, dietaryPreferences.getRestriction(item));
            } else if (diets.contains(item) && dietaryPreferences.getRestriction(item) == 1) {
                diet.append(item).append("|");
            } else if (dietaryPreferences.getRestriction(item) == 1) {
                excludedFood.append(item).append(",");
            }
        }

        for (FoodItem ingredient : ingredients) {
            includedFood.append(ingredient.getName()).append(",");
        }

        if (includedFood.length() > 0) includedFood.deleteCharAt(includedFood.length() - 1);
        if (excludedFood.length() > 0) excludedFood.deleteCharAt(excludedFood.length() - 1);
        if (diet.length() > 0) diet.deleteCharAt(diet.length() - 1);

        res.add(includedFood.toString());
        res.add(excludedFood.toString());
        res.add(diet.toString());
        res.add(newPrefs);

        return res;
    }

    public JsonObject getIngredients(Integer id, String key) {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(String.format("https://api.spoonacular.com/recipes/%s/ingredientWidget.json?apiKey=%s", id, key))
                .build();
        try {
            Response response = client.newCall(request).execute();
            return JsonParser.parseString(response.body().string()).getAsJsonObject();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public JsonObject getNutrients(Integer id, String key) {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(String.format("https://api.spoonacular.com/recipes/%s/nutritionWidget.json?apiKey=%s", id, key))
                .build();
        try {
            Response response = client.newCall(request).execute();
            return JsonParser.parseString(response.body().string()).getAsJsonObject();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public JsonObject getInstructions(Integer id, String key) {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Request request = new Request.Builder()
                .url(String.format("https://api.spoonacular.com/recipes/%s/analyzedInstructions?apiKey=%s", id, key))
                .build();
        try {
            Response response = client.newCall(request).execute();
            String t1 = response.body().string();
            return JsonParser.parseString(t1.substring(1, t1.length() - 1)).getAsJsonObject();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}