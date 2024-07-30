package com.christophermarrella.cheffi.data_access;

import okhttp3.*;
import com.google.gson.*;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Parses food item names from a list of ingredients using the Spoonacular API
 */
public class FoodNameParser {


    public static List<String> parseFoodItemNames(String key, List<String> foodItemNames) {
        String input = String.join("\n", foodItemNames);
        JsonArray jsonOutput = parseFoodItems(key, input);
        return getNames(jsonOutput);
    }

    private static JsonArray parseFoodItems(String key, String foodItemNames) {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        RequestBody formBody = new FormBody.Builder()
                .add("ingredientList", foodItemNames)
                .build();
        Request request = new Request.Builder()
                .url(String.format("https://api.spoonacular.com/recipes/parseIngredients?apiKey=%s", key))
                .post(formBody)
                .build();
        try {
            Response response = client.newCall(request).execute();
            return JsonParser.parseString(response.body().string()).getAsJsonArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static List<String> getNames(JsonArray callResult) {
        List<String> foodItemNames = new ArrayList<>();
        for (JsonElement element : callResult) {
            JsonObject foodItem = element.getAsJsonObject();
            foodItemNames.add(foodItem.get("name").getAsString());
        }
        return foodItemNames;
    }
}