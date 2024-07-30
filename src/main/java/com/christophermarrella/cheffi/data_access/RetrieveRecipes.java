package com.christophermarrella.cheffi.data_access;

import com.christophermarrella.cheffi.entities.*;

import com.christophermarrella.cheffi.use_case.get_recipe.GetRecipes;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RetrieveRecipes {

    public static Recipe retrieveRecipes(User user) {
        Map<String, Float> restrictionMap = user.getRestrictionMap();
        UserDietaryPreferences dietaryPreferences = new UserDietaryPreferences(restrictionMap);

        InventoryChecker inventoryChecker = new InventoryChecker();
        RecipeGetter recipeGetter = new RecipeGetter();
        RecipeParser recipeParser = new RecipeParser();

        //Delete if broken
        List<FoodItem> expiresSoon = inventoryChecker.weekCheck(user.getInventory());
        List<Object> settings = recipeGetter.preferenceConverter(expiresSoon, user);

        String apiKey = "1178e228ddeb4ba484e64911de9db1a8";



        JsonObject recipe = recipeGetter.getRecipe(apiKey, settings);
        Integer recipeId = recipe.getAsJsonArray("results").get(0).getAsJsonObject().get("id").getAsInt();
        List<String> titles = recipeParser.getNames(recipe);
        JsonObject instructions = recipeGetter.getInstructions(recipe.getAsJsonArray("results").get(0).getAsJsonObject().get("id").getAsInt(), apiKey);
        JsonObject nutrients = recipeGetter.getNutrients(recipeId, apiKey);
        JsonObject ingredients = recipeGetter.getIngredients(recipeId, apiKey);

        Map<String, Float> parsedMacros = recipeParser.parseMacros(nutrients);
        List<FoodItem> parsedIngredients = recipeParser.parseIngredients(ingredients);
        List<String> parseInstructions = recipeParser.parseInstructions(instructions);

        Recipe res = new Recipe(titles.getFirst(), parseInstructions, parsedIngredients, parsedMacros);

        System.out.println(res);
        return res;
    }

    public static void main(String[] args) {
        Map<String, Float> dietaryRestrictionsMap = new HashMap<>();
        dietaryRestrictionsMap.put("minCarbs", 10.0f);
        dietaryRestrictionsMap.put("maxCarbs", 20f);
        dietaryRestrictionsMap.put("minProtein", 10.0f);
        dietaryRestrictionsMap.put("maxProtein", 100.0f);
        dietaryRestrictionsMap.put("minCalories", 10f);
        dietaryRestrictionsMap.put("maxCalories", 300.0f);
        dietaryRestrictionsMap.put("minSaturatedFat", 1.0f);
        dietaryRestrictionsMap.put("maxSaturatedFat", 20.0f);

        UserDietaryPreferences dietaryPreferences = new UserDietaryPreferences(dietaryRestrictionsMap);

        // Create a sample User object
        User user = new User("john_doe", "John", "Doe", dietaryPreferences);

        // Create sample FoodItem objects
        List<FoodItem> ingredients = new ArrayList<>();

        GetRecipes.getRecipes(user);
    }
}
