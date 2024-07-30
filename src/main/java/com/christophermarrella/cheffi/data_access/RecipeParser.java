package com.christophermarrella.cheffi.data_access;

import com.christophermarrella.cheffi.entities.FoodItem;
import com.christophermarrella.cheffi.entities.InventoryChecker;
import com.christophermarrella.cheffi.entities.User;
import com.christophermarrella.cheffi.entities.UserDietaryPreferences;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.*;

public class RecipeParser {

    public List<Integer> getIds(JsonObject callResult) {
        JsonArray res = callResult.getAsJsonArray("results");
        List<Integer> ids = new ArrayList<>();

        for (JsonElement element : res) {
            JsonObject recipe = element.getAsJsonObject();
            Integer id = recipe.get("id").getAsInt();
            ids.add(id);
        }

        return ids;
    }

    public List<String> getNames(JsonObject callResult) {
        JsonArray res = callResult.getAsJsonArray("results");
        List<String> names = new ArrayList<>();

        for (JsonElement element : res) {
            JsonObject recipe = element.getAsJsonObject();
            String name = recipe.get("title").getAsString();
            names.add(name);
        }

        return names;
    }

    public List<String> parseInstructions(JsonObject callResult) {
        JsonArray res = callResult.getAsJsonArray("steps");
        List<String> steps = new ArrayList<>();

        for (JsonElement element : res) {
            JsonObject stepObj = element.getAsJsonObject();
            String step = stepObj.get("step").getAsString();
            steps.add(step);
        }

        return steps;
    }

    public Map<String, Float> parseMacros(JsonObject callResult) {
        JsonArray res = callResult.getAsJsonArray("nutrients");
        Map<String, Float> macros = new HashMap<>();
        List<String> reqMacros = Arrays.asList("Calories", "Saturated Fat", "Carbohydrates", "Protein");

        for (JsonElement element : res) {
            JsonObject nutrient = element.getAsJsonObject();
            String name = nutrient.get("name").getAsString();
            if (reqMacros.contains(name)) {
                Float amount = nutrient.get("amount").getAsFloat();
                macros.put(name, amount);
            }
        }

        return macros;
    }

    public List<FoodItem> parseIngredients(JsonObject callResult) {
        JsonArray res = callResult.getAsJsonArray("ingredients");
        List<FoodItem> ingredients = new ArrayList<>();
        Map<String, Integer> included = new HashMap<>();

        for (JsonElement element : res) {
            JsonObject ingredientObj = element.getAsJsonObject();
            String name = ingredientObj.get("name").getAsString();
            Float amount = ingredientObj.getAsJsonObject("amount").getAsJsonObject("metric").get("value").getAsFloat();

            if (included.containsKey(name)) {
                Float oldAmount = ingredients.get(included.get(name)).getAmount();
                ingredients.set(included.get(name), new FoodItem(name, 9999, 12, 1, oldAmount + amount));
            } else {
                ingredients.add(new FoodItem(name, 9999, 12, 1, amount));
                included.put(name, ingredients.size() - 1);
            }
        }

        return ingredients;
    }
}